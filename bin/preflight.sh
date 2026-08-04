#!/usr/bin/env bash
#
# Pre-commit checklist: lint/format, typecheck, unit tests, and build.
#
# Usage:
#   bin/preflight.sh
#   npm run preflight
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

step() {
  echo ""
  echo "==> $*"
}

# Dependency upgrades are intentional (Dependabot / manual), not part of preflight.
step "npm ci (or skip if node_modules present)"
if [[ ! -d node_modules ]]; then
  npm ci
else
  echo "node_modules present — skipping install"
fi

step "npm run lint"
npm run lint

step "npm run format"
npm run format

step "npm run typecheck"
npm run typecheck

step "npm run test:unit"
npm run test:unit

step "npm run build"
npm run build

echo ""
echo "==> Preflight complete. Review the diff, then commit."
