/** Canonical origin for Mistfall Hunter agent-facing surfaces. */
export const ORIGIN = "https://mistfall-hunter.net";
export const SITE_NAME = "Mistfall Hunter Wiki";
export const SITE_TAGLINE =
  "Unofficial Mistfall Hunter wiki with practical class, combat, extraction, cipher, and Gyldenmist guides. Fan site — not affiliated with Bellring Games.";

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Session-Id",
};

export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  return new Response(JSON.stringify(data, null, 2) + "\n", { ...init, headers });
}

export function textResponse(
  body: string,
  contentType: string,
  init: ResponseInit = {},
): Response {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", contentType);
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  return new Response(body, { ...init, headers });
}

/** Link header value for HTML page responses (RFC 8288). */
export const AGENT_LINK_HEADER = [
  `<${ORIGIN}/.well-known/api-catalog>; rel="api-catalog"`,
  `<${ORIGIN}/openapi.json>; rel="service-desc"; type="application/json"`,
  `<${ORIGIN}/llms.txt>; rel="service-doc"; type="text/plain"`,
  `<${ORIGIN}/.well-known/ai-catalog.json>; rel="describedby"; type="application/json"`,
].join(", ");
