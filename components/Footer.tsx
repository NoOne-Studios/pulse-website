import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const pages = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/technology-and-trust`, label: dict.nav.techTrust },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/for-professionals`, label: dict.nav.professionals },
    { href: `${base}/for-hospitals`, label: dict.nav.hospitals },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer
      style={{
        background: "var(--color-surface-inverse)",
        color: "var(--color-text-inverse)",
        padding: "var(--space-xl) var(--space-md) var(--space-2xl)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{dict.nav.brand}</div>
        <p style={{ margin: "var(--space-xs) 0 var(--space-lg)", fontSize: 15, opacity: 0.92, maxWidth: "60ch" }}>
          {dict.footer.blurb}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "var(--space-md)", maxWidth: 480 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: locale === "en" ? ".06em" : undefined, opacity: 0.7 }}>
              {dict.footer.pagesHeading}
            </div>
            {pages.map((p) => (
              <Link key={p.href} href={p.href} style={{ fontSize: 15, minHeight: 24, color: "var(--color-text-inverse)" }}>
                {p.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: locale === "en" ? ".06em" : undefined, opacity: 0.7 }}>
              {dict.footer.elsewhereHeading}
            </div>
            {/* WEB-D08: social links are text labels, never icon-only. These are not yet
                real destinations — wire up when the accounts exist. */}
            {dict.footer.social.map((label) => (
              <span key={label} style={{ fontSize: 15, minHeight: 24 }}>
                {label}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "var(--space-lg)",
            paddingTop: "var(--space-md)",
            borderTop: "1px solid rgba(255,255,255,.24)",
            fontSize: 13,
            opacity: 0.85,
            display: "flex",
            gap: "var(--space-sm)",
            flexWrap: "wrap",
          }}
        >
          <span>{dict.footer.legal}</span>
          <span>·</span>
          <span style={{ textDecoration: "underline" }}>{dict.footer.privacy}</span>
          <span>·</span>
          <span style={{ textDecoration: "underline" }}>{dict.footer.terms}</span>
        </div>
      </div>
    </footer>
  );
}
