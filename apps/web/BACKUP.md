# Backup & Recovery Guide

## 1. Recover the project from GitHub
1. **Clone the repository** on any machine (including a fresh VM or a new workstation):
   ```bash
   git clone https://github.com/<your‑user>/seller-tools-web.git
   cd seller-tools-web/apps/web   # the Vite project lives here
   ```
2. **Install dependencies** (uses the lock file to guarantee identical versions):
   ```bash
   npm ci    # clean install, no package‑json modifications
   ```
3. **Run the development server** to verify the code works:
   ```bash
   npm run dev
   ```
   The app should be reachable at `http://localhost:3005` (or the next free port).

## 2. Recover after a PC crash / hard‑drive loss
1. **Re‑install Node.js** (LTS) and Git on the new machine.
2. Follow the steps in **1. Recover the project from GitHub**.
3. All local configuration files (`.gitignore`, `.github/workflows`, docs) are version‑controlled, so they come back automatically.

## 3. Restore deployment configuration
1. **Cloudflare Pages** – the project is already linked to the GitHub repo. After the first successful push, Cloudflare keeps the connection.
2. If you ever need to **re‑connect**:
   - Log in to Cloudflare → **Pages** → **Create a Project** → connect the same GitHub repo and choose the same branch (`main`).
   - Use the same **Build command** (`npm run build`) and **Output directory** (`dist`).
3. **Custom domain** – DNS records are stored in Cloudflare. After restoring the repo, the domain will continue to point to the Pages project. No extra steps needed unless you delete the Pages project.

## 4. Disaster‑recovery checklist
- ✅ Verify you have a recent clone of the repo (or a fresh `git pull`).
- ✅ Run `npm ci` and `npm run build` locally – if the build succeeds, the repo is healthy.
- ✅ Confirm Cloudflare Pages shows a successful recent deployment.
- ✅ Test the live URL (`https://tools.risaladigitalmarketing.com`).
- ✅ If the site is down, check the Cloudflare dashboard for build errors and re‑run `git push` to trigger a new build.

## 5. Restoring a specific version
1. Find the tag or commit SHA for the version you need (`git tag` or `git log`).
2. Checkout that commit:
   ```bash
   git checkout <tag‑or‑sha>
   npm ci && npm run build
   ```
3. Push the restored state (if you want to make it the new `main`):
   ```bash
   git checkout -b recovery-<date>
   git push origin recovery-<date>
   ```
   Then you can open a PR to merge it back into `main` after verification.

---

**Tip:** Keep a backup of the `dist/` folder (e.g., in a cloud storage bucket) after each production release. It can be a quick way to restore a static snapshot if both the repo and CI fail for any reason.
