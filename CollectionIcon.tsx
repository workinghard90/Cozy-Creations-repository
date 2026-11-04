import type { CollectionIconKey } from "~/data/catalog";
import { BookDoodle, CloudDoodle, GiftDoodle, SparkleDoodle, StarDoodle, WrenchDoodle } from "./doodles";

/** Default doodle sizing per icon key (overridable via className). */
const DEFAULT_CLASS: Record<CollectionIconKey, string> = {
  cloud: "h-6 w-9",
  book: "h-6 w-6",
  wrench: "h-6 w-6",
  sparkle: "h-6 w-6",
  star: "h-6 w-6",
  gift: "h-6 w-6",
};

const DOODLES: Record<CollectionIconKey, typeof CloudDoodle> = {
  cloud: CloudDoodle,
  book: BookDoodle,
  wrench: WrenchDoodle,
  sparkle: SparkleDoodle,
  star: StarDoodle,
  gift: GiftDoodle,
};

/**
 * Renders a catalog collection's icon key as its decorative doodle.
 * Pure decoration — always aria-hidden, conveys no information.
 */
export function CollectionIcon({
  icon,
  className,
}: {
  icon: CollectionIconKey;
  className?: string;
}) {
  const Doodle = DOODLES[icon];
  return <Doodle className={className ?? DEFAULT_CLASS[icon]} aria-hidden="true" />;
}
