import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const catalog = readFileSync("src/data/catalog.ts", "utf8");
const productCatalog = catalog.split("export const products: CatalogProduct[] = [")[1]?.split("/* ── Official artwork:")[0] ?? "";
const paths = [...productCatalog.matchAll(/(?:src|coverAsset):\s*"(\/[^"]+\.(?:png|webp))"/g)].map((match) => match[1]);
const unique = new Set(paths);
const failures = [];
if (paths.length !== unique.size) failures.push("Duplicate catalog image paths");
for (const url of unique) {
  if (url.includes("..") || url.startsWith("/public/") || url.startsWith("/src/")) {
    failures.push("Unsafe public image path: " + url);
    continue;
  }
  const file = join("public", url.slice(1));
  if (!existsSync(file) || !statSync(file).isFile()) {
    failures.push("Missing image: " + file);
    continue;
  }
  const data = readFileSync(file);
  const png = data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const webp = data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP";
  if (data.length < 100 || (url.endsWith(".png") && !png) || (url.endsWith(".webp") && !webp)) {
    failures.push("Invalid image bytes: " + file);
  }
}
if (failures.length) {
  for (const failure of failures) console.error("FAIL:", failure);
  process.exitCode = 1;
} else {
  console.log("PASS:", unique.size, "catalog images exist and have valid file signatures");
}
