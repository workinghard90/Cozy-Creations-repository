import type { ReactNode } from "react";

import { BookDoodle, CloudDoodle, GiftDoodle, SparkleDoodle, StarDoodle } from "./doodles";

type Ratio = "portrait" | "landscape" | "square";
type Icon = "cloud" | "book" | "sparkle" | "star" | "gift";
type Tone = "brand" | "lavender";

/** Exported for ArtworkFrame (same frame geometry whether art is present or not). */
export type ArtRatio = Ratio;
export type ArtIcon = Icon;
export type ArtTone = Tone;

const RATIO_CLASSES: Record<Ratio, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/**
 * Doodle sizes are tuned for the 44px medallion. Icons are purely decorative
 * brand ornaments — never a stand-in for the owner's artwork.
 */
const ICONS: Record<Icon, ReactNode> = {
  cloud: <CloudDoodle className="h-5 w-7" aria-hidden="true" />,
  book: <BookDoodle className="h-5 w-5" aria-hidden="true" />,
  sparkle: <SparkleDoodle className="h-5 w-5" aria-hidden="true" />,
  star: <StarDoodle className="h-5 w-5" aria-hidden="true" />,
  gift: <GiftDoodle className="h-5 w-5" aria-hidden="true" />,
};

/**
 * Per-context treatment. "brand" is the vintage red / antique gold wash used
 * site-wide; "lavender" is reserved for Pip's Cloud Magic frames.
 *
 * The placeholder is styled as a printed book jacket at rest: a tonal board,
 * a cream inner plate with an antique-gold hairline, a spine shadow on the
 * left edge, and a serif title line. The caption always states plainly that
 * the official art has not arrived yet — nothing here pretends to be art.
 */
const TONES: Record<
  Tone,
  { board: string; medallion: string; rule: string; glow: string; spine: string }
> = {
  brand: {
    board: "bg-gradient-to-br from-red-soft via-gold-soft/80 to-cream-deep",
    medallion: "border-gold/60 text-red",
    rule: "bg-gold/60",
    glow: "bg-gold/25",
    spine: "from-ink/15",
  },
  lavender: {
    board: "bg-gradient-to-br from-lavender-soft via-lavender-soft/70 to-gold-soft/70",
    medallion: "border-lavender-deep/45 text-lavender-deep",
    rule: "bg-lavender-deep/45",
    glow: "bg-lavender/35",
    spine: "from-lavender-deep/25",
  },
};

/**
 * An elegant, clearly-labelled placeholder for official artwork — styled as a
 * designed cover slot rather than an empty wireframe. Used everywhere a real
 * cover, illustration, or character sheet will live once the owner supplies
 * official assets; no stand-in art is ever drawn or substituted.
 *
 * The outer box is driven by `ratio`, so a real image dropped in later (see
 * ArtworkFrame) occupies exactly the same space — no layout shift.
 */
export function ArtPlaceholder({
  label,
  title,
  ratio = "landscape",
  icon = "sparkle",
  tone = "brand",
  className = "",
}: {
  /** Honest caption: says clearly that the official art is still coming. */
  label: string;
  /** Optional known title (e.g. a book title) shown as the cover's line. */
  title?: string;
  ratio?: Ratio;
  icon?: Icon;
  tone?: Tone;
  className?: string;
}) {
  const toneStyle = TONES[tone];
  return (
    <figure
      className={`relative flex ${RATIO_CLASSES[ratio]} overflow-hidden rounded-2xl p-[7px] shadow-soft ring-1 ring-ink/10 ${toneStyle.board} ${className}`}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-white via-cream to-cream-deep/70 px-3 py-4 text-center">
        {/* Book spine — a quiet printed-object detail, not decoration for its own sake */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r to-transparent ${toneStyle.spine}`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full blur-2xl ${toneStyle.glow}`}
        />
        <SparkleDoodle
          className="pointer-events-none absolute right-3 top-3 h-3 w-3 text-gold/80"
          aria-hidden="true"
        />

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white/90 shadow-soft ${toneStyle.medallion}`}
        >
          {ICONS[icon]}
        </span>

        {title ? (
          <p className="mt-3 max-w-[14rem] font-display text-[0.95rem] font-semibold leading-snug text-ink">
            {title}
          </p>
        ) : null}

        <span aria-hidden="true" className={`mt-3 h-px w-8 ${toneStyle.rule}`} />

        <figcaption className="mt-2.5 max-w-[15rem] text-[0.7rem] font-bold leading-snug text-ink-soft">
          {label}
        </figcaption>
      </div>
    </figure>
  );
}
