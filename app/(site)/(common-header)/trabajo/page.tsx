import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { WorkSlide } from "@/components/work/WorkSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Trabajo en acción | Influmedia",
};

export default async function WorkPage() {
  const payload = await getPayload({ config });
  const gallery = await payload.findGlobal({ slug: "gallery", depth: 1 });

  return (
    <PageTransition>
      <WorkSlide items={gallery.items ?? []} />
    </PageTransition>
  );
}
