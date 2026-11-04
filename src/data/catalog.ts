/**
 * ─────────────────────────────────────────────────────────────────────────
 * Cozy Creations by Autumn™ — CATALOG (single source of truth)
 * ─────────────────────────────────────────────────────────────────────────
 * Every collection page, product detail page, homepage card, and nav item is
 * rendered from the data below. No page redesign is needed to grow the brand.
 *
 * ▌HOW TO ADD A FUTURE PRODUCT (the normal case)
 * ▌  1. Open `products` below and append ONE object:
 * ▌       {
 * ▌         id: "my-new-title",                    // unique, stable
 * ▌         slug: "my-new-title",                  // URL segment (lowercase-hyphenated)
 * ▌         collectionId: "coloring-books",        // one of the CollectionIds below
 * ▌         title: "My New Title",                 // no ™ — never on product titles
 * ▌         description: "…",                      // honest; only confirmed facts
 * ▌         status: "coming-soon",                 // or "available" once published
 * ▌         specs: ["…"],                          // optional spec chips
 * ▌         coverAsset: "/covers/<slug>.png",      // optional; official art only
 * ▌         amazonUrl: "https://www.amazon.com/…", // optional; verified URL only
 * ▌       }
 * ▌  2. That's it — collection pages, product detail pages (one dynamic route),
 * ▌     homepage counts, and nav all update automatically. Never invent a
 * ▌     title, link, price, or claim: a missing coverAsset/amazonUrl renders
 * ▌     honest placeholders automatically.
 *
 * ▌HOW TO ADD A FUTURE BOOK COLLECTION
 * ▌  1. Append an object to `collections` (id, slug, title, blurb, icon, accent).
 * ▌  2. Extend the CollectionId union below with the new id.
 * ▌  3. Add ONE thin route file at src/routes/books/<slug>.tsx — copy an
 * ▌     existing collection route and swap the id + SEO strings.
 *
 * NOTE — "artwork-and-gifts" is the separate Artwork & Gifts collection: it
 * keeps its own route (/artwork-and-gifts) and gallery page, so products added
 * with collectionId "artwork-and-gifts" appear in homepage counts but must also
 * be presented on that page's gallery when they become real.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Per-collection accent. Lavender is reserved for Pip's Cloud Magic-linked collections ONLY. */
export type CollectionAccent = "lavender" | "gold" | "red";

/** Icon keys are mapped to decorative doodles in src/components/CollectionIcon.tsx. */
export type CollectionIconKey = "cloud" | "book" | "wrench" | "sparkle" | "star" | "gift";

export type CollectionId =
  | "coloring-books"
  | "storybooks"
  | "logbooks-journals"
  | "other-books"
  | "artwork-and-gifts";

export type ProductStatus = "coming-soon" | "available";

export interface CatalogCollection {
  /** Stable identifier — products point at collections by this. */
  id: CollectionId;
  /** URL segment for book collections (/books/<slug>); artwork keeps /artwork-and-gifts. */
  slug: string;
  title: string;
  /** One-line blurb used on cards, nav, and collection intros. */
  blurb: string;
  icon: CollectionIconKey;
  accent: CollectionAccent;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  collectionId: CollectionId;
  /** Product title — NEVER carries the ™ (brand name only). */
  title: string;
  /** Honest description — only confirmed facts, no invented claims. */
  description: string;
  status: ProductStatus;
  /** Optional spec chips shown on the product page and cards. */
  specs?: string[];
  /**
   * Optional official cover, as a PUBLIC-DIRECTORY path from the site root —
   * e.g. "/covers/pips-cloud-magic-coloring-book.png".
   *
   * Owner-supplied art only — never generated, never substituted. Put the file
   * in `public/covers/` with the title's slug as its filename (see
   * ASSET-INTAKE.md at the repo root). `public/` is copied verbatim to the web
   * root on every build, so the path resolves identically in `vite dev` and in
   * the published production build — unlike a `/src/…` path, which needs a
   * bundler import and 404s from a raw string. Leave the field out (or comment
   * it out) and the site shows the honest "Official cover coming soon" frame.
   */
  coverAsset?: string;
  /** Optional verified Amazon listing URL — never a guessed or invented link. */
  amazonUrl?: string;
  /** Verified contents for the product detail page. */
  inside?: string[];
  /** Optional owner-approved preview images (only add after files exist). */
  sampleAssets?: { src: string; caption: string; alt: string }[];
  /** Flag for homepage/featured emphasis. */
  featured?: boolean;
}

