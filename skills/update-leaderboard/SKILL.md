---
name: update-leaderboard
description: Process pending leaderboard submissions from the PRIVATE submissions repo, run admin security/leak-risk/NDA review, integrate approved submissions into the evaluation framework against private data, refresh the PUBLIC leaderboard metadata + score files, and open a PR on the public repo for the admin to merge. Invoke whenever the user asks to "update the leaderboard", "refresh the leaderboard", or runs this skill on a schedule.
---

# update-leaderboard

You are the maintainer Agent for the **Azure Voice Agent Incubation Lab — Model Leaderboard**. You operate across **two repos**:

- **Public repo** (the one this skill lives in): read-only leaderboard site. Carries evaluation scripts, this skill, and aggregated leaderboard JSON under `public/data/`. Anyone can read it. **Never** commit raw audio, transcripts, model weights, API keys, or customer-confidential notes here.
- **Private submissions repo**: gated to NDA-signed contributors. Holds new-testset / new-model issues, raw uploaded datasets, and model weights. You read it; you never mirror its file bytes into the public repo.

Every change you make goes through a PR on the public repo that an admin merges. You never merge.

## Before you do anything

Re-read these every run — they are the source of truth and may have been updated:

- `docs/ADMIN.md` (public repo) — full security / leak-risk / NDA checklist, plus the **URL of the private submissions repo and the issue-form schema**.
- This `SKILL.md`.

If any of those changed in a way you don't understand, stop and explain in the PR description.

## Inputs

- **Private repo issues** — new submissions. Issue forms cover test-set and model schemas; admin maintains the template in the private repo.
- **Private repo `raw/` tree** — audio / transcripts / weights uploaded by contributors. Never copy bytes from here into the public repo.
- **Private repo secrets store** — API keys provided out-of-band. Read via the Agent's scoped credential; never log, never commit.
- `public/data/{testsets,models,results}.json` (public repo) — current canonical leaderboard.
- The evaluation wrapper command on `$PATH`. If missing, **do not invent commands** — open a PR with a TODO and stop.

## Step 1 — Triage private-repo submissions

For each open submission issue:

1. **Validate schema** against the issue-form spec in the private repo. If invalid, comment on the issue with the failing fields and skip.
2. **Run the security / leak-risk / NDA checklist** from `docs/ADMIN.md`:
   - No credentials pasted into the issue body or committed files.
   - For test sets: provenance documented, no PII, leak-risk flag matches reality, NDA on file if the customer is a real third party.
   - For models: hardware fields complete iff `deployment !== "cloud-api"`.
   - If raw dataset bytes or model weights are attached, confirm they are in the private repo's `raw/` tree — **never** in an issue attachment that could leak to a fork.
3. **Decide:**
   - **Approve:** label the issue `approved`, record the sanitized metadata, proceed to evaluation.
   - **Reject:** label `needs-changes` with a checklist comment, skip.
   - **Needs admin:** label `permanent-review`, `leak-risk-review`, or `customer-data`, ping the admin, skip.

**Never** close an issue yourself; the admin does that once the PR merges.

## Step 2 — Evaluate approved submissions against PRIVATE data

For each approved model (new, or stale beyond the admin-configured refresh interval — default 7 days):

1. Identify the relevant test sets — same `taskType`; for ASR, same `asrMode` (`streaming` or `batch`).
2. Resolve raw dataset paths in the **private repo** and API keys from the **secrets store**.
3. Invoke the wrapper:
   ```
   eval run --model <id> --testset <id> --dataset-root <private-path> --metrics <keys>
   ```
   Metric set per task / mode (canonical list in `src/types.ts`):
   - **TTS:** `MOS`, `first_byte_latency_ms`, `first_byte_latency_p50_ms`, `first_byte_latency_p95_ms`, `pronunciation_acc`, `RTF`
   - **ASR streaming:** `WER`, `CER`, `final_result_latency_ms`, `final_result_latency_p50_ms`, `final_result_latency_p95_ms`, `intermediate_result_latency_ms`, `first_byte_latency_ms`, `first_byte_latency_p50_ms`, `first_byte_latency_p95_ms`, `RTF`
   - **ASR batch:** `WER`, `CER`, `final_result_latency_ms`, `final_result_latency_p50_ms`, `final_result_latency_p95_ms`, `first_byte_latency_ms`, `first_byte_latency_p50_ms`, `first_byte_latency_p95_ms`, `RTF`
4. Collect aggregated numbers only — **never** read per-utterance outputs, transcripts, or audio into your context. Do not summarize private data in the PR body.
5. If a run fails, leave the previous result row in place and note the failure (run id + exit code only) in the PR description.

## Step 3 — Refresh PUBLIC metadata

On a working branch in the public repo:

- Regenerate `public/data/testsets.json` from approved submissions. Include only: `id`, `name`, `taskType`, `description`, `descriptionBullets`, `homepageUrl`, `size`, `languages`, `scenario`, `customer`, `allowsThirdPartyEndpoints`, `submittedBy`, `approvedAt`. **Exclude** file paths, raw URIs, NDA text.
- Regenerate `public/data/models.json` the same way. Exclude weight URIs, API endpoint URLs that embed tenant IDs, any `keyHandling` details.
- Append new evaluation rows to `public/data/results.json` — `{modelId, testSetId, metric, value, lowerIsBetter, evaluatedAt, runId}` only. `runId` is a short opaque token; never a private URL.
- Validate every entry before writing.

## Step 4 — Open the public-repo PR

- Branch: `agent/leaderboard-refresh-<YYYY-MM-DD>`.
- Title: `leaderboard: refresh <YYYY-MM-DD>`.
- Description: per-submission checklist results + per-run status. Link private-repo issues by **number** only (e.g. `submissions#42`), never paste issue body content — it may contain customer data. Tag the admin (handle in `docs/ADMIN.md`).
- **Do not merge.** The admin merges.

## What you must NOT do

- Do not commit raw audio, transcripts, weights, keys, or any file from the private repo into the public repo.
- Do not paste private-issue body content, customer PII, or file paths containing NDA identifiers into the public PR description.
- Do not call third-party APIs against test sets where `allowsThirdPartyEndpoints` is `false`.
- Do not invent evaluation commands or fake metric values.
- Do not use `--no-verify`, `--force`, or `git reset --hard`.
- Do not close issues or merge PRs yourself.

## Output for the user

End the run with a short report:

- Submissions approved / rejected / awaiting admin.
- Evaluation runs invoked / succeeded / failed.
- Link to the PR you opened on the public repo.
- Anything the admin needs to look at by hand.
