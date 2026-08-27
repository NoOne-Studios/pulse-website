/**
 * WEB-D02: requires real photographs and real names. Neither exists yet,
 * so the caller gates this whole component on `foundersVisible` — when
 * false, this section must not render at all (no silhouettes, no "team
 * photo coming soon").
 */
export function Founders({ heading, people }: { heading: string; people: { name: string; role: string; bio: string }[] }) {
  return (
    <div className="page-section">
      <div className="container">
        <h2 style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
          {heading}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {people.map((person, i) => (
            <div key={i} style={{ display: "flex", gap: "var(--space-md)", alignItems: "flex-start" }}>
              <div
                style={{
                  flex: "none",
                  width: 96,
                  height: 120,
                  background: "var(--color-surface-sunken)",
                  border: "1px dashed var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "var(--color-text-tertiary)",
                  textAlign: "center",
                  padding: "var(--space-2xs)",
                }}
              >
                Photograph
                <br />
                96 × 120
              </div>
              <div>
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{person.name}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-brand)", marginTop: 2 }}>{person.role}</div>
                <p style={{ margin: "var(--space-xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                  {person.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
