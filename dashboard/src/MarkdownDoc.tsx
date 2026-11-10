import { useEffect, useState } from "react";
import { marked } from "marked";
import { resolveDocPath } from "./lib/docs";

export function MarkdownDoc({
  path,
  onNavigate,
}: {
  path: string;
  onNavigate: (path: string) => void;
}) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setError("");
    setHtml("");
    fetch(`${import.meta.env.BASE_URL}${path}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
        return response.text();
      })
      .then(async (text) => {
        const rendered = await marked.parse(text);
        if (!cancelled) setHtml(rendered);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  if (error) return <p className="errors">{error}</p>;
  if (!html) return <p>Loading document…</p>;

  return (
    <article
      className="markdown"
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={(event) => {
        const anchor = (event.target as HTMLElement).closest("a");
        if (!anchor) return;
        const next = resolveDocPath(path, anchor.getAttribute("href") ?? "");
        if (!next) return;
        event.preventDefault();
        onNavigate(next);
      }}
    />
  );
}
