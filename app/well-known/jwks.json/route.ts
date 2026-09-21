import { JWKS_DISABLED } from "@/lib/agent/oauth-coming-soon";
import { jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse(JWKS_DISABLED, {
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
