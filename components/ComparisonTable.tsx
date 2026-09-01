interface Row {
  a: string;
  b: string;
  emphasize?: boolean;
}

/** Ticks/dashes always carry a real word too — never colour-only signalling. */
export function ComparisonTable({
  heading,
  sub,
  onYourOwnLabel,
  withPulseLabel,
  rows,
}: {
  heading: string;
  sub: string;
  onYourOwnLabel: string;
  withPulseLabel: string;
  rows: Row[];
}) {
  return (
    <div className="page-section">
      <div className="container">
        <h2 style={{ margin: "0 0 var(--space-2xs)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "36ch" }}>
          {heading}
        </h2>
        <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{sub}</p>
        <div style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--color-surface-sunken)",
              borderBottom: "1px solid var(--color-border-default)",
            }}
          >
            <div style={{ padding: "var(--space-sm) var(--space-md)", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", color: "var(--color-text-tertiary)" }}>
              {onYourOwnLabel}
            </div>
            <div
              style={{
                padding: "var(--space-sm) var(--space-md)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                color: "var(--color-text-brand)",
                borderLeft: "1px solid var(--color-border-default)",
              }}
            >
              {withPulseLabel}
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.a}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderTop: i === 0 ? "none" : "1px solid var(--color-border-subtle)",
                background: row.emphasize ? "var(--color-surface-selected)" : undefined,
              }}
            >
              <div style={{ padding: "var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>
                {row.a}
              </div>
              <div
                style={{
                  padding: "var(--space-md)",
                  fontSize: "var(--step-body-en)",
                  lineHeight: "var(--leading-body-en)",
                  fontWeight: row.emphasize ? 600 : 500,
                  borderLeft: "1px solid var(--color-border-subtle)",
                }}
              >
                {row.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
