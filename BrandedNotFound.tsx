import { Link } from "@tanstack/react-router";

import { button } from "./buttonStyles";

/**
 * The branded 404, shared by the root route (true no-match URLs) and the
 * dynamic product route (unknown collection/product slugs). One component so
 * every "lost" visitor sees the same friendly page.
 */
export function BrandedNotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center"
    >
      {/* NOTE: the 404 inherits the root route's fallback <title> ("Cozy
          Creations by Autumn™"). Rendering a second <title> here produces two
          title elements in the document, so this page is deliberately left with
          the single, valid fallback title. */}
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
        Lost in the clouds
      </p>
      <h1 className="font-display text-4xl font-semibold text-ink">This page drifted away</h1>
      <p className="max-w-md text-lg text-ink/85">
        The page you're looking for doesn't exist (yet). Let's float gently back home.
      </p>
      <Link
        to="/"
        className={button("primary", "lg", "mt-2")}
      >
        Back to the homepage
      </Link>
    </main>
  );
}
