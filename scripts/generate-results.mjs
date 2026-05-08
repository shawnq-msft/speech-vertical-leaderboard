import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const testsets = JSON.parse(readFileSync(resolve(root, "public/data/testsets.json"), "utf8"));
const models = JSON.parse(readFileSync(resolve(root, "public/data/models.json"), "utf8"));

// Seeded PRNG for deterministic output.
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function round(n, d) {
  const p = Math.pow(10, d);
  return Math.round(n * p) / p;
}

// Models: whether they cover a locale / region.
// iFlytek: zh* only.
// Toyota-Internal: only Toyota in-cabin.
// Tencent: zh* strong, weaker elsewhere.
// Whisper.cpp on Snapdragon (base.en int8): en-* only.
// Whisper.cpp on Apple M3 (small fp16): multilingual but English-strongest.
// Piper on-device: TTS, limited locales (en, de, es, zh).
// OpenAI TTS-1-HD: English-centric, weaker on others.
function modelCoversTestset(model, ts) {
  const lang = ts.languages[0]?.code ?? "";
  const region = ts.languages[0]?.region ?? "";

  // Real data testsets — skip synthetic generation.
  if (ts.id.startsWith("ts-toyota-") || ts.id.startsWith("ts-mazda-")) return false;

  // Real-data-only models — only cover their own testsets (handled above).
  const realModels = ["m-azure-realtime", "m-azure-realtime-refine", "m-azure-fast-default", "m-azure-fast-llm", "m-azure-fast-mai", "m-azure-embedded"];
  if (realModels.includes(model.id)) return false;

  if (model.id === "m-iflytek-asr-zh") {
    return lang.startsWith("zh") || lang === "ja-JP";
  }
  if (model.id === "m-toyota-internal-asr") {
    return ts.customer === "Toyota";
  }
  if (model.id === "m-whisper-cpp-snapdragon") {
    return lang.startsWith("en");
  }
  if (model.id === "m-whisper-cpp-coreml") {
    // Multilingual but limited; skip Arabic + Korean batch for realism.
    return !lang.startsWith("ar") && !lang.startsWith("ko");
  }
  if (model.id === "m-piper-on-device") {
    return ["en-US", "en-GB", "de-DE", "es-MX", "zh-CN", "ko-KR", "pt-BR"].includes(lang);
  }
  if (model.id === "m-openai-tts-1-hd") {
    // English-centric TTS; also supports several majors.
    return ["en-US", "en-GB", "es-MX", "pt-BR", "de-DE", "ja-JP"].includes(lang);
  }
  if (model.id === "m-tencent-tts") {
    // Strong on zh/cantonese, covers others but weaker.
    return true;
  }
  if (model.id === "m-elevenlabs-tts") {
    return true;
  }
  if (model.id === "m-azure-tts-neural") {
    return true;
  }
  if (model.vendor === "Azure") return true;
  if (model.vendor === "OpenAI") return true;
  if (model.vendor === "Google") return true;
  if (model.vendor === "Deepgram") {
    // Deepgram primarily English + a few majors.
    return ["en-US", "en-GB", "en-IN", "es-MX", "pt-BR", "de-DE", "fr-FR"].includes(lang);
  }
  return true;
}

// Vendor baseline skill per task+metric (lower is baseline mean unit).
const vendorBias = {
  Azure: { wer: 0.0, mos: 0.15, lat: 0, rtf: 0 },
  OpenAI: { wer: -0.2, mos: 0.1, lat: 50, rtf: 0.02 }, // OpenAI slightly better WER, slightly slower
  Google: { wer: 0.1, mos: 0.0, lat: -10, rtf: 0 },
  Deepgram: { wer: 0.3, mos: 0.0, lat: -60, rtf: -0.02 }, // fast streaming
  iFlytek: { wer: -0.8, mos: -0.1, lat: -20, rtf: -0.01 }, // strong on zh
  "Whisper.cpp": { wer: 0.8, mos: 0.0, lat: 150, rtf: 0.25 }, // on-device slower
  "Toyota-Internal": { wer: -0.5, mos: 0.0, lat: -30, rtf: -0.05 }, // domain-adapted on Toyota
  ElevenLabs: { wer: 0, mos: 0.3, lat: 30, rtf: 0.01 },
  Tencent: { wer: 0, mos: 0.1, lat: 0, rtf: 0 },
  Piper: { wer: 0, mos: -0.2, lat: 100, rtf: 0.15 }, // on-device TTS slower
};

