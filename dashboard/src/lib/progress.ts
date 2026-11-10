import type { Owner, ProgressFile, Status, Topic, TopicProgress } from "../types";
import { STATUSES } from "../types";

export const PROGRESS_FORMAT = "agent-builder-progress" as const;

const STATUS_SET = new Set<string>(STATUSES);
const OWNER_SET = new Set<Owner>(["developer-a", "developer-b", "unassigned"]);

export function emptyProgress(topic: Topic): TopicProgress {
  return {
    status: "Not Started",
    owner: topic.defaultOwner,
    notes: "",
    completionDate: null,
  };
}

export function defaultProgressMap(topics: Topic[]): Record<string, TopicProgress> {
  return Object.fromEntries(topics.map((t) => [t.id, emptyProgress(t)]));
}

export function buildExport(
  map: Record<string, TopicProgress>,
  topicIds: string[],
): ProgressFile {
  const topics: Record<string, TopicProgress> = {};
  for (const id of topicIds) {
    const row = map[id];
    if (row) topics[id] = row;
  }
  return {
    schemaVersion: 1,
    format: PROGRESS_FORMAT,
    exportedAt: new Date().toISOString(),
    note: "Mutable progress only. Topic definitions live in topics.yaml.",
    topics,
  };
}

export interface ImportResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
  progress: Record<string, TopicProgress> | null;
}

export function validateAndMergeProgress(
  raw: unknown,
  topics: Topic[],
  current: Record<string, TopicProgress>,
): ImportResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const known = new Set(topics.map((t) => t.id));

  if (raw === null || typeof raw !== "object") {
    return { ok: false, errors: ["Progress file must be an object."], warnings, progress: null };
  }
  const file = raw as Record<string, unknown>;
  if (file.schemaVersion !== 1) {
    errors.push("schemaVersion must be 1.");
  }
  if (file.format !== undefined && file.format !== PROGRESS_FORMAT) {
    errors.push(`format must be "${PROGRESS_FORMAT}".`);
  }
  if (file.topics === null || typeof file.topics !== "object" || Array.isArray(file.topics)) {
    errors.push("topics must be a map of topic id to progress.");
    return { ok: false, errors, warnings, progress: null };
  }

  const incoming = file.topics as Record<string, unknown>;
  const next: Record<string, TopicProgress> = { ...current };

  for (const [id, value] of Object.entries(incoming)) {
    if (!known.has(id)) {
      warnings.push(`Unknown topic id ignored: ${id}`);
      continue;
    }
    if (value === null || typeof value !== "object") {
      errors.push(`${id}: progress row must be an object.`);
      continue;
    }
    const row = value as Record<string, unknown>;
    if (typeof row.status !== "string" || !STATUS_SET.has(row.status)) {
      errors.push(`${id}: invalid status.`);
      continue;
    }
    let owner: Owner = current[id]?.owner ?? "unassigned";
    if (row.owner !== undefined) {
      if (typeof row.owner !== "string" || !OWNER_SET.has(row.owner as Owner)) {
        errors.push(`${id}: invalid owner.`);
        continue;
      }
      owner = row.owner as Owner;
    }
    const notes = typeof row.notes === "string" ? row.notes : current[id]?.notes ?? "";
    let completionDate: string | null = current[id]?.completionDate ?? null;
    if (row.completionDate === null) completionDate = null;
    else if (typeof row.completionDate === "string") completionDate = row.completionDate;

    const status = row.status as Status;
    next[id] = {
      status,
      owner,
      notes,
      completionDate: status === "Done" ? completionDate ?? new Date().toISOString().slice(0, 10) : null,
    };
  }

  if (errors.length) return { ok: false, errors, warnings, progress: null };
  return { ok: true, errors, warnings, progress: next };
}

export function applyStatus(
  row: TopicProgress,
  status: Status,
): TopicProgress {
  const completionDate =
    status === "Done" ? new Date().toISOString().slice(0, 10) : null;
  return { ...row, status, completionDate };
}
