import Link from "next/link";

export function ContactTeaser({
  locale,
  eyebrow,
  heading,
  body,
  cta,
  contactRows,
  emergencyNote,
}: {
  locale: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  contactRows: { label: string; value: string; href: string }[];
  emergencyNote: string;
}) {
  return (
    <div className="page-section">
      <div className="container two-col" style={{ alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{heading}</h2>
          <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", maxWidth: "48ch", color: "var(--color-text-secondary)" }}>{body}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", marginTop: "var(--space-xs)" }}>
            {contactRows.map((row) => (
              <a key={row.label} href={row.href} style={{ display: "flex", flexDirection: "column", gap: 2, minHeight: 48, justifyContent: "center", textDecoration: "none" }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{row.label}</span>
                <span style={{ fontSize: "var(--step-lead-en)", color: "var(--color-text-brand)", fontWeight: 600 }}>{row.value}</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <Link
            href={`/${locale}/contact`}
            style={{
              minHeight: 56,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-sm) var(--space-lg)",
              borderRadius: "var(--radius-md)",
              background: "var(--color-action-primary)",
              color: "var(--color-action-primary-text)",
              fontSize: "var(--step-lead-en)",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            {cta}
          </Link>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", padding: "var(--space-sm) var(--space-md)", borderLeft: "3px solid var(--color-border-brand)", background: "var(--color-surface-sunken)" }}>
            {emergencyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
