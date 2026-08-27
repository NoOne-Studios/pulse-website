import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { VerificationSteps } from "@/components/VerificationSteps";

export default async function TechTrustPage(props: PageProps<"/[locale]/technology-and-trust">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.techTrust;
  const isTamil = locale === "ta";

  return (
    <div className="page-section">
      <div className="container">
        <h1
          style={{
            margin: 0,
            maxWidth: "24ch",
            fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
            lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
            fontWeight: 700,
            letterSpacing: isTamil ? undefined : "-0.01em",
          }}
        >
          {t.h1}
        </h1>
        <p style={{ margin: "var(--space-md) 0 var(--space-xl)", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
          {t.intro}
        </p>
        <div className="two-col">
          <div>
            <h2 style={{ margin: "0 0 var(--space-lg)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
              {dict.verification.heading}
            </h2>
            <VerificationSteps steps={dict.verification.steps} badge={dict.verification.badge} badgeNote={dict.verification.badgeNote} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 var(--space-lg)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
              {t.infoHeading}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "var(--space-md)" }}>
              {t.cards.map((card) => (
                <div key={card.label} style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: isTamil ? undefined : ".04em", textTransform: isTamil ? "none" : "uppercase", color: "var(--color-text-brand)" }}>
                    {card.label}
                  </div>
                  <p style={{ margin: "var(--space-2xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
