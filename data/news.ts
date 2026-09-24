import { officialLinks } from "./official-links";

export type NewsSlug =
  | "september-23-server-maintenance-golden-woodlings"
  | "autumn-sale-10-percent-september-2026"
  | "september-15-live-update-patch-notes"
  | "weekend-rewards-season-1"
  | "tier-list-after-september-15-patch"
  | "classes-guide-after-balance-pass";

type Section = { title: string; paragraphs: string[]; bullets?: string[] };

export type NewsPost = {
  slug: NewsSlug;
  kind: "news" | "guide";
  eyebrow: string;
  title: string;
  metadataTitle: string;
  description: string;
  datePublished: string;
  updated: string;
  targetKeyword: string;
  image: string;
  imageAlt: string;
  quickAnswer: string;
  sections: Section[];
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
  related: NewsSlug[];
};

export const newsPosts: Record<NewsSlug, NewsPost> = {
  "september-23-server-maintenance-golden-woodlings": {
    slug: "september-23-server-maintenance-golden-woodlings",
    kind: "news",
    eyebrow: "Steam news · Sep 23, 2026",
    title: "Mistfall Hunter Update Today: September 23 Maintenance, Golden Woodlings Event",
    metadataTitle: "Mistfall Hunter Update Today — Sep 23 Maintenance & Events",
    description:
      "Official Steam post: September 23, 2026 server maintenance (~2 hours from 08:00 UTC), Golden Woodlings bounty event from Sep 24, login rewards, Mercenary talent tuning, and PS controller support on PC.",
    datePublished: "2026-09-23",
    updated: "2026-09-24",
    targetKeyword: "mistfall hunter update today",
    image: "/combat.jpg",
    imageAlt: "Mistfall Hunter combat",
    quickAnswer:
      "Bellring scheduled September 23, 2026 maintenance at 08:00 UTC (~2 hours; queues close 07:30 UTC). Afterward, update your client. New events include Golden Woodlings bounties (live Sep 24 02:00 UTC through Season 1 end) and login rewards such as Pip's Rare Pouch Voucher. Mercenary rock-talent damage was tuned down; several Seer/Sorcerer fixes shipped.",
    sections: [
      {
        title: "Maintenance window players searched as ‘update today’",
        paragraphs: [
          "The official Steam announcement titled “September 23 Server Maintenance Update” is the clearest answer to Google dropdowns like mistfall hunter update today and mistfall hunter update. Matchmaking queues were scheduled to close early at 07:30 UTC on September 23, with maintenance at 08:00 UTC for about two hours. The studio noted the window could end early or extend, with community-channel notices if schedules change. After maintenance, players must update the game client via their platform store.",
          "If you queued mid-window and saw odd pops, that was expected downtime behavior — not a permanent matchmaking redesign.",
        ],
      },
      {
        title: "New events: Golden Woodlings and login rewards",
        paragraphs: [
          "The same post adds an event to find and defeat Golden Woodlings in matches for bounty rewards, going live September 24, 2026 at 02:00 UTC and lasting until the end of Season 1. A parallel login event grants rewards such as Pip's Rare Pouch Voucher after the update through Season 1 end.",
          "Season 1 Weekend Combat Supplies distribution also changes: from mail delivery to an in-game event, with upgraded weekly claims of Pro Combat Bag ×1 and Elite Combat Bag ×2 through Season 1 end.",
        ],
        bullets: [
          "Golden Woodlings bounty event: Sep 24 02:00 UTC → end of Season 1",
          "Login rewards including Pip's Rare Pouch Voucher after the update → end of Season 1",
          "Weekend supplies moved in-game with upgraded bag counts",
        ],
      },
      {
        title: "Class notes and quality-of-life",
        paragraphs: [
          "Mercenary: damage from each rock launched by the skill when its talent is activated was reduced (charged casts with the talent are called out as unaffected). Developers said high-burst combos exceeded design expectations and they want to keep the playstyle fun while lowering power.",
          "Sorcerer and Seer received cast/channel and dodge-distance fixes. The post also adds exclusive story cutscene on outfit acquire, task-list scrollbar, in-match battlefield server display, Match History report from the damage breakdown tab, and native PlayStation controller support on PC.",
        ],
      },
      {
        title: "What to do on your next hunt",
        paragraphs: [
          "Update the client, claim the new event UI, and re-test Mercenary rock-talent combos if that was your burst plan. For broader class context after the September 15 balance pass, see our tier-list-after-patch and classes guide posts in this news channel, plus the evergreen /guides/classes-tier-list page.",
        ],
      },
    ],
    faqs: [
      {
        question: "When is the Mistfall Hunter September 23 maintenance?",
        answer:
          "Official Steam post: September 23, 2026 at 08:00 UTC for about two hours; queues close at 07:30 UTC.",
      },
      {
        question: "When do Golden Woodlings event rewards start?",
        answer:
          "The Steam post says the Golden Woodlings event goes live September 24, 2026 at 02:00 UTC and lasts until the end of Season 1.",
      },
    ],
    sources: [
      {
        label: "Steam — September 23 Server Maintenance Update",
        url: "https://store.steampowered.com/news/app/3282300/",
      },
      { label: "Steam News Hub (app 3282300)", url: officialLinks.steamNews },
    ],
    related: [
      "autumn-sale-10-percent-september-2026",
      "september-15-live-update-patch-notes",
      "weekend-rewards-season-1",
    ],
  },
  "autumn-sale-10-percent-september-2026": {
    slug: "autumn-sale-10-percent-september-2026",
    kind: "news",
    eyebrow: "Steam news · Sep 18, 2026",
    title: "Mistfall Hunter News: Autumn Sale 10% Off (Sep 24–Oct 8, 2026)",
    metadataTitle: "Mistfall Hunter News — Autumn Sale 10% Off",
    description:
      "Official Steam post (Sep 18, 2026): Mistfall Hunter Autumn Sale at 10% off — same discount as launch — from September 24, 2026 17:00 UTC to October 8, 2026 17:00 UTC. Regional prices may vary.",
    datePublished: "2026-09-18",
    updated: "2026-09-24",
    targetKeyword: "mistfall hunter news",
    image: "/hero.jpg",
    imageAlt: "Mistfall Hunter hero art",
    quickAnswer:
      "Bellring announced a limited Autumn Sale at 10% off on Steam, matching the official launch discount. Sale period: September 24, 2026, 5:00 PM through October 8, 2026, 5:00 PM (UTC+0). Actual prices and windows can vary by region — check the store page.",
    sections: [
      {
        title: "What the official post says",
        paragraphs: [
          "The Steam news item “Mistfall Hunter Autumn Sale Coming Soon—10% Off for a Limited Time!” (community timestamp corresponding to September 18, 2026 Asia/Shanghai evening) positions the discount as identical to the launch sale. It explicitly invites newcomers still on the fence and veterans recruiting friends.",
          "Friendly reminder in the post: wishlist if you have not entered Weaverreach yet, and expect regional store variance.",
        ],
      },
      {
        title: "How this pairs with the Sep 23–24 content drop",
        paragraphs: [
          "The sale start (Sep 24 17:00 UTC) lands the same calendar day the Golden Woodlings event begins (02:00 UTC). New buyers entering during the sale will immediately see Season 1 event UI — useful context when friends ask why the store is discounted this week.",
          "We do not invent regional price tables. Open the Steam store page for your currency.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long is the Mistfall Hunter Autumn Sale?",
        answer:
          "Official window: September 24, 2026 17:00 UTC to October 8, 2026 17:00 UTC, subject to regional store display.",
      },
    ],
    sources: [
      {
        label: "Steam — Autumn Sale announcement",
        url: "https://store.steampowered.com/news/app/3282300/",
      },
      { label: "Steam store", url: officialLinks.steam },
    ],
    related: [
      "september-23-server-maintenance-golden-woodlings",
      "weekend-rewards-season-1",
      "september-15-live-update-patch-notes",
    ],
  },
  "september-15-live-update-patch-notes": {
    slug: "september-15-live-update-patch-notes",
    kind: "news",
    eyebrow: "Steam news · Sep 15, 2026",
    title: "Mistfall Hunter Patch Notes: September 15 Live Update Explained",
    metadataTitle: "Mistfall Hunter Patch Notes — September 15 Live Update",
    description:
      "Official September 15, 2026 live update: easier Season Tasks, Pip's Pouch stacking fix, class balance across Mercenary, Withered Knight, Shadowstrix, Sorcerer, Blackarrow and more, plus network sync work.",
    datePublished: "2026-09-15",
    updated: "2026-09-24",
    targetKeyword: "mistfall hunter patch notes",
    image: "/combat.jpg",
    imageAlt: "Mistfall Hunter patch combat",
    quickAnswer:
      "The September 15 Live Update was a no-downtime client update at 08:00 UTC. Season Tasks got friendlier completion rules, Pip's Pouch stacking no longer wastes slots, multiple classes were tuned, and high-ping sync/dodge direction issues were addressed. Outside China, AWS storage moved from EFS to EBS to reduce rare multi-second freezes (per secondary reporting of the same patch).",
    sections: [
      {
        title: "Season Tasks and inventory QoL",
        paragraphs: [
          "Official notes change Soul Hunting-style season task completion to surviving a single Soul Harvest, remove the “complete all objectives in one session or reset” restriction for named season tasks, and change an All-or-Nothing style requirement to defeating one Gyldhunter. Pip's Pouch stacking logic was optimized so acquiring the same stackable item repeatedly no longer auto-occupies extra slots.",
        ],
      },
      {
        title: "Class balance players will feel",
        paragraphs: [
          "Mercenary saw energy-cost reduction on a skill and block/animation fixes. Withered Knight received slight damage reductions on several execute/skill paths, a cooldown trim, and Execute no longer triggering a named affix effect. Shadowstrix gained charge-phase audio and rubberband fixes. Sorcerer obstacle health rose slightly with talent trigger fixes. Blackarrow saw cooldown and uncharged-damage tweaks plus double-cast and explosion-talent fixes.",
          "Secondary coverage (Aroged, Sep 15) also summarizes broader six-class tuning and tactical item changes such as Detection Onion reveal limits. When numbers conflict, prefer the Steam primary text.",
        ],
        bullets: [
          "Dropdown matches: mistfall hunter update patch notes / mistfall hunter update notes",
          "Re-test your main after reading the exact skill lines on Steam",
          "Do not copy undated community ‘S-tier forever’ lists",
        ],
      },
      {
        title: "Network and platform fixes",
        paragraphs: [
          "Developers highlight better dodge/derivative attack direction sync, less high-ping twitching, and animation desync fixes. Non-China servers reportedly switched AWS storage from EFS to EBS to address rare freezes over five seconds. Collision, minimap, missions, chat, UI, and a PS5 character-creation preview-sound bug are also called out in secondary summaries.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where are official Mistfall Hunter patch notes?",
        answer:
          "Steam News for app 3282300 is the source of record. This wiki links and explains; it does not replace the official post.",
      },
      {
        question: "Did the September 15 update nerf Knights?",
        answer:
          "Withered Knight received several slight damage reductions and related execute changes in the official notes. Read the exact skill lines before rebuilding.",
      },
    ],
    sources: [
      {
        label: "Steam — September 15 Live Update",
        url: "https://store.steampowered.com/news/app/3282300/view/680761125088788902",
      },
      {
        label: "Aroged summary (secondary)",
        url: "https://www.aroged.com/2026/09/15/mist-hunter-network-issues-have-been-fixed-and-knights-have-been-nerfed/",
      },
    ],
    related: [
      "tier-list-after-september-15-patch",
      "classes-guide-after-balance-pass",
      "september-23-server-maintenance-golden-woodlings",
    ],
  },
  "weekend-rewards-season-1": {
    slug: "weekend-rewards-season-1",
    kind: "news",
    eyebrow: "Steam news · Sep 9, 2026 (still live in window)",
    title: "Mistfall Hunter Event Rewards: Season 1 Weekend Combat Supplies",
    metadataTitle: "Mistfall Hunter Events — Weekend Rewards Season 1",
    description:
      "Official Weekend Rewards from September 9, 2026 through Season 1 end: Pro/Elite Combat Bags on Fri/Sat/Sun local server time, plus dynamic matchmaking player caps for lower-density tests.",
    datePublished: "2026-09-09",
    updated: "2026-09-24",
    targetKeyword: "mistfall hunter event rewards",
    image: "/world.jpg",
    imageAlt: "Mistfall Hunter world",
    quickAnswer:
      "From the week of September 9 through Season 1 end, weekend logins can claim Combat Supplies: Friday and Saturday each grant a Pro Combat Bag (claim within 24 hours); Sunday grants an Elite Combat Bag. Mails send at 00:00 in each server’s local zone (International UTC+0, Oceania UTC+10, North America UTC-8). The Sep 23 patch later moved weekend supplies into an in-game event with upgraded bag counts — check the live event UI.",
    sections: [
      {
        title: "Original weekend mail schedule",
        paragraphs: [
          "The September 9 Steam post “Weekend Rewards Are Now Live” establishes the Fri/Sat Pro + Sunday Elite pattern with 24-hour claim windows. That structure remains the mental model even after the September 23 distribution change into the in-game event panel.",
        ],
        bullets: [
          "International Server: UTC+0",
          "Oceania Server: UTC+10",
          "North America Server: UTC-8",
        ],
      },
      {
        title: "Dynamic player cap experiment",
        paragraphs: [
          "The same September 9 server-side update introduced a dynamic player cap so modes may start with fewer players. Developers explicitly asked for feedback on lower-density matches. Treat lobby size variance this month as an intentional test, not necessarily a bug.",
        ],
      },
      {
        title: "Dropdown coverage",
        paragraphs: [
          "This post targets mistfall hunter events / mistfall hunter event rewards / mistfall hunter event guide searches. Always re-open the in-game event panel after the September 23 client update.",
        ],
      },
    ],
    faqs: [
      {
        question: "Did weekend rewards move out of mail?",
        answer:
          "Yes — the September 23 maintenance notes say Weekend Combat Supplies move from mail to the in-game event, with Pro ×1 and Elite ×2 weekly through Season 1 end.",
      },
    ],
    sources: [
      {
        label: "Steam — Weekend Rewards Are Now Live",
        url: "https://store.steampowered.com/news/app/3282300/",
      },
      {
        label: "Steam — September 23 maintenance (distribution change)",
        url: "https://store.steampowered.com/news/app/3282300/",
      },
    ],
    related: [
      "september-23-server-maintenance-golden-woodlings",
      "autumn-sale-10-percent-september-2026",
      "september-15-live-update-patch-notes",
    ],
  },
  "tier-list-after-september-15-patch": {
    slug: "tier-list-after-september-15-patch",
    kind: "guide",
    eyebrow: "Guide · after Sep 15 patch",
    title: "Mistfall Hunter Tier List After Patch (September 15, 2026 Context)",
    metadataTitle: "Mistfall Hunter Tier List After Patch — Sep 2026",
    description:
      "Guide for dropdowns ‘mistfall hunter tier list’, ‘tier list after patch’, and ‘tier list class’. How to rebuild rankings after the September 15 balance pass without inventing fake S-tiers.",
    datePublished: "2026-09-24",
    updated: "2026-09-24",
    targetKeyword: "mistfall hunter tier list after patch",
    image: "/combat.jpg",
    imageAlt: "Mistfall Hunter classes combat",
    quickAnswer:
      "After September 15, treat every public tier list as expired until it cites that patch. Re-rank by role and mode: Withered Knight execute damage was trimmed; Mercenary energy costs fell; Blackarrow and Shadowstrix timing changed. Use our classes-tier-list guide as a role map, then re-test your main.",
    sections: [
      {
        title: "Why ‘tier list after patch’ is the right query",
        paragraphs: [
          "Google autocomplete shows mistfall hunter tier list, tier list after patch, tier list today, solo, and PvP variants. A list without a September 15+ date is storytelling, not guidance.",
          "Start from official notes (linked in our patch-notes news post), then run the role-first method on /guides/classes-tier-list.",
        ],
      },
      {
        title: "Patch-aware questions per role",
        bullets: [
          "Frontline (Mercenary / Withered Knight): did your burst still convert after rock-talent and execute trims (Sep 15 and Sep 23)?",
          "Precision (Blackarrow): do new cooldowns change peek cadence?",
          "Flank (Shadowstrix): are charge audio cues helping your timing?",
          "Support (Seer): did dodge-distance and ally-runic fixes change your peel pattern?",
        ],
        paragraphs: [
          "Label community Discord ranks as opinions. This guide does not publish a fabricated letter board.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best Mistfall Hunter class after the September patch?",
        answer:
          "There is no universal best. Re-test the class that matches your role after reading the September 15 and September 23 official notes.",
      },
    ],
    sources: [
      {
        label: "Steam — September 15 Live Update",
        url: "https://store.steampowered.com/news/app/3282300/view/680761125088788902",
      },
      {
        label: "Wiki classes tier list guide",
        url: "https://mistfall-hunter.net/en/guides/classes-tier-list",
      },
    ],
    related: [
      "classes-guide-after-balance-pass",
      "september-15-live-update-patch-notes",
      "september-23-server-maintenance-golden-woodlings",
    ],
  },
  "classes-guide-after-balance-pass": {
    slug: "classes-guide-after-balance-pass",
    kind: "guide",
    eyebrow: "Guide · classes",
    title: "Mistfall Hunter Classes Guide After the September Balance Pass",
    metadataTitle: "Mistfall Hunter Classes — September 2026 Guide",
    description:
      "Guide targeting ‘mistfall hunter classes’ and ‘mistfall hunter new class’ curiosity after September balance — role map, not a fake seventh class announcement.",
    datePublished: "2026-09-24",
    updated: "2026-09-24",
    targetKeyword: "mistfall hunter classes",
    image: "/hero.jpg",
    imageAlt: "Mistfall Hunter hunters",
    quickAnswer:
      "September posts tune existing classes; they do not announce a documented new class in the official Steam items we reviewed for Sep 17–24. Use the six-class role map, then verify each skill change on Steam before swapping mains.",
    sections: [
      {
        title: "Dropdown clarity: classes vs new class",
        paragraphs: [
          "Autocomplete includes mistfall hunter classes and mistfall hunter new class. For this window, verified Steam news is about balance, events, sale, and maintenance — not a launched seventh class. If a creator thumbnail claims otherwise without a Steam link, treat it as unverified.",
        ],
      },
      {
        title: "Role map to re-learn after nerfs/buffs",
        bullets: [
          "Mercenary — frontline space; watch rock-talent damage after Sep 23",
          "Withered Knight — durable melee; execute paths trimmed Sep 15",
          "Blackarrow — ranged precision; cooldown/damage tweaks Sep 15",
          "Shadowstrix — flanks; charge audio + rubberband fixes",
          "Sorcerer / Seer — control and support; fix-focused notes",
        ],
        paragraphs: [
          "Deep dive: /en/guides/classes-tier-list and /en/classes/best-class.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there a new Mistfall Hunter class in September 2026?",
        answer:
          "Not in the official Steam news items we reviewed for the Sep 17–24 window. Balance patches adjusted existing classes.",
      },
    ],
    sources: [
      { label: "Steam News Hub", url: officialLinks.steamNews },
      {
        label: "Classes tier list guide",
        url: "https://mistfall-hunter.net/en/guides/classes-tier-list",
      },
    ],
    related: [
      "tier-list-after-september-15-patch",
      "september-15-live-update-patch-notes",
      "september-23-server-maintenance-golden-woodlings",
    ],
  },
};

export const newsSlugs = Object.keys(newsPosts) as NewsSlug[];

export function getNews(slug: string): NewsPost | undefined {
  return newsPosts[slug as NewsSlug];
}

export function allNews(): NewsPost[] {
  return newsSlugs.map((s) => newsPosts[s]).sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
