import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";
import { readFileSync, existsSync } from "fs";

const root = new URL("../../", import.meta.url).pathname;

/** Check if a package has a "solid" export condition in its package.json */
function hasSolidExport(pkg) {
  if (pkg.startsWith("solid-js") || pkg.startsWith("@astrojs/")) return false;
  const name = pkg.startsWith("@") ? pkg.split("/").slice(0, 2).join("/") : pkg.split("/")[0];
  // Check both direct and pnpm hoisted locations
  const candidates = [
    root + "node_modules/" + name + "/package.json",
    root + "node_modules/.pnpm/node_modules/" + name + "/package.json",
  ];
  for (const p of candidates) {
    try {
      if (!existsSync(p)) continue;
      return JSON.stringify(JSON.parse(readFileSync(p, "utf8")).exports || {}).includes('"solid"');
    } catch {
      continue;
    }
  }
  return false;
}

/**
 * vite-plugin-solid adds "solid" to resolve.conditions and puts every package
 * with a "solid" export into optimizeDeps.exclude. This means @kobalte, @corvu
 * and all their transitive Solid deps are served as hundreds of individual raw
 * .jsx files—extremely slow in dev.
 *
 * Fix: remove the "solid" condition (so libs resolve to pre-compiled .js) and
 * pull those libs OUT of exclude so Vite pre-bundles them into single files.
 * solid-js itself stays untouched (in include + dedupe by vite-plugin-solid),
 * so pre-bundled libs externalise their solid-js imports → same instance.
 */
function fixKobaltePerf() {
  return {
    name: "fix-kobalte-perf",
    enforce: "post",
    configEnvironment(_name, config) {
      if (config.resolve?.conditions) {
        config.resolve.conditions = config.resolve.conditions.filter((c) => c !== "solid");
      }
      if (config.optimizeDeps?.exclude) {
        config.optimizeDeps.exclude = config.optimizeDeps.exclude.filter(
          (pkg) => !hasSolidExport(pkg),
        );
      }
    },
    configResolved(config) {
      const idx = config.resolve.conditions.indexOf("solid");
      if (idx !== -1) config.resolve.conditions.splice(idx, 1);
      if (config.optimizeDeps?.exclude) {
        for (let i = config.optimizeDeps.exclude.length - 1; i >= 0; i--) {
          if (hasSolidExport(config.optimizeDeps.exclude[i])) {
            config.optimizeDeps.exclude.splice(i, 1);
          }
        }
      }
    },
  };
}

export default defineConfig({
  site: "https://munenick.github.io",
  base: "/omni-ui",
  integrations: [
    react({ include: ["**/demos/react/**", "**/components/react-*"] }),
    solidJs({
      include: ["**/demos/solid/**", "**/components/solid-*", "**/registry/solid/**"],
    }),
  ],
  vite: {
    plugins: [fixKobaltePerf()],
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
});
