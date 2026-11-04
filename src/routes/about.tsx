import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "~/components/Container";
import { SparkleDoodle, StarDoodle, WrenchDoodle } from "~/components/doodles";
import { SectionHeading } from "~/components/SectionHeading";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About",
      "Cozy Creations by Autumn™ is an independent creative brand founded by Melody Autumn Hall — imaginative children's experiences and useful everyday products, made with care, creativity, and thoughtful design.",
    ),
  component: About,
});

function About() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      {/* Brand story */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-red/20 blur-3xl" />
          <div className="absolute -right-16 top-24 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
          <SparkleDoodle className="absolute right-1/4 top-10 h-5 w-5 text-gold/70" />
          <SparkleDoodle className="absolute bottom-10 left-1/4 h-3 w-3 text-red/60" />
        </div>
        <Container className="relative py-12 text-center sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
            About the Brand
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Cozy Creations by Autumn™
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
            Cozy Creations by Autumn™ is an independent creative brand founded by Melody Autumn
            Hall. We make imaginative children's experiences — storybooks and coloring books
            like Pip's Cloud Magic — alongside useful everyday products like logbooks, plus
            artwork and gifts.
          </p>
        </Container>
      </div>

      {/* Mission */}
      <Container className="pb-12 sm:pb-16">
        <div className="rounded-3xl bg-gold-soft/60 p-8 text-center sm:p-12">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
            Our Mission
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Care, creativity, and thoughtful design
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink/85">
            Our mission is to create imaginative children's experiences and useful everyday
            products with care, creativity, and thoughtful design. Everything we make should
            feel cozy, work beautifully, and be honest about what it is.
          </p>
        </div>
      </Container>

      {/* Values */}
      <Container className="pb-12 sm:pb-16">
        <SectionHeading
          eyebrow="What We Believe"
          title="Three Little Promises"
          intro="The values behind every creation — from Cloudmeadow's clouds to the pages of a logbook."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft text-lavender-deep">
              <SparkleDoodle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Imagination First
            </h3>
            <p className="mt-2 leading-relaxed text-ink/85">
              Gentle worlds like Cloudmeadow invite kids to dream, color, and imagine — cozy
              spaces where kindness and little wonders lead the way.
            </p>
          </article>
          <article className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-ink">
              <WrenchDoodle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Made to Be Useful
            </h3>
            <p className="mt-2 leading-relaxed text-ink/85">
              Our practical books are designed to be genuinely helpful — organized, durable,
              and pleasant to reach for every day.
            </p>
          </article>
          <article className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-soft text-ink">
              <StarDoodle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Honesty, Always
            </h3>
            <p className="mt-2 leading-relaxed text-ink/85">
              We say “coming soon” when something is coming soon, and we never dress up a
              placeholder as something more. What you read here is what's true.
            </p>
          </article>
        </div>
      </Container>

      {/* Founder */}
      <Container className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-soft sm:p-10">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
            The Founder
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Melody Autumn Hall
          </h2>
          <p className="mt-4 leading-relaxed text-ink/85">
            Melody founded Cozy Creations by Autumn™ and oversees every creation with care,
            creativity, and thoughtful design — from Pip's gentle adventures in Cloudmeadow to
            the practical pages of our logbooks.
          </p>
        </div>
      </Container>

      {/* What's next */}
      <Container className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl rounded-3xl bg-cream-deep/60 p-8 text-center sm:p-10">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
            What's Next
          </p>
          <p className="leading-relaxed text-ink/85">
            The studio is busy getting the first creations ready. When something is published,
            it appears on this site with a real Amazon link — and nothing goes up before it's
            truly ready. Questions in the meantime?{" "}
            <Link
              to="/contact"
              className="font-bold text-ink underline decoration-gold underline-offset-4"
            >
              Contact &amp; Updates
            </Link>{" "}
            is the coziest place to reach us.
          </p>
        </div>
      </Container>
    </main>
  );
}
