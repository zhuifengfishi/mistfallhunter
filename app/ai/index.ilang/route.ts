import { ORIGIN, SITE_NAME, textResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  const body = [
    "::ILANG::v5.0",
    `[TYPE:ai_index][PROJECT:${SITE_NAME.replace(/ /g, "")}][VERSION:1.0.0][DATE:2026-09-21][LANG:en]`,
    "",
    "::MODULE{HOST}",
    `  [NAME] ${SITE_NAME}`,
    `  [ORIGIN] ${ORIGIN}`,
    "  [ROLE] Unofficial Mistfall Hunter wiki — public guides and class orientation",
    "::MODULE{ENTRYPOINTS}",
    `  [DOC] ${ORIGIN}/llms.txt`,
    `  [DOC] ${ORIGIN}/llms-full.txt`,
    `  [API] ${ORIGIN}/api/lookup`,
    `  [OPENAPI] ${ORIGIN}/openapi.json`,
    `  [CATALOG] ${ORIGIN}/.well-known/api-catalog`,
    `  [MCP] ${ORIGIN}/mcp`,
    `  [MCP_CARD] ${ORIGIN}/.well-known/mcp/server-card.json`,
    `  [SKILLS] ${ORIGIN}/.well-known/agent-skills/index.json`,
    `  [ARD] ${ORIGIN}/.well-known/ai-catalog.json`,
    `  [AUTH] ${ORIGIN}/auth.md`,
    `  [PAGES] ${ORIGIN}/pages-index.json`,
    "::ILANG::COMPLETE::",
    "",
  ].join("\n");

  return textResponse(body, "text/plain; charset=utf-8", {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
