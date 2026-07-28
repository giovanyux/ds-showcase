#!/usr/bin/env node
// Builds site/ (Astro home) into dist/, then builds each package's Storybook
// into dist/<package-name>/, so the home page can link to /<package-name>/.

import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const distDir = join(root, "dist");
const packagesDir = join(root, "packages");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

console.log("→ building site/");
execSync("npm run build --workspace=site", { stdio: "inherit", cwd: root });
cpSync(join(root, "site", "dist"), distDir, { recursive: true });

const packages = existsSync(packagesDir)
  ? readdirSync(packagesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

for (const pkg of packages) {
  const pkgDir = join(packagesDir, pkg);
  const hasStorybookScript = existsSync(join(pkgDir, "package.json"));
  if (!hasStorybookScript) continue;

  console.log(`→ building storybook for ${pkg}`);
  execSync("npm run build-storybook", { stdio: "inherit", cwd: pkgDir });

  const storybookOut = join(pkgDir, "storybook-static");
  if (existsSync(storybookOut)) {
    cpSync(storybookOut, join(distDir, pkg), { recursive: true });
  } else {
    console.warn(`  (skip: no storybook-static/ output for ${pkg})`);
  }
}

console.log(`\nDone. Output in ${distDir}`);
