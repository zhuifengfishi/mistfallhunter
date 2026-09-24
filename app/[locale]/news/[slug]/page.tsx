import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { NextReads } from "../../../../components/NextReads";
import { allNews, getNews, newsSlugs } from "../../../../data/news";
import { getDictionary } from "../../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../../i18n/locales";
import { buildPageMetadata, serializeJsonLd, SITE_URL } from "../../../../lib/seo/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return newsSlugs.map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = locale === "en" ? getNews(slug) : undefined;
  if (!post || !isLocale(locale)) notFound();
  return buildPageMetadata({
    locale,
    path: `/news/${post.slug}`,
    title: post.metadataTitle,
    description: post.description,
    image: post.image,
    imageAlt: post.imageAlt,
    type: "article",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const post = locale === "en" ? getNews(slug) : undefined;
  if (!post || !isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const url = new URL(localizedPath(locale, `/news/${post.slug}`), `${SITE_URL}/`).toString();
  const articleLd = {
    "@context": "https://schema.org",
    "@type": post.kind === "news" ? "NewsArticle" : "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.updated,
    mainEntityOfPage: url,
    url,
    inLanguage: "en",
    author: { "@type": "Organization", name: `${dictionary.brand.name} ${dictionary.brand.wiki}` },
    isBasedOn: post.sources.map((s) => s.url),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const relatedLinks = [
    ...post.related.flatMap((r) => {
      const item = getNews(r);
      return item ? [{ href: localizedPath(locale, `/news/${item.slug}`), label: item.title }] : [];
    }),
    { href: localizedPath(locale, "/news"), label: "News hub" },
    { href: localizedPath(locale, "/guides/classes-tier-list"), label: "Classes tier list guide" },
    { href: localizedPath(locale), label: "Wiki home" },
  ];

  return (
    <article className="guide-page">
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleLd) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqLd) }} type="application/ld+json" />
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/news", label: "News" },
          { label: post.title },
        ]}
      />
      <header className="guide-hero">
        <div>
          <p className="home-kicker">
            {post.eyebrow} · target: {post.targetKeyword}
          </p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p className="guide-review">
            Published <time dateTime={post.datePublished}>{post.datePublished}</time> · Updated Sep 2026 (
            <time dateTime={post.updated}>{post.updated}</time>) · {post.kind === "news" ? "News" : "Guide"}
          </p>
        </div>
      </header>
      <section className="guide-answer">
        <p className="home-kicker">Quick answer</p>
        <p>{post.quickAnswer}</p>
      </section>
      <nav aria-label="On this page" className="guide-toc">
        <strong>On this page</strong>
        <ol>
          {post.sections.map((section, index) => (
            <li key={section.title}>
              <a href={`#section-${index + 1}`}>{section.title}</a>
            </li>
          ))}
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ol>
      </nav>
      <div className="guide-body">
        {post.sections.map((section, index) => (
          <section id={`section-${index + 1}`} key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
      <section className="guide-faq" id="faq">
        <p className="home-kicker">Questions players ask</p>
        <h2>Frequently asked questions</h2>
        {post.faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <NextReads className="guide-related" links={relatedLinks} title="Related Mistfall Hunter news" />
      <section className="guide-sources">
        <p className="home-kicker">Sources</p>
        <h2>Verify on Steam</h2>
        <div>
          {post.sources.map((s) => (
            <a href={s.url} key={s.url} rel="noopener noreferrer" target="_blank">
              {s.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
