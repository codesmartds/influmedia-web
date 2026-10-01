import { getPayload } from "payload";
import config from "@payload-config";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

// Landing layout: sticky header, page content, footer. Layouts persist
// across navigations, so header and footer stay put while pages transition.
export default async function LandingLayout({ children }: LayoutProps<"/">) {
  const payload = await getPayload({ config });
  const contact = await payload.findGlobal({ slug: "contact-info" });

  return (
    <div className="flex min-h-dvh flex-col bg-base-100">
      <SiteHeader />
      {/* overflow-x-clip: elements sliding in from the side start off-screen;
          clip (unlike hidden) keeps position: sticky working. */}
      <main className="flex flex-1 flex-col overflow-x-clip">{children}</main>
      <SiteFooter contact={contact} />
    </div>
  );
}
