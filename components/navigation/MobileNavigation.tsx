"use client";

import { usePathname } from "next/navigation";
import {
  navigationGroups,
  resolveNavigationHref,
  resolveNavigationItemHref,
  type NavigationGroupId,
} from "../../data/navigation";
import type { Dictionary } from "../../i18n/get-dictionary";
import type { Locale } from "../../i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";

type MobileNavigationProps = {
  dictionary: Dictionary;
  locale: Locale;
};

function groupLabel(dictionary: Dictionary, id: NavigationGroupId): string {
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

function itemLabel(dictionary: Dictionary, item: string): string {
  if (item === "home") return dictionary.nav.home;
  if (item === "overview") return dictionary.nav.overview;
  if (item === "best-class") return dictionary.nav.bestClass;
  if (item === "news-hub") return dictionary.nav.updates;
  return item;
}

export function MobileNavigation({
  dictionary,
  locale,
}: MobileNavigationProps) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <details className="mobile-navigation">
      <summary aria-label={dictionary.nav.menu}>
        <span aria-hidden="true">Menu</span>
      </summary>
      <div className="mobile-navigation__drawer">
        <nav aria-label={dictionary.nav.wikiNavigation}>
          {navigationGroups.map((group) => {
            const groupHref = resolveNavigationHref(locale, group.id);
            const groupContent = (
              <>
                {groupLabel(dictionary, group.id)}
                {group.count > 0 ? <span>{group.count}</span> : null}
              </>
            );
            return (
              <section className="mobile-navigation__group" key={group.id}>
                {groupHref ? (
                  <a href={groupHref}>{groupContent}</a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="mobile-navigation__group-label"
                  >
                    {groupContent}
                  </span>
                )}
                {group.items.map((item) => {
                  const href = resolveNavigationItemHref(locale, group.id, item);
                  const current = pathname === href;
                  return href ? (
                    <a
                      aria-current={current ? "page" : undefined}
                      href={href}
                      key={item}
                    >
                      {itemLabel(dictionary, item)}
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="mobile-navigation__item-label"
                      key={item}
                    >
                      {itemLabel(dictionary, item)}
                    </span>
                  );
                })}
              </section>
            );
          })}
        </nav>
        <LocaleSwitcher dictionary={dictionary} locale={locale} />
      </div>
    </details>
  );
}
