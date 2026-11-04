import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { BrandLogo } from "./BrandLogo";
import { CollectionIcon } from "./CollectionIcon";
import { Container } from "./Container";
import { COLLECTION_ACCENTS } from "./collectionStyles";
import { bookCollections, collectionHref } from "~/data/catalog";

/** Top-level nav items — the four book collections live in the Books group below. */
const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/pips-cloud-magic", label: "Pip's Cloud Magic" },
  { to: "/artwork-and-gifts", label: "Artwork & Gifts" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close whenever a navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // A viewport change can hide the mobile toggle while its panel is open.
  // Reset the disclosure when switching to desktop navigation so keyboard
  // focus and menu state cannot become stranded across responsive layouts.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpointChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onBreakpointChange);
    onBreakpointChange();
    return () => desktop.removeEventListener("change", onBreakpointChange);
  }, []);

  // While the mobile menu is open: move focus into it, close on Escape (focus
  // returns to the toggle), and close on a click/tap outside.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panel?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  const navLinkClass = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-bold transition-colors ${
      active ? "bg-red-soft text-ink" : "text-ink-soft hover:bg-red-soft/60 hover:text-ink"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `flex min-h-12 items-center rounded-2xl px-4 py-2.5 text-base font-bold ${
      active ? "bg-red-soft text-ink" : "text-ink hover:bg-red-soft/60"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-3">
        <BrandLogo />

        {/* Desktop nav — the four book collections group under one Books dropdown */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={navLinkClass(isActive(item.to))}
            >
              {item.label}
            </Link>
          ))}
          <BooksDropdown pathname={pathname} />
          {NAV_ITEMS.slice(2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={navLinkClass(isActive(item.to))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close main menu" : "Open main menu"}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-gold-soft active:translate-y-px lg:hidden"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </Container>

      {/*
       * Mobile menu — an overlay panel hanging below the sticky header, so
       * opening it never shifts the page. It scrolls within the viewport
       * (minus the header) and respects the iPhone home-indicator inset.
       */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${
          open ? "block" : "hidden"
        } absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink/10 bg-cream shadow-lift lg:hidden`}
      >
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-0.5 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5"
        >
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={mobileLinkClass(isActive(item.to))}
            >
              {item.label}
            </Link>
          ))}

          <p className="mt-2 border-t border-ink/10 px-4 pb-1 pt-4 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            Books
          </p>
          {bookCollections.map((collection) => {
            const to = collectionHref(collection);
            const active = isActive(to);
            return (
              <Link
                key={collection.id}
                to={to}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 items-center gap-3 rounded-2xl py-2 pl-4 pr-4 text-base font-bold ${
                  active ? "bg-red-soft text-ink" : "text-ink hover:bg-red-soft/60"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    COLLECTION_ACCENTS[collection.accent].chip
                  }`}
                >
                  <CollectionIcon icon={collection.icon} className="h-4 w-5" />
                </span>
                {collection.title}
              </Link>
            );
          })}

          <div className="mt-2 border-t border-ink/10 pt-2">
            {NAV_ITEMS.slice(2).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={mobileLinkClass(isActive(item.to))}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * Desktop "Books" disclosure: an accessible button (aria-expanded, Escape to
 * close with focus returned, click-outside to dismiss) listing the four book
 * collections from the catalog — so a new collection appears in the nav
 * automatically.
 */
function BooksDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isActive = pathname === "/books" || pathname.startsWith("/books/");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Close the panel whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="books-menu"
        aria-current={isActive ? "true" : undefined}
        className={`inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-sm font-bold transition-colors ${
          isActive ? "bg-red-soft text-ink" : "text-ink-soft hover:bg-red-soft/60 hover:text-ink"
        }`}
      >
        Books
        <svg
          viewBox="0 0 12 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`h-2 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </button>
      {open ? (
        <div
          id="books-menu"
          className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-3xl border border-ink/10 bg-white p-2 shadow-lift"
        >
          <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            Browse our books
          </p>
          <ul>
            {bookCollections.map((collection) => {
              const to = collectionHref(collection);
              return (
                <li key={collection.id}>
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname === to || pathname.startsWith(`${to}/`) ? "page" : undefined
                    }
                    className="flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-red-soft/60"
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        COLLECTION_ACCENTS[collection.accent].chip
                      }`}
                    >
                      <CollectionIcon icon={collection.icon} className="h-4 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink">{collection.title}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                        {collection.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
