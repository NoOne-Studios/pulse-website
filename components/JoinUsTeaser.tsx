export function JoinUsTeaser({
  eyebrow,
  heading,
  body,
  zone,
  roles,
  cta,
  ctaHref,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  zone: string;
  roles: { title: string; body: string }[];
  cta: string;
  ctaHref: string;
}) {
  return (
    <div className="page-section">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "34ch" }}>{heading}</h2>
          <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", maxWidth: "62ch", color: "var(--color-text-secondary)" }}>{body}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--space-sm)", alignItems: "stretch" }}>
          {roles.map((role) => (
            <div key={role.title} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", padding: "var(--space-md)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{zone}</span>
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{role.title}</div>
              <ul style={{ margin: "var(--space-2xs) 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
                {role.body.split(" · ").map((req) => (
                  <li key={req} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-xs)", color: "var(--color-text-secondary)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                    <span aria-hidden="true" style={{ color: "var(--color-text-brand)", fontWeight: 700 }}>
                      ✓
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a
          href={ctaHref}
          style={{
            minHeight: 56,
            minWidth: 220,
            alignSelf: "flex-start",
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
        </a>
      </div>
    </div>
  );
}
