import { officialLinks } from "../../data/home";

export const approvedOfficialSourceUrls = [
  officialLinks.site,
  officialLinks.steam,
  officialLinks.steamNews,
] as const;

export type ApprovedOfficialSourceUrl = (typeof approvedOfficialSourceUrls)[number];

export function isApprovedOfficialSourceUrl(
  source: string,
): source is ApprovedOfficialSourceUrl {
  return approvedOfficialSourceUrls.includes(source as ApprovedOfficialSourceUrl);
}

export function officialSourceLabel(source: ApprovedOfficialSourceUrl): string {
  if (source === officialLinks.site) return "Mistfall Hunter";
  if (source === officialLinks.steam) return "Steam";
  return "Steam News";
}
