import { readFileSync } from "node:fs";

const checks = [
  ["src/routes/__root.tsx", /href="#main-content"/, "Skip-to-content link"],
  ["src/components/SiteHeader.tsx", /aria-expanded=\{open\}/, "Mobile menu expanded state"],
  ["src/components/SiteHeader.tsx", /aria-controls="mobile-menu"/, "Mobile menu control target"],
  ["src/components/SiteHeader.tsx", /event\.key === "Escape"/, "Keyboard Escape dismissal"],
  ["src/components/ArtworkFrame.tsx", /decoding="async"/, "Asynchronous artwork decoding"],
  ["src/components/ArtworkFrame.tsx", /loading=\{loading\}/, "Artwork loading strategy"],
  ["src/styles/app.css", /prefers-reduced-motion:\s*reduce/, "Reduced-motion support"],
  ["src/routes/__root.tsx", /display=swap/, "Non-blocking web font display"],
  ["index.html", /<meta name="robots" content="noindex, nofollow"/, "Prelaunch static noindex"],
  ["index.html", /property="og:site_name"/, "Static social sharing fallback"],
  ["src/routes/books/$collection/$product.tsx", /width: 2550, height: 3300/, "Verified Pip preview image dimensions"],
];
let failed = false;
for (const [path, pattern, label] of checks) {
  const source = readFileSync(path, "utf8");
  if (!pattern.test(source)) {
    console.error("FAIL:", label, "in", path);
    failed = true;
  }
}
if (failed) process.exitCode = 1;
else console.log("PASS: launch accessibility and performance source guards");
