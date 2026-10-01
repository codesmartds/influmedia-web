import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal } from "@/components/transitions/Reveal";
import { AnalysisSlide } from "./planning/AnalysisSlide";
import { PlanningSlide } from "./planning/PlanningSlide";
import { ProjectionSlide } from "./planning/ProjectionSlide";
import { CommandSlide } from "./onway/CommandSlide";
import { OnwaySlide } from "./onway/OnwaySlide";
import { PostbuySlide } from "./postbuy/PostbuySlide";
import { ReportsSlide } from "./postbuy/ReportsSlide";
import { ProcessTabs } from "./ProcessTabs";

// "Nuestro sistema": the three stages as tabs, each with its detail and
// live dashboards.
export function SystemSlide() {
  return (
    <div className="flex w-full flex-col">
      <Reveal className="flex flex-col px-6 md:px-[4.8%]">
        <SlideIntro
          eyebrow="Nuestro sistema"
          tone="primary"
          title="Una campaña, tres momentos."
          subtitle="Haz clic en cada etapa para navegar por el proceso."
        />
      </Reveal>
      <ProcessTabs
        panels={{
          planning: (
            <>
              <PlanningSlide />
              <AnalysisSlide />
              <ProjectionSlide />
            </>
          ),
          onway: (
            <>
              <OnwaySlide />
              <CommandSlide />
            </>
          ),
          postbuy: (
            <>
              <PostbuySlide />
              <ReportsSlide />
            </>
          ),
        }}
      />
    </div>
  );
}
