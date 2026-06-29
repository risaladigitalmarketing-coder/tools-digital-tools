# Risala Digital Tools

A collection of free, client‑side web utilities for marketers, content creators, and developers. All tools run completely in the browser – no data ever leaves the user's device.

## Features
- **PDF Toolkit** – merge, split, compress, JPG ↔ PDF.
- **WhatsApp Link Generator** – create pre‑filled wa.me links.
- **Business Name Generator** – SEO‑friendly brand name ideas.
- **Marketing Calculators** – ROI, ROAS, CAC, LTV, CTR, CPC, CPM, Conversion Rate.
- **AI Meta‑Ads Generator** – instant ad copy with Google Gemini.
- **AI Blog Generator** – outlines, listicles, case‑studies.
- **AI Email Toolkit** – ready‑to‑send email drafts.
- **AI Prompt Generator**, **AI Image Tools**, **JSON Tools**, **Code Formatter**, **Dev Toolkit** – placeholders for future expansion.

## Tech Stack
- **React 18** with **Tailwind CSS**
- **Vite 5** for fast dev / production builds
- **Lucide‑react** icons
- **@seller-tools/ui** – a small shared component library (Auth, Tabs, utilities)

## Local Development
```bash
# Install dependencies (run once)
npm install

# Start dev server
npm run dev   # → http://localhost:3005 (or next free port)
```

## Build for Production
```bash
npm run build   # outputs to ./dist
```

The built `dist/` directory can be deployed to any static‑host (Cloudflare Pages, Vercel, Netlify, GitHub Pages, etc.).

## License
MIT – feel free to fork, remix, or contribute!

## Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [Update Workflow](UPDATE_WORKFLOW.md)
- [Release Process](RELEASE.md)
- [Backup & Recovery](BACKUP.md)
- [Versioning & Changelog](VERSION.md)
- [Deploy Checklist](DEPLOY_CHECKLIST.md)
- [Project Structure Guide](PROJECT_STRUCTURE.md)
