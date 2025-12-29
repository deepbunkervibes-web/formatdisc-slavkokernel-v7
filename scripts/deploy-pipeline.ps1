
Write-Host "🚀 Starting SlavkoKernel Production Verification Pipeline..." -ForegroundColor Cyan

# 1. Clean and Install (Optional but recommended for strict repro)
# Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
# npm ci
# if ($LASTEXITCODE -ne 0) { Write-Error "Installation failed"; exit 1 }

# 2. Linting
Write-Host "🔍 Running Linter (Strict Mode)..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) { 
    Write-Error "Linting failed! Please resolve errors before building."
    exit 1 
}
Write-Host "✅ Linting Passed." -ForegroundColor Green

# 3. Building
Write-Host "🏗️  Building Production Bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { 
    Write-Error "Build failed!"
    exit 1 
}
Write-Host "✅ Build Complete." -ForegroundColor Green

# 4. Verification Suggestion
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "Ready for Local Staging!" -ForegroundColor Cyan
Write-Host "To serve locally:" -ForegroundColor White
Write-Host "  npx serve -s dist" -ForegroundColor White
Write-Host ""
Write-Host "To deploy to Vercel:" -ForegroundColor White
Write-Host "  vercel --prod" -ForegroundColor White
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
