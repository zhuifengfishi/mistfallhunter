import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleComponents } from "../../../../components/article/ArticleComponents";
import { ArticleLayout } from "../../../../components/article/ArticleLayout";
import { ArticleContent, getArticle } from "../../../../content/registry";
import { getDictionary } from "../../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../../i18n/locales";
import {
  buildPageMetadata,
  pageDescriptions,
  serializeJsonLd,
  SITE_URL,
} from "../../../../lib/seo/metadata";

type BestClassArticleProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: BestClassArticleProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  if (!isLocale(localeValue) || slug !== "best-class") notFound();

  const article = getArticle(localeValue, "classes", "best-class");
  return buildPageMetadata({
    locale: localeValue,
    path: "/classes/best-class",
    title: article.frontmatter.title,
    description: pageDescriptions[localeValue].bestClass,
    image: "/og.png",
    imageAlt: "Mistfall Hunter field guide social preview",
    type: "article",
  });
}

export default async function BestClassArticle({ params }: BestClassArticleProps) {
  const { locale: localeValue, slug } = await params;
  if (!isLocale(localeValue) || slug !== "best-class") notFound();

  const article = getArticle(localeValue, "classes", "best-class");
  const dictionary = getDictionary(localeValue);
  const homeUrl = new URL(localizedPath(localeValue), `${SITE_URL}/`).toString();
  const classesUrl = new URL(
    localizedPath(localeValue, "/classes"),
    `${SITE_URL}/`,
  ).toString();
  const articleUrl = new URL(
    localizedPath(localeValue, "/classes/best-class"),
    `${SITE_URL}/`,
  ).toString();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: pageDescriptions[localeValue].bestClass,
    dateModified: article.frontmatter.updated,
    image: new URL(article.frontmatter.image, `${SITE_URL}/`).toString(),
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    inLanguage: localeValue === "pt-br" ? "pt-BR" : localeValue,
    author: {
      "@type": "Organization",
      name: `${dictionary.brand.name} ${dictionary.brand.wiki}`,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dictionary.nav.home,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dictionary.nav.classes,
        item: classesUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.frontmatter.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <ArticleLayout article={article} dictionary={dictionary} locale={localeValue}>
        <ArticleContent
          components={getArticleComponents({ locale: localeValue })}
          locale={localeValue}
        />
      </ArticleLayout>
    </>
  );
}
