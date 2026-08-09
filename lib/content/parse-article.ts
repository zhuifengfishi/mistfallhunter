import matter from "gray-matter";
import {
  type ArticleDocument,
  validateArticleFrontmatter,
} from "./article";

export function parseArticle(raw: string, sourcePath: string): ArticleDocument {
  const parsed = matter(raw);
  const data = parsed.data.updated instanceof Date
    ? { ...parsed.data, updated: parsed.data.updated.toISOString().slice(0, 10) }
    : parsed.data;
  return {
    frontmatter: validateArticleFrontmatter(data, sourcePath),
    body: parsed.content,
    sourcePath,
  };
}
