import { createFileRoute } from "@tanstack/react-router";

import { CollectionPageBody } from "~/components/CollectionPageBody";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/books/other-books")({
  head: () =>
    pageMeta(
      "Other Books",
      "Future publications from Cozy Creations by Autumn™ that fit no other shelf. New titles are in the works — check back soon.",
    ),
  component: OtherBooksPage,
});

function OtherBooksPage() {
  return <CollectionPageBody collectionId="other-books" />;
}
