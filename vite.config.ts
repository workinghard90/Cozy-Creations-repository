import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { products, collections } from "./src/data/catalog";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), {
    name: "cozy-public-companion-contract",
    generateBundle(_options, bundle) {
      // Explicit allowlist of already-public data; never spread project/env objects.
      const catalog = products.map(p => ({
        slug: p.slug, collection: p.collectionId, title: p.title, status: p.status,
        path: p.collectionId === "artwork-and-gifts" ? "/artwork-and-gifts" : `/books/${p.collectionId}/${p.slug}`,
        amazonUrl: p.status === "available" ? p.amazonUrl ?? null : null,
        coverAsset: p.coverAsset ?? null,
        sampleAssets: (p.sampleAssets ?? []).map(a => a.src),
      }));
      const assets = new Set([
        ...Object.keys(bundle).filter(name => /\.(js|css|png|webp|svg)$/.test(name)).map(name => "/" + name),
        ...catalog.flatMap(p => [...(p.coverAsset ? [p.coverAsset] : []), ...p.sampleAssets]),
      ]);
      this.emitFile({ type: "asset", fileName: "companion-manifest.json", source: JSON.stringify({
        schemaVersion: 1,
        products: catalog,
        routes: [...new Set(["/", "/about", "/contact", "/privacy", "/artwork-and-gifts", "/pips-cloud-magic", "/books-and-logbooks",
          ...collections.filter(c => c.id !== "artwork-and-gifts").map(c => `/books/${c.slug}`), ...catalog.map(p => p.path)])],
        assets: [...assets].sort(),
      }, null, 2) + "\n" });
    },
  }],
  build: { outDir: "dist" },
});
