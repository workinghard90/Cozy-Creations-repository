const BRAND = "Cozy Creations by Autumn™";

/**
 * Per-page <head> metadata (title + description + basic Open Graph tags).
 * Used inside each route's `head` option so every page has unique,
 * search-friendly titles and descriptions.
 */
export function pageMeta(title: string, description: string) {
  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BRAND },
    ],
  };
}
