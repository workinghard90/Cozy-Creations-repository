import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { StatusBadge } from "./StatusBadge";
import type { BadgeTone } from "./StatusBadge";

type Accent = "lavender" | "gold" | "red";

/**
 * Per-collection accent styling. Lavender belongs to Pip's Cloud Magic only;
 * everywhere else uses the primary brand palette (antique gold, soft vintage red).
 */
const ACCENTS: Record<Accent, { chip: string; cta: string }> = {
  lavender: {
    chip: "bg-lavender-soft text-lavender-deep",
    cta: "border-lavender-deep/40 bg-lavender-soft text-ink hover:bg-lavender hover:border-lavender-deep/60",
  },
  gold: {
    chip: "bg-gold-soft text-ink",
    cta: "border-gold/50 bg-gold-soft/60 text-ink hover:bg-gold-soft hover:border-gold",
  },
  red: {
    chip: "bg-red-soft text-red",
    cta: "border-red/30 bg-red-soft/60 text-ink hover:bg-red-soft hover:border-red/50",
  },
};

/**
 * Rounded product-style card with icon chip, honest status badge, and link.
 *
 * Layout rules that keep a row of cards looking deliberate:
 *  - the icon/badge row has a fixed min height, so every title starts on the
 *    same baseline no matter which badge a card carries;
 *  - the summary sits above a flexible spacer and the CTA is pinned with
 *    `mt-auto`, so CTA rows line up across a row of unequal descriptions;
 *  - `h-full` + grid stretch means side-by-side cards are the same height.
 */
export function ProductCard({
  title,
  description,
  badgeTone = "comingSoon",
  badgeLabel,
  accent = "lavender",
  icon,
  href,
  linkLabel,
  children,
}: {
  title: string;
  description: string;
  badgeTone?: BadgeTone;
  badgeLabel?: string;
  accent?: Accent;
  icon?: ReactNode;
  href: string;
  linkLabel: string;
  children?: ReactNode;
}) {
  const accentStyle = ACCENTS[accent];
  return (
    <article className="flex h-full flex-col gap-3 rounded-3xl border border-ink/10 bg-white p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-6">
      <div className="flex min-h-12 items-start justify-between gap-3">
        {icon ? (
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accentStyle.chip}`}
          >
            {icon}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <StatusBadge tone={badgeTone} label={badgeLabel} className="mt-1 shrink-0" />
      </div>
      <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {title}
      </h3>
      <p className="text-[0.95rem] leading-relaxed text-ink/85">{description}</p>
      {children ? <div className="text-sm">{children}</div> : null}
      <Link
        to={href}
        className={`mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-full border px-5 py-2.5 text-sm font-bold transition-colors active:translate-y-px ${accentStyle.cta}`}
      >
        {linkLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
