import { NextRequest } from "next/server";
import { lookupRecords } from "@/lib/agent/lookup";
import { jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const result = lookupRecords({
    q: sp.get("q") || undefined,
    kind: sp.get("kind") || undefined,
    id: sp.get("id") || undefined,
    limit: sp.get("limit") ? Number(sp.get("limit")) : undefined,
  });
  return jsonResponse(result, { status: result.ok ? 200 : 404 });
}

export function OPTIONS() {
  return jsonResponse({ ok: true });
}
