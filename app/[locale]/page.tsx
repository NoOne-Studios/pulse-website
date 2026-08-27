import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive, foundersVisible } from "@/lib/config";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServiceRow } from "@/components/ServiceRow";
import { StepStrip } from "@/components/StepStrip";
import { ComparisonTable } from "@/components/ComparisonTable";
import { VerificationSteps } from "@/components/VerificationSteps";
import { Founders } from "@/components/Founders";
import { Reveal } from "@/components/Reveal";
import { notFound } from "next/navigation";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const home = dict.home;

  const hero = doctorLive ? home.hero.fourService : home.hero.threeService;
  const services = doctorLive
    ? home.services.four.map((item, i) => ({ ...item, brandPill: i === 0 }))
    : home.services.three;
  const servicesSub = doctorLive ? home.services.subFour : home.services.subThree;
  const step4 = doctorLive ? home.howItWorks.step4Four : home.howItWorks.step4Three;
  const comparisonSub = doctorLive ? home.comparison.subFour : home.comparison.subThree;
  const comparisonRows = home.comparison.rows.map((row) => ({
    label: doctorLive ? row.labelFour : row.labelThree,
    onYourOwn: row.onYourOwn,
    withPulse: row.withPulse,
    emphasize: row.emphasize,
  }));

  return (
    <div>
      <Hero locale={locale} dict={dict} lines={hero.lines} lead={hero.lead} />

      <Reveal>
        <TrustStrip items={home.trustStrip} />
      </Reveal>

      <Reveal>
        <ServiceRow heading={home.services.heading} sub={servicesSub} items={services} />
      </Reveal>

      <Reveal>
        <StepStrip
          heading={home.howItWorks.heading}
          swipeHint={home.howItWorks.swipeHint}
          steps={[...home.howItWorks.steps, step4]}
        />
      </Reveal>

      <Reveal>
        <ComparisonTable
          heading={home.comparison.heading}
          sub={comparisonSub}
          onYourOwnLabel={home.comparison.onYourOwn}
          withPulseLabel={home.comparison.withPulse}
          rows={comparisonRows}
          legend={home.comparison.legend}
        />
      </Reveal>

      <Reveal>
        <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)" }}>
          <div className="container">
            <VerificationSteps steps={dict.verification.steps} badge={dict.verification.badge} size="sm" />
          </div>
        </div>
      </Reveal>

      {foundersVisible ? (
        <Reveal>
          <Founders heading={home.founders.heading} people={home.founders.people} />
        </Reveal>
      ) : null}
    </div>
  );
}
