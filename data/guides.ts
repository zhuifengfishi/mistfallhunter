import { officialLinks } from "./official-links";

export type GuideSlug =
  | "classes-tier-list"
  | "ciphers"
  | "gyldenmist-matchmaking"
  | "patch-notes"
  | "multiplayer-community"
  | "beginner-wiki";

type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: GuideSlug;
  eyebrow: string;
  title: string;
  metadataTitle: string;
  description: string;
  updated: string;
  image: string;
  imageAlt: string;
  quickAnswer: string;
  sections: GuideSection[];
  checklist: string[];
  faqs: Array<{ question: string; answer: string }>;
  related: GuideSlug[];
};

export const guides: Record<GuideSlug, Guide> = {
  "classes-tier-list": {
    slug: "classes-tier-list",
    eyebrow: "Class guide",
    title: "Mistfall Hunter Classes & Tier List: Choose a Role That Fits Your Hunt",
    metadataTitle: "Mistfall Hunter Classes & Tier List Guide",
    description: "A practical Mistfall Hunter class guide for PvP, PvE, solo extraction, and groups—without pretending one tier list stays correct forever today.",
    updated: "2026-08-13",
    image: "/combat.jpg",
    imageAlt: "Mistfall Hunter hunters in combat",
    quickAnswer: "Start with the role you can execute under pressure: Mercenary or Withered Knight for durable melee space, Blackarrow for measured ranged pressure, Seer for support, Shadowstrix for flanks, and Blasphemer for committed close-range fights. Treat tier lists as patch snapshots, not permanent rules.",
    sections: [
      { title: "How to use a tier list without being trapped by it", paragraphs: ["A tier list is useful only when it names its context. A class that shines in coordinated PvP can be a poor first pick for a solo player learning routes, recovery timing, and disengagement. Before copying a ranking, check the patch date, mode, team size, player skill assumptions, and whether the writer tested the current build.", "Use a role-first decision instead: decide whether you want to hold space, create ranged pressure, support allies, or find a flank. Then run several low-stakes hunts with one class and write down the exact moment your plan fails. That observation is more useful than a generic S-tier label."], bullets: ["PvP: value sight lines, timing, and teammate follow-up.", "PvE: value repeatable damage windows and survival tools.", "Solo: value safe exits and low-commitment disengages.", "Groups: choose the role your squad is missing."] },
      { title: "Six-class role map", paragraphs: ["Mercenary is a natural comparison point for players who like a clear frontline job: occupy dangerous space, protect an angle, and make retreat routes easier for teammates. Withered Knight suits a steadier great-weapon rhythm and durable melee presence. Both reward positioning more than reckless chasing.", "Blackarrow favors patient precision and clean sight lines. Seer fits players who prefer setup, ranged support, and helping a team convert an opening. Shadowstrix is for short, deliberate flank windows rather than permanent brawls. Blasphemer fits players comfortable with close-range commitment and the cost of being caught without an exit."], bullets: ["Frontline: Mercenary", "Ranged support: Seer", "Precision: Blackarrow", "Assassin: Shadowstrix", "Bruiser: Blasphemer", "Durable melee: Withered Knight"] },
      { title: "A fast class-selection drill", paragraphs: ["Pick one class, enter a low-risk session, and use a single win condition. A frontline player might protect one doorway and disengage after losing health; a ranged player might only take shots with a clear retreat lane. After each run, identify whether the issue was aim, position, information, cooldown timing, or a role mismatch.", "Do not switch classes after one bad fight. Switch only when the same limitation appears across several runs and a different role directly solves it. Recheck the official game channels after patches before changing a build around an old recommendation."], bullets: ["Choose your preferred engagement distance.", "Name your role before the match starts.", "Practice one retreat rule.", "Review the official patch source before changing a main class."] },
    ],
    checklist: ["Pick a role before comparing rankings.", "Check the patch date and mode behind any tier list.", "Practice the same class for several low-risk hunts.", "Discuss team jobs before a coordinated fight."],
    faqs: [
      { question: "What is the best Mistfall Hunter class for beginners?", answer: "Choose the class whose basic loop you can repeat calmly. Mercenary is often an approachable frontline reference; Blackarrow can fit beginners who prefer spacing. There is no universal beginner winner." },
      { question: "What is the best class for PvP?", answer: "PvP success depends on map geometry, timing, and coordination. Use a current-patch tier list as a discussion tool, then test whether the class supports your team role." },
      { question: "Should I reroll when a class is nerfed?", answer: "First read the official patch notes and identify the exact affected interaction. A balance change may alter one build rather than invalidate the whole class." },
    ],
    related: ["gyldenmist-matchmaking", "beginner-wiki", "patch-notes"],
  },
  ciphers: {
    slug: "ciphers",
    eyebrow: "Systems guide",
    title: "Mistfall Hunter Ciphers Guide: Find, Record, and Verify Each Clue",
    metadataTitle: "Mistfall Hunter Ciphers Guide",
    description: "A methodical Mistfall Hunter ciphers guide for players searching for codes, clues, rewards, and a repeatable verification workflow for each patch.",
    updated: "2026-08-13",
    image: "/world.jpg",
    imageAlt: "Mistfall Hunter world environment",
    quickAnswer: "Treat every cipher as a verification task: capture the clue exactly, record where and when it appeared, test it in the correct interface, and confirm the result against current official information. Do not trust undated code lists.",
    sections: [
      { title: "What a reliable cipher workflow looks like", paragraphs: ["Cipher searches often fail because a player has a partial clue, uses the wrong menu, or follows an expired community post. Start by preserving the source: take a screenshot, write the exact characters, and note whether the clue came from an in-game object, official announcement, event, or another player.", "Next, identify the required action. Some clues are inputs, some are route hints, and some are references that must be combined with another condition. A good guide separates observed facts from interpretation and never presents a guessed sequence as confirmed."], bullets: ["Copy characters exactly, including hyphens and capitalization if shown.", "Record the map, mode, event, and patch date.", "Use only the relevant in-game input surface.", "Keep a note of the outcome: accepted, rejected, or unverified."] },
      { title: "How to avoid stale code lists", paragraphs: ["A code list is not useful merely because it is long. It needs a source, date, region or mode context where applicable, and an outcome report. Prioritize developer announcements and current in-game notices. Community posts can help locate a clue, but they should be treated as leads until you can reproduce them.", "If an entry fails, do not repeatedly retry random variants. Check whether the code was time-limited, whether an event has ended, whether the location changed after a patch, or whether the post mixed several systems together."], bullets: ["Prefer official announcements over reposts.", "Check publication date before testing.", "Separate event rewards from permanent mechanics.", "Mark unverified discoveries clearly in your notes."] },
      { title: "Build a personal cipher log", paragraphs: ["A compact log prevents duplicate effort and makes group play easier. Use four columns: clue text, source/location, version/date, and outcome. Add a fifth column for a screenshot link or capture name if you are researching with friends.", "When sharing a discovery, explain how another player can reproduce it. That is more valuable than posting only the final string, because it lets your group catch changes introduced by future updates."], bullets: ["Clue", "Source and location", "Patch or event date", "Exact test result", "Evidence capture"] },
    ],
    checklist: ["Capture the clue before leaving the area.", "Check the current patch or event status.", "Test only in the intended interface.", "Record the result so your group can reproduce it."],
    faqs: [
      { question: "Where do I enter Mistfall Hunter ciphers?", answer: "Use the input surface specified by the clue or current official event instructions. If no official instruction identifies an input location, treat community claims as unverified." },
      { question: "Why did a cipher code not work?", answer: "It may be expired, region- or mode-specific, incomplete, or entered in the wrong location. Recheck the original source and date before trying variants." },
      { question: "Are community cipher lists safe to use?", answer: "They are useful leads, not final authority. Avoid downloads, login prompts, or links that claim you must install software to redeem a code." },
    ],
    related: ["gyldenmist-matchmaking", "beginner-wiki", "patch-notes"],
  },
  "gyldenmist-matchmaking": {
    slug: "gyldenmist-matchmaking",
    eyebrow: "Economy & matchmaking",
    title: "Gyldenmist and Gear-Based Matchmaking: A Safer Mistfall Hunter Planning Guide",
    metadataTitle: "Mistfall Hunter Gyldenmist & Matchmaking Guide",
    description: "Understand how to research Gyldenmist, manage extraction risk, and evaluate claims about gear-based matchmaking without relying on rumor today.",
    updated: "2026-08-13",
    image: "/hero.jpg",
    imageAlt: "Mistfall Hunter hero scene",
    quickAnswer: "Gyldenmist and matchmaking questions are version-sensitive. Plan around what you can verify: your current kit, the risk of losing it, your squad’s objective, and official notes. Do not assume a matchmaking rule from one difficult lobby.",
    sections: [
      { title: "Separate resource decisions from matchmaking claims", paragraphs: ["Players often join two different questions together: what Gyldenmist is worth to their next run, and why a lobby felt difficult. Keep them separate. A resource decision is under your control: decide what you are willing to risk, what objective justifies the kit, and when you will extract. A matchmaking claim needs evidence from current official information or repeatable testing.", "One unusually strong opponent does not prove a hidden matchmaking rule. It may reflect timing, group composition, route overlap, or a player bringing an unusual kit. Write down repeated patterns before treating them as a system."], bullets: ["Set a loss limit before equipping valuable gear.", "Choose an objective that justifies the risk.", "Keep a low-risk kit for learning routes.", "Record repeated lobby patterns before drawing conclusions."] },
      { title: "A practical risk budget for extraction", paragraphs: ["Use three kit bands rather than a single ‘best’ loadout. A learning kit is for gathering information and practicing exits. A standard kit is for repeatable objectives. A high-risk kit is for a specific plan with a defined squad role and extraction condition. This framing reduces the temptation to chase losses with increasingly expensive gear.", "Before entering, state the extraction trigger in one sentence: after a target is complete, after one valuable find, after a health threshold, or after a time limit. A planned exit is often more valuable than extending a winning fight."], bullets: ["Learning: route knowledge and basic mechanics.", "Standard: repeatable objectives and moderate risk.", "High-risk: planned squad objective and explicit exit trigger.", "Review: was the loss caused by the kit, route, information, or timing?"] },
      { title: "How to evaluate gear-based matchmaking discussions", paragraphs: ["When reading a claim about gear-based matchmaking, look for the tested patch, region, party size, queue type, sample size, and whether the result is official or anecdotal. Missing any of those elements does not make the report useless, but it limits what you can conclude.", "Use official patch notes as the change log. If the developers describe a queue or rating adjustment, update your expectations. If they do not, avoid presenting speculation as a confirmed mechanic on guides or in your guild."], bullets: ["Look for a date and patch number.", "Check party size and queue type.", "Distinguish a player story from a tested pattern.", "Revisit conclusions after every matchmaking-related update."] },
    ],
    checklist: ["Set a kit-loss limit before queuing.", "Name the run objective and exit condition.", "Keep gear and matchmaking questions separate.", "Use official patch notes to update assumptions."],
    faqs: [
      { question: "What is Gyldenmist used for in Mistfall Hunter?", answer: "Confirm the current in-game description and official guidance, because economy systems can change. Treat it as a resource decision tied to risk, objective, and extraction planning." },
      { question: "Does Mistfall Hunter use gear-based matchmaking?", answer: "Only the current official documentation or patch notes can confirm a rule. Anecdotal lobby experiences alone are not enough to establish how a queue works." },
      { question: "How do I stop losing expensive gear?", answer: "Run a lower-risk kit while learning routes, set an extraction trigger before the match, and review the decision that created the loss rather than immediately buying a more expensive replacement." },
    ],
    related: ["patch-notes", "classes-tier-list", "beginner-wiki"],
  },
  "patch-notes": {
    slug: "patch-notes",
    eyebrow: "Update tracker",
    title: "Mistfall Hunter Patch Notes: How to Read Updates and Adapt Fast",
    metadataTitle: "Mistfall Hunter Patch Notes Guide",
    description: "A player-first method for reading Mistfall Hunter patch notes, spotting what changed, and updating your classes, routes, gear plans, and team habits.",
    updated: "2026-08-13",
    image: "/combat.jpg",
    imageAlt: "Mistfall Hunter combat scene",
    quickAnswer: "Read official patch notes in this order: system changes, class and gear changes, map or event changes, then fixes. Convert each change into one testable action in your next run instead of rebuilding everything at once.",
    sections: [
      { title: "Read patch notes for decisions, not headlines", paragraphs: ["A patch note becomes useful when you translate it into an action. A class adjustment may change the timing you practice; a map change may change your first route; an economy adjustment may change your extraction threshold. Write the action next to the note, then test it in a low-risk session.", "Avoid reacting to a headline alone. The exact wording, affected mode, and interaction matter. A numerical adjustment may be smaller in practice than a new cooldown rule, and a bug fix may change a matchup more than a visible balance change."], bullets: ["System: does this change queue, loot, routes, or extraction?", "Class: which habit, timing, or matchup needs retesting?", "Gear: does the item still fit your risk budget?", "Map/event: should your first route or exit plan change?"] },
      { title: "The 20-minute post-patch routine", paragraphs: ["Start by reading the official announcement in full. Make a short list of only the changes that touch your normal class, favorite weapon, route, or group role. Then run one controlled session for each changed area. Keep the rest of your build stable so you can identify what the patch actually changed.", "After testing, update your personal notes with the patch date. If you lead a group, share a one-page summary with ‘confirmed’, ‘needs testing’, and ‘not relevant to us’ rather than a wall of copied patch text."], bullets: ["Read the official source.", "Mark changes that affect your own routine.", "Test one variable at a time.", "Share confirmed observations with a date."] },
      { title: "Avoid stale guide advice", paragraphs: ["A high-density guide is only helpful if it has a freshness signal. Look for an update date, cited official source, and clear wording around uncertainty. When a guide makes a strong claim without a patch reference, treat it as a hypothesis rather than a rule.", "For this wiki, use the official game site and Steam News as the source of record for announcements. Community analysis can explain the impact, but it should link back to the original change."], bullets: ["Check the update date before copying a build.", "Prefer exact official wording for changed mechanics.", "Keep community opinions labeled as opinions.", "Re-test old strategies after major updates."] },
    ],
    checklist: ["Read the official update before changing a build.", "Translate each relevant note into one action.", "Test one changed variable per run.", "Date every personal or guild recommendation."],
    faqs: [
      { question: "Where can I find official Mistfall Hunter patch notes?", answer: "Use the official game channels and Steam News, then compare community discussion against the original announcement." },
      { question: "Should I change my class after every update?", answer: "No. First determine whether the update affects your class, your build, or only a specific interaction. Test the changed behavior before replacing a familiar role." },
      { question: "How often should I update a guide?", answer: "Update when an official patch changes the covered system, and show the review date so readers know the guide’s context." },
    ],
    related: ["classes-tier-list", "gyldenmist-matchmaking", "ciphers"],
  },
  "multiplayer-community": {
    slug: "multiplayer-community",
    eyebrow: "Play together",
    title: "Mistfall Hunter Multiplayer, Guilds, Forums, and Community Resources",
    metadataTitle: "Mistfall Hunter Multiplayer & Community Guide",
    description: "A practical guide to Mistfall Hunter multiplayer planning, guild communication, community forums, and safer ways to evaluate mods and external tools.",
    updated: "2026-08-13",
    image: "/world.jpg",
    imageAlt: "Mistfall Hunter landscape",
    quickAnswer: "Good multiplayer results come from a shared objective, short callouts, and a known extraction rule. Use forums and community hubs for discussion, but verify game-changing claims with official sources and avoid downloads that request credentials or promise unfair advantages.",
    sections: [
      { title: "The pre-match squad brief", paragraphs: ["A useful squad brief takes less than a minute. Name the objective, route preference, class jobs, and extraction trigger. This removes the most common group failure: one player believes the team is farming while another believes the team is hunting fights.", "Use short callouts that describe a decision, not just a sighting. ‘Two players, east ridge, we rotate left’ gives the group direction; ‘enemy!’ does not. Keep comms calm enough that teammates can hear footsteps, timers, and important system cues."], bullets: ["Objective: loot, quest, practice, or fight.", "Role: anchor, pressure, support, flank, or scout.", "Route: first destination and backup exit.", "Trigger: the condition that ends the run."] },
      { title: "Guild habits that make groups stronger", paragraphs: ["A guild does not need complicated rules to improve. Maintain a small channel for current patch notes, a place for reproducible discoveries, and a short post-run review format. Ask what information was missing and what decision would change next time, rather than assigning blame.", "For new members, create low-risk practice groups. They let players learn routes and roles without feeling forced to risk their best equipment or perform like veterans immediately."], bullets: ["Pin official update links with dates.", "Use a reproducible format for discoveries.", "Run low-risk teaching sessions.", "Review decisions after a loss, not personalities."] },
      { title: "Forums, Nexus-style pages, and tool safety", paragraphs: ["Community hubs can be valuable for strategies, screenshots, accessibility discussion, and finding teammates. They can also spread stale advice or unsafe downloads. Before using any mod, overlay, tracker, or external tool, check the game rules and its source. Never enter a game account password into a third-party page just to receive a ‘reward’ or ‘verification’.", "Avoid tools that claim to reveal hidden opponents, automate play, bypass progression, or guarantee matchmaking outcomes. Beyond fair-play concerns, these are common signs of account or device risk."], bullets: ["Prefer official links for account and game updates.", "Read rules before installing community tools.", "Avoid cheats, automation, and credential prompts.", "Treat screenshots and repeatable steps as stronger evidence than rumors."] },
    ],
    checklist: ["State objective, roles, route, and extraction trigger.", "Keep callouts short and actionable.", "Pin current official updates for your group.", "Avoid community tools that request credentials or promise unfair advantages."],
    faqs: [
      { question: "Does Mistfall Hunter have multiplayer?", answer: "Use the official game information for the current supported modes and party details. Once a group is formed, align on objective and extraction rules before queuing." },
      { question: "How do I find a Mistfall Hunter guild?", answer: "Use established community spaces, review their rules, and start with low-risk sessions. A good group communicates objectives and respects new-player learning time." },
      { question: "Are Mistfall Hunter mods safe?", answer: "Safety and rule compliance depend on the specific tool. Verify the source, read current game rules, and avoid anything that requests credentials or gives an unfair gameplay advantage." },
    ],
    related: ["beginner-wiki", "gyldenmist-matchmaking", "classes-tier-list"],
  },
  "beginner-wiki": {
    slug: "beginner-wiki",
    eyebrow: "Start here",
    title: "Mistfall Hunter Wiki: Beginner Guide, Core Systems, and Your First Hunt",
    metadataTitle: "Mistfall Hunter Beginner Wiki Guide",
    description: "A high-density Mistfall Hunter beginner wiki hub covering first-hunt planning, classes, extraction decisions, ciphers, updates, and where to verify information.",
    updated: "2026-08-13",
    image: "/hero.jpg",
    imageAlt: "Mistfall Hunter hunters at the start of a journey",
    quickAnswer: "For your first hunts, prioritize information over expensive loot: learn one route, choose one class role, set a simple extraction trigger, and review the official update source before following advanced builds or codes.",
    sections: [
      { title: "Your first three hunts", paragraphs: ["Hunt one is navigation: enter with a low-risk kit, find a recognizable landmark, and leave once you have practiced a safe exit. Hunt two is role practice: pick one class and use a single combat rule, such as keeping a retreat line or holding one angle for a teammate. Hunt three is an objective run: take one small task and leave when it is complete.", "This sequence creates a base for every later guide. Without route knowledge and a stable extraction habit, a tier list or expensive build cannot reliably improve results."], bullets: ["Hunt one: route and extraction.", "Hunt two: one class role and one retreat rule.", "Hunt three: one objective, then leave.", "Afterward: write one lesson, not ten." ] },
      { title: "The core systems map", paragraphs: ["Think of the game as connected decisions. Your class determines your preferred engagement role. Your route determines what information and risk you meet. Your kit determines what loss you can absorb. Your extraction rule decides whether a successful moment becomes a successful run.", "Use the guides on this site in that order. The classes guide helps with role selection; the Gyldenmist and matchmaking guide helps with risk budgeting; the ciphers guide gives a verification method; patch notes keep your assumptions current; and the multiplayer guide helps turn individual plans into a squad plan."], bullets: ["Classes: choose a repeatable role.", "Routes: learn landmarks and exits.", "Gear: set a loss budget.", "Ciphers: verify clues and dates.", "Updates: replace stale assumptions.", "Multiplayer: align roles and extraction." ] },
      { title: "How to tell useful advice from noise", paragraphs: ["Useful advice tells you what to do, when to do it, and what condition would change the decision. It identifies a patch date or official source when details are version-sensitive. Noise makes absolute promises, offers a ‘secret’ without a reproduction path, or pushes you toward an external download or login.", "When in doubt, return to a simple loop: use official information for facts, test your own decisions in low-risk sessions, and keep notes on what worked in the current patch."], bullets: ["Look for dates, sources, and conditions.", "Avoid universal ‘best’ claims without context.", "Do not enter account details into third-party reward pages.", "Test advice before risking valuable gear."] },
    ],
    checklist: ["Use a low-risk kit for your first route practice.", "Choose one role and one retreat rule.", "Set an extraction trigger before entering.", "Read dated official sources for patch-sensitive details."],
    faqs: [
      { question: "What should I do first in Mistfall Hunter?", answer: "Learn a safe route and extraction habit before investing heavily in gear. Then practice one class role in low-risk runs." },
      { question: "Is this an official Mistfall Hunter wiki?", answer: "No. This is an unofficial community guide. Use official game and Steam sources for confirmed announcements and current rules." },
      { question: "What is the fastest way to improve?", answer: "Make one decision repeatable at a time: route, role, fight selection, or extraction. Review the specific decision that failed rather than changing everything at once." },
    ],
    related: ["classes-tier-list", "ciphers", "gyldenmist-matchmaking"],
  },
};

export const guideSlugs = Object.keys(guides) as GuideSlug[];

export function getGuide(slug: string): Guide | undefined {
  return guides[slug as GuideSlug];
}

export const guideSourceLinks = [officialLinks.site, officialLinks.steam, officialLinks.steamNews];
