import { ImageSlot } from "./ImageSlot";

export function WhatWeCheck({
  eyebrow,
  title,
  body,
  brief,
  rows,
}: {
  eyebrow: string;
  title: string;
  body: string;
  brief: string;
  rows: string[];
}) {
  return (
    <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <div className="container two-col" style={{ alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{title}</h2>
          <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", maxWidth: "54ch", color: "var(--color-text-secondary)" }}>{body}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", padding: "var(--space-md)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
          <ImageSlot ratio="4/3" label="PHOTO" brief={brief} />
          {rows.map((row, i) => (
            <div key={row} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-sm)" }}>
              <span
                aria-hidden="true"
                style={{
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-surface-brand)",
                  color: "var(--color-text-on-brand)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--step-body-en)",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", paddingTop: 5 }}>{row}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
