import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive } from "@/lib/config";
import { DeliveryModePill } from "@/components/DeliveryModePill";

/**
 * MKT-06 §5: doctors must not appear publicly until verified doctors exist
 * and legal review is complete. This route 404s while doctorLive is false
 * — not just unlinked — so it cannot be reached or indexed either.
 */
export default async function DoctorConsultationPage(props: PageProps<"/[locale]/doctor-consultation">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  if (!doctorLive) notFound();
  const dict = getDictionary(locale);
  const t = dict.doctor;
  const isTamil = locale === "ta";

  return (
    <div className="page-section">
      <div className="container">
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
        <p style={{ margin: "var(--space-xs) 0 var(--space-xl)", maxWidth: "70ch", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
          {t.lead}
        </p>

        <div className="sidebar-col">
          <div>
            <h2 style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
              {t.waysHeading}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "var(--space-md)", alignItems: "stretch" }}>
              {t.ways.map((way, i) => (
                <div key={way.title} style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                  <DeliveryModePill label={way.pill} brand={i === 0} />
                  <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{way.title}</div>
                  <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{way.body}</p>
                </div>
              ))}
            </div>

            <h2 style={{ margin: "var(--space-xl) 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
              {t.includesHeading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {t.includes.map((item) => (
                <div key={item.title} style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                  <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{item.title}</div>
                  <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-xl)", border: "2px solid var(--color-border-strong)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.serviceNotSymptom.title}</div>
              <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.serviceNotSymptom.body}</p>
            </div>

            <div style={{ marginTop: "var(--space-md)", borderTop: "2px solid var(--color-border-strong)", paddingTop: "var(--space-md)" }}>
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.notThis.title}</div>
              <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.notThis.body}</p>
            </div>
          </div>

          <div style={{ border: "1px solid var(--color-border-subtle)", background: "var(--color-surface-sunken)", borderRadius: "var(--radius-md)", padding: "var(--space-md)", alignSelf: "start" }}>
            <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{t.verifiedHeading}</div>
            <p style={{ margin: "var(--space-2xs) 0 var(--space-sm)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{t.verifiedBody}</p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-xs)",
                border: "1.5px solid var(--color-verified-border)",
                borderRadius: "var(--radius-xs)",
                padding: "var(--space-2xs) var(--space-xs)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: isTamil ? undefined : ".04em",
              }}
            >
              ✓ {dict.verification.badge}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
