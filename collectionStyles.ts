import type { CollectionAccent } from "~/data/catalog";

/**
 * Shared per-collection accent classes, keyed off the catalog's accent field.
 * Lavender appears only for the two Pip's Cloud Magic collection-linked
 * accents (coloring-books, storybooks); every other collection uses the
 * primary brand palette (antique gold, soft vintage red).
 */
export interface CollectionAccentStyle {
  /** Decorative blur blobs behind a page intro. */
  blobA: string;
  blobB: string;
  /** Small icon chip background. */
  chip: string;
  /** Tinted note panel background. */
  note: string;
}

export const COLLECTION_ACCENTS: Record<CollectionAccent, CollectionAccentStyle> = {
  lavender: {
    blobA: "bg-lavender/40",
    blobB: "bg-gold/25",
    chip: "bg-lavender-soft text-lavender-deep",
    note: "bg-lavender-soft/60",
  },
  gold: {
    blobA: "bg-gold/30",
    blobB: "bg-red/20",
    chip: "bg-gold-soft text-ink",
    note: "bg-gold-soft/60",
  },
  red: {
    blobA: "bg-red/20",
    blobB: "bg-gold/25",
    chip: "bg-red-soft text-red",
    note: "bg-red-soft/60",
  },
};
