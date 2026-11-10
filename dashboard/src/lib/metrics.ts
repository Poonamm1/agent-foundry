import type { Milestone, Topic, TopicProgress } from "../types";

export function remainingHours(
  topics: Topic[],
  progress: Record<string, TopicProgress>,
  field: "estimatedLearningHours" | "estimatedImplementationHours",
): number {
  return topics.reduce((sum, t) => {
    const done = progress[t.id]?.status === "Done";
    return done ? sum : sum + t[field];
  }, 0);
}

export function phaseCompletion(
  topics: Topic[],
  progress: Record<string, TopicProgress>,
  phaseId: string,
): { done: number; total: number } {
  const rows = topics.filter((t) => t.phase === phaseId);
  return {
    total: rows.length,
    done: rows.filter((t) => progress[t.id]?.status === "Done").length,
  };
}

export function currentMilestone(
  milestones: Milestone[],
  topics: Topic[],
  progress: Record<string, TopicProgress>,
): Milestone | null {
  for (const ms of milestones) {
    const { done, total } = phaseCompletion(topics, progress, ms.phase);
    if (total === 0 || done < total) return ms;
  }
  return milestones[milestones.length - 1] ?? null;
}

export function ownerStats(
  topics: Topic[],
  progress: Record<string, TopicProgress>,
  ownerId: string,
) {
  const assigned = topics.filter((t) => (progress[t.id]?.owner ?? t.defaultOwner) === ownerId);
  const done = assigned.filter((t) => progress[t.id]?.status === "Done").length;
  return { assigned: assigned.length, done };
}
