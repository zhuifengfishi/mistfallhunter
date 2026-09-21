import { authMdBody } from "@/lib/agent/oauth-coming-soon";
import { textResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return textResponse(authMdBody(), "text/markdown; charset=utf-8", {
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
