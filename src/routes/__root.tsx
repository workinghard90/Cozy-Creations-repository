import { Outlet, createRootRoute } from "@tanstack/react-router";

import { BrandedNotFound } from "~/components/BrandedNotFound";
import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";

import appCss from "~/styles/app.css?url";

/**
 * The owner's official colour emblem, used as the site favicon. It is already
 * preloaded for the header lockup on every page, so pointing the icon at it
 * adds no extra request — and no new or substituted artwork is introduced.
 * (The grayscale emblem stays print-only and is never referenced here.)
 */
const EMBLEM_MODULES = import.meta.glob<string>("/src/assets/brand/emblem-color-web.png", {
  eager: true,
  import: "default",
});
const faviconUrl: string | undefined =
  EMBLEM_MODULES["/src/assets/brand/emblem-color-web.png"];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#fbf7ef" },
      // Fallback title — every route sets its own, more specific title.
      { title: "Cozy Creations by Autumn™" },
      {
        name: "description",
        content:
          "Cozy Creations by Autumn™ is an independent creative brand by Melody Autumn Hall — original children's coloring books and storybooks, practical logbooks, artwork, and gifts.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...(faviconUrl
        ? [
            { rel: "icon", type: "image/png", href: faviconUrl },
            { rel: "apple-touch-icon", href: faviconUrl },
          ]
        : []),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Nunito:wght@400;600;700;800&display=swap",
      },
    ],
  }),
  notFoundComponent: BrandedNotFound,
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream font-sans text-ink">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-red focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-cream">Skip to main content</a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
