import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdvertisementScript } from "../../components/Advertisement";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/navigation/SiteHeader";
import { WikiSidebar } from "../../components/navigation/WikiSidebar";
import { getDictionary } from "../../i18n/get-dictionary";
import { isLocale, type Locale } from "../../i18n/locales";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mistfall Hunter Wiki",
  description: "Mistfall Hunter Wiki with practical class, hunt, and extraction guides.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const documentLanguages: Record<Locale, string> = {
  en: "en",
  ja: "ja",
  de: "de",
  "pt-br": "pt-BR",
};

type LocalizedLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html lang={documentLanguages[locale]}>
      <head>
        <GoogleAnalytics />
        <AdvertisementScript />
      </head>
      <body>
        <div className="site-shell">
          <SiteHeader dictionary={dictionary} locale={locale} />
          <div className="site-frame">
            <main className="site-main" id="main-content">
              {children}
            </main>
            <WikiSidebar dictionary={dictionary} locale={locale} />
          </div>
          <SiteFooter dictionary={dictionary} locale={locale} />
        </div>
      </body>
    </html>
  );
}
