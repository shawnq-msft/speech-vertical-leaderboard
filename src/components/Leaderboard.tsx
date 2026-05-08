import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ALL_METRIC_MAP,
  type LanguageTier,
  type MetricKey,
  type MetricSpec,
  type Model,
  type ModelDeployment,
  type Region,
  type Result,
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
  "Africa",
  "Greater-China",
  "Japan-Korea",
  "Southeast-Asia",
  "India-South-Asia",
];

const ALL_TIERS: LanguageTier[] = ["tier-1", "tier-2", "tier-3"];


// Per-test-set columns show only the PRIMARY metric (WER for ASR, MOS for TTS).
// The Average/summary block shows the full metric suite so latency P50/P95
// remain visible without widening the per-testset grid.
const TTS_PRIMARY: MetricSpec[] = [
  { key: "MOS", label: "MOS", unit: "", lowerIsBetter: false },
];
const TTS_SUMMARY: MetricSpec[] = [
  { key: "MOS", label: "MOS", unit: "", lowerIsBetter: false },
  { key: "pronunciation_acc", label: "Acc", unit: "", lowerIsBetter: false },
  { key: "first_byte_latency_p50_ms", label: "First Lat P50", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p95_ms", label: "First Lat P95", unit: "ms", lowerIsBetter: true },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

const ASR_PRIMARY: MetricSpec[] = [
  { key: "WER", label: "WER/CER", unit: "%", lowerIsBetter: true },
];

function prefersCerFor(t: TestSet): boolean {
  const lang = t.languages[0]?.code ?? "";
  return lang.startsWith("zh") || lang.startsWith("ja") || lang.startsWith("ko");
}

function metricsForTestSet(t: TestSet, taskType: TaskType): MetricSpec[] {
  if (t.metrics?.length) {
    return t.metrics.map(k => ALL_METRIC_MAP.get(k)!).filter(Boolean);
  }
  return taskType === "TTS" ? TTS_PRIMARY : ASR_PRIMARY;
}

const P90_COMPANION: Partial<Record<MetricKey, MetricKey>> = {
  CER: "CER_p90" as MetricKey,
  WER: "WER_p90" as MetricKey,
  first_byte_latency_p50_ms: "first_byte_latency_p90_ms" as MetricKey,
  first_latency_ms: "first_latency_p90_ms" as MetricKey,
  lbl_ms: "lbl_p90_ms" as MetricKey,
  upl_ms: "upl_p90_ms" as MetricKey,
  final_result_latency_p50_ms: "final_result_latency_p95_ms" as MetricKey,
};
const ASR_SUMMARY: MetricSpec[] = [
  { key: "WER", label: "WER/CER", unit: "%", lowerIsBetter: true },
  { key: "first_latency_ms", label: "First Lat", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p50_ms", label: "FBL P50", unit: "ms", lowerIsBetter: true },
  { key: "upl_ms", label: "UPL", unit: "ms", lowerIsBetter: true },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

const METRIC_DEFINITIONS: Partial<Record<MetricKey, string>> = {
  WER: "Word Error Rate — percentage of incorrectly transcribed words",
  CER: "Character Error Rate — percentage of incorrectly transcribed characters",
  CER_p90: "CER at the 90th percentile across samples",
  MOS: "Mean Opinion Score — subjective quality rating (1–5 scale)",
  RTF: "Real-Time Factor — processing time / audio duration (< 1 = faster than real-time)",
  pronunciation_acc: "Pronunciation accuracy — fraction of correctly pronounced phonemes",
  first_byte_latency_ms: "First Byte Latency — time until first audio/text byte is received",
  first_byte_latency_p50_ms: "First Byte Latency P50 — median time to first byte",
  first_byte_latency_p90_ms: "First Byte Latency P90 — 90th percentile time to first byte",
  first_byte_latency_p95_ms: "First Byte Latency P95 — 95th percentile time to first byte",
  first_latency_ms: "First Latency — time from request to first recognized result",
  final_result_latency_ms: "Final Result Latency — time from end of speech to final transcript",
  final_result_latency_p50_ms: "Final Result Latency P50 — median time to final result",
  final_result_latency_p95_ms: "Final Result Latency P95 — 95th percentile time to final result",
  intermediate_result_latency_ms: "Intermediate Result Latency — time to partial/hypothesis result",
  upl_ms: "User-Perceived Latency — end-to-end latency as experienced by the user",
  upl_p50_ms: "UPL P50 — median user-perceived latency",
  upl_p90_ms: "UPL P90 — 90th percentile user-perceived latency",
  upl_p95_ms: "UPL P95 — 95th percentile user-perceived latency",
  lbl_ms: "LBL (Last-final Beyond Last-chunk) — time from last uploaded byte to final result; can be negative when streaming runs ahead",
  lbl_p90_ms: "LBL P90 — 90th percentile last-final beyond last-chunk latency",
  first_latency_p90_ms: "First Latency P90 — 90th percentile time to first recognized result",
  WER_p90: "WER at the 90th percentile across samples",
};

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
    const qs = params.toString();
    const url = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
    window.history.replaceState(null, "", url);
  }, [urlPrefix, scenarios, customers, lang]);

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


  const [transposed, setTransposed] = useState(false);
  const [hiddenModels, setHiddenModels] = useState<Set<string>>(() => new Set());
  const [hiddenMetrics, setHiddenMetrics] = useState<Set<MetricKey>>(() => new Set(["lbl_ms", "lbl_p90_ms"] as MetricKey[]));

  const visibleMetricsFor = (t: TestSet): MetricSpec[] =>
    metricsForTestSet(t, taskType).filter(m => !hiddenMetrics.has(m.key));

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
      if (hiddenModels.has(m.id)) return false;
      return true;
    });
  }, [taskModels, hiddenModels]);

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
    for (const r of results) {
      if (r.metric === "WER") {
        if (!testSetPrefersCer.get(r.testSetId)) {
          map.set(`${r.modelId}|${r.testSetId}|WER`, r.value);
        }
      } else if (r.metric === "CER") {
        if (testSetPrefersCer.get(r.testSetId)) {
          map.set(`${r.modelId}|${r.testSetId}|WER`, r.value);
        }
        map.set(`${r.modelId}|${r.testSetId}|CER`, r.value);
      } else {
        map.set(`${r.modelId}|${r.testSetId}|${r.metric}`, r.value);
      }
    }
    return map;
  }, [results, testSetPrefersCer]);

  // Group test sets: scenario → customer → locale → testsets[]
  type LocaleGroup = { locale: string; testsets: TestSet[] };
  type CustomerGroup = { customer: string; locales: LocaleGroup[]; testsets: TestSet[] };
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
        .map(([c, ts]) => {
          // Group by locale within customer
          const byLocale = new Map<string, TestSet[]>();
          for (const t of ts) {
            const loc = t.languages[0]?.code ?? "other";
            const arr = byLocale.get(loc) ?? [];
            arr.push(t);
            byLocale.set(loc, arr);
          }
          const locales = [...byLocale.entries()]
            .map(([loc, lts]) => ({ locale: loc, testsets: lts.sort((a, b) => a.name.localeCompare(b.name)) }))
            .sort((a, b) => a.locale.localeCompare(b.locale));
          return { customer: c, locales, testsets: locales.flatMap(l => l.testsets) };
        })
        .sort((a, b) => a.customer.localeCompare(b.customer));
      groups.push({
        scenario: sc,
        customers: customersArr,
        total: customersArr.reduce((n, c) => n + c.testsets.reduce((s, t) => s + visibleMetricsFor(t).length, 0), 0),
      });
    }
    groups.sort((a, b) => a.scenario.localeCompare(b.scenario));
    return groups;
  }, [filteredTestSets, taskType, hiddenMetrics]);

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

  const visibleModels = useMemo(() => {
    return sortedModels.filter((mdl) =>
      orderedTestSets.some((t) =>
        visibleMetricsFor(t).some((m) =>
          cellValue.has(`${mdl.id}|${t.id}|${m.key}`),
        ),
      ),
    );
  }, [sortedModels, orderedTestSets, taskType, cellValue]);

  const visibleSummaryMetrics = useMemo(() => {
    return summaryMetrics.filter((m) =>
      !hiddenMetrics.has(m.key) && visibleModels.some((mdl) => avgFor(mdl, m) != null),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryMetrics, visibleModels, orderedTestSets, cellValue, hiddenMetrics]);

  // Per-cell-column min/max for heat-map coloring
  const columnStats = useMemo(() => {
    const stats = new Map<string, { min: number; max: number }>();
    for (const t of orderedTestSets) {
      for (const m of visibleMetricsFor(t)) {
        const key = `${t.id}|${m.key}`;
        const vals: number[] = [];
        for (const model of visibleModels) {
          const v = cellValue.get(`${model.id}|${t.id}|${m.key}`);
          if (typeof v === "number") vals.push(v);
        }
        if (vals.length === 0) continue;
        stats.set(key, { min: Math.min(...vals), max: Math.max(...vals) });
      }
    }
    return stats;
  }, [orderedTestSets, visibleModels, taskType, cellValue]);

  // Per-avg-column min/max
  const avgStats = useMemo(() => {
    const stats = new Map<MetricKey, { min: number; max: number }>();
    for (const m of summaryMetrics) {
      const vals: number[] = [];
      for (const model of visibleModels) {
        const a = avgFor(model, m);
        if (a != null) vals.push(a);
      }
      if (vals.length === 0) continue;
      stats.set(m.key, { min: Math.min(...vals), max: Math.max(...vals) });
    }
    return stats;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryMetrics, visibleModels, orderedTestSets, cellValue]);

  const [colorMode, setColorMode] = useState<"relative" | "release-bar">("relative");

  function releaseBarGradient(v: number, greenMax: number, yellowMax: number, redMin: number): React.CSSProperties | null {
    const G = [34, 197, 94];
    const Y = [234, 179, 8];
    const R = [239, 68, 68];
    if (v <= greenMax) return { backgroundColor: `rgba(${G[0]},${G[1]},${G[2]},0.18)` };
    if (v >= redMin) return { backgroundColor: `rgba(${R[0]},${R[1]},${R[2]},0.22)` };
    if (v <= yellowMax) {
      const t = (v - greenMax) / (yellowMax - greenMax);
      const r = Math.round(G[0] + t * (Y[0] - G[0]));
      const g = Math.round(G[1] + t * (Y[1] - G[1]));
      const b = Math.round(G[2] + t * (Y[2] - G[2]));
      return { backgroundColor: `rgba(${r},${g},${b},0.18)` };
    }
    const t = (v - yellowMax) / (redMin - yellowMax);
    const r = Math.round(Y[0] + t * (R[0] - Y[0]));
    const g = Math.round(Y[1] + t * (R[1] - Y[1]));
    const b = Math.round(Y[2] + t * (R[2] - Y[2]));
    return { backgroundColor: `rgba(${r},${g},${b},${0.18 + t * 0.04})` };
  }

  function releaseBar(value: number, metric?: MetricKey): React.CSSProperties | null {
    // WER: ≤5% green, 5-20% green→yellow, 20-30% yellow→red, ≥30% red
    if (metric === "WER") return releaseBarGradient(value, 5, 20, 30);
    // First Latency: <1000 green, 1000-2000 green→yellow→red, ≥2000 red
    if (metric === "first_latency_ms") return releaseBarGradient(value, 1000, 1500, 2000);
    // UPL: <800 green, 800-1500 green→yellow→red, ≥1500 red
    if (metric === "upl_ms") return releaseBarGradient(value, 800, 1150, 1500);
    return null;
  }

  function tone(value: number, stats: { min: number; max: number } | undefined, lowerIsBetter: boolean, metric?: MetricKey): React.CSSProperties {
    if (colorMode === "release-bar") {
      const bar = releaseBar(value, metric);
      if (bar) return bar;
    }
    if (!stats || stats.min === stats.max) return {};
    const span = stats.max - stats.min;
    const pos = lowerIsBetter ? (value - stats.min) / span : (stats.max - value) / span;
    if (pos < 0.15) return { backgroundColor: "rgba(236,253,245,1)" };
    if (pos < 0.4) return { backgroundColor: "rgba(236,253,245,0.5)" };
    if (pos > 0.85) return { backgroundColor: "rgba(255,241,242,1)" };
    if (pos > 0.6) return { backgroundColor: "rgba(255,251,235,1)" };
    return {};
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
        hiddenModels={hiddenModels}
        allModels={taskModels.filter(m => orderedTestSets.some(t => visibleMetricsFor(t).some(mt => cellValue.has(`${m.id}|${t.id}|${mt.key}`))))}
        toggleModel={(id) => setHiddenModels((prev) => toggleInSet(prev, id))}
        hiddenMetrics={hiddenMetrics}
        allMetrics={Array.from(new Set(filteredTestSets.flatMap(t => metricsForTestSet(t, taskType).map(m => m.key))))}
        toggleMetric={(k) => setHiddenMetrics((prev) => toggleInSet(prev, k))}
      />

      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 px-1">
          <h2 className="text-sm font-semibold text-slate-900">
            {taskType} leaderboard
          </h2>
          <span className="flex items-center gap-3 text-xs text-slate-500">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <span className="text-slate-600 font-medium">Color:</span>
              <button
                type="button"
                onClick={() => setColorMode(colorMode === "relative" ? "release-bar" : "relative")}
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${colorMode === "relative" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >Relative</button>
              <button
                type="button"
                onClick={() => setColorMode(colorMode === "release-bar" ? "relative" : "release-bar")}
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${colorMode === "release-bar" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >Release Bar</button>
            </label>
            {visibleModels.length} models × {orderedTestSets.length} test sets · {defaultSortHint}
          </span>
        </div>
        <div className="relative">
          {transposed ? (
            <TransposedTable
              columnGroups={columnGroups}
              models={visibleModels}
              orderedTestSets={orderedTestSets}
              cellValue={cellValue}
              tone={tone}
              columnStats={columnStats}
              metricsFor={visibleMetricsFor}
              avgFor={avgFor}
              summaryMetrics={visibleSummaryMetrics}
              avgStats={avgStats}
              onToggleTranspose={() => setTransposed(v => !v)}
              sort={sort}
              onHeaderClick={onHeaderClick}
            />
          ) : (
            <MatrixTable
              columnGroups={columnGroups}
              models={visibleModels}
              orderedTestSets={orderedTestSets}
              summaryMetrics={visibleSummaryMetrics}
              cellValue={cellValue}
              avgFor={avgFor}
              columnStats={columnStats}
              avgStats={avgStats}
              tone={tone}
              sort={sort}
              onHeaderClick={onHeaderClick}
              metricsFor={visibleMetricsFor}
              onToggleTranspose={() => setTransposed(v => !v)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function MatrixTable({
  columnGroups,
  models,
  orderedTestSets,
  summaryMetrics,
  cellValue,
  avgFor,
  columnStats,
  avgStats,
  tone,
  sort,
  onHeaderClick,
  metricsFor,
  onToggleTranspose,
}: {
  columnGroups: Array<{ scenario: Scenario; customers: Array<{ customer: string; locales: Array<{ locale: string; testsets: TestSet[] }>; testsets: TestSet[] }>; total: number }>;
  models: Model[];
  orderedTestSets: TestSet[];
  summaryMetrics: MetricSpec[];
  cellValue: Map<string, number>;
  avgFor: (m: Model, sp: MetricSpec) => number | null;
  columnStats: Map<string, { min: number; max: number }>;
  avgStats: Map<MetricKey, { min: number; max: number }>;
  tone: (v: number, s: { min: number; max: number } | undefined, lib: boolean, metric?: MetricKey) => React.CSSProperties;
  sort: SortState;
  onHeaderClick: (id: string, lowerIsBetter: boolean) => void;
  metricsFor: (t: TestSet) => MetricSpec[];
  onToggleTranspose: () => void;
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
  const cellColCount = orderedTestSets.reduce((n, t) => n + metricsFor(t).length, 0);

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
            rowSpan={5}
            className={`${stickyNumHead} w-12 border-b border-r border-slate-200 bg-white px-2 py-2 text-center text-xs uppercase tracking-wide text-slate-500`}
          >
            <button
              type="button"
              onClick={onToggleTranspose}
              title="Switch to testsets-as-rows"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
            </button>
          </th>
          <th
            rowSpan={5}
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
                colSpan={c.testsets.reduce((n, t) => n + metricsFor(t).length, 0)}
                className="border-b border-r border-slate-200 bg-slate-100 px-3 py-1 text-left text-xs font-semibold text-slate-700"
              >
                {c.customer}
              </th>
            )),
          )}
        </tr>

        {/* Locale row */}
        <tr>
          <th
            colSpan={summaryMetrics.length}
            className="border-b border-r-2 border-r-slate-300 border-b-azure-200 bg-azure-50/20 px-3 py-0.5 text-center text-[10px] text-azure-700"
          />
          {columnGroups.flatMap((g) =>
            g.customers.flatMap((c) =>
              c.locales.map((loc) => (
                <th
                  key={`loc-${g.scenario}-${c.customer}-${loc.locale}`}
                  colSpan={loc.testsets.reduce((n, t) => n + metricsFor(t).length, 0)}
                  className="border-b border-r border-slate-200 bg-slate-50 px-2 py-0.5 text-center text-[10px] font-medium text-slate-600"
                >
                  {loc.locale}
                </th>
              )),
            ),
          )}
        </tr>

        {/* Test set name row */}
        <tr>
          {summaryMetrics.map((m, sIdx) => {
            const colId = `avg:${m.key}`;
            const isActive = sort.columnId === colId;
            const lastSummary = sIdx === summaryMetrics.length - 1;
            return (
              <th
                key={`avg-${m.key}`}
                rowSpan={2}
                className={`border-b ${lastSummary ? "border-r-2 border-r-slate-300" : "border-r border-azure-200"} bg-azure-50/40 px-1 py-1 text-center align-bottom`}
              >
                <div
                  className={`cursor-pointer rounded px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    isActive ? "bg-slate-900 text-white" : "text-azure-800 hover:bg-azure-100"
                  }`}
                  onClick={() => onHeaderClick(colId, m.lowerIsBetter)}
                >
                  {m.label}
                  {isActive && <span className="ml-0.5">{sort.asc ? "↑" : "↓"}</span>}
                </div>
              </th>
            );
          })}
          {orderedTestSets.map((t) => {
            const tsMetrics = metricsFor(t);
            return (
              <th
                key={`tsname-${t.id}`}
                colSpan={tsMetrics.length}
                className="h-32 border-b border-r border-slate-200 bg-slate-50 p-0 align-bottom"
              >
                <HoverTip content={<TestSetTooltipContent t={t} />} placement="below">
                  <div className="flex h-full w-full flex-col items-center justify-end gap-0 pb-1">
                    <span
                      className="text-[11px] font-medium text-slate-700"
                      title={t.name}
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", maxHeight: 110, overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {t.name.replace(new RegExp(`^${t.customer}\\s*`, "i"), "")}
                    </span>
                  </div>
                </HoverTip>
              </th>
            );
          })}
        </tr>

        {/* Metric row */}
        <tr>
          {orderedTestSets.flatMap((t) => {
            const tsMetrics = metricsFor(t);
            return tsMetrics.map((m, idx) => {
              const colId = `cell:${t.id}:${m.key}`;
              const isActive = sort.columnId === colId;
              const lastInSet = idx === tsMetrics.length - 1;
              const label = m.key === "WER" ? (prefersCerFor(t) ? "CER" : "WER") : m.label;
              const def = METRIC_DEFINITIONS[m.key];
              return (
                <th
                  key={`${t.id}-${m.key}`}
                  className={`border-b ${lastInSet ? "border-r border-r-slate-200" : "border-r border-slate-100"} bg-white px-1 py-1 text-center`}
                >
                  <HoverTip content={def ? <span>{def}</span> : <span>{label}</span>} placement="above">
                    <div
                      className={`cursor-pointer rounded px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        isActive ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                      }`}
                      onClick={() => onHeaderClick(colId, m.lowerIsBetter)}
                    >
                      {label}
                      {isActive && <span className="ml-0.5">{sort.asc ? "↑" : "↓"}</span>}
                    </div>
                  </HoverTip>
                </th>
              );
            });
          })}
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
              const p90Key = P90_COMPANION[m.key];
              const p90Spec = p90Key ? ALL_METRIC_MAP.get(p90Key) : undefined;
              const p90Avg = p90Spec ? avgFor(mdl, p90Spec) : null;
              const stats = avgStats.get(m.key);
              const lastSummary = sIdx === summaryMetrics.length - 1;
              return (
                <td
                  key={`avg-${mdl.id}-${m.key}`}
                  className={`border-b ${lastSummary ? "border-r-2 border-r-slate-300" : "border-r border-azure-200"} bg-azure-50/40 px-2 py-1.5 text-right font-mono tabular-nums text-xs font-semibold`}
                  style={a != null ? tone(a, stats, m.lowerIsBetter, m.key) : undefined}
                >
                  {a != null ? formatValue(a, m) : <span className="text-slate-300">—</span>}
                  {p90Avg != null && <div className="text-[9px] font-normal text-slate-400">{formatValue(p90Avg, p90Spec!)}</div>}
                </td>
              );
            })}
            {orderedTestSets.flatMap((t) => {
              const tsMetrics = metricsFor(t);
              return tsMetrics.map((m, idx2) => {
                const v = cellValue.get(`${mdl.id}|${t.id}|${m.key}`);
                const p90Key = P90_COMPANION[m.key];
                const p90Val = p90Key ? cellValue.get(`${mdl.id}|${t.id}|${p90Key}`) : undefined;
                const p90Spec = p90Key ? ALL_METRIC_MAP.get(p90Key) : undefined;
                const stats = columnStats.get(`${t.id}|${m.key}`);
                const lastInSet = idx2 === tsMetrics.length - 1;
                return (
                  <td
                    key={`${mdl.id}-${t.id}-${m.key}`}
                    className={`border-b ${lastInSet ? "border-r border-r-slate-200" : "border-r border-slate-100"} px-2 py-1.5 text-right font-mono tabular-nums text-xs`}
                    style={v != null ? tone(v, stats, m.lowerIsBetter, m.key) : undefined}
                  >
                    {v != null ? formatValue(v, m) : <span className="text-slate-300">—</span>}
                    {p90Val != null && p90Spec && <div className="text-[9px] text-slate-400">{formatValue(p90Val, p90Spec)}</div>}
                  </td>
                );
              });
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function TransposedTable({
  columnGroups,
  models,
  orderedTestSets,
  cellValue,
  tone,
  columnStats,
  metricsFor,
  avgFor,
  summaryMetrics,
  avgStats,
  onToggleTranspose,
  sort,
  onHeaderClick,
}: {
  columnGroups: Array<{ scenario: Scenario; customers: Array<{ customer: string; locales: Array<{ locale: string; testsets: TestSet[] }>; testsets: TestSet[] }>; total: number }>;
  models: Model[];
  orderedTestSets: TestSet[];
  cellValue: Map<string, number>;
  tone: (v: number, s: { min: number; max: number } | undefined, lib: boolean, metric?: MetricKey) => React.CSSProperties;
  columnStats: Map<string, { min: number; max: number }>;
  metricsFor: (t: TestSet) => MetricSpec[];
  avgFor: (m: Model, sp: MetricSpec) => number | null;
  summaryMetrics: MetricSpec[];
  avgStats: Map<MetricKey, { min: number; max: number }>;
  onToggleTranspose: () => void;
  sort: SortState;
  onHeaderClick: (id: string, lowerIsBetter: boolean) => void;
}) {
  if (orderedTestSets.length === 0 || models.length === 0) {
    return <p className="px-4 py-12 text-center text-sm text-slate-500">No data matches the current filters.</p>;
  }

  const MODEL_COL_W = 72;
  const HEADER_H = 260;

  const tsRowCount = (t: TestSet) => metricsFor(t).length;
  const localeRowCount = (loc: { testsets: TestSet[] }) => loc.testsets.reduce((n, t) => n + tsRowCount(t), 0);
  const customerRowCount = (c: { locales: Array<{ testsets: TestSet[] }> }) => c.locales.reduce((n, l) => n + localeRowCount(l), 0);
  const scenarioRowCount = (g: { customers: Array<{ locales: Array<{ testsets: TestSet[] }> }> }) => g.customers.reduce((n, c) => n + customerRowCount(c), 0);

  return (
    <div className="overflow-auto">
      <table className="border-separate border-spacing-0 text-sm" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: 36 }} />
          <col style={{ width: 56 }} />
          <col style={{ width: 48 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 48 }} />
          {models.map((m) => <col key={m.id} style={{ width: MODEL_COL_W }} />)}
        </colgroup>
        <thead>
          <tr>
            <th colSpan={4} className="border-b border-r border-slate-200 bg-white px-2 py-1 text-left">
              <button type="button" onClick={onToggleTranspose} title="Switch to models-as-rows" className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
              </button>
            </th>
            <th className="border-b border-r border-slate-200 bg-white px-1 py-1 text-center text-[10px] font-semibold text-slate-500">Metric</th>
            {models.map((m) => (
              <th key={m.id} className="border-b border-r border-slate-200 bg-slate-50 p-0" style={{ height: HEADER_H, width: MODEL_COL_W }}>
                <HoverTip content={<ModelTooltipContent m={m} />} placement="below">
                  <div
                    className="py-1 px-0.5"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", height: HEADER_H, width: MODEL_COL_W, overflow: "hidden", textAlign: "left" }}
                  >
                    <span className="font-semibold text-slate-900 text-sm" style={{ lineHeight: 1.4 }}>{m.name}</span>
                    <br />
                    <span className="text-xs text-slate-500" style={{ lineHeight: 1.4 }}>{m.vendor} · {m.modelVersion}</span>
                    <br />
                    <span style={{ marginTop: 2, display: "inline" }}>
                      <span className="text-[10px] text-slate-500">{m.deployment}</span>
                      {m.asrMode && <span className="text-[10px] text-slate-500">{" · "}{m.asrMode}</span>}
                      {m.hardware && (
                        <span className="text-[10px] text-slate-500">
                          {" · "}{m.hardware.architecture} · {m.hardware.runtime}
                          {m.hardware.quantization ? ` · ${m.hardware.quantization}` : ""}
                        </span>
                      )}
                    </span>
                  </div>
                </HoverTip>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summaryMetrics.map((metric, sIdx) => (
            <tr key={`summary-${metric.key}`}>
              {sIdx === 0 && (
                <th colSpan={4} rowSpan={summaryMetrics.length} className="border-b border-r border-slate-200 bg-azure-700 px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-white align-middle">Summary</th>
              )}
              <td className="border-b border-r border-azure-200 bg-azure-50 px-1 py-1 text-center text-[10px] font-semibold text-azure-800">
                <div
                  className={`cursor-pointer rounded px-1 py-0.5 ${sort.columnId === `avg:${metric.key}` ? "bg-slate-900 text-white" : "hover:bg-azure-100"}`}
                  onClick={() => onHeaderClick(`avg:${metric.key}`, metric.lowerIsBetter)}
                >
                  {metric.label}
                  {sort.columnId === `avg:${metric.key}` && <span className="ml-0.5">{sort.asc ? "↑" : "↓"}</span>}
                </div>
              </td>
              {models.map((mdl) => {
                const a = avgFor(mdl, metric);
                const stats = avgStats.get(metric.key);
                return (
                  <td key={mdl.id} className="border-b border-r border-azure-100 px-1 py-1 text-right font-mono tabular-nums text-xs font-semibold" style={a != null ? tone(a, stats, metric.lowerIsBetter, metric.key) : undefined}>
                    {a != null ? formatValue(a, metric) : <span className="text-slate-300">—</span>}
                  </td>
                );
              })}
            </tr>
          ))}
          {columnGroups.flatMap((g) => {
            const sRows = scenarioRowCount(g);
            if (sRows === 0) return [];
            let scenarioRendered = false;
            return g.customers.flatMap((c) => {
              const cRows = customerRowCount(c);
              if (cRows === 0) return [];
              let customerRendered = false;
              return c.locales.flatMap((loc) => {
                const lRows = localeRowCount(loc);
                if (lRows === 0) return [];
                let localeRendered = false;
                return loc.testsets.flatMap((t) => {
                  const tsMetrics = metricsFor(t);
                  if (tsMetrics.length === 0) return [];
                  return tsMetrics.map((metric, mIdx) => {
                    const showScenario = !scenarioRendered;
                    const showCustomer = !customerRendered;
                    const showLocale = !localeRendered;
                    if (showScenario) scenarioRendered = true;
                    if (showCustomer) customerRendered = true;
                    if (showLocale) localeRendered = true;
                    return (
                      <tr key={`${t.id}-${metric.key}`} className="hover:bg-slate-50/60">
                        {showScenario && <th rowSpan={sRows} className="border-b border-r border-slate-200 bg-slate-900 px-1 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-white align-middle" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{g.scenario}</th>}
                        {showCustomer && <th rowSpan={cRows} className="border-b border-r border-slate-200 bg-slate-100 px-1 py-1 text-center text-[10px] font-semibold text-slate-700 align-middle" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{c.customer}</th>}
                        {showLocale && <th rowSpan={lRows} className="border-b border-r border-slate-200 bg-slate-50 px-1 py-0.5 text-center text-[10px] font-medium text-slate-600 align-middle">{loc.locale}</th>}
                        {mIdx === 0 && (
                          <th rowSpan={tsMetrics.length} className="border-b border-r border-slate-200 bg-white px-2 py-1 text-left text-xs font-medium text-slate-700 align-top">
                            <HoverTip content={<TestSetTooltipContent t={t} />} placement="right">
                              <span className="font-semibold">{t.name.replace(new RegExp(`^${t.customer}\\s*`, "i"), "")}</span>
                            </HoverTip>
                          </th>
                        )}
                        <td className="border-b border-r border-slate-200 bg-slate-50 px-1 py-1 text-center text-[10px] font-semibold text-slate-500" style={{ height: 40 }}>
                          <HoverTip content={<span>{METRIC_DEFINITIONS[metric.key] ?? metric.label}</span>} placement="above">
                            <div
                              className={`cursor-pointer rounded px-1 py-0.5 ${sort.columnId === `cell:${t.id}:${metric.key}` ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
                              onClick={() => onHeaderClick(`cell:${t.id}:${metric.key}`, metric.lowerIsBetter)}
                            >
                              {metric.key === "WER" ? (prefersCerFor(t) ? "CER" : "WER") : metric.label}
                              {sort.columnId === `cell:${t.id}:${metric.key}` && <span className="ml-0.5">{sort.asc ? "↑" : "↓"}</span>}
                            </div>
                          </HoverTip>
                        </td>
                        {models.map((mdl) => {
                          const v = cellValue.get(`${mdl.id}|${t.id}|${metric.key}`);
                          const p90Key = P90_COMPANION[metric.key];
                          const p90Val = p90Key ? cellValue.get(`${mdl.id}|${t.id}|${p90Key}`) : undefined;
                          const p90Spec = p90Key ? ALL_METRIC_MAP.get(p90Key) : undefined;
                          const stats = columnStats.get(`${t.id}|${metric.key}`);
                          return (
                            <td key={mdl.id} className="border-b border-r border-slate-100 px-1 py-1 text-right font-mono tabular-nums text-xs" style={{ height: 40, ...(v != null ? tone(v, stats, metric.lowerIsBetter, metric.key) : {}) }}>
                              {v != null ? formatValue(v, metric) : <span className="text-slate-300">—</span>}
                              {p90Val != null && p90Spec && <div className="text-[9px] text-slate-400">{formatValue(p90Val, p90Spec)}</div>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  });
                });
              });
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatValue(v: number, m: MetricSpec): string {
  if (m.unit === "%") return v.toFixed(1) + "%";
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
  const metrics = t.metrics?.length
    ? t.metrics.map(k => ALL_METRIC_MAP.get(k)).filter(Boolean)
    : [];
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-slate-900">{t.name}</div>
        {t.homepageUrl && (
          <a
            href={t.homepageUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-md border border-azure-500 px-2 py-0.5 text-[11px] font-medium text-azure-700 hover:bg-azure-50"
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
      {metrics.length > 0 && (
        <div className="mt-2">
          <span className="text-[10px] font-semibold uppercase text-slate-500">Metrics: </span>
          {metrics.map((m) => (
            <span key={m!.key} className="mr-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700">
              {m!.label}{m!.unit ? ` (${m!.unit})` : ""} — {m!.lowerIsBetter ? "lower is better" : "higher is better"}
            </span>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-1">
        <Badge tone="slate">{t.scenario}</Badge>
        <Badge tone="indigo">{t.customer}</Badge>
        {t.languages.map((l) => (
          <Badge key={l.code} tone="teal">{l.code}</Badge>
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

let activeHoverTipClose: (() => void) | null = null;

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
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const TIP_W = 320;

  const clearHideTimer = () => {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
  };

  const close = () => { clearHideTimer(); setPos(null); };

  const show = (e: React.MouseEvent | React.FocusEvent) => {
    if (activeHoverTipClose && activeHoverTipClose !== close) {
      activeHoverTipClose();
    }
    activeHoverTipClose = close;
    clearHideTimer();
    const el = e.currentTarget as HTMLElement;
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
      top = r.bottom + 6;
      left = r.left + r.width / 2 - TIP_W / 2;
    }
    if (left < 8) left = 8;
    if (left + TIP_W > vw - 8) left = vw - TIP_W - 8;
    if (top < 8) top = 8;
    if (top > vh - 40) top = vh - 40;
    setPos({ top, left });
  };
  const scheduleHide = () => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => { if (activeHoverTipClose === close) activeHoverTipClose = null; setPos(null); }, 1000);
  };

  return (
    <div
      style={{ display: "contents" }}
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
      onFocus={show}
      onBlur={scheduleHide}
    >
      {children}
      {pos &&
        createPortal(
          <div
            onMouseEnter={clearHideTimer}
            onMouseLeave={() => { if (activeHoverTipClose === close) activeHoverTipClose = null; setPos(null); }}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: TIP_W,
              zIndex: 10000,
              transform: placement === "above" ? "translateY(-100%)" : undefined,
            }}
            className="pointer-events-auto rounded-lg border border-slate-200 bg-white p-3 text-left text-xs text-slate-700 shadow-xl"
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
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
  hiddenModels: Set<string>;
  allModels: Model[];
  toggleModel: (id: string) => void;
  hiddenMetrics: Set<MetricKey>;
  allMetrics: MetricKey[];
  toggleMetric: (k: MetricKey) => void;
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
                label="Models (uncheck to hide)"
                dense
                options={props.allModels.map((m) => ({ value: m.id, label: m.name }))}
                selected={new Set(props.allModels.filter(m => !props.hiddenModels.has(m.id)).map(m => m.id))}
                toggle={(v) => props.toggleModel(v)}
              />
              <ChipGroup
                label="Metrics (uncheck to hide)"
                dense
                options={props.allMetrics.map((k) => ({ value: k, label: ALL_METRIC_MAP.get(k)?.label ?? k }))}
                selected={new Set(props.allMetrics.filter(k => !props.hiddenMetrics.has(k)))}
                toggle={(v) => props.toggleMetric(v as MetricKey)}
              />
            </div>
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

