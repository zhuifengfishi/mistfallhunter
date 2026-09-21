/**
 * Parse Accept and decide whether text/markdown should be served.
 * Markdown only when text/markdown is listed with q > 0 and ranks
 * at least as high as text/html. Wildcards alone keep HTML.
 */
export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader || !acceptHeader.trim()) return false;

  type Part = { type: string; q: number };
  const parts: Part[] = [];
  for (const raw of acceptHeader.split(",")) {
    const segments = raw.trim().split(";");
    const type = (segments[0] || "").trim().toLowerCase();
    if (!type) continue;
    let q = 1;
    for (let i = 1; i < segments.length; i++) {
      const eq = segments[i].indexOf("=");
      if (eq === -1) continue;
      const k = segments[i].slice(0, eq).trim().toLowerCase();
      const v = segments[i].slice(eq + 1).trim();
      if (k === "q") {
        const parsed = Number(v);
        q = Number.isFinite(parsed) ? parsed : 1;
      }
    }
    parts.push({ type, q });
  }

  const md = parts.find((p) => p.type === "text/markdown");
  if (!md || md.q <= 0) return false;

  const html = parts.find((p) => p.type === "text/html");
  if (html && html.q > 0 && md.q < html.q) return false;
  return true;
}

/** Rough token estimate for x-markdown-tokens (~4 chars/token). */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}
