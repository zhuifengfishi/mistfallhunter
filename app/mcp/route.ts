import { NextRequest } from "next/server";
import { lookupRecords } from "@/lib/agent/lookup";
import { CORS_HEADERS, ORIGIN, SITE_NAME, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

const PROTOCOL_VERSION = "2025-03-26";

const TOOLS = [
  {
    name: "lookup_records",
    description:
      "Look up Mistfall Hunter Wiki public guides and classes. Returns titles, descriptions, and source URLs.",
    inputSchema: {
      type: "object",
      properties: {
        q: { type: "string", description: "Free-text search query" },
        kind: {
          type: "string",
          enum: ["guide", "class", "all"],
          description: "Record kind filter",
        },
        id: {
          type: "string",
          description: "Exact guide slug or class id (e.g. mercenary, ciphers)",
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 50,
          description: "Max results (default 10)",
        },
      },
    },
  },
];

type JsonRpc = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

function rpcResult(id: string | number | null | undefined, result: unknown) {
  return jsonResponse({ jsonrpc: "2.0", id: id ?? null, result });
}

function rpcError(
  id: string | number | null | undefined,
  code: number,
  message: string,
) {
  return jsonResponse({
    jsonrpc: "2.0",
    id: id ?? null,
    error: { code, message },
  });
}

export async function POST(req: NextRequest) {
  let body: JsonRpc;
  try {
    body = (await req.json()) as JsonRpc;
  } catch {
    return rpcError(null, -32700, "Parse error");
  }

  const method = body.method || "";
  const id = body.id ?? null;
  const params = body.params || {};

  if (method === "initialize") {
    return rpcResult(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "mistfall-hunter-lookup", version: "1.0.0" },
      instructions: `Public read-only lookup for ${SITE_NAME}. Use lookup_records. Cite returned URLs. OAuth is coming soon and unavailable.`,
    });
  }

  if (method === "notifications/initialized" || method === "initialized") {
    return new Response(null, { status: 202, headers: CORS_HEADERS });
  }

  if (method === "tools/list") {
    return rpcResult(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const name = String(params.name || "");
    const args = (params.arguments || {}) as Record<string, unknown>;
    if (name !== "lookup_records") {
      return rpcError(id, -32602, `Unknown tool: ${name}`);
    }
    const result = lookupRecords({
      q: typeof args.q === "string" ? args.q : undefined,
      kind: typeof args.kind === "string" ? args.kind : undefined,
      id: typeof args.id === "string" ? args.id : undefined,
      limit: typeof args.limit === "number" ? args.limit : undefined,
    });
    return rpcResult(id, {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
      isError: !result.ok,
    });
  }

  if (method === "ping") {
    return rpcResult(id, {});
  }

  return rpcError(id, -32601, `Method not found: ${method}`);
}

export function GET() {
  return jsonResponse({
    name: "mistfall-hunter-lookup",
    version: "1.0.0",
    protocolVersion: PROTOCOL_VERSION,
    transport: "streamable-http",
    endpoint: `${ORIGIN}/mcp`,
    tools: TOOLS.map((t) => t.name),
    documentation: `${ORIGIN}/llms.txt`,
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
