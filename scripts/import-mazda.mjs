import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const resultsPath = resolve(root, "public/data/results.json");
const allResults = JSON.parse(readFileSync(resultsPath, "utf8"));

const nonMazda = allResults.filter(r => !r.testSetId.startsWith("ts-mazda-"));
console.log(`Removed ${allResults.length - nonMazda.length} old Mazda results.`);

const SERVICE_TO_MODEL = {
  fast_default: "m-azure-fast-default",
  fast_llm: "m-azure-fast-llm",
  fast_mai: "m-azure-fast-mai",
  realtime: "m-azure-realtime",
  realtime_refine: "m-azure-realtime-refine",
  whisper_v3: "m-azure-whisper-v3",
};

function parseMeanP90(s) {
  if (!s || s.trim() === "-") return null;
  const parts = s.split("/").map(x => parseFloat(x.trim()));
  if (parts.length !== 2 || isNaN(parts[0])) return null;
  return { mean: parts[0], p90: parts[1] };
}

function datasetToTestSetId(dataset) {
  return "ts-mazda-" + dataset.toLowerCase().replace("_", "-");
}

const sources = [
  { lang: "de-DE", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_de-DE_20260509_155253_report.md" },
  { lang: "en-GB", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_en-GB_20260509_155254_report.md" },
  { lang: "es-ES", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_es-ES_20260509_155256_report.md" },
  { lang: "fr-FR", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_fr-FR_20260509_162042_report.md" },
  { lang: "it-IT", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_it-IT_20260509_162044_report.md" },
  { lang: "nb-NO", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_nb-NO_20260509_162046_report.md" },
  { lang: "nl-NL", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_nl-NL_20260509_165618_report.md" },
  { lang: "pl-PL", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_pl-PL_20260509_165619_report.md" },
  { lang: "sv-SE", report: "d:/dev/test-mazda-asr-multilingual/results/mazda_sv-SE_20260509_165620_report.md" },
];

// Parse the "## Results" table from report.md
// Columns: | Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
function parseReport(filePath) {
  const md = readFileSync(filePath, "utf8");
  const lines = md.split("\n");
  const rows = [];
  let inResultsSection = false;
  let inTable = false;

  for (const line of lines) {
    if (/^## Results\b/.test(line)) {
      inResultsSection = true;
      continue;
    }
    if (inResultsSection && !inTable && line.startsWith("| Dataset | Service |")) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith("|---")) continue;
    if (inTable && line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map(c => c.trim());
      if (cells.length < 12) continue;
      rows.push({
        dataset: cells[0],
        service: cells[1],
        wer: parseFloat(cells[4]),
        firstLatStr: cells[9],
        lblStr: cells[10],
        uplStr: cells[11],
      });
    } else if (inTable) {
      break;
    }
  }
  return rows;
}

const newResults = [];

for (const src of sources) {
  const rows = parseReport(src.report);

  for (const row of rows) {
    const modelId = SERVICE_TO_MODEL[row.service];
    if (!modelId) {
      console.warn(`Unknown service: ${row.service}`);
      continue;
    }

    const testSetId = datasetToTestSetId(row.dataset);
    const evaluatedAt = "2026-05-09";
    const runId = `run-mazda-${src.lang}-${row.service}`;

    // WER (0-1 ratio → percentage)
    newResults.push({
      modelId, testSetId,
      metric: "WER",
      value: Math.round(row.wer * 10000) / 100,
      lowerIsBetter: true,
      evaluatedAt, runId,
    });

    // First Latency (only realtime/realtime_refine)
    const firstLat = parseMeanP90(row.firstLatStr);
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
    const lbl = parseMeanP90(row.lblStr);
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
    const upl = parseMeanP90(row.uplStr);
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
  }
}

console.log(`Generated ${newResults.length} new Mazda results.`);

const final = [...nonMazda, ...newResults];
writeFileSync(resultsPath, JSON.stringify(final, null, 2) + "\n");
console.log(`Total results: ${final.length}`);
