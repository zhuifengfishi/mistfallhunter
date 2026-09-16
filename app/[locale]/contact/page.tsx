import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { NextReads } from "../../../components/NextReads";
import { legalContactEmail, legalPages } from "../../../data/legal";
import { getDictionary } from "../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../i18n/locales";
import {
  buildPageMetadata,
  pageDescriptions,
  serializeJsonLd,
  SITE_URL,
} from "../../../lib/seo/metadata";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const copy = legalPages[localeValue].contact;
  return buildPageMetadata({
    locale: localeValue,
    path: "/contact",
    title: copy.metadataTitle,
    description: pageDescriptions[localeValue].contact,
    image: "/og.png",
    imageAlt: "Mistfall Hunter field guide social preview",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeValue } = await params;
  if (!isLocale(localeValue)) notFound();

  const locale = localeValue;
  const dictionary = getDictionary(locale);
  const copy = legalPages[locale].contact;
  const url = new URL(localizedPath(locale, "/contact"), `${SITE_URL}/`).toString();
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.title,
    description: pageDescriptions[locale].contact,
    url,
    inLanguage: locale === "pt-br" ? "pt-BR" : locale,
    email: legalContactEmail,
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
          <a href={localizedPath("en", "/contact")}>{copy.englishHrefLabel}</a>
        </p>
      )}
      <NextReads
        links={[
          {
            href: localizedPath(locale, "/privacy"),
            label: dictionary.footer.privacy,
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
