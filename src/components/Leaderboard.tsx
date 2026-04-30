import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  type HwArchitecture,
  type LanguageTier,
  type MetricKey,
  type MetricSpec,
  type Model,
  type ModelDeployment,
  type Region,
  type Result,
  type Runtime,
  type Scenario,
  type TaskType,
  type TestSet,
} from "../types";
import { LOCALE_BY_CODE, type LocaleInfo } from "../data/locales";
import { Badge } from "./Badge";

interface Props {
  taskType: TaskType;
  testsets: TestSet[];
  models: Model[];
  results: Result[];
}

const ALL_SCENARIOS: Scenario[] = [
  "car",
  "meeting",
  "callcenter",
  "smart-home",
  "mobile",
  "other",
];

// Commercial sales regions (Microsoft field-org aligned, voice-agent resolution).
const ALL_REGIONS: Region[] = [
  "Americas",
  "LATAM",
  "EMEA",
  "MidEast",
  "Africa",
  "Greater-China",
  "Japan-Korea",
  "Southeast-Asia",
  "India-South-Asia",
];

const ALL_TIERS: LanguageTier[] = ["tier-1", "tier-2", "tier-3"];

// Curated testing-hardware catalog covering server CPUs/GPUs, edge GPUs,
// automotive SoCs, and mobile/on-device SoCs. Used as seeds; any chipset
// present in models.json is also surfaced automatically.
const KNOWN_CHIPSETS: string[] = [
  // Server / datacenter GPUs
  "NVIDIA H100",
  "NVIDIA A100",
  "NVIDIA V100",
  "NVIDIA L40S",
  "AMD MI300X",
  // Server / datacenter CPUs
  "Intel Xeon Platinum 8480+",
  "Intel Xeon Gold 6430",
  "AMD EPYC 9654",
  "AMD EPYC 7763",
  // Client / workstation CPUs with AI accel
  "Intel Core Ultra 7 155H",
  "AMD Ryzen AI 9 HX 370",
  // Edge / embedded GPUs
  "NVIDIA Jetson Orin",
  "NVIDIA Jetson Xavier",
  // Automotive SoCs
  "Qualcomm SA8295P",
  "Qualcomm SA8155P",
  "Qualcomm SA820",
  "Renesas R-Car V4H",
  "NXP i.MX 9",
  // Mobile / on-device
  "Snapdragon 8 Gen 3",
  "Snapdragon 8 Pro",
  "MediaTek Dimensity 9300",
  "Apple M3",
  "Apple A17 Pro",
];

const ALL_RUNTIMES: Runtime[] = [
  "CUDA",
  "TensorRT",
  "ROCm",
  "Qualcomm-AI-Engine",
  "Hexagon",
  "CoreML",
  "NNAPI",
  "TFLite",
  "ONNX-Runtime",
  "OpenVINO",
  "WebGPU",
  "WebNN",
  "CPU-native",
];

// "hybrid" removed per product requirement — unused in practice.
const ALL_ARCH: HwArchitecture[] = ["CPU", "GPU", "NPU", "DSP", "TPU"];

