import { describe, expect, it } from "vitest";
import { resolveDocPath } from "./docs";

describe("resolveDocPath", () => {
  it("resolves a sibling markdown link", () => {
    expect(resolveDocPath("docs/architecture/README.md", "./vision.md")).toBe(
      "docs/architecture/vision.md",
    );
  });

  it("resolves a parent directory link to its readme", () => {
    expect(resolveDocPath("docs/architecture/README.md", "../connectors/")).toBe(
      "docs/connectors/README.md",
    );
  });

  it("leaves external links alone", () => {
    expect(resolveDocPath("docs/architecture/README.md", "https://adk.dev/")).toBeNull();
  });
});
