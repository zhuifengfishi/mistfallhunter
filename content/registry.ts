import { createElement } from "react";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "../i18n/locales";
import DeBestClass, { frontmatter as deBestClass } from "./de/classes/best-class.mdx";
import EnBestClass, { frontmatter as enBestClass } from "./en/classes/best-class.mdx";
import JaBestClass, { frontmatter as jaBestClass } from "./ja/classes/best-class.mdx";
import PtBrBestClass, { frontmatter as ptBrBestClass } from "./pt-br/classes/best-class.mdx";

export const articleFrontmatter = {
  "en/classes/best-class": enBestClass,
  "ja/classes/best-class": jaBestClass,
  "de/classes/best-class": deBestClass,
  "pt-br/classes/best-class": ptBrBestClass,
} as const;

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