// Language-specific penalties: non-native vendors get WER bump on hard locales.
function langPenalty(model, lang) {
  const v = model.vendor;
  if (v === "iFlytek") {
    if (lang.startsWith("zh")) return -1.5;
    if (lang === "ja-JP") return 0.5;
    return 8; // shouldn't be hit thanks to coverage filter
  }
  if (v === "Tencent" && lang.startsWith("zh")) return -0.5;
  if (v === "Google" && lang.startsWith("hi")) return -0.5;
  // Tier-3 locales are harder overall.
  return 0;
}

const results = [];

for (const ts of testsets) {
  const lang = ts.languages[0]?.code ?? "en-US";
  const tier = ts.languages[0]?.tier ?? "tier-1";
  const tierBump = tier === "tier-3" ? 1.5 : tier === "tier-2" ? 0.6 : 0;

  for (const m of models) {
    if (m.taskType !== ts.taskType) continue;
    if (m.taskType === "ASR" && ts.taskType === "ASR" && m.asrMode) {
      // ok — we show both streaming and batch for ASR test sets
    }
    if (!modelCoversTestset(m, ts)) continue;

    const seed = hashStr(`${m.id}::${ts.id}`);
    const rand = mulberry32(seed);
    const jitter = () => (rand() - 0.5) * 2;

    const bias = vendorBias[m.vendor] ?? { wer: 0, mos: 0, lat: 0, rtf: 0 };
    const penalty = langPenalty(m, lang);
    const evaluatedAt = `2026-04-${String(5 + (seed % 15)).padStart(2, "0")}`;
    const runId = `run-${(seed % 100000).toString(16)}`;

    if (ts.taskType === "ASR") {
      const baseWer = 6.5 + bias.wer + penalty + tierBump + jitter() * 0.7;
      const cer = Math.max(1.5, baseWer - 1.2 + jitter() * 0.4);
      const fblP50 = Math.max(60, 260 + bias.lat + jitter() * 40);
      const fblP95 = fblP50 * 1.8 + jitter() * 40;
      const finalP50 = fblP50 + 180 + jitter() * 30;
      const finalP95 = finalP50 * 1.7 + jitter() * 40;
      const rtf = Math.max(0.08, 0.35 + bias.rtf + jitter() * 0.05);
      const interLat = 120 + bias.lat * 0.5 + jitter() * 20;

      const push = (metric, value, lib) =>
        results.push({
          modelId: m.id,
          testSetId: ts.id,
          metric,
          value: round(value, value < 10 ? 2 : 0),
          lowerIsBetter: lib,
          evaluatedAt,
          runId,
        });

      push("WER", Math.max(1.5, baseWer), true);
      push("CER", cer, true);
      push("first_byte_latency_p50_ms", fblP50, true);
      push("first_byte_latency_p95_ms", fblP95, true);
      push("final_result_latency_p50_ms", finalP50, true);
      push("final_result_latency_p95_ms", finalP95, true);
      push("RTF", rtf, true);
      if (m.asrMode === "streaming") {
        push("intermediate_result_latency_ms", Math.max(40, interLat), true);
      }
    } else {
      // TTS
      const mos = Math.min(4.9, 4.0 + bias.mos - tierBump * 0.15 + jitter() * 0.15);
      const pronAcc = Math.min(0.99, 0.9 + bias.mos * 0.3 - tierBump * 0.03 + jitter() * 0.02);
      const fblP50 = Math.max(80, 300 + bias.lat + jitter() * 30);
      const fblP95 = fblP50 * 1.7 + jitter() * 30;
      const rtf = Math.max(0.1, 0.28 + bias.rtf + jitter() * 0.04);

      const push = (metric, value, lib) =>
        results.push({
          modelId: m.id,
          testSetId: ts.id,
          metric,
          value: round(value, value < 10 ? 3 : 0),
          lowerIsBetter: lib,
          evaluatedAt,
          runId,
        });

      push("MOS", mos, false);
      push("pronunciation_acc", pronAcc, false);
      push("first_byte_latency_p50_ms", fblP50, true);
      push("first_byte_latency_p95_ms", fblP95, true);
      push("RTF", rtf, true);
    }
  }
}

writeFileSync(
  resolve(root, "public/data/results.json"),
  JSON.stringify(results, null, 2) + "\n",
);

console.log(`Generated ${results.length} result rows for ${testsets.length} testsets × ${models.length} models.`);
