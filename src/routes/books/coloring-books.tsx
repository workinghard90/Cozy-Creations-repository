import { createFileRoute } from "@tanstack/react-router";

import { CollectionPageBody } from "~/components/CollectionPageBody";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/books/coloring-books")({
  head: () =>
    pageMeta(
      "Coloring Books",
      "Cozy coloring books from Cozy Creations by Autumn™ — starting with Pip's Cloud Magic Coloring Book, 40 gentle illustrations for ages 3–8. Coming soon.",
    ),
  component: ColoringBooksPage,
});

function ColoringBooksPage() {
  return <CollectionPageBody collectionId="coloring-books" />;
}
