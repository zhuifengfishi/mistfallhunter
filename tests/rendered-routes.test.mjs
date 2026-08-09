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
