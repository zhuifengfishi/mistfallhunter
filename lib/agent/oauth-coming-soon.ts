import { ORIGIN } from "./site";

export const AS_METADATA = {
  status: "under_construction",
  available: false,
  capabilities_status: "planned_contract_only",
  message: "Coming soon. Authentication is unavailable.",
  launch_date: null,
  issuer: ORIGIN,
  authorization_endpoint: `${ORIGIN}/agent-auth/authorize`,
  token_endpoint: `${ORIGIN}/agent-auth/token`,
  jwks_uri: `${ORIGIN}/.well-known/jwks.json`,
  grant_types_supported: [
    "authorization_code",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
  ],
  response_types_supported: ["code"],
  code_challenge_methods_supported: ["S256"],
  scopes_supported: ["site:read"],
  agent_auth: {
    status: "under_construction",
    available: false,
    capabilities_status: "planned_contract_only",
    skill: `${ORIGIN}/auth.md`,
    register_uri: `${ORIGIN}/agent-auth/register`,
    claim_uri: `${ORIGIN}/agent-auth/claim`,
    identity_types_supported: ["anonymous"],
    anonymous: {
      status: "under_construction",
      available: false,
      capabilities_status: "planned_contract_only",
      credential_types_supported: ["access_token"],
    },
  },
};

export const PRM_METADATA = {
  status: "under_construction",
  available: false,
  capabilities_status: "planned_contract_only",
  message:
    "Coming soon. Public lookups remain available without authentication.",
  launch_date: null,
  resource: `${ORIGIN}/en`,
  planned_resource_endpoint: `${ORIGIN}/agent-auth/resource`,
  authorization_servers: [ORIGIN],
  scopes_supported: ["site:read"],
  bearer_methods_supported: ["header"],
};

export const UNAVAILABLE_503 = {
  status: "under_construction",
  available: false,
  error: "temporarily_unavailable",
  error_description:
    "Coming soon. No registration or token issuance is available. Use the public lookup service.",
};

export const JWKS_DISABLED = { keys: [] };

export function authMdBody(): string {
  return [
    "# auth.md — Mistfall Hunter Wiki agent authentication",
    "",
    "::ILANG::v5.0",
    "[TYPE:auth_declaration][PROJECT:MistfallHunterWiki][VERSION:1.0.0][DATE:2026-09-21][LANG:en]",
    "",
    "::MODULE{STATE}",
    "  [FACT] OAuth for agents is coming soon and is not available.",
    "  [FACT] available=false; capabilities_status=planned_contract_only; launch_date=null.",
    "  [FACT] No registration, token issuance, or identity collection is performed on planned endpoints.",
    "  [MUST] Agents MUST NOT call /agent-auth/register, /agent-auth/authorize, /agent-auth/token, or /agent-auth/claim while available is false.",
    "  [MUST] Agents MUST use the public read-only lookup instead.",
    "::MODULE{PUBLIC_SERVICE}",
    `  [ENTRY] GET ${ORIGIN}/api/lookup?q=KEYWORD`,
    `  [ENTRY] POST ${ORIGIN}/mcp tool lookup_records`,
    `  [DOC] ${ORIGIN}/llms.txt`,
    `  [AS] ${ORIGIN}/.well-known/oauth-authorization-server`,
    `  [PRM] ${ORIGIN}/.well-known/oauth-protected-resource`,
    "::ILANG::COMPLETE::",
    "",
    "Coming soon. Authentication is unavailable. Public guide and class lookup stays open without login.",
    "",
  ].join("\n");
}
