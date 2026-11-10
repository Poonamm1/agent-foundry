import { describe, expect, it } from "vitest";
import { defaultProgressMap, validateAndMergeProgress } from "./lib/progress";
import type { Topic } from "./types";

const topics: Topic[] = [
  {
    id: "P0-T01",
    title: "Vision",
    phase: "P0",
    description: "d",
    priority: "high",
    estimatedLearningHours: 1,
    estimatedImplementationHours: 1,
    dependencies: [],
    defaultOwner: "developer-a",
    designation: "mvp",
    learningDoc: "docs/learning/P0/x.md",
    handsOnDeliverable: "doc",
    definitionOfDone: ["explained"],
  },
];

describe("progress import", () => {
  it("accepts a valid progress document", () => {
    const current = defaultProgressMap(topics);
    const result = validateAndMergeProgress(
      {
        schemaVersion: 1,
        format: "agent-builder-progress",
        topics: {
          "P0-T01": { status: "Learning", owner: "developer-b", notes: "started" },
        },
      },
      topics,
      current,
    );
    expect(result.ok).toBe(true);
    expect(result.progress?.["P0-T01"].status).toBe("Learning");
    expect(result.progress?.["P0-T01"].owner).toBe("developer-b");
  });

  it("rejects invalid status", () => {
    const result = validateAndMergeProgress(
      { schemaVersion: 1, topics: { "P0-T01": { status: "Finished" } } },
      topics,
      defaultProgressMap(topics),
    );
    expect(result.ok).toBe(false);
  });

  it("warns on unknown topic ids", () => {
    const result = validateAndMergeProgress(
      { schemaVersion: 1, topics: { "P9-T99": { status: "Done" } } },
      topics,
      defaultProgressMap(topics),
    );
    expect(result.ok).toBe(true);
    expect(result.warnings[0]).toMatch(/Unknown topic/);
  });
});
