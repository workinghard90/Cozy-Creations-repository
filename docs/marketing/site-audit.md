# Website audit — Cozy Creations by Autumn

Prepared for: Autumn (owner)
Prepared by: marketing strategist, Cozy Creations by Autumn team
Date: 16 November 2026
Status: for your review and approval. Nothing on any website has been changed, published or purchased.

---

## The short version

**I could not audit cozycreationsbyautumn.dev, because that address does not currently exist.** It isn't a broken page or a server error — the domain itself is not registered or not delegated, so there is no site behind it to read. I checked the exact spelling every way it can be typed, plus twelve nearby variants, through two independent public DNS resolvers. All of them come back "no such domain".

The only page that exists for this business right now is the team's temporary placeholder page. I audited that instead, and I've set out below exactly what your real home page and Pip's book page need — so this audit is actionable the moment the real address is confirmed.

**The single biggest thing costing you organic traffic is not a page detail: it's that there is no reachable website.** Google has nothing to index, and every social bio link, bookmark and word-of-mouth referral currently lands on a dead address.

---

## 1. The domain: what I checked and what I found

**Exact spelling you gave me: `cozycreationsbyautumn.dev`**

- `https://cozycreationsbyautumn.dev` — does not resolve (no such domain)
- `http://cozycreationsbyautumn.dev` — does not resolve
- `https://www.cozycreationsbyautumn.dev` — does not resolve
- Checked twice, through two independent public DNS resolvers. Both answer with NXDOMAIN, which is the registry saying the name has no delegation at all — nothing is pointing anywhere.

**Nearby variants, all also "no such domain":**
cozycreationsbyautumn.com, .co, .net, .org, .shop, .store, .blog; www variants; the hyphenated cozy-creations-by-autumn.com and .dev; cozycreationsautumn.com; autumnscozycreations.dev; cozicreationsbyautumn.dev (the common "cozy" misspelling).

**Plausible free-hosting addresses, checked and ruled out:**
`cozycreationsbyautumn.my.canva.site` and `cozycreationsbyautumn.wixsite.com` both answer "Not found" / 404. Those hosts reply for any name, so their answering is not evidence of a site — they are not your site.

**Search check:** a search for "Cozy Creations by Autumn" returned no organic result I could verify. (Search result pages are unreliable to read this way, so treat this as a weak signal, not proof.)

**What this means:** either the name was never registered, or it lapsed, or it is registered but has no nameservers assigned. In every one of those cases nothing serves, and I cannot tell which from outside. Only your registrar account can tell you.

**Zero-cost fix:** none is possible for this one item. Registering or renewing a domain costs money — roughly US$12–20 per year for a .dev name, depending on registrar, plus whatever your host charges. I can't buy it and I won't ask you to pay through me; the team lead raises purchases with you directly. What costs nothing right now: confirm whether the domain is yours and when it renews, and until then use the free team page address below as your link-in-bio so no link you share is dead.

**Priority: P1 — blocking.** Nothing else in the launch campaign can be measured until a page is reachable.

---

## 2. The only page that exists today

**Live address: https://5b9ac482420549d647b9ba43468e6b96.cto.site**

This is the team's temporary placeholder, and it is genuinely the only address for this business that works today. When your domain is pointed here, this page becomes your site — so it is worth auditing exactly as it stands.

**What's on it:** a single centred line, "Your site will appear here". No navigation, no content, no links, no images.

**Findings, each with a zero-cost fix and a priority:**

1. **Page title is `My site`** — the most important on-page ranking signal, and it is currently wasted. *Fix:* "Cozy Creations by Autumn | Books for Little Dreamers" (52 characters). Free. **P1.**
2. **No meta description.** Google will invent a snippet, usually badly. *Fix:* a 150–160 character description naming Pip's Cloud Magic, the 3–6 age range and the coloring book. Free. **P1.**
3. **No headings at all** — no H1, no H2s. Search engines read headings first. *Fix:* one H1 with the business name, then H2s per section. Free. **P1.**
4. **No content.** No book title, no age range, no author name, no Amazon links, no keywords. There is nothing for Google to rank and nothing for a visitor to act on. *Fix:* the minimum home page described in section 3. Free. **P1.**
5. **`robots.txt` returns 404.** Not fatal (search engines treat a missing robots.txt as "crawl everything"), but you lose the sitemap pointer. *Fix:* add a robots.txt that allows everything and names the sitemap. Free. **P2.**
6. **`sitemap.xml` returns 404.** *Fix:* publish a sitemap listing home, the book page and the coloring book page, and submit it in Search Console. Free. **P2.**
7. **No canonical tag.** *Fix:* add a self-referencing canonical **once the real domain is live** — and do not canonicalise to the temporary .cto.site address, or you'll send ranking signals to a host you don't own. Free. **P2.**
8. **Unknown URLs correctly return a real 404 status** (good), but the 404 page is titled "My site" and offers no way back. *Fix:* a warm 404 with a link home and to the book. Free. **P3.**
9. **Mobile basics are fine** — the viewport tag is present and the layout is responsive, so nothing is broken on a phone. What's missing is content: on a phone the page is one line of text. No fix needed beyond adding the content above. **P3.**
10. **No structured data.** *Fix:* add Book and Organization JSON-LD markup once the book pages exist (title, author, audience ages 3–6, ISBN, and a "sameAs" link to the Amazon listing). Free, and it improves how the page can appear in results. **P3.**
11. **Favicon is present.** No action.

---

## 3. Pip's Cloud Magic: The Missing Rainbow — the book page

**Status: I could not audit the copy, because no page for the book exists at any address that resolves.** There is nothing to read — not a weak page, an absent one. Rather than invent findings, here is the brief I would audit against, and what I need from you to complete a real copy audit.

**The book page needs, in this order:**

1. **H1:** "Pip's Cloud Magic: The Missing Rainbow" — the exact title, word for word as on your KDP listing, so the two reinforce each other in search.
2. **One-line hook above the fold**, warm and concrete — draft for your approval: *"When the rainbow loses its colours, a small cloud named Pip sets out to bring them home."*
3. **The cover image with descriptive alt text** — e.g. "Cover of Pip's Cloud Magic: The Missing Rainbow, a children's picture book for ages 3–6". Alt text is free accessibility and free ranking signal.
4. **Who it's for, in one scan:** ages 3–6, read-aloud length, and the themes (friendship, courage, colours and weather) — so a parent or grandparent recognises the right child instantly.
5. **One clear call to action** to the Amazon listing, repeated at the bottom, in one consistent label — "Buy the paperback on Amazon". No urgency language, no countdowns, no invented scarcity.
6. **The companion coloring book on its own page**, not buried at the bottom of this one, cross-linked both ways.
7. **Two to three paragraphs of your own words** (200–400 words) describing the story. This is the only text on the whole site Google can rank for the title and the themes — it matters more than any technical fix.
8. **A short extra block** — "read-aloud tips for parents" or "what Pip teaches", 150–250 words. This is the kind of content that earns long-tail searches such as "rainbow books for 3 year olds" or "picture books about weather for preschoolers".
9. **A short FAQ** (3–5 questions: what age is it for, is it paperback, is there a coloring book) with FAQ structured data — free rich results, and it matches how parents actually type their questions.

**Gaps I can already name without seeing the copy:**
- No book page exists anywhere.
- No link from the Amazon KDP listing back to the site. You control the author bio and the back matter — that is free, and it is the only route from a KDP reader to your site.
- The series name isn't used as a searchable phrase anywhere reachable.
- There is no page at all for the companion coloring book, so the companion product can't be found or cross-sold.

---

## 4. Where organic traffic is being lost — prioritised

### P1 — blocking, do these first

1. **No reachable website.** Nothing to index; every link you share is dead. *Fix:* confirm or register the domain and point it at the live page. *Cost:* the domain fee only — a purchase for the team lead to raise, not something I can do.
2. **Placeholder home page:** no content, title "My site", no description, no headings. *Fix:* ship the minimum home page from sections 2 and 3. Free.
3. **No book page.** *Fix:* publish it with the nine elements above. Free.
4. **No link from Amazon to the site.** *Fix:* put the site address in your Amazon author bio and in the book description/back matter. Free, and it is the only path KDP readers have to you.

### P2 — high value, quick

5. **Not submitted for indexing anywhere.** *Fix:* verify the domain in Google Search Console and Bing Webmaster Tools (both free), submit the sitemap, request indexing of home and book pages.
6. **Missing robots.txt and sitemap.xml.** Free to add.
7. **No internal linking** — home → book → coloring book → home. Free, and it spreads ranking between the pages.
8. **Titles and descriptions not written for how people search** ("rainbow picture book for 3 year olds", not "welcome to my site"). Free; I'll draft them on request.
9. **No consistent brand presence off-site.** A free Google Business Profile is optional for a publisher, but it helps your own name resolve when someone searches it.

### P3 — polish once the above is done

10. **No structured data** (Book, FAQ). Free.
11. **No alt text or image file-naming convention.** Free.
12. **No recovery page for broken links.** Free.
13. **No analytics**, so you can't see which post or link produces book-link clicks. *Fix:* Google Analytics 4 free tier plus Search Console covers this at zero cost.

---

## 5. What I cannot check without your access

I'd rather say this plainly than guess. I have no visibility into any of the following, and I won't put invented numbers in a report:

- **Google Search Console:** whether the domain is verified, whether any page is indexed, which queries already show your site, any coverage errors or manual actions.
- **Analytics (GA4 or whatever you use):** traffic, sources, book-link clicks, device split, bounce.
- **Amazon KDP reports:** sales, KENP reads, which ASINs, listing-view conversion. I need these for the weekly report, and to judge whether site traffic actually turns into sales.
- **Your KDP listing copy, keywords and categories.** If you paste them, or the two ASINs, I'll audit them next — KDP keywords are the highest-leverage free ranking asset you have.
- **Your registrar/DNS panel:** whether cozycreationsbyautumn.dev is registered to you, when it renews, and where it points.
- **Keyword volumes.** There are no paid SEO tools in a zero-dollar budget, so every keyword suggestion in this audit is an informed hypothesis, not a measured search volume. Search Console's own query report is the honest free substitute once the site is live.

---

## 6. What I need from you to finish this audit

1. The correct address, if it isn't cozycreationsbyautumn.dev — or confirmation that the domain still needs to be registered or renewed.
2. Either your book page URL or the text of your current site's pages, so I can audit the real copy rather than a brief.
3. Read-only access to Search Console and analytics, or an export/screenshot of each — whichever is easier for you.
4. The two Amazon ASINs and your current KDP title, subtitle, description and keyword list.

Nothing has been published, changed or purchased. Every fix above is a recommendation awaiting your approval.
