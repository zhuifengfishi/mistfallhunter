import type { Locale } from "../i18n/locales";
import { localizedPath } from "../i18n/locales";

import { guideSlugs } from "../data/guides";

export const launchPaths = ["/", "/classes", "/classes/best-class"] as const;

export function launchRoutes(locale: Locale): string[] {
  const routes = launchPaths.map((path) => localizedPath(locale, path));
  if (locale === "en") routes.push(...guideSlugs.map((slug) => localizedPath(locale, `/guides/${slug}`)));
  return routes;
}
