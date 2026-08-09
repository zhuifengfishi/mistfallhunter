import type { Locale } from "../i18n/locales";

export type HomeTarget =
  | "start-here"
  | "classes"
  | "best-class"
  | "builds"
  | "ciphers"
  | "maps"
  | "updates"
  | "steam"
  | "steam-news"
  | "official-site";

export type HomeLink = {
  label: string;
  target: HomeTarget;
};

export type HomeCard = {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  target: HomeTarget;
  id?: "builds" | "ciphers" | "maps";
};

type HomeContent = {
  breadcrumb: string;
  badge: string;
  title: string;
  lead: string;
  heroAlt: string;
  statsLabel: string;
  stats: Array<{ label: string; value: string }>;
  actions: HomeLink[];
  update: {
    label: string;
    title: string;
    description: string;
    linkLabel: string;
  };
  start: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: HomeCard[];
  };
  trending: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: HomeCard[];
  };
  whatIs: {
    eyebrow: string;
    title: string;
    body: string[];
    mediaAlt: string;
    facts: Array<{ label: string; value: string }>;
  };
  explore: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: HomeCard[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primary: HomeLink;
    secondary: HomeLink;
    mediaAlt: string;
  };
};

export const officialLinks = {
  site: "https://mistfallhunter.com/",
  steam: "https://store.steampowered.com/app/3282300/",
  steamNews: "https://steamcommunity.com/app/3282300/allnews/",
} as const;

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    breadcrumb: "Home",
    badge: "Fan-made community wiki",
    title: "MISTFALL HUNTER",
    lead:
      "Practical class comparisons, hunt fundamentals, and extraction knowledge for every trip into the Gyldenmist.",
    heroAlt:
      "A hunter approaching a colossal corrupted tree in Mistfall Hunter",
    statsLabel: "Mistfall Hunter snapshot",
    stats: [
      { label: "Launch date", value: "Jul 29, 2026" },
      { label: "Playable classes", value: "Six" },
      { label: "Hunt format", value: "Solo or 3-player" },
    ],
    actions: [
      { label: "Start here", target: "start-here" },
      { label: "Compare classes", target: "classes" },
      { label: "View on Steam", target: "steam" },
    ],
    update: {
      label: "Current update",
      title: "Launch field guide",
      description:
        "Our starting guides are organized around the Jul 29, 2026 launch snapshot.",
      linkLabel: "Official updates",
    },
    start: {
      eyebrow: "Start Here",
      title: "Enter the mist with a plan.",
      intro:
        "Use these three routes to understand the hunt, choose a class, and prepare for extraction.",
      cards: [
        {
          eyebrow: "The premise",
          title: "Understand the hunt",
          description:
            "Get the short version of Mistfall Hunter before your first deployment.",
          linkLabel: "Learn the basics",
          target: "start-here",
        },
        {
          eyebrow: "Six paths",
          title: "Compare classes",
          description:
            "Review the six launch classes and choose a direction that fits your hunt.",
          linkLabel: "Open class overview",
          target: "classes",
        },
        {
          eyebrow: "Return alive",
          title: "Think extraction-first",
          description:
            "Build your route around what you can safely bring home, solo or with a team.",
          linkLabel: "Explore map notes",
          target: "maps",
        },
      ],
    },
    trending: {
      eyebrow: "Field notes",
      title: "Trending Now",
      intro: "The most useful launch-era routes through the wiki.",
      cards: [
        {
          eyebrow: "Popular",
          title: "Best Class",
          description:
            "Choose by playstyle, team role, and the risks you are comfortable taking.",
          linkLabel: "Read the guide",
          target: "best-class",
        },
        {
          eyebrow: "Overview",
          title: "All Six Classes",
          description:
            "Start with a complete view of the playable class roster.",
          linkLabel: "Compare classes",
          target: "classes",
        },
        {
          eyebrow: "Official",
          title: "Latest Updates",
          description:
            "Check the official Steam news feed for current announcements and patch notes.",
          linkLabel: "Open official news",
          target: "steam-news",
        },
      ],
    },
    whatIs: {
      eyebrow: "The hunt at a glance",
      title: "What is Mistfall Hunter?",
      body: [
        "Mistfall Hunter is built around dangerous hunts where preparation matters as much as the fight. Your goal is not only to enter the field, but to make it back with what you earn.",
        "At launch, hunters can choose among six classes and deploy alone or in a three-player team.",
      ],
      mediaAlt:
        "Three hunters facing a spectral enemy beneath the moon in Mistfall Hunter",
      facts: [
        { label: "Roster", value: "6 classes" },
        { label: "Solo", value: "Supported" },
        { label: "Teams", value: "3 players" },
      ],
    },
    explore: {
      eyebrow: "Field archive",
      title: "Explore the Wiki",
      intro:
        "The archive is growing around the decisions hunters make before, during, and after a deployment.",
      cards: [
        {
          eyebrow: "Loadouts",
          title: "Builds",
          description:
            "Class-focused build notes will collect practical starting points as the archive grows.",
          linkLabel: "Browse this section",
          target: "builds",
          id: "builds",
        },
        {
          eyebrow: "Clues",
          title: "Ciphers",
          description:
            "Keep cipher knowledge close when a clue turns a risky run into a useful one.",
          linkLabel: "Browse this section",
          target: "ciphers",
          id: "ciphers",
        },
        {
          eyebrow: "Routes",
          title: "Maps",
          description:
            "Use route and extraction notes to decide when to press on and when to leave.",
          linkLabel: "Browse this section",
          target: "maps",
          id: "maps",
        },
      ],
    },
    faq: {
      eyebrow: "Quick answers",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "When did Mistfall Hunter launch?",
          answer: "Mistfall Hunter launched on Jul 29, 2026.",
        },
        {
          question: "How many classes are available?",
          answer: "The launch roster contains six playable classes.",
        },
        {
          question: "Can I play solo?",
          answer:
            "Yes. Hunts support solo play as well as teams of three players.",
        },
      ],
    },
    closing: {
      eyebrow: "Prepare. Hunt. Return.",
      title: "Make the next run a smarter one.",
      description:
        "Start with the fundamentals, then use the class archive to choose your path through the mist.",
      primary: { label: "Start here", target: "start-here" },
      secondary: { label: "Official website", target: "official-site" },
      mediaAlt: "A hunter approaching a glowing chest in a ruined chamber",
    },
  },
  ja: {
    breadcrumb: "ホーム",
    badge: "ファン制作コミュニティWiki",
    title: "MISTFALL HUNTER",
    lead:
      "ギルデンミストへ挑むたびに役立つ、クラス比較、狩りの基礎、脱出知識をまとめています。",
    heroAlt: "Mistfall Hunterで巨大な腐敗した樹へ近づくハンター",
    statsLabel: "Mistfall Hunter 基本情報",
    stats: [
      { label: "発売日", value: "2026年7月29日" },
      { label: "プレイ可能クラス", value: "6種類" },
      { label: "狩りの形式", value: "ソロ / 3人チーム" },
    ],
    actions: [
      { label: "ここから始める", target: "start-here" },
      { label: "クラスを比較", target: "classes" },
      { label: "Steamで見る", target: "steam" },
    ],
    update: {
      label: "現在の更新",
      title: "ローンチ版フィールドガイド",
      description:
        "最初のガイドは2026年7月29日のローンチ時点を基準に整理しています。",
      linkLabel: "公式アップデート",
    },
    start: {
      eyebrow: "はじめに",
      title: "計画を立てて霧へ。",
      intro:
        "狩りを理解し、クラスを選び、脱出に備えるための3つの入口です。",
      cards: [
        {
          eyebrow: "ゲームの基本",
          title: "狩りを理解する",
          description: "初回出撃の前にMistfall Hunterの要点を確認します。",
          linkLabel: "基本を読む",
          target: "start-here",
        },
        {
          eyebrow: "6つの道",
          title: "クラスを比較する",
          description: "6つのローンチクラスから狩りに合う方向性を選びます。",
          linkLabel: "クラス概要を開く",
          target: "classes",
        },
        {
          eyebrow: "生還する",
          title: "脱出を優先する",
          description:
            "ソロでもチームでも、安全に持ち帰れるものを基準にルートを考えます。",
          linkLabel: "マップノートを見る",
          target: "maps",
        },
      ],
    },
    trending: {
      eyebrow: "フィールドノート",
      title: "注目のガイド",
      intro: "ローンチ期に役立つWikiの主要ガイドです。",
      cards: [
        {
          eyebrow: "人気",
          title: "おすすめクラス",
          description: "プレイスタイル、チームの役割、許容できるリスクから選びます。",
          linkLabel: "ガイドを読む",
          target: "best-class",
        },
        {
          eyebrow: "概要",
          title: "全6クラス",
          description: "プレイ可能なクラス全体を一覧で確認します。",
          linkLabel: "クラスを比較",
          target: "classes",
        },
        {
          eyebrow: "公式",
          title: "最新アップデート",
          description: "最新のお知らせとパッチノートは公式Steamニュースで確認できます。",
          linkLabel: "公式ニュースを開く",
          target: "steam-news",
        },
      ],
    },
    whatIs: {
      eyebrow: "狩りの概要",
      title: "Mistfall Hunterとは？",
      body: [
        "Mistfall Hunterは、戦闘だけでなく準備も重要になる危険な狩りを中心に展開します。戦場へ入るだけでなく、得たものを持って帰還することが目標です。",
        "ローンチ時点では6つのクラスから選び、ソロまたは3人チームで出撃できます。",
      ],
      mediaAlt: "月の下で霊体の敵と対峙する3人のハンター",
      facts: [
        { label: "クラス", value: "6種類" },
        { label: "ソロ", value: "対応" },
        { label: "チーム", value: "3人" },
      ],
    },
    explore: {
      eyebrow: "フィールド資料庫",
      title: "Wikiを探索",
      intro: "出撃前、狩りの最中、帰還後の判断を中心に資料を拡充しています。",
      cards: [
        {
          eyebrow: "装備構成",
          title: "ビルド",
          description: "クラス別の実用的な出発点をまとめていきます。",
          linkLabel: "この項目を見る",
          target: "builds",
          id: "builds",
        },
        {
          eyebrow: "手がかり",
          title: "暗号",
          description: "危険な狩りを有利に変える暗号知識をすぐ確認できます。",
          linkLabel: "この項目を見る",
          target: "ciphers",
          id: "ciphers",
        },
        {
          eyebrow: "ルート",
          title: "マップ",
          description: "進むか脱出するかを判断するためのルート情報を確認します。",
          linkLabel: "この項目を見る",
          target: "maps",
          id: "maps",
        },
      ],
    },
    faq: {
      eyebrow: "クイック回答",
      title: "よくある質問",
      items: [
        {
          question: "Mistfall Hunterの発売日は？",
          answer: "Mistfall Hunterは2026年7月29日に発売されました。",
        },
        {
          question: "クラスはいくつありますか？",
          answer: "ローンチ時のプレイ可能クラスは6種類です。",
        },
        {
          question: "ソロで遊べますか？",
          answer: "はい。ソロと3人チームの両方に対応しています。",
        },
      ],
    },
    closing: {
      eyebrow: "準備・狩り・帰還",
      title: "次の狩りを、もっと賢く。",
      description: "基礎から始め、クラス資料庫で霧を進む道を選びましょう。",
      primary: { label: "ここから始める", target: "start-here" },
      secondary: { label: "公式サイト", target: "official-site" },
      mediaAlt: "遺跡の光る宝箱へ近づくハンター",
    },
  },
  de: {
    breadcrumb: "Startseite",
    badge: "Fan-Wiki der Community",
    title: "MISTFALL HUNTER",
    lead:
      "Praktische Klassenvergleiche, Grundlagen der Jagd und Extraktionswissen für jeden Weg in den Gyldenmist.",
    heroAlt:
      "Ein Jäger nähert sich in Mistfall Hunter einem riesigen verdorbenen Baum",
    statsLabel: "Mistfall Hunter im Überblick",
    stats: [
      { label: "Veröffentlichung", value: "29. Juli 2026" },
      { label: "Spielbare Klassen", value: "Sechs" },
      { label: "Jagdformat", value: "Solo oder 3 Spieler" },
    ],
    actions: [
      { label: "Hier beginnen", target: "start-here" },
      { label: "Klassen vergleichen", target: "classes" },
      { label: "Auf Steam ansehen", target: "steam" },
    ],
    update: {
      label: "Aktueller Stand",
      title: "Feldführer zum Start",
      description:
        "Unsere ersten Guides sind nach dem Stand der Veröffentlichung am 29. Juli 2026 geordnet.",
      linkLabel: "Offizielle Updates",
    },
    start: {
      eyebrow: "Erste Schritte",
      title: "Mit einem Plan in den Nebel.",
      intro:
        "Drei Einstiege, um die Jagd zu verstehen, eine Klasse zu wählen und die Extraktion vorzubereiten.",
      cards: [
        {
          eyebrow: "Die Grundlage",
          title: "Die Jagd verstehen",
          description: "Lerne vor deinem ersten Einsatz die Kurzfassung von Mistfall Hunter.",
          linkLabel: "Grundlagen lesen",
          target: "start-here",
        },
        {
          eyebrow: "Sechs Wege",
          title: "Klassen vergleichen",
          description: "Vergleiche die sechs Startklassen und finde deine Richtung.",
          linkLabel: "Klassenübersicht öffnen",
          target: "classes",
        },
        {
          eyebrow: "Lebend zurück",
          title: "Extraktion zuerst",
          description:
            "Plane deine Route nach dem, was du allein oder im Team sicher heimbringen kannst.",
          linkLabel: "Kartennotizen erkunden",
          target: "maps",
        },
      ],
    },
    trending: {
      eyebrow: "Feldnotizen",
      title: "Aktuell beliebt",
      intro: "Die nützlichsten Wege durch das Wiki zum Start.",
      cards: [
        {
          eyebrow: "Beliebt",
          title: "Beste Klasse",
          description: "Wähle nach Spielstil, Teamrolle und deiner Risikobereitschaft.",
          linkLabel: "Guide lesen",
          target: "best-class",
        },
        {
          eyebrow: "Übersicht",
          title: "Alle sechs Klassen",
          description: "Verschaffe dir einen vollständigen Überblick über die spielbaren Klassen.",
          linkLabel: "Klassen vergleichen",
          target: "classes",
        },
        {
          eyebrow: "Offiziell",
          title: "Neueste Updates",
          description: "Aktuelle Meldungen und Patchnotes findest du im offiziellen Steam-Newsfeed.",
          linkLabel: "Offizielle News öffnen",
          target: "steam-news",
        },
      ],
    },
    whatIs: {
      eyebrow: "Die Jagd im Überblick",
      title: "Was ist Mistfall Hunter?",
      body: [
        "Mistfall Hunter dreht sich um gefährliche Jagden, bei denen Vorbereitung genauso wichtig ist wie der Kampf. Du musst nicht nur das Feld betreten, sondern auch mit deiner Beute zurückkehren.",
        "Zum Start stehen sechs Klassen zur Wahl. Du kannst allein oder in einem Team aus drei Spielern antreten.",
      ],
      mediaAlt: "Drei Jäger stehen unter dem Mond einem geisterhaften Gegner gegenüber",
      facts: [
        { label: "Auswahl", value: "6 Klassen" },
        { label: "Solo", value: "Unterstützt" },
        { label: "Teams", value: "3 Spieler" },
      ],
    },
    explore: {
      eyebrow: "Feldarchiv",
      title: "Wiki entdecken",
      intro: "Das Archiv wächst rund um Entscheidungen vor, während und nach einem Einsatz.",
      cards: [
        {
          eyebrow: "Ausrüstung",
          title: "Builds",
          description: "Klassenbezogene Build-Notizen sammeln praktische Ausgangspunkte.",
          linkLabel: "Bereich ansehen",
          target: "builds",
          id: "builds",
        },
        {
          eyebrow: "Hinweise",
          title: "Chiffren",
          description: "Halte Chiffrenwissen bereit, wenn ein Hinweis die Jagd verändern kann.",
          linkLabel: "Bereich ansehen",
          target: "ciphers",
          id: "ciphers",
        },
        {
          eyebrow: "Routen",
          title: "Karten",
          description: "Nutze Routen- und Extraktionsnotizen für die Entscheidung: weiter oder zurück.",
          linkLabel: "Bereich ansehen",
          target: "maps",
          id: "maps",
        },
      ],
    },
    faq: {
      eyebrow: "Kurze Antworten",
      title: "Häufig gestellte Fragen",
      items: [
        {
          question: "Wann erschien Mistfall Hunter?",
          answer: "Mistfall Hunter erschien am 29. Juli 2026.",
        },
        {
          question: "Wie viele Klassen gibt es?",
          answer: "Zum Start gibt es sechs spielbare Klassen.",
        },
        {
          question: "Kann ich solo spielen?",
          answer: "Ja. Jagden unterstützen Solo-Spiel und Teams aus drei Spielern.",
        },
      ],
    },
    closing: {
      eyebrow: "Vorbereiten. Jagen. Zurückkehren.",
      title: "Mach den nächsten Einsatz klüger.",
      description: "Beginne mit den Grundlagen und wähle im Klassenarchiv deinen Weg durch den Nebel.",
      primary: { label: "Hier beginnen", target: "start-here" },
      secondary: { label: "Offizielle Website", target: "official-site" },
      mediaAlt: "Ein Jäger nähert sich einer leuchtenden Truhe in einer Ruine",
    },
  },
  "pt-br": {
    breadcrumb: "Início",
    badge: "Wiki da comunidade feita por fãs",
    title: "MISTFALL HUNTER",
    lead:
      "Comparações práticas de classes, fundamentos da caçada e conhecimento de extração para cada jornada pela Gyldenmist.",
    heroAlt:
      "Um caçador se aproxima de uma árvore corrompida colossal em Mistfall Hunter",
    statsLabel: "Resumo de Mistfall Hunter",
    stats: [
      { label: "Lançamento", value: "29 de jul. de 2026" },
      { label: "Classes jogáveis", value: "Seis" },
      { label: "Formato da caçada", value: "Solo ou 3 jogadores" },
    ],
    actions: [
      { label: "Comece aqui", target: "start-here" },
      { label: "Comparar classes", target: "classes" },
      { label: "Ver no Steam", target: "steam" },
    ],
    update: {
      label: "Atualização atual",
      title: "Guia de campo do lançamento",
      description:
        "Nossos primeiros guias estão organizados com base no lançamento de 29 de julho de 2026.",
      linkLabel: "Atualizações oficiais",
    },
    start: {
      eyebrow: "Comece aqui",
      title: "Entre na névoa com um plano.",
      intro:
        "Três caminhos para entender a caçada, escolher uma classe e preparar a extração.",
      cards: [
        {
          eyebrow: "A premissa",
          title: "Entenda a caçada",
          description: "Veja o essencial de Mistfall Hunter antes da primeira expedição.",
          linkLabel: "Ler o básico",
          target: "start-here",
        },
        {
          eyebrow: "Seis caminhos",
          title: "Compare as classes",
          description: "Analise as seis classes do lançamento e escolha sua direção.",
          linkLabel: "Abrir visão geral",
          target: "classes",
        },
        {
          eyebrow: "Volte com vida",
          title: "Pense primeiro na extração",
          description: "Planeje a rota pelo que você pode trazer de volta, solo ou em equipe.",
          linkLabel: "Explorar notas de mapas",
          target: "maps",
        },
      ],
    },
    trending: {
      eyebrow: "Notas de campo",
      title: "Em alta agora",
      intro: "Os caminhos mais úteis pelo wiki na época do lançamento.",
      cards: [
        {
          eyebrow: "Popular",
          title: "Melhor classe",
          description: "Escolha pelo estilo, papel na equipe e riscos que aceita enfrentar.",
          linkLabel: "Ler o guia",
          target: "best-class",
        },
        {
          eyebrow: "Visão geral",
          title: "Todas as seis classes",
          description: "Comece com uma visão completa das classes jogáveis.",
          linkLabel: "Comparar classes",
          target: "classes",
        },
        {
          eyebrow: "Oficial",
          title: "Últimas atualizações",
          description: "Veja anúncios e notas de patch no feed oficial de notícias do Steam.",
          linkLabel: "Abrir notícias oficiais",
          target: "steam-news",
        },
      ],
    },
    whatIs: {
      eyebrow: "A caçada em resumo",
      title: "O que é Mistfall Hunter?",
      body: [
        "Mistfall Hunter gira em torno de caçadas perigosas nas quais a preparação importa tanto quanto o combate. O objetivo não é apenas entrar em campo, mas voltar com o que conquistou.",
        "No lançamento, os caçadores podem escolher entre seis classes e partir sozinhos ou em equipes de três jogadores.",
      ],
      mediaAlt: "Três caçadores enfrentam um inimigo espectral sob a lua",
      facts: [
        { label: "Elenco", value: "6 classes" },
        { label: "Solo", value: "Disponível" },
        { label: "Equipes", value: "3 jogadores" },
      ],
    },
    explore: {
      eyebrow: "Arquivo de campo",
      title: "Explore o Wiki",
      intro: "O arquivo cresce em torno das decisões tomadas antes, durante e depois da expedição.",
      cards: [
        {
          eyebrow: "Equipamentos",
          title: "Builds",
          description: "Notas por classe reunirão pontos de partida práticos conforme o arquivo crescer.",
          linkLabel: "Ver esta seção",
          target: "builds",
          id: "builds",
        },
        {
          eyebrow: "Pistas",
          title: "Cifras",
          description: "Tenha o conhecimento de cifras à mão quando uma pista mudar a caçada.",
          linkLabel: "Ver esta seção",
          target: "ciphers",
          id: "ciphers",
        },
        {
          eyebrow: "Rotas",
          title: "Mapas",
          description: "Use notas de rota e extração para decidir entre avançar ou partir.",
          linkLabel: "Ver esta seção",
          target: "maps",
          id: "maps",
        },
      ],
    },
    faq: {
      eyebrow: "Respostas rápidas",
      title: "Perguntas frequentes",
      items: [
        {
          question: "Quando Mistfall Hunter foi lançado?",
          answer: "Mistfall Hunter foi lançado em 29 de julho de 2026.",
        },
        {
          question: "Quantas classes estão disponíveis?",
          answer: "O elenco de lançamento tem seis classes jogáveis.",
        },
        {
          question: "Posso jogar solo?",
          answer: "Sim. As caçadas permitem jogo solo e equipes de três jogadores.",
        },
      ],
    },
    closing: {
      eyebrow: "Prepare-se. Cace. Retorne.",
      title: "Faça da próxima expedição uma escolha mais inteligente.",
      description: "Comece pelos fundamentos e use o arquivo de classes para escolher seu caminho pela névoa.",
      primary: { label: "Comece aqui", target: "start-here" },
      secondary: { label: "Site oficial", target: "official-site" },
      mediaAlt: "Um caçador se aproxima de um baú brilhante em uma ruína",
    },
  },
};
