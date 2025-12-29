# SlavkoKernel v7 Operations Runbook

## 🚨 Emergency Contacts

- **Lead Dev**: <dev@slavkokernel.com>
- **Infra Owner**: <infra@slavkokernel.com>

## 🔍 System Health Checks

### 1. API Availability

**Endpoint**: `/api/auth/me`

- **Expected**: 401 Unauthorized (if no cookie) or 200 OK (if valid cookie).
- **Critical Failure**: 500, 502, 503, or Connection Refused.

### 2. Authentication Flow

Every deployment validation must verify:

- Login with `demo@investor.com`
- HttpOnly Cookie `auth_token` presence
- Session persistence (`/api/auth/me`)
- Logout functionality

## 🛠 Deployment & Rollback

### Standard Deployment

Deployments are automated via GitHub Actions (`.github/workflows/ci.yml`) and Vercel.
To trigger a deploy: `git push origin main`.

### 🔙 Rollback Procedure

If a production deployment fails or causes critical issues:

1. **Vercel Rollback**:
    - Go to Vercel Dashboard -> Project -> Deployments.
    - Find the last known good deployment (GREEN status).
    - Click "Redeploy" or "Promote to Production".
2. **Code Revert**:
    - `git revert HEAD`
    - `git push origin main`

## 🔑 Secret Management (JWT)

### Rotating JWT Secret (Emergency)

If `JWT_SECRET` is compromised:

1. **Generate New Secret**: `openssl rand -base64 32`
2. **Update Env Vars**:
    - Update `JWT_SECRET` in Vercel.
    - Update `JWT_SECRET` in local `.env` files.
3. **Redeploy**: Trigger a new deployment to pick up the new env var.
    - *Note*: This will immediately invalidate ALL existing user sessions.
4. **Notify Users**: Send communication requiring re-login.

## 🐛 Troubleshooting

### Common Auth Issues

- **401 Loop**:
  - Check if `NODE_ENV` is incorrectly set to `production` locally without HTTPS.
  - Fix: Ensure `secure: false` for cookies in non-HTTPS environments.
- **CORS Errors**:
  - Verify `credentials: "include"` is set on the frontend fetch.
  - Verify `Access-Control-Allow-Credentials: true` is set on Express/Vercel.

### Logs

- **Local**: check terminal output of `npm run dev:api`.
- **Production**: Vercel Runtime Logs.
