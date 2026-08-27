import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive } from "@/lib/config";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="page-section">
      <div className="container">
        <ContactForm locale={locale} dict={dict} doctorLive={doctorLive} />
      </div>
    </div>
  );
}