// Per-test-set columns show only the PRIMARY metric (WER for ASR, MOS for TTS).
// The Average/summary block shows the full metric suite so latency P50/P95
// remain visible without widening the per-testset grid.
const TTS_PRIMARY: MetricSpec[] = [
  { key: "MOS", label: "MOS", unit: "", lowerIsBetter: false },
];
const TTS_SUMMARY: MetricSpec[] = [
  { key: "MOS", label: "MOS", unit: "", lowerIsBetter: false },
  { key: "pronunciation_acc", label: "Acc", unit: "", lowerIsBetter: false },
  { key: "first_byte_latency_p50_ms", label: "FBL P50", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p95_ms", label: "FBL P95", unit: "ms", lowerIsBetter: true },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

const ASR_PRIMARY: MetricSpec[] = [
  { key: "WER", label: "WER/CER", unit: "%", lowerIsBetter: true },
];

function prefersCerFor(t: TestSet): boolean {
  const lang = t.languages[0]?.code ?? "";
  return lang.startsWith("zh") || lang.startsWith("ja") || lang.startsWith("ko");
}
const ASR_SUMMARY: MetricSpec[] = [
  { key: "WER", label: "WER/CER", unit: "%", lowerIsBetter: true },
  { key: "first_byte_latency_p50_ms", label: "FBL P50", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p95_ms", label: "FBL P95", unit: "ms", lowerIsBetter: true },
  { key: "final_result_latency_p50_ms", label: "Final P50", unit: "ms", lowerIsBetter: true },
  { key: "final_result_latency_p95_ms", label: "Final P95", unit: "ms", lowerIsBetter: true },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

const DEPLOYMENT_TONE: Record<ModelDeployment, "azure" | "green" | "violet" | "indigo"> = {
  "cloud-api": "azure",
  "cloud-self-hosted": "indigo",
  "on-device": "green",
  "on-prem-server": "violet",
};

// Language filter is multi-select across three axes: tier, sales region, and specific code.
// A test set passes if ANY axis has an active match (or no axis is active).
interface LangFilter {
  tiers: Set<LanguageTier>;
  regions: Set<Region>;
  codes: Set<string>;
}

function emptyLangFilter(): LangFilter {
  return { tiers: new Set(), regions: new Set(), codes: new Set() };
}

function langFilterActive(f: LangFilter): boolean {
  return f.tiers.size > 0 || f.regions.size > 0 || f.codes.size > 0;
}

function langFilterMatches(t: TestSet, f: LangFilter): boolean {
  if (!langFilterActive(f)) return true;
  return t.languages.some(
    (l) => f.tiers.has(l.tier) || f.regions.has(l.region) || f.codes.has(l.code),
  );
}

function removeFromSet<T>(s: Set<T>, v: T): Set<T> {
  const n = new Set(s);
  n.delete(v);
  return n;
}

function toggleInSet<T>(s: Set<T>, v: T): Set<T> {
  const n = new Set(s);
  if (n.has(v)) n.delete(v); else n.add(v);
  return n;
}

interface SortState {
  // column id can be:
  //  "rank" | "model" |
  //  `cell:${testSetId}:${metricKey}` |
  //  `avg:${metricKey}`
  columnId: string;
  asc: boolean;
}

export function Leaderboard({ taskType, testsets, models, results }: Props) {
  const cellMetrics = taskType === "TTS" ? TTS_PRIMARY : ASR_PRIMARY;
  const summaryMetrics = taskType === "TTS" ? TTS_SUMMARY : ASR_SUMMARY;
  const primaryMetric = cellMetrics[0]; // WER for ASR, MOS for TTS

  // ── URL state (shareable filter URLs) ──
  // Params are namespaced by taskType so switching TTS/ASR keeps its own filter.
  const urlPrefix = taskType.toLowerCase(); // "tts" | "asr"
  const readUrl = () => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };
  const initialParams = readUrl();
  const getCsv = (k: string): string[] => {
    const v = initialParams.get(`${urlPrefix}.${k}`);
    return v ? v.split(",").filter(Boolean) : [];
  };

  // Filters start collapsed after a short teaser; default open briefly so users
  // notice the panel exists. Once a user toggles it manually, the teaser is off.
  const [filtersOpen, setFiltersOpen] = useState(true);
  const userTouchedOpen = useRef(false);
  useEffect(() => {
    // Auto-collapse ~1.1s after mount unless the user already clicked the toggle.
    const id = window.setTimeout(() => {
      if (!userTouchedOpen.current) setFiltersOpen(false);
    }, 1100);
    return () => window.clearTimeout(id);
  }, []);
  const onToggleFilters = (v: boolean) => {
    userTouchedOpen.current = true;
    setFiltersOpen(v);
  };

  const [scenarios, setScenarios] = useState<Set<Scenario>>(
    () => new Set(getCsv("scenario") as Scenario[]),
  );
  const [customers, setCustomers] = useState<Set<string>>(
    () => new Set(getCsv("customer")),
  );
  const [lang, setLang] = useState<LangFilter>(() => ({
    tiers: new Set(getCsv("tier") as LanguageTier[]),
    regions: new Set(getCsv("region") as Region[]),
    codes: new Set(getCsv("locale")),
  }));
  const [deployments, setDeployments] = useState<Set<ModelDeployment>>(
    () => new Set(getCsv("deployment") as ModelDeployment[]),
  );
  const [hwArchs, setHwArchs] = useState<Set<HwArchitecture>>(
    () => new Set(getCsv("arch") as HwArchitecture[]),
  );
  const [chipsets, setChipsets] = useState<Set<string>>(
    () => new Set(getCsv("chipset")),
  );
  const [runtimes, setRuntimes] = useState<Set<Runtime>>(
    () => new Set(getCsv("runtime") as Runtime[]),
  );

  // Write current filter state back to the URL (shallow, no reload).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = readUrl();
    const setCsv = (k: string, vals: Iterable<string>) => {
      const arr = Array.from(vals).sort();
      const key = `${urlPrefix}.${k}`;
      if (arr.length === 0) params.delete(key);
      else params.set(key, arr.join(","));
    };
    setCsv("scenario", scenarios);
    setCsv("customer", customers);
    setCsv("tier", lang.tiers);
    setCsv("region", lang.regions);
    setCsv("locale", lang.codes);
    setCsv("deployment", deployments);
    setCsv("arch", hwArchs);
    setCsv("chipset", chipsets);
    setCsv("runtime", runtimes);
    const qs = params.toString();
    const url = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
    window.history.replaceState(null, "", url);
  }, [urlPrefix, scenarios, customers, lang, deployments, hwArchs, chipsets, runtimes]);

  const [sort, setSort] = useState<SortState>({
    columnId: `avg:${primaryMetric.key}`,
    asc: primaryMetric.lowerIsBetter,
  });

  // ── Data-driven option lists ────────────────────────────────────────
  // Each filter only surfaces values actually present in the loaded data.
  const taskModels = useMemo(
    () => models.filter((m) => m.taskType === taskType),
    [models, taskType],
  );
  const taskTestSets = useMemo(
    () => testsets.filter((t) => t.taskType === taskType),
    [testsets, taskType],
  );

  const allCustomers = useMemo(
    () => Array.from(new Set(taskTestSets.map((t) => t.customer))).sort(),
    [taskTestSets],
  );

  const presentScenarios = useMemo(
    () => ALL_SCENARIOS.filter((s) => taskTestSets.some((t) => t.scenario === s)),
    [taskTestSets],
  );

  const presentTiers = useMemo(
    () =>
      ALL_TIERS.filter((tier) =>
        taskTestSets.some((t) => t.languages.some((l) => l.tier === tier)),
      ),
    [taskTestSets],
  );

  const presentRegions = useMemo(
    () =>
      ALL_REGIONS.filter((r) =>
        taskTestSets.some((t) => t.languages.some((l) => l.region === r)),
      ),
    [taskTestSets],
  );

  // Locales drill-down: codes present in the data, filtered by currently-active
  // tier/region selections (if any). If neither tier nor region is selected,
  // show all locales present in the data.
  const presentLocales = useMemo(() => {
    const inData = new Set<string>();
    for (const t of taskTestSets) for (const l of t.languages) inData.add(l.code);
    const list = Array.from(inData).map((code) => LOCALE_BY_CODE.get(code) ?? {
      code, name: code, tier: "tier-3" as LanguageTier, region: "EMEA" as Region,
    });
    const tierActive = lang.tiers.size > 0;
    const regionActive = lang.regions.size > 0;
    return list
      .filter((l) => !tierActive || lang.tiers.has(l.tier))
      .filter((l) => !regionActive || lang.regions.has(l.region))
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [taskTestSets, lang.tiers, lang.regions]);

  const presentDeployments = useMemo(() => {
    const all: ModelDeployment[] = ["cloud-api", "cloud-self-hosted", "on-device", "on-prem-server"];
    return all.filter((d) => taskModels.some((m) => m.deployment === d));
  }, [taskModels]);

  const presentArchs = useMemo(
    () => ALL_ARCH.filter((a) => taskModels.some((m) => m.hardware?.architecture === a)),
    [taskModels],
  );

  const presentChipsets = useMemo(() => {
    const s = new Set<string>();
    for (const m of taskModels) if (m.hardware?.chipset) s.add(m.hardware.chipset);
    // Keep the curated ordering for seeded chipsets, then any extras alphabetically.
    const curated = KNOWN_CHIPSETS.filter((c) => s.has(c));
    const extras = Array.from(s).filter((c) => !KNOWN_CHIPSETS.includes(c)).sort();
    return [...curated, ...extras];
  }, [taskModels]);

  const presentRuntimes = useMemo(
    () => ALL_RUNTIMES.filter((r) => taskModels.some((m) => m.hardware?.runtime === r)),
    [taskModels],
  );

  const filteredTestSets = useMemo(() => {
    return taskTestSets.filter((t) => {
      if (scenarios.size > 0 && !scenarios.has(t.scenario)) return false;
      if (customers.size > 0 && !customers.has(t.customer)) return false;
      if (!langFilterMatches(t, lang)) return false;
      return true;
    });
  }, [taskTestSets, scenarios, customers, lang]);

  const filteredModels = useMemo(() => {
    return taskModels.filter((m) => {
      if (deployments.size > 0 && !deployments.has(m.deployment)) return false;
      if (hwArchs.size > 0 && (!m.hardware || !hwArchs.has(m.hardware.architecture))) return false;
      if (chipsets.size > 0 && (!m.hardware?.chipset || !chipsets.has(m.hardware.chipset))) return false;
      if (runtimes.size > 0 && (!m.hardware || !runtimes.has(m.hardware.runtime))) return false;
      return true;
    });
  }, [taskModels, deployments, hwArchs, chipsets, runtimes]);

  // CJK locales are scored by CER; everything else by WER. Because the UI
  // renders a single "WER/CER" column, we fold CER values into the WER key
  // for test sets whose primary language is CJK.
  const testSetPrefersCer = useMemo(() => {
    const m = new Map<string, boolean>();
    for (const t of testsets) {
      const lang = t.languages[0]?.code ?? "";
      m.set(t.id, lang.startsWith("zh") || lang.startsWith("ja") || lang.startsWith("ko"));
    }
    return m;
  }, [testsets]);

  // (modelId|testSetId|metricKey) → result.value
  const cellValue = useMemo(() => {
    const map = new Map<string, number>();
    // First pass: everything except WER (so CER can overwrite WER cleanly).
    for (const r of results) {
      if (r.metric === "WER") {
        if (!testSetPrefersCer.get(r.testSetId)) {
          map.set(`${r.modelId}|${r.testSetId}|WER`, r.value);
        }
      } else if (r.metric === "CER") {
        if (testSetPrefersCer.get(r.testSetId)) {
          map.set(`${r.modelId}|${r.testSetId}|WER`, r.value);
        }
      } else {
        map.set(`${r.modelId}|${r.testSetId}|${r.metric}`, r.value);
      }
    }
    return map;
  }, [results, testSetPrefersCer]);

  // Group test sets: scenario → customer → testsets[]
  type CustomerGroup = { customer: string; testsets: TestSet[] };
  type ScenarioGroup = { scenario: Scenario; customers: CustomerGroup[]; total: number };
  const columnGroups = useMemo<ScenarioGroup[]>(() => {
    const byScenario = new Map<Scenario, Map<string, TestSet[]>>();
    for (const t of filteredTestSets) {
      const byCustomer = byScenario.get(t.scenario) ?? new Map<string, TestSet[]>();
      const arr = byCustomer.get(t.customer) ?? [];
      arr.push(t);
      byCustomer.set(t.customer, arr);
      byScenario.set(t.scenario, byCustomer);
    }
    const groups: ScenarioGroup[] = [];
    for (const [sc, byCustomer] of byScenario) {
      const customersArr = [...byCustomer.entries()]
        .map(([c, ts]) => ({ customer: c, testsets: ts.sort((a, b) => a.name.localeCompare(b.name)) }))
        .sort((a, b) => a.customer.localeCompare(b.customer));
      groups.push({
        scenario: sc,
        customers: customersArr,
        total: customersArr.reduce((n, c) => n + c.testsets.length * cellMetrics.length, 0),
      });
    }
    groups.sort((a, b) => a.scenario.localeCompare(b.scenario));
    return groups;
  }, [filteredTestSets, cellMetrics.length]);

  const orderedTestSets = useMemo(
    () => columnGroups.flatMap((g) => g.customers.flatMap((c) => c.testsets)),
    [columnGroups],
  );

  // Per-model per-metric average across visible test sets.
  function avgFor(model: Model, m: MetricSpec): number | null {
    const values: number[] = [];
    for (const t of orderedTestSets) {
      const v = cellValue.get(`${model.id}|${t.id}|${m.key}`);
      if (typeof v === "number") values.push(v);
    }
    if (values.length === 0) return null;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  // Sort
  const sortedModels = useMemo(() => {
    const id = sort.columnId;
    const arr = [...filteredModels];
    arr.sort((a, b) => {
      let av: number | null;
      let bv: number | null;
      if (id === "model") {
        return sort.asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (id.startsWith("avg:")) {
        const key = id.slice(4) as MetricKey;
        const m = summaryMetrics.find((x) => x.key === key);
        if (!m) { av = null; bv = null; }
        else {
          av = avgFor(a, m);
          bv = avgFor(b, m);
        }
      } else if (id.startsWith("cell:")) {
        const [, tsId, key] = id.split(":");
        av = cellValue.get(`${a.id}|${tsId}|${key}`) ?? null;
        bv = cellValue.get(`${b.id}|${tsId}|${key}`) ?? null;
      } else {
        // rank — fall through to primary metric avg
        const m = primaryMetric;
        av = avgFor(a, m);
        bv = avgFor(b, m);
      }
      // missing values sink to bottom regardless of direction
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return sort.asc ? av - bv : bv - av;
    });
    return arr;
  }, [filteredModels, sort, summaryMetrics, cellValue, orderedTestSets, primaryMetric]);

  // Per-cell-column min/max for heat-map coloring
  const columnStats = useMemo(() => {
    const stats = new Map<string, { min: number; max: number }>();
    for (const t of orderedTestSets) {
      for (const m of cellMetrics) {
        const key = `${t.id}|${m.key}`;
        const vals: number[] = [];
        for (const model of sortedModels) {
          const v = cellValue.get(`${model.id}|${t.id}|${m.key}`);
          if (typeof v === "number") vals.push(v);
        }
        if (vals.length === 0) continue;
        stats.set(key, { min: Math.min(...vals), max: Math.max(...vals) });
      }
    }
    return stats;
  }, [orderedTestSets, sortedModels, cellMetrics, cellValue]);

  // Per-avg-column min/max
  const avgStats = useMemo(() => {
    const stats = new Map<MetricKey, { min: number; max: number }>();
    for (const m of summaryMetrics) {
      const vals: number[] = [];
      for (const model of sortedModels) {
        const a = avgFor(model, m);
        if (a != null) vals.push(a);
      }
      if (vals.length === 0) continue;
      stats.set(m.key, { min: Math.min(...vals), max: Math.max(...vals) });
    }
    return stats;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryMetrics, sortedModels, orderedTestSets, cellValue]);

  function tone(value: number, stats: { min: number; max: number } | undefined, lowerIsBetter: boolean): string {
    if (!stats || stats.min === stats.max) return "";
    const span = stats.max - stats.min;
    const pos = lowerIsBetter ? (value - stats.min) / span : (stats.max - value) / span;
    if (pos < 0.15) return "bg-emerald-50";
    if (pos < 0.4) return "bg-emerald-50/50";
    if (pos > 0.85) return "bg-rose-50";
    if (pos > 0.6) return "bg-amber-50";
    return "";
  }

  function onHeaderClick(columnId: string, lowerIsBetter: boolean) {
    setSort((prev) => {
      if (prev.columnId === columnId) return { columnId, asc: !prev.asc };
      return { columnId, asc: lowerIsBetter };
    });
  }

  // Active-filter chips for the collapsed bar
  const activeFilterChips: Array<{ label: string; clear: () => void }> = [];
  for (const s of scenarios)
    activeFilterChips.push({
      label: `Scenario: ${s}`,
      clear: () => setScenarios((prev) => { const n = new Set(prev); n.delete(s); return n; }),
    });
  for (const c of customers)
    activeFilterChips.push({
      label: `Customer: ${c}`,
      clear: () => setCustomers((prev) => { const n = new Set(prev); n.delete(c); return n; }),
    });
  for (const t of lang.tiers)
    activeFilterChips.push({
      label: `Tier: ${t}`,
      clear: () => setLang((prev) => ({ ...prev, tiers: removeFromSet(prev.tiers, t) })),
    });
  for (const r of lang.regions)
    activeFilterChips.push({
      label: `Region: ${r}`,
      clear: () => setLang((prev) => ({ ...prev, regions: removeFromSet(prev.regions, r) })),
    });
  for (const code of lang.codes)
    activeFilterChips.push({
      label: `Lang: ${code}`,
      clear: () => setLang((prev) => ({ ...prev, codes: removeFromSet(prev.codes, code) })),
    });
  for (const d of deployments)
    activeFilterChips.push({
      label: `Deployment: ${d}`,
      clear: () => setDeployments((prev) => { const n = new Set(prev); n.delete(d); return n; }),
    });
  for (const h of hwArchs)
    activeFilterChips.push({
      label: `Arch: ${h}`,
      clear: () => setHwArchs((prev) => { const n = new Set(prev); n.delete(h); return n; }),
    });
  for (const c of chipsets)
    activeFilterChips.push({
      label: `Chipset: ${c}`,
      clear: () => setChipsets((prev) => { const n = new Set(prev); n.delete(c); return n; }),
    });
  for (const r of runtimes)
    activeFilterChips.push({
      label: `Runtime: ${r}`,
      clear: () => setRuntimes((prev) => { const n = new Set(prev); n.delete(r); return n; }),
    });

  const defaultSortHint =
    taskType === "TTS"
      ? "Default sort: avg MOS ↓ (higher is better)"
      : "Default sort: avg WER ↑ (lower is better) · Latency ↑ · Accuracy ↓";

  return (
    <section className="space-y-4">
      <FilterPanel
        open={filtersOpen}
        setOpen={onToggleFilters}
        chips={activeFilterChips}
        clearAll={() => {
          setScenarios(new Set());
          setCustomers(new Set());
          setLang(emptyLangFilter());
          setDeployments(new Set());
          setHwArchs(new Set());
          setChipsets(new Set());
          setRuntimes(new Set());
        }}
        scenarios={scenarios}
        presentScenarios={presentScenarios}
        toggleScenario={(s) => setScenarios((prev) => toggleInSet(prev, s))}
        customers={customers}
        toggleCustomer={(c) => setCustomers((prev) => toggleInSet(prev, c))}
        allCustomers={allCustomers}
        lang={lang}
        toggleTier={(t) => setLang((prev) => ({ ...prev, tiers: toggleInSet(prev.tiers, t) }))}
        toggleRegion={(r) => setLang((prev) => ({ ...prev, regions: toggleInSet(prev.regions, r) }))}
        toggleLangCode={(c) => setLang((prev) => ({ ...prev, codes: toggleInSet(prev.codes, c) }))}
        presentTiers={presentTiers}
        presentRegions={presentRegions}
        presentLocales={presentLocales}
        deployments={deployments}
        presentDeployments={presentDeployments}
        toggleDeployment={(d) => setDeployments((prev) => toggleInSet(prev, d))}
        hwArchs={hwArchs}
        presentArchs={presentArchs}
        toggleHwArch={(h) => setHwArchs((prev) => toggleInSet(prev, h))}
        chipsets={chipsets}
        toggleChipset={(c) => setChipsets((prev) => toggleInSet(prev, c))}
        presentChipsets={presentChipsets}
        runtimes={runtimes}
        presentRuntimes={presentRuntimes}
        toggleRuntime={(r) => setRuntimes((prev) => toggleInSet(prev, r))}
      />

      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 px-1">
          <h2 className="text-sm font-semibold text-slate-900">
            {taskType} leaderboard
          </h2>
          <span className="text-xs text-slate-500">
            {sortedModels.length} models × {orderedTestSets.length} test sets · {defaultSortHint}
          </span>
        </div>
        <div>
          <MatrixTable
            columnGroups={columnGroups}
            models={sortedModels}
            orderedTestSets={orderedTestSets}
            cellMetrics={cellMetrics}
            summaryMetrics={summaryMetrics}
            cellValue={cellValue}
            avgFor={avgFor}
            columnStats={columnStats}
            avgStats={avgStats}
            tone={tone}
            sort={sort}
            onHeaderClick={onHeaderClick}
          />
        </div>
      </div>
    </section>
  );
}

function MatrixTable({
  columnGroups,
  models,
  orderedTestSets,
  cellMetrics,
  summaryMetrics,
  cellValue,
  avgFor,
  columnStats,
  avgStats,
  tone,
  sort,
  onHeaderClick,
}: {
  columnGroups: Array<{ scenario: Scenario; customers: Array<{ customer: string; testsets: TestSet[] }>; total: number }>;
  models: Model[];
  orderedTestSets: TestSet[];
  cellMetrics: MetricSpec[];
  summaryMetrics: MetricSpec[];
  cellValue: Map<string, number>;
  avgFor: (m: Model, sp: MetricSpec) => number | null;
  columnStats: Map<string, { min: number; max: number }>;
  avgStats: Map<MetricKey, { min: number; max: number }>;
  tone: (v: number, s: { min: number; max: number } | undefined, lib: boolean) => string;
  sort: SortState;
  onHeaderClick: (id: string, lowerIsBetter: boolean) => void;
}) {
  if (orderedTestSets.length === 0) {
    return <p className="px-4 py-12 text-center text-sm text-slate-500">No test sets match the current filters.</p>;
  }
  if (models.length === 0) {
    return <p className="px-4 py-12 text-center text-sm text-slate-500">No models match the current filters.</p>;
  }

  // Fixed column widths (in px) so the header and every row line up cleanly.
  const CELL_W = 56;      // per test-set × cell-metric column
  const SUMMARY_W = 52;   // per summary-metric column
  const cellColCount = orderedTestSets.length * cellMetrics.length;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollLeft > 0);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const stickyNumHead = scrolled
    ? "sticky left-0 top-0 z-30"
    : "top-0 z-30";
  const stickyModelHead = scrolled
    ? "sticky left-12 top-0 z-30"
    : "top-0 z-20";
  const stickyNumCell = scrolled ? "sticky left-0 z-10" : "";
  const stickyModelCell = scrolled ? "sticky left-12 z-10" : "";

  return (
    <div ref={scrollRef} className="overflow-auto">
    <table className="border-separate border-spacing-0 text-sm" style={{ tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: 48 }} />
        <col style={{ width: 316 }} />
        {summaryMetrics.map((m) => (
          <col key={`sc-${m.key}`} style={{ width: SUMMARY_W }} />
        ))}
        {Array.from({ length: cellColCount }).map((_, i) => (
          <col key={`cc-${i}`} style={{ width: CELL_W }} />
        ))}
      </colgroup>
      <thead>
        {/* Scenario row */}
        <tr>
          <th
            rowSpan={3}
            className={`${stickyNumHead} w-12 border-b border-r border-slate-200 bg-white px-2 py-2 text-center text-xs uppercase tracking-wide text-slate-500`}
          >
            #
          </th>
          <th
            rowSpan={3}
                        className={`${stickyModelHead} min-w-[316px] border-b border-r border-slate-200 bg-white px-3 py-2 pr-4 text-left`}
          >
            <SortableHeader
              label="Model"
              active={sort.columnId === "model"}
              asc={sort.asc}
              onClick={() => onHeaderClick("model", true)}
            />
          </th>
          <th
            colSpan={summaryMetrics.length}
            className="border-b border-r-2 border-r-slate-300 border-b-slate-200 bg-azure-700 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-white"
          >
            Summary
          </th>
          {columnGroups.map((g) => (
            <th
              key={`sc-${g.scenario}`}
              colSpan={g.total}
              className="border-b border-r border-slate-200 bg-slate-900 px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-white"
            >
              {g.scenario}
            </th>
          ))}
        </tr>

        {/* Customer row */}
        <tr>
          <th
            colSpan={summaryMetrics.length}
            className="border-b border-r-2 border-r-slate-300 border-b-azure-200 bg-azure-50 px-3 py-1 text-center text-xs font-semibold text-azure-900"
          >
            latency · accuracy · RTF
          </th>
          {columnGroups.flatMap((g) =>
            g.customers.map((c) => (
              <th
                key={`cust-${g.scenario}-${c.customer}`}
                colSpan={c.testsets.length * cellMetrics.length}
                className="border-b border-r border-slate-200 bg-slate-100 px-3 py-1 text-left text-xs font-semibold text-slate-700"
              >
                {c.customer}
              </th>
            )),
          )}
        </tr>

        {/* Test set + sub-metric row */}
        <tr>
          {/* Summary headers (leftmost) */}
          {summaryMetrics.map((m, sIdx) => {
            const colId = `avg:${m.key}`;
            const isActive = sort.columnId === colId;
            const lastSummary = sIdx === summaryMetrics.length - 1;
            return (
              <th
                key={`avg-${m.key}`}
                className={`h-44 border-b ${lastSummary ? "border-r-2 border-r-slate-300" : "border-r border-azure-200"} bg-azure-50/40 p-0 align-bottom`}
              >
                <div className="flex h-full w-full flex-col items-center justify-end gap-1 pb-2">
                  <button
                    type="button"
                    onClick={() => onHeaderClick(colId, m.lowerIsBetter)}
                    className="text-left text-[11px] font-semibold text-azure-900 hover:text-azure-700"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {m.label}{m.unit ? ` (${m.unit})` : ""}
                  </button>
                  <div
                    className={`mt-1 cursor-pointer rounded px-1 text-[10px] font-semibold uppercase tracking-wide ${
                      isActive ? "bg-slate-900 text-white" : "text-azure-800 hover:bg-azure-100"
                    }`}
                    onClick={() => onHeaderClick(colId, m.lowerIsBetter)}
                  >
                    avg
                    {isActive && <span className="ml-0.5">{sort.asc ? "↑" : "↓"}</span>}
                  </div>
                </div>
              </th>
            );
          })}
          {orderedTestSets.flatMap((t) =>
            cellMetrics.map((m, idx) => {
              const colId = `cell:${t.id}:${m.key}`;
              const isActive = sort.columnId === colId;
              const lastInSet = idx === cellMetrics.length - 1;
              return (
                <th
                  key={`${t.id}-${m.key}`}
                  className={`h-44 border-b ${lastInSet ? "border-r border-r-slate-200" : "border-r border-slate-100"} bg-white p-0 align-bottom`}
                >
                  <HoverTip content={<TestSetTooltipContent t={t} />} placement="below">
                    <div className="flex h-full w-full flex-col items-center justify-end gap-1 pb-2">
                      {/* vertical test-set name */}
                      <button
                        type="button"
                        onClick={() => onHeaderClick(colId, m.lowerIsBetter)}
                        title={t.name}
                        className="relative flex items-end justify-center text-left text-[11px] font-medium text-slate-700 hover:text-azure-700"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        <span className="max-h-[110px] truncate">{t.name}</span>
                      </button>
                      {/* sub-metric label below, horizontal */}
                      <div
                        className={`mt-1 cursor-pointer rounded px-1 text-[10px] font-semibold uppercase tracking-wide ${
                          isActive ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                        }`}
                        onClick={() => onHeaderClick(colId, m.lowerIsBetter)}
                      >
                        {m.key === "WER" ? (prefersCerFor(t) ? "CER" : "WER") : m.label}
                        {isActive && <span className="ml-0.5">{sort.asc ? "↑" : "↓"}</span>}
                      </div>
                    </div>
                  </HoverTip>
                </th>
              );
            }),
          )}
        </tr>
      </thead>

      <tbody>
        {models.map((mdl, idx) => (
          <tr key={mdl.id} className="hover:bg-slate-50/60">
            <td className={`${stickyNumCell} border-b border-r border-slate-200 bg-white px-2 py-2 text-center text-xs font-semibold text-slate-500`}>
              {idx + 1}
            </td>
            <th
              scope="row"
              className={`${stickyModelCell} border-b border-r border-slate-200 bg-white px-3 py-2 pr-4 text-left align-top`}
            >
              <ModelHeader m={mdl} />
            </th>
            {summaryMetrics.map((m, sIdx) => {
              const a = avgFor(mdl, m);
              const stats = avgStats.get(m.key);
              const lastSummary = sIdx === summaryMetrics.length - 1;
              return (
                <td
                  key={`avg-${mdl.id}-${m.key}`}
                  className={`border-b ${lastSummary ? "border-r-2 border-r-slate-300" : "border-r border-azure-200"} bg-azure-50/40 px-2 py-2 text-right font-mono tabular-nums text-xs font-semibold ${
                    a != null ? tone(a, stats, m.lowerIsBetter) : ""
                  }`}
                >
                  {a != null ? formatValue(a, m) : <span className="text-slate-300">—</span>}
                </td>
              );
            })}
            {orderedTestSets.flatMap((t) =>
              cellMetrics.map((m, idx2) => {
                const v = cellValue.get(`${mdl.id}|${t.id}|${m.key}`);
                const stats = columnStats.get(`${t.id}|${m.key}`);
                const lastInSet = idx2 === cellMetrics.length - 1;
                return (
                  <td
                    key={`${mdl.id}-${t.id}-${m.key}`}
                    className={`border-b ${lastInSet ? "border-r border-r-slate-200" : "border-r border-slate-100"} px-2 py-2 text-right font-mono tabular-nums text-xs ${
                      v != null ? tone(v, stats, m.lowerIsBetter) : ""
                    }`}
                  >
                    {v != null ? formatValue(v, m) : <span className="text-slate-300">—</span>}
                  </td>
                );
              }),
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function formatValue(v: number, m: MetricSpec): string {
  if (m.unit === "ms") return Math.round(v).toString();
  if (m.key === "MOS" || m.key === "pronunciation_acc" || m.key === "RTF") return v.toFixed(2);
  return v.toFixed(1);
}

function SortableHeader({ label, active, asc, onClick }: { label: string; active: boolean; asc: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs uppercase tracking-wide ${active ? "text-azure-700" : "text-slate-500 hover:text-azure-700"}`}
    >
      {label}
      {active && <span className="ml-1">{asc ? "↑" : "↓"}</span>}
    </button>
  );
}

function ModelHeader({ m }: { m: Model }) {
  return (
    <HoverTip content={<ModelTooltipContent m={m} />} placement="right">
      <div className="flex items-start gap-1">
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-900">{m.name}</span>
            <InfoIcon />
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{m.vendor} · {m.modelVersion}</div>
          <div className="mt-1 flex flex-wrap gap-1">
            <Badge tone={DEPLOYMENT_TONE[m.deployment]}>{m.deployment}</Badge>
            {m.asrMode && <Badge tone="teal">{m.asrMode}</Badge>}
            {m.hardware && (
              <Badge tone="slate" title={m.hardware.chipset ?? ""}>
                {m.hardware.architecture} · {m.hardware.runtime}
                {m.hardware.quantization ? ` · ${m.hardware.quantization}` : ""}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </HoverTip>
  );
}

function TestSetTooltipContent({ t }: { t: TestSet }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-slate-900">{t.name}</div>
        {t.homepageUrl && (
          <a
            href={t.homepageUrl}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto shrink-0 rounded-md border border-azure-500 px-2 py-0.5 text-[11px] font-medium text-azure-700 hover:bg-azure-50"
          >
            homepage ↗
          </a>
        )}
      </div>
      {t.descriptionBullets && t.descriptionBullets.length > 0 ? (
        <ul className="mt-2 list-disc space-y-0.5 pl-4">
          {t.descriptionBullets.map((b, i) => (<li key={i}>{b}</li>))}
        </ul>
      ) : (
        <p className="mt-2 text-slate-600">{t.description}</p>
      )}
      <div className="mt-2 flex flex-wrap gap-1">
        <Badge tone="slate">{t.scenario}</Badge>
        <Badge tone="indigo">{t.customer}</Badge>
        {t.languages.map((l) => (
          <Badge key={l.code} tone="teal">{l.code} · {l.tier} · {l.region}</Badge>
        ))}
        <Badge tone="slate">{t.size} samples</Badge>
        {t.allowsThirdPartyEndpoints && <Badge tone="amber">⚠ may call 3rd-party endpoints</Badge>}
      </div>
    </>
  );
}

function ModelTooltipContent({ m }: { m: Model }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-slate-900">{m.name}</div>
        {m.homepageUrl && (
          <a
            href={m.homepageUrl}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto shrink-0 rounded-md border border-azure-500 px-2 py-0.5 text-[11px] font-medium text-azure-700 hover:bg-azure-50"
          >
            homepage ↗
          </a>
        )}
      </div>
      {m.descriptionBullets && m.descriptionBullets.length > 0 ? (
        <ul className="mt-2 list-disc space-y-0.5 pl-4">
          {m.descriptionBullets.map((b, i) => (<li key={i}>{b}</li>))}
        </ul>
      ) : m.notes ? (
        <p className="mt-2 text-slate-600">{m.notes}</p>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-1">
        <Badge tone="slate">{m.vendor}</Badge>
        <Badge tone={DEPLOYMENT_TONE[m.deployment]}>{m.deployment}</Badge>
        {m.asrMode && <Badge tone="teal">{m.asrMode}</Badge>}
        {m.hardware && (
          <>
            <Badge tone="slate">
              {m.hardware.architecture}{m.hardware.chipset ? ` · ${m.hardware.chipset}` : ""}
            </Badge>
            <Badge tone="slate">
              {m.hardware.runtime}{m.hardware.quantization ? ` · ${m.hardware.quantization}` : ""}
            </Badge>
            {m.hardware.memoryFootprintMb != null && (
              <Badge tone="slate">{m.hardware.memoryFootprintMb} MB RAM</Badge>
            )}
          </>
        )}
      </div>
    </>
  );
}

type Placement = "right" | "below" | "above";

function HoverTip({
  content,
  placement = "below",
  children,
}: {
  content: React.ReactNode;
  placement?: Placement;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const TIP_W = 320;

  const show = (e: React.MouseEvent | React.FocusEvent) => {
    const el = e.currentTarget as HTMLElement;
    // `display: contents` means el itself has no box — use first element child,
    // or fall back to the event's target.
    const firstChild = el.firstElementChild as HTMLElement | null;
    const source = firstChild ?? el;
    const r = source.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let top = 0;
    let left = 0;
    if (placement === "right") {
      top = r.top;
      left = r.right + 8;
      if (left + TIP_W > vw - 8) left = Math.max(8, r.left - TIP_W - 8);
    } else if (placement === "above") {
      top = r.top - 8;
      left = r.left + r.width / 2 - TIP_W / 2;
    } else {
      // below
      top = r.bottom + 6;
      left = r.left + r.width / 2 - TIP_W / 2;
    }
    if (left < 8) left = 8;
    if (left + TIP_W > vw - 8) left = vw - TIP_W - 8;
    if (top < 8) top = 8;
    if (top > vh - 40) top = vh - 40;
    setPos({ top, left });
  };
  const hide = () => setPos(null);

  return (
    <div
      style={{ display: "contents" }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {pos &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: TIP_W,
              zIndex: 10000,
              transform: placement === "above" ? "translateY(-100%)" : undefined,
            }}
            className="pointer-events-none rounded-lg border border-slate-200 bg-white p-3 text-left text-xs text-slate-700 shadow-xl"
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
}

function InfoIcon() {
  return (
    <span
      aria-hidden
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600"
    >
      i
    </span>
  );
}

function FilterPanel(props: {
  open: boolean;
  setOpen: (v: boolean) => void;
  chips: Array<{ label: string; clear: () => void }>;
  clearAll: () => void;
  scenarios: Set<Scenario>;
  presentScenarios: Scenario[];
  toggleScenario: (s: Scenario) => void;
  customers: Set<string>;
  toggleCustomer: (c: string) => void;
  allCustomers: string[];
  lang: LangFilter;
  toggleTier: (t: LanguageTier) => void;
  toggleRegion: (r: Region) => void;
  toggleLangCode: (c: string) => void;
  presentTiers: LanguageTier[];
  presentRegions: Region[];
  presentLocales: LocaleInfo[];
  deployments: Set<ModelDeployment>;
  presentDeployments: ModelDeployment[];
  toggleDeployment: (d: ModelDeployment) => void;
  hwArchs: Set<HwArchitecture>;
  presentArchs: HwArchitecture[];
  toggleHwArch: (h: HwArchitecture) => void;
  chipsets: Set<string>;
  toggleChipset: (c: string) => void;
  presentChipsets: string[];
  runtimes: Set<Runtime>;
  presentRuntimes: Runtime[];
  toggleRuntime: (r: Runtime) => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => props.setOpen(!props.open)}
        className="flex w-full items-center justify-between gap-3 rounded-t-lg px-4 py-2 text-left hover:bg-slate-50"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Filters
          </span>
          {props.chips.length === 0 ? (
            <span className="text-xs text-slate-400">none active</span>
          ) : (
            props.chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1 rounded-full bg-azure-100 px-2 py-0.5 text-xs text-azure-800"
              >
                {c.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    c.clear();
                  }}
                  className="ml-0.5 rounded-full text-azure-700 hover:bg-azure-200"
                >
                  ✕
                </button>
              </span>
            ))
          )}
          {props.chips.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                props.clearAll();
              }}
              className="text-xs text-slate-500 underline-offset-2 hover:underline"
            >
              clear all
            </button>
          )}
        </div>
        <span className="text-xs text-slate-500">{props.open ? "▴ collapse" : "▾ expand"}</span>
      </button>

      {/* Animated collapse: grid-rows trick so the panel can transition from
          full height to 0 without a measured height. */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          props.open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="space-y-4 border-t border-slate-100 px-4 py-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <ChipGroup
                label="Scenario"
                options={props.presentScenarios.map((s) => ({ value: s, label: s }))}
                selected={props.scenarios as Set<string>}
                toggle={(v) => props.toggleScenario(v as Scenario)}
              />
              <ChipGroup
                label="Customer"
                options={props.allCustomers.map((c) => ({ value: c, label: c }))}
                selected={props.customers}
                toggle={(v) => props.toggleCustomer(v)}
              />
            </div>

            <div className="space-y-3 rounded-md border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Language
                </div>
                <div className="text-[10px] text-slate-500">
                  pick a Tier and/or Region, then drill into locales
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <ChipGroup
                  label="Tier"
                  dense
                  options={props.presentTiers.map((t) => ({ value: t, label: t }))}
                  selected={props.lang.tiers as Set<string>}
                  toggle={(v) => props.toggleTier(v as LanguageTier)}
                />
                <ChipGroup
                  label="Region"
                  dense
                  options={props.presentRegions.map((r) => ({ value: r, label: r }))}
                  selected={props.lang.regions as Set<string>}
                  toggle={(v) => props.toggleRegion(v as Region)}
                />
              </div>
              <ChipGroup
                label={`Locales (${props.presentLocales.length})`}
                dense
                options={props.presentLocales.map((l) => ({
                  value: l.code,
                  label: `${l.code} · ${l.name}`,
                }))}
                selected={props.lang.codes}
                toggle={(v) => props.toggleLangCode(v)}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <ChipGroup
                label="Deployment"
                options={props.presentDeployments.map((d) => ({ value: d, label: d }))}
                selected={props.deployments as Set<string>}
                toggle={(v) => props.toggleDeployment(v as ModelDeployment)}
              />
              <ChipGroup
                label="Hardware architecture"
                options={props.presentArchs.map((h) => ({ value: h, label: h }))}
                selected={props.hwArchs as Set<string>}
                toggle={(v) => props.toggleHwArch(v as HwArchitecture)}
              />
            </div>

            <ChipGroup
              label="Testing Hardware"
              options={props.presentChipsets.map((c) => ({ value: c, label: c }))}
              selected={props.chipsets}
              toggle={(v) => props.toggleChipset(v)}
            />

            <ChipGroup
              label="Runtime"
              options={props.presentRuntimes.map((r) => ({ value: r, label: r }))}
              selected={props.runtimes as Set<string>}
              toggle={(v) => props.toggleRuntime(v as Runtime)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  toggle,
  dense,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: Set<string>;
  toggle: (v: string) => void;
  dense?: boolean;
}) {
  return (
    <div>
      <div className={`${dense ? "mb-1" : "mb-1.5"} text-[11px] font-medium uppercase tracking-wide text-slate-500`}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.length === 0 && (
          <span className="text-xs text-slate-400">—</span>
        )}
        {options.map((o) => {
          const on = selected.has(o.value);
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => toggle(o.value)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition ${
                on
                  ? "bg-azure-600 text-white ring-azure-600"
                  : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-50"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

