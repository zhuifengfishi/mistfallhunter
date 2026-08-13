# English Search Guides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six original, English-only, image-led Mistfall Hunter guide pages that answer distinct high-intent searches.

**Architecture:** A typed guide registry supplies unique metadata, image, practical sections, FAQ items, and related links. One dynamic `/en/guides/[slug]` route renders every guide with article and FAQ structured data; the sitemap and home page expose each canonical URL.

**Tech Stack:** Next-compatible React, TypeScript, Vinext, Node test runner.

## Global Constraints

- Create exactly six English URLs under `/en/guides/`.
- Each guide must address a distinct user task, use existing licensed site imagery, include an update date, source links, FAQ content, and internal links.
- Do not create localized copies or keyword-variant pages.
- State uncertain or version-sensitive game details as checks against official news rather than facts.

---

### Task 1: Define the guide registry and public route

**Files:**
- Create: `data/guides.ts`
- Create: `app/[locale]/guides/[slug]/page.tsx`
- Modify: `lib/routes.ts`
- Modify: `app/sitemap.ts`
- Test: `tests/rendered-routes.test.mjs`

- [ ] **Step 1: Write failing render assertions for the six guide URLs and their metadata.**
- [ ] **Step 2: Run `npm run test:render` and confirm the new guide test fails because routes do not exist.**
- [ ] **Step 3: Add a typed six-guide registry and a dynamic English-only renderer with Article, BreadcrumbList, and FAQPage JSON-LD.**
- [ ] **Step 4: Add the six routes to English sitemap output and rerun `npm run test:render`.**

### Task 2: Add high-density people-first guide content and discovery links

**Files:**
- Modify: `data/guides.ts`
- Modify: `app/[locale]/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/rendered-routes.test.mjs`

- [ ] **Step 1: Add unique actionable sections, checklists, tables, FAQs, official-source links, and related-reading links for classes, ciphers, Gyldenmist/matchmaking, patch notes, multiplayer/community, and beginner wiki intent.**
- [ ] **Step 2: Add a guide index section to the English home page with six internal links.**
- [ ] **Step 3: Add focused responsive styles for the guide hero image, on-page navigation, info panels, and FAQ accordions.**
- [ ] **Step 4: Run `npm test` and `git diff --check`.**
