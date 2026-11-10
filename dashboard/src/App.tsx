import { useEffect, useMemo, useState } from "react";
import yaml from "js-yaml";
import type {
  Owner,
  ProgressFile,
  Registry,
  Status,
  Topic,
  TopicProgress,
} from "./types";
import { STATUSES } from "./types";
import {
  applyStatus,
  buildExport,
  defaultProgressMap,
  emptyProgress,
  validateAndMergeProgress,
} from "./lib/progress";
import {
  THEME_KEY,
  downloadText,
  loadLocalProgress,
  saveLocalProgress,
} from "./lib/storage";
import { currentMilestone, ownerStats, phaseCompletion, remainingHours } from "./lib/metrics";
import { parseYamlOrJson, toYaml } from "./lib/yaml";

type View = "overview" | "roadmap";

function docHref(path: string): string {
  const github = "https://github.com/Poonamm1/agent-foundry/blob/main/";
  return github + path;
}

function statusClass(status: Status): string {
  return `s-${status.replace(/ /g, "")}`;
}

export default function App() {
  const [registry, setRegistry] = useState<Registry | null>(null);
  const [progress, setProgress] = useState<Record<string, TopicProgress>>({});
  const [view, setView] = useState<View>("overview");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [ownerFilter, setOwnerFilter] = useState<Owner | "all">("all");
  const [selected, setSelected] = useState<Topic | null>(null);
  const [importMsg, setImportMsg] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loadError, setLoadError] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}roadmap/topics.yaml`)
      .then((r) => {
        if (!r.ok) throw new Error(`Could not load topics.yaml (${r.status})`);
        return r.text();
      })
      .then((text) => {
        const data = yaml.load(text) as Registry;
        setRegistry(data);
        setProgress(loadLocalProgress(data.topics));
      })
      .catch((err: Error) => setLoadError(err.message));
  }, []);

  useEffect(() => {
    if (registry) saveLocalProgress(progress);
  }, [progress, registry]);

  const topics = registry?.topics ?? [];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return topics.filter((t) => {
      const row = progress[t.id];
      if (statusFilter !== "all" && row?.status !== statusFilter) return false;
      const owner = row?.owner ?? t.defaultOwner;
      if (ownerFilter !== "all" && owner !== ownerFilter) return false;
      if (!q) return true;
      return (
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });
  }, [topics, progress, query, statusFilter, ownerFilter]);

  if (loadError) return <main className="app"><p className="errors">{loadError}</p></main>;
  if (!registry) return <main className="app"><p>Loading registry…</p></main>;

  const done = topics.filter((t) => progress[t.id]?.status === "Done").length;
  const blocked = topics.filter((t) => progress[t.id]?.status === "Blocked");
  const pct = topics.length ? Math.round((done / topics.length) * 100) : 0;
  const milestone = currentMilestone(registry.milestones, topics, progress);
  const learnLeft = remainingHours(topics, progress, "estimatedLearningHours");
  const implLeft = remainingHours(topics, progress, "estimatedImplementationHours");

  function exportFile(kind: "yaml" | "json") {
    const file: ProgressFile = buildExport(
      progress,
      topics.map((t) => t.id),
    );
    if (kind === "json") {
      downloadText("progress.json", JSON.stringify(file, null, 2) + "\n", "application/json");
    } else {
      downloadText("progress.yaml", toYaml(file), "text/yaml");
    }
  }

  function onImport(file: File) {
    file.text().then((text) => {
      try {
        const raw = parseYamlOrJson(text);
        const result = validateAndMergeProgress(raw, topics, progress);
        if (!result.ok || !result.progress) {
          setImportMsg(result.errors.join(" "));
          return;
        }
        setProgress(result.progress);
        setImportMsg(
          result.warnings.length
            ? `Imported with warnings: ${result.warnings.join(" ")}`
            : "Imported and saved to this browser.",
        );
      } catch (e) {
        setImportMsg(e instanceof Error ? e.message : "Import failed");
      }
    });
  }

  function patch(id: string, update: Partial<TopicProgress> | { status: Status }) {
    setProgress((prev) => {
      const base = prev[id] ?? defaultProgressMap(topics)[id];
      const nextRow =
        "status" in update && update.status
          ? { ...applyStatus(base, update.status), ...update, status: update.status }
          : { ...base, ...update };
      if (nextRow.status !== "Done") nextRow.completionDate = null;
      if (nextRow.status === "Done" && !nextRow.completionDate) {
        nextRow.completionDate = new Date().toISOString().slice(0, 10);
      }
      return { ...prev, [id]: nextRow };
    });
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <h1>Agent Builder Hub</h1>
          <p>Learning roadmap and implementation tracker for a GCP project knowledge agent.</p>
        </div>
        <div className="nav" role="tablist">
          <button aria-current={view === "overview" ? "page" : undefined} onClick={() => setView("overview")}>
            Overview
          </button>
          <button aria-current={view === "roadmap" ? "page" : undefined} onClick={() => setView("roadmap")}>
            Roadmap
          </button>
          <button className="icon-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "Dark" : "Light"} theme
          </button>
        </div>
      </header>

      <p className="notice">
        Progress is stored in <strong>this browser only</strong> (localStorage). It is not committed to GitHub
        automatically and does not sync across devices. Use <strong>Save / Export</strong>, then open a pull
        request for <code>roadmap/progress.yaml</code>. Do not paste GitHub tokens here.
      </p>

      {view === "overview" && (
        <>
          <section className="grid">
            <article className="card">
              <span>Overall completion</span>
              <strong>{pct}%</strong>
              <div className="bar" aria-hidden><i style={{ width: `${pct}%` }} /></div>
            </article>
            <article className="card">
              <span>Topics done</span>
              <strong>{done} / {topics.length}</strong>
            </article>
            <article className="card">
              <span>Learning hours left</span>
              <strong>{learnLeft}</strong>
            </article>
            <article className="card">
              <span>Implementation hours left</span>
              <strong>{implLeft}</strong>
            </article>
            <article className="card">
              <span>Current milestone</span>
              <strong>{milestone ? `${milestone.id} ${milestone.title}` : "—"}</strong>
            </article>
            <article className="card">
              <span>Blocked</span>
              <strong>{blocked.length}</strong>
            </article>
          </section>

          <section className="card">
            <h2>Phase completion</h2>
            {registry.phases.map((p) => {
              const { done: d, total } = phaseCompletion(topics, progress, p.id);
              const width = total ? Math.round((d / total) * 100) : 0;
              return (
                <div key={p.id} style={{ margin: "10px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{p.id} {p.title}</span>
                    <span className="muted">{d}/{total}</span>
                  </div>
                  <div className="bar"><i style={{ width: `${width}%` }} /></div>
                </div>
              );
            })}
          </section>

          <section className="grid" style={{ marginTop: 12 }}>
            {registry.contributors.map((c) => {
              const s = ownerStats(topics, progress, c.id);
              return (
                <article className="card" key={c.id}>
                  <span>{c.name}</span>
                  <strong>{s.done} / {s.assigned}</strong>
                  <p className="muted">{c.focus}</p>
                </article>
              );
            })}
          </section>

          {blocked.length > 0 && (
            <section className="card" style={{ marginTop: 12 }}>
              <h2>Blocked topics</h2>
              <ul>
                {blocked.map((t) => (
                  <li key={t.id}>
                    <button className="topic-btn" onClick={() => { setSelected(t); setView("roadmap"); }}>
                      {t.id} {t.title}
                    </button>
                    {progress[t.id]?.notes ? ` — ${progress[t.id].notes}` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {view === "roadmap" && (
        <>
          <div className="toolbar">
            <input
              aria-label="Search topics"
              placeholder="Search id, title, description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select aria-label="Filter status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | "all")}>
              <option value="all">All statuses</option>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select aria-label="Filter owner" value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value as Owner | "all")}>
              <option value="all">All owners</option>
              <option value="developer-a">Developer A</option>
              <option value="developer-b">Developer B</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>

          {registry.phases.map((phase) => {
            const rows = filtered.filter((t) => t.phase === phase.id);
            if (!rows.length) return null;
            const { done: d, total } = phaseCompletion(topics, progress, phase.id);
            return (
              <details key={phase.id} className="phase" open>
                <summary>
                  <strong>{phase.id} · {phase.title}</strong>
                  <span className="muted">{phase.weekRange} · {d}/{total} done · {phase.deliverable}</span>
                </summary>
                <table>
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th>Status</th>
                      <th>Owner</th>
                      <th>Hours L/I</th>
                      <th>Depends on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((t) => {
                      const row = progress[t.id] ?? emptyProgress(t);
                      return (
                        <tr key={t.id}>
                          <td>
                            <button className="topic-btn" onClick={() => setSelected(t)}>
                              {t.id} {t.title}
                            </button>
                            <div className="muted">{t.designation} · {t.priority}</div>
                          </td>
                          <td>
                            <span className={`pill ${statusClass(row.status)}`}>{row.status}</span>
                          </td>
                          <td>{row.owner}</td>
                          <td>{t.estimatedLearningHours}/{t.estimatedImplementationHours}</td>
                          <td className="muted">{t.dependencies.join(", ") || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </details>
            );
          })}
        </>
      )}

      {selected && (
        <TopicPanel
          topic={selected}
          row={progress[selected.id] ?? emptyProgress(selected)}
          onClose={() => setSelected(null)}
          onPatch={(u) => patch(selected.id, u)}
        />
      )}

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Save / Export Progress</h2>
        <p className="muted">
          Git workflow: export YAML → replace <code>roadmap/progress.yaml</code> on a branch → pull request.
          If both developers export, merge topic-by-topic (latest <code>completionDate</code>, concatenate notes).
        </p>
        <div className="actions">
          <button className="btn primary" onClick={() => exportFile("yaml")}>Export YAML</button>
          <button className="btn" onClick={() => exportFile("json")}>Export JSON</button>
          <label className="btn">
            Import YAML/JSON
            <input
              type="file"
              accept=".yaml,.yml,.json,text/yaml,application/json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onImport(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        {importMsg && <p className={importMsg.startsWith("Imported") ? "ok" : "errors"}>{importMsg}</p>}
      </section>
    </main>
  );
}

function TopicPanel({
  topic,
  row,
  onClose,
  onPatch,
}: {
  topic: Topic;
  row: TopicProgress;
  onClose: () => void;
  onPatch: (u: Partial<TopicProgress>) => void;
}) {
  return (
    <section className="card detail" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <h2>{topic.id} · {topic.title}</h2>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
      <p>{topic.description}</p>
      <p className="muted">
        Phase {topic.phase} · {topic.designation} · {topic.priority} priority · learn {topic.estimatedLearningHours}h · implement {topic.estimatedImplementationHours}h
      </p>
      <p>
        Learning doc:{" "}
        <a href={docHref(topic.learningDoc)} target="_blank" rel="noreferrer">
          {topic.learningDoc}
        </a>
      </p>
      <p><strong>Hands-on:</strong> {topic.handsOnDeliverable}</p>
      <div>
        <strong>Definition of Done</strong>
        <ul>{topic.definitionOfDone.map((d) => <li key={d}>{d}</li>)}</ul>
        <p className="muted">Documentation existing is not Done. You must be able to explain the topic, why it matters, and complete the exercise.</p>
      </div>
      <div className="actions" role="group" aria-label="Set status">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={row.status === s ? "btn primary" : "btn"}
            onClick={() => onPatch({ status: s })}
          >
            {s === "Done" ? "Mark Done" : s === "Not Started" ? "Reopen" : s}
          </button>
        ))}
      </div>
      <label>
        Owner
        <select
          value={row.owner}
          onChange={(e) => onPatch({ owner: e.target.value as Owner })}
          style={{ marginLeft: 8 }}
        >
          <option value="developer-a">Developer A</option>
          <option value="developer-b">Developer B</option>
          <option value="unassigned">Unassigned</option>
        </select>
      </label>
      <label>
        Notes
        <textarea
          rows={3}
          value={row.notes}
          onChange={(e) => onPatch({ notes: e.target.value })}
          style={{ width: "100%", marginTop: 6 }}
        />
      </label>
      {row.completionDate && <p className="muted">Completion date: {row.completionDate}</p>}
    </section>
  );
}
