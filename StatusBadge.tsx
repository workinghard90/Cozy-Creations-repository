import { CloudDoodle, SparkleDoodle } from "./doodles";

export type BadgeTone = "comingSoon" | "published" | "studio";

const TONES: Record<BadgeTone, { fallbackLabel: string; className: string }> = {
  comingSoon: {
    fallbackLabel: "Coming Soon",
    // Antique-gold tint — warm anticipation in the primary brand palette.
    className: "border-gold bg-gold-soft text-ink",
  },
  published: {
    fallbackLabel: "Available on Amazon",
    // Solid deep vintage red — the brand's confident, live state.
    className: "border-red-deep bg-red-deep text-cream",
  },
  studio: {
    fallbackLabel: "In the Studio",
    // Soft vintage-red wash — work in progress.
    className: "border-red bg-red-soft text-ink",
  },
};

/**
 * Honest status pill used on every product. Publication status is always
 * explicit: nothing claims to be available unless the owner confirms it.
 */
export function StatusBadge({
  tone = "comingSoon",
  label,
  size = "sm",
  className = "",
}: {
  tone?: BadgeTone;
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const toneStyle = TONES[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wide ${toneStyle.className} ${
        size === "lg" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs"
      } ${className}`}
    >
      {tone === "comingSoon" && <CloudDoodle className="h-2.5 w-4" aria-hidden="true" />}
      {tone === "studio" && <SparkleDoodle className="h-3 w-3" aria-hidden="true" />}
      {tone === "published" && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
      {label ?? toneStyle.fallbackLabel}
    </span>
  );
}