/** All collections — the four book shelves plus the separate Artwork & Gifts collection. */
export const collections: CatalogCollection[] = [
  {
    id: "coloring-books",
    slug: "coloring-books",
    title: "Coloring Books",
    blurb:
      "Cozy coloring adventures with bold, friendly lines made for little artists — gentle fun for growing imaginations.",
    icon: "cloud",
    // Lavender: Pip's Cloud Magic collection-linked (Pip's Cloud Magic Coloring Book).
    accent: "lavender",
  },
  {
    id: "storybooks",
    slug: "storybooks",
    title: "Storybooks",
    blurb:
      "Illustrated read-aloud stories of friendship, kindness, and gentle magic — cozy tales for bedtime and together time.",
    icon: "book",
    // Lavender: Pip's Cloud Magic collection-linked (Pip and the Upside-Down Rain).
    accent: "lavender",
  },
  {
    id: "logbooks-journals",
    slug: "logbooks-journals",
    title: "Logbooks & Journals",
    blurb:
      "Keepsake practical books that keep life's details tidy — service records, expenses, and everyday notes worth keeping.",
    icon: "wrench",
    accent: "gold",
  },
  {
    id: "other-books",
    slug: "other-books",
    title: "Other Books",
    blurb:
      "Curious titles that fit no single shelf — surprise publications announced here as they take shape.",
    icon: "sparkle",
    accent: "red",
  },
  {
    id: "artwork-and-gifts",
    slug: "artwork-and-gifts",
    title: "Artwork & Gifts",
    blurb:
      "Stickers, art prints, and coloring downloads to brighten desks, doors, and gift wrap — a cheerful gallery in the making.",
    icon: "gift",
    accent: "red",
  },
];

/** The four book collections browsable under /books/ (Artwork & Gifts keeps its own route). */
export const bookCollections: CatalogCollection[] = collections.filter(
  (collection) => collection.id !== "artwork-and-gifts",
);

