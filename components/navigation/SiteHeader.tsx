"use client";

import { usePathname } from "next/navigation";
import {
  navigationGroups,
  resolveNavigationHref,
  type NavigationGroupId,
} from "../../data/navigation";
import type { Dictionary } from "../../i18n/get-dictionary";
import { localizedPath, type Locale } from "../../i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNavigation } from "./MobileNavigation";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
};

const primaryNavigation = navigationGroups.filter(
  (group) => group.primary && group.destination !== null,
);

function labelFor(dictionary: Dictionary, id: NavigationGroupId): string {
  const labels: Record<NavigationGroupId, string> = {
    "getting-started": dictionary.nav.gettingStarted,
    classes: dictionary.nav.classes,
    builds: dictionary.nav.builds,
    ciphers: dictionary.nav.ciphers,
    maps: dictionary.nav.maps,
    systems: dictionary.nav.systems,
    updates: dictionary.nav.updates,
  };
  return labels[id];
}

export function SiteHeader({ dictionary, locale }: SiteHeaderProps) {
  const pathname = usePathname() ?? localizedPath(locale);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-brand" href={localizedPath(locale)}>
          <span className="site-brand__mark" aria-hidden="true">M</span>
          <span>
            <strong>{dictionary.brand.name}</strong>
            <small>{dictionary.brand.wiki}</small>
          </span>
        </a>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {primaryNavigation.map((group) => {
            const href = resolveNavigationHref(locale, group.id);
            if (!href) return null;
            const current = group.id === "classes" && pathname.startsWith(href);
            return (
              <a aria-current={current ? "page" : undefined} href={href} key={group.id}>
                {labelFor(dictionary, group.id)}
              </a>
            );
          })}
        </nav>
        <div className="site-header__actions">
          <LocaleSwitcher dictionary={dictionary} locale={locale} />
          <MobileNavigation dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </header>
  );
}
