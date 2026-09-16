import type { Metadata } from "next";
import { localizedPath, type Locale } from "../../i18n/locales";

/** Public origin used for canonical URLs. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://mistfall-hunter.net";

const hreflangByLocale: Record<Locale, string> = {
  en: "en",
  ja: "ja",
  de: "de",
  "pt-br": "pt-BR",
};

const openGraphLocaleByLocale: Record<Locale, string> = {
  en: "en_US",
  ja: "ja_JP",
  de: "de_DE",
  "pt-br": "pt_BR",
};

const metadataLocales = Object.keys(hreflangByLocale) as Locale[];

export const pageDescriptions = {
  en: {
    home: "Mistfall Hunter Wiki: practical guides for classes, combat, extraction, solo hunts, team roles, maps, and launch updates before you enter the Gyldenmist.",
    classes: "Compare every Mistfall Hunter class by weapon, role, solo safety, and team value, then open the detailed Best Class guide for current recommendations.",
    bestClass: "Compare all six Mistfall Hunter classes for beginners, solo extraction, PvE, PvP, and coordinated teams using the current balance snapshot and role guidance.",
    privacy: "Privacy policy for the Mistfall Hunter Wiki covering analytics, advertising cookies, and how to contact editors about data or content removal requests today.",
    contact: "Contact Mistfall Hunter Wiki editors for corrections, feedback, or takedown requests. Unofficial fan site; no official game support or account resets here.",
  },
  ja: {
    home: "Mistfall Hunterのクラス、戦闘、脱出、ソロ攻略、チーム役割、マップ、最新情報を実践的に解説。ギルデンミストへ向かう前に、準備から帰還まで役立つローンチ版ガイドを確認し、自分に合う狩りの計画を立てましょう。初心者にも経験者にも使いやすい情報をまとめています。ぜひ活用してください。",
    classes: "Mistfall Hunterの全6クラスを武器、役割、ソロでの安全性、チーム貢献の観点から比較。現在のバランス情報を踏まえ、自分のプレイスタイルとリスク許容度に合うクラスを見つけ、詳細なおすすめクラスガイドで次の狩りに備えましょう。初心者向けの選び方も確認できます。最新情報も確認。",
    bestClass: "初心者、ソロ脱出、PvE、PvP、連携チーム向けに、現在のバランス時点で6つのMistfall Hunterクラスを比較します。武器のテンポ、役割、リスク、立ち回りを確認し、自分が安定して扱えるクラスを選ぶための実践的な判断基準とチーム編成の考え方を紹介します。最新情報は公式発表も確認してください。",
    privacy: "Mistfall Hunter Wikiのプライバシー方針として、解析ツールと広告Cookieの扱い、データや削除に関する問い合わせ方法をまとめます。非公式ファンサイトであり、詳細は英語版もあわせてご確認ください。最新情報も確認できます。ぜひご活用ください。内容を確認しましょう。",
    contact: "Mistfall Hunter Wikiへのお問い合わせ窓口です。修正依頼、フィードバック、削除要望の送り方を案内します。公式ゲームサポートやアカウントの復旧はできません。詳細は英語版もあわせてご確認ください。最新情報も確認できます。ぜひご活用ください。内容をよくご確認ください。",
  },
  de: {
    home: "Entdecke praktische Mistfall-Hunter-Guides zu Klassen, Kämpfen, Extraktion, Solo-Jagden, Teamrollen, Karten und Updates vor deinem Weg in den Gyldenmist.",
    classes: "Vergleiche sechs Mistfall-Hunter-Klassen nach Waffe, Rolle, Solo-Sicherheit und Teamwert und finde mit dem aktuellen Guide die passende Wahl für deine Jagd.",
    bestClass: "Vergleiche alle sechs Mistfall-Hunter-Klassen für Einsteiger, Solo-Extraktion, PvE, PvP und koordinierte Teams mit aktuellem Rollen- und Balance-Leitfaden.",
    privacy: "Datenschutz für das Mistfall Hunter Wiki: Analytics, Werbe-Cookies und Kontakt für Daten- oder Entfernungsanfragen. Mehr Details auf der englischen Seite.",
    contact: "Kontakt zum Mistfall Hunter Wiki für Korrekturen, Feedback oder Entfernungsanfragen. Kein offizieller Gamesupport. Mehr Details stehen auf der englischen Seite.",
  },
  "pt-br": {
    home: "Explore guias de Mistfall Hunter sobre classes, combate, extração, caçadas solo, funções de equipe, mapas e atualizações antes da jornada pela Gyldenmist.",
    classes: "Compare as seis classes de Mistfall Hunter por arma, função, segurança solo e valor para a equipe, e use o guia atual para escolher sua próxima caçada.",
    bestClass: "Compare as seis classes de Mistfall Hunter para iniciantes, extração solo, PvE, PvP e equipes coordenadas com orientações atuais de função e balanceamento.",
    privacy: "Privacidade do Mistfall Hunter Wiki: analytics, cookies de anúncios e contato sobre dados ou remoção. Site de fãs não oficial; veja também a versão em inglês.",
    contact: "Contato do Mistfall Hunter Wiki para correções, feedback ou pedidos de remoção. Sem suporte oficial do jogo; veja também a versão em inglês com mais detalhes.",
  },
} satisfies Record<Locale, Record<"home" | "classes" | "bestClass" | "privacy" | "contact", string>>;

type PageMetadataInput = {
  baseUrl?: string;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type?: "website" | "article";
};

function absoluteUrl(baseUrl: string, path: string): string {
  return new URL(path, `${baseUrl.replace(/\/+$/, "")}/`).toString();
}

export function buildAlternates(
  baseUrl: string,
  path: string,
  locale: Locale,
): NonNullable<Metadata["alternates"]> {
  const languages = Object.fromEntries(
    metadataLocales.map((candidate) => [
      hreflangByLocale[candidate],
      absoluteUrl(baseUrl, localizedPath(candidate, path)),
    ]),
  );

  return {
    canonical: absoluteUrl(baseUrl, localizedPath(locale, path)),
    languages,
  };
}

export function buildPageMetadata({
  baseUrl = SITE_URL,
  locale,
  path,
  title,
  description,
  image,
  imageAlt,
  type = "website",
}: PageMetadataInput): Metadata {
  if (title.length > 60) {
    throw new Error("Metadata title must be 60 characters or fewer.");
  }
  if (description.length < 140 || description.length > 160) {
    throw new Error("Metadata description must be between 140 and 160 characters.");
  }

  const canonical = absoluteUrl(baseUrl, localizedPath(locale, path));
  const socialImage = {
    url: absoluteUrl(baseUrl, image),
    alt: imageAlt,
  };

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: buildAlternates(baseUrl, path, locale),
    openGraph: {
      type,
      siteName: "Mistfall Hunter Wiki",
      title,
      description,
      url: canonical,
      locale: openGraphLocaleByLocale[locale],
      alternateLocale: metadataLocales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => openGraphLocaleByLocale[candidate]),
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
