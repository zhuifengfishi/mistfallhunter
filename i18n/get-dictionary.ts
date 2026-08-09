import { de } from "./dictionaries/de";
import { en, type Dictionary } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";
import { ptBr } from "./dictionaries/pt-br";
import type { Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ja,
  de,
  "pt-br": ptBr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary } from "./dictionaries/en";
