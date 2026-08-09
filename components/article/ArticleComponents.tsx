import type { ComponentPropsWithoutRef } from "react";
import { localizedPath, type Locale } from "../../i18n/locales";
import { isApprovedOfficialSourceUrl } from "../../lib/content/official-links";

type AnchorProps = ComponentPropsWithoutRef<"a">;

const localizedRoute = /^\/(?:en|ja|de|pt-br)(?=\/|$)/;

function resolveInternalHref(locale: Locale, href: string): string {
  if (href.startsWith("#")) return href;

  const path = href.startsWith("/") ? href.replace(localizedRoute, "") || "/" : href;
  return localizedPath(locale, path);
}

function ArticleLink({
  href = "",
  children,
  locale,
  ...props
}: AnchorProps & { href?: string; locale: Locale }) {
  if (/^https?:\/\//i.test(href)) {
    if (!isApprovedOfficialSourceUrl(href)) {
      return <span>{children}</span>;
    }

    return (
      <a {...props} href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <a {...props} href={resolveInternalHref(locale, href)}>
      {children}
    </a>
  );
}

type ArticleComponentsProps = {
  locale: Locale;
};

export function getArticleComponents({ locale }: ArticleComponentsProps) {
  return {
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2 {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3 {...props}>{children}</h3>
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
    table: (props: ComponentPropsWithoutRef<"table">) => (
      <div className="article-table-scroll">
        <table {...props} />
      </div>
    ),
    th: (props: ComponentPropsWithoutRef<"th">) => <th scope="col" {...props} />,
    td: (props: ComponentPropsWithoutRef<"td">) => <td {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => (
      <ArticleLink {...props} href={href} locale={locale}>
        {children}
      </ArticleLink>
    ),
  };
}
