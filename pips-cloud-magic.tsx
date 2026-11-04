import { createFileRoute, Link } from "@tanstack/react-router";

import { ArtworkFrame } from "~/components/ArtworkFrame";
import { CatalogProductCard } from "~/components/CatalogProductCard";
import { Container } from "~/components/Container";
import { CloudDoodle, SparkleDoodle, SquiggleDoodle } from "~/components/doodles";
import { SectionHeading } from "~/components/SectionHeading";
import { StatusBadge } from "~/components/StatusBadge";
import {
  assetSrc,
  getCollection,
  pipArtwork,
  pipHeroArt,
  productsInCollection,
} from "~/data/catalog";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/pips-cloud-magic")({
  head: () =>
    pageMeta(
      "Pip's Cloud Magic",
      "Meet Pip, a small fluffy lavender cloud-sprite, and Cloudmeadow, his whimsical home. Pip's Cloud Magic Coloring Book (ages 3–8) and the companion storybook Pip and the Upside-Down Rain are coming soon.",
    ),
  component: PipsCloudMagic,
});

/**
 * The Pip's Cloud Magic titles, pulled from the catalog: the coloring book and
 * the companion storybook (the two Pip's Cloud Magic collection-linked
 * collections). Future Pip titles added to these collections appear here
 * automatically.
 */
const PIPS_BOOKS = [
  getCollection("coloring-books"),
  getCollection("storybooks"),
].flatMap((collection) =>
  collection
    ? productsInCollection(collection.id).map((product) => ({ collection, product }))
    : [],
);

function PipsCloudMagic() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      {/* Hero — meet Pip */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-lavender/40 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-8 py-12 sm:gap-10 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
              Featured Collection
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Pip's Cloud Magic
              </h1>
              <StatusBadge tone="comingSoon" size="lg" />
            </div>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/85 sm:text-lg">
              Pip is a small, fluffy lavender cloud-sprite with a curl of fluff on his head, big
              expressive eyes, tiny arms, and rosy cheeks. Wherever he floats, a little gentle
              magic follows.
            </p>
            <p className="mt-4 leading-relaxed text-ink/85">
              His stories celebrate friendship, kindness, and the quiet everyday wonders of his
              sky-high home — cozy tales made for reading (and coloring!) together.
            </p>
          </div>
          <ArtworkFrame
            src={assetSrc(pipHeroArt.asset)}
            alt={pipHeroArt.alt}
            ratio="portrait"
            icon={pipHeroArt.icon}
            tone="lavender"
            label={pipHeroArt.label}
            loading="eager"
            className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:max-w-none"
          />
        </Container>
      </div>

      {/* Cloudmeadow */}
      <Container className="pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-lavender-soft/60 p-6 sm:p-12">
          <CloudDoodle
            className="absolute -right-4 -top-4 h-14 w-20 animate-drift text-lavender/60"
            aria-hidden="true"
          />
          <CloudDoodle
            className="absolute bottom-4 left-6 h-8 w-12 text-lavender/40"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
              His Home
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Welcome to Cloudmeadow
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              Cloudmeadow is Pip's whimsical world — a soft sky realm of drifting clouds, gentle
              breezes, and kind-hearted friends. It's a place where small acts of kindness bloom
              into gentle magic, and every day brings a new little adventure.
            </p>
            <SquiggleDoodle className="mt-6 h-4 w-28 text-lavender-deep" aria-hidden="true" />
          </div>
        </div>
      </Container>

      {/* Books in this collection — separate catalog-driven product cards, each linking to its own detail page */}
      <Container className="pb-12 sm:pb-16">
        <SectionHeading
          eyebrow="In This Collection"
          title="Books from Cloudmeadow"
          intro="Two cozy titles are on their way from Pip's world — each with its own page, its true status, and a reserved Amazon spot for launch day."
        />
        {/* Two titles today — a matched pair, centred on wide screens. */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mx-auto lg:max-w-4xl">
          {PIPS_BOOKS.map(({ collection, product }) => (
            <CatalogProductCard key={product.id} collection={collection} product={product} />
          ))}
        </div>
      </Container>

      {/* Official-asset gallery */}
      <Container className="pb-16 sm:pb-24">
        <SectionHeading
          eyebrow="Official Artwork"
          title="A Peek Behind the Clouds"
          intro="Official cover art, character sheets, and sample pages will be framed here as soon as they're ready — no stand-ins, only the real thing."
        />
        {/* Two-up on a phone so the reserved frames read as a gallery of small
            printed plates rather than four full-width empty boxes. */}
        <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {/* Frames and filenames come from `pipArtwork` in src/data/catalog.ts —
              each shows the owner's official art once its asset path is set. */}
          {pipArtwork.map((slot) => (
            <ArtworkFrame
              key={slot.id}
              src={assetSrc(slot.asset)}
              alt={slot.alt}
              ratio="portrait"
              icon={slot.icon}
              tone="lavender"
              label={slot.label}
            />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-soft">
          Excited to meet Pip?{" "}
          <Link
            to="/contact"
            className="font-bold text-ink underline decoration-gold underline-offset-4 hover:decoration-ink"
          >
            Join the newsletter list
          </Link>{" "}
          — it opens soon.
        </p>
      </Container>
    </main>
  );
}
