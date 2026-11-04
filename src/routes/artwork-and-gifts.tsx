import { createFileRoute } from "@tanstack/react-router";

import { ArtPlaceholder } from "~/components/ArtPlaceholder";
import { Container } from "~/components/Container";
import { GiftDoodle, SparkleDoodle } from "~/components/doodles";
import { StatusBadge } from "~/components/StatusBadge";
import { pageMeta } from "~/lib/seo";

const GALLERY = [
  {
    title: "Stickers",
    description:
      "Peel-and-stick cheer for laptops, water bottles, and notebooks — little clouds, stars, and cozy friends.",
    icon: "sparkle" as const,
  },
  {
    title: "Art Prints",
    description:
      "Soft, whimsical prints to warm up nurseries, desks, and reading nooks.",
    icon: "star" as const,
  },
  {
    title: "Coloring Downloads",
    description:
      "Printable coloring pages starring familiar friends — cozy afternoons at home, ready whenever you are.",
    icon: "book" as const,
  },
  {
    title: "Future Creations",
    description:
      "More creative products are bubbling in the studio — the shelf grows as the ideas do.",
    icon: "gift" as const,
  },
] as const;

export const Route = createFileRoute("/artwork-and-gifts")({
  head: () =>
    pageMeta(
      "Artwork & Gifts",
      "Stickers, art prints, and coloring downloads from Cozy Creations by Autumn™ — a cozy gallery in the making. Nothing is on sale yet; this page previews what's coming.",
    ),
  component: ArtworkAndGifts,
});

function ArtworkAndGifts() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      {/* Intro */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-red/30 blur-3xl" />
          <div className="absolute -right-16 top-20 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
        </div>
        <Container className="relative py-12 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
              A Cozy Gallery in the Making
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Artwork &amp; Gifts
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/85">
              A little gallery of cheerful extras — stickers, prints, and printable coloring
              pages inspired by our cozy worlds. This page is a preview of what's being made:
              nothing is priced or on sale yet, and every piece appears here with real details
              once it's ready.
            </p>
          </div>
        </Container>
      </div>

      {/* Placeholder gallery grid */}
      <Container className="pb-12 sm:pb-16">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {GALLERY.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-5"
            >
              <ArtPlaceholder
                ratio="square"
                icon={item.icon}
                label={`${item.title} coming soon`}
                className="mx-auto w-full max-w-[11rem] sm:max-w-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-xl font-semibold leading-snug text-ink">
                  {item.title}
                </h2>
                <StatusBadge tone="comingSoon" />
              </div>
              <p className="text-base leading-relaxed text-ink/85 sm:text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>

      {/* Honest note */}
      <Container className="pb-16 sm:pb-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl bg-gold-soft/60 px-6 py-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold shadow-soft">
            <GiftDoodle className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-ink/85">
            <strong className="font-bold">Nothing on this page is for sale yet.</strong> Prices
            and availability appear only when a product launches — until then, each card is a
            friendly preview, not a promise.
          </p>
        </div>
      </Container>
    </main>
  );
}
