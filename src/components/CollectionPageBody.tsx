import { notFound } from "@tanstack/react-router";

import { CatalogProductCard } from "./CatalogProductCard";
import { CollectionIcon } from "./CollectionIcon";
import { Container } from "./Container";
import { SparkleDoodle } from "./doodles";
import { StatusBadge } from "./StatusBadge";
import { COLLECTION_ACCENTS } from "./collectionStyles";
import {
  collectionBadgeTone,
  collectionCountLabel,
  getCollection,
  productsInCollection,
} from "~/data/catalog";
import type { CollectionId } from "~/data/catalog";

/**
 * Shared body for every /books/<collection> page, rendered entirely from the
 * catalog: intro with honest status, catalog product cards, and an honest
 * empty state while a collection has no titles yet. Adding products in
 * src/data/catalog.ts updates this page automatically.
 */
export function CollectionPageBody({ collectionId }: { collectionId: CollectionId }) {
  const collection = getCollection(collectionId);
  if (!collection) throw notFound();
  const items = productsInCollection(collection.id);
  const accent = COLLECTION_ACCENTS[collection.accent];

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      {/* Collection intro */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl ${accent.blobA}`} />
          <div className={`absolute -left-16 top-16 h-56 w-56 rounded-full blur-3xl ${accent.blobB}`} />
        </div>
        <Container className="relative py-12 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
              Collections
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                {collection.title}
              </h1>
              <StatusBadge tone={collectionBadgeTone(collection)} size="lg" />
            </div>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/85 sm:text-lg">
              {collection.blurb}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink-soft shadow-soft">
              <CollectionIcon icon={collection.icon} className="h-4 w-5" />
              {collectionCountLabel(collection)}
            </p>
          </div>
        </Container>
      </div>

      {/* Catalog-driven product cards */}
      {items.length > 0 ? (
        <Container className="pb-12 sm:pb-16">
          {/* Heading for the product list: the cards use h3, so this h2 keeps the
              heading order 1 → 2 → 3 instead of jumping from the h1 to an h3. */}
          <h2 className="sr-only">Titles in {collection.title}</h2>
          {/* Column count follows the catalog: a lone title is centred rather than
              stranded in a third of the row, two titles sit as a pair. */}
          <div
            className={`grid gap-5 sm:gap-6 ${
              items.length === 1
                ? "mx-auto max-w-[22rem]"
                : items.length === 2
                  ? "sm:grid-cols-2 lg:mx-auto lg:max-w-4xl"
                  : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {items.map((product) => (
              <CatalogProductCard key={product.id} collection={collection} product={product} />
            ))}
          </div>
        </Container>
      ) : (
        /* Honest empty state while a collection has no titles yet */
        <Container className="pb-12 sm:pb-16">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-ink/10 bg-cream-deep/50 p-8 text-center shadow-soft sm:p-12">
            <span className={`flex h-16 w-16 items-center justify-center rounded-full shadow-soft ${accent.chip}`}>
              <CollectionIcon icon={collection.icon} className="h-7 w-7" />
            </span>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              New titles are in the works — check back soon
            </h2>
            <p className="max-w-xl leading-relaxed text-ink/85">
              Every new title is announced on this page with its real status the moment it joins
              the collection — nothing appears here before it's confirmed.
            </p>
          </div>
        </Container>
      )}

      {/* Honest-status note */}
      <Container className="pb-16 sm:pb-24">
        <p
          className={`mx-auto max-w-2xl rounded-2xl px-6 py-4 text-center text-sm leading-relaxed text-ink/85 ${accent.note}`}
        >
          <strong className="font-bold">How to read this page:</strong> a “Coming Soon” badge
          means the book hasn't been published yet. A title moves to “Available on Amazon” only
          once publication is confirmed — so what you see here is always the truth.
        </p>
      </Container>
    </main>
  );
}
