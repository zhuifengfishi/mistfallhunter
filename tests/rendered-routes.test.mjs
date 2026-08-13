import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mistfall-hunter.net"
).replace(/\/+$/, "");
const escapedSiteUrl = siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function listJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const url = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      url.pathname += "/";
      files.push(...await listJavaScriptFiles(url));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(url);
    }
  }

  return files;
}

test("keeps local preview scripts portable on Windows", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "vinext dev");
  assert.equal(packageJson.scripts.start, "vinext start");
});

test("keeps locale menu options at least 44px tall", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(
    css,
    /\.locale-switcher__menu a\s*{[^}]*min-height:\s*44px;/s,
  );
  for (const selector of [
    ".site-brand",
    ".breadcrumbs a",
    ".home-update a",
    ".home-faq summary",
    ".site-footer__links a",
    ".article-layout__sources a",
  ]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(css, new RegExp(`${escaped}\\s*{[^}]*min-height:\\s*44px;`, "s"));
  }
});

test("keeps every built server JavaScript chunk free of dynamic code generation", async () => {
  const files = await listJavaScriptFiles(new URL("../dist/server/", import.meta.url));
  assert.ok(files.length > 0, "the production build emits server JavaScript");

  const forbidden = [
    ["eval call", /\beval\s*\(/],
    ["Function constructor", /\bnew\s+Function\s*\(/],
    ["AsyncFunction constructor", /\bAsyncFunction\b/],
    ["MDX runtime compiler", /@mdx-js\/mdx|mdx\/lib\/run\.js/],
  ];
  const violations = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    for (const [label, pattern] of forbidden) {
      if (pattern.test(source)) {
        violations.push(`${file.pathname}: ${label}`);
      }
    }
  }

  assert.deepEqual(violations, []);
});

test("redirects the unlocalized root to English", async () => {
  const response = await render("/");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/en");
});

test("renders localized homepage copy and document language", async () => {
  const cases = [
    { path: "/en", lang: "en", content: /Trending Now/i },
    { path: "/ja", lang: "ja", content: /Mistfall Hunterとは？/i },
    { path: "/de", lang: "de", content: /Was ist Mistfall Hunter\?/i },
    { path: "/pt-br", lang: "pt-BR", content: /O que é Mistfall Hunter\?/i },
  ];

  for (const item of cases) {
    const response = await render(item.path);
    assert.equal(response.status, 200, `${item.path} returns 200`);
    const html = await response.text();
    assert.match(html, item.content, `${item.path} renders localized copy`);
    assert.match(
      html,
      new RegExp(`<html[^>]*\\blang=["']${item.lang}["']`, "i"),
      `${item.path} declares ${item.lang} as its document language`,
    );
  }
});

test("renders the English homepage shell and sections", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /MISTFALL HUNTER/i);
  assert.match(html, /WIKI NAVIGATION/i);
  assert.match(html, /Trending Now/i);
  assert.match(html, /What is Mistfall Hunter/i);
  assert.doesNotMatch(html, /VV:? ULTIMATUM/i);
});

test("renders all six English search guides with canonical content", async () => {
  const guides = [
    ["classes-tier-list", "Mistfall Hunter Classes"],
    ["ciphers", "Mistfall Hunter Ciphers"],
    ["gyldenmist-matchmaking", "Gyldenmist"],
    ["patch-notes", "Mistfall Hunter Patch Notes"],
    ["multiplayer-community", "Mistfall Hunter Multiplayer"],
    ["beginner-wiki", "Mistfall Hunter Wiki"],
  ];

  for (const [slug, heading] of guides) {
    const response = await render(`/en/guides/${slug}`);
    assert.equal(response.status, 200, `${slug} returns 200`);
    const html = await response.text();
    assert.match(html, new RegExp(heading, "i"), `${slug} has unique guide content`);
    assert.match(html, /FAQPage/, `${slug} includes FAQ structured data`);
    assert.match(html, /Last reviewed/, `${slug} shows freshness information`);
  }
});

test("renders the advertising provider script and slot on article pages", async () => {
  const response = await render("/en/classes/best-class");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /effectivecpmnetwork\.com\/ceb9497315da621e307643d9a8ae153f\/invoke\.js/,
  );
  assert.match(
    html,
    /id=["']container-ceb9497315da621e307643d9a8ae153f["']/,
  );
});

