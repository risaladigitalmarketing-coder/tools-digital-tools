# Seller Tools Monorepo

A PNPM monorepo containing the `apps/web` front‑end application and shared UI components in `packages/ui`.

## Packages
- **apps/web** – Vite + React application.
- **packages/ui** – Shared React component library.

## Development
```bash
# Install all dependencies
pnpm install

# Run the web app in development mode
pnpm --filter apps/web dev
```

## Build
```bash
pnpm --filter apps/web build
```

## Deploy
The Vercel project should use **apps/web** as the Root Directory.
