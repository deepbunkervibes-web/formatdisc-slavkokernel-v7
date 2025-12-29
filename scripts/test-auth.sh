
#!/bin/bash

# Configuration
API_URL="http://localhost:3001"
# API_URL="http://localhost:5173" # Use this if testing through Vite proxy
COOKIE_FILE="cookies.txt"
WHITELIST_EMAIL="demo@investor.com"

echo "🧪 Starting Authentication Smoke Test..."
echo "----------------------------------------"

# 1. Login
echo "👉 Attempting Login with $WHITELIST_EMAIL..."
LOGIN_RESPONSE=$(curl -s -i -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$WHITELIST_EMAIL\"}" \
  -c $COOKIE_FILE)

if echo "$LOGIN_RESPONSE" | grep -q "200 OK"; then
  echo "✅ Login Successful. Cookie stored."
else
  echo "❌ Login Failed!"
  echo "$LOGIN_RESPONSE"
  exit 1
fi

# 2. Check Session (Me)
echo "👉 Checking Session (/api/auth/me)..."
ME_RESPONSE=$(curl -s -i -X GET "$API_URL/api/auth/me" \
  -b $COOKIE_FILE)

if echo "$ME_RESPONSE" | grep -q "\"user\""; then
  echo "✅ Session Valid. User found."
else
  echo "❌ Session Invalid!"
  echo "$ME_RESPONSE"
  exit 1
fi

# 3. Logout
echo "👉 Logging Out..."
LOGOUT_RESPONSE=$(curl -s -i -X POST "$API_URL/api/auth/logout" \
  -b $COOKIE_FILE \
  -c $COOKIE_FILE)

if echo "$LOGOUT_RESPONSE" | grep -q "200 OK"; then
  echo "✅ Logout Successful."
else
  echo "❌ Logout Failed!"
  echo "$LOGOUT_RESPONSE"
  exit 1
fi

# 4. Verify Logout
echo "👉 Verifying Session Ended..."
VERIFY_RESPONSE=$(curl -s -i -X GET "$API_URL/api/auth/me" \
  -b $COOKIE_FILE)

if echo "$VERIFY_RESPONSE" | grep -q "401"; then
  echo "✅ Session Successfully Terminated (401 Unauthorized)."
else
  echo "❌ Session Still Active!"
  echo "$VERIFY_RESPONSE"
  exit 1
fi

echo "----------------------------------------"
echo "🎉 All Auth Tests Passed!"
rm $COOKIE_FILE
