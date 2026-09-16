import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { MediaPanel } from "../../../../components/MediaPanel";
import { NextReads } from "../../../../components/NextReads";
import { getGuide, guideSourceLinks } from "../../../../data/guides";
import { getDictionary } from "../../../../i18n/get-dictionary";
import { isLocale, localizedPath } from "../../../../i18n/locales";
import { buildPageMetadata, serializeJsonLd, SITE_URL } from "../../../../lib/seo/metadata";

type GuidePageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = locale === "en" ? getGuide(slug) : undefined;
  if (!guide || !isLocale(locale)) notFound();
  return buildPageMetadata({ locale, path: `/guides/${guide.slug}`, title: guide.metadataTitle, description: guide.description, image: guide.image, imageAlt: guide.imageAlt, type: "article" });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale, slug } = await params;
  const guide = locale === "en" ? getGuide(slug) : undefined;
  if (!guide || !isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const url = new URL(localizedPath(locale, `/guides/${guide.slug}`), `${SITE_URL}/`).toString();
  const articleJsonLd = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.updated, image: new URL(guide.image, `${SITE_URL}/`).toString(), mainEntityOfPage: url, url, inLanguage: "en", author: { "@type": "Organization", name: `${dictionary.brand.name} ${dictionary.brand.wiki}` } };
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: dictionary.nav.home, item: new URL("/en", `${SITE_URL}/`).toString() }, { "@type": "ListItem", position: 2, name: "Guides", item: new URL("/en#guides", `${SITE_URL}/`).toString() }, { "@type": "ListItem", position: 3, name: guide.title, item: url }] };

  const relatedLinks = [
    ...guide.related.flatMap((related) => {
      const item = getGuide(related);
      return item
        ? [{ href: localizedPath(locale, `/guides/${item.slug}`), label: item.title }]
        : [];
    }),
    {
      href: localizedPath(locale, "/classes/best-class"),
      label: "Best Class guide",
    },
    {
      href: localizedPath(locale),
      label: "Mistfall Hunter Wiki home",
    },
  ];

  return <article className="guide-page">
    <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} type="application/ld+json" />
    <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} type="application/ld+json" />
    <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} type="application/ld+json" />
    <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en#guides", label: "Guides" }, { label: guide.title }]} />
    <header className="guide-hero">
      <div><p className="home-kicker">{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.description}</p><p className="guide-review">Last reviewed <time dateTime={guide.updated}>{guide.updated}</time></p></div>
      <MediaPanel alt={guide.imageAlt} className="guide-hero__media" priority sizes="(max-width: 860px) 100vw, 44vw" src={guide.image} />
    </header>
    <section className="guide-answer"><p className="home-kicker">Quick answer</p><p>{guide.quickAnswer}</p></section>
    <nav aria-label="On this page" className="guide-toc"><strong>On this page</strong><ol>{guide.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 1}`}>{section.title}</a></li>)}<li><a href="#checklist">Run checklist</a></li><li><a href="#faq">FAQ</a></li></ol></nav>
    <div className="guide-body">{guide.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div>
    <section className="guide-checklist" id="checklist"><p className="home-kicker">Run checklist</p><h2>Use this before your next hunt</h2><ol>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ol></section>
    <section className="guide-faq" id="faq"><p className="home-kicker">Questions players ask</p><h2>Frequently asked questions</h2>{guide.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
    <NextReads className="guide-related" links={relatedLinks} title="Related Mistfall Hunter guides" />
    <section className="guide-sources"><p className="home-kicker">Source check</p><h2>Verify version-sensitive details</h2><p>Use the official game site and Steam news for current announcements, events, rules, and patch notes. Community discussion can add context, but official updates remain the source of record.</p><div>{guideSourceLinks.map((source) => <a href={source} key={source} rel="noopener noreferrer" target="_blank">{source === guideSourceLinks[2] ? "Steam News" : source === guideSourceLinks[1] ? "Steam" : "Official site"} <span aria-hidden="true">↗</span></a>)}</div></section>
  </article>;
}
