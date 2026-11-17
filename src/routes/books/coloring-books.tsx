import { createFileRoute } from "@tanstack/react-router";

import { CollectionPageBody } from "~/components/CollectionPageBody";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/books/coloring-books")({
  head: () =>
    pageMeta(
      "Coloring Books",
      "Explore Cloudmeadow Coloring Adventures™. Pip’s first coloring book is proofed and print-ready, with publication pending.",
    ),
  component: ColoringBooksPage,
});

function ColoringBooksPage() {
  return <CollectionPageBody collectionId="coloring-books" />;
}
