export type TaskType = "TTS" | "ASR";

export type AsrMode = "streaming" | "batch";

export type Scenario =
  | "car"
  | "meeting"
  | "callcenter"
  | "smart-home"
  | "mobile"
  | "other";

export type ModelDeployment =
  | "cloud-api"
  | "cloud-self-hosted"
  | "on-device"
  | "on-prem-server";

export type HwArchitecture = "CPU" | "GPU" | "NPU" | "DSP" | "TPU" | "hybrid";

export type Runtime =
  | "CUDA"
  | "TensorRT"
  | "ROCm"
  | "Qualcomm-AI-Engine"
  | "Hexagon"
  | "CoreML"
  | "NNAPI"
  | "TFLite"
  | "ONNX-Runtime"
  | "OpenVINO"
  | "WebGPU"
  | "WebNN"
  | "CPU-native";

export type LanguageTier = "tier-1" | "tier-2" | "tier-3";

export type Region =
  | "Americas"
  | "LATAM"
  | "EMEA"
  | "Africa"
  | "Greater-China"
  | "Japan-Korea"
  | "Southeast-Asia"
  | "India-South-Asia";

export interface LanguageCoverage {
  code: string;
  tier: LanguageTier;
  region: Region;
}

export type TtsMetricKey =
  | "MOS"
  | "first_byte_latency_ms"
  | "first_byte_latency_p50_ms"
  | "first_byte_latency_p95_ms"
  | "pronunciation_acc"
  | "RTF";

export type AsrMetricKey =
  | "WER"
  | "CER"
  | "final_result_latency_ms"
  | "final_result_latency_p50_ms"
  | "final_result_latency_p95_ms"
  | "intermediate_result_latency_ms"
  | "first_byte_latency_ms"
  | "first_byte_latency_p50_ms"
  | "first_byte_latency_p95_ms"
  | "first_latency_ms"
  | "first_latency_p90_ms"
  | "lbl_ms"
  | "lbl_p90_ms"
  | "upl_ms"
  | "upl_p50_ms"
  | "upl_p90_ms"
  | "upl_p95_ms"
  | "CER_p90"
  | "WER_p90"
  | "first_byte_latency_p90_ms"
  | "RTF";

export type MetricKey = TtsMetricKey | AsrMetricKey;

export interface MetricSpec {
  key: MetricKey;
  label: string;
  unit: string;
  lowerIsBetter: boolean;
}

export const TTS_METRICS: MetricSpec[] = [
  { key: "MOS", label: "MOS", unit: "", lowerIsBetter: false },
  { key: "first_byte_latency_ms", label: "First-Byte Latency", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p50_ms", label: "First-Byte P50", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p95_ms", label: "First-Byte P95", unit: "ms", lowerIsBetter: true },
  { key: "pronunciation_acc", label: "Pronunciation Acc (发音准确度)", unit: "", lowerIsBetter: false },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

export const ASR_STREAMING_METRICS: MetricSpec[] = [
  { key: "WER", label: "WER", unit: "%", lowerIsBetter: true },
  { key: "CER", label: "CER", unit: "%", lowerIsBetter: true },
  { key: "CER_p90", label: "CER P90", unit: "%", lowerIsBetter: true },
  { key: "WER_p90", label: "WER P90", unit: "%", lowerIsBetter: true },
  { key: "final_result_latency_ms", label: "Final Lat", unit: "ms", lowerIsBetter: true },
  { key: "final_result_latency_p50_ms", label: "Final P50", unit: "ms", lowerIsBetter: true },
  { key: "final_result_latency_p95_ms", label: "Final P95", unit: "ms", lowerIsBetter: true },
  { key: "intermediate_result_latency_ms", label: "Intermed Lat", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_ms", label: "First Lat", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p50_ms", label: "First Lat", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p90_ms", label: "First Lat P90", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_p95_ms", label: "First Lat P95", unit: "ms", lowerIsBetter: true },
  { key: "first_latency_ms", label: "First Lat", unit: "ms", lowerIsBetter: true },
  { key: "first_latency_p90_ms", label: "First Lat P90", unit: "ms", lowerIsBetter: true },
  { key: "lbl_ms", label: "LBL", unit: "ms", lowerIsBetter: true },
  { key: "lbl_p90_ms", label: "LBL P90", unit: "ms", lowerIsBetter: true },
  { key: "upl_ms", label: "UPL", unit: "ms", lowerIsBetter: true },
  { key: "upl_p50_ms", label: "UPL P50", unit: "ms", lowerIsBetter: true },
  { key: "upl_p90_ms", label: "UPL P90", unit: "ms", lowerIsBetter: true },
  { key: "upl_p95_ms", label: "UPL P95", unit: "ms", lowerIsBetter: true },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

export const ASR_BATCH_METRICS: MetricSpec[] = [
  { key: "WER", label: "WER", unit: "%", lowerIsBetter: true },
  { key: "CER", label: "CER", unit: "%", lowerIsBetter: true },
  { key: "final_result_latency_ms", label: "Final-Result Latency", unit: "ms", lowerIsBetter: true },
  { key: "final_result_latency_p50_ms", label: "Final P50", unit: "ms", lowerIsBetter: true },
  { key: "final_result_latency_p95_ms", label: "Final P95", unit: "ms", lowerIsBetter: true },
  { key: "first_byte_latency_ms", label: "First-Byte Latency", unit: "ms", lowerIsBetter: true },
  { key: "RTF", label: "RTF", unit: "", lowerIsBetter: true },
];

export interface TestSet {
  id: string;
  name: string;
  taskType: TaskType;
  description: string;
  descriptionBullets?: string[];
  homepageUrl?: string;
  errorAnalysisUrl?: string;
  reportUrl?: string;
  size: number;
  languages: LanguageCoverage[];
  scenario: Scenario;
  customer: string;
  metrics?: MetricKey[];
  seed?: boolean;
  allowsThirdPartyEndpoints: boolean;
  submittedBy: string;
  approvedAt: string;
}

export interface ModelHardware {
  architecture: HwArchitecture;
  chipset?: string;
  runtime: Runtime;
  quantization?: "fp32" | "fp16" | "int8" | "int4" | "mixed";
  memoryFootprintMb?: number;
}

export interface Model {
  id: string;
  name: string;
  taskType: TaskType;
  asrMode?: AsrMode;
  vendor: string;
  deployment: ModelDeployment;
  modelVersion: string;
  hardware?: ModelHardware;
  homepageUrl?: string;
  descriptionBullets?: string[];
  submittedBy: string;
  approvedAt: string;
  notes?: string;
}

export interface Result {
  modelId: string;
  testSetId: string;
  metric: MetricKey;
  value: number;
  lowerIsBetter: boolean;
  evaluatedAt: string;
  runId: string;
}

export type GroupingMode = "none" | "scenario" | "customer" | "vendor-best";

export function metricsFor(taskType: TaskType, asrMode?: AsrMode): MetricSpec[] {
  if (taskType === "TTS") return TTS_METRICS;
  return asrMode === "batch" ? ASR_BATCH_METRICS : ASR_STREAMING_METRICS;
}

export const ALL_METRIC_MAP: Map<MetricKey, MetricSpec> = new Map(
  [...TTS_METRICS, ...ASR_STREAMING_METRICS, ...ASR_BATCH_METRICS].map(m => [m.key, m]),
);
