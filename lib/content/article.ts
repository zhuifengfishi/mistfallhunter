import { z } from "zod";
import { isApprovedOfficialSourceUrl } from "./official-links";

const articleFrontmatterSchema = z.object({
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

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type ArticleDocument = {
  frontmatter: ArticleFrontmatter;
  body: string;
  sourcePath: string;
};

export function validateArticleFrontmatter(
  data: unknown,
  sourcePath: string,
): ArticleFrontmatter {
  const result = articleFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const field = result.error.issues[0]?.path.join(".") || "frontmatter";
    throw new Error(`${sourcePath}: invalid or missing ${field}`);
  }
  return result.data;
}
