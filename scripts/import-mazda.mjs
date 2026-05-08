import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const resultsPath = resolve(root, "public/data/results.json");
const allResults = JSON.parse(readFileSync(resultsPath, "utf8"));

// Remove all existing Mazda results (testSetId starts with "ts-mazda-")
const nonMazda = allResults.filter(r => !r.testSetId.startsWith("ts-mazda-"));
console.log(`Removed ${allResults.length - nonMazda.length} old Mazda results.`);

const SERVICE_TO_MODEL = {
  fast_default: "m-azure-fast-default",
  fast_llm: "m-azure-fast-llm",
  fast_mai: "m-azure-fast-mai",
  realtime: "m-azure-realtime",
  realtime_refine: "m-azure-realtime-refine",
};

// Parse "1542 / 2153" → { mean: 1542, p90: 2153 }
function parseMeanP90(s) {
  if (!s || s.trim() === "-") return null;
  const parts = s.split("/").map(x => parseFloat(x.trim()));
  if (parts.length !== 2 || isNaN(parts[0])) return null;
  return { mean: parts[0], p90: parts[1] };
}

// Reports: lang → { datasets, rows }
const reports = [
  { lang: "en-GB", file: "d:/dev/test-mazda-asr-multilingual/results/mazda_en-GB_20260508_194552_report.md" },
  { lang: "de-DE", file: "d:/dev/test-mazda-asr-multilingual/results/mazda_de-DE_20260508_193734_report.md" },
  { lang: "es-ES", file: "d:/dev/test-mazda-asr-multilingual/results/mazda_es-ES_20260508_120527_report.md" },
  { lang: "fr-FR", file: "d:/dev/test-mazda-asr-multilingual/results/mazda_fr-FR_20260508_131357_report.md" },
  { lang: "it-IT", file: "d:/dev/test-mazda-asr-multilingual/results/mazda_it-IT_20260508_133009_report.md" },
];

// Dataset name → testset ID suffix mapping
// e.g. "en-GB_DT1" → "ts-mazda-en-gb-dt1"
function datasetToTestSetId(dataset) {
  // dataset like "en-GB_DT1" → "ts-mazda-en-gb-dt1"
  return "ts-mazda-" + dataset.toLowerCase().replace("_", "-");
}

const newResults = [];

for (const report of reports) {
  const md = readFileSync(report.file, "utf8");

  // Find the results table
  const lines = md.split("\n");
  let inTable = false;
  let headerFound = false;

  for (const line of lines) {
    if (line.startsWith("| Dataset | Service |")) {
      inTable = true;
      headerFound = true;
      continue;
    }
    if (inTable && line.startsWith("|---")) continue;
    if (inTable && line.startsWith("|")) {
      // Parse: | Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
      const cells = line.split("|").slice(1, -1).map(c => c.trim());
      if (cells.length < 12) continue;

      const dataset = cells[0];     // e.g. "en-GB_DT1"
      const service = cells[1];     // e.g. "fast_default"
      const wer = parseFloat(cells[4]);
      const firstLatStr = cells[9]; // "1542 / 2153" or "-"
      const lblStr = cells[10];     // "583 / 642" or "-279 / 429"
      const uplStr = cells[11];     // "1025 / 1193"

      const modelId = SERVICE_TO_MODEL[service];
      if (!modelId) {
        console.warn(`Unknown service: ${service}`);
        continue;
      }

      const testSetId = datasetToTestSetId(dataset);
      const evaluatedAt = "2026-05-08";
      const runId = `run-mazda-${report.lang}-${service}`;

      // WER (as percentage, the report values are already 0-1 ratios, multiply by 100)
      newResults.push({
        modelId, testSetId,
        metric: "WER",
        value: Math.round(wer * 10000) / 100, // e.g. 0.260 → 26.0
        lowerIsBetter: true,
        evaluatedAt, runId,
      });

      // First Latency (only for realtime/realtime_refine)
      const firstLat = parseMeanP90(firstLatStr);
      if (firstLat) {
        newResults.push({
          modelId, testSetId,
          metric: "first_latency_ms",
          value: Math.round(firstLat.mean),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
        newResults.push({
          modelId, testSetId,
          metric: "first_latency_p90_ms",
          value: Math.round(firstLat.p90),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
      }

      // LBL
      const lbl = parseMeanP90(lblStr);
      if (lbl) {
        newResults.push({
          modelId, testSetId,
          metric: "lbl_ms",
          value: Math.round(lbl.mean),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
        newResults.push({
          modelId, testSetId,
          metric: "lbl_p90_ms",
          value: Math.round(lbl.p90),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
      }

      // UPL
      const upl = parseMeanP90(uplStr);
      if (upl) {
        newResults.push({
          modelId, testSetId,
          metric: "upl_ms",
          value: Math.round(upl.mean),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
        newResults.push({
          modelId, testSetId,
          metric: "upl_p50_ms",
          value: Math.round(upl.mean),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
        newResults.push({
          modelId, testSetId,
          metric: "upl_p90_ms",
          value: Math.round(upl.p90),
          lowerIsBetter: true,
          evaluatedAt, runId,
        });
      }
    } else if (inTable && !line.startsWith("|")) {
      inTable = false;
    }
  }
}

console.log(`Generated ${newResults.length} new Mazda results.`);

const final = [...nonMazda, ...newResults];
writeFileSync(resultsPath, JSON.stringify(final, null, 2) + "\n");
console.log(`Total results: ${final.length}`);
