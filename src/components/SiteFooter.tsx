import { Link } from "@tanstack/react-router";

import { Container } from "./Container";
import { FooterSocialLinks } from "./SocialLinks";
import { SparkleDoodle } from "./doodles";

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/pips-cloud-magic", label: "Pip's Cloud Magic" },
  { to: "/books/logbooks-journals", label: "Logbooks & Journals" },
  { to: "/artwork-and-gifts", label: "Artwork & Gifts" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact & Updates" },
  { to: "/privacy", label: "Privacy Policy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-red-deep text-cream">
      <Container className="grid gap-9 py-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-cream">
            <SparkleDoodle className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            Cozy Creations by Autumn™
          </p>
          <p className="mt-3 font-display text-sm italic text-gold-soft">
            “A Little Magic in Every Creation.”
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/85">
            Original children's coloring books and storybooks, practical logbooks, artwork, and
            gifts — made with care, creativity, and thoughtful design.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cream/75">Explore</p>
          <ul className="mt-2">
            {FOOTER_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-semibold text-cream/90 transition-colors hover:text-cream focus-visible:outline-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cream/75">
            Good to Know
          </p>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed text-cream/85">
            <li><a href="mailto:cozycreationsbyautumn@gmail.com" className="break-all font-semibold text-cream underline decoration-gold/70 underline-offset-4 hover:decoration-gold focus-visible:outline-gold">cozycreationsbyautumn@gmail.com</a></li>
            <li>Everything marked “Coming Soon” is still being made — nothing is on sale yet.</li>
            <li>
              Official artwork and Amazon links appear only once they're real and verified.
            </li>
            <li>
              <Link
                to="/privacy"
                className="inline-flex min-h-11 items-center font-semibold text-cream underline decoration-gold/70 underline-offset-4 hover:decoration-gold focus-visible:outline-gold"
              >
                Read our Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Official profiles — a full-width band so Explore / Good to Know keep their width */}
        <FooterSocialLinks />
      </Container>

      <div className="border-t border-cream/20">
        <Container className="flex flex-col items-center gap-2 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-cream/90">
            Cozy Creations by Autumn™ · © 2026 Melody Autumn Hall. All rights reserved.
          </p>
          <p className="text-xs text-cream/75">
            This is a preview site — products appear here as they launch.
          </p>
        </Container>
      </div>
    </footer>
  );
}