test("renders future navigation groups as labels and links only real destinations", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.ok(
    (html.match(/>Systems</g) ?? []).length >= 2,
    "desktop and mobile navigation both show Systems",
  );
  assert.doesNotMatch(html, /href=["']\/en#systems["']/);

  for (const [href, anchor] of [
    ["/en#start-here", "start-here"],
    ["/en#builds", "builds"],
    ["/en#ciphers", "ciphers"],
    ["/en#maps", "maps"],
    ["/en#updates", "updates"],
  ]) {
    assert.match(html, new RegExp(`href=["']${href}["']`));
    assert.match(html, new RegExp(`id=["']${anchor}["']`));
  }
  assert.match(html, /href=["']\/en\/classes["']/);
});

test("keeps the approved homepage information hierarchy", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();
  const valueProposition = html.indexOf("Practical class comparisons");
  const snapshot = html.indexOf("Mistfall Hunter snapshot");
  const primaryCta = html.indexOf(">Start here<");

  assert.ok(valueProposition >= 0, "value proposition is rendered");
  assert.ok(snapshot > valueProposition, "stat chips follow the value proposition");
  assert.ok(primaryCta > snapshot, "primary CTAs follow the stat chips");
});

test("renders the Classes collection cards, links, and sidebar state for every locale", async () => {
  for (const locale of ["en", "ja", "de", "pt-br"]) {
    const response = await render(`/${locale}/classes`);
    assert.equal(response.status, 200, `/${locale}/classes returns 200`);
    const html = await response.text();

    assert.equal(
      (html.match(/role="listitem"/g) ?? []).length,
      6,
      `/${locale}/classes renders exactly six class cards`,
    );
    assert.match(
      html,
      new RegExp(`href=["']/${locale}/classes/best-class["']`),
      `/${locale}/classes keeps the Best Class link localized`,
    );
    assert.match(
      html,
      new RegExp(
        `<section class=["']wiki-sidebar__group is-expanded["'][^>]*>\\s*<a href=["']/${locale}/classes["']`,
      ),
      `/${locale}/classes expands the Classes sidebar group`,
    );
    assert.match(
      html,
      new RegExp(
        `<a aria-current=["']page["'] class=["']wiki-sidebar__item is-active["'] href=["']/${locale}/classes["']`,
      ),
      `/${locale}/classes selects Overview in the sidebar`,
    );
  }
});

test("renders the English Best Class MDX article", async () => {
  const response = await render("/en/classes/best-class");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Best Class to Choose|Best Class/i);
  assert.match(html, /Quick Recommendation/i);
  assert.match(html, /Last updated/i);
  assert.match(html, /Popular/i);
  assert.match(html, /Advertisement/i);
  assert.match(html, /class=["']article-table-scroll["']/);
  assert.match(html, /<table>/);
  const activeBestClassLink =
    /<a aria-current=["']page["'] class=["']wiki-sidebar__item is-active["'] href=["']\/en\/classes\/best-class["']/;
  assert.match(html, activeBestClassLink);
});

test("renders the localized Best Class article route and sidebar state for every locale", async () => {
  const cases = [
    { locale: "en", marker: /Quick Recommendation/ },
    { locale: "ja", marker: /\u307e\u305a\u7d50\u8ad6/ },
    { locale: "de", marker: /Schnelle Empfehlung/ },
    { locale: "pt-br", marker: /Recomenda\u00e7\u00e3o r\u00e1pida/ },
  ];

  for (const { locale, marker } of cases) {
    const response = await render(`/${locale}/classes/best-class`);
    assert.equal(response.status, 200, `/${locale}/classes/best-class returns 200`);
    const html = await response.text();

    assert.match(html, marker, `${locale} renders localized MDX body content`);
    assert.match(
      html,
      new RegExp(
        `<section class=["']wiki-sidebar__group is-expanded["'][^>]*>\\s*<a href=["']/${locale}/classes["']`,
      ),
      `${locale} expands the Classes sidebar group`,
    );
    assert.match(
      html,
      new RegExp(
        `<a aria-current=["']page["'] class=["']wiki-sidebar__item is-active["'] href=["']/${locale}/classes/best-class["']`,
      ),
      `${locale} selects Best Class in the sidebar`,
    );
  }
});

test("returns 404 for an unknown article slug", async () => {
  const response = await render("/en/classes/not-a-guide");
  assert.equal(response.status, 404);
});

test("returns 404 for an unsupported article locale", async () => {
  const response = await render("/zh/classes/best-class");
  assert.equal(response.status, 404);
});

test("renders all 12 localized launch routes with metadata and structured data", async () => {
  const pageTypes = new Map([
    ["", "WebSite"],
    ["/classes", "CollectionPage"],
    ["/classes/best-class", "Article"],
  ]);

  for (const locale of ["en", "ja", "de", "pt-br"]) {
    for (const [path, schemaType] of pageTypes) {
      const route = `/${locale}${path}`;
      const response = await render(route);
      assert.equal(response.status, 200, route);
      const html = await response.text();

      const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
      const description = decodeHtml(
        html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "",
      );
      assert.ok(title.length > 0 && title.length <= 60, `${route} title length is ${title.length}`);
      assert.ok(
        description.length >= 140 && description.length <= 160,
        `${route} description length is ${description.length}`,
      );

      assert.match(
        html,
        new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${escapedSiteUrl}${route}["']`, "i"),
        `${route} renders its canonical URL`,
      );
      const expectedAlternates = [
        ["en", `${siteUrl}/en${path}`],
        ["ja", `${siteUrl}/ja${path}`],
        ["de", `${siteUrl}/de${path}`],
        ["pt-BR", `${siteUrl}/pt-br${path}`],
      ];
      for (const [hreflang, href] of expectedAlternates) {
        assert.match(
          html,
          new RegExp(
            `<link[^>]+rel=["']alternate["'][^>]+href=["']${href}["'][^>]+hreflang=["']${hreflang}["']`,
            "i",
          ),
          `${route} maps ${hreflang} to ${href}`,
        );
      }
      assert.match(
        html,
        new RegExp(`<meta[^>]+property=["']og:image["'][^>]+content=["']${escapedSiteUrl}/og\\.png["']`, "i"),
        `${route} renders the OpenGraph preview`,
      );
      assert.match(
        html,
        new RegExp(`<meta[^>]+name=["']twitter:image["'][^>]+content=["']${escapedSiteUrl}/og\\.png["']`, "i"),
        `${route} renders the Twitter preview`,
      );
      assert.match(
        html,
        new RegExp(`<script[^>]+type=["']application/ld\\+json["'][^>]*>[^<]*["']@type["']:["']${schemaType}["']`, "i"),
        `${route} renders ${schemaType} JSON-LD`,
      );
      if (path) {
        assert.match(html, /["']@type["']:["']BreadcrumbList["']/, `${route} renders breadcrumbs JSON-LD`);
      }
    }
  }
});

test("loads Google Analytics exactly once across every rendered site page", async () => {
  const launchRoutes = ["en", "ja", "de", "pt-br"].flatMap((locale) => [
    `/${locale}`,
    `/${locale}/classes`,
    `/${locale}/classes/best-class`,
  ]);
  const renderedRoutes = [...launchRoutes, "/__global-not-found__/missing"];
  const loader = "https://www.googletagmanager.com/gtag/js?id=G-H07TTQ3KK1";

  for (const route of renderedRoutes) {
    const response = await render(route);
    assert.ok([200, 404].includes(response.status), `${route} renders a site page`);
    const html = await response.text();
    const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
    const loaderScripts = scripts.filter(([, attributes]) =>
      new RegExp(`\\bsrc=["']${loader.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i")
        .test(attributes),
    );
    const bootstrapScripts = scripts.filter(([, , content]) =>
      /^\s*window\.dataLayer\s*=/.test(content),
    );

    assert.equal(
      loaderScripts.length,
      1,
      `${route} loads the GA4 library exactly once`,
    );
    assert.equal(
      bootstrapScripts.length,
      1,
      `${route} renders the GA4 bootstrap exactly once`,
    );
    assert.match(
      bootstrapScripts[0][2],
      /gtag\(\s*["']config["']\s*,\s*["']G-H07TTQ3KK1["']\s*\)/,
      `${route} configures the requested GA4 measurement ID`,
    );
    assert.match(bootstrapScripts[0][2], /window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\]/);
    assert.match(bootstrapScripts[0][2], /dataLayer\.push\(arguments\)/);
  }
});

test("renders the global not-found page for a genuinely unmatched URL", async () => {
  const response = await render("/__global-not-found__/missing");
  assert.equal(response.status, 404);
  const html = await response.text();

  assert.match(html, /data-not-found-scope=["']global["']/);
  assert.match(html, /href=["']\/en["']/);
});

test("preserves the unsupported /zh response as a safe 404", async () => {
  const response = await render("/zh");
  assert.equal(response.status, 404);
  const html = await response.text();

  assert.match(html, /href=["']\/en["']/);
});

test("renders locale-specific not-found pages for unknown articles", async () => {
  const cases = [
    { locale: "en", title: "Page not found", returnHome: "Return to the wiki home" },
    { locale: "ja", title: "ページが見つかりません", returnHome: "Wiki ホームへ戻る" },
    {
      locale: "de",
      title: "Seite nicht gefunden",
      returnHome: "Zurück zur Wiki-Startseite",
    },
    {
      locale: "pt-br",
      title: "Página não encontrada",
      returnHome: "Voltar à página inicial da Wiki",
    },
  ];

  for (const { locale, title, returnHome } of cases) {
    const response = await render(`/${locale}/classes/not-a-guide`);
    assert.equal(response.status, 404, `${locale} unknown article returns 404`);
    const html = await response.text();
    const visibleBoundary = html.match(
      /<section class=["']home-closing["'][^>]*>[\s\S]*?<\/section>/,
    )?.[0];

    assert.ok(visibleBoundary, `${locale} renders the localized not-found boundary`);
    assert.match(visibleBoundary, new RegExp(`<h1>${title}</h1>`));
    assert.match(visibleBoundary, new RegExp(`href=["']/${locale}["']`));
    assert.match(visibleBoundary, new RegExp(returnHome));
    assert.match(
      html,
      new RegExp(`<html[^>]+lang=["']${locale === "pt-br" ? "pt-BR" : locale}["']`, "i"),
    );
    assert.doesNotMatch(html, /data-not-found-scope=["']global["']/);
  }
});

test("serves a sitemap containing localized launch URLs and six English guides", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();

  assert.equal((xml.match(/<url>/g) ?? []).length, 18);
  for (const locale of ["en", "ja", "de", "pt-br"]) {
    for (const path of ["", "/classes", "/classes/best-class"]) {
      assert.match(xml, new RegExp(`<loc>${escapedSiteUrl}/${locale}${path}</loc>`));
    }
  }
  for (const slug of ["classes-tier-list", "ciphers", "gyldenmist-matchmaking", "patch-notes", "multiplayer-community", "beginner-wiki"]) {
    assert.match(xml, new RegExp(`<loc>${escapedSiteUrl}/en/guides/${slug}</loc>`));
  }
});

test("allows crawling and advertises the sitemap", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  const robots = await response.text();

  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, new RegExp(`Sitemap:\\s*${escapedSiteUrl}/sitemap\\.xml`, "i"));
});

test("keeps competitor brands and guide domains out of all launch HTML", async () => {
  const forbiddenText = [
    /vvultimatum\.net/i,
    /VV:? ULTIMATUM/i,
    /fextralife\.com/i,
    /game8\.co/i,
    /ign\.com/i,
    /fandom\.com/i,
    /wiki\.gg/i,
  ];
  const allowedExternalHosts = new Set([
    new URL(siteUrl).hostname,
    "mistfallhunter.com",
    "store.steampowered.com",
    "steamcommunity.com",
  ]);

  for (const locale of ["en", "ja", "de", "pt-br"]) {
    for (const path of ["", "/classes", "/classes/best-class"]) {
      const route = `/${locale}${path}`;
      const response = await render(route);
      assert.equal(response.status, 200, route);
      const html = await response.text();

      for (const pattern of forbiddenText) {
        assert.doesNotMatch(html, pattern, `${route} excludes ${pattern}`);
      }
      for (const match of html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)) {
        const host = new URL(match[1]).hostname;
        if (host !== "localhost") {
          assert.ok(allowedExternalHosts.has(host), `${route} excludes unapproved external host ${host}`);
        }
      }
    }
  }
});
