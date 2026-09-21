import { buildSkillIndex } from "@/lib/agent/skill";
import { jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse(buildSkillIndex(), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
