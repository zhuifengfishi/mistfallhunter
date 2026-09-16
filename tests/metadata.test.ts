import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  buildAlternates,
  buildPageMetadata,
  serializeJsonLd,
} from "../lib/seo/metadata";
import { guides } from "../data/guides";

describe("localized SEO metadata", () => {
  it("builds a localized canonical and exactly four hreflang alternates", () => {
    const alternates = buildAlternates("https://example.test", "/classes", "en");

    expect(alternates.canonical).toBe("https://example.test/en/classes");
    expect(alternates.languages).toEqual({
      en: "https://example.test/en/classes",
      ja: "https://example.test/ja/classes",
      de: "https://example.test/de/classes",
      "pt-BR": "https://example.test/pt-br/classes",
    });
  });

  it("keeps approved copy and exposes the shared social preview image", () => {
    const metadata = buildPageMetadata({
      baseUrl: "https://example.test",
      locale: "en",
      path: "/classes",
      title: "Mistfall Hunter Classes — All 6 Classes Compared",
      description:
        "Compare every Mistfall Hunter class by weapon, role, solo safety, and team value, then open the detailed Best Class guide for current recommendations.",
      image: "/og.png",
      imageAlt: "Mistfall Hunter field guide social preview",
    });

    expect(String(metadata.title).length).toBeLessThanOrEqual(60);
    expect(metadata.description!.length).toBeGreaterThanOrEqual(140);
    expect(metadata.description!.length).toBeLessThanOrEqual(160);
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://example.test/og.png",
        alt: "Mistfall Hunter field guide social preview",
      },
    ]);
    expect(metadata.twitter?.images).toEqual([
      {
        url: "https://example.test/og.png",
        alt: "Mistfall Hunter field guide social preview",
      },
    ]);
  });

  it("rejects metadata copy outside the approved character limits", () => {
    expect(() =>
      buildPageMetadata({
        baseUrl: "https://example.test",
        locale: "en",
        path: "/",
        title: "A".repeat(61),
        description: "D".repeat(140),
        image: "/og.png",
        imageAlt: "Mistfall Hunter field guide social preview",
      }),
    ).toThrow(/title/i);

    expect(() =>
      buildPageMetadata({
        baseUrl: "https://example.test",
        locale: "en",
        path: "/",
        title: "Mistfall Hunter Community Wiki",
        description: "Too short.",
        image: "/og.png",
        imageAlt: "Mistfall Hunter field guide social preview",
      }),
    ).toThrow(/description/i);
  });

  it("keeps every guide's metadata within the shared character limits", () => {
    for (const guide of Object.values(guides)) {
      expect(guide.metadataTitle.length, guide.slug).toBeLessThanOrEqual(60);
      expect(guide.description.length, `${guide.slug} description`).toBeGreaterThanOrEqual(140);
      expect(guide.description.length, `${guide.slug} description`).toBeLessThanOrEqual(160);
      expect(() =>
        buildPageMetadata({
          locale: "en",
          path: `/guides/${guide.slug}`,
          title: guide.metadataTitle,
          description: guide.description,
          image: guide.image,
          imageAlt: guide.imageAlt,
          type: "article",
        }),
      ).not.toThrow();
    }
  });

  it("serializes JSON-LD without a literal less-than character", () => {
    const serialized = serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Mistfall Hunter </script><script>alert(1)</script>",
    });

    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
  });

  it("ships the validated social preview as a non-empty public asset", () => {
    const assetPath = fileURLToPath(new URL("../public/og.png", import.meta.url));
    expect(statSync(assetPath).size).toBeGreaterThan(0);
  });
});

describe("privacy and contact SEO pages", () => {
  it("keeps legal page descriptions within shared limits for every locale", async () => {
    const { pageDescriptions, buildPageMetadata } = await import("../lib/seo/metadata");
    const { legalPages } = await import("../data/legal");
    const { locales } = await import("../i18n/locales");

    for (const locale of locales) {
      for (const slug of ["privacy", "contact"] as const) {
        const copy = legalPages[locale][slug];
        const description = pageDescriptions[locale][slug];
        expect(copy.metadataTitle.length, `${locale} ${slug} title`).toBeLessThanOrEqual(60);
        expect(description.length, `${locale} ${slug} description`).toBeGreaterThanOrEqual(140);
        expect(description.length, `${locale} ${slug} description`).toBeLessThanOrEqual(160);
        expect(() =>
          buildPageMetadata({
            locale,
            path: `/${slug}`,
            title: copy.metadataTitle,
            description,
            image: "/og.png",
            imageAlt: "Mistfall Hunter field guide social preview",
          }),
        ).not.toThrow();
      }
    }
  });
});
