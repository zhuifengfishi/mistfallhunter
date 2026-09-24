import { classes } from "../../data/classes";
import { guideSlugs, getGuide } from "../../data/guides";
import { newsSlugs, getNews } from "../../data/news";
import { ORIGIN, SITE_NAME, SITE_TAGLINE } from "./site";

const CLASS_NAMES: Record<string, string> = {
  mercenary: "Mercenary",
  seer: "Seer",
  blackarrow: "Blackarrow",
  shadowstrix: "Shadowstrix",
  blasphemer: "Blasphemer",
  "withered-knight": "Withered Knight",
};

export function buildLlmsTxt(): string {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_TAGLINE}`,
    "",
    `Canonical host: ${ORIGIN}`,
    "",
    "## Docs",
    "",
    `- [Full knowledge file](${ORIGIN}/llms-full.txt): Expanded public guides and class facts`,
    `- [OpenAPI](${ORIGIN}/openapi.json): HTTP API description`,
    `- [API catalog](${ORIGIN}/.well-known/api-catalog): RFC 9727 linkset`,
    `- [Auth (coming soon)](${ORIGIN}/auth.md): Planned agent OAuth — not available yet`,
    "",
    "## Primary pages",
    "",
    `- [Home (EN)](${ORIGIN}/en): Wiki overview and start-here hub`,
    `- [Classes](${ORIGIN}/en/classes): Six-class overview`,
    `- [Best class article](${ORIGIN}/en/classes/best-class): Beginner / solo / PvE / PvP comparison`,
    `- [News hub](${ORIGIN}/en/news): Dated Steam-backed updates and post-patch guides`,
    `- [Contact](${ORIGIN}/en/contact): Corrections and feedback`,
    `- [Privacy](${ORIGIN}/en/privacy): Privacy policy`,
    "",
    "## Classes",
    "",
    ...classes.map(
      (c) =>
        `- [${CLASS_NAMES[c.id] || c.id}](${ORIGIN}/en/classes): ${c.id} (${c.roleKey})`,
    ),
    "",
    "## News",
    "",
    ...newsSlugs.map((slug) => {
      const n = getNews(slug)!;
      return `- [${n.metadataTitle}](${ORIGIN}/en/news/${n.slug}): ${n.description}`;
    }),
    "",
    "## Guides",
    "",
    ...guideSlugs.map((slug) => {
      const g = getGuide(slug)!;
      return `- [${g.metadataTitle}](${ORIGIN}/en/guides/${g.slug}): ${g.description}`;
    }),
    "",
    "## Agent APIs",
    "",
    `- GET ${ORIGIN}/api/health — liveness`,
    `- GET ${ORIGIN}/api/lookup?q=&kind=guide|class|all&id= — public guide/class lookup`,
    `- POST ${ORIGIN}/mcp — MCP streamable HTTP (tools/list, tools/call)`,
    `- [MCP server card](${ORIGIN}/.well-known/mcp/server-card.json)`,
    `- [Agent skills index](${ORIGIN}/.well-known/agent-skills/index.json)`,
    `- [ARD catalog](${ORIGIN}/.well-known/ai-catalog.json)`,
    `- [DNS-AID index](${ORIGIN}/ai/index.ilang)`,
    `- [Pages index](${ORIGIN}/pages-index.json)`,
    "",
    "## Content use preference",
    "",
    "robots.txt Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "",
    "Unofficial fan wiki — not affiliated with Bellring Games. Official game site: https://mistfallhunter.com/",
    "",
  ].join("\n");
}

export function buildLlmsFullTxt(): string {
  const classBodies = classes
    .map((c) => {
      const name = CLASS_NAMES[c.id] || c.id;
      return `## ${name}\n\nId: ${c.id}\nRole key: ${c.roleKey}\nWeapon key: ${c.weaponKey}\nOverview: ${ORIGIN}/en/classes\nBest-class article: ${ORIGIN}/en/classes/best-class`;
    })
    .join("\n\n");

  const guideBodies = guideSlugs
    .map((slug) => {
      const g = getGuide(slug)!;
      const sections = g.sections
        .map((s) => {
          const paras = s.paragraphs.join("\n\n");
          const bullets = s.bullets?.map((b) => `- ${b}`).join("\n") || "";
          return `### ${s.title}\n\n${paras}${bullets ? `\n\n${bullets}` : ""}`;
        })
        .join("\n\n");
      return `## ${g.title}\n\nURL: ${ORIGIN}/en/guides/${g.slug}\nUpdated: ${g.updated}\n\n${g.quickAnswer}\n\n${g.description}\n\n${sections}\n\n### Checklist\n\n${g.checklist.map((c) => `- ${c}`).join("\n")}`;
    })
    .join("\n\n---\n\n");

  return [
    `# ${SITE_NAME} — full public knowledge`,
    "",
    SITE_TAGLINE,
    "",
    `Canonical: ${ORIGIN}`,
    "",
    "# Classes",
    "",
    classBodies,
    "",
    `# Best class article`,
    "",
    `URL: ${ORIGIN}/en/classes/best-class`,
    "",
    "Compare all six Mistfall Hunter classes for beginners, solo extraction, PvE, PvP, and coordinated teams. There is no permanent strongest class — pick a repeatable role and reassess after patches.",
    "",
    "# Guides",
    "",
    guideBodies,
    "",
    "# How agents should query",
    "",
    `1. Prefer GET ${ORIGIN}/api/lookup?q=KEYWORD&kind=guide|class`,
    `2. Or call MCP tool lookup_records on ${ORIGIN}/mcp`,
    "3. Cite the returned source URL",
    "4. Do not invent official patch facts, affiliation, or account-support claims beyond published pages",
    "",
    "Unofficial fan wiki — not affiliated with Bellring Games.",
    "",
  ].join("\n");
}
