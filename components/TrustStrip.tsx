export function TrustStrip({ items }: { items: string[] }) {
  return (
    <div
      style={{
        background: "var(--color-surface-sunken)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
        padding: "var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
      }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start" }}>
            <div
              style={{
                flex: "none",
                width: 22,
                height: 22,
                border: "1.5px solid var(--color-verified-border)",
                borderRadius: "var(--radius-xs)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                marginTop: 2,
              }}
              aria-hidden="true"
            >
              ✓
            </div>
            <div style={{ fontSize: "var(--step-body-en)", lineHeight: "var(--leading-lead-en)" }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
