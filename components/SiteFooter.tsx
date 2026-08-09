import type { Dictionary } from "../i18n/get-dictionary";

type SiteFooterProps = {
  dictionary: Dictionary;
};

export function SiteFooter({ dictionary }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p>{dictionary.footer.disclaimer}</p>
      <div className="site-footer__meta">
        <span>© {new Date().getFullYear()} {dictionary.footer.copyright}</span>
        <span className="site-footer__links">
          <a href="https://mistfallhunter.com/" rel="noreferrer" target="_blank">
            {dictionary.footer.officialSite}
          </a>
          <a
            href="https://store.steampowered.com/app/3282300/"
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
