# Agent Setup — keeping the leaderboard fresh

The leaderboard is updated by an **Agent** (Claude Code or the Claude
Agent SDK) running on a schedule the admin controls. This document
explains how to set it up.

## Prerequisites

- A machine that's online when you want updates to happen (a small VM,
  a build server, or your own laptop running overnight).
- [Claude Code](https://claude.com/claude-code) installed (`npm i -g @anthropic-ai/claude-code` or the platform installer).
- **Two GitHub fine-grained PATs** (one per repo):
  - **Public repo** (this one): `Contents: Read & write`,
    `Pull requests: Read & write`. The Agent opens refresh PRs here.
  - **Private submissions repo**: `Contents: Read`,
    `Issues: Read & write`. The Agent reads uploaded datasets and
    comments on submission issues.
- Access to the **secrets store** where contributor API keys live
  (GitHub Actions secret, Azure Key Vault, or equivalent). The Agent
  reads keys via a scoped credential; they never appear in either repo.
- The admin's GitHub handle, so the Agent knows whom to tag in PRs.
- An optional evaluation wrapper command on `$PATH`. If you don't have
  one, the Agent will skip evaluation runs and only triage submissions.

## Wire up the skill

The Agent skill lives in this repo at
[`skills/update-leaderboard/SKILL.md`](../skills/update-leaderboard/SKILL.md).
Claude Code auto-discovers skills in `./.claude/skills/` and `~/.claude/skills/`.
Symlink (or copy) the repo skill into one of those locations:

```bash
# from the repo root, on the Agent host
mkdir -p ~/.claude/skills
ln -s "$PWD/skills/update-leaderboard" ~/.claude/skills/update-leaderboard
```

Then test it interactively once:

```bash
cd /path/to/speech-vertical-leaderboard
claude
> /update-leaderboard
```

You should see the Agent triage open issues in the **private
submissions repo** and (if there's anything new) open a PR against
**this public repo**. Merge it manually to confirm the loop works.

## Schedule it

You have two good options.

### Option A — `claude` running in `/loop`

Inside an interactive `claude` session in the repo:

```
/loop 6h /update-leaderboard
```

This runs `/update-leaderboard` every ~6 hours for as long as the
session is open. Good for a dedicated kiosk machine.

### Option B — cron / Task Scheduler

Headless run:

```bash
# every 6 hours
0 */6 * * *  cd /path/to/speech-vertical-leaderboard && \
             claude -p "/update-leaderboard" >> ~/.claude/leaderboard.log 2>&1
```

On Windows (Task Scheduler), the equivalent is a task running:

```
claude.exe -p "/update-leaderboard"
```

with the working directory set to the repo root.

### Option C — GitHub Actions (mirror)

For redundancy, mirror the same skill in CI. Example workflow lives at
`.github/workflows/agent.yml.example` (admin renames to enable). It
runs the skill on a schedule using a repo secret with the GitHub PAT.

## What you (the admin) do

The Agent never merges anything. Your job each run is:

1. Open the PR titled `leaderboard: refresh <date>`.
2. Read the per-submission checklist in the PR body.
3. Spot-check the diff; verify anything labeled `permanent-review`,
   `leak-risk-review`, or `customer-data`.
4. Merge — or comment "needs changes" and the Agent will revise on the
   next run.

## Troubleshooting

- **Agent isn't finding the skill.** Confirm `~/.claude/skills/update-leaderboard/SKILL.md` exists and starts with the YAML frontmatter (`name:` / `description:`).
- **No PRs being opened.** Check the public-repo PAT scopes. Run `claude -p "/update-leaderboard"` once interactively and read the output.
- **Agent can't see submission issues.** Check the private-repo PAT scopes (`Issues: Read & write`) and that the token isn't expired.
- **Evaluation runs are being skipped.** Configure the wrapper command on `$PATH`. The Agent intentionally refuses to invent commands.
- **A submission keeps getting rejected.** The issue comment in the private repo will say why — usually a schema mismatch or a missing leak-risk acknowledgement.
