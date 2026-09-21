import { UNAVAILABLE_503 } from "@/lib/agent/oauth-coming-soon";
import { jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

function unavailable() {
  return jsonResponse(UNAVAILABLE_503, {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

export function GET() {
  return unavailable();
}

export function POST() {
  return unavailable();
}

export function PUT() {
  return unavailable();
}

export function OPTIONS() {
  return unavailable();
}
