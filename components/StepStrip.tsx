import { ImageSlot } from "./ImageSlot";

interface Step {
  n: string;
  stepLabel: string;
  title: string;
  body: string;
  brief: string;
  items: string[];
}

/**
 * "How it works" — stacked full-width rows (image + copy), image on the
 * left at desktop. Each step carries its own photo and a short "what this
 * means" checklist.
 */
export function StepStrip({ heading, meansLabel, steps }: { heading: string; meansLabel: string; steps: Step[] }) {
  return (
    <div className="page-section">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "40ch" }}>
          {heading}
        </h2>
        {steps.map((step, i) => (
          <div
            key={step.n}
            className="two-col"
            style={{ alignItems: "start", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}
          >
            <ImageSlot ratio="3/2" label="PHOTO" brief={step.brief} src={`/images/panels/panel-step-${i}.png`} />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-surface-brand)",
                    color: "var(--color-text-on-brand)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {step.n}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", color: "var(--color-text-tertiary)" }}>{step.stepLabel}</span>
              </div>
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{step.title}</div>
              <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{step.body}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2xs)", marginTop: "var(--space-2xs)", paddingTop: "var(--space-sm)", borderTop: "1px solid var(--color-border-subtle)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", color: "var(--color-text-tertiary)" }}>{meansLabel}</span>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-xs)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                      <span aria-hidden="true" style={{ color: "var(--color-text-brand)", fontWeight: 700 }}>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