/**
 * All products, v1. EXACTLY three titles exist today — nothing is invented.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ▶ FUTURE PRODUCTS: append new CatalogProduct objects to this array.
 *   Add each future title here (with its true status) and the whole site
 *   updates automatically — see the instructions at the top of this file.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const products: CatalogProduct[] = [
  {
    id: "pips-cloud-magic-coloring-book",
    slug: "pips-cloud-magic-coloring-book",
    collectionId: "coloring-books",
    title: "Pip's Cloud Magic Coloring Book",
    description:
      "Join Pip for cozy kitchens, rainbow days, garden adventures, and magical little moments. This coloring book for ages 3–8 includes 40 scenes ranging from simple coloring pages to detailed discoveries, with blank reverse pages.",
    status: "coming-soon",
    specs: ["Ages 3–8", "8.5 × 11 in paperback", "84 pages", "40 coloring scenes", "Blank reverse pages", "Black-and-white interior"],
    featured: true,
    inside: ["40 coloring scenes, from simple to more detailed designs", "Blank reverse pages", "8.5 × 11 inch black-and-white interior"],
    coverAsset: "/covers/pips-cloud-magic-coloring-book.png",
    // amazonUrl: set ONLY once a verified Amazon listing URL exists — never before.
  },
  {
    id: "pip-and-the-upside-down-rain",
    slug: "pip-and-the-upside-down-rain",
    collectionId: "storybooks",
    title: "Pip and the Upside-Down Rain",
    description:
      "The companion Pip's Cloud Magic storybook from Cloudmeadow. Story details and cover coming soon.",
    status: "coming-soon",
    // specs: none confirmed yet — add only what the owner confirms.
    // coverAsset / amazonUrl: reserved until real, verified assets exist.
  },
  {
    id: "vehicle-maintenance-logbook",
    slug: "vehicle-maintenance-logbook",
    collectionId: "logbooks-journals",
    title: "Vehicle Maintenance Logbook",
    description:
      "A 120-page vehicle maintenance logbook with 40 two-page records for service quotes and completed work, a two-page service index, and 25 lined notes pages. Organize repairs, parts, costs, and vehicle service history in one place.",
    status: "coming-soon",
    specs: ["6 × 9 in paperback", "120 pages", "40 two-page repair records", "2-page service index", "25 lined notes pages", "Black-and-white interior"],
    // A keepsake record of service, repairs, maintenance costs, and completed
    // work with dedicated notes pages. Never describe it as a distance or
    // consumption tracker — that is not what this book records.
    inside: ["40 two-page quote and completed-work repair records", "Fields for parts, deposits, warranties and service notes", "Two-page service index and 25 lined notes pages", "No fuel log"],
    sampleAssets: [
      { src: "/quote.webp", caption: "Repair quote record", alt: "Sample repair quote form from Vehicle Maintenance Logbook" },
      { src: "/completed-work.webp", caption: "Completed work record", alt: "Sample completed-work form from Vehicle Maintenance Logbook" },
      { src: "/service-index.webp", caption: "Service index", alt: "Sample service index from Vehicle Maintenance Logbook" },
      { src: "/notes.webp", caption: "Notes page", alt: "Sample lined notes page from Vehicle Maintenance Logbook" },
    ],
    coverAsset: "/covers/vehicle-maintenance-logbook.png",
    // amazonUrl: reserved until a verified listing exists.
  },
  // ── Future titles get added above this line ──────────────────────────────
];

/* ── Official artwork: where the owner's files live ───────────────────────
 *
 * Owner-supplied art ONLY. Drop files into these folders in the repo:
 *   public/covers/<product-slug>.png   → shown on cards + product pages
 *   public/pip-art/<name>.png          → shown in the Pip's Cloud Magic frames
 * `public/` is copied verbatim to the web root by every build, so the same path
 * works in `vite dev` and in the published build. Full instructions, filenames
 * and image guidance: ASSET-INTAKE.md at the repo root.
 * ------------------------------------------------------------------------ */

/** Public-directory folder for official book covers. */
export const COVERS_DIR = "/covers";

/** Public-directory folder for official Pip / Cloudmeadow character art. */
export const PIP_ART_DIR = "/pip-art";

/**
 * Validate an owner-supplied asset path before it reaches an <img src>.
 *
 * Returns the path when it is a root-relative PUBLIC path (e.g.
 * "/covers/pip.png"). Returns undefined — so the honest placeholder stays —
 * for an empty value or for a path that would break in a production build
 * (a "/src/…" or "/public/…" path is not served at the web root; it needs a
 * bundler import instead). Development logs a warning so a wrong path is
 * caught immediately rather than silently showing a placeholder.
 */
export function assetSrc(path?: string): string | undefined {
  if (!path) return undefined;
  const trimmed = path.trim();
  if (!trimmed) return undefined;
  const isPublicRootPath = trimmed.startsWith("/") && !/^\/(src|public)\//.test(trimmed);
  if (isPublicRootPath) return trimmed;
  if (import.meta.env?.DEV) {
    console.warn(
      `[catalog] Ignoring asset path "${trimmed}": official art must live under public/ and be ` +
        `referenced from the site root, e.g. "/covers/my-title.png". See ASSET-INTAKE.md.`,
    );
  }
  return undefined;
}

/** Icon vocabulary for the artwork frames (matches ArtPlaceholder's doodles). */
export type ArtworkIcon = "cloud" | "book" | "sparkle" | "star" | "gift";

/** One framed slot for official artwork on /pips-cloud-magic. */
export interface ArtworkSlot {
  /** Stable key — also the documented reference in ASSET-INTAKE.md. */
  id: string;
  /** Honest caption shown in the frame until the real art arrives. */
  label: string;
  /** Accessible description used once the real art is in place. */
  alt: string;
  icon: ArtworkIcon;
  /**
   * Public path to the official art, e.g. "/pip-art/pip-character.png".
   * Omit it and the honest labelled placeholder stays. Never fill this with
   * generated or substituted art.
   */
  asset?: string;
}

/**
 * Hero character art on /pips-cloud-magic. Also the fallback featured frame on
 * the homepage until the coloring book's own cover is supplied.
 */
