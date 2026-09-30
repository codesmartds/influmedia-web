import { CommonHeader } from "@/components/layout/CommonHeader";

// Layouts persist across navigations, so the header stays put while the
// page content below it runs its view transition.
export default function CommonHeaderLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col bg-base-100">
      <CommonHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
