/**
 * Horizontal, snap-scrolling "how it works" strip — mobile and desktop
 * both use it, native CSS scroll-snap only, no JS carousel, no dots.
 * Deliberately a different component from VerificationSteps' vertical
 * rail (WEB-D13) even though both number 1..n.
 */
export function StepStrip({ heading, swipeHint, steps }: { heading: string; swipeHint: string; steps: { title: string; body: string }[] }) {
  return (
    <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{heading}</h2>
          <div className="swipe-hint" style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".04em", color: "var(--color-text-brand)" }}>
            {swipeHint}
          </div>
        </div>
        <div
          role="group"
          aria-label={heading}
          tabIndex={0}
          style={{
            marginTop: "var(--space-md)",
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "250px",
            gap: "var(--space-sm)",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: "var(--space-xs)",
          }}
          className="step-strip-track"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              style={{
                scrollSnapAlign: "start",
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-md)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-surface-brand)",
                  color: "var(--color-text-on-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ marginTop: "var(--space-sm)", fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>
                {step.title}
              </div>
              <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .step-strip-track { grid-auto-flow: initial; grid-template-columns: repeat(${steps.length}, 1fr); overflow-x: visible; }
          .swipe-hint { display: none; }
        }
      `}</style>
    </div>
  );
}
