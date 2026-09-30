import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { ClientsSlide } from "@/components/clients/ClientsSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Clientes | Influmedia",
};

export default async function ClientsPage() {
  const payload = await getPayload({ config });
  const brands = await payload.findGlobal({ slug: "brands", depth: 1 });

  return (
    <PageTransition>
      <ClientsSlide brands={brands.items ?? []} />
    </PageTransition>
  );
}
