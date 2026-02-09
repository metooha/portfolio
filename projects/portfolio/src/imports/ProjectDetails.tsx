import svgPaths from "./svg-tto63vhnes";
import imgRectangle1189 from "figma:asset/e5eea785a9075e6a9a782597f2df6c7e9f7ba229.png";

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="arrow/left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="arrow/left">
          <path d={svgPaths.p36efd180} fill="var(--fill-0, #4E4F4E)" id="arrowLeft" />
        </g>
      </svg>
    </div>
  );
}

function TextLinkBack() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Text Link / Back">
      <ArrowLeft />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Back</p>
    </div>
  );
}

function SideNav() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="bg-[#207442] h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Overview</p>
    </div>
  );
}

function SideNav1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Problem Space</p>
    </div>
  );
}

function SideNav2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Our Goals</p>
    </div>
  );
}

function SideNav3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Approach</p>
    </div>
  );
}

function SideNav4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">System Audit</p>
    </div>
  );
}

function SideNav5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">
        {`Information `}
        <br aria-hidden="true" />
        Architecture
      </p>
    </div>
  );
}

function SideNav6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Compromises</p>
    </div>
  );
}

function SideNavigation() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Side Navigation">
      <SideNav />
      <SideNav1 />
      <SideNav2 />
      <SideNav3 />
      <SideNav4 />
      <SideNav5 />
      <SideNav6 />
    </div>
  );
}

function PageNavigation() {
  return (
    <div className="content-stretch flex flex-col gap-[58px] items-start pl-[68px] pr-[20px] relative shrink-0" data-name="page navigation">
      <TextLinkBack />
      <SideNavigation />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[49px] items-start leading-[normal] not-italic relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] text-black">Waste Management</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4e4f4e] text-[16px]">Design Systems, Branding</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <div className="relative rounded-[16px] shrink-0 size-[48px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[146.99%] left-[-176.91%] max-w-none top-[-18.98%] w-[316.82%]" src={imgRectangle1189} />
          </div>
        </div>
      </div>
      <Frame />
    </div>
  );
}

function PageTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-full" data-name="Page Title">
      <Frame1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[111px] min-w-full not-italic relative shrink-0 text-[84px] text-black w-[min-content] whitespace-pre-wrap">Designing a scalable system for a digital rebrand</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] max-w-[1200px] min-w-full not-italic relative shrink-0 text-[26px] text-black w-[min-content] whitespace-pre-wrap">In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation focused on improving customer self-service. I worked with the branding agency and led the systems work behind the rebrand, treating it as an opportunity to establish shared UX infrastructure rather than redesign individual pages.</p>
    </div>
  );
}

function ValueProp() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-[24px] h-full items-start min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap" data-name="Value Prop">
      <p className="leading-[normal] relative shrink-0 w-full">{`Role: Principal Product Designer `}</p>
      <p className="leading-[20px] relative shrink-0 w-full">
        {`Team: Partnered with product, engineering, `}
        <br aria-hidden="true" />
        and brand leadership
      </p>
    </div>
  );
}

function ValueProp1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-[24px] items-start min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap" data-name="Value Prop">
      <p className="leading-[normal] relative shrink-0 w-full">Scope: Company-wide rebrand across web platforms</p>
      <p className="leading-[20px] relative shrink-0 w-full">
        {`Focus: Platform UX patterns, information architecture, `}
        <br aria-hidden="true" />
        and shared systems
      </p>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[141px] items-center relative shrink-0 w-full" data-name="Row 1">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <ValueProp />
      </div>
      <ValueProp1 />
    </div>
  );
}

function Metrics() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="metrics">
      <Row />
    </div>
  );
}

function MetricsAndLinks() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Metrics and Links">
      <Metrics />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-start min-h-px min-w-[1046px] pt-[100px] relative" data-name="content">
      <PageTitle />
      <MetricsAndLinks />
    </div>
  );
}

export default function ProjectDetails() {
  return (
    <div className="content-stretch flex gap-[48px] items-start pr-[280px] relative size-full" data-name="project details">
      <PageNavigation />
      <Content />
    </div>
  );
}