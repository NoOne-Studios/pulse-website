import { ImageSlot } from "./ImageSlot";

/**
 * WEB-D02: requires real photographs and real names. Neither exists yet,
 * so the caller gates this whole component on `foundersVisible` — when
 * false, this section must not render at all (no silhouettes, no "team
 * photo coming soon").
 */
export function Founders({
  eyebrow,
  heading,
  note,
  people,
}: {
  eyebrow: string;
  heading: string;
  note: string;
  people: { name: string; role: string; bio: string; brief: string }[];
}) {
  return (
    <div className="page-section">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "34ch" }}>{heading}</h2>
          <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", maxWidth: "62ch", color: "var(--color-text-secondary)" }}>{note}</p>
        </div>
        <div className="two-col">
          {people.map((person, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", padding: "var(--space-md)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)" }}>
              <ImageSlot ratio="1/1" label="PORTRAIT" brief={person.brief} />
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{person.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-brand)" }}>{person.role}</div>
              <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
