import { createElement } from "react";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "../i18n/locales";
import {
  type ArticleDocument,
  validateArticleFrontmatter,
} from "../lib/content/article";
import DeBestClass, { frontmatter as deBestClass } from "./de/classes/best-class.mdx";
import EnBestClass, { frontmatter as enBestClass } from "./en/classes/best-class.mdx";
import JaBestClass, { frontmatter as jaBestClass } from "./ja/classes/best-class.mdx";
import PtBrBestClass, { frontmatter as ptBrBestClass } from "./pt-br/classes/best-class.mdx";

export const articleFrontmatter = {
  "en/classes/best-class": validateArticleFrontmatter(
    enBestClass,
    "content/en/classes/best-class.mdx",
  ),
  "ja/classes/best-class": validateArticleFrontmatter(
    jaBestClass,
    "content/ja/classes/best-class.mdx",
  ),
  "de/classes/best-class": validateArticleFrontmatter(
    deBestClass,
    "content/de/classes/best-class.mdx",
  ),
  "pt-br/classes/best-class": validateArticleFrontmatter(
    ptBrBestClass,
    "content/pt-br/classes/best-class.mdx",
  ),
} as const;

export function getArticle(
  locale: Locale,
  category: "classes",
  slug: "best-class",
): ArticleDocument {
  const key = `${locale}/${category}/${slug}` as const;
  const sourcePath = `content/${key}.mdx`;
  const frontmatter = articleFrontmatter[key];
  if (!frontmatter) throw new Error(`Missing article: ${key}`);
  return { frontmatter, body: "", sourcePath };
}

export function ArticleContent({
  components,
  locale,
}: {
  components: MDXComponents;
  locale: Locale;
}) {
  const props = { components };
  switch (locale) {
    case "en": return createElement(EnBestClass, props);
    case "ja": return createElement(JaBestClass, props);
    case "de": return createElement(DeBestClass, props);
    case "pt-br": return createElement(PtBrBestClass, props);
  }
}
