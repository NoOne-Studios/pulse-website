/** The only element that carries the remote-consultation exception — never
 * drop it, never turn it into an icon (see docs/design README, "Service
 * row — count-driven grid"). */
export function DeliveryModePill({ label, brand = false }: { label: string; brand?: boolean }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        alignItems: "center",
        border: `1px solid ${brand ? "var(--color-border-brand)" : "var(--color-border-default)"}`,
        background: brand ? "var(--color-surface-selected)" : "transparent",
        color: brand ? "var(--color-text-brand)" : "var(--color-text-primary)",
        borderRadius: "var(--radius-full)",
        padding: "2px var(--space-xs)",
        fontSize: 12,
        fontWeight: 600,
        overflowWrap: "break-word",
        whiteSpace: "normal",
      }}
    >
      {label}
    </div>
  );
}
