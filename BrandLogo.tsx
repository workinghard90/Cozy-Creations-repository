import { Link } from "@tanstack/react-router";

/**
 * Brand logo lockup for the sticky header: official emblem + wordmark.
 *
 * EMBLEM DROP-IN (owner-supplied artwork only — never redraw, substitute,
 * or AI-generate it):
 *   1. Save the owner's color emblem as  src/assets/brand/emblem-color.png
 *      (a copy also lives at /home/team/shared/brand/emblem-color.png).
 *   2. Rebuild (`bun run publish`). That is the entire toggle — the Vite asset
 *      import below resolves automatically once the file exists, and the
 *      lockup switches from wordmark-only to emblem + wordmark.
 *   Expected artwork: a female mechanic holding a wrench inside a circular
 *   emblem with crossed-wrench details, in the brand palette (deep vintage
 *   red, warm cream, charcoal, antique gold).
 *
 * The grayscale version (src/assets/brand/emblem-grayscale.png) is for PRINT
 * collateral only — it must never be imported or rendered on the site.
 */

// Resolves at build time; yields {} (wordmark-only) until the file exists.
// The header renders the emblem at most 56 px, so it prefers the smaller web
// copy of the owner's exact artwork (emblem-color-web.png — a downscaled,
// palette-optimised copy) and falls back to the full-resolution original.
// Neither file is redrawn: both are the owner's supplied emblem.
const EMBLEM_MODULES = import.meta.glob<string>("/src/assets/brand/emblem-color-web.png", {
  eager: true,
  import: "default",
});
const emblemUrl: string | undefined =
  EMBLEM_MODULES["/src/assets/brand/emblem-color-web.png"];

export function BrandLogo() {
  return (
    <Link
      to="/"
      className="flex min-w-0 items-center gap-1.5 rounded-full py-1 pr-1 sm:gap-2 sm:pr-2"
    >
      {emblemUrl ? (
        <img
          src={emblemUrl}
          alt="Cozy Creations by Autumn™ emblem"
          width={56}
          height={56}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
        />
      ) : null}
      <span
        className={`whitespace-nowrap font-display font-semibold leading-none text-ink ${
          emblemUrl ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-lg"
        }`}
      >
        Cozy Creations by Autumn™
      </span>
    </Link>
  );
}
