import type { Locale } from "../i18n/locales";
import { localizedPath } from "../i18n/locales";

export const launchPaths = ["/", "/classes", "/classes/best-class"] as const;

export function launchRoutes(locale: Locale): string[] {
  return launchPaths.map((path) => localizedPath(locale, path));
}
