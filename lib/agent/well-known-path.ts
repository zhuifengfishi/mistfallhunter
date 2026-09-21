import { locales } from "../../i18n/locales";

const LOCALE_RE = locales.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

/**
 * Normalize agent discovery well-known paths when a locale prefix or suffix
 * is attached (e.g. OAuth PRM discovery for resource https://host/en →
 * /.well-known/oauth-protected-resource/en).
 *
 * Does not touch real locale HTML routes outside well-known.
 */
export function normalizeWellKnownPath(pathname: string): string {
  let path = pathname;

  // /{locale}/.well-known/... or /{locale}/well-known/... → drop locale prefix
  const prefix = path.match(
    new RegExp(`^/(?:${LOCALE_RE})(/\\.?well-known(?:/.*)?)$`),
  );
  if (prefix) path = prefix[1];

  // ^/(\.?)well-known/(.+)/{locale}/?$ → /$1well-known/$2
  const suffix = path.match(
    new RegExp(`^(/\\.?well-known/.+)/(?:${LOCALE_RE})/?$`),
  );
  if (suffix) path = suffix[1];

  return path;
}

/**
 * Map a public well-known request path onto the App Router /well-known/*
 * handlers, including locale-stripped aliases.
 * Returns null when no rewrite is needed.
 */
export function rewriteWellKnownRequestPath(pathname: string): string | null {
  let target = normalizeWellKnownPath(pathname);

  if (target === "/.well-known" || target.startsWith("/.well-known/")) {
    target = target.replace("/.well-known", "/well-known");
  }

  if (
    target !== pathname &&
    (target === "/well-known" || target.startsWith("/well-known/"))
  ) {
    return target;
  }

  return null;
}
