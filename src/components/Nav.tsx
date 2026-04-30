import type { GitHubUser } from "../auth/useAuth";

export type Page = "tts" | "asr" | "contribute";

export function Nav({
  page,
  setPage,
  user,
  signIn,
  signOut,
}: {
  page: Page;
  setPage: (p: Page) => void;
  user: GitHubUser | null;
  signIn: () => void;
  signOut: () => void;
}) {
  const tab = (
    p: Page,
    label: string,
    tone: "primary" | "ghost" = "ghost",
  ) => {
    const active = page === p;
    const base =
      "rounded-md px-3 py-1.5 text-sm font-medium transition whitespace-nowrap";
    const cls = active
      ? tone === "primary"
        ? "bg-azure-600 text-white shadow-sm"
        : "bg-slate-900 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100";
    return (
      <button type="button" onClick={() => setPage(p)} className={`${base} ${cls}`}>
        {label}
      </button>
    );
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 2xl:px-8">
        <div>
          <h1 className="text-base font-bold text-slate-900">
            Azure Voice Agent Incubation Lab —{" "}
            <span className="text-azure-700">Model Leaderboard</span>
          </h1>
          <p className="text-xs text-slate-500">
            We build voice agents for vertical scenarios (automotive, contact
            center, meeting rooms, smart home, mobile). This board tracks the
            TTS &amp; ASR models evaluated by our Agent. Read-only — submissions
            flow through a private channel.
          </p>
        </div>

        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {tab("asr", "ASR", "primary")}
            <button
              type="button"
              disabled
              title="Coming soon"
              className="cursor-not-allowed rounded-md px-3 py-1.5 text-sm font-medium text-slate-400"
            >
              TTS
            </button>
            <button
              type="button"
              disabled
              title="Coming soon"
              className="cursor-not-allowed rounded-md px-3 py-1.5 text-sm font-medium text-slate-400"
            >
              LLM
            </button>
          </div>
          <span className="mx-1 h-6 w-px bg-slate-200" />
          {tab("contribute", "Contribute")}
          <span className="mx-2 h-6 w-px bg-slate-200" />
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar_url}
                alt=""
                className="h-7 w-7 rounded-full ring-1 ring-slate-200"
              />
              <span className="text-sm text-slate-700">{user.login}</span>
              <button
                type="button"
                onClick={signOut}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={signIn}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              Sign in with GitHub
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
