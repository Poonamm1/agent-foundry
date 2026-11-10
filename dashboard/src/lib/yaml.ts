import yaml from "js-yaml";

export function parseYamlOrJson(text: string): unknown {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return JSON.parse(trimmed);
  }
  return yaml.load(trimmed);
}

export function toYaml(data: unknown): string {
  return yaml.dump(data, { lineWidth: 100, noRefs: true, sortKeys: false });
}
