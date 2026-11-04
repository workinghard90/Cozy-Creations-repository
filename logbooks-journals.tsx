import { createFileRoute } from "@tanstack/react-router";

import { CollectionPageBody } from "~/components/CollectionPageBody";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/books/logbooks-journals")({
  head: () =>
    pageMeta(
      "Logbooks & Journals",
      "Practical logbooks and journals from Cozy Creations by Autumn™, starting with the Vehicle Maintenance Logbook — a keepsake for tracking service, repairs, maintenance costs, and completed work, with dedicated notes pages. Coming soon.",
    ),
  component: LogbooksJournalsPage,
});

function LogbooksJournalsPage() {
  return <CollectionPageBody collectionId="logbooks-journals" />;
}
