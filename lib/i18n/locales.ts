export const locales = ["en", "ta"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ta: "தமிழ்",
};

/** Used for the `lang` attribute on the inactive toggle segment, so a
 * screen reader doesn't mispronounce a label written in the other script. */
export const otherLocale: Record<Locale, Locale> = {
  en: "ta",
  ta: "en",
};
