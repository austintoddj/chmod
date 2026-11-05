# Agent rules

## Verify

- Run `npm run check` locally. Nothing else.
- Don't run e2e, start a dev server, open a browser, or take screenshots to verify a change. CI does that.
- Open a PR and wait on `gh pr checks --watch`. Read the failing step and fix that.
- Rerun a failed check at most once (`gh run rerun <run-id> --failed`). A second failure is real; report it.
- Don't push to the default branch unless the owner told you to in this conversation.

## Don't

- Merge PRs, or turn on auto-merge for your own PRs.
- Edit files in `.github/`, rulesets, repo or Actions settings, or Vercel settings, unless the owner asked for that change.
- Add CI jobs, browsers, or checks.
- Send real email or call real third-party services from tests.
