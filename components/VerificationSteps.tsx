/**
 * The vertical numbered verification rail (WEB-D13). Deliberately a
 * different component from the horizontal "how it works" strip even
 * though both use 1-2-3(-4) numbering — never conflate the two.
 */
export function VerificationSteps({
  steps,
  badge,
  badgeNote,
  size = "md",
}: {
  steps: { title: string; body: string }[];
  badge?: string;
  badgeNote?: string;
  size?: "md" | "sm";
}) {
  const circle = size === "md" ? 40 : 36;
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div
              key={step.title}
              style={{ display: "grid", gridTemplateColumns: `${circle + 4}px 1fr`, columnGap: "var(--space-md)" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: circle,
                    height: circle,
                    borderRadius: "var(--radius-full)",
                    border: "1.5px solid var(--color-verified-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    flex: "none",
                  }}
                >
                  {i + 1}
                </div>
                {!isLast ? (
                  <div style={{ flex: 1, width: 1.5, background: "var(--color-border-default)", minHeight: 20 }} />
                ) : null}
              </div>
              <div style={{ paddingBottom: isLast ? 0 : "var(--space-md)" }}>
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>
                  {step.title}
                </div>
                <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {badge ? (
        <div
          style={{
            marginTop: "var(--space-md)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            border: "1.5px solid var(--color-verified-border)",
            borderRadius: "var(--radius-xs)",
            padding: "var(--space-2xs) var(--space-xs)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".04em",
          }}
        >
          ✓ {badge}
        </div>
      ) : null}
      {badgeNote ? (
        <p style={{ margin: "var(--space-xs) 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
          {badgeNote}
        </p>
      ) : null}
    </div>
  );
}
