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

type WikiSidebarProps = {
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
  return item;
}

export function WikiSidebar({ dictionary, locale }: WikiSidebarProps) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <aside className="wiki-sidebar" aria-label={dictionary.nav.wikiNavigation}>
      <p className="wiki-sidebar__title">{dictionary.nav.wikiNavigation}</p>
      <nav>
        {navigationGroups.map((group) => {
          const groupHref = resolveNavigationHref(locale, group.id);
          const expanded = group.id === "classes" && pathname.startsWith(groupHref);
          return (
            <section
              className={expanded ? "wiki-sidebar__group is-expanded" : "wiki-sidebar__group"}
              key={group.id}
            >
              <a href={groupHref}>
                <span>{groupLabel(dictionary, group.id)}</span>
                {group.count > 0 ? <span className="wiki-sidebar__count">{group.count}</span> : null}
              </a>
              {group.items.map((item) => {
                const href = resolveNavigationItemHref(locale, group.id, item);
                const current = pathname === href;
                return (
                  <a
                    aria-current={current ? "page" : undefined}
                    className={current ? "wiki-sidebar__item is-active" : "wiki-sidebar__item"}
                    href={href}
                    key={item}
                  >
                    <span>{itemLabel(dictionary, item)}</span>
                    {item === "best-class" ? (
                      <span className="wiki-sidebar__badge">{dictionary.article.popular}</span>
                    ) : null}
                  </a>
                );
              })}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
