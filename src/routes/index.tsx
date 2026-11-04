import { createFileRoute, Link } from "@tanstack/react-router";

import { ArtworkFrame } from "~/components/ArtworkFrame";
import { button } from "~/components/buttonStyles";
import { CloudDoodle, SparkleDoodle } from "~/components/doodles";
import { CollectionIcon } from "~/components/CollectionIcon";
import { Container } from "~/components/Container";
import { ProductCard } from "~/components/ProductCard";
import { SectionHeading } from "~/components/SectionHeading";
import { SocialInviteSection } from "~/components/SocialLinks";
import { StatusBadge } from "~/components/StatusBadge";
import {
  assetSrc,
  collectionBadgeTone,
  collectionCountLabel,
  collectionHref,
  collectionLinkLabel,
  collections,
  products,
} from "~/data/catalog";
import { pageMeta } from "~/lib/seo";

/** The featured title whose official cover fronts the homepage block, if supplied. */
const FEATURED_TITLE = products.find((product) => product.featured);
const FEATURED_COVER = assetSrc(FEATURED_TITLE?.coverAsset);

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Cozy Creations by Autumn™ — A Little Magic in Every Creation.",
      "Cozy Creations by Autumn™ is an independent creative brand by Melody Autumn Hall — original children's coloring books and storybooks, practical logbooks, artwork, and gifts. Meet Pip's Cloud Magic.",
    ),
  component: Home,
});

function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red/20 blur-3xl" />
          <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-red/30 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
          <CloudDoodle className="absolute left-8 top-20 hidden h-8 w-12 animate-drift text-lavender/70 sm:block" />
          <SparkleDoodle className="absolute right-10 top-40 hidden h-5 w-5 text-gold/70 sm:block" />
          <SparkleDoodle className="absolute bottom-16 right-1/4 h-3 w-3 text-red/80" />
        </div>
        <Container className="relative flex flex-col items-center py-14 text-center sm:py-20 lg:py-24">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/50 bg-white/70 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-soft sm:text-xs sm:tracking-[0.2em]">
            <SparkleDoodle className="h-3 w-3 shrink-0 text-gold" aria-hidden="true" />
            Independent Creative Brand
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] text-ink sm:mt-6 sm:text-5xl lg:text-6xl">
            Cozy Creations by Autumn™
          </h1>
          <p className="mt-4 font-display text-xl font-semibold italic text-red sm:text-2xl">
            A Little Magic in Every Creation.
          </p>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink/85 sm:mt-6 sm:text-lg">
            Welcome in! We make original children's coloring books and storybooks, practical
            everyday logbooks, and cheerful artwork — cozy creations designed with care to
            brighten your home.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <Link to="/pips-cloud-magic" className={button("primary", "lg", "w-full sm:w-auto")}>
              <SparkleDoodle className="h-4 w-4 text-gold" aria-hidden="true" />
              Explore Pip's Cloud Magic
            </Link>
            <a
              href="#collections"
              className={button("secondary", "lg", "w-full sm:w-auto")}
            >
              Browse the Collections
            </a>
          </div>
        </Container>
      </div>

      {/* Featured collection */}
      <Container className="pb-12 pt-2 sm:pb-16 sm:pt-4">
        <div className="grid items-center gap-8 rounded-3xl border border-lavender/40 bg-white p-5 shadow-soft sm:gap-10 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-10">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
              Featured Collection
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Pip's Cloud Magic
              </h2>
              <StatusBadge tone="comingSoon" />
            </div>
            <p className="mt-4 text-pretty leading-relaxed text-ink/85 sm:text-lg">
              Meet Pip — a small, fluffy lavender cloud-sprite with a curl of fluff on his head,
              big expressive eyes, and rosy cheeks. He lives in Cloudmeadow, a whimsical world
              of friendship, kindness, and gentle magic.
            </p>
            <p className="mt-3 leading-relaxed text-ink/85">
              Explore the official cover and preview coloring pages while we prepare for publication.
            </p>
            <Link
              to="/pips-cloud-magic"
              className={button("primary", "md", "mt-6 w-full sm:w-auto")}
            >
              Meet Pip &amp; Cloudmeadow
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          {/* The featured title's official cover once supplied; honest frame until then */}
          <ArtworkFrame
            src={FEATURED_COVER}
            alt={`Cover of ${FEATURED_TITLE?.title ?? "Pip's Cloud Magic Coloring Book"}`}
            ratio="portrait"
            icon="cloud"
            tone="lavender"
            label="Official cover coming soon"
            title={FEATURED_TITLE?.title}
            loading="eager"
            className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:mx-0 lg:max-w-none"
          />
        </div>
      </Container>

      {/* Collections grid — rendered from src/data/catalog.ts so it grows automatically */}
      <Container id="collections" className="scroll-mt-24 pb-14 sm:pb-16">
        <SectionHeading
          eyebrow="Collections"
          title="What You'll Find Here"
          intro="Five cozy shelves of creations — each one clearly labeled, so you always know what's available now and what's still on its way."
        />
        {/* Three cards on the first row, two wider cards on the second — a
            deliberate 3 + 2 composition rather than a ragged 3 + 2 grid. */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`h-full ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${
                index === collections.length - 1 && collections.length % 2 === 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <ProductCard
                title={collection.title}
                description={collection.blurb}
                accent={collection.accent}
                badgeTone={collectionBadgeTone(collection)}
                icon={<CollectionIcon icon={collection.icon} />}
                href={collectionHref(collection)}
                linkLabel={collectionLinkLabel(collection)}
              >
                {/* Computed title count — updates automatically as the catalog grows */}
                <p className="font-semibold text-ink-soft">{collectionCountLabel(collection)}</p>
              </ProductCard>
            </div>
          ))}
        </div>
      </Container>

      {/* From the founder */}
      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <div className="rounded-3xl border border-gold/30 bg-gold-soft/70 px-5 py-9 text-center sm:px-10 sm:py-12">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
            From the Founder
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty font-display text-lg leading-relaxed text-ink sm:text-xl">
            Cozy Creations by Autumn™ is the independent creative brand founded by Melody Autumn
            Hall — imaginative children's experiences and useful everyday products, made with
            care, creativity, and thoughtful design.
          </p>
          <Link to="/about" className={button("primary", "md", "mt-6 w-full sm:w-auto")}>
            Read the brand story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>

      {/* Official social profiles — links only, no feeds or platform scripts */}
      <SocialInviteSection />
    </main>
  );
}
