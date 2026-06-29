# Release Process – Risala Digital Tools

## Overview
The release pipeline follows a **Git‑centric** approach. Every change you push to the `main` branch triggers GitHub Actions which lints, builds, and, if successful, allows Cloudflare Pages to deploy the new version automatically.

## Step‑by‑Step Release Workflow
```
Local Development
   ↓
Run Tests / Lint
   ↓
Build (`npm run build`)
   ↓
git add .
git commit -m "<type>: <short description>"
   ↓
git push origin main
   ↓
GitHub Actions (lint → build) – must succeed
   ↓
Cloudflare Pages builds the `dist/` folder
   ↓
Production site updated at https://tools.risaladigitalmarketing.com
```

### 1️⃣ Pre‑release Checklist (run locally before committing)
- [ ] `npm run lint` – zero lint errors.
- [ ] `npm run build` – completes without TypeScript errors.
- [ ] Verify all pages open correctly on `localhost` (desktop, tablet, mobile).
- [ ] Run a quick Lighthouse audit (desktop) – scores > 90.
- [ ] Ensure SEO meta tags, Open Graph, Twitter cards are present for any new/updated page.
- [ ] Update `sitemap.xml` and commit the change if new routes were added.
- [ ] Verify `robots.txt` still points to the correct sitemap URL.
- [ ] Run `git status` – working tree clean.
- [ ] Increment version in `VERSION.md` according to semantic‑versioning rules.
- [ ] Add a descriptive entry to `CHANGELOG.md`.

### 2️⃣ Commit & Push
```bash
git add .
git commit -m "feat: add QR Generator tool"
# bump version (optional, but recommended)
# edit VERSION.md → 1.1.0
# add entry to CHANGELOG.md
git push origin main
```
GitHub Actions will start automatically.

### 3️⃣ CI / CD (GitHub Actions)
- **Lint** – fails on any ESLint errors.
- **Build** – runs `npm run build`. Any TypeScript compile error aborts the workflow.
- If the workflow fails, fix the issues locally and repeat step 2.

### 4️⃣ Cloudflare Pages Deployment
When the workflow succeeds, Cloudflare Pages picks up the new commit, runs the same `npm run build` step on its own runners, and publishes the new bundle to the custom domain. No manual steps required.

### 5️⃣ Post‑release Checklist
- [ ] Visit the live site and refresh a few pages – ensure content appears as expected.
- [ ] Open the **Deployments** view in Cloudflare → verify the latest deployment is marked **Success**.
- [ ] Check analytics (if any) for a spike in 200 OK responses.
- [ ] Confirm the SSL certificate is still valid (usually auto‑renewed).
- [ ] Update any external documentation that references the new version number.

## Rollback Procedure
If a release introduces a critical bug:
1. Identify the last good commit SHA (`git log`).
2. **Option A – Revert** (keeps history):
   ```bash
   git revert <bad‑sha>
   git push origin main
   ```
   Cloudflare will redeploy the reverted state.
3. **Option B – Hard reset** (only if the bad commit was never merged elsewhere):
   ```bash
   git reset --hard <good‑sha>
   git push -f origin main
   ```
   Use with caution – it rewrites history.

---

*The release process is deliberately simple because the project is maintained by a single developer. It scales well as more tools are added, and the CI ensures no broken build ever reaches production.*