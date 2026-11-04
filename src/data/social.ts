/**
 * The owner's official social profiles — one source of truth for every social
 * link on the site (the footer row and the homepage invitation section).
 *
 * LINKS ONLY. These are plain anchors: nothing is embedded, and no platform
 * script, iframe, pixel or widget is loaded. No request ever reaches Instagram
 * or TikTok until a visitor taps a link, which is why the Privacy Policy stays
 * accurate without a third-party-tracking section.
 *
 * The URLs are exactly as the owner supplied and verified them. The TikTok
 * handle really is spelled "enchaned" (a single "n") — that is the live account
 * URL. Do not "correct" it to "enchanted"; that address does not exist. The
 * account's display name on both platforms is "wonderfullyenchantedchaos".
 */

export type SocialId = "instagram" | "tiktok";

export type SocialProfile = {
  id: SocialId;
  /** Platform name, as visitors know it. */
  platform: string;
  /** Handle exactly as it appears in the profile URL, including the "@". */
  handle: string;
  /** Verified profile URL — never edit or shorten. */
  url: string;
};

export const socialProfiles: readonly SocialProfile[] = [
  {
    id: "instagram",
    platform: "Instagram",
    handle: "@wonderfullyenchantedchaos",
    url: "https://www.instagram.com/wonderfullyenchantedchaos/",
  },
  {
    id: "tiktok",
    platform: "TikTok",
    handle: "@wonderfullyenchanedchaos",
    url: "https://www.tiktok.com/@wonderfullyenchanedchaos",
  },
];
