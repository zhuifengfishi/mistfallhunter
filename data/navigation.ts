import { localizedPath, type Locale } from "../i18n/locales";

export type NavigationGroupId =
  | "getting-started"
  | "classes"
  | "builds"
  | "ciphers"
  | "maps"
  | "systems"
  | "updates";

export const navigationGroups = [
  { id: "getting-started", count: 1, items: ["home"] },
  { id: "classes", count: 2, items: ["overview", "best-class"] },
  { id: "builds", count: 0, items: [] },
  { id: "ciphers", count: 0, items: [] },
  { id: "maps", count: 0, items: [] },
  { id: "systems", count: 0, items: [] },
  { id: "updates", count: 0, items: [] },
] as const;

export function resolveNavigationHref(
  locale: Locale,
  id: NavigationGroupId,
): string {
  if (id === "classes") return localizedPath(locale, "/classes");
  const anchor = id === "getting-started" ? "start-here" : id;
  return `${localizedPath(locale)}#${anchor}`;
}

export function resolveNavigationItemHref(
  locale: Locale,
  group: NavigationGroupId,
  item: string,
): string {
  if (group === "getting-started" && item === "home") {
    return localizedPath(locale);
  }

  if (group === "classes" && item === "overview") {
    return localizedPath(locale, "/classes");
  }

  if (group === "classes" && item === "best-class") {
    return localizedPath(locale, "/classes/best-class");
  }

  return resolveNavigationHref(locale, group);
}
