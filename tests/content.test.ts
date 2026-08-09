import { describe, expect, it } from "vitest";
import { getArticle, parseArticle } from "../lib/content/mdx";

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
  it("parses required frontmatter and body", () => {
    const article = parseArticle(valid, "fixture.mdx");
    expect(article.frontmatter.category).toBe("classes");
    expect(article.body).toContain("# Best Class");
  });

  it("reports the source path and missing field", () => {
    expect(() => parseArticle("---\ntitle: Broken\n---\n", "broken.mdx"))
      .toThrow(/broken\.mdx.*description/i);
  });

  it.each(["en", "ja", "de", "pt-br"] as const)(
    "registers the %s Best Class article",
    (locale) => {
      expect(getArticle(locale, "classes", "best-class").frontmatter.title)
        .toBeTruthy();
    },
  );
});
