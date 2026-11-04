import { ArtworkFrame } from "./ArtworkFrame";
import { CollectionIcon } from "./CollectionIcon";
import { ProductCard } from "./ProductCard";
import { assetSrc, productHref, statusBadgeTone } from "~/data/catalog";
import type { CatalogCollection, CatalogProduct } from "~/data/catalog";

/**
 * A catalog-driven product card: official-cover slot (honest placeholder until
 * the owner supplies art), status badge, description, and a "View details"
 * link to the product's own detail page.
 */
export function CatalogProductCard({
  collection,
  product,
}: {
  collection: CatalogCollection;
  product: CatalogProduct;
}) {
  return (
    <ProductCard
      title={product.title}
      description={product.description}
      badgeTone={statusBadgeTone(product.status)}
      accent={collection.accent}
      icon={<CollectionIcon icon={collection.icon} className="h-6 w-6" />}
      href={productHref(collection, product)}
      linkLabel="View details"
    >
      {/* Official cover from public/covers/ once supplied; the frame is 3:4 in
          both states, so adding art never shifts the layout. */}
      <ArtworkFrame
        src={assetSrc(product.coverAsset)}
        alt={`Cover of ${product.title}`}
        ratio="portrait"
        icon="book"
        tone={collection.accent === "lavender" ? "lavender" : "brand"}
        label="Official cover coming soon"
        className="mx-auto w-full max-w-[15rem]"
      />
    </ProductCard>
  );
}
