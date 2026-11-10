export const STATUSES = [
  "Not Started",
  "Learning",
  "Practicing",
  "Blocked",
  "Done",
] as const;

export type Status = (typeof STATUSES)[number];

export type Owner = "developer-a" | "developer-b" | "unassigned";

export interface Contributor {
  id: "developer-a" | "developer-b";
  name: string;
  focus: string;
}

export interface Phase {
  id: string;
  title: string;
  weekRange?: string;
  deliverable: string;
  summary?: string;
  topicCount?: number;
  estimatedLearningHours?: number;
  estimatedImplementationHours?: number;
}

export interface Milestone {
  id: string;
  title: string;
  phase: string;
  week?: number;
  criteria?: string[];
}

export interface Topic {
  id: string;
  title: string;
  phase: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedLearningHours: number;
  estimatedImplementationHours: number;
  dependencies: string[];
  defaultOwner: "developer-a" | "developer-b";
  designation: "mvp" | "advanced";
  learningDoc: string;
  handsOnDeliverable: string;
  definitionOfDone: string[];
}

export interface Registry {
  schemaVersion: number;
  project: string;
  statuses: string[];
  contributors: Contributor[];
  doneMeans?: string[];
  phases: Phase[];
  milestones: Milestone[];
  topics: Topic[];
}

export interface TopicProgress {
  status: Status;
  owner: Owner;
  notes: string;
  completionDate: string | null;
}

export interface ProgressFile {
  schemaVersion: 1;
  format: "agent-builder-progress";
  exportedAt?: string;
  note?: string;
  topics: Record<string, TopicProgress>;
}
