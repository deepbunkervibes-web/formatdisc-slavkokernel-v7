
$baseUrl = "http://localhost:3001"
$email = "demo@investor.com"
$loginUrl = "$baseUrl/api/auth/login"
$meUrl = "$baseUrl/api/auth/me"
$logoutUrl = "$baseUrl/api/auth/logout"

Write-Host "🧪 Starting Authentication Smoke Test (PowerShell)..." -ForegroundColor Cyan
Write-Host "-----------------------------------------------------"

# 1. Login
Write-Host "👉 Attempting Login with $email..."
try {
    $body = @{ email = $email } | ConvertTo-Json
    $loginResponse = Invoke-WebRequest -Uri $loginUrl -Method Post -Body $body -ContentType "application/json" -SessionVariable "session" -UseBasicParsing -ErrorAction Stop
    
    if ($loginResponse.StatusCode -eq 200) {
        Write-Host "✅ Login Successful." -ForegroundColor Green
    }
}
catch {
    Write-Host "❌ Login Failed!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

# 2. Check Session
Write-Host "👉 Checking Session (/api/auth/me)..."
try {
    $meResponse = Invoke-WebRequest -Uri $meUrl -Method Get -WebSession $session -UseBasicParsing -ErrorAction Stop
    $content = $meResponse.Content | ConvertFrom-Json
    
    if ($content.user.email -eq $email) {
        Write-Host "✅ Session Valid. User found: $($content.user.email)" -ForegroundColor Green
    }
    else {
        throw "User email mismatch"
    }
}
catch {
    Write-Host "❌ Session Invalid!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

# 3. Logout
Write-Host "👉 Logging Out..."
try {
    $logoutResponse = Invoke-WebRequest -Uri $logoutUrl -Method Post -WebSession $session -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Logout Successful." -ForegroundColor Green
}
catch {
    Write-Host "❌ Logout Failed!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

# 4. Verify Logout
Write-Host "👉 Verifying Session Ended..."
try {
    $verifyResponse = Invoke-WebRequest -Uri $meUrl -Method Get -WebSession $session -UseBasicParsing -ErrorAction Stop
    # Should not reach here if 401 returns panic (default behavior of Invoke-WebRequest unless SkipHttpErrorCheck is used, but ErrorAction Stop catches it)
    Write-Host "❌ Session Still Active (Unexpected 200 OK)!" -ForegroundColor Red
    exit 1
}
catch {
    # Check if it's the expected 401
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "✅ Session Successfully Terminated (401 Unauthorized)." -ForegroundColor Green
    }
    else {
        Write-Host "❌ Unexpected Error during verification: $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host "-----------------------------------------------------"
Write-Host "🎉 All Auth Tests Passed!" -ForegroundColor Cyan
