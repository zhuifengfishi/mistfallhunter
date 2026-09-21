import { ORIGIN, SITE_NAME, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

const spec = {
  openapi: "3.1.0",
  info: {
    title: `${SITE_NAME} Public Lookup API`,
    version: "1.0.0",
    description:
      "Read-only lookup of Mistfall Hunter Wiki public guides and classes. Unofficial fan wiki — not affiliated with Bellring Games.",
  },
  servers: [{ url: ORIGIN }],
  paths: {
    "/api/health": {
      get: {
        operationId: "getHealth",
        summary: "Liveness check",
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    service: { type: "string" },
                    origin: { type: "string" },
                    status: { type: "string" },
                    time: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/lookup": {
      get: {
        operationId: "lookupRecords",
        summary: "Look up public guides and classes",
        parameters: [
          {
            name: "q",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Free-text search query",
          },
          {
            name: "kind",
            in: "query",
            required: false,
            schema: { type: "string", enum: ["guide", "class", "all"] },
            description: "Record kind filter",
          },
          {
            name: "id",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Exact guide slug or class id",
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 50, default: 10 },
          },
        ],
        responses: {
          "200": {
            description: "Matches found",
            content: { "application/json": { schema: { type: "object" } } },
          },
          "404": {
            description: "No match",
            content: { "application/json": { schema: { type: "object" } } },
          },
        },
      },
    },
  },
};

export function GET() {
  return jsonResponse(spec, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}

export function OPTIONS() {
  return jsonResponse({ ok: true });
}
