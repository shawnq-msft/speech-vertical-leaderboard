import { useEffect, useState, useCallback } from "react";

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
}

const STORAGE_KEY = "vail-gh-user";

// Lightweight client-only "GitHub OAuth" placeholder.
// Real OAuth requires a server (or a GitHub OAuth App with PKCE via a proxy)
// since the device-flow exchange cannot run from a static page without CORS
// help. For the scaffold, we offer a "Sign in with GitHub" button that
// redirects to GitHub's authorize URL when VITE_GITHUB_CLIENT_ID is set,
// and otherwise falls back to a username prompt so the rest of the app is
// usable in dev. Admin must wire a real callback handler before going live.
export function useAuth() {
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const signIn = useCallback(() => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID as
      | string
      | undefined;
    if (clientId) {
      const redirect = encodeURIComponent(window.location.origin);
      const scope = encodeURIComponent("public_repo");
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirect}`;
      return;
    }
    const login = window.prompt(
      "Dev mode: enter a GitHub username to simulate sign-in (set VITE_GITHUB_CLIENT_ID for real OAuth)",
    );
    if (!login) return;
    const u: GitHubUser = {
      login,
      name: null,
      avatar_url: `https://github.com/${login}.png`,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, signIn, signOut };
}
