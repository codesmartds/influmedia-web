import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { ContactSlide } from "@/components/contact/ContactSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Contacto | Influmedia",
};

export default async function ContactPage() {
  const payload = await getPayload({ config });
  const contact = await payload.findGlobal({ slug: "contact-info" });

  return (
    <PageTransition>
      <ContactSlide contact={contact} />
    </PageTransition>
  );
}
