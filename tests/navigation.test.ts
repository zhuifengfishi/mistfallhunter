import { describe, expect, it } from "vitest";
import { navigationGroups, resolveNavigationHref } from "../data/navigation";

describe("wiki navigation", () => {
  it("keeps Classes as the only collection route at launch", () => {
    expect(resolveNavigationHref("en", "classes")).toBe("/en/classes");
    expect(resolveNavigationHref("ja", "ciphers")).toBe("/ja#ciphers");
  });

  it("contains the approved sidebar groups without invalid routes", () => {
    expect(navigationGroups.map((group) => group.id)).toEqual([
      "getting-started",
      "classes",
      "builds",
      "ciphers",
      "maps",
      "systems",
      "updates",
    ]);
  });
});
