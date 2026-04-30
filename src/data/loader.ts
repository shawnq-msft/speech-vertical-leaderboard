import { useEffect, useState } from "react";
import type { Model, Result, TestSet } from "../types";

export interface LeaderboardData {
  testsets: TestSet[];
  models: Model[];
  results: Result[];
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return (await res.json()) as T;
}

export function useLeaderboardData() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchJson<TestSet[]>("./data/testsets.json"),
      fetchJson<Model[]>("./data/models.json"),
      fetchJson<Result[]>("./data/results.json"),
    ])
      .then(([testsets, models, results]) =>
        setData({ testsets, models, results }),
      )
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : String(e)),
      );
  }, []);

  return { data, error };
}