export const pipHeroArt: ArtworkSlot = {
  id: "pip-character",
  label: "Official Pip character art coming soon",
  alt: "Official character art of Pip, the lavender cloud-sprite",
  icon: "cloud",
  // asset: "/pip-art/pip-character.png",  ← uncomment once the owner supplies it
};

/** The four official-artwork frames on /pips-cloud-magic, in display order. */
export const pipArtwork: ArtworkSlot[] = [
  {
    id: "pip-book-cover",
    label: "Official book cover coming soon",
    alt: "Official cover of Pip's Cloud Magic Coloring Book",
    icon: "book",
    asset: "/covers/pips-cloud-magic-coloring-book.png",
  },
  {
    id: "pip-character-sheet",
    label: "Official Pip character sheet coming soon",
    alt: "Official Pip character sheet artwork",
    icon: "cloud",
    // asset: "/pip-art/pip-character-sheet.png",
  },
  {
    id: "pip-sample-page",
    label: "Official sample coloring page coming soon",
    alt: "Official sample coloring page from Pip's Cloud Magic",
    icon: "sparkle",
    // asset: "/pip-art/pip-sample-page.png",
  },
  {
    id: "pip-cloudmeadow",
    label: "Official Cloudmeadow artwork coming soon",
    alt: "Official Cloudmeadow artwork",
    icon: "star",
    // asset: "/pip-art/pip-cloudmeadow.png",
  },
];

/* ── Catalog helpers (pure functions — safe on server and client) ── */

export function getCollection(id: CollectionId): CatalogCollection | undefined {
  return collections.find((collection) => collection.id === id);
}

export function getCollectionBySlug(slug: string): CatalogCollection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function productsInCollection(collectionId: CollectionId): CatalogProduct[] {
  return products.filter((product) => product.collectionId === collectionId);
}

/** Resolve a collection + product pair from URL slugs (dynamic product route). */
export function getCatalogEntry(
  collectionSlug: string,
  productSlug: string,
): { collection: CatalogCollection; product: CatalogProduct } | undefined {
  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) return undefined;
  const product = productsInCollection(collection.id).find(
    (candidate) => candidate.slug === productSlug,
  );
  if (!product) return undefined;
  return { collection, product };
}

/** Book collections live under /books/<slug>; Artwork & Gifts keeps its own route. */
export function collectionHref(collection: CatalogCollection): string {
  return collection.id === "artwork-and-gifts"
    ? "/artwork-and-gifts"
    : `/books/${collection.slug}`;
}

export function productHref(collection: CatalogCollection, product: CatalogProduct): string {
  return `${collectionHref(collection)}/${product.slug}`;
}

/** Honest badge tone for a single product's status. */
export function statusBadgeTone(status: ProductStatus): "comingSoon" | "published" {
  return status === "available" ? "published" : "comingSoon";
}

/** Card badge tone for a collection: live once anything is available, "In the Studio" while empty. */
export function collectionBadgeTone(
  collection: CatalogCollection,
): "comingSoon" | "published" | "studio" {
  const items = productsInCollection(collection.id);
  if (items.length === 0) return "studio";
  return items.some((product) => product.status === "available") ? "published" : "comingSoon";
}

/** Computed count line, e.g. "1 title coming soon" — updates automatically as the catalog grows. */
export function collectionCountLabel(collection: CatalogCollection): string {
  const items = productsInCollection(collection.id);
  if (items.length === 0) {
    return collection.id === "artwork-and-gifts"
      ? "Stickers & prints in the studio"
      : "New titles in the works";
  }
  const available = items.filter((product) => product.status === "available").length;
  const comingSoon = items.length - available;
  const titleWord = items.length === 1 ? "title" : "titles";
  if (available === 0) return `${items.length} ${titleWord} coming soon`;
  if (comingSoon === 0) return `${items.length} ${titleWord} available`;
  return `${items.length} ${titleWord} · ${available} available`;
}

/** Card CTA label per collection. */
export function collectionLinkLabel(collection: CatalogCollection): string {
  return collection.id === "artwork-and-gifts"
    ? "Peek at artwork & gifts"
    : `Browse ${collection.title.toLowerCase()}`;
}
