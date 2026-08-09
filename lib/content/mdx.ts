import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "../../i18n/locales";
import { articleFrontmatter } from "../../content/registry";
import { isApprovedOfficialSourceUrl } from "./official-links";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.literal("classes"),
  order: z.number().int().nonnegative(),
  badge: z.string().min(1),
  image: z.string().startsWith("/"),
  sources: z.array(
    z.string().url().refine(isApprovedOfficialSourceUrl, {
      message: "unapproved official source URL",
    }),
  ).min(1),
});

export type ArticleFrontmatter = z.infer<typeof frontmatterSchema>;
export type ArticleDocument = {
  frontmatter: ArticleFrontmatter;
  body: string;
  sourcePath: string;
};

function validateFrontmatter(data: unknown, sourcePath: string): ArticleFrontmatter {
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const field = result.error.issues[0]?.path.join(".") || "frontmatter";
    throw new Error(`${sourcePath}: invalid or missing ${field}`);
  }
  return result.data;
}

export function parseArticle(raw: string, sourcePath: string): ArticleDocument {
  const parsed = matter(raw);
  const data = parsed.data.updated instanceof Date
    ? { ...parsed.data, updated: parsed.data.updated.toISOString().slice(0, 10) }
    : parsed.data;
  return {
    frontmatter: validateFrontmatter(data, sourcePath),
    body: parsed.content,
    sourcePath,
  };
}

export function getArticle(
  locale: Locale,
  category: "classes",
  slug: "best-class",
): ArticleDocument {
  const key = `${locale}/${category}/${slug}` as const;
  const sourcePath = `content/${key}.mdx`;
  const data = articleFrontmatter[key];
  if (!data) throw new Error(`Missing article: ${key}`);
  return { frontmatter: validateFrontmatter(data, sourcePath), body: "", sourcePath };
}
