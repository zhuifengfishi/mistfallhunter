import type { MetadataRoute } from "next";
import { locales } from "../i18n/locales";
import { launchRoutes } from "../lib/routes";
import { SITE_URL } from "../lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    launchRoutes(locale).map((route) => ({
      url: new URL(route, `${SITE_URL}/`).toString(),
    })),
  );
}
