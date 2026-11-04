import type { ReactNode } from "react";

import { SparkleDoodle } from "./doodles";

/** Consistent section heading: optional eyebrow, serif title, optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <div className={alignment + (className ? ` ${className}` : "")}>
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
          <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
          {eyebrow}
          <SparkleDoodle className="h-3 w-3 text-gold" aria-hidden="true" />
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink/85">{intro}</p> : null}
    </div>
  );
}
