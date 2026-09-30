import { SlideFooter } from "@/components/slides/SlideFooter";
import { SequenceNav } from "@/components/system/SequenceNav";
import { StageNav } from "@/components/system/StageNav";

// Layout for the stage pages under /sistema: the page content, then the
// stage navbar, footer and prev/next, which persist while pages transition.
// Pages don't know their neighbours; SequenceNav derives them from the URL.
export default function StageLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      <div className="px-6 pb-8 md:px-[4.7%] md:pb-[2%]">
        <StageNav />
        <SlideFooter label="Lead the conversation">
          <SequenceNav />
        </SlideFooter>
      </div>
    </div>
  );
}
