import { SKILL_BODY } from "@/lib/agent/skill";
import { textResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return textResponse(SKILL_BODY, "text/markdown; charset=utf-8", {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
