export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// The newest post is featured above the grid; the rest paginate 9 per page
// (three rows of three).
export const POSTS_PER_PAGE = 9;

type LexicalNode = { text?: string; children?: LexicalNode[] };

/** Minutes to read a Lexical document, at ~200 words per minute. */
export function readingMinutes(content: unknown): number {
  const words: string[] = [];
  const walk = (node: LexicalNode | undefined) => {
    if (!node) return;
    if (node.text) words.push(...node.text.split(/\s+/).filter(Boolean));
    node.children?.forEach(walk);
  };
  walk((content as { root?: LexicalNode })?.root);
  return Math.max(1, Math.round(words.length / 200));
}

// Blog topics, in filter order. Values match the posts collection's `topic` select.
export const topics = [
  { value: "estrategia", label: "Estrategia" },
  { value: "metricas", label: "Métricas" },
  { value: "formatos", label: "Formatos" },
  { value: "categorias", label: "Categorías" },
  { value: "creative-tech", label: "Creative Tech" },
] as const;
export type TopicValue = (typeof topics)[number]["value"];
export const topicLabel = (value?: string | null) => topics.find((t) => t.value === value)?.label;

/** "6 oct 2026" style date for tracked mono labels. */
export const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).replace(".", "");
