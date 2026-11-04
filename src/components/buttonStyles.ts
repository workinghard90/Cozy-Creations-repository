/**
 * Shared button/link styling — one place for height, padding, radius, and
 * hover / active / focus states, so every CTA on the site matches.
 *
 * All variants carry `min-h-11` (44px) so every tap target clears the mobile
 * accessibility minimum, and `focus-visible:outline-*` overrides for use on
 * dark surfaces (the global ring is charcoal, which vanishes on deep red).
 * The global `:focus-visible` ring in src/styles/app.css covers light surfaces.
 */

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-bold " +
  "transition-[background-color,border-color,color,box-shadow] duration-200 " +
  "active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2";

const VARIANTS = {
  /** Primary action — deep vintage red. */
  primary: `${BASE} bg-red text-cream shadow-soft hover:bg-red-deep focus-visible:outline-ink`,
  /** Secondary action — white card with charcoal edge. */
  secondary: `${BASE} border-2 border-ink/15 bg-white text-ink shadow-soft hover:border-gold hover:bg-gold-soft/50 focus-visible:outline-ink`,
  /** Quiet third-level action — text only, gold underline on hover. */
  quiet: `${BASE} px-2 text-ink underline decoration-gold/70 underline-offset-4 hover:decoration-ink`,
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

const SIZES = {
  /** Large — hero and headline actions. */
  lg: "px-7 py-3 text-base",
  /** Default — in-card actions. */
  md: "px-6 py-2.5 text-sm",
} as const;

export type ButtonSize = keyof typeof SIZES;

/** Compose a button/link class string. */
export function button(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return `${VARIANTS[variant]} ${SIZES[size]}${extra ? ` ${extra}` : ""}`;
}

/**
 * The same shape for a *disabled* action (e.g. the reserved Amazon button):
 * visibly inert, never clickable, still 44px tall.
 */
export const DISABLED_BUTTON =
  "inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full " +
  "bg-ink/12 px-7 py-3 text-base font-bold text-ink/75";
