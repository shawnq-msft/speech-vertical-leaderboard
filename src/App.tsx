import { useState } from "react";
import { useAuth } from "./auth/useAuth";
import { useLeaderboardData } from "./data/loader";
import { Leaderboard } from "./components/Leaderboard";
import { Nav, type Page } from "./components/Nav";
import { Contribute } from "./components/Contribute";

export default function App() {
  const [page, setPage] = useState<Page>("asr");
  const { user, signIn, signOut } = useAuth();
  const { data, error } = useLeaderboardData();

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav
        page={page}
        setPage={setPage}
        user={user}
        signIn={signIn}
        signOut={signOut}
      />
      <main className="w-full px-4 py-6 2xl:px-8">
        {error && (
          <div className="mb-4 rounded-md border border-rose-300 bg-rose-50 p-3 text-sm text-rose-800">
            Failed to load data: {error}
          </div>
        )}
        {(page === "asr" || page === "tts") && data && (
          <Leaderboard
            key={page}
            taskType={page === "tts" ? "TTS" : "ASR"}
            testsets={data.testsets}
            models={data.models}
            results={data.results}
          />
        )}
        {(page === "asr" || page === "tts") && !data && !error && (
          <p className="text-sm text-slate-500">Loading…</p>
        )}
        {page === "contribute" && <Contribute />}
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Azure Voice Agent Incubation Lab · Powered by our evaluation Agent
      </footer>
    </div>
  );
}
