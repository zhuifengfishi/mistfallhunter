import { ORIGIN } from "@/lib/agent/site";

export const runtime = "nodejs";

/** Named AI crawlers referenced by isitagentready.ai-rules repair notes. */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "Claude-Web",
  "Google-Extended",
  "Amazonbot",
  "anthropic-ai",
  "Bytespider",
  "CCBot",
  "Applebot-Extended",
];

function group(ua: string): string {
  return [
    `User-agent: ${ua}`,
    "Allow: /",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "",
  ].join("\n");
}

export function GET() {
  const body =
    group("*") +
    AI_BOTS.map(group).join("") +
    `Sitemap: ${ORIGIN}/sitemap.xml\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
