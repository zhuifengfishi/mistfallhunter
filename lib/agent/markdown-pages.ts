import { classes } from "../../data/classes";
import { guideSlugs, getGuide } from "../../data/guides";
import { homeContent } from "../../data/home";
import { legalPages } from "../../data/legal";
import { ORIGIN, SITE_NAME, SITE_TAGLINE } from "./site";

const CLASS_NAMES: Record<string, string> = {
  mercenary: "Mercenary",
  seer: "Seer",
  blackarrow: "Blackarrow",
  shadowstrix: "Shadowstrix",
  blasphemer: "Blasphemer",
  "withered-knight": "Withered Knight",
};

/** Normalize pathname (no trailing slash except root). Strip locale prefix for content match. */
export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const noQuery = pathname.split("?")[0].split("#")[0];
  const trimmed = noQuery.replace(/\/+$/, "") || "/";
  return trimmed;
}

/** Map /en/... or /ja/... to a content key path without locale. */
export function stripLocale(pathname: string): string {
  const path = normalizePath(pathname);
  const m = path.match(/^\/(en|ja|de|pt-br)(\/.*)?$/);
  if (!m) return path;
  return m[2] || "/";
}

export function pageMarkdown(pathname: string): string | null {
  const original = normalizePath(pathname);
  const path = stripLocale(original);

  if (path === "/") {
    const home = homeContent.en;
    return [
      `# ${SITE_NAME}`,
      "",
      SITE_TAGLINE,
      "",
      home.lead,
      "",
      `Canonical: ${ORIGIN}/en`,
      "",
      "## Start here",
      ...home.start.cards.map(
        (c) => `- **${c.title}** — ${c.description}`,
      ),
      "",
      "## Classes",
      ...classes.map(
        (c) =>
          `- [${CLASS_NAMES[c.id]}](${ORIGIN}/en/classes) — ${c.id} (${c.roleKey})`,
      ),
      "",
      "## Guides",
      ...guideSlugs.map((slug) => {
        const g = getGuide(slug)!;
        return `- [${g.metadataTitle}](${ORIGIN}/en/guides/${g.slug}) — ${g.description}`;
      }),
      "",
      "## FAQ",
      ...home.faq.items.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
      "## Agent entry points",
      "",
      `- [llms.txt](${ORIGIN}/llms.txt)`,
      `- [API lookup](${ORIGIN}/api/lookup)`,
      `- [OpenAPI](${ORIGIN}/openapi.json)`,
      `- [MCP server card](${ORIGIN}/.well-known/mcp/server-card.json)`,
      "",
      "Unofficial fan wiki — not affiliated with Bellring Games. Official game: https://mistfallhunter.com/",
      "",
    ].join("\n");
  }

  if (path === "/classes") {
    return [
      "# Mistfall Hunter Classes",
      "",
      "Overview of all six Mistfall Hunter classes by weapon and role.",
      "",
      ...classes.map(
        (c) =>
          `## ${CLASS_NAMES[c.id]}\n\n- Id: ${c.id}\n- Role: ${c.roleKey}\n- Weapon: ${c.weaponKey}\n`,
      ),
      `- Best class article: ${ORIGIN}/en/classes/best-class`,
      `- Canonical: ${ORIGIN}/en/classes`,
      "",
    ].join("\n");
  }

  if (path === "/classes/best-class") {
    return [
      "# Mistfall Hunter Best Class — All 6 Classes Compared",
      "",
      "Compare all six Mistfall Hunter classes for beginners, solo extraction, PvE, PvP, and coordinated teams using the current balance snapshot.",
      "",
      "There is no permanent strongest class. Start with the weapon rhythm and team role you can execute reliably, then reassess after balance updates.",
      "",
      "## Classes",
      ...classes.map((c) => `- ${CLASS_NAMES[c.id]} (${c.id}) — ${c.roleKey}`),
      "",
      `Canonical: ${ORIGIN}/en/classes/best-class`,
      "",
      "Read the full MDX article on the site for beginner, solo, PvE, PvP, and team-role detail.",
      "",
    ].join("\n");
  }

  if (path.startsWith("/guides/")) {
    const slug = path.slice("/guides/".length);
    const g = getGuide(slug);
    if (!g) return null;
    const parts: string[] = [
      `# ${g.title}`,
      "",
      g.description,
      "",
      `Updated: ${g.updated}`,
      `Canonical: ${ORIGIN}/en/guides/${g.slug}`,
      "",
      "## Quick answer",
      "",
      g.quickAnswer,
      "",
    ];
    for (const s of g.sections) {
      parts.push(`## ${s.title}`, "");
      for (const p of s.paragraphs) parts.push(p, "");
      if (s.bullets?.length) {
        for (const b of s.bullets) parts.push(`- ${b}`);
        parts.push("");
      }
    }
    parts.push("## Checklist", "");
    for (const item of g.checklist) parts.push(`- ${item}`);
    parts.push("", "## FAQ", "");
    for (const f of g.faqs) {
      parts.push(`### ${f.question}`, "", f.answer, "");
    }
    return parts.join("\n");
  }

  if (path === "/contact") {
    const page = legalPages.en.contact;
    return [
      `# ${page.title}`,
      "",
      page.lead,
      "",
      ...page.sections.flatMap((s) => [
        `## ${s.heading}`,
        "",
        ...s.paragraphs.flatMap((p) => [p, ""]),
      ]),
      `Canonical: ${ORIGIN}/en/contact`,
      "",
    ].join("\n");
  }

  if (path === "/privacy") {
    const page = legalPages.en.privacy;
    return [
      `# ${page.title}`,
      "",
      page.lead,
      "",
      ...page.sections.flatMap((s) => [
        `## ${s.heading}`,
        "",
        ...s.paragraphs.flatMap((p) => [p, ""]),
      ]),
      `Canonical: ${ORIGIN}/en/privacy`,
      "",
    ].join("\n");
  }

  return null;
}
