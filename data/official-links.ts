export const officialLinks = {
  site: "https://mistfallhunter.com/",
  steam: "https://store.steampowered.com/app/3282300/",
  steamNews: "https://steamcommunity.com/app/3282300/allnews/",
} as const;

export const approvedOfficialSourceUrls = Object.values(officialLinks);

export type ApprovedOfficialSourceUrl = (typeof approvedOfficialSourceUrls)[number];

export function isApprovedOfficialSourceUrl(
  source: string,
): source is ApprovedOfficialSourceUrl {
  return approvedOfficialSourceUrls.includes(source as ApprovedOfficialSourceUrl);
}
