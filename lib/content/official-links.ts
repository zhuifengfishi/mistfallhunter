import {
  officialLinks,
  type ApprovedOfficialSourceUrl,
} from "../../data/official-links";

export {
  approvedOfficialSourceUrls,
  isApprovedOfficialSourceUrl,
} from "../../data/official-links";
export type { ApprovedOfficialSourceUrl } from "../../data/official-links";

export function officialSourceLabel(source: ApprovedOfficialSourceUrl): string {
  if (source === officialLinks.site) return "Mistfall Hunter";
  if (source === officialLinks.steam) return "Steam";
  return "Steam News";
}
