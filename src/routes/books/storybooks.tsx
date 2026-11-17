import { createFileRoute } from "@tanstack/react-router";

import { CollectionPageBody } from "~/components/CollectionPageBody";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/books/storybooks")({
  head: () =>
    pageMeta(
      "Storybooks",
      "Explore Cloudmeadow Chronicles™ from Cozy Creations by Autumn™. Its first storybook, The Missing Rainbow, is awaiting its physical proof.",
    ),
  component: StorybooksPage,
});

function StorybooksPage() {
  return <CollectionPageBody collectionId="storybooks" />;
}
