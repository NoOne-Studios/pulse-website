import { en } from "./en";
import { ta } from "./ta";
import type { Locale } from "./locales";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, ta };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./locales";
