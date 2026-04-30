export function Contribute() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 text-sm text-slate-700">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Contribute a Test Set or Model</h1>
        <p className="mt-2 text-slate-600">
          This site is <strong>read-only</strong>. Raw datasets, model weights,
          and API keys never land in the public repo. Everything sensitive flows
          through a private channel and only sanitized metadata + scores are
          published here.
        </p>
      </header>

      <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-900">
        <p className="font-medium">What belongs where</p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            <strong>Public repo</strong> (this site): evaluation harness scripts,
            the Agent skill, and aggregated leaderboard JSON — test-set <em>metadata</em>
            (name, size, customer, languages) and model <em>metadata</em>
            (vendor, version, hardware).
          </li>
          <li>
            <strong>Private repo</strong>: raw audio / transcripts, model weights,
            API keys, NDA-bearing customer datasets, anything a submitter uploads.
          </li>
        </ul>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">How to submit</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Open an <strong>issue</strong> in the private submissions repo using
            the <code>New test set</code> or <code>New model</code> issue form.
            The form captures the schema fields (language coverage, scenario,
            customer, deployment, hardware, …) without ever asking for
            a key in plain text.
          </li>
          <li>
            Upload datasets / weights to the private repo's restricted path
            (admins will give you write access once the NDA is on file). Keys
            go to the admin out-of-band — GitHub Actions secret, Azure Key
            Vault, or direct hand-off. <strong>Never</strong> paste a key into
            an issue or PR.
          </li>
          <li>
            The Agent picks the issue up on its next run, validates schema,
            runs the security / leak-risk / NDA checklist, invokes evaluation
            against the private dataset, and opens a PR against <em>this</em>
            public repo that adds only the sanitized metadata row and the new
            scores.
          </li>
          <li>
            An admin reviews the public PR (checklist in the PR body) and
            merges. The leaderboard redeploys via GitHub Pages.
          </li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">What never gets published</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Raw audio, transcripts, or any test-set file bytes.</li>
          <li>Model weights, checkpoints, or wrapper code that bundles them.</li>
          <li>API keys, tokens, signed URLs, tenant IDs, connection strings.</li>
          <li>Customer-confidential notes or NDA text.</li>
        </ul>
        <p>
          If you see any of the above on this public site, treat it as a
          security incident and contact the admin immediately.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Who to contact</h2>
        <p>
          The private submissions repo URL and the current admin handle are
          listed in the public repo's <code>README.md</code> (“For
          admins / contributors — private submissions channel”). If you are
          outside the Lab and want to submit a model, reach out to the admin
          first so they can gate access.
        </p>
      </section>
    </section>
  );
}
