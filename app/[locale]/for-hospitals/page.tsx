import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";

/**
 * CONFLICT — flagged, not resolved (per docs/design README, "Open
 * Decisions" #2, and the user's explicit instruction to build this page
 * as-is rather than guess a resolution):
 *
 * This page sells after-hospital discharge referrals. The four agreed
 * Phase-1 service lines (doctor consultation, home nursing, home
 * physiotherapy, home lab collection — see lib/config.ts `doctorLive`)
 * do NOT include a discharge/attender line, yet this page still offers
 * one. Either discharge/attender support becomes a real fifth service
 * line, or this page's copy needs a rewrite — that is a product decision,
 * not something to silently reconcile here.
 */
export default async function HospitalsPage(props: PageProps<"/[locale]/for-hospitals">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.hospitals;
  const isTamil = locale === "ta";

  return (
    <div className="page-section">
      <div className="container two-col">
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
          <p style={{ margin: "var(--space-md) 0 0", maxWidth: "52ch", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
            {t.intro}
          </p>
        </div>
        <div>
          <h2 style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
            {t.howHeading}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            {t.steps.map((step) => (
              <div key={step.title} style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{step.title}</div>
                <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{step.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-lg)", borderTop: "2px solid var(--color-border-strong)", paddingTop: "var(--space-md)" }}>
            <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.whatWeDontHeading}</div>
            <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.whatWeDontBody}</p>
          </div>
          <div
            style={{
              marginTop: "var(--space-lg)",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--color-action-primary)",
              color: "var(--color-action-primary-text)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--step-lead-en)",
              fontWeight: 600,
              padding: "0 var(--space-md)",
            }}
          >
            {t.cta}
          </div>
        </div>
      </div>
    </div>
  );
}
