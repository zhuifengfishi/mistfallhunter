"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "../../i18n/get-dictionary";
import { defaultLocale, isLocale, localizedPath } from "../../i18n/locales";

export default function LocalizedNotFound() {
  const pathname = usePathname() ?? localizedPath(defaultLocale);
  const candidate = pathname.split("/").filter(Boolean)[0] ?? defaultLocale;
  const locale = isLocale(candidate) ? candidate : defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <section className="home-closing">
      <div className="home-closing__content">
        <p className="home-kicker">404</p>
        <h1>{dictionary.errors.notFoundTitle}</h1>
        <p>{dictionary.errors.notFoundDescription}</p>
        <Link
          className="home-button home-button--primary"
          href={localizedPath(locale)}
        >
          {dictionary.errors.returnHome}
        </Link>
      </div>
    </section>
  );
}
