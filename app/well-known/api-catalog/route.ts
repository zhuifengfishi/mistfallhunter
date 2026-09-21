import { ORIGIN, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  const body = {
    linkset: [
      {
        anchor: `${ORIGIN}/api/`,
        "service-desc": [
          { href: `${ORIGIN}/openapi.json`, type: "application/json" },
        ],
        "service-doc": [{ href: `${ORIGIN}/llms.txt`, type: "text/plain" }],
        status: [
          { href: `${ORIGIN}/api/health`, type: "application/json" },
        ],
      },
    ],
  };
  return new Response(JSON.stringify(body, null, 2) + "\n", {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function OPTIONS() {
  return jsonResponse({ ok: true });
}
