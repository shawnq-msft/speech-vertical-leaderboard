import type { ReactNode } from "react";

type Tone =
  | "slate"
  | "azure"
  | "green"
  | "amber"
  | "rose"
  | "violet"
  | "indigo"
  | "teal";

const TONES: Record<Tone, string> = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  azure: "bg-azure-100 text-azure-700 ring-azure-500/30",
  green: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-100 text-amber-800 ring-amber-200",
  rose: "bg-rose-100 text-rose-700 ring-rose-200",
  violet: "bg-violet-100 text-violet-700 ring-violet-200",
  indigo: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  teal: "bg-teal-100 text-teal-700 ring-teal-200",
};

export function Badge({
  tone = "slate",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <span
      title={title}
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
