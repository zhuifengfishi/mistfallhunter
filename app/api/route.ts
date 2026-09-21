import { ORIGIN, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse({
    name: "Mistfall Hunter Wiki API",
    origin: ORIGIN,
    endpoints: [
      { path: "/api/health", method: "GET", summary: "Liveness" },
      {
        path: "/api/lookup",
        method: "GET",
        summary: "Public guide and class lookup",
      },
    ],
    openapi: `${ORIGIN}/openapi.json`,
    docs: `${ORIGIN}/llms.txt`,
  });
}

export function OPTIONS() {
  return jsonResponse({ ok: true });
}
