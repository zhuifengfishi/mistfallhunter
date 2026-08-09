import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { GuideCard } from "../../components/GuideCard";
import { MediaPanel } from "../../components/MediaPanel";
import { StatChip } from "../../components/StatChip";
import {
  homeContent,
  type HomeTarget,
} from "../../data/home";
import { officialLinks } from "../../data/official-links";
import { getDictionary } from "../../i18n/get-dictionary";
import { isLocale, localizedPath, type Locale } from "../../i18n/locales";
import {
  buildPageMetadata,
  pageDescriptions,
  serializeJsonLd,
  SITE_URL,
} from "../../lib/seo/metadata";

type LocalizedHomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedHomeProps): Promise<Metadata> {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const dictionary = getDictionary(localeValue);
  return buildPageMetadata({
    locale: localeValue,
    path: "/",
    title: `${dictionary.brand.name} ${dictionary.brand.wiki}`,
    description: pageDescriptions[localeValue].home,
    image: "/og.png",
    imageAlt: "Mistfall Hunter field guide social preview",
  });
}

function resolveHomeTarget(locale: Locale, target: HomeTarget): string {
  if (target === "classes") return localizedPath(locale, "/classes");
  if (target === "best-class") {
    return localizedPath(locale, "/classes/best-class");
  }
  if (target === "steam") return officialLinks.steam;
  if (target === "steam-news") return officialLinks.steamNews;
  if (target === "official-site") return officialLinks.site;
  return `#${target}`;
}

function isExternalTarget(target: HomeTarget): boolean {
  return target === "steam" || target === "steam-news" || target === "official-site";
}

export default async function LocalizedHome({ params }: LocalizedHomeProps) {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const locale = localeValue;
  const content = homeContent[locale];
  const dictionary = getDictionary(locale);
  const homeUrl = new URL(localizedPath(locale), `${SITE_URL}/`).toString();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${dictionary.brand.name} ${dictionary.brand.wiki}`,
    description: pageDescriptions[locale].home,
    url: homeUrl,
    inLanguage: locale === "pt-br" ? "pt-BR" : locale,
  };

  return (
    <article className="home-page">
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        type="application/ld+json"
      />
      <Breadcrumbs items={[{ label: content.breadcrumb }]} />

      <header className="home-hero">
        <div className="home-hero__heading">
          <p className="home-badge">{content.badge}</p>
          <h1>{content.title}</h1>
        </div>
        <MediaPanel
          alt={content.heroAlt}
          className="home-hero__media"
          priority
          sizes="(max-width: 860px) 100vw, min(1068px, calc(100vw - 356px))"
          src="/hero.jpg"
        />
        <div className="home-hero__summary">
          <p>{content.lead}</p>
        </div>
        <div className="home-stats" aria-label={content.statsLabel}>
          {content.stats.map((stat) => (
            <StatChip key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
        <div className="home-actions home-hero__actions">
          {content.actions.map((action, index) => {
            const external = isExternalTarget(action.target);
            return (
              <a
                className={index === 0 ? "home-button home-button--primary" : "home-button"}
                href={resolveHomeTarget(locale, action.target)}
                key={action.target}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {action.label}
                <span aria-hidden="true">{external ? "↗" : "→"}</span>
              </a>
            );
          })}
        </div>
      </header>

      <aside className="home-update" id="updates">
        <span className="home-update__label">{content.update.label}</span>
        <div>
          <strong>{content.update.title}</strong>
          <p>{content.update.description}</p>
        </div>
        <a href={officialLinks.steamNews} rel="noreferrer" target="_blank">
          {content.update.linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </aside>

      <section className="home-section" id="start-here">
        <div className="home-section__heading">
          <div>
            <p className="home-kicker">{content.start.eyebrow}</p>
            <h2>{content.start.title}</h2>
          </div>
          <p>{content.start.intro}</p>
        </div>
        <div className="home-card-grid">
          {content.start.cards.map((card, index) => (
            <GuideCard
              description={card.description}
              eyebrow={card.eyebrow}
              external={isExternalTarget(card.target)}
              href={resolveHomeTarget(locale, card.target)}
              index={index + 1}
              key={card.title}
              linkLabel={card.linkLabel}
              title={card.title}
            />
          ))}
        </div>
      </section>

      <section className="home-section home-section--trending">
        <div className="home-section__heading">
          <div>
            <p className="home-kicker">{content.trending.eyebrow}</p>
            <h2>{content.trending.title}</h2>
          </div>
          <p>{content.trending.intro}</p>
        </div>
        <div className="home-card-grid">
          {content.trending.cards.map((card, index) => (
            <GuideCard
              description={card.description}
              eyebrow={card.eyebrow}
              external={isExternalTarget(card.target)}
              href={resolveHomeTarget(locale, card.target)}
              index={index + 1}
              key={card.title}
              linkLabel={card.linkLabel}
              title={card.title}
            />
          ))}
        </div>
      </section>

      <section className="home-feature" id="what-is">
        <MediaPanel
          alt={content.whatIs.mediaAlt}
          className="home-feature__media"
          sizes="(max-width: 860px) 100vw, 48vw"
          src="/world.jpg"
        />
        <div className="home-feature__content">
          <p className="home-kicker">{content.whatIs.eyebrow}</p>
          <h2>{content.whatIs.title}</h2>
          {content.whatIs.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="home-facts">
            {content.whatIs.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="home-section home-section--explore">
        <div className="home-section__heading">
          <div>
            <p className="home-kicker">{content.explore.eyebrow}</p>
            <h2>{content.explore.title}</h2>
          </div>
          <p>{content.explore.intro}</p>
        </div>
        <div className="home-card-grid">
          {content.explore.cards.map((card, index) => (
            <GuideCard
              description={card.description}
              eyebrow={card.eyebrow}
              href={resolveHomeTarget(locale, card.target)}
              id={card.id}
              index={index + 1}
              key={card.title}
              linkLabel={card.linkLabel}
              title={card.title}
            />
          ))}
        </div>
      </section>

      <section className="home-faq">
        <div>
          <p className="home-kicker">{content.faq.eyebrow}</p>
          <h2>{content.faq.title}</h2>
        </div>
        <div className="home-faq__list">
          {content.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="home-closing">
        <MediaPanel
          alt={content.closing.mediaAlt}
          className="home-closing__media"
          sizes="(max-width: 860px) 100vw, min(1068px, calc(100vw - 356px))"
          src="/combat.jpg"
        />
        <div className="home-closing__content">
          <p className="home-kicker">{content.closing.eyebrow}</p>
          <h2>{content.closing.title}</h2>
          <p>{content.closing.description}</p>
          <div className="home-actions">
            {[content.closing.primary, content.closing.secondary].map((action, index) => {
              const external = isExternalTarget(action.target);
              return (
                <a
                  className={index === 0 ? "home-button home-button--primary" : "home-button"}
                  href={resolveHomeTarget(locale, action.target)}
                  key={action.target}
                  rel={external ? "noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  {action.label}
                  <span aria-hidden="true">{external ? "↗" : "→"}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
