import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "~/components/Container";
import { MailDoodle } from "~/components/doodles";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageMeta(
      "Privacy Policy",
      "How Cozy Creations by Autumn™ handles privacy: a static marketing site with no accounts and no active data collection. Last updated November 3, 2026.",
    ),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Container className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-soft/70 px-4 py-1.5 text-sm font-bold text-ink">
            Last updated: November 3, 2026
          </p>

          <div className="mt-10 space-y-8">
            <section aria-labelledby="privacy-short">
              <h2
                id="privacy-short"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                The short version
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                This is currently a simple, static marketing website. There are no accounts to
                create and no active data collection — the site doesn't run analytics, tracking,
                or advertising, and it doesn't ask you for personal information. The one outside
                service it does use is Google Fonts, for our typefaces — explained in full below.
              </p>
            </section>

            <section aria-labelledby="privacy-what">
              <h2
                id="privacy-what"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                What this site does
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                The site describes Cozy Creations by Autumn™ and its upcoming books and
                products. Browsing it requires no personal details from you, and we don't sell
                or share information — because we aren't collecting any.
              </p>
            </section>

            <section aria-labelledby="privacy-social">
              <h2
                id="privacy-social"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                Social media links
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                Links to our Instagram and TikTok profiles open in a new tab. Nothing from those
                platforms loads on this page — no feeds, embeds or tracking pixels — so those
                platforms' own privacy practices apply only once you choose to visit them.
              </p>
            </section>

            <section aria-labelledby="privacy-fonts">
              <h2
                id="privacy-fonts"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                Fonts and other outside requests
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                The two typefaces on this site, Fraunces and Nunito, are served by Google Fonts.
                When a page loads, your browser asks Google's servers for those font files, which
                means that request shares your IP address and basic browser details with Google,
                exactly as any web request does. Google's own privacy practices apply to it. That
                is the only outside service the site contacts — there is no analytics, no
                advertising, no tracking pixel, and no other third-party embed anywhere on these
                pages.
              </p>
            </section>

            <section aria-labelledby="privacy-future">
              <h2
                id="privacy-future"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                When the newsletter or contact form launches
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                When we add a newsletter sign-up or a contact form, this policy will be updated
                first — explaining exactly what is collected, why it's needed, how long it's
                kept, and what choices you have (including how to unsubscribe or ask for your
                details to be deleted). Until then, no email addresses are collected through
                this site.
              </p>
            </section>

            <section aria-labelledby="privacy-amazon">
              <h2
                id="privacy-amazon"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                Amazon links
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                As products become available, links to their Amazon listings will appear on this
                site. Any purchase made through Amazon is handled entirely by Amazon under
                Amazon's own privacy practices — not by this site.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2
                id="privacy-contact"
                className="font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                Contact
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">
                Questions about privacy? Our contact details are still being set up — a clearly
                labeled placeholder appears on our{" "}
                <Link
                  to="/contact"
                  className="font-bold text-ink underline decoration-gold underline-offset-4"
                >
                  Contact page
                </Link>{" "}
                until then.
              </p>
              <p className="mt-4 inline-flex items-center gap-3 rounded-2xl border-2 border-dashed border-ink/25 bg-cream px-5 py-3 text-base font-bold text-ink/85">
                <MailDoodle className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true" />
                Contact email coming soon
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
