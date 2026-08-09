import { describe, expect, it } from "vitest";
import { getArticle } from "../content/registry";
import {
  approvedOfficialSourceUrls,
  isApprovedOfficialSourceUrl,
  officialLinks,
} from "../data/official-links";
import { parseArticle } from "../lib/content/parse-article";

const valid = `---
title: Best Class
description: Compare every class.
updated: 2026-08-09
category: classes
order: 1
badge: Popular
image: /hero.jpg
sources:
  - https://mistfallhunter.com/
---
# Best Class
`;

describe("MDX content pipeline", () => {
  it("keeps every shared official link inside the approved source policy", () => {
    expect(Object.values(officialLinks)).toEqual(approvedOfficialSourceUrls);
    expect(Object.values(officialLinks).every(isApprovedOfficialSourceUrl)).toBe(true);
    expect(isApprovedOfficialSourceUrl("https://competitor.example/guide")).toBe(false);
  });

  it("parses required frontmatter and body", () => {
    const article = parseArticle(valid, "fixture.mdx");
    expect(article.frontmatter.category).toBe("classes");
    expect(article.body).toContain("# Best Class");
  });

  it("reports the source path and missing field", () => {
    expect(() => parseArticle("---\ntitle: Broken\n---\n", "broken.mdx"))
      .toThrow(/broken\.mdx.*description/i);
  });

  it("rejects an unapproved article source URL", () => {
    const competitorSource = valid.replace(
      "https://mistfallhunter.com/",
      "https://competitor.example/guide",
    );

    expect(() => parseArticle(competitorSource, "competitor.mdx"))
      .toThrow(/competitor\.mdx.*sources\.0/i);
  });

  it.each(["en", "ja", "de", "pt-br"] as const)(
    "registers the %s Best Class article",
    (locale) => {
      expect(getArticle(locale, "classes", "best-class").frontmatter.title)
        .toBeTruthy();
    },
  );
});
