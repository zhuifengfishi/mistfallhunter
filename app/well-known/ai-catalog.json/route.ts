import { ORIGIN, SITE_NAME, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  return jsonResponse(
    {
      specVersion: "1.0",
      host: {
        displayName: SITE_NAME,
        identifier: "did:web:mistfall-hunter.net",
      },
      entries: [
        {
          identifier: "urn:air:mistfall-hunter.net:server:mistfall-hunter-lookup",
          displayName: `${SITE_NAME} lookup`,
          type: "application/mcp-server-card+json",
          url: `${ORIGIN}/.well-known/mcp/server-card.json`,
          representativeQueries: [
            "What is the best Mistfall Hunter class for beginners?",
            "How should I verify Mistfall Hunter ciphers?",
          ],
        },
        {
          identifier: "urn:air:mistfall-hunter.net:doc:llms",
          displayName: `${SITE_NAME} llms.txt`,
          type: "text/plain",
          url: `${ORIGIN}/llms.txt`,
        },
      ],
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
