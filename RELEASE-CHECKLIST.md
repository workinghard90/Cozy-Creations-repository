# Storefront release readiness — November 2026

## Verified from GitHub
- PR #13 merged. The catalog points to two official covers and eight owner-uploaded preview images.
- GitHub build and Cloudflare Workers build for the merged main branch both completed successfully when checked.
- Book statuses remain `coming-soon`; no Amazon purchase URLs are configured.
- The owner confirmed the sample galleries display on the live website.

## Automated release gate
Run `npm run check:assets` to verify that all catalog image paths exist, are unique, and have valid PNG/WebP signatures. The GitHub pull-request and main-branch build workflow now runs this check before the Vite build.

## Still required before commercial launch
- Confirm each book's actual KDP publication status and exact Amazon listing URL; then update only the corresponding catalog entry.
- Confirm Pip sample images match the approved final KDP interior. The four files are owner-uploaded, but the manuscript edition has not been independently established.
- Perform a fresh interactive browser audit at mobile and desktop widths, including navigation, images, focus, overflow, accessibility and broken links. Previous testing in LAUNCH-READINESS.md predates the uploaded assets and is not a current verification.
- Choose whether to make the site discoverable. `public/robots.txt` currently uses `Disallow: /`, which discourages indexing. Do not flip it without launch approval.
- Confirm a working contact method and review privacy copy before enabling a newsletter or collecting personal data.
- Update footer wording and launch documentation when the storefront changes from preview to public sales.

Do not claim a sale, publication, live-browser pass, or production deployment based solely on a successful CI build.
