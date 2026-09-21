import { ORIGIN, SITE_NAME, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse(
    {
      serverInfo: {
        name: "mistfall-hunter-lookup",
        version: "1.0.0",
        title: `${SITE_NAME} Lookup`,
      },
      description:
        "Read-only lookup of Mistfall Hunter Wiki public guides and classes.",
      protocolVersion: "2025-03-26",
      transport: { type: "streamable-http", endpoint: `${ORIGIN}/mcp` },
      capabilities: { tools: { listChanged: false } },
    },
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
