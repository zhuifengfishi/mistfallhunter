import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { allNews } from "../../../data/news";
import { getDictionary } from "../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../i18n/locales";
import { buildPageMetadata, serializeJsonLd, SITE_URL } from "../../../lib/seo/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "en") notFound();
  return buildPageMetadata({
    locale,
    path: "/news",
    title: "Mistfall Hunter News — Updates, Events & Patch Notes (Sep 2026)",
    description:
      "Dated Mistfall Hunter news hub: September 23 maintenance, Autumn Sale, September 15 patch notes, weekend rewards, and post-patch class/tier guides with Steam sources.",
    type: "website",
  });
}

export default async function NewsHubPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "en") notFound();
  const dictionary = getDictionary(locale);
  const posts = allNews();
  const url = new URL(localizedPath(locale, "/news"), `${SITE_URL}/`).toString();
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mistfall Hunter News",
    url,
    hasPart: posts.map((p) => ({
      "@type": p.kind === "news" ? "NewsArticle" : "Article",
      headline: p.title,
      datePublished: p.datePublished,
      url: new URL(localizedPath(locale, `/news/${p.slug}`), `${SITE_URL}/`).toString(),
    })),
  };

  return (
    <article className="guide-page">
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionLd) }} type="application/ld+json" />
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { label: "News" }]} />
      <header className="guide-hero">
        <div>
          <p className="home-kicker">News channel · Updated Sep 2026</p>
          <h1>Mistfall Hunter News</h1>
          <p>
            Real Steam-backed updates for 2026-09-17 → 2026-09-24 (Asia/Shanghai), plus labeled guides for tier list and
            classes dropdowns. Official Steam News remains the source of record.
          </p>
        </div>
      </header>
      <section className="guide-answer">
        <p className="home-kicker">This week</p>
        <p>
          Dense official traffic: Sep 23 maintenance + Golden Woodlings, Autumn Sale 10% (Sep 24–Oct 8 UTC), Sep 15 live
          balance/network patch, and ongoing Season 1 weekend rewards. Guide posts are marked as guides, not news.
        </p>
      </section>
      <div className="guide-body">
        <section>
          <h2>Latest posts</h2>
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <a href={localizedPath(locale, `/news/${p.slug}`)}>
                  <strong>{p.title}</strong>
                </a>
                <br />
                <span>
                  {p.kind === "news" ? "News" : "Guide"} · {p.datePublished} · dropdown: {p.targetKeyword}
                </span>
                <br />
                {p.description}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="guide-review">
        {dictionary.brand.name} {dictionary.brand.wiki} · not affiliated with Bellring Games
      </p>
    </article>
  );
}
