import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;
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
          {t.origin.map((p, i) => (
            <p
              key={i}
              style={{
                margin: "var(--space-md) 0 0",
                maxWidth: "58ch",
                fontSize: i === 0 ? "var(--step-lead-en)" : "var(--step-body-en)",
                lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)",
              }}
            >
              {p}
            </p>
          ))}
        </div>
        <div style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-lg)" }}>
          <h2 style={{ margin: "0 0 var(--space-xs)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
            {t.whatWeWillNot.heading}
          </h2>
          <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
            {t.whatWeWillNot.intro}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            {t.whatWeWillNot.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start" }}>
                <div
                  style={{
                    flex: "none",
                    width: 22,
                    height: 22,
                    border: "1.5px solid var(--color-border-strong)",
                    borderRadius: "var(--radius-xs)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                  aria-hidden="true"
                >
                  ×
                </div>
                <div style={{ fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                  <strong style={{ fontWeight: 600 }}>{item.strong}</strong> {item.rest}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
