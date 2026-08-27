"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

function ChipGroup({
  options,
  selected,
  onSelect,
  ariaLabel,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginTop: "var(--space-xs)" }}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="chip"
          aria-pressed={selected === option}
          onClick={() => onSelect(option)}
        >
          {selected === option ? "✓ " : ""}
          {option}
        </button>
      ))}
    </div>
  );
}

export function ContactForm({ locale, dict, doctorLive }: { locale: Locale; dict: Dictionary; doctorLive: boolean }) {
  const t = dict.contact;
  const isTamil = locale === "ta";

  const [who, setWho] = useState<number | null>(null);
  const [when, setWhen] = useState<string | null>(null);
  const [where, setWhere] = useState<string | null>(null);
  const [kind, setKind] = useState<string | null>(null);
  const [doctorMode, setDoctorMode] = useState<string | null>(t.family.doctorMode[2]);
  const [role, setRole] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: boolean; mobile?: boolean }>({});

  const nameId = useId();
  const mobileId = useId();
  const noteId = useId();

  const kindOptions = doctorLive ? t.family.kindFour : t.family.kindThree;
  const roleOptions = doctorLive ? t.professional.rolesFour : t.professional.rolesThree;
  const isDoctorKind = doctorLive && kind === kindOptions[0];
  const isDoctorRole = doctorLive && role === roleOptions[roleOptions.length - 1];

  function reset() {
    setWho(null);
    setWhen(null);
    setWhere(null);
    setKind(null);
    setRole(null);
    setName("");
    setMobile("");
    setNote("");
    setSubmitted(false);
    setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = {
      name: name.trim().length === 0,
      mobile: !/^\d{10}$/.test(mobile.trim()),
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.mobile) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          who: who !== null ? t.whoOptions[who] : null,
          when,
          where,
          kind,
          doctorMode: isDoctorKind ? doctorMode : null,
          role,
          name,
          mobile,
          note,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    const summaryParts = [
      who !== null ? t.whoOptions[who] : null,
      when,
      where,
      kind,
      isDoctorKind ? doctorMode : null,
      role,
    ].filter(Boolean);

    return (
      <div style={{ border: "1.5px solid var(--color-verified-border)", borderRadius: "var(--radius-md)", padding: "var(--space-lg) var(--space-md)" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            border: "1.5px solid var(--color-verified-border)",
            borderRadius: "var(--radius-xs)",
            padding: "var(--space-2xs) var(--space-xs)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: isTamil ? undefined : ".04em",
          }}
        >
          ✓ {t.submitted.badge}
        </div>
        <h2 style={{ margin: "var(--space-md) 0 0", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
          {t.submitted.heading}
          {name ? `, ${name}` : ""}
        </h2>
        <p style={{ margin: "var(--space-xs) 0 0", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
          {t.submitted.body}
        </p>
        {summaryParts.length ? (
          <p style={{ margin: "var(--space-md) 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
            {t.submitted.summaryLabel}: {summaryParts.join(" · ")}
          </p>
        ) : null}
        <button type="button" onClick={reset} style={{ marginTop: "var(--space-sm)", background: "none", border: "none", padding: 0, font: "inherit", color: "var(--color-text-brand)", textDecoration: "underline", cursor: "pointer" }}>
          {t.changeLabel}
        </button>
        <p style={{ margin: "var(--space-md) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
          <Link href={`/${locale}/technology-and-trust`}>{t.submitted.whileWaiting}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="two-col">
      <div>
        <h1
          style={{
            margin: "0 0 var(--space-lg)",
            fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
            lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
            fontWeight: 700,
            letterSpacing: isTamil ? undefined : "-0.01em",
          }}
        >
          {t.h1}
        </h1>
        <p style={{ margin: "0 0 var(--space-lg)", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
          {t.sub}
        </p>

        <form onSubmit={onSubmit} noValidate>
          <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)", marginBottom: "var(--space-sm)" }}>
            {t.whoHeading}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            {t.whoOptions.map((option, i) => (
              <button
                key={option}
                type="button"
                onClick={() => setWho(i)}
                aria-pressed={who === i}
                style={{
                  minHeight: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-sm)",
                  padding: "var(--space-sm) var(--space-md)",
                  border: who === i ? "2px solid var(--color-border-brand)" : "1px solid var(--color-border-default)",
                  background: who === i ? "var(--color-surface-selected)" : "transparent",
                  color: who === i ? "var(--color-text-brand)" : "var(--color-text-primary)",
                  fontWeight: who === i ? 600 : 400,
                  borderRadius: "var(--radius-md)",
                  fontSize: 17,
                  textAlign: "left",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                <span>{option}</span>
                {who === i ? <span style={{ fontSize: 15, textDecoration: "underline" }}>{t.changeLabel}</span> : null}
              </button>
            ))}
          </div>

          {who === null ? (
            <p style={{ marginTop: "var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.afterChoiceNote}</p>
          ) : null}

          {who === 0 ? (
            <div style={{ marginTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
              <div>
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.family.whenHeading}</div>
                <ChipGroup options={t.family.when} selected={when} onSelect={setWhen} ariaLabel={t.family.whenHeading} />
              </div>
              <div>
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.family.whereHeading}</div>
                <ChipGroup options={t.family.where} selected={where} onSelect={setWhere} ariaLabel={t.family.whereHeading} />
              </div>
              <div>
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.family.kindHeading}</div>
                <ChipGroup options={kindOptions} selected={kind} onSelect={setKind} ariaLabel={t.family.kindHeading} />
              </div>
              {isDoctorKind ? (
                <div>
                  <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.family.doctorModeHeading}</div>
                  <ChipGroup options={t.family.doctorMode} selected={doctorMode} onSelect={setDoctorMode} ariaLabel={t.family.doctorModeHeading} />
                </div>
              ) : null}
            </div>
          ) : null}

          {who === 1 ? (
            <div style={{ marginTop: "var(--space-lg)" }}>
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.professional.roleHeading}</div>
              <ChipGroup options={roleOptions} selected={role} onSelect={setRole} ariaLabel={t.professional.roleHeading} />
              {isDoctorRole ? (
                <div style={{ marginTop: "var(--space-md)", border: "2px solid var(--color-border-brand)", background: "var(--color-surface-selected)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-brand)" }}>{t.professional.doctorNote.heading}</div>
                  <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.professional.doctorNote.body}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {who !== null ? (
            <div style={{ marginTop: "var(--space-xl)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
              <div>
                <label htmlFor={nameId} style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: "var(--space-2xs)" }}>
                  {t.nameLabel}
                </label>
                <input
                  id={nameId}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errors.name || undefined}
                  style={{ minHeight: 56, width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "0 var(--space-md)", fontSize: 17, fontFamily: "inherit" }}
                />
                {errors.name ? (
                  <div role="alert" style={{ marginTop: "var(--space-2xs)", fontSize: 13, color: "var(--color-error-text)" }}>
                    {t.errors.required}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor={mobileId} style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: "var(--space-2xs)" }}>
                  {t.mobileLabel}
                </label>
                <input
                  id={mobileId}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={t.mobilePlaceholder}
                  inputMode="numeric"
                  aria-invalid={errors.mobile || undefined}
                  style={{ minHeight: 56, width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "0 var(--space-md)", fontSize: 17, fontFamily: "inherit" }}
                />
                {errors.mobile ? (
                  <div role="alert" style={{ marginTop: "var(--space-2xs)", fontSize: 13, color: "var(--color-error-text)" }}>
                    {t.errors.mobile}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor={noteId} style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: "var(--space-2xs)" }}>
                  {t.noteLabel} <span style={{ fontWeight: 400, color: "var(--color-text-secondary)" }}>— {t.noteOptional}</span>
                </label>
                <textarea
                  id={noteId}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.notePlaceholder}
                  rows={3}
                  style={{ minHeight: 96, width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-sm) var(--space-md)", fontSize: 17, lineHeight: 1.55, fontFamily: "inherit" }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  minHeight: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-action-primary)",
                  color: "var(--color-action-primary-text)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontSize: 17,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t.submitLabel}
              </button>
              {status === "error" ? (
                <div role="alert" style={{ fontSize: 13, color: "var(--color-error-text)" }}>
                  {t.errors.required}
                </div>
              ) : null}
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{t.submitHelper}</div>
            </div>
          ) : null}
        </form>
      </div>

      <div style={{ background: "var(--color-surface-sunken)", borderRadius: "var(--radius-md)", padding: "var(--space-lg) var(--space-md)", alignSelf: "start" }}>
        <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)", marginBottom: "var(--space-sm)" }}>
          {t.directHeading}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
          <div style={{ minHeight: 56, display: "flex", alignItems: "center", gap: "var(--space-sm)", padding: "0 var(--space-md)", background: "var(--color-surface-base)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", fontSize: 17 }}>
            <strong style={{ fontWeight: 600 }}>{t.phoneLabel}</strong> {t.phonePlaceholder}
          </div>
          <div style={{ minHeight: 56, display: "flex", alignItems: "center", gap: "var(--space-sm)", padding: "0 var(--space-md)", background: "var(--color-surface-base)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", fontSize: 17 }}>
            <strong style={{ fontWeight: 600 }}>{t.whatsappLabel}</strong> {t.whatsappPlaceholder}
          </div>
          <div style={{ minHeight: 56, display: "flex", alignItems: "center", gap: "var(--space-sm)", padding: "0 var(--space-md)", background: "var(--color-surface-base)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", fontSize: 17 }}>
            <strong style={{ fontWeight: 600 }}>{t.emailLabel}</strong> {t.emailPlaceholder}
          </div>
        </div>
        <div style={{ marginTop: "var(--space-sm)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{t.hoursNote}</div>
      </div>
    </div>
  );
}
