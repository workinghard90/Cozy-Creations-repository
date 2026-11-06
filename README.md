# Cozy Creations by Autumn™ — storefront

This is the **public, pre-launch storefront** for Cozy Creations by Autumn™, the publishing and creative brand of Melody Autumn Hall. The site includes the three currently cataloged book titles, collection pages, official cover art, selected sample pages, and a contact page. Products remain **coming soon** until verified Amazon publication links are entered in `src/data/catalog.ts`.

The **private Cozy Site Companion** runs in a separate private repository. Only the explicitly public `/companion-manifest.json` contract is emitted by this storefront's build. Never add Companion credentials, monitoring history, or private state to this public repository.

## Develop and verify

Use Node.js 22+ and install dependencies from the repository root:

```bash
npm install
npm run dev
```

Before approving or deploying changes:

```bash
npm run check:assets
npm run check:purchases
npm run check:experience
npm run check:types
npm run build
node scripts/check-build-output.mjs
```

The combined release check is `npm run check:release`. For a local preview of the built site, run `npm run preview`. Cloudflare Workers deployment is **not automatic from these commands**; the explicit deployment script is `npm run deploy`, requiring separately configured Cloudflare authorization and deployment approval.

**Dependency reproducibility:** `package-lock.json` is not yet committed. Therefore `npm install` is currently used; do **not** switch CI to `npm ci` until a lockfile generated from the real dependency graph is added and verified. See the pending dependency-lock audit item.

## Content and official imagery

- Edit `src/data/catalog.ts` to add or update real products. Keep `status: "coming-soon"` until a verified live Amazon listing exists.
- Place official book covers under `public/covers/` and sample pages under `public/samples/`. Never generate replacement characters or substitute unapproved artwork.
- The header uses `src/assets/brand/emblem-color-web.png`. The full-sized `emblem-color.png` source is retained as brand material, **not** imported into the deployed site.
- Asset checks: `npm run check:assets`; purchase gating: `npm run check:purchases`.
- Optimize preview imagery without altering its contents; update catalog paths, tests, and the public manifest contract together if a file extension changes.

## Pre-launch safety and SEO

`public/robots.txt` deliberately uses `Disallow: /`, and `scripts/check-build-output.mjs` enforces that restriction. **Do not enable indexing, publish a launch sitemap, or change the robots rule until the owner explicitly approves the launch.**

The current site uses Vite + React Router client rendering. Route-specific metadata currently lives in client code. Search/social previews and real 404 responses need a separately tested prerender/hosting change; they are **not** guaranteed by the present SPA. The Cloudflare Workers deployment check is distinct from GitHub CI: investigate both if one fails.

## Source of truth

- `LAUNCH-READINESS.md` — current launch gates.
- `ASSET-INTAKE.md` — approved brand and sample assets.
- `COMPANION-INTEGRATION.md` — strictly public storefront-to-private-Companion contract.
- `RELEASE-CHECKLIST.md` — release and verification steps.

© 2026 Melody Autumn Hall. All rights reserved.
