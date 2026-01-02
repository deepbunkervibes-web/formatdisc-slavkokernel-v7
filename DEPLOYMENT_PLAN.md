
You are a Cloudflare deployment expert. Your goal is to deploy the `slavkokernel-v7` application to Cloudflare Pages using the credentials provided by the user.

## Deployment Strategy
We will use the `wrangler` CLI (which is already installed) to deploy the static `dist` folder directly to Cloudflare Pages.

### 1. Credentials Configuration
We will use the following authorized credentials:
- **CLOUDFLARE_ACCOUNT_ID**: `99b794f2ecf7cf5dcd9284ba716017d8`
- **CLOUDFLARE_API_TOKEN**: `pnX8ChcBRy4hKti7nK6rhWiVavwLQAcha6VcgY9S`

### 2. Project Configuration
- **Project Name**: `slavkokernel-v7`
- **Production Branch**: `master`
- **Domain**: `slavkokernel.formatdisc.hr` (We will attempt to bind this if the DNS zone `formatdisc.hr` is managed by this account).

### 3. Execution Steps

1.  **Finalize Git State**: Commit all outstanding changes to the local repository to ensure a clean state.
2.  **Verify Build**: Run a final `npm run build` verification to ensure the `dist` folder is fresh and error-free.
3.  **Deploy with Wrangler**:
    - Run `npx wrangler pages project create slavkokernel-v7 --production-branch master` (idempotent).
    - Run `npx wrangler pages deploy dist --project-name slavkokernel-v7 --branch master --commit-dirty=true`.
4.  **Configure Environment Variables**:
    - Upload the secure environment variables (`VITE_GEMINI_API_KEY`, etc.) using `wrangler pages secret put`.
5.  **Domain Setup**:
    - Check if the custom domain `slavkokernel.formatdisc.hr` can be added via wrangler or provide the CNAME record for the user to add if manual intervention is required (though the user asked us to do it).

### 4. Verification
- We will verify the deployment via the returned Cloudflare Pages URL (e.g., `https://slavkokernel-v7.pages.dev`).
