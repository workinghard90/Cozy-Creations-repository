import type { SVGProps } from "react";

import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { socialProfiles } from "../data/social";
import type { SocialId } from "../data/social";

/**
 * Social links for the brand's two official profiles.
 *
 * These are hand-coded SVG glyphs of the platform marks — not artwork and not
 * character art. Both render in `currentColor` so they pick up brand colours
 * from their container.
 *
 * Hard rules baked into this file:
 *  - links only: plain anchors, `target="_blank"` + `rel="noopener noreferrer"`,
 *    no embedded feeds, scripts, iframes or pixels;
 *  - every target is at least 44px tall and has a visible focus ring;
 *  - no social proof of any kind — no follower, subscriber or view counts.
 */

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.53 2.25c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97a8.1 8.1 0 0 1-1.62-.93c-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

/** Glyph for one platform, sized by the caller's className. */
export function SocialIcon({
  id,
  className,
  ...rest
}: { id: SocialId } & SVGProps<SVGSVGElement>) {
  return id === "instagram" ? (
    <InstagramGlyph className={className} {...rest} />
  ) : (
    <TikTokGlyph className={className} {...rest} />
  );
}

/** "Opens in a new tab" for screen readers, so the announcement matches behaviour. */
function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

/**
 * Footer row. Rendered as a full-width band inside the existing footer grid
 * (`col-span-full`), so it never squeezes the Explore / Good to Know columns.
 * Stacked full-width pills on a phone, inline pills from `sm` up.
 */
export function FooterSocialLinks() {
  return (
    <div className="col-span-full border-t border-cream/20 pt-7">
      <p id="footer-social-heading" className="text-xs font-bold uppercase tracking-[0.22em] text-cream/75">
        Follow Along
      </p>
      <ul
        aria-labelledby="footer-social-heading"
        className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3"
      >
        {socialProfiles.map((profile) => (
          <li key={profile.id}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center gap-3 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold hover:bg-cream/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto"
            >
              <SocialIcon id={profile.id} className="h-5 w-5 shrink-0 text-gold" />
              {/* Stacked on a phone so both pills are the same height; one line from sm up */}
              <span className="flex flex-col text-left leading-snug sm:inline-flex sm:flex-row sm:items-baseline sm:gap-1.5">
                <span>{profile.platform}</span>
                <span className="text-cream/85">
                  <span aria-hidden="true" className="hidden sm:inline">
                    —{" "}
                  </span>
                  {profile.handle}
                </span>
              </span>
              <NewTabHint />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Homepage invitation. Sits between the founder block and the footer, on the
 * cream page background, and uses the same card language as ProductCard:
 * icon chip, serif title, quiet caption, and a pinned "Visit profile" action.
 */
export function SocialInviteSection() {
  return (
    <Container className="pb-16 sm:pb-20 lg:pb-24">
      <section
        aria-label="Follow Cozy Creations by Autumn on Instagram and TikTok"
        className="rounded-3xl border border-red/20 bg-red-soft/40 px-5 py-8 sm:px-8 sm:py-10"
      >
        <SectionHeading
          eyebrow="Follow Along"
          title="Come Say Hello"
          intro="Cozy Creations by Autumn™ also lives on Instagram and TikTok — faceless entertainment in the same cozy branding you'll find here."
        />
        <ul className="mx-auto mt-7 grid max-w-3xl gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          {socialProfiles.map((profile) => (
            <li key={profile.id} className="h-full">
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-soft transition-shadow duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-soft text-red">
                  <SocialIcon id={profile.id} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold leading-snug text-ink">
                    {profile.platform}
                  </span>
                  <span className="mt-0.5 block break-words text-sm font-semibold text-ink-soft">
                    {profile.handle}
                  </span>
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-red">
                  Visit profile
                  <span aria-hidden="true">→</span>
                </span>
                <NewTabHint />
              </a>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
          Nothing loads from either platform until you tap a link — each one opens the profile in
          a new tab.
        </p>
      </section>
    </Container>
  );
}
