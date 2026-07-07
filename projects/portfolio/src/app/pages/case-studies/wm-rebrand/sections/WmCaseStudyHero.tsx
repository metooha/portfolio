import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import imgDesign from "@/app/assets/pages/case-study/wm-rebrand/design.png";
import imgRectangle1189 from "@/app/assets/pages/case-study/wm-rebrand/rectangle1189.png";

function Heading() {
  return <CaseStudyHero image={imgDesign} title="Waste Management" titleColor="#143526" />;
}

function WmOverviewLogo() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[48px] overflow-hidden">
      <img
        alt=""
        className="absolute h-[146.99%] left-[-176.91%] max-w-none top-[-18.98%] w-[316.82%] object-cover"
        src={imgRectangle1189}
      />
    </div>
  );
}

export { Heading as WmCaseStudyHero, WmOverviewLogo };
