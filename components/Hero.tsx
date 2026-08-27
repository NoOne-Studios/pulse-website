import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { WaitlistForm } from "./WaitlistForm";

/**
 * Headline lines rise from clipped containers on mount (pure CSS, no JS —
 * `animation ... both` holds the pre-animation state until it starts, and
 * `@media (prefers-reduced-motion)` in globals.css collapses every duration
 * to ~0 site-wide). Runs once on load, never on scroll.
 */
export function Hero({ locale, dict, lines, lead }: { locale: Locale; dict: Dictionary; lines: string[]; lead: string }) {
  const isTamil = locale === "ta";
  return (
    <div className="page-section" style={{ paddingTop: "var(--space-xl)", paddingBottom: "var(--space-2xl)" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
                lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
                fontWeight: 700,
                letterSpacing: isTamil ? undefined : "-0.01em",
                animation: `pulseRise var(--motion-duration-slow) var(--motion-ease-standard) ${i * 90}ms both`,
              }}
            >
              {line}
            </div>
          </div>
        ))}
        <p
          style={{
            margin: "var(--space-md) 0 0",
            fontSize: "var(--step-lead-en)",
            lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)",
            textWrap: "pretty",
            animation: "pulseFade var(--motion-duration-slow) var(--motion-ease-standard) 320ms both",
          }}
        >
          {lead}
        </p>
        <div
          style={{
            marginTop: "var(--space-lg)",
            maxWidth: 360,
            animation: "pulseFade var(--motion-duration-slow) var(--motion-ease-standard) 420ms both",
          }}
        >
          <WaitlistForm dict={dict.home.waitlist} />
          <div style={{ marginTop: "var(--space-sm)" }}>
            <Link href={`/${locale}/contact`} style={{ fontSize: 15 }}>
              {dict.home.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
