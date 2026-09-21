import { classes, type ClassId } from "../../data/classes";
import { guideSlugs, getGuide } from "../../data/guides";
import { ORIGIN } from "./site";

export type LookupKind = "guide" | "class" | "all";

const CLASS_META: Record<
  ClassId,
  { name: string; description: string; weapon: string; role: string }
> = {
  mercenary: {
    name: "Mercenary",
    description: "A shielded spear fighter built to hold ground.",
    weapon: "Spear and shield",
    role: "Frontline",
  },
  seer: {
    name: "Seer",
    description: "A mystic specialist who supports from range.",
    weapon: "Mystic focus",
    role: "Ranged support",
  },
  blackarrow: {
    name: "Blackarrow",
    description: "A bow user who turns positioning into precision.",
    weapon: "Bow",
    role: "Precision",
  },
  shadowstrix: {
    name: "Shadowstrix",
    description: "A dual-blade hunter that thrives on quick engagements.",
    weapon: "Dual blades",
    role: "Assassin",
  },
  blasphemer: {
    name: "Blasphemer",
    description: "A heavy-weapon bruiser for forceful close-range pressure.",
    weapon: "Heavy weapon",
    role: "Bruiser",
  },
  "withered-knight": {
    name: "Withered Knight",
    description: "A great-weapon specialist with durable melee presence.",
    weapon: "Great weapon",
    role: "Durable melee",
  },
};

export interface LookupResult {
  ok: boolean;
  query: string;
  kind: LookupKind;
  matched: number;
  results: Array<{
    id: string;
    type: "guide" | "class" | "article";
    title: string;
    description: string;
    url: string;
    tags?: string[];
    role?: string;
    weapon?: string;
  }>;
  source: string;
  generatedAt: string;
  message?: string;
}

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

const BEST_CLASS_ARTICLE = {
  id: "best-class",
  type: "article" as const,
  title: "Mistfall Hunter Best Class — All 6 Classes Compared",
  description:
    "Compare all six Mistfall Hunter classes for beginners, solo extraction, PvE, PvP, and coordinated teams using the current balance snapshot.",
  url: `${ORIGIN}/en/classes/best-class`,
  tags: ["classes", "best-class", "tier"],
};

export function lookupRecords(opts: {
  q?: string;
  kind?: string;
  id?: string;
  limit?: number;
}): LookupResult {
  const kindRaw = (opts.kind || "all").toLowerCase();
  const kind: LookupKind =
    kindRaw === "guide" || kindRaw === "class" || kindRaw === "all"
      ? kindRaw
      : "all";
  const q = normalize(opts.q || "");
  const id = normalize(opts.id || "");
  const limit = Math.min(50, Math.max(1, Number(opts.limit) || 10));
  const generatedAt = new Date().toISOString();

  if (id) {
    if (kind === "guide" || kind === "all") {
      const g = getGuide(id);
      if (g) {
        return {
          ok: true,
          query: id,
          kind: "guide",
          matched: 1,
          results: [
            {
              id: g.slug,
              type: "guide",
              title: g.title,
              description: g.description,
              url: `${ORIGIN}/en/guides/${g.slug}`,
              tags: [g.eyebrow],
            },
          ],
          source: `${ORIGIN}/en/guides/${g.slug}`,
          generatedAt,
        };
      }
      if (id === "best-class") {
        return {
          ok: true,
          query: id,
          kind: "guide",
          matched: 1,
          results: [BEST_CLASS_ARTICLE],
          source: BEST_CLASS_ARTICLE.url,
          generatedAt,
        };
      }
    }
    if (kind === "class" || kind === "all") {
      const meta = CLASS_META[id as ClassId];
      if (meta) {
        return {
          ok: true,
          query: id,
          kind: "class",
          matched: 1,
          results: [
            {
              id,
              type: "class",
              title: meta.name,
              description: meta.description,
              url: `${ORIGIN}/en/classes`,
              role: meta.role,
              weapon: meta.weapon,
            },
          ],
          source: `${ORIGIN}/en/classes`,
          generatedAt,
        };
      }
    }
    return {
      ok: false,
      query: id,
      kind,
      matched: 0,
      results: [],
      source: ORIGIN,
      generatedAt,
      message: `No public record found for id="${id}".`,
    };
  }

  if (!q) {
    if (kind === "all") {
      const classResults = classes.map((c) => {
        const meta = CLASS_META[c.id];
        return {
          id: c.id,
          type: "class" as const,
          title: meta.name,
          description: meta.description,
          url: `${ORIGIN}/en/classes`,
          role: meta.role,
          weapon: meta.weapon,
        };
      });
      const guideResults = guideSlugs.map((slug) => {
        const g = getGuide(slug)!;
        return {
          id: g.slug,
          type: "guide" as const,
          title: g.title,
          description: g.description,
          url: `${ORIGIN}/en/guides/${g.slug}`,
          tags: [g.eyebrow],
        };
      });
      const results = [...classResults, BEST_CLASS_ARTICLE, ...guideResults].slice(
        0,
        limit,
      );
      return {
        ok: true,
        query: "",
        kind,
        matched: results.length,
        results,
        source: `${ORIGIN}/en`,
        generatedAt,
        message:
          "Listed public classes and guides. Pass q or id for a specific lookup.",
      };
    }
    return {
      ok: false,
      query: "",
      kind,
      matched: 0,
      results: [],
      source: ORIGIN,
      generatedAt,
      message: "Provide query parameter q or id.",
    };
  }

  const results: LookupResult["results"] = [];

  if (kind === "guide" || kind === "all") {
    for (const slug of guideSlugs) {
      const g = getGuide(slug)!;
      const hay =
        `${g.slug} ${g.title} ${g.description} ${g.eyebrow} ${g.quickAnswer}`.toLowerCase();
      if (hay.includes(q)) {
        results.push({
          id: g.slug,
          type: "guide",
          title: g.title,
          description: g.description,
          url: `${ORIGIN}/en/guides/${g.slug}`,
          tags: [g.eyebrow],
        });
      }
    }
    const articleHay =
      `${BEST_CLASS_ARTICLE.id} ${BEST_CLASS_ARTICLE.title} ${BEST_CLASS_ARTICLE.description}`.toLowerCase();
    if (articleHay.includes(q)) {
      results.push(BEST_CLASS_ARTICLE);
    }
  }

  if (kind === "class" || kind === "all") {
    for (const c of classes) {
      const meta = CLASS_META[c.id];
      const hay =
        `${c.id} ${meta.name} ${meta.description} ${meta.role} ${meta.weapon}`.toLowerCase();
      if (hay.includes(q)) {
        results.push({
          id: c.id,
          type: "class",
          title: meta.name,
          description: meta.description,
          url: `${ORIGIN}/en/classes`,
          role: meta.role,
          weapon: meta.weapon,
        });
      }
    }
  }

  const sliced = results.slice(0, limit);
  return {
    ok: sliced.length > 0,
    query: q,
    kind,
    matched: sliced.length,
    results: sliced,
    source: sliced[0]?.url || ORIGIN,
    generatedAt,
    message:
      sliced.length === 0
        ? `No public guide or class matched q="${q}".`
        : undefined,
  };
}
