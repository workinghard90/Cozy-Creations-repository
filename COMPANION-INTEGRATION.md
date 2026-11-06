# Public contract for the private Cozy Site Companion

The production build emits `/companion-manifest.json` (schemaVersion 1) from the catalog and Vite output. It contains only public product metadata, published Amazon links, routes and asset paths. The dashboard, authentication, monitoring history and secrets stay in the separate private Cozy-Site-Companion repository.

The companion consumes this file read-only, under its existing request budget. This does not add tracking, a backend, cookies, a public dashboard, or a paid service. The storefront UI and publishing approval checks are unchanged.

`npm run check:release` verifies the generated manifest, published-link guard, and referenced files. A deployed manifest is catalog/build evidence, not a claim that all rendered pages work; the companion retains independent rendering and purchase-button validation.

Merge/deployment require owner approval. Deploy this change before activating the companion's manifest consumer. Until the file is deployed, the companion reports UNKNOWN rather than assuming success from the SPA's HTML fallback. Select a private runtime separately; the Node/watchdog dashboard cannot be hosted unchanged by this static Worker.
