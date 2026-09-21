import { createHash } from "crypto";
import { ORIGIN } from "./site";

export const SKILL_NAME = "mistfall-hunter-lookup";

/** Exact bytes served at /.well-known/agent-skills/mistfall-hunter-lookup/SKILL.md */
export const SKILL_BODY =
  `---
name: mistfall-hunter-lookup
description: Look up Mistfall Hunter Wiki public guides and classes, then cite the source page.
---

::ILANG::v5.0
[TYPE:agent_skill][PROJECT:MistfallHunterWiki][VERSION:1.0.0][DATE:2026-09-21][LANG:en]

::MODULE{PURPOSE}
  [GOAL] Find a Mistfall Hunter Wiki guide or class record and return its canonical URL.
  [SCOPE] Public read-only data published on https://mistfall-hunter.net
::MODULE{ENTRY}
  [HTTP] GET https://mistfall-hunter.net/api/lookup?q=KEYWORD&kind=guide|class|all
  [HTTP] GET https://mistfall-hunter.net/api/lookup?id=SLUG_OR_CLASS_ID
  [MCP] POST https://mistfall-hunter.net/mcp — tool lookup_records
::MODULE{RULES}
  [MUST] Prefer id when known; otherwise search with q.
  [MUST] Cite the result url field as the source.
  [MUST] If matched=0, say no public record was found; do not invent Mistfall Hunter facts.
  [MUST NOT] Call agent-auth endpoints; OAuth is coming soon and unavailable.
  [MUST NOT] Claim affiliation with Bellring Games or offer official account support.
::ILANG::COMPLETE::
`;

export function skillDigest(): string {
  const hash = createHash("sha256").update(SKILL_BODY, "utf8").digest("hex");
  return `sha256:${hash}`;
}

export function buildSkillIndex() {
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: SKILL_NAME,
        type: "skill-md",
        description:
          "Look up Mistfall Hunter Wiki public guides and classes, then cite the source page.",
        url: `${ORIGIN}/.well-known/agent-skills/${SKILL_NAME}/SKILL.md`,
        digest: skillDigest(),
      },
    ],
  };
}
