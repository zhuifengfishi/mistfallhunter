import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { NextReads } from "../../../components/NextReads";
import { legalPages } from "../../../data/legal";
import { getDictionary } from "../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../i18n/locales";
import {
  buildPageMetadata,
  pageDescriptions,
  serializeJsonLd,
  SITE_URL,
} from "../../../lib/seo/metadata";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const copy = legalPages[localeValue].privacy;
  return buildPageMetadata({
    locale: localeValue,
    path: "/privacy",
    title: copy.metadataTitle,
    description: pageDescriptions[localeValue].privacy,
    image: "/og.png",
    imageAlt: "Mistfall Hunter field guide social preview",
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const locale = localeValue;
  const dictionary = getDictionary(locale);
  const copy = legalPages[locale].privacy;
  const url = new URL(localizedPath(locale, "/privacy"), `${SITE_URL}/`).toString();
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title,
    description: pageDescriptions[locale].privacy,
    url,
    inLanguage: locale === "pt-br" ? "pt-BR" : locale,
  };

  return (
    <article className="legal-page">
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webPageJsonLd) }}
        type="application/ld+json"
      />
      <Breadcrumbs
        items={[
          { href: localizedPath(locale), label: dictionary.nav.home },
          { label: copy.breadcrumb },
        ]}
      />
      <header className="legal-page__header">
        <p className="home-kicker">{dictionary.brand.name}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </header>
      {copy.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p className="legal-page__note">{copy.note}</p>
      {copy.englishHrefLabel && locale !== "en" && (
        <p>
          <a href={localizedPath("en", "/privacy")}>{copy.englishHrefLabel}</a>
        </p>
      )}
      <NextReads
        links={[
          {
            href: localizedPath(locale, "/contact"),
            label: dictionary.footer.contact,
          },
          {
            href: localizedPath(locale),
            label: dictionary.nav.home,
          },
        ]}
      />
    </article>
  );
}
