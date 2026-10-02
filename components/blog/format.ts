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
