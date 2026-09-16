import { officialLinks } from "../data/official-links";
import type { Dictionary } from "../i18n/get-dictionary";
import { localizedPath, type Locale } from "../i18n/locales";

type SiteFooterProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p>{dictionary.footer.disclaimer}</p>
      <div className="site-footer__meta">
        <span>© {new Date().getFullYear()} {dictionary.footer.copyright}</span>
        <span className="site-footer__links">
          <a href={localizedPath(locale, "/privacy")}>{dictionary.footer.privacy}</a>
          <a href={localizedPath(locale, "/contact")}>{dictionary.footer.contact}</a>
          <a href={officialLinks.site} rel="noreferrer" target="_blank">
            {dictionary.footer.officialSite}
          </a>
          <a
            href={officialLinks.steam}
            rel="noreferrer"
            target="_blank"
          >
            {dictionary.footer.steam}
          </a>
        </span>
      </div>
    </footer>
  );
}
