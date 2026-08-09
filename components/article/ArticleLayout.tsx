import type { ReactNode } from "react";
import { officialLinks } from "../../data/home";
import type { Dictionary } from "../../i18n/get-dictionary";
import { localizedPath, type Locale } from "../../i18n/locales";
import type { ArticleDocument } from "../../lib/content/mdx";
import { Breadcrumbs } from "../Breadcrumbs";

type ArticleLayoutProps = {
  article: ArticleDocument;
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
};

function sourceLabel(source: string): string {
  if (source === officialLinks.site) return "Mistfall Hunter";
  if (source === officialLinks.steam) return "Steam";
  return source;
}

export function ArticleLayout({
  article,
  children,
  dictionary,
  locale,
}: ArticleLayoutProps) {
  const { frontmatter } = article;

  return (
    <article className="article-layout">
      <Breadcrumbs
        items={[
          { href: localizedPath(locale), label: dictionary.nav.home },
          { href: localizedPath(locale, "/classes"), label: dictionary.nav.classes },
          { label: dictionary.nav.bestClass },
        ]}
      />

      <header className="article-layout__header">
        <p className="article-layout__badge">{frontmatter.badge}</p>
        <h1>{frontmatter.title}</h1>
        <p className="article-layout__standfirst">{frontmatter.description}</p>
        <p className="article-layout__updated">
          <span>{dictionary.article.updated}</span>{" "}
          <time dateTime={frontmatter.updated}>{frontmatter.updated}</time>
        </p>
      </header>

      <aside aria-label="Advertisement" className="article-layout__ad" />

      <div className="article-layout__content">{children}</div>

      <section aria-labelledby="article-sources" className="article-layout__sources">
        <p className="home-kicker">{dictionary.article.related}</p>
        <h2 id="article-sources">{dictionary.article.sources}</h2>
        <div>
          <a href={localizedPath(locale, "/classes")}>{dictionary.classes.overview}</a>
          {frontmatter.sources.map((source) => (
            <a href={source} key={source} rel="noopener noreferrer" target="_blank">
              {sourceLabel(source)}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
