# Asset intake — what to supply, and where to put it

**For:** Melody (owner) · **Site:** Cozy Creations by Autumn™ (internal preview, not launched)

This is the complete list of real assets the website is waiting on. Nothing on the
site is switched on by guessing: an Amazon button stays greyed out, and a cover
frame stays labelled *"Official cover coming soon"*, until the real file or link is
supplied and confirmed.

You can supply files one at a time — each one goes live on its own, with no
redesign and no code written.

---

## 1. Book covers (one per title)

| Title | Exact filename to supply | Where it goes |
| --- | --- | --- |
| Pip's Cloud Magic Coloring Book | `pips-cloud-magic-coloring-book.png` | `public/covers/` |
| Pip and the Upside-Down Rain | `pip-and-the-upside-down-rain.png` | `public/covers/` |
| Vehicle Maintenance Logbook | `vehicle-maintenance-logbook.png` | `public/covers/` |

**Image guidance for every cover**

- Portrait, 3:4 shape (for example 1600 × 2133 px or larger). At least **1600 px tall**.
- PNG or JPG, sRGB colour, under about 2 MB.
- The full cover as it appears on the book — no mockups, no 3D renders, no cropped art.
- If your file is a `.jpg`, use `title-slug.jpg` instead of `.png`; that is fine, just
  tell us the exact name.

**What gets set in `src/data/catalog.ts`** — one line on that title's entry:

```ts
coverAsset: "/covers/pips-cloud-magic-coloring-book.png",
```

That single field is the whole switch. The cover then appears on that title's card,
on its own product page, and (for the featured title) on the homepage — all in the
same 3:4 frame, so nothing on the page jumps or shifts.

---

## 2. Pip / Cloudmeadow character art (for the Pip's Cloud Magic page)

| Frame | Exact filename to supply | Where it goes | What gets set in `src/data/catalog.ts` |
| --- | --- | --- | --- |
| Hero character art | `pip-character.png` | `public/pip-art/` | `asset: "/pip-art/pip-character.png"` in `pipHeroArt` |
| Book cover (artwork gallery) | `pip-book-cover.png` | `public/pip-art/` | `asset: "/pip-art/pip-book-cover.png"` in `pipArtwork` (item `pip-book-cover`) |
| Character sheet | `pip-character-sheet.png` | `public/pip-art/` | `asset: "/pip-art/pip-character-sheet.png"` in `pipArtwork` (item `pip-character-sheet`) |
| Sample coloring page | `pip-sample-page.png` | `public/pip-art/` | `asset: "/pip-art/pip-sample-page.png"` in `pipArtwork` (item `pip-sample-page`) |
| Cloudmeadow scene | `pip-cloudmeadow.png` | `public/pip-art/` | `asset: "/pip-art/pip-cloudmeadow.png"` in `pipArtwork` (item `pip-cloudmeadow`) |

**Image guidance:** portrait 3:4, PNG or JPG, at least **1600 px tall**, sRGB,
under about 2 MB. Official artwork only — the site never draws, traces, recolours,
or generates Pip, Cloudmeadow, or any cover.

Frames you do not supply keep their honest *"…coming soon"* label. Supplying art
fills a frame in place; the layout does not change.

---

## 3. Amazon listing link (one per title)

| Title | What to supply |
| --- | --- |
| Pip's Cloud Magic Coloring Book | The full Amazon product page address (KDP listing) |
| Pip and the Upside-Down Rain | The full Amazon product page address |
| Vehicle Maintenance Logbook | The full Amazon product page address |

**What gets set in `src/data/catalog.ts`:**

```ts
amazonUrl: "https://www.amazon.com/dp/XXXXXXXXXX",
```

Until a verified link is supplied, the "Buy on Amazon" button on that title's page
is **disabled and greyed out** with the note *"Amazon link coming soon"*, and it
links nowhere. No link is ever guessed or previewed.

---

## 4. Publication status (one per title)

| Title | Today on the site | What to confirm |
| --- | --- | --- |
| Pip's Cloud Magic Coloring Book | Coming Soon | Is it published on Amazon, and is the link live? |
| Pip and the Upside-Down Rain | Coming Soon | Is it published on Amazon, and is the link live? |
| Vehicle Maintenance Logbook | Coming Soon | Is it published on Amazon, and is the link live? |

**What gets set in `src/data/catalog.ts`:** `status: "available"` — only after you
confirm the book is actually published **and** the Amazon link works. Nothing shows
as available before that, and no title carries a price, review, rating, or sales
number anywhere on the site.

---

## 5. Facts to confirm for each title

The descriptions on the site today are deliberately limited to what has been
confirmed. Please confirm or correct these before launch:

- **Pip's Cloud Magic Coloring Book** — description mentions ages 3–8, 40 coloring
  illustrations, and blank reverse pages. Confirm each is accurate.
- **Pip and the Upside-Down Rain** — description says only that story details and
  cover are coming soon. A short, accurate description would replace it.
- **Vehicle Maintenance Logbook** — description covers service, repairs,
  maintenance costs, completed work, and dedicated notes pages. Confirm, and add any
  other confirmed feature (page count, size, binding).

---

## Nothing is activated until you confirm it

Every item above is switched on only when the real file or verified link is in place
and you have said it is correct. That means:

- no cover, character art, or Cloudmeadow image is drawn, substituted, or generated;
- no Amazon button works without a verified listing address;
- no title is marked available until it genuinely is;
- no price, review, rating, discount, or sales figure appears anywhere on the site;
- the site stays on the internal preview and is not launched publicly until you
  approve it.

Questions about a file (naming, size, format)? Send whatever you have — the team
will prepare it to fit.
