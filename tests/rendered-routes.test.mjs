import assert from "node:assert/strict";
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
        new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']http://localhost:3000${route}["']`, "i"),
        `${route} renders its canonical URL`,
      );
      for (const hreflang of ["en", "ja", "de", "pt-BR"]) {
        assert.match(
          html,
          new RegExp(`<link[^>]+hreflang=["']${hreflang}["']`, "i"),
          `${route} renders the ${hreflang} alternate`,
        );
      }
      assert.match(
        html,
        /<meta[^>]+property=["']og:image["'][^>]+content=["']http:\/\/localhost:3000\/og\.png["']/i,
        `${route} renders the OpenGraph preview`,
      );
      assert.match(
        html,
        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']http:\/\/localhost:3000\/og\.png["']/i,
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

test("returns a safe home link from global and localized not-found pages", async () => {
  for (const path of ["/zh", "/en/classes/not-a-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 404, `${path} returns 404`);
    const html = await response.text();
    assert.match(html, /href=["']\/en["']/, `${path} links safely to English home`);
  }
});

test("serves a sitemap containing exactly the 12 launch URLs", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();

  assert.equal((xml.match(/<url>/g) ?? []).length, 12);
  for (const locale of ["en", "ja", "de", "pt-br"]) {
    for (const path of ["", "/classes", "/classes/best-class"]) {
      assert.match(xml, new RegExp(`<loc>http://localhost:3000/${locale}${path}</loc>`));
    }
  }
});

test("allows crawling and advertises the sitemap", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  const robots = await response.text();

  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*http:\/\/localhost:3000\/sitemap\.xml/i);
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
