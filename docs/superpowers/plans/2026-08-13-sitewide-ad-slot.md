# Sitewide Advertising Slot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display the provided EffectiveCPM unit on all article pages while loading its remote script once per public page.

**Architecture:** A small reusable component renders the provider script when used in a document head and renders the provider container when used in an article. The localized root layout owns script injection and `ArticleLayout` replaces the existing placeholder with the container.

**Tech Stack:** Next-compatible React, TypeScript, Node test runner, Vinext build.

## Global Constraints

- Provider script URL: `https://pl30827412.effectivecpmnetwork.com/ceb9497315da621e307643d9a8ae153f/invoke.js`
- Provider container ID: `container-ceb9497315da621e307643d9a8ae153f`
- Preserve the existing accessible advertisement label and responsive placeholder sizing.

---

### Task 1: Render the ad provider markup

**Files:**
- Create: `components/Advertisement.tsx`
- Modify: `tests/rendered-routes.test.mjs`

**Interfaces:**
- Produces: `AdvertisementScript(): React.ReactNode` and `AdvertisementSlot(): React.ReactNode`.
- Consumes: no application state; provider identifiers are module constants.

- [ ] **Step 1: Write the failing render test**

Add a rendered article assertion that checks the script URL and the container ID:

```js
assert.match(html, /effectivecpmnetwork\.com\/ceb9497315da621e307643d9a8ae153f\/invoke\.js/);
assert.match(html, /id=["']container-ceb9497315da621e307643d9a8ae153f["']/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test:render`

Expected: the article rendering test fails because neither provider identifier is emitted.

- [ ] **Step 3: Add the minimal advertisement component**

```tsx
export function AdvertisementScript() {
  return <script async data-cfasync="false" src={providerScriptUrl} />;
}

export function AdvertisementSlot() {
  return <div id={providerContainerId} />;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test:render`

Expected: all rendering tests pass.

### Task 2: Install the ad unit in the public page shell and article slot

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `components/article/ArticleLayout.tsx`

**Interfaces:**
- Consumes: `AdvertisementScript` in the localized document head and `AdvertisementSlot` in the existing article aside.
- Produces: the provider script on every localized page and one visible ad container per article.

- [ ] **Step 1: Import and render the two component exports**

Add `<AdvertisementScript />` beside `GoogleAnalytics` in the localized `<head>`, and replace the empty article `<aside>` with:

```tsx
<aside aria-label="Advertisement" className="article-layout__ad">
  <AdvertisementSlot />
</aside>
```

- [ ] **Step 2: Run the full validation**

Run: `npm test && npm run build`

Expected: the unit/render checks and production build complete with exit code 0.

- [ ] **Step 3: Commit the implementation**

```bash
git add components/Advertisement.tsx components/article/ArticleLayout.tsx app/[locale]/layout.tsx tests/rendered-routes.test.mjs
git commit -m "feat: add article advertising slot"
```
