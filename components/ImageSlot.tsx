/**
 * Reserved image slot — a neutral placeholder standing in for a real
 * photograph, never stock imagery. Ratio is load-bearing (it reserves the
 * space a real photo will occupy so layout doesn't jump when one lands),
 * `label` is the short category tag shown top-left, `brief` is the shot
 * description an art director would actually be handed.
 */
export function ImageSlot({
  ratio,
  label,
  brief,
  minHeight,
}: {
  ratio: `${number}/${number}`;
  label: string;
  brief: string;
  minHeight?: number;
}) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        minHeight,
        width: "100%",
        background: "var(--color-surface-sunken)",
        border: "1px dashed var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "var(--space-sm)",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".08em",
          color: "var(--color-text-tertiary)",
          marginBottom: 2,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, lineHeight: 1.4, color: "var(--color-text-tertiary)" }}>{brief}</span>
    </div>
  );
}
