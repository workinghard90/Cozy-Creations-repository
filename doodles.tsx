import type { SVGProps } from "react";

/**
 * Hand-coded decorative SVG doodles (clouds, sparkles, squiggles).
 * Pure decoration — every one is aria-hidden and conveys no information.
 * No character art lives here: Pip is never drawn, only described in words
 * until the owner supplies official artwork.
 */

export function CloudDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 56" fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="30" cy="40" rx="20" ry="14" />
      <ellipse cx="52" cy="30" rx="22" ry="16" />
      <ellipse cx="72" cy="42" rx="18" ry="12" />
      <rect x="12" y="38" width="76" height="16" rx="8" />
    </svg>
  );
}

export function SparkleDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5l2.1 7.4 7.4 2.1-7.4 2.1L12 21.5l-2.1-7.4-7.4-2.1 7.4-2.1L12 2.5z" />
    </svg>
  );
}

export function StarDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2-5.6-3.3-5.6 3.3 1.4-6.2L4 9.5l6.4-.6L12 3z" />
    </svg>
  );
}

export function SquiggleDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 104 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 14c6-12 12-12 18 0s12 12 18 0 12-12 18 0 12 12 18 0 12-12 18 0" />
    </svg>
  );
}

export function BookDoodle(props: SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function GiftDoodle(props: SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

export function CartDoodle(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="17" cy="20" r="1.6" />
      <path d="M3 3h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.2L20.5 7H6" />
    </svg>
  );
}

export function MailDoodle(props: SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function WrenchDoodle(props: SVGProps<SVGSVGElement>) {
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
      <path d="M14.7 6.3a4.5 4.5 0 0 0 6 6l-8.4 8.4a2.1 2.1 0 0 1-3-3l8.4-8.4a4.5 4.5 0 0 0-3-3z" />
      <path d="M3.5 3.5l3.6 3.6" />
    </svg>
  );
}
