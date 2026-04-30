# Admin Runbook

This document is the **single source of truth** for what counts as an
acceptable submission to the leaderboard. The Agent reads it on every run
(see [`skills/update-leaderboard/SKILL.md`](../skills/update-leaderboard/SKILL.md)).

## The two repos

- **Public repo** (this one) — read-only leaderboard site. Contains
  evaluation scripts, the Agent skill, and aggregated `public/data/`
  JSON. Never contains raw audio, weights, or keys.
- **Private submissions repo** — gated to NDA-signed contributors.
  URL: `<FILL-IN-PRIVATE-REPO-URL>` · admin handle: `<FILL-IN-HANDLE>`.
  Contains submission issues, raw uploaded datasets under `raw/`, and
  the secrets-store pointer for API keys.

## Security review checklist

For every open submission issue in the private repo:

- [ ] **No credentials pasted in the issue body** or attached files.
      If you see one, scrub it, rotate the key, and comment as a
      security incident.
- [ ] **No `eval` / `exec` / shell-out to untrusted strings** in any
      submitted wrapper code.
- [ ] **Network calls only to declared endpoints.** Outbound calls to
      anything not listed in the submission's `notes` field are a red flag.
- [ ] **No PII** in transcripts, audio filenames, or test code.
- [ ] **License / provenance documented** (test sets only).
- [ ] **Hardware fields complete** for any model with
      `deployment !== "cloud-api"` — architecture, chipset, runtime,
      quantization. Missing fields make latency / RTF numbers
      non-comparable.
- [ ] **Raw bytes are in the private repo's `raw/` tree**, not in an
      issue attachment that could end up on a fork.

## Public-PR diff review

When the Agent opens `leaderboard: refresh <date>` against this public
repo, confirm the diff contains **only**:

- [ ] Metadata edits in `public/data/testsets.json` / `models.json`
      (no file paths, no raw URIs, no NDA text).
- [ ] New rows in `public/data/results.json` — `{modelId, testSetId,
      metric, value, lowerIsBetter, evaluatedAt, runId}` only.
- [ ] No audio bytes, transcripts, weight files, or keys.

If any of the above is violated, **do not merge**. Reopen as a
security incident.

## Leak-risk audit (test sets)

Each submission includes a flag `allowsThirdPartyEndpoints`. When `true`:

- The submitter has acknowledged the leak risk.
- The Agent labels the public PR `leak-risk-review`.
- **Admin must verify**: dataset is *not* labeled private, internal, or
  customer-confidential without explicit business sign-off.
- If tied to a named customer (Toyota, LGE, SAIC, …), check that the
  NDA permits sending the audio to third-party vendors. Default
  assumption: **no**.

## NDA / customer-data review

For every test set with a real customer name in the `customer` field:

- [ ] NDA is on file and covers the use we're putting the data to.
- [ ] If `allowsThirdPartyEndpoints` is `true`, the NDA explicitly
      permits third-party processing (rare).
- [ ] The customer's PII redaction policy has been applied.
- [ ] The contributor has write access to the private repo's `raw/`
      tree scoped to that customer's path — grant only after NDA.

## Lifetime sign-off

| Lifetime | Who can approve |
|---|---|
| `1m` | Any maintainer. |
| `3y` | Any maintainer. |
| `permanent` | **Lab admin only.** Comment the literal string `permanent: approved` on the private-repo issue so the Agent can detect it. |

## Code security review (model / test code)

When the submission ships a model wrapper or custom test code in the
private repo:

- [ ] Run the code in an isolated container (no network unless
      explicitly approved, no host filesystem access beyond the test
      sandbox).
- [ ] Diff against the previous version if this is an update — flag
      new network calls, env-var reads, or shell execution.
- [ ] Confirm the declared `keyHandling` plan matches reality (if
      `self-hosted-no-key`, the code must not read API-key env vars).

## Key handling (never in either repo)

Keys move out-of-band into a secrets store the Agent can read:

- GitHub Actions secret on the private repo, or
- Azure Key Vault with the Agent as a scoped reader, or
- Direct admin hand-off to an encrypted store.

The Agent reads via scoped credential, never logs the value, and
never writes it to disk outside the store.

## What admin merges look like

The Agent opens PRs titled `leaderboard: refresh <date>` on the public
repo. The PR body contains a per-submission checklist. As admin:

1. Spot-check the checklist against the actual diff.
2. Verify anything flagged `permanent-review`, `leak-risk-review`, or
   `customer-data`.
3. Merge.

If anything in the PR is unclear, **do not merge** — ask in the PR
thread; the Agent will revise on its next run.
