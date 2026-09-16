import type { Locale } from "../i18n/locales";

export type LegalPageSlug = "privacy" | "contact";

export type LegalPageCopy = {
  breadcrumb: string;
  title: string;
  metadataTitle: string;
  lead: string;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  note: string;
  englishHrefLabel?: string;
};

export const legalContactEmail = "hello@mistfall-hunter.net";
export const legalGithubIssues =
  "https://github.com/zhuifengfishi/mistfallhunter/issues";

const enPrivacy: LegalPageCopy = {
  breadcrumb: "Privacy",
  title: "Privacy Policy",
  metadataTitle: "Mistfall Hunter Wiki Privacy Policy",
  lead:
    "This unofficial Mistfall Hunter Wiki may use analytics and advertising tools to understand traffic and keep the site running.",
  sections: [
    {
      heading: "What this policy covers",
      paragraphs: [
        "This fan-made community wiki is not affiliated with Bellring Games. We do not sell personal information as a product.",
        "Third-party analytics and ad networks may set cookies or similar technologies under their own policies.",
      ],
      bullets: [
        "Google Analytics (measurement ID configured on this site) may collect usage metrics.",
        "Advertising partners may show ads and measure impressions or clicks.",
        "You can limit cookies in your browser; some ads or measurement features may then be reduced.",
      ],
    },
    {
      heading: "Requests",
      paragraphs: [
        "For privacy questions, data concerns, or content removal requests related to this wiki, contact the editors using the address on the Contact page.",
      ],
    },
  ],
  note: "Last reviewed 2026-09-16. Unofficial fan site — not affiliated with Bellring Games.",
};

const enContact: LegalPageCopy = {
  breadcrumb: "Contact",
  title: "Contact",
  metadataTitle: "Mistfall Hunter Wiki Contact",
  lead:
    "Reach the Mistfall Hunter Wiki editors for corrections, feedback, or takedown requests about this unofficial fan site.",
  sections: [
    {
      heading: "How to reach us",
      paragraphs: [
        "Email the editors or open a GitHub issue. Mailbox setup may follow DNS changes; GitHub Issues works once the repository is public.",
      ],
      bullets: [
        `Email: ${legalContactEmail}`,
        `GitHub Issues: ${legalGithubIssues}`,
        "Game support, account recovery, bans, and refunds must go through official Mistfall Hunter / Bellring Games channels — we cannot help with those.",
      ],
    },
  ],
  note: "Unofficial fan site — not affiliated with Bellring Games.",
};

export const legalPages: Record<
  Locale,
  Record<LegalPageSlug, LegalPageCopy>
> = {
  en: {
    privacy: enPrivacy,
    contact: enContact,
  },
  ja: {
    privacy: {
      breadcrumb: "プライバシー",
      title: "プライバシー方針",
      metadataTitle: "Mistfall Hunter Wiki プライバシー",
      lead:
        "この非公式Wikiでは、アクセス解析と広告のためのCookie等が使われる場合があります。",
      sections: [
        {
          heading: "概要",
          paragraphs: [
            "個人情報を商品として販売しません。解析・広告の詳細は英語版もあわせて確認してください。",
          ],
          bullets: [
            "Google Analytics と広告パートナーが利用される場合があります。",
            "ブラウザ設定でCookieを制限できます。",
            `連絡先: ${legalContactEmail}`,
          ],
        },
      ],
      note: "非公式ファンサイトです。Bellring Games とは無関係です。",
      englishHrefLabel: "英語版のプライバシー方針を読む",
    },
    contact: {
      breadcrumb: "お問い合わせ",
      title: "お問い合わせ",
      metadataTitle: "Mistfall Hunter Wiki お問い合わせ",
      lead: "修正依頼、フィードバック、削除要望は編集チームへご連絡ください。",
      sections: [
        {
          heading: "連絡方法",
          paragraphs: [
            "公式のゲームサポートやアカウント復旧には対応できません。詳細は英語版も参照してください。",
          ],
          bullets: [
            `メール: ${legalContactEmail}`,
            `GitHub Issues: ${legalGithubIssues}`,
          ],
        },
      ],
      note: "非公式ファンサイトです。Bellring Games とは無関係です。",
      englishHrefLabel: "英語版の連絡ページを読む",
    },
  },
  de: {
    privacy: {
      breadcrumb: "Datenschutz",
      title: "Datenschutz",
      metadataTitle: "Mistfall Hunter Wiki Datenschutz",
      lead:
        "Dieses inoffizielle Wiki kann Analytics- und Werbe-Cookies verwenden.",
      sections: [
        {
          heading: "Kurzfassung",
          paragraphs: [
            "Wir verkaufen keine personenbezogenen Daten als Produkt. Mehr Details findest du auf der englischen Seite.",
          ],
          bullets: [
            "Google Analytics und Werbepartner können aktiv sein.",
            "Cookies lassen sich im Browser einschränken.",
            `Kontakt: ${legalContactEmail}`,
          ],
        },
      ],
      note: "Inoffizielle Fanseite — nicht verbunden mit Bellring Games.",
      englishHrefLabel: "Englische Datenschutzseite lesen",
    },
    contact: {
      breadcrumb: "Kontakt",
      title: "Kontakt",
      metadataTitle: "Mistfall Hunter Wiki Kontakt",
      lead:
        "Korrekturen, Feedback oder Entfernungsanfragen an die Wiki-Redaktion.",
      sections: [
        {
          heading: "Erreichbarkeit",
          paragraphs: [
            "Kein offizieller Gamesupport und keine Account-Hilfe. Details auch auf der englischen Seite.",
          ],
          bullets: [
            `E-Mail: ${legalContactEmail}`,
            `GitHub Issues: ${legalGithubIssues}`,
          ],
        },
      ],
      note: "Inoffizielle Fanseite — nicht verbunden mit Bellring Games.",
      englishHrefLabel: "Englische Kontaktseite lesen",
    },
  },
  "pt-br": {
    privacy: {
      breadcrumb: "Privacidade",
      title: "Privacidade",
      metadataTitle: "Mistfall Hunter Wiki Privacidade",
      lead:
        "Este wiki não oficial pode usar analytics e cookies de anúncios.",
      sections: [
        {
          heading: "Resumo",
          paragraphs: [
            "Não vendemos informações pessoais como produto. Veja também a versão em inglês para mais detalhes.",
          ],
          bullets: [
            "Google Analytics e parceiros de anúncios podem estar ativos.",
            "Você pode limitar cookies no navegador.",
            `Contato: ${legalContactEmail}`,
          ],
        },
      ],
      note: "Site de fãs não oficial — sem vínculo com a Bellring Games.",
      englishHrefLabel: "Ler a política de privacidade em inglês",
    },
    contact: {
      breadcrumb: "Contato",
      title: "Contato",
      metadataTitle: "Mistfall Hunter Wiki Contato",
      lead:
        "Envie correções, feedback ou pedidos de remoção aos editores deste wiki.",
      sections: [
        {
          heading: "Como falar conosco",
          paragraphs: [
            "Não oferecemos suporte oficial do jogo nem recuperação de conta. Veja também a versão em inglês.",
          ],
          bullets: [
            `E-mail: ${legalContactEmail}`,
            `GitHub Issues: ${legalGithubIssues}`,
          ],
        },
      ],
      note: "Site de fãs não oficial — sem vínculo com a Bellring Games.",
      englishHrefLabel: "Ler a página de contato em inglês",
    },
  },
};
