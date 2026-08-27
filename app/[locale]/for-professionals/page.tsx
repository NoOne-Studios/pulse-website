import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive } from "@/lib/config";

export default async function ProfessionalsPage(props: PageProps<"/[locale]/for-professionals">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.professionals;
  const isTamil = locale === "ta";

  // The doctor role card is only ever added, never disabled or greyed out
  // — see lib/config.ts `doctorLive` (MKT-06 §5).
  const roles = doctorLive ? t.roles : t.roles.slice(0, 3);
  const approvalNote = doctorLive ? t.approvalNoteFour : t.approvalNoteThree;

  return (
    <div className="page-section">
      <div className="container sidebar-col">
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
              lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
              fontWeight: 700,
              letterSpacing: isTamil ? undefined : "-0.01em",
            }}
          >
            {t.h1}
          </h1>
          <p style={{ margin: "var(--space-xs) 0 var(--space-xl)", maxWidth: "58ch", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
            {doctorLive ? t.introFour : t.introThree}
          </p>
          <h2 style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
            {t.rolesHeading}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "var(--space-sm)", alignItems: "stretch" }}>
            {roles.map((role) => (
              <div
                key={role.title}
                style={{
                  border: role.note ? "2px solid var(--color-border-brand)" : "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-md)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-xs)",
                }}
              >
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{role.title}</div>
                <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{role.body}</p>
                {role.note ? (
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-primary)" }}>
                    <strong>{role.note}</strong>
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-lg)", border: "1px dashed var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: isTamil ? undefined : ".04em", textTransform: isTamil ? "none" : "uppercase", color: "var(--color-text-brand)" }}>
              {t.approvalHeading}
            </div>
            <div
              style={{
                marginTop: "var(--space-xs)",
                minHeight: "var(--size-target-min)",
                display: "flex",
                alignItems: "center",
                borderBottom: "2px dashed var(--color-border-default)",
                fontSize: isTamil ? "var(--step-h2-ta)" : "var(--step-h2-en)",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
              }}
            >
              {t.approvalPlaceholder}
            </div>
            <p style={{ margin: "var(--space-xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{approvalNote}</p>
          </div>

          <div style={{ marginTop: "var(--space-md)", border: "1px dashed var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: isTamil ? undefined : ".04em", textTransform: isTamil ? "none" : "uppercase", color: "var(--color-text-brand)" }}>
              {t.noLabCard.heading}
            </div>
            <p style={{ margin: "var(--space-xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.noLabCard.body}</p>
          </div>
        </div>

        <div
          style={{
            border: "2px solid var(--color-border-brand)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-lg)",
            background: "var(--color-surface-selected)",
            alignSelf: "start",
          }}
        >
          <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)", color: "var(--color-text-brand)" }}>
            {t.whatsapp.heading}
          </div>
          <p style={{ margin: "var(--space-xs) 0 var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-primary)" }}>
            {t.whatsapp.body}
          </p>
          <div
            style={{
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--color-action-primary)",
              color: "var(--color-action-primary-text)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--step-lead-en)",
              fontWeight: 600,
              textAlign: "center",
              padding: "0 var(--space-md)",
            }}
          >
            {t.whatsapp.button}
          </div>
          <div style={{ marginTop: "var(--space-xs)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-primary)" }}>{t.whatsapp.altNote}</div>
        </div>
      </div>
    </div>
  );
}
