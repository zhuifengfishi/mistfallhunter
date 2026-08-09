import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/navigation/SiteHeader";
import { WikiSidebar } from "../../components/navigation/WikiSidebar";
import { getDictionary } from "../../i18n/get-dictionary";
import { isLocale } from "../../i18n/locales";

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
    <div className="site-shell">
      <SiteHeader dictionary={dictionary} locale={locale} />
      <div className="site-frame">
        <main className="site-main" id="main-content">
          {children}
        </main>
        <WikiSidebar dictionary={dictionary} locale={locale} />
      </div>
      <SiteFooter dictionary={dictionary} />
    </div>
  );
}
