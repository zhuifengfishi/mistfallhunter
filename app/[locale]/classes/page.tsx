import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { GuideCard } from "../../../components/GuideCard";
import { MediaPanel } from "../../../components/MediaPanel";
import { classes } from "../../../data/classes";
import { officialLinks } from "../../../data/home";
import { getDictionary } from "../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../i18n/locales";

type ClassesCollectionProps = {
  params: Promise<{ locale: string }>;
};

export default async function ClassesCollection({
  params,
}: ClassesCollectionProps) {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const locale = localeValue;
  const dictionary = getDictionary(locale);
  const content = dictionary.classes;

  return (
    <article className="classes-page">
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
        <div className="classes-page__grid">
          {classes.map((classEntry, index) => {
            const entry = content.entries[classEntry.id];
            return (
              <GuideCard
                description={`${entry.description} ${entry.weapon} / ${entry.role}`}
                eyebrow={entry.role}
                href={`${localizedPath(locale, "/classes")}#${classEntry.id}`}
                id={classEntry.id}
                index={index + 1}
                key={classEntry.id}
                linkLabel={content.cardLinkLabel}
                title={entry.name}
              />
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
