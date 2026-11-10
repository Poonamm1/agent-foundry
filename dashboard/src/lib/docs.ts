export interface DocIndex {
  architecture: string[];
  connectors: string[];
  learning: string[];
}

export function resolveDocPath(current: string, href: string): string | null {
  if (!href || href.startsWith("http:") || href.startsWith("https:") || href.startsWith("mailto:") || href.startsWith("#")) {
    return null;
  }
  let pathPart = href.split("#")[0];
  if (!pathPart) return null;
  if (pathPart.endsWith("/")) pathPart += "README.md";
  if (!pathPart.endsWith(".md")) return null;

  const parts = current.split("/").slice(0, -1);
  for (const segment of pathPart.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") parts.pop();
    else parts.push(segment);
  }
  return parts.join("/");
}

export function docLabel(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "").replace(/-/g, " ");
}
