import { jsonResponse, ORIGIN, SITE_NAME } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse({
    ok: true,
    service: SITE_NAME,
    origin: ORIGIN,
    status: "healthy",
    time: new Date().toISOString(),
  });
}

export function OPTIONS() {
  return jsonResponse({ ok: true });
}
