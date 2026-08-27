"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";
import { localeLabels, otherLocale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

function navItems(locale: Locale, dict: Dictionary) {
  const base = `/${locale}`;
  return [
    { href: base, label: dict.nav.home },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/technology-and-trust`, label: dict.nav.techTrust },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/for-professionals`, label: dict.nav.professionals },
    { href: `${base}/for-hospitals`, label: dict.nav.hospitals },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
}

function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const target = otherLocale[locale];
  const rest = pathname.replace(new RegExp(`^/${locale}(/|$)`), "/");
  const href = `/${target}${rest === "/" ? "" : rest}`.replace(/\/+$/, "") || `/${target}`;

  function persist() {
    document.cookie = `NEXT_LOCALE=${target}; max-age=${60 * 60 * 24 * 365}; path=/`;
  }

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-full)",
        overflow: "hidden",
        minHeight: "var(--size-target-min)",
      }}
      role="group"
      aria-label="Language / மொழி"
    >
      {(["en", "ta"] as const).map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={active ? pathname : href}
            onClick={active ? undefined : persist}
            lang={code}
            aria-current={active ? "true" : undefined}
            style={{
              minWidth: "var(--size-target-min)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 var(--space-sm)",
              fontSize: 15,
              fontWeight: active ? 600 : 500,
              background: active ? "var(--color-surface-selected)" : "transparent",
              color: active ? "var(--color-text-brand)" : "var(--color-text-primary)",
              textDecoration: "none",
            }}
          >
            {localeLabels[code]}
          </Link>
        );
      })}
    </div>
  );
}

function HamburgerBars() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 20, height: 2, background: "var(--color-text-primary)" }} />
      ))}
    </>
  );
}

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";
  const items = navItems(locale, dict);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <div ref={rootRef} style={{ borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-surface-base)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-xs)",
          padding: "var(--space-xs) var(--space-md)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Link
          href={`/${locale}`}
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: locale === "en" ? "-0.01em" : undefined,
            color: "var(--color-text-brand)",
            textDecoration: "none",
          }}
        >
          {dict.nav.brand}
        </Link>

        <nav
          aria-label="Primary"
          className="desktop-nav"
          style={{ display: "none", alignItems: "center", gap: "var(--space-lg)" }}
        >
          {items.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{
                  fontSize: 15,
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  borderBottom: active ? "2px solid var(--color-border-brand)" : "2px solid transparent",
                  paddingBottom: 4,
                  fontWeight: active ? 600 : 500,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)" }}>
          <LanguageToggle locale={locale} />
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
            onClick={() => setOpen((v) => !v)}
            style={{
              width: "var(--size-target-min)",
              height: "var(--size-target-min)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              background: "var(--color-surface-base)",
              cursor: "pointer",
            }}
          >
            {open ? (
              <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">
                ×
              </span>
            ) : (
              <HamburgerBars />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={panelId}
          aria-label="Mobile"
          className="mobile-nav-panel"
          style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--color-border-subtle)" }}
        >
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{
                  minHeight: "var(--size-target-min)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 var(--space-md)",
                  fontSize: 17,
                  color: "var(--color-text-primary)",
                  fontWeight: active ? 600 : 400,
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
          .mobile-nav-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
