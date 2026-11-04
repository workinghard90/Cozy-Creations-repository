import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ArtworkFrame } from "~/components/ArtworkFrame";
import { BrandedNotFound } from "~/components/BrandedNotFound";
import { Container } from "~/components/Container";
import { CartDoodle, SparkleDoodle } from "~/components/doodles";
import { button } from "~/components/buttonStyles";
import { ReservedAmazonButton } from "~/components/ReservedAmazonButton";
import { StatusBadge } from "~/components/StatusBadge";
import { COLLECTION_ACCENTS } from "~/components/collectionStyles";
import { assetSrc, collectionHref, getCatalogEntry, statusBadgeTone } from "~/data/catalog";
import { pageMeta } from "~/lib/seo";

/**
 * THE product detail route — one dynamic route serves every product in the
 * catalog, so future titles need no new page files. Unknown slugs (or a
 * product that doesn't belong to the collection in the URL) render the
 * branded 404.
 */
export const Route = createFileRoute("/books/$collection/$product")({
  head: ({ params }) => {
    const entry = getCatalogEntry(params.collection, params.product);
    if (!entry) {
      return { meta: [{ title: "Not found | Cozy Creations by Autumn™" }] };
    }
    const { product } = entry;
    const specSummary = product.specs?.length ? ` ${product.specs.join(" · ")}.` : "";
    return pageMeta(
      product.title,
      `${product.description}${specSummary} From Cozy Creations by Autumn™ — coming soon.`,
    );
  },
  loader: ({ params }) => {
    // Gate the route during SSR: unknown collection/product slugs render the
    // branded 404 before any HTML streams. The component re-resolves the same
    // catalog entry from params (a cheap pure lookup).
    if (!getCatalogEntry(params.collection, params.product)) throw notFound();
    return { ok: true };
  },
  component: ProductDetailPage,
  notFoundComponent: BrandedNotFound,
});

function ProductDetailPage() {
  const { collection: collectionSlug, product: productSlug } = Route.useParams();
  // Gate the route: unknown collection/product slugs render the branded 404.
  const entry = getCatalogEntry(collectionSlug, productSlug);
  if (!entry) throw notFound();
  const { collection, product } = entry;
  const accent = COLLECTION_ACCENTS[collection.accent];

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Container className="pt-5 sm:pt-6">
        {/* Breadcrumb: Home / Books / <Collection> */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-1.5 text-sm text-ink-soft">
            <li>
              <Link
                to="/"
                className="inline-flex min-h-11 items-center rounded-lg px-1 font-semibold transition-colors hover:text-ink hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-ink/40">
              /
            </li>
            <li className="px-1">Books</li>
            <li aria-hidden="true" className="text-ink/40">
              /
            </li>
            <li>
              <Link
                to={collectionHref(collection)}
                className="inline-flex min-h-11 items-center rounded-lg px-1 font-semibold transition-colors hover:text-ink hover:underline"
              >
                {collection.title}
              </Link>
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="pb-16 pt-6 sm:pb-24 sm:pt-8">
        <article className="grid items-center gap-8 rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:gap-10 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-10">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
              {collection.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {product.title}
              </h1>
              <StatusBadge tone={statusBadgeTone(product.status)} size="lg" />
            </div>
            <p className="mt-4 text-pretty leading-relaxed text-ink/85">{product.description}</p>

            {product.specs?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className={`rounded-full px-4 py-2 text-sm font-semibold text-ink ${accent.chip}`}
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8">
              {product.amazonUrl ? (
                /* Rendered only once a verified Amazon URL exists in the catalog. */
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={button("primary", "lg")}
                >
                  <CartDoodle className="h-5 w-5" aria-hidden="true" />
                  Buy on Amazon
                </a>
              ) : (
                <ReservedAmazonButton note="Amazon link coming soon" />
              )}
            </div>

            <div className="mt-8">
              <Link
                to={collectionHref(collection)}
                className={button("secondary", "md")}
              >
                <span aria-hidden="true">←</span> Back to {collection.title}
              </Link>
            </div>
          </div>

          {/* Large official-cover slot — honest placeholder until real art arrives */}
          <ArtworkFrame
            src={assetSrc(product.coverAsset)}
            alt={`Cover of ${product.title}`}
            ratio="portrait"
            icon="book"
            tone={collection.accent === "lavender" ? "lavender" : "brand"}
            label="Official cover coming soon"
            title={product.title}
            loading="eager"
            className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:max-w-none"
          />
        </article>
      </Container>
    </main>
  );
}
