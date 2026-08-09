import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { GuideCard } from "../../../components/GuideCard";
import { MediaPanel } from "../../../components/MediaPanel";
import { classes } from "../../../data/classes";
import { officialLinks } from "../../../data/official-links";
import { getDictionary } from "../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../i18n/locales";
import {
  buildPageMetadata,
  pageDescriptions,
  serializeJsonLd,
  SITE_URL,
} from "../../../lib/seo/metadata";

type ClassesCollectionProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ClassesCollectionProps): Promise<Metadata> {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const dictionary = getDictionary(localeValue);
  return buildPageMetadata({
    locale: localeValue,
    path: "/classes",
    title: dictionary.classes.title,
    description: pageDescriptions[localeValue].classes,
    image: "/og.png",
    imageAlt: "Mistfall Hunter field guide social preview",
  });
}

export default async function ClassesCollection({
  params,
}: ClassesCollectionProps) {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const locale = localeValue;
  const dictionary = getDictionary(locale);
  const content = dictionary.classes;
  const homeUrl = new URL(localizedPath(locale), `${SITE_URL}/`).toString();
  const classesUrl = new URL(
    localizedPath(locale, "/classes"),
    `${SITE_URL}/`,
  ).toString();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: pageDescriptions[locale].classes,
    url: classesUrl,
    inLanguage: locale === "pt-br" ? "pt-BR" : locale,
    isPartOf: { "@type": "WebSite", url: homeUrl },
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
        name: content.overview,
        item: classesUrl,
      },
    ],
  };

  return (
    <article className="classes-page">
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <Breadcrumbs
        items={[
          { href: localizedPath(locale), label: dictionary.nav.home },
          { label: content.overview },
        ]}
      />

      <header className="classes-page__hero">
        <div>
          <p className="home-kicker">{dictionary.nav.classes}</p>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
        <MediaPanel
          alt={content.bannerAlt}
          className="classes-page__media"
          priority
          sizes="(max-width: 860px) 100vw, min(1068px, calc(100vw - 356px))"
          src="/combat.jpg"
        />
      </header>

      <aside className="classes-page__snapshot">
        <span>{content.snapshotLabel}</span>
        <p>{content.rankingNotice}</p>
      </aside>

      <section aria-labelledby="classes-overview">
        <div className="classes-page__section-heading">
          <div>
            <p className="home-kicker">{dictionary.nav.classes}</p>
            <h2 id="classes-overview">{content.overview}</h2>
          </div>
          <p>{content.gridIntro}</p>
        </div>
        <div
          aria-label={content.overview}
          className="classes-page__grid"
          role="list"
        >
          {classes.map((classEntry, index) => {
            const entry = content.entries[classEntry.id];
            return (
              <div className="classes-page__card" key={classEntry.id} role="listitem">
                <GuideCard
                  description={`${entry.description} ${entry.weapon} / ${entry.role}`}
                  eyebrow={entry.role}
                  href={`${localizedPath(locale, "/classes")}#${classEntry.id}`}
                  id={classEntry.id}
                  index={index + 1}
                  linkLabel={content.cardLinkLabel}
                  title={entry.name}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="classes-page__feature" aria-labelledby="best-class">
        <div>
          <p className="home-kicker">{dictionary.article.popular}</p>
          <h2 id="best-class">{content.bestClass}</h2>
          <p>{content.bestClassIntro}</p>
        </div>
        <a
          className="home-button home-button--primary"
          href={localizedPath(locale, "/classes/best-class")}
        >
          {content.bestClassLinkLabel}
          <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className="classes-page__related" aria-labelledby="related-reading">
        <p className="home-kicker">{dictionary.article.related}</p>
        <h2 id="related-reading">{content.relatedTitle}</h2>
        <div>
          <a href={localizedPath(locale)}>{content.homeLinkLabel}</a>
          <a href={officialLinks.steam} rel="noreferrer" target="_blank">
            {content.officialLinkLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </article>
  );
}
