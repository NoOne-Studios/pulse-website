"use client";

import { useState } from "react";

/**
 * Auto-scrolling dark band. The clip wrapper is `flex:1 1 0; min-width:0`
 * — `flex:1` alone lets the track's `width:max-content` force the wrapper
 * wider than the row, pushing the button outside the clip. The Pause/Play
 * button is a sibling of the clip, not inside it, and is the required stop
 * control for auto-moving content (WCAG 2.2.2).
 */
export function Marquee({ items, pauseLabel, playLabel }: { items: string[]; pauseLabel: string; playLabel: string }) {
  const [paused, setPaused] = useState(false);
  const track = [...items, ...items];

  return (
    <div
      style={{
        position: "relative",
        background: "var(--color-surface-inverse)",
        color: "var(--color-text-inverse)",
        overflow: "clip",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        padding: "var(--space-md) 0",
      }}
    >
      <div style={{ flex: "1 1 0", minWidth: 0, overflow: "clip" }}>
        <div
          style={{
            display: "flex",
            width: "max-content",
            gap: "var(--space-2xl)",
            animation: "pulseMarq 28s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {track.map((item, i) => (
            <span key={i} style={{ fontSize: 17, fontWeight: 600, letterSpacing: ".02em", whiteSpace: "nowrap" }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        style={{
          flex: "none",
          minWidth: 48,
          minHeight: 48,
          marginRight: "var(--space-md)",
          border: "1px solid var(--ink-800)",
          borderRadius: "var(--radius-full)",
          background: "transparent",
          color: "var(--color-text-inverse)",
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          padding: "0 var(--space-sm)",
        }}
      >
        {paused ? playLabel : pauseLabel}
      </button>
    </div>
  );
}
