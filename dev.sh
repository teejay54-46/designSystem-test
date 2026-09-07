#!/usr/bin/env bash
#
# Run the Simple Design System inside a throwaway container.
# Nothing outside this folder is visible to the container.
#
# Usage:
#   ./dev.sh            -> app at    http://localhost:8000
#   ./dev.sh storybook  -> Storybook at http://localhost:6006
#
# Stop it with Ctrl+C in this terminal.

set -euo pipefail
cd "$(dirname "$0")"

IMAGE="node:20-bookworm"

if [ "${1:-app}" = "storybook" ]; then
  PORT=6006
  CMD="npm run storybook -- --host 0.0.0.0"
  NAME="sds-storybook"
else
  PORT=8000
  CMD="npm run app:dev -- --host 0.0.0.0"
  NAME="sds-dev"
fi

# Install dependencies the first time (creates ./node_modules).
if [ ! -d node_modules ]; then
  echo "First run: installing dependencies inside the container..."
  docker run --rm -v "$PWD:/work" -w /work "$IMAGE" npm ci
fi

echo "Starting on http://localhost:$PORT  (Ctrl+C to stop)"
exec docker run --rm --name "$NAME" -v "$PWD:/work" -w /work -p "$PORT:$PORT" "$IMAGE" \
  bash -lc "$CMD"
