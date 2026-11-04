import { createFileRoute } from "@tanstack/react-router";

import { CollectionPageBody } from "~/components/CollectionPageBody";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/books/storybooks")({
  head: () =>
    pageMeta(
      "Storybooks",
      "Illustrated read-aloud storybooks from Cozy Creations by Autumn™ — starting with Pip and the Upside-Down Rain, the companion Pip's Cloud Magic storybook. Coming soon.",
    ),
  component: StorybooksPage,
});

function StorybooksPage() {
  return <CollectionPageBody collectionId="storybooks" />;
}
