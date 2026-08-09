export const locales = ["en", "ja", "de", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "/"): string {
  const suffix = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `/${locale}${suffix}`;
}

export function equivalentLocalePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) segments.shift();
  return localizedPath(locale, segments.join("/"));
}
