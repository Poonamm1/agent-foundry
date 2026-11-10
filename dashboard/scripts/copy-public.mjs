import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dashboardRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(dashboardRoot, "..");
const pub = join(dashboardRoot, "public");

const roadmapOut = join(pub, "roadmap");
rmSync(roadmapOut, { recursive: true, force: true });
mkdirSync(roadmapOut, { recursive: true });
for (const name of ["topics.yaml", "progress.yaml", "progress.example.yaml"]) {
  cpSync(join(repoRoot, "roadmap", name), join(roadmapOut, name));
}

const docsOut = join(pub, "docs");
rmSync(docsOut, { recursive: true, force: true });
cpSync(join(repoRoot, "docs"), docsOut, { recursive: true });

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith(".md")) acc.push(relative(pub, full).split("\\").join("/"));
  }
  return acc;
}

const docs = walk(docsOut).sort();
writeFileSync(
  join(pub, "docs-index.json"),
  `${JSON.stringify(
    {
      architecture: docs.filter((path) => path.startsWith("docs/architecture/")),
      connectors: docs.filter((path) => path.startsWith("docs/connectors/")),
      learning: docs.filter((path) => path.startsWith("docs/learning/")),
    },
    null,
    2,
  )}\n`,
);
