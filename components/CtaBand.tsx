import { ImageSlot } from "./ImageSlot";

/**
 * Ghost wordmark behind the title is a reserved parallax surface
 * (data-parallax/-depth) — decorative background only, static for now.
 * See globals.css for why it isn't scroll-linked yet.
 */
export function CtaBand({ wordmark, title, brief, children }: { wordmark: string; title: string; brief: string; children: React.ReactNode }) {
  return (
    <div className="page-section" style={{ position: "relative", overflow: "clip", background: "var(--color-surface-inverse)", color: "var(--color-text-inverse)" }}>
      <div
        aria-hidden="true"
        data-parallax="wordmark"
        data-parallax-depth="0.06"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
          userSelect: "none",
          fontSize: "clamp(44px, 9vw, 104px)",
          lineHeight: 0.92,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--ink-900)",
          whiteSpace: "nowrap",
        }}
      >
        {wordmark}
      </div>
      <div className="container" style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-lg)", alignItems: "flex-start" }}>
        <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "30ch" }}>{title}</h2>
        {children}
        <div style={{ width: "100%", marginTop: "var(--space-xs)" }}>
          <ImageSlot ratio="21/9" label="WIDE" brief={brief} />
        </div>
      </div>
    </div>
  );
}
