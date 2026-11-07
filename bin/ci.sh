#!/usr/bin/env bash
#
# Checks GitHub runs after install. Preflight calls this same file.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

step() {
  echo ""
  echo "==> $*"
}

step "npm run typecheck"
npm run typecheck

step "npm run lint"
npm run lint

step "npm test"
npm test

step "npm run build"
npm run build

if [[ "${CI:-}" == "true" ]]; then
  step "npx playwright install --with-deps chromium"
  npx playwright install --with-deps chromium
else
  step "npx playwright install chromium"
  npx playwright install chromium
fi

step "npm run e2e"
npm run e2e

echo ""
echo "==> CI checks passed."
