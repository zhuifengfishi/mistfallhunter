import { PRM_METADATA } from "@/lib/agent/oauth-coming-soon";
import { jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse(PRM_METADATA, {
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
