import { localizedPath, type Locale } from "../i18n/locales";

export type NavigationGroupId =
  | "getting-started"
  | "classes"
  | "builds"
  | "ciphers"
  | "maps"
  | "systems"
  | "updates";

type NavigationDestination =
  | { kind: "route"; path: string }
  | { kind: "anchor"; id: string };

export const navigationGroups = [
  {
    id: "getting-started",
    count: 1,
    items: ["home"],
    destination: { kind: "anchor", id: "start-here" },
    primary: false,
  },
  {
    id: "classes",
    count: 2,
    items: ["overview", "best-class"],
    destination: { kind: "route", path: "/classes" },
    primary: true,
  },
  {
    id: "builds",
    count: 0,
    items: [],
    destination: { kind: "anchor", id: "builds" },
    primary: true,
  },
  {
    id: "ciphers",
    count: 0,
    items: [],
    destination: { kind: "anchor", id: "ciphers" },
    primary: true,
  },
  {
    id: "maps",
    count: 0,
    items: [],
    destination: { kind: "anchor", id: "maps" },
    primary: true,
  },
  {
    id: "systems",
    count: 0,
    items: [],
    destination: null,
    primary: false,
  },
  {
    id: "updates",
    count: 0,
    items: [],
    destination: { kind: "anchor", id: "updates" },
    primary: true,
  },
] as const;

export function resolveNavigationHref(
  locale: Locale,
  id: NavigationGroupId,
): string | null {
  const destination = navigationGroups.find((group) => group.id === id)
    ?.destination as NavigationDestination | null | undefined;
  if (!destination) return null;
  if (destination.kind === "route") return localizedPath(locale, destination.path);
  return `${localizedPath(locale)}#${destination.id}`;
}

export function resolveNavigationItemHref(
  locale: Locale,
  group: NavigationGroupId,
  item: string,
): string | null {
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
