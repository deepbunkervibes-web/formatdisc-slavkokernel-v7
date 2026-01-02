#!/usr/bin/env bash
set -euo pipefail

# -------------------------------------------------
# 0️⃣  Load credentials
# -------------------------------------------------
export CLOUDFLARE_ACCOUNT_ID="99b794f2ecf7cf5dcd9284ba716017d8"
export CLOUDFLARE_API_TOKEN="pnX8ChcBRy4hKti7nK6rhWiVavwLQAcha6VcgY9S"

# -------------------------------------------------
# 1️⃣  Make sure we are in the repo root
# -------------------------------------------------
# cd /path/to/formatdisc-slavkokernel-v7-repo   # <-- adjust if running from elsewhere

# -------------------------------------------------
# 2️⃣  Commit any pending changes (clean state)
# -------------------------------------------------
echo "📦 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
  git add .
  git commit -m "pre‑release: final build" || echo "No changes to commit"
else
  echo "Git clean."
fi

# -------------------------------------------------
# 3️⃣  Build the production bundle
# -------------------------------------------------
echo "🏗️  Building..."
npm ci
npm run build
if [ ! -d dist ]; then echo "❌ build folder missing"; exit 1; fi
echo "✅ Build succeeded"

# -------------------------------------------------
# 4️⃣  Ensure Pages project
# -------------------------------------------------
echo "🔧 Ensuring Pages project..."
npx wrangler pages project create slavkokernel-v7 \
    --production-branch master \
    --project-name slavkokernel-v7 \
    --commit-dirty=true \
    --json > /dev/null

# -------------------------------------------------
# 5️⃣  Deploy
# -------------------------------------------------
echo "🚀 Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist \
    --project-name slavkokernel-v7 \
    --branch master \
    --commit-dirty=true \
    --json > /dev/null

# -------------------------------------------------
# 6️⃣  Secrets (Example)
# -------------------------------------------------
# echo "🔑 Uploading secrets..."
# npx wrangler pages secret put VITE_GEMINI_API_KEY --project-name slavkokernel-v7 --secret-value "YourKeyHere"

echo "🌐 Deployment finished! Your app is now live at:"
echo "   https://slavkokernel-v7.pages.dev"
