import { createFileRoute } from "@tanstack/react-router";

import { Container } from "~/components/Container";
import { MailDoodle, SparkleDoodle } from "~/components/doodles";
import { SectionHeading } from "~/components/SectionHeading";
import { pageMeta } from "~/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contact & Updates",
      "Get in touch with Cozy Creations by Autumn™ and join the newsletter for cozy updates. Contact details and the email sign-up are being connected — check back soon.",
    ),
  component: Contact,
});

function Contact() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      {/* Intro */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-red/25 blur-3xl" />
        </div>
        <Container className="relative py-12 text-center sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
            We'd Love to Hear from You
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Contact &amp; Updates
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
            Questions, kind words, or ideas to share — we'd love to hear from you. Here's
            exactly where things stand: our inbox and newsletter are being connected, and both
            will appear here the moment they work.
          </p>
        </Container>
      </div>

      {/* Contact + Newsletter */}
      <Container className="pb-12 sm:pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact card */}
          <section
            aria-labelledby="contact-heading"
            className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-soft text-red">
              <MailDoodle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id="contact-heading" className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Say Hello
            </h2>
            <p className="mt-3 leading-relaxed text-ink/85">
              A contact form will arrive here once our email is connected — we'd rather launch
              it working than promise it twice.
            </p>
            <p className="mt-6 inline-flex items-center gap-3 self-start rounded-2xl border-2 border-dashed border-ink/25 bg-cream px-5 py-3 text-base font-bold text-ink/85">
              <MailDoodle className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true" />
              Contact email coming soon
            </p>
            <p className="mt-4 text-sm font-semibold text-ink-soft">
              No email address has been set up yet — this placeholder is honest, not a mistake.
            </p>
          </section>

          {/* Newsletter card */}
          <section
            aria-labelledby="newsletter-heading"
            className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-ink">
              <MailDoodle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id="newsletter-heading" className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Join the Newsletter — Coming Soon
            </h2>
            <p className="mt-3 leading-relaxed text-ink/85">
              Cozy updates on new books, artwork, and Pip's next adventures — a friendly note
              whenever there's something real to share.
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              aria-describedby="newsletter-note"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                disabled
                placeholder="Your email address"
                className="min-h-11 w-full flex-1 cursor-not-allowed rounded-full border-2 border-ink/15 bg-cream px-5 py-2.5 text-base text-ink/75 placeholder:text-ink/55"
              />
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="min-h-11 cursor-not-allowed rounded-full bg-ink/15 px-7 py-2.5 text-base font-bold text-ink/75"
              >
                Sign up
              </button>
            </form>
            <p id="newsletter-note" className="mt-4 text-sm font-semibold text-ink-soft">
              Email updates aren't connected yet — check back soon.
            </p>
          </section>
        </div>
      </Container>

      {/* Reassurance */}
      <Container className="pb-16 sm:pb-24">
        <SectionHeading
          eyebrow="In the Meantime"
          title="While the Mail Is on Its Way"
          intro="Browse the collections and meet Pip — and rest easy knowing that whenever a sign-up or inbox appears here, it will really work. Nothing fake, nothing half-connected."
        />
      </Container>
    </main>
  );
}
