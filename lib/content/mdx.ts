import { compile, run } from "@mdx-js/mdx";
import matter from "gray-matter";
import * as runtime from "react/jsx-runtime";
import { z } from "zod";
import type { Locale } from "../../i18n/locales";
import { articleSources } from "../../content/registry";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.literal("classes"),
  order: z.number().int().nonnegative(),
  badge: z.string().min(1),
  image: z.string().startsWith("/"),
  sources: z.array(z.string().url()).min(1),
});

export type ArticleFrontmatter = z.infer<typeof frontmatterSchema>;
export type ArticleDocument = {
  frontmatter: ArticleFrontmatter;
  body: string;
  sourcePath: string;
};

export function parseArticle(raw: string, sourcePath: string): ArticleDocument {
  const parsed = matter(raw);
  const data = parsed.data.updated instanceof Date
    ? { ...parsed.data, updated: parsed.data.updated.toISOString().slice(0, 10) }
    : parsed.data;
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const field = result.error.issues[0]?.path.join(".") || "frontmatter";
    throw new Error(`${sourcePath}: invalid or missing ${field}`);
  }
  return { frontmatter: result.data, body: parsed.content, sourcePath };
}

export function getArticle(
  locale: Locale,
  category: "classes",
  slug: "best-class",
): ArticleDocument {
  const key = `${locale}/${category}/${slug}` as const;
  const raw = articleSources[key];
  if (!raw) throw new Error(`Missing article: ${key}`);
  return parseArticle(raw, `content/${key}.mdx`);
}

export async function getArticleComponent(document: ArticleDocument) {
  const code = await compile(document.body, { outputFormat: "function-body" });
  const compiledArticle = await run(String(code), {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return compiledArticle.default;
}
