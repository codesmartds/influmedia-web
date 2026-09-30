import { SlideFooter } from "@/components/slides/SlideFooter";
import { StageNav } from "@/components/system/StageNav";

// Layout for the stage pages under /sistema: the page content, then the
// stage navbar and footer, which persist while pages transition.
export default function StageLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      <div className="px-6 pb-8 md:px-[4.7%] md:pb-[2%]">
        <StageNav />
        <div className="md:-mt-[0.5%]">
          <SlideFooter label="Lead the conversation" />
        </div>
      </div>
    </div>
  );
}
