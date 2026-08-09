export type ClassId =
  | "mercenary"
  | "seer"
  | "blackarrow"
  | "shadowstrix"
  | "blasphemer"
  | "withered-knight";

export const classes = [
  { id: "mercenary", weaponKey: "spearShield", roleKey: "frontline" },
  { id: "seer", weaponKey: "mysticFocus", roleKey: "rangedSupport" },
  { id: "blackarrow", weaponKey: "bow", roleKey: "precision" },
  { id: "shadowstrix", weaponKey: "dualBlades", roleKey: "assassin" },
  { id: "blasphemer", weaponKey: "heavyWeapon", roleKey: "bruiser" },
  { id: "withered-knight", weaponKey: "greatWeapon", roleKey: "durableMelee" },
] as const satisfies readonly {
  id: ClassId;
  weaponKey: string;
  roleKey: string;
}[];
