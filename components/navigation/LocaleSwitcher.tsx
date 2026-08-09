"use client";

import { usePathname } from "next/navigation";
import type { Dictionary } from "../../i18n/get-dictionary";
import {
  equivalentLocalePath,
  locales,
  type Locale,
} from "../../i18n/locales";

type LocaleSwitcherProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function LocaleSwitcher({
  dictionary,
  locale,
}: LocaleSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <details className="locale-switcher">
      <summary aria-label={dictionary.nav.language}>
        {dictionary.nav.languages[locale]}
      </summary>
      <div className="locale-switcher__menu" aria-label={dictionary.nav.language}>
        {locales.map((targetLocale) => (
          <a
            aria-current={targetLocale === locale ? "true" : undefined}
            href={equivalentLocalePath(pathname, targetLocale)}
            key={targetLocale}
          >
            {dictionary.nav.languages[targetLocale]}
          </a>
        ))}
      </div>
    </details>
  );
}
