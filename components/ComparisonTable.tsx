interface Row {
  label: string;
  onYourOwn: string;
  withPulse: string;
  emphasize?: boolean;
}

/** Ticks/dashes always carry a real word too — never colour-only signalling. */
export function ComparisonTable({
  heading,
  sub,
  onYourOwnLabel,
  withPulseLabel,
  rows,
  legend,
}: {
  heading: string;
  sub: string;
  onYourOwnLabel: string;
  withPulseLabel: string;
  rows: Row[];
  legend: string;
}) {
  return (
    <div className="page-section">
      <div className="container">
        <h2 style={{ margin: "0 0 var(--space-2xs)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
          {heading}
        </h2>
        <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{sub}</p>
        <div style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(120px,1fr) minmax(84px,auto) minmax(84px,auto)",
              background: "var(--color-surface-sunken)",
              borderBottom: "1px solid var(--color-border-default)",
            }}
          >
            <div style={{ padding: "var(--space-sm)" }} />
            <div style={{ padding: "var(--space-sm)", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{onYourOwnLabel}</div>
            <div style={{ padding: "var(--space-sm)", fontSize: 13, fontWeight: 600, textAlign: "center", color: "var(--color-text-brand)" }}>
              {withPulseLabel}
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px,1fr) minmax(84px,auto) minmax(84px,auto)",
                borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--color-border-subtle)",
                background: row.emphasize ? "var(--color-surface-selected)" : undefined,
              }}
            >
              <div style={{ padding: "var(--space-sm)", fontSize: "var(--step-body-en)", lineHeight: 1.5, fontWeight: row.emphasize ? 600 : 400 }}>
                {row.label}
              </div>
              <div style={{ padding: "var(--space-sm)", textAlign: "center", fontSize: 13, fontWeight: 600 }}>— {row.onYourOwn}</div>
              <div style={{ padding: "var(--space-sm)", textAlign: "center", fontSize: 13, fontWeight: 600 }}>✓ {row.withPulse}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-xs)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{legend}</div>
      </div>
    </div>
  );
}
