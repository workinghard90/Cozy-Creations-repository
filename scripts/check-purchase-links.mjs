import { readFileSync } from "node:fs";
const catalog = readFileSync("src/data/catalog.ts", "utf8");
const detail = readFileSync("src/routes/books/$collection/$product.tsx", "utf8");
const problems = [];
if (!detail.includes('product.status === "available" ? product.amazonUrl : undefined')) problems.push("Purchase URL must require available status");
if (!detail.includes("href={purchaseUrl}")) problems.push("Buy link must use guarded URL");
if (!detail.includes("{purchaseUrl ? (")) problems.push("Buy button must use guarded URL");
if (!detail.includes("{!purchaseUrl ? <p")) problems.push("Unavailable purchase copy must use guarded URL");
const blocks = catalog.split(/\n  \{\n    id: "/).slice(1);
for (const block of blocks) {
  const id = block.split('"')[0];
  const status = block.match(/\bstatus:\s*"([^"]+)"/)?.[1];
  const amazonUrl = block.match(/^\s*amazonUrl:\s*"([^"]+)"/m)?.[1];
  if (status === "available" && !amazonUrl) problems.push(id + " marked available without Amazon URL");
  if (amazonUrl && !/^https:\/\/(www\.)?amazon\.[a-z.]+\//.test(amazonUrl)) problems.push(id + " has invalid Amazon domain");
}
if (problems.length) {
  problems.forEach((message) => console.error("FAIL:", message));
  process.exitCode = 1;
} else {
  console.log("PASS: purchase links remain gated by publication status and valid listing URLs");
}
