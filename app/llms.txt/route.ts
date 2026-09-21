import { buildLlmsTxt } from "@/lib/agent/llms";
import { textResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return textResponse(buildLlmsTxt(), "text/plain; charset=utf-8", {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
