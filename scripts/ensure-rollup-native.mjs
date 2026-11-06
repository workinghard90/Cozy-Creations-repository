/**
 * Repair a missing Linux Rollup native optional dependency before a Vite build.
 *
 * Cloudflare Workers Builds currently installs dependencies with Bun 1.4.4,
 * then invokes "npm run build". On that build image, the package tree can
 * omit @rollup/rollup-linux-x64-gnu even though rollup itself is installed.
 *
 * This script intentionally does NOT choose a Rollup version independently:
 * it reads the exact installed version, and is a no-op if the native package
 * exists. Other architectures/platforms remain unchanged.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const require = createRequire(import.meta.url);
if (process.platform !== "linux" || process.arch !== "x64") process.exit(0);
if (!process.report?.getReport()?.header?.glibcVersionRuntime) process.exit(0);

const name = "@rollup/rollup-linux-x64-gnu";
try {
  require.resolve(name);
  process.exit(0);
} catch (err) {
  if (err?.code !== "MODULE_NOT_FOUND") throw err;
}

const pkg = JSON.parse(readFileSync(resolve("node_modules/rollup/package.json"), "utf8"));
if (!/^[0-9]+[.][0-9]+[.][0-9]+/.test(pkg.version)) {
  throw new Error("Unexpected installed Rollup version; refusing to guess native package version");
}
console.log(`[rollup-native] Missing ${name}; installing exact version ${pkg.version} before Vite build`);
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npm, [
  "install", "--no-save", "--no-package-lock", "--no-audit", "--no-fund",
  "--include=optional", "--ignore-scripts", `${name}@${pkg.version}`,
], { stdio: "inherit", shell: false });
if (result.error || result.status !== 0) {
  throw new Error(`Cannot install matching Rollup native package: ${result.error?.message ?? result.status}`);
}
// Resolve again in a fresh Node process: the original module loader may
// cache a negative lookup made before npm installed the native package.
const verify = spawnSync(process.execPath, ["-e", `require.resolve("${name}")`], {
  stdio: "inherit", shell: false,
});
if (verify.error || verify.status !== 0) {
  throw new Error(`Rollup native package ${name}@${pkg.version} is still missing after install`);
}
console.log("[rollup-native] Native dependency verified");
