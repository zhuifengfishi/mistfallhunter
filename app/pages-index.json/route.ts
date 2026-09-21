import { guideSlugs, getGuide } from "@/data/guides";
import { launchPaths } from "@/lib/routes";
import { ORIGIN, jsonResponse } from "@/lib/agent/site";

export const runtime = "nodejs";

export function GET() {
  const pages = [
    {
      path: "/en",
      title: "Mistfall Hunter Wiki",
      url: `${ORIGIN}/en`,
      type: "home",
    },
    ...launchPaths
      .filter((p) => p !== "/")
      .map((p) => ({
        path: `/en${p}`,
        title: p.slice(1),
        url: `${ORIGIN}/en${p}`,
        type: "page" as const,
      })),
    ...guideSlugs.map((slug) => {
      const g = getGuide(slug)!;
      return {
        path: `/en/guides/${slug}`,
        title: g.metadataTitle,
        url: `${ORIGIN}/en/guides/${slug}`,
        type: "guide" as const,
        updated: g.updated,
      };
    }),
  ];

  return jsonResponse(
    {
      origin: ORIGIN,
      generatedAt: new Date().toISOString(),
      count: pages.length,
      pages,
    },
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
