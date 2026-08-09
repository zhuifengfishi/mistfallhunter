import { notFound } from "next/navigation";
import { getArticleComponents } from "../../../../components/article/ArticleComponents";
import { ArticleLayout } from "../../../../components/article/ArticleLayout";
import { getDictionary } from "../../../../i18n/get-dictionary";
import { isLocale } from "../../../../i18n/locales";
import { getArticle, getArticleComponent } from "../../../../lib/content/mdx";

type BestClassArticleProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BestClassArticle({ params }: BestClassArticleProps) {
  const { locale: localeValue, slug } = await params;
  if (!isLocale(localeValue) || slug !== "best-class") notFound();

  const article = getArticle(localeValue, "classes", "best-class");
  const Article = await getArticleComponent(article);

  return (
    <ArticleLayout article={article} dictionary={getDictionary(localeValue)} locale={localeValue}>
      <Article components={getArticleComponents({ locale: localeValue })} />
    </ArticleLayout>
  );
}
