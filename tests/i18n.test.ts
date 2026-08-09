import { describe, expect, it } from "vitest";
import {
  defaultLocale,
  equivalentLocalePath,
  isLocale,
  locales,
  localizedPath,
} from "../i18n/locales";

describe("locale contract", () => {
  it("exposes exactly four locales with English first", () => {
    expect(locales).toEqual(["en", "ja", "de", "pt-br"]);
    expect(defaultLocale).toBe("en");
  });

  it("rejects unsupported locale values", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("zh")).toBe(false);
  });

  it("builds and switches equivalent localized paths", () => {
    expect(localizedPath("ja", "/classes")).toBe("/ja/classes");
    expect(equivalentLocalePath("/en/classes/best-class", "de"))
      .toBe("/de/classes/best-class");
  });
});
