"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/lib/i18n/types";

/** `inverse` — set true when placed on a dark band (e.g. the CTA band):
 * swaps the note/error/done-state colors for something visible on
 * `--color-surface-inverse`, since the default colors assume a light
 * background like the hero. */
export function WaitlistForm({ dict, inverse = false }: { dict: Dictionary["home"]["waitlist"]; inverse?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const fieldId = useId();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        style={{
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 var(--space-md)",
          border: `1.5px solid ${inverse ? "var(--color-text-inverse)" : "var(--color-verified-border)"}`,
          borderRadius: "var(--radius-md)",
          fontSize: 15,
          color: inverse ? "var(--color-text-inverse)" : undefined,
        }}
      >
        ✓ {email}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }} noValidate>
      <label htmlFor={fieldId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {dict.emailPlaceholder}
      </label>
      <input
        id={fieldId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dict.emailPlaceholder}
        style={{
          minHeight: 56,
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "0 var(--space-md)",
          fontSize: 17,
          fontFamily: "inherit",
          width: "100%",
        }}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          minHeight: 56,
          minWidth: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-action-primary)",
          color: "var(--color-action-primary-text)",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontSize: 17,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {dict.button}
      </button>
      {status === "error" ? (
        <div style={{ fontSize: 13, color: inverse ? "var(--color-text-inverse)" : "var(--color-error-text)" }} role="alert">
          {dict.invalidEmail}
        </div>
      ) : null}
      <div style={{ fontSize: 13, lineHeight: 1.5, color: inverse ? "var(--ink-400)" : "var(--color-text-primary)" }}>
        {dict.note} <span style={{ textDecoration: "underline" }}>{dict.privacyLinkLabel}</span>
      </div>
    </form>
  );
}
