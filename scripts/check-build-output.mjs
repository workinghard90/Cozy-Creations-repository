import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "dist";
const failures = [];
const htmlPath = join(root, "index.html");
if (!existsSync(htmlPath) || !statSync(htmlPath).isFile()) {
  failures.push("Missing generated index.html");
} else {
  const html = readFileSync(htmlPath, "utf8");
  if (!html.includes("<html") || !html.includes("<div id=\"root\"")) {
    failures.push("Generated index.html is missing the HTML shell or React root");
  }
}
const assetDir = join(root, "assets");
if (!existsSync(assetDir) || !statSync(assetDir).isDirectory()) {
  failures.push("Missing generated assets directory");
} else {
  const assets = readdirSync(assetDir);
  if (!assets.some((name) => name.endsWith(".js"))) failures.push("No generated JavaScript bundle");
  if (!assets.some((name) => name.endsWith(".css"))) failures.push("No generated CSS bundle");
}
if (!existsSync(join(root, "robots.txt"))) failures.push("Missing robots.txt");
else if (!readFileSync(join(root, "robots.txt"), "utf8").includes("Disallow: /")) {
  failures.push("Prelaunch robots.txt must continue to disallow indexing");
}
for (const file of ["covers/pips-cloud-magic-coloring-book.png", "covers/vehicle-maintenance-logbook.png"]) {
  if (!existsSync(join(root, file))) failures.push("Missing deployed cover: " + file);
}
const manifestPath = join(root, "companion-manifest.json");
try {
  const m = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (m.schemaVersion !== 1 || !m.products?.length || !m.routes?.includes("/contact")) throw new Error("invalid public companion contract");
  if (Object.keys(m).sort().join() !== "assets,products,routes,schemaVersion") throw new Error("unexpected manifest fields");
  for (const asset of m.assets) {
    if (!asset.startsWith("/") || asset.includes("..") || !existsSync(join(root, asset.slice(1)))) throw new Error("missing/unsafe manifest asset: " + asset);
  }
  for (const p of m.products) {
    if (p.status !== "available" && p.amazonUrl !== null) throw new Error("unreleased purchase link exposed");
    if (!m.routes.includes(p.path)) throw new Error("product path missing from contract");
  }
} catch (e) { failures.push("Companion manifest: " + e.message); }
if (failures.length) {
  for (const failure of failures) console.error("FAIL:", failure);
  process.exitCode = 1;
} else {
  console.log("PASS: generated storefront, assets, covers, and prelaunch indexing guard verified");
}
