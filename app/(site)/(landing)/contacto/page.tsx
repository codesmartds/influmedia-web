import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { ContactSection } from "@/components/contact/ContactSection";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Contacto | Influmedia",
};

export default async function ContactPage() {
  const payload = await getPayload({ config });
  const contact = await payload.findGlobal({ slug: "contact-info" });

  return (
    <PageTransition>
      <ContactSection contact={contact} headingLevel="h1" />
    </PageTransition>
  );
}
