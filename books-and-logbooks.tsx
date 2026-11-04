import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy route — /books-and-logbooks was replaced by data-driven collections
 * under /books/. This route exists only to redirect old links, so no visitor
 * hits a dead end. The page content now lives at /books/logbooks-journals
 * (rendered from src/data/catalog.ts).
 */
export const Route = createFileRoute("/books-and-logbooks")({
  beforeLoad: () => {
    throw redirect({ to: "/books/logbooks-journals" });
  },
});
