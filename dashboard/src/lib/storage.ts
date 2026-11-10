import type { ProgressFile, Topic, TopicProgress } from "../types";
import { defaultProgressMap } from "./progress";

export const STORAGE_KEY = "agent-builder.progress.v1";
export const THEME_KEY = "agent-builder.theme";

export interface StoredBundle {
  version: 1;
  progress: Record<string, TopicProgress>;
  savedAt: string;
}

export function loadLocalProgress(topics: Topic[]): Record<string, TopicProgress> {
  const fallback = defaultProgressMap(topics);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as StoredBundle;
    if (parsed.version !== 1 || typeof parsed.progress !== "object") return fallback;
    return { ...fallback, ...parsed.progress };
  } catch {
    return fallback;
  }
}

export function saveLocalProgress(progress: Record<string, TopicProgress>): void {
  const bundle: StoredBundle = {
    version: 1,
    progress,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
}

export function downloadText(filename: string, text: string, mime: string): void {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function toPrettyJson(file: ProgressFile): string {
  return `${JSON.stringify(file, null, 2)}\n`;
}

/** Placeholder for a future authenticated GitHub sync client. */
export interface ProgressSyncClient {
  pull(): Promise<ProgressFile>;
  push(file: ProgressFile): Promise<void>;
}

export function githubSyncNotImplemented(): ProgressSyncClient {
  return {
    async pull() {
      throw new Error("GitHub sync is not enabled. Export YAML and open a pull request.");
    },
    async push() {
      throw new Error("GitHub sync is not enabled. Export YAML and open a pull request.");
    },
  };
}
