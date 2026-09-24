import type { Locale } from "../i18n/locales";
import { localizedPath } from "../i18n/locales";

import { guideSlugs } from "../data/guides";
import { newsSlugs } from "../data/news";

export const launchPaths = ["/", "/classes", "/classes/best-class", "/privacy", "/contact"] as const;

export function launchRoutes(locale: Locale): string[] {
  const routes = launchPaths.map((path) => localizedPath(locale, path));
  if (locale === "en") {
    routes.push(localizedPath(locale, "/news"));
    routes.push(...guideSlugs.map((slug) => localizedPath(locale, `/guides/${slug}`)));
    routes.push(...newsSlugs.map((slug) => localizedPath(locale, `/news/${slug}`)));
  }
  return routes;
}
