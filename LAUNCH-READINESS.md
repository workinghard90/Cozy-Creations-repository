# Launch Readiness — Cozy Creations by Autumn™

**Is this site ready for a public visitor today? NO.** Every page, link, layout and
accessibility check passes, and the production build is clean — but the site is still
honestly empty of products (all three titles "Coming Soon", no covers, no Amazon URLs),
the Instagram profile could not be verified, and the owner has not given launch approval.
A visitor would find a polished, truthful, working site with nothing yet to buy.

Tested against the **internal preview** (see "Where this was tested"). Nothing was
published, purchased, or deployed. No cover/character artwork was opened or integrated.

---

## PHASE 2 — Functionality & Quality

### 1. Routes — PASS

Command (against the rebuilt production output):

```
for p in / /pips-cloud-magic /books/{coloring-books,storybooks,logbooks-journals,other-books} \
         /books/<collection>/<product> /artwork-and-gifts /about /contact /privacy; do
  curl -s -o /dev/null -w "%{http_code} $p\n" http://127.0.0.1:3100$p; done
```

| URL | Status |
| --- | --- |
| `/` | 200 |
| `/pips-cloud-magic` | 200 |
| `/books/coloring-books` | 200 |
| `/books/storybooks` | 200 |
| `/books/logbooks-journals` | 200 |
| `/books/other-books` | 200 |
| `/books/coloring-books/pips-cloud-magic-coloring-book` | 200 |
| `/books/storybooks/pip-and-the-upside-down-rain` | 200 |
| `/books/logbooks-journals/vehicle-maintenance-logbook` | 200 |
| `/artwork-and-gifts` | 200 |
| `/about` | 200 |
| `/contact` | 200 |
| `/privacy` | 200 |
| `/books-and-logbooks` | **307 → `/books/logbooks-journals`** (`Location` header confirmed) |
| `/nope-404` | 404 (branded page) |

No error boundary rendered: `grep -ci "Something went wrong|Unexpected Application
Error|error-boundary|Internal Server Error"` returned **0** on every page checked.

### 2. Links — PASS

Crawled the rendered HTML of all 13 pages, extracted every `href`, and re-requested each:
**47 unique internal targets, all 200** (or the intended 307). Covers header, footer
(including both social anchors), breadcrumbs, card CTAs and the `/#collections` anchor.
No dead internal links found, so nothing needed fixing.

External targets found, in full: `fonts.googleapis.com` stylesheet, `fonts.gstatic.com`
preconnect, `instagram.com/wonderfullyenchantedchaos/`, `tiktok.com/@wonderfullyenchanedchaos`.

### 3. Navigation — PASS

Real browser (`agent-browser`), not source inspection.

**Desktop Books dropdown @1440** — 9 checks, all pass:

| Step | Result |
| --- | --- |
| Enter on focused "Books" | `aria-expanded="true"`, `#books-menu` visible |
| Tab | focus → first link ("Coloring Books…") |
| Tab again | focus → second link ("Storybooks…") |
| Escape | menu removed, `aria-expanded="false"`, **focus returned to the Books button** |
| Pointer-down outside | menu closes |
| Space | opens |
| Menu contents | 4 collection links |

**Mobile hamburger @375 and @390** — all pass at both widths:

| Check | Measurement |
| --- | --- |
| Opens | `aria-expanded="true"`, panel visible, focus moved to first link (`A:Home`) |
| No layout shift | document height 5836 px and hero top 172 px **before and after** opening (identical); panel is `position: absolute` under the sticky header |
| Internal scroll | at 375×420 the panel is `scrollHeight 532 / clientHeight 355`; `scrollTop` reached 177 while `window.scrollY` stayed **0** — it scrolls inside itself, page behind does not move |
| Escape | closes, focus returns to the toggle button |
| Outside tap | closes |
| Route change | open menu → click `/about` → URL `/about`, menu closed |
| No focus trap | after 12 Tab presses focus left the panel onto page content (`inPanel: false`) |
| Contents | 9 links (Home, Pip's Cloud Magic, 4 collections, Artwork & Gifts, About, Contact) |

### 4. Responsiveness — PASS (one cosmetic issue FIXED)

`scrollWidth` vs `clientWidth` of `<html>` measured on **all 14 pages** (13 + 404) at
**375, 390, 768 and 1440** = 56 measurements. **Every one: `scrollWidth == clientWidth`**
(e.g. 375 → 360/360, 768 → 753/753, 1440 → 1425/1425). No horizontal overflow anywhere.
Elements flagged as extending past the viewport edge are the decorative blur "blobs"
inside `overflow-hidden` parents — confirmed harmless by the scrollWidth result.

**FIXED — 5-card homepage grid at 768.** At `sm` the grid is 2 columns, so the fifth card
sat alone at half width (341 px) on its own row. One-line change in `src/routes/index.tsx`:
the last card now spans both columns when the collection count is odd
(`index === collections.length - 1 && collections.length % 2 === 1 ? "sm:col-span-2"`).
Re-measured at 768: cards 1–4 at 341 px in two rows, card 5 at **705 px** full width.
At 1440 the intended 3 + 2 composition is unchanged (3 × 347 px, then 2 × 532 px).
At 640 no overflow (`scrollWidth == clientWidth == 625`).

### 5. Accessibility — 2 issues FIXED, rest PASS

Per-page automated audit of all 14 pages (`agent-browser eval`, canvas-based colour
resolution so Tailwind 4 `oklch()` values convert correctly).

| Check | Result |
| --- | --- |
| `lang` | `en` on every page |
| One `h1` per page | 1 on all 14 pages |
| Alt text | 1 image per page (the header emblem), `alt="Cozy Creations by Autumn™ emblem"`, **0 missing alt** |
| Landmarks | 1 `header`, 1 `main`, 1 `footer` per page; navs labelled `Primary`, `Mobile`, `Footer` (+ `Breadcrumb` on product pages) |
| Skip link | `href="#main-content"`, target exists with `tabindex="-1"` on all 14 pages |

**FIXED — heading order.** The three collection pages with titles jumped `h1 → h3`
(product cards use `h3` with no `h2` between). Added a visually hidden
`<h2 class="sr-only">Titles in {collection}</h2>` above the product grid in
`src/components/CollectionPageBody.tsx`. Re-measured: levels now `1,2,3` on all three
pages; `other-books` (empty state) stays `1,2`.

**FIXED — disabled-control contrast.** Two disabled controls were below 4.5:1:

| Control | Before | Change | After |
| --- | --- | --- | --- |
| Reserved "Buy on Amazon" button (`buttonStyles.ts` `DISABLED_BUTTON`) | 3.15:1 (`text-ink/55`) | → `text-ink/75` | **5.47:1** |
| Newsletter "Sign up" button + input on `/contact` | 3.54:1 (`text-ink/60`) | → `text-ink/75` (placeholder `/40` → `/55`) | **≥ 4.5:1, 0 fails** |

(Strictly, WCAG 1.4.3 exempts inactive controls; raised anyway so nothing on the site
depends on that exemption. Both controls stay visibly inert via `cursor-not-allowed` and
a muted background.)

**Measured contrast, final build** (all ≥ 4.5:1 normal / 3:1 large):

| Element | Ratio |
| --- | --- |
| Body paragraph (ink-soft on cream) | 7.08:1 |
| Body paragraph (ink/85 on cream) | 8.29:1 |
| `h1` on cream | 13.13:1 |
| Tagline (red on cream, 24 px) | 7.45:1 |
| "Coming Soon" badge (ink on gold-soft) | 11.21:1 |
| Gold accent text on deep red | 7.92:1 |
| Footer body text (cream on red-deep) | 9.28:1 |
| Footer link | 7.81:1 |
| **Footer social pill** (cream on red pill over red-deep) | **7.36:1** |
| Footer "Follow Along" label (cream/75 on red-deep) | 5.84:1 |
| Active nav pill (ink on red-soft) | 11.39:1 |
| **Disabled Amazon button** | **5.47:1** |

### 6. SEO — PASS, robots.txt ADDED, sitemap deliberately SKIPPED

Unique, accurate `<title>` and `<meta name="description">` on all 13 pages, plus
`og:title` + `og:description` on every one:

| Page | Title |
| --- | --- |
| `/` | Cozy Creations by Autumn™ — A Little Magic in Every Creation. |
| `/pips-cloud-magic` | Pip's Cloud Magic \| Cozy Creations by Autumn™ |
| `/books/coloring-books` | Coloring Books \| Cozy Creations by Autumn™ |
| `/books/storybooks` | Storybooks \| Cozy Creations by Autumn™ |
| `/books/logbooks-journals` | Logbooks & Journals \| Cozy Creations by Autumn™ |
| `/books/other-books` | Other Books \| Cozy Creations by Autumn™ |
| `/books/coloring-books/pips-cloud-magic-coloring-book` | Pip's Cloud Magic Coloring Book \| Cozy Creations by Autumn™ |
| `/books/storybooks/pip-and-the-upside-down-rain` | Pip and the Upside-Down Rain \| Cozy Creations by Autumn™ |
| `/books/logbooks-journals/vehicle-maintenance-logbook` | Vehicle Maintenance Logbook \| Cozy Creations by Autumn™ |
| `/artwork-and-gifts` | Artwork & Gifts \| Cozy Creations by Autumn™ |
| `/about` | About \| Cozy Creations by Autumn™ |
| `/contact` | Contact & Updates \| Cozy Creations by Autumn™ |
| `/privacy` | Privacy Policy \| Cozy Creations by Autumn™ |

**FIXED — favicon.** There was no favicon at all (`/favicon.ico`, `.svg`, `.png` all 404).
`src/routes/__root.tsx` now emits `<link rel="icon" type="image/png" href="/assets/emblem-color-….png">`
plus `apple-touch-icon`, pointing at the owner's existing official colour emblem. Because
that file is already preloaded for the header on every page, this adds **no extra request
and no new artwork**. (Grayscale emblem remains print-only and is never referenced.)

**FIXED — robots.txt.** Added `public/robots.txt` (`User-agent: *` / `Allow: /`) — now 200.
It is deliberately host-agnostic, so it is equally correct on the preview and on a future
launch domain.

**SKIPPED — sitemap.xml, on purpose.** A sitemap requires absolute URLs. The only domain
the build knows is the preview host, so a generated sitemap would hardcode
`cozycreationsbyautumn-dev.cto.site` and be **wrong the moment the site launches on its
own domain**. Generating one now would create a broken artifact; it should be added at
launch, when the real domain is known. `/sitemap.xml` therefore returns 404, which is the
correct state for an unlaunched site.

**404 page**: returns HTTP 404 and renders the branded page (`h1` "This page drifted
away"). **CAVEAT:** its `<title>` is the root fallback "Cozy Creations by Autumn™", not a
page-specific "Page Not Found" title — see Blockers/risks. Rendering a second `<title>`
inside the not-found component produced two title elements, so it was reverted rather than
ship invalid HTML.

### 7. Performance — measured (optimisation is post-launch, as briefed)

| Metric | Value |
| --- | --- |
| Total client JS, gzipped | **121,809 B (~119 KB)** — largest chunk `index-*.js` 111,565 B gz (351,666 B raw) |
| Total client CSS, gzipped | **8,121 B (~8 KB)** (raw 47,071 B) |
| Biggest asset by far | **`emblem-color-*.png` = 374,422 B (366 KB)**, a 457 × 516 PNG displayed at **40–56 px CSS** (≈112 px at 2×) — roughly 10× oversized. Quantified optimisation: a correctly sized 112 × 126 PNG would be on the order of 10–20 KB, saving ~350 KB on the first page view of every visit. Not fixed: it is the owner's original asset and re-encoding it is a post-launch decision. |
| Second biggest | `app-*.css` 47 KB raw / 8 KB gz |
| Font strategy | Google Fonts stylesheet with `display=swap`, plus `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin). Two families: Fraunces (5 faces) + Nunito (4 weights). The stylesheet is a third-party render-blocking request; self-hosting would remove it. |
| Lazy-loading | Only one `<img>` exists site-wide: the header emblem, correctly `loading="eager"` + `fetchPriority="high"` (above the fold). There are no below-fold images yet — all placeholders are CSS — so lazy-loading is not yet applicable. |
| Build | `vite build` completes in **~840 ms**; server bundle `dist/server/server.js` 58.30 kB |

### 8. Honesty — PASS

| Requirement | Evidence |
| --- | --- |
| All three titles "Coming Soon" | `status: "coming-soon"` for all three in `src/data/catalog.ts`; "Coming Soon" badge rendered on each card and product page |
| Amazon controls disabled and non-linking | 3 product pages audited: `<button disabled aria-disabled="true">Buy on Amazon</button>` with **`href=null`** on every one; accompanied by "Amazon link coming soon" |
| Newsletter clearly unavailable, no form posting nowhere | `/contact` form has **no `action`**, `onSubmit={event => event.preventDefault()}`, a **disabled** email input and a **disabled** "Sign up" button, plus the visible note "Email updates aren't connected yet — check back soon." |
| Contact marked unavailable | "Contact email coming soon" placeholder + "No email address has been set up yet" |
| No prices / reviews / ratings / testimonials / sales numbers / discounts / urgency | Rendered-HTML scan across all pages found no such content; no product prices, no star ratings, no counts of buyers, no countdowns or "only N left" language |

### 9. Social destinations — TikTok PASS, Instagram NOT VERIFIED

Browser with a mobile device profile (`agent-browser set device "iPhone 12"`).

**TikTok — PASS.** Opened `https://www.tiktok.com/@wonderfullyenchanedchaos`:
- `<title>`: `wonderfullyenchantedchaos (@wonderfullyenchanedchaos) | TikTok`
- Rendered profile text: `wonderfullyenchantedchaos @wonderfullyenchanedchaos 1 Following 1 Followers 1 Likes ✨ Where magic meets mischief 🐉 🎬 AI fantasy, laughs & delightful chaos 🌙 Enter the weird side Follow`
- **Display name "wonderfullyenchantedchaos" and handle "@wonderfullyenchanedchaos" both confirmed.** The single-n "enchaned" spelling in the URL is correct and was not altered.

**Instagram — NOT VERIFIED.** Opened `https://www.instagram.com/wonderfullyenchantedchaos/`;
the browser landed on `chrome-error://chromewebdata/` with body text
`This page isn't working … HTTP ERROR 429 Reload`. Instagram rate-limited the request
(HTTP 429 from this datacentre IP), so no profile content was served and the account
cannot be confirmed from here. This is not a "working" result — it is unverified.

---

## PHASE 3 — Launch preparation

### 10. Privacy policy accuracy — FIXED

Read `/privacy` as rendered and checked every claim against actual behaviour.

**FIXED — approved social paragraph added**, verbatim, as its own section
("Social media links"), with an `h2` matching the page's existing voice.

**FIXED — Google Fonts disclosure.** The policy implied a site that makes no outside
requests, while every page fetches Fraunces + Nunito from Google Fonts. Two changes:
- "The short version" now ends: *"The one outside service it does use is Google Fonts, for
  our typefaces — explained in full below."*
- New section "Fonts and other outside requests" states plainly that the browser asks
  Google's servers for the font files, that this shares the visitor's IP address and basic
  browser details, that Google's own practices apply, and that it is the **only** outside
  service the site contacts.

**Remaining claims verified true on the final build:**

| Claim | Verified how |
| --- | --- |
| No analytics | No analytics script in any rendered page; only Google Fonts + local assets requested |
| No accounts | No login, register or session UI anywhere |
| No checkout | No cart, price or payment code; Amazon buttons are disabled with no `href` |
| No forms collecting data | Only form is the disabled newsletter form on `/contact` (no `action`, submit prevented, fields disabled) |
| Social links open in a new tab, nothing embeds | Both anchors carry `target="_blank" rel="noopener noreferrer"`; no iframe/script/pixel from either platform in the HTML |
| Google Fonts is the only third-party request | Confirmed by the external-href crawl: `fonts.googleapis.com`, `fonts.gstatic.com`, and the two social profile URLs (which are only links, not requests) |

### 11. Production build — PASS

| Check | Result |
| --- | --- |
| `bun run build` | **Exit 0**, "✓ built in ~840 ms", clean from source |
| `bunx tsc --noEmit` | **No errors in `src/`.** Only the known `serve.ts` notes (`import.meta.dir`, `Bun` global, implicit `any` on `req`) — the pre-existing Bun-typing exceptions |
| Assets resolve | Every `/assets/*.js`, `.css` and `.png` referenced in the HTML returned 200 in the crawl (26 asset URLs) |
| No dev-only code paths | The built output is served by the same `serve.ts` used in production; the QA harness mirrors it exactly and renders identical pages |
| No env vars or secrets needed | Build and server run with no `process.env` reads in site code; nothing is required to render any page |

**Does a public launch require any paid hosting, database, subscription or third-party
integration? Technically, no.** The build is a static client bundle plus one Bun server
process serving files and SSR — no database, no API keys, no paid service is referenced
anywhere in the code. It needs only a host that can run `bun` (or any static host if SSR is
dropped) and, ideally, a domain name (a cost, and the lead's call, not a technical
requirement). The one third-party integration that exists — Google Fonts — is free and
already working.

### 12. This document
`/home/team/shared/site/LAUNCH-READINESS.md` (this file).

### 13. SITE.md
A "Social" note was added: `src/data/social.ts` is the only place those URLs live.

---

## Blockers

1. **No products are available.** All three titles are honestly "Coming Soon", with no
   covers and no Amazon URLs. A public visitor cannot buy anything. This is the owner's
   asset/publication dependency, not a site defect.
2. **Instagram could not be verified.** HTTP 429 from this datacentre IP on every attempt.
   The owner's requirement is that both profiles be verified before the social integration
   is called complete — that condition is not met for Instagram.
3. **Owner launch approval has not been given.** The site is not to be published until the
   owner approves, and the final design review is still outstanding.

## Known risks / caveats (not blockers)

- The header emblem PNG is 366 KB displayed at 40–56 px — the single largest asset and the
  main performance cost on a slow connection (~10× oversized).
- The 404 page's `<title>` is the brand fallback rather than "Page Not Found".
- Fonts load from Google Fonts (a third-party, render-blocking request); self-hosting would
  remove both the latency and the privacy dependency.
- `sitemap.xml` is intentionally absent until the launch domain is known.

## Where this was tested

- The platform-managed preview on **port 3000** (`http://localhost:3000`) for the route,
  link, navigation, responsiveness, accessibility, SEO and honesty passes.
- A **QA-only harness on `127.0.0.1:3100`** (`/tmp/qa-serve.ts`, a copy of `serve.ts`'s
  fetch logic with the port changed) serving the freshly built `dist/`, for every check
  made **after** the code fixes — so the PASS results above reflect the current source, not
  the pre-fix preview. The real preview server was never started, stopped or rebuilt.

Nothing was deployed publicly. Nothing was purchased. No cover or character artwork was
opened or integrated. All three products remain "Coming Soon".
