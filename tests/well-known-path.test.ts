import { describe, expect, it } from "vitest";
import {
  normalizeWellKnownPath,
  rewriteWellKnownRequestPath,
} from "../lib/agent/well-known-path";

describe("normalizeWellKnownPath", () => {
  it("strips trailing locale from oauth-protected-resource", () => {
    expect(normalizeWellKnownPath("/.well-known/oauth-protected-resource/en"))
      .toBe("/.well-known/oauth-protected-resource");
    expect(normalizeWellKnownPath("/.well-known/oauth-protected-resource/en/"))
      .toBe("/.well-known/oauth-protected-resource");
    expect(normalizeWellKnownPath("/well-known/oauth-protected-resource/ja"))
      .toBe("/well-known/oauth-protected-resource");
  });

  it("strips trailing locale from sibling discovery paths", () => {
    const siblings = [
      "oauth-authorization-server",
      "jwks.json",
      "api-catalog",
      "mcp/server-card.json",
      "agent-skills/index.json",
      "ai-catalog.json",
    ];
    for (const sibling of siblings) {
      expect(normalizeWellKnownPath(`/.well-known/${sibling}/en`))
        .toBe(`/.well-known/${sibling}`);
      expect(normalizeWellKnownPath(`/.well-known/${sibling}/pt-br`))
        .toBe(`/.well-known/${sibling}`);
    }
  });

  it("strips leading locale before well-known", () => {
    expect(normalizeWellKnownPath("/en/.well-known/oauth-protected-resource"))
      .toBe("/.well-known/oauth-protected-resource");
    expect(normalizeWellKnownPath("/de/well-known/api-catalog"))
      .toBe("/well-known/api-catalog");
  });

  it("leaves bare well-known and locale HTML routes alone", () => {
    expect(normalizeWellKnownPath("/.well-known/oauth-protected-resource"))
      .toBe("/.well-known/oauth-protected-resource");
    expect(normalizeWellKnownPath("/en")).toBe("/en");
    expect(normalizeWellKnownPath("/en/classes")).toBe("/en/classes");
    expect(normalizeWellKnownPath("/en/classes/best-class")).toBe("/en/classes/best-class");
  });
});

describe("rewriteWellKnownRequestPath", () => {
  it("rewrites dotted well-known and locale aliases to /well-known handlers", () => {
    expect(rewriteWellKnownRequestPath("/.well-known/oauth-protected-resource"))
      .toBe("/well-known/oauth-protected-resource");
    expect(rewriteWellKnownRequestPath("/.well-known/oauth-protected-resource/en"))
      .toBe("/well-known/oauth-protected-resource");
    expect(rewriteWellKnownRequestPath("/en/.well-known/oauth-protected-resource"))
      .toBe("/well-known/oauth-protected-resource");
    expect(rewriteWellKnownRequestPath("/well-known/oauth-protected-resource/en"))
      .toBe("/well-known/oauth-protected-resource");
  });

  it("returns null for non-well-known paths and already-canonical handlers", () => {
    expect(rewriteWellKnownRequestPath("/well-known/oauth-protected-resource")).toBeNull();
    expect(rewriteWellKnownRequestPath("/en")).toBeNull();
    expect(rewriteWellKnownRequestPath("/en/classes")).toBeNull();
  });
});
