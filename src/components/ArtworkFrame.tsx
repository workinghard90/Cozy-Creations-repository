import { ArtPlaceholder } from "./ArtPlaceholder";
import type { ArtIcon, ArtRatio, ArtTone } from "./ArtPlaceholder";

/** Frame geometry shared by the real-art and placeholder states, so swapping one
 *  for the other never shifts the layout (the box is reserved by aspect-ratio). */
const RATIO_CLASSES: Record<ArtRatio, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/**
 * One artwork slot that renders EITHER the owner's official art OR the honest
 * labelled placeholder — never a substitute, never generated art.
 *
 * `src` is a public-directory path (e.g. "/covers/<slug>.png"), already passed
 * through `assetSrc()` in src/data/catalog.ts, so it resolves identically in
 * `vite dev` and in the `bun run publish` production build (files in `public/`
 * are copied verbatim to the web root; files under `src/` would need bundling
 * and a raw string path would 404 in production).
 *
 * Both states share the same rounded-2xl, ring, shadow and aspect box, so a
 * real cover simply replaces the placeholder plate in place.
 */
export function ArtworkFrame({
  src,
  alt,
  ratio = "portrait",
  icon = "sparkle",
  tone = "brand",
  label,
  title,
  className = "",
  loading = "lazy",
}: {
  /** Resolved public URL of the official art, or undefined until it is supplied. */
  src?: string;
  /** Accessible description of the official art (required when `src` is set). */
  alt?: string;
  ratio?: ArtRatio;
  icon?: ArtIcon;
  tone?: ArtTone;
  /** Honest placeholder caption, shown only while no official art exists. */
  label: string;
  /** Optional known title (book title) printed inside the placeholder plate. */
  title?: string;
  /** Outer sizing/positioning classes, e.g. "mx-auto w-full max-w-sm". */
  className?: string;
  loading?: "lazy" | "eager";
}) {
  if (!src) {
    return (
      <ArtPlaceholder
        ratio={ratio}
        icon={icon}
        tone={tone}
        label={label}
        title={title}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? label}
      loading={loading}
      decoding="async"
      className={`${RATIO_CLASSES[ratio]} w-full rounded-2xl object-contain bg-white shadow-soft ring-1 ring-ink/10 ${className}`}
    />
  );
}
