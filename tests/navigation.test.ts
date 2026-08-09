import { describe, expect, it } from "vitest";
import { navigationGroups, resolveNavigationHref } from "../data/navigation";

describe("wiki navigation", () => {
  it("keeps Classes as the only collection route at launch", () => {
    expect(resolveNavigationHref("en", "classes")).toBe("/en/classes");
    expect(resolveNavigationHref("ja", "ciphers")).toBe("/ja#ciphers");
  });

  it("keeps future groups visible without inventing a destination", () => {
    expect(resolveNavigationHref("en", "systems")).toBeNull();
  });

  it("resolves every implemented group to a real route or homepage anchor", () => {
    expect(navigationGroups.map((group) => [
      group.id,
      resolveNavigationHref("en", group.id),
    ])).toEqual([
      ["getting-started", "/en#start-here"],
      ["classes", "/en/classes"],
      ["builds", "/en#builds"],
      ["ciphers", "/en#ciphers"],
      ["maps", "/en#maps"],
      ["systems", null],
      ["updates", "/en#updates"],
    ]);
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
