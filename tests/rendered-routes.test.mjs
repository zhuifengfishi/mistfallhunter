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
