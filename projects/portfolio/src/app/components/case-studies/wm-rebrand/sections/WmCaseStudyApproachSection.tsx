import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/app/components/SectionHeading";
import { BulletList } from "@/app/components/BulletList";
import svgPaths from "../svg/svg-wznnermhqa";
import imgDesign from "@/app/assets/pages/case-study/wm-rebrand/design.png";
import imgImage4 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-7657089a.png";
import imgFrame1618872760 from "@/app/assets/pages/case-study/wm-rebrand/frame1618872760.png";
import imgImage44 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-e9a68d34.png";
import imgConfluenceSprint from "@/app/assets/pages/case-study/wm-rebrand/confluence-sprint-2-items.png";
import imgVisualGrid from "@/app/assets/pages/case-study/wm-rebrand/visual-grid.png";
import imgDesignToolKit from "@/app/assets/pages/case-study/wm-rebrand/design-tool-kit.png";
import imgScreencaptureWmUsEnBusinessBusinessWasteRecyclingPickup202108181424591 from "@/app/assets/pages/case-study/wm-rebrand/screencapture-wm-us-en-business-business-waste-recycling-pickup202108181424591.png";
import imgRecyclingTruck from "@/app/assets/pages/case-study/wm-rebrand/recycling-truck.png";
import imgJimFish from "@/app/assets/pages/case-study/wm-rebrand/jim-fish.png";
import imgRollOffDumpster from "@/app/assets/pages/case-study/wm-rebrand/roll-off-dumpster.png";
import imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041 from "@/app/assets/pages/case-study/wm-rebrand/screencapture-wm-us-en-inside-wm-sustainability-forum202110131155041.png";
import imgScreencaptureWmUsEn202108041502201 from "@/app/assets/pages/case-study/wm-rebrand/screencapture-wm-us-en202108041502201.png";
import imgNaming from "@/app/assets/pages/case-study/wm-rebrand/naming.png";
import img from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-80347242.png";
import imgSolutionCardBg from "@/app/assets/pages/case-study/wm-rebrand/solution-card-bg.png";
import imgJimFishCircle from "@/app/assets/pages/case-study/wm-rebrand/img190616-bh-wm-slt02-backdrop-james-fisher36081.png";
import imgCircleBorder from "figma:asset/18782c96349dcd46770f565e630c297434016fa9.svg";
import imgImage from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-001d291f.png";

function SectionHeadingFull7() {
  return <SectionHeading badge="1.0" badgeColor="yellow" title="Approach" />;
}

function ValueProp5() {
  return (
    <div className="flex flex-col gap-8 items-start pl-6 py-6 relative min-w-0 flex-1 max-w-[574px] w-full h-auto" data-name="Value Prop">
      <SectionHeading layout="vertical" titleSize="md" title="Internal Audit &amp; Alignment" />
      <BulletList
        items={[
          { text: "Ranked, story pointed, and aligned on level of effort for each component\n\nCreated a cataloging system to enable us to scale to new components" },
          { text: "Defined requirements and technical constraints and how our design system integrates with the AEM platform with eng team" },
          { text: "Organized sprint planning and outlined the design and development tasks\n\nCollaborated with the business, prioritized scope, and migration roadmap" },
        ]}
      />
    </div>
  );
}

function Frame87() {
  return (
    <div className="absolute inset-[0_3.95%_-135.71%_26.53%]">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFrame1618872760} />
      <div className="absolute inset-[3.21%_6.14%_85.21%_22.14%]" data-name="image 44">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage44} />
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[0_3.95%_-135.71%_26.53%]">
      <Frame87 />
    </div>
  );
}

function MaskGroup() {
  return (
    <img
      alt="Sprint 1-2 Items - WM.com Atlassian tracker view (AEM Components timeline and Sprint 1-2 Items)"
      className="absolute inset-0 w-full h-full object-contain object-center rounded-[8px] pointer-events-none"
      src={imgConfluenceSprint}
    />
  );
}

function Audit() {
  return (
    <div className="aspect-[613/502] flex-[1_0_0] min-h-px min-w-px overflow-clip relative" data-name="audit" style={{ color: 'rgba(248, 248, 248, 1)' }}>
      <Group20 />
      <MaskGroup />
    </div>
  );
}

function Iamge() {
  return (
    <div className="content-stretch flex min-w-0 w-full md:min-w-[280px] md:w-auto flex-1 max-w-full items-center pl-[16px] py-[16px] relative" data-name="iamge">
      <Audit />
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[#f8f8f8] content-start flex flex-wrap gap-[32px] items-start justify-start md:justify-end relative rounded-[16px] shrink-0 w-full" data-name="Row 2">
      <ValueProp5 />
      <Iamge />
    </div>
  );
}

function SectionHeadingVertical2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center not-italic relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black">3rd Party Engagement</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">{`Collaborating with an external branding agency proved to be a significant hurdle. We had to thoroughly educate the team on our product's unique requirements, and intricacies to ensure they could produce effective assets and deliverables.`}</p>
    </div>
  );
}

function Count4() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">1</p>
    </div>
  );
}

function BodyBulletPoint3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count4 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Created a site map to align on where brand could provide those moments of joy</p>
    </div>
  );
}

function Count5() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">2</p>
    </div>
  );
}

function BodyBulletPoint4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count5 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Focused on form and function, but there were times where we had compromised on brand experience</p>
    </div>
  );
}

function Count6() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">3</p>
    </div>
  );
}

function BodyBulletPoint5() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count6 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Our Digital Tool Kit was a partnership to ensure that we scaled and aligned with our product design principles</p>
    </div>
  );
}

function Points() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="points">
      <BodyBulletPoint3 />
      <BodyBulletPoint4 />
      <BodyBulletPoint5 />
    </div>
  );
}

function ValueProp6() {
  return (
    <div className="flex flex-col gap-[40px] items-start pl-[24px] py-[24px] relative min-w-0 flex-1 max-w-[574px] w-full h-auto" data-name="Value Prop">
      <SectionHeadingVertical2 />
      <Points />
    </div>
  );
}

function DesignToolKit() {
  return (
    <div className="aspect-[1071/606] flex-[1_0_0] min-h-px min-w-px overflow-clip relative" data-name="Design Tool kit">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDesignToolKit} />
    </div>
  );
}

function Image() {
  return (
    <div className="content-stretch flex min-w-0 w-full md:min-w-[280px] md:w-auto flex-1 max-w-full items-center pl-[16px] py-[16px] relative" data-name="image">
      <DesignToolKit />
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-[#f8f8f8] content-start flex flex-wrap gap-[32px] items-start relative rounded-[16px] shrink-0 w-full" data-name="Row 3">
      <ValueProp6 />
      <Image />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <SectionHeadingFull7 />
      <Row4 />
      <Row5 />
    </div>
  );
}

function Count7() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.1</p>
    </div>
  );
}

function CountTitle8() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count7 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">{`System Discovery & Audit`}</p>
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle8 />
    </div>
  );
}

function SectionHeadingFull8() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title8 />
    </div>
  );
}

function Count8() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function SectionHeadingVertical3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count8 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Audit and System Discovery</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">I conducted a system-level audit of existing pages, components, and patterns to identify redundancy, inconsistencies, and opportunities for consolidation. This work established a shared design vocabulary and informed which elements should become foundational system components.</p>
    </div>
  );
}

function ValueProp7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Value Prop">
      <SectionHeadingVertical3 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[376px] left-[-23px] top-0 w-[414px]" data-name="screencapture-wm-us-en-business-business-waste-recycling-pickup-2021-08-18-14_24_59 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[413.49%] left-0 max-w-none top-[-0.01%] w-full" src={imgScreencaptureWmUsEnBusinessBusinessWasteRecyclingPickup202108181424591} />
          </div>
        </div>
        <div className="absolute h-[26.747px] left-[239px] top-[196px] w-[80.497px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
        <div className="absolute h-[19px] left-[144px] top-[236px] w-[80px]">
          <div aria-hidden="true" className="absolute border-[#c324b8] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame89() {
  return (
    <div className="bg-[#1d8202] h-[40px] overflow-clip relative rounded-[4px] shrink-0 w-[205px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[16px] leading-[normal] left-[103px] not-italic text-[13px] text-center text-white top-[12px] w-[54px] whitespace-pre-wrap">Search</p>
    </div>
  );
}

function IconControls() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="icon/controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="icon/controls">
          <path clipRule="evenodd" d={svgPaths.p2bd8cb80} fill="var(--fill-0, #1D890A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">Learn More About National Accounts</p>
      <IconControls />
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center min-h-px min-w-px relative">
      <Image1 />
      <Frame89 />
      <Frame92 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white left-[189px] top-[201px] w-[44px]" data-name>
      <div className="content-stretch flex items-center justify-center overflow-clip px-px py-[4px] relative rounded-[inherit] w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1d8202] text-[4.758px] text-center">Sign Up Now</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#1d8202] border-[0.366px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame93() {
  return (
    <div className="absolute h-[320px] left-0 overflow-clip top-0 w-[387px]">
      <div className="absolute h-[312px] left-0 top-0 w-[357px]" data-name="screencapture-wm-us-en-inside-wm-sustainability-forum-2021-10-13-11_55_04 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[352.66%] left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041} />
        </div>
      </div>
      <Component />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame93 />
        <div className="absolute h-[23px] left-[183px] top-[197px] w-[58px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame91() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[103.5px] not-italic text-[#1d8202] text-[13px] text-center top-[12px]">Sign Up Now</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d8202] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center min-h-px min-w-px relative">
      <Image2 />
      <Frame91 />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[323px] left-0 top-0 w-[357px]" data-name="screencapture-wm-us-en-2021-08-04-15_02_20 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[241.2%] left-0 max-w-none top-0 w-[99.9%]" src={imgScreencaptureWmUsEn202108041502201} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[28px] left-[calc(50%-0.17px)] top-0 w-[387px]" data-name="screencapture-wm-us-en-inside-wm-sustainability-forum-2021-10-13-11_55_04 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[4257.14%] left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041} />
          </div>
        </div>
        <div className="absolute h-[20.124px] left-[66.74px] top-[109.28px] w-[66.741px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function IconControls1() {
  return (
    <div className="relative size-[13px]" data-name="icon/controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="icon/controls">
          <path clipRule="evenodd" d={svgPaths.p2bd8cb80} fill="var(--fill-0, #1D890A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">EXPLORE POPULAR SERVICES</p>
      <div className="flex items-center justify-center relative shrink-0 size-[13px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <IconControls1 />
        </div>
      </div>
    </div>
  );
}

function IconControls2() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="icon/controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="icon/controls">
          <path clipRule="evenodd" d={svgPaths.p2bd8cb80} fill="var(--fill-0, #1D890A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">More About Your Transition to WM</p>
      <IconControls2 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center min-h-px min-w-px relative">
      <Image3 />
      <Frame90 />
      <Frame95 />
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame111 />
      <Frame110 />
      <Frame109 />
    </div>
  );
}

function VisualGrid1() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full" data-name="Visual Grid">
      <div className="content-stretch flex flex-col items-start px-[30px] py-[56px] relative w-full">
        <Frame112 />
      </div>
    </div>
  );
}

function VisualGrid2() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full overflow-hidden" data-name="Visual Grid">
      <img
        alt="Button component with Primary Green and Primary Yellow paths to page templates: Business Waste & Recycling, Sustainability Forum, Modern Landfills"
        className="block w-full h-auto object-contain object-center"
        src={imgVisualGrid}
      />
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-end relative shrink-0 w-full" data-name="Row 2">
      <ValueProp7 />
      <VisualGrid1 />
      <VisualGrid2 />
    </div>
  );
}

function Count9() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function SectionHeadingVertical4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full max-w-[375px]" data-name="Section Heading / Vertical">
      <Count9 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-full min-w-0">{`Tokens & Foundations`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full min-w-0">
        {`Our branding foundations and hierarchy are built on a mix of primitive and semantic tokens. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        We have established a token taxonomy based on their semantic usage, which we continuously refine to broaden their applications, especially when dealing with other surfaces.
      </p>
    </div>
  );
}

function ValueProp8() {
  return (
    <div className="content-stretch flex min-w-[280px] flex-1 flex-col items-start pb-[24px] relative shrink" data-name="Value Prop">
      <SectionHeadingVertical4 />
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[11.755px] size-full" data-name>
      <div aria-hidden="true" className="absolute border-[2.204px] border-[rgba(0,0,0,0.12)] border-solid inset-[-2.204px] pointer-events-none rounded-[13.959000000000001px]" />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.063px] items-center px-[22.126px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Bogle:Bold',sans-serif] justify-center leading-[0] min-h-[55.31477737426758px] min-w-px not-italic relative text-[#222] text-[17.632px]">
            <p className="leading-[38.72px] whitespace-pre-wrap">Card title</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Content Container">
      <div className="content-stretch flex flex-col items-start p-[22.126px] size-full" />
    </div>
  );
}

function LdCard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[11.755px] shadow-[0px_-1.383px_2.766px_0px_rgba(0,0,0,0.1),0px_1.383px_2.766px_1.383px_rgba(0,0,0,0.15)] size-full" data-name="[LD] Card">
      <Header />
      <ContentContainer />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#cb2586] text-[16px] text-right">Text</p>
    </div>
  );
}

function CircleFill() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill />
    </div>
  );
}

function PointerLine() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[70.79px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-7.53%_-5.33px_-1.41%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.1231 10.6667">
                    <path d={svgPaths.p390ca680} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pointer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Pointer">
      <PointerStart />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="flex-none rotate-90 size-full">
            <PointerLine />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCallout() {
  return (
    <div className="absolute content-stretch flex inset-[24.48%_69.71%_69.27%_3.09%] items-center justify-center" data-name="🛠️ Spec Callout">
      <Content1 />
      <Pointer />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#cb2586] text-[16px] text-right">surface</p>
    </div>
  );
}

function CircleFill1() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill1 />
    </div>
  );
}

function PointerLine1() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[136.484px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-3.91%_-5.33px_-0.73%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142.817 10.6667">
                    <path d={svgPaths.p16be7b80} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pointer1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Pointer">
      <PointerStart1 />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="flex-none rotate-90 size-full">
            <PointerLine1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCallout1() {
  return (
    <div className="absolute content-stretch flex inset-[37.76%_53.63%_55.99%_3.09%] items-center justify-center" data-name="🛠️ Spec Callout">
      <Content2 />
      <Pointer1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#cb2586] text-[16px] text-right">background</p>
    </div>
  );
}

function CircleFill2() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill2 />
    </div>
  );
}

function PointerLine2() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[103.484px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-5.15%_-5.33px_-0.97%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.817 10.6667">
                    <path d={svgPaths.p24dce800} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pointer2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Pointer">
      <PointerStart2 />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="flex-none rotate-90 size-full">
            <PointerLine2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCallout2() {
  return (
    <div className="absolute content-stretch flex inset-[54.17%_53.63%_39.58%_3.09%] items-center justify-center" data-name="🛠️ Spec Callout">
      <Content3 />
      <Pointer2 />
    </div>
  );
}

function Tokens() {
  return (
    <div className="aspect-[647/384] flex-[1_0_0] min-h-px min-w-px relative" data-name="tokens">
      <div className="absolute flex inset-[14.17%_0.08%_4.07%_15.86%] items-center justify-center">
        <div className="-rotate-30 flex-none h-[334.801px] scale-y-87 skew-x-30 w-[206.805px]">
          <Component1 />
        </div>
      </div>
      <div className="absolute flex inset-[0_26.69%_53.57%_25.57%] items-center justify-center">
        <div className="-rotate-30 flex-none h-[133.2px] scale-y-87 skew-x-30 w-[174.384px]">
          <LdCard />
        </div>
      </div>
      <SpecCallout />
      <SpecCallout1 />
      <SpecCallout2 />
    </div>
  );
}

function Image7() {
  return (
    <div className="content-stretch flex min-w-0 max-w-[574px] flex-1 items-center pl-[16px] py-[16px] relative shrink" data-name="Image">
      <Tokens />
    </div>
  );
}

function Row7() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start justify-start relative min-w-0 w-full" data-name="Row 1">
      <ValueProp8 />
      <Image7 />
    </div>
  );
}

function SectionCardsVertical() {
  return (
    <div id="system-audit" className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards / Vertical">
      <SectionHeadingFull8 />
      <Row6 />
      <Row7 />
      <div className="aspect-[1180/347] relative rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="naming">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="" className="absolute h-[113.9%] left-0 max-w-none top-[-13.54%] w-full" src={imgNaming} />
        </div>
      </div>
    </div>
  );
}

function Count10() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.2</p>
    </div>
  );
}

function CountTitle9() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count10 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">Component Groups</p>
    </div>
  );
}

function Title9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-0 min-w-0 relative shrink-0" data-name="title">
      <CountTitle9 />
    </div>
  );
}

function SectionHeadingFull9() {
  return (
    <div className="content-start flex flex-col md:flex-row flex-wrap gap-6 items-start relative shrink-0 w-full min-w-0" data-name="Section Heading / Full">
      <Title9 />
      <p className="min-w-0 flex-1 font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Created with reuse in mind rather than customization, our components are organized to assist content designers. This structure helps users easily understand calls to action and how to interact with the pages.</p>
    </div>
  );
}

function Labels() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-start justify-between leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[17px] w-full" data-name="labels">
      <p className="relative shrink-0">{`Action & Conversion`}</p>
      <p className="relative shrink-0 text-right">{`Brand & Story Telling`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Global & Navigation`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Heroes & Headers`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Story Telling</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Informational</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Grids & Pathing`}</p>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-center flex flex-wrap gap-[35px] items-center relative shrink-0 w-full" data-name="row 2">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Library of Cards</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Action & Conversion`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Forms</p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Support</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Integrations</p>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-center flex flex-wrap gap-[35px] items-center relative shrink-0 w-full" data-name="row 1">
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function ComponentGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pb-[32px] relative shrink-0 w-full" data-name="component group">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-7.36px_-0.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1182 14.7279">
            <path d={svgPaths.p1c7c4b00} fill="var(--stroke-0, #006937)" id="Vector 12" />
          </svg>
        </div>
      </div>
      <Row8 />
      <Row9 />
    </div>
  );
}

function GroupTypes() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="group types">
      <SectionHeadingFull9 />
      <Labels />
      <ComponentGroup />
    </div>
  );
}

function Count11() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.3</p>
    </div>
  );
}

function CountTitle10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Count + Title">
      <Count11 />
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-h-px min-w-px not-italic relative text-[32px] text-black whitespace-pre-wrap">Redesigning the Card component</p>
    </div>
  );
}

function Title10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle10 />
    </div>
  );
}

function SectionHeadingFull10() {
  return (
    <div className="content-start flex flex-col md:flex-row flex-wrap gap-6 items-start relative shrink-0 w-full min-w-0" data-name="Section Heading / Full">
      <Title10 />
      <p className="min-w-0 flex-1 font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">We recognized that cards are essential, but there was a lack of consistent rules or patterns across various designs. We aimed to collaborate with the agency to clarify how cards should be used for the different paths a customer might take.</p>
    </div>
  );
}

function Count12() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function CountTitle11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Count + Title">
      <Count12 />
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-h-px min-w-px not-italic relative text-[20px] text-black whitespace-pre-wrap">Reskin existing card types</p>
    </div>
  );
}

function Title11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle11 />
    </div>
  );
}

function SectionHeadingFull11() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title11 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Most of our existing cards served a few basic purposes, information about services and products, downloadable information, and general information.</p>
    </div>
  );
}

function Image8() {
  return (
    <div className="bg-[#ccc] h-[130px] max-h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function TextLine() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text line">
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.664px] items-center justify-center px-[9px] py-[7px] relative shrink-0" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Read More</p>
      </div>
    </div>
  );
}

function HoverRevealCard({
  frontContent,
  backContent,
  dataName,
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  dataName: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="flex min-h-[400px] min-w-[200px] flex-1 basis-0 relative [perspective:1000px] self-stretch"
      data-name={dataName}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Front - wireframe (first image) */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="size-full">{frontContent}</div>
        </div>
        {/* Back - real design (second image) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] [transform-style:preserve-3d]">
          <div className="size-full">{backContent}</div>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeBasicContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full not-italic relative shrink-0 text-[16px] text-black w-[min-content] whitespace-pre-wrap">Basic Info</p>
        <Image8 />
        <TextLine />
        <Button />
      </div>
    </div>
  );
}

function ReskinCardTypeBasicBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="content-stretch flex flex-col size-full">
        <div className="relative h-[140px] min-h-[140px] w-full shrink-0 overflow-hidden bg-[#e5e7e5]">
          <img alt="Recycling" className="absolute inset-0 size-full object-cover object-center" src={imgRecyclingTruck} />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative flex-1 min-h-0">
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[18px] not-italic text-[#024731] text-[13px] tracking-[1.4px] uppercase">Recycling</p>
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full tracking-[-0.2px]">The Dangers of &quot;Wishcycling&quot;</p>
          <p className="font-['Maax:Regular',sans-serif] font-normal leading-[18px] not-italic text-[#4f4f59] text-[14px] line-clamp-2 w-full">By Susan Robinson, Director of P...</p>
          <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#024731] text-[14px] underline decoration-solid [text-decoration-skip-ink:none]">Learn More →</p>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeBasic() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeBasicContent />}
      backContent={<ReskinCardTypeBasicBack />}
      dataName="Reskin Card type / Basic"
    />
  );
}

function Image9() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="Text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[127.4px]" data-name="Text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="Text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="Text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="Text" />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#eba900] content-stretch flex min-w-0 h-[33.664px] flex-1 items-center justify-center px-[9px] py-[7px] relative" data-name="button 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Learn More</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#eba900] content-stretch flex min-w-0 h-[33.664px] flex-1 items-center justify-center px-[9px] py-[7px] relative" data-name="button 1">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">View Video</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex min-w-0 w-full gap-[10px] items-stretch relative" data-name="buttons">
      <Button2 />
      <Button1 />
    </div>
  );
}

function ReskinCardTypeProfileContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[226.82px] whitespace-pre-wrap">Profile</p>
        <Image9 />
        <Text />
        <Buttons />
      </div>
    </div>
  );
}

function ReskinCardTypeProfileBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="content-stretch flex flex-col size-full">
        <div className="relative h-[140px] min-h-[140px] w-full shrink-0 overflow-hidden bg-[#e5e5e5]">
          <img alt="James C. Fish Jr." className="absolute inset-0 size-full object-cover object-center" src={imgJimFish} />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative flex-1 min-h-0">
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full tracking-[-0.2px]">James C. Fish Jr.</p>
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[18px] not-italic text-[#024731] text-[13px] tracking-[1.4px] uppercase">President &amp; CEO</p>
          <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#4f4f59] text-[14px] w-full line-clamp-2">Talent comes to Waste Management from all areas and walks of life. It isn&apos;t too often, ho...</p>
          <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#024731] text-[14px] underline decoration-solid [text-decoration-skip-ink:none]">Read Now →</p>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeProfile() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeProfileContent />}
      backContent={<ReskinCardTypeProfileBack />}
      dataName="Reskin Card type / Profile"
    />
  );
}

function Image10() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[57.029px]" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-[176.272px]" data-name="text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[57.029px]" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-[176.272px]" data-name="text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[57.029px]" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-[176.272px]" data-name="text" />
    </div>
  );
}

function ReskinCardTypeProductContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[7px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-full whitespace-pre-wrap">Product Info</p>
        <Image10 />
        <Text1 />
      </div>
    </div>
  );
}

function ReskinCardTypeProductBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="content-stretch flex flex-col size-full">
        <div className="relative h-[140px] min-h-[140px] w-full shrink-0 overflow-hidden bg-white">
          <img alt="Roll-off dumpster" className="absolute inset-0 size-full object-cover object-center" src={imgRollOffDumpster} />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative flex-1 min-h-0">
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[18px] not-italic text-[#024731] text-[13px] tracking-[1.4px] uppercase">Service</p>
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full tracking-[-0.2px]">Home Waste &amp; Recycling</p>
          <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#4f4f59] text-[14px] w-full line-clamp-3">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
          <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#024731] text-[14px] underline decoration-solid [text-decoration-skip-ink:none]">Learn More →</p>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeProduct() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeProductContent />}
      backContent={<ReskinCardTypeProductBack />}
      dataName="Reskin Card type / Product"
    />
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[93.058px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.896px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[124.515px]" data-name="text" />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-[104.854px]" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-[86.505px]">
        <p className="leading-[20px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function ReskinCardTypeDownloadContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[229.369px] whitespace-pre-wrap">Download</p>
        <Text2 />
        <Button3 />
      </div>
    </div>
  );
}

function ReskinCardTypeDownloadBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <p className="font-['Maax:Bold',sans-serif] font-bold leading-[18px] not-italic text-[#024731] text-[13px] tracking-[1.4px] uppercase">Downloads</p>
        <p className="font-['Maax:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full tracking-[-0.2px]">Our Position on Plastic</p>
        <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#4f4f59] text-[14px] w-full flex-1 min-h-0">Learn how Waste Management is responding to recent shifts in the global plastics market.</p>
        <p className="font-['Maax:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#024731] text-[14px] underline decoration-solid [text-decoration-skip-ink:none] inline-flex items-center gap-[6px]">
          Download PDF
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
            <path d="M8 11V3M8 11L5 8M8 11L11 8M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </div>
  );
}

function ReskinCardTypeDownload() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeDownloadContent />}
      backContent={<ReskinCardTypeDownloadBack />}
      dataName="Reskin Card type / Download"
    />
  );
}

// Showcase variants for CardTypes1: flip direction so the “designed” Maax-based cards are on the front

function Frame114() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row flex-wrap gap-[16px] items-stretch">
      <ReskinCardTypeBasic />
      <ReskinCardTypeProfile />
      <ReskinCardTypeProduct />
      <ReskinCardTypeDownload />
    </div>
  );
}

function CardTypes() {
  return (
    <div className="bg-[#f8f8f8] relative min-h-[520px] rounded-[8px] shrink-0 w-full" data-name="Card types 2">
      <div className="flex min-h-[480px] w-full flex-row items-stretch">
        <div className="flex min-h-0 min-w-0 flex-1 w-full flex-col items-stretch overflow-visible p-[32px]">
          <Frame114 />
        </div>
      </div>
    </div>
  );
}

function SectionCards1() {
  return (
    <div className="content-stretch flex flex-col gap-[57px] items-start relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull11 />
      <CardTypes />
    </div>
  );
}

function Count13() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function CountTitle12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count13 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">New card types</p>
    </div>
  );
}

function Title12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle12 />
    </div>
  );
}

function SectionHeadingFull12() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title12 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">These cards are reusable, configurable components designed for consistency, scalability, and continuous optimization based on user needs and performance</p>
    </div>
  );
}

function Image11() {
  return (
    <div className="bg-[#ccc] h-[130px] max-h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.346px] shrink-0 w-[120px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.664px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-full" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Read More</p>
      </div>
    </div>
  );
}

function Image12() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.346px] shrink-0 w-[120px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.664px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-full" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Learn More</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#eba900] h-[13.06px] shrink-0 w-[79.951px]" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[124.515px]" data-name="text" />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-full" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Learn More</p>
      </div>
    </div>
  );
}

function Image13() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[93.058px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.896px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[124.515px]" data-name="text" />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-full" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function NewCardTypeSolutionContent() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 rounded-[8px] border-2 border-[#023625] border-solid overflow-hidden">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-4 size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic shrink-0 text-[16px] text-black w-full">Solution</p>
        <Image11 />
        <Text3 />
        <Button4 />
      </div>
    </div>
  );
}

function NewCardTypeServiceContent() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 rounded-[8px] overflow-hidden border-2 border-[#023625] border-solid">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-4 size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic shrink-0 text-[16px] text-black w-full">Service</p>
        <Image12 />
        <Text4 />
        <Button5 />
      </div>
    </div>
  );
}

function NewCardTypeFaqContent() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 rounded-[8px] overflow-hidden border-2 border-[#023625] border-solid">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-4 size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic shrink-0 text-[16px] text-black w-full">FAQ</p>
        <Text5 />
        <Button6 />
      </div>
    </div>
  );
}

function NewCardTypeContentCardContent() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 rounded-[8px] border-2 border-[#023625] border-solid overflow-hidden">
      <div className="content-stretch flex flex-col gap-4 items-start p-4 size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic shrink-0 text-[16px] text-black w-full">Content Card</p>
        <Image13 />
        <div className="flex-1 min-h-0 overflow-hidden w-full"><Text6 /></div>
        <Button7 />
      </div>
    </div>
  );
}

// ─── Arrow helper (shared by card backs) ─────────────────────────────────────

function CardArrowRight({ color = "#024731" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
      <path d="M6 12l4-4-4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Card 1 back: Recycling article with full-width header image ──────────────

function NewCardTypeSolutionBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 flex flex-col items-start relative rounded-[8px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      {/* Header image – 175px, cropped from center */}
      <div className="relative h-[175px] min-h-[175px] shrink-0 w-full overflow-hidden">
        <div className="-translate-x-1/2 absolute aspect-[267/175] bottom-0 left-[calc(50%+0.5px)] top-0 w-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="Recycling article" className="absolute h-[157.71%] left-[-48.22%] max-w-none top-[-45.77%] w-[155.81%]" src={imgSolutionCardBg} />
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="bg-[#024731] h-px shrink-0 w-full" />
      {/* Text */}
      <div className="flex flex-1 flex-col gap-[4px] items-start min-h-0 min-w-0 p-[16px] w-full">
        <p className="font-['Maax:Bold',sans-serif] font-bold leading-[20px] shrink-0 text-[#006937] text-[14px] tracking-[1.4px] uppercase">Recycling</p>
        <p className="font-['Maax:Bold',sans-serif] font-bold leading-[28px] shrink-0 text-[20px] text-black tracking-[-0.96px] w-full">The Dangers of &ldquo;Wishcycling&rdquo;</p>
        <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal leading-[18px] min-h-0 overflow-hidden text-[#4e4f4e] text-[14px] text-ellipsis w-full line-clamp-3">By Susan Robinson, Director of Public Affairs for Waste Management</p>
        <div className="flex gap-[4px] items-center shrink-0">
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[24px] text-[#006937] text-[16px] tracking-[-0.16px]">Learn More</p>
          <CardArrowRight color="#006937" />
        </div>
      </div>
    </div>
  );
}

// ─── Card 2 back: Profile – circular photo overlapping white card body ────────

function NewCardTypeServiceBack() {
  return (
    <div className="flex flex-col isolate items-center overflow-clip pb-[30px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full">
      {/* Circular photo – floats above the white body via negative margin */}
      <div className="mb-[-30px] overflow-clip relative rounded-full shrink-0 size-[150px] z-[2]">
        <div className="absolute inset-[2.5%]">
          <img alt="" className="absolute block max-w-none size-full" src={imgCircleBorder} />
        </div>
        <img alt="James C. Fish Jr." className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgJimFishCircle} />
      </div>
      {/* White body – pt-[64px] clears the circular image overlap */}
      <div className="bg-white flex flex-[1_0_0] flex-col items-start justify-between mb-[-30px] min-h-0 min-w-0 overflow-clip pb-[24px] pt-[64px] px-[16px] relative shadow-[-5px_4px_4px_0px_rgba(0,0,0,0.25)] w-full z-[1]">
        <div className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-0 min-w-0 w-full">
          <div className="flex flex-col font-['Maax:Bold',sans-serif] gap-[4px] items-start shrink-0 w-full">
            <p className="leading-[28px] text-[20px] text-black tracking-[-0.96px] w-full">James C. Fish Jr.</p>
            <p className="leading-[20px] text-[#024731] text-[14px] tracking-[1.4px] uppercase">President &amp; CEO</p>
          </div>
          <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-0 min-w-0 w-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] flex-1 min-h-0 overflow-hidden text-[#67696d] text-[14px] w-full line-clamp-4">Talent comes to Waste Management from all areas and walks of life. It isn&apos;t too often, however, that one of our great employees gets traded to us from the world of Major League Baseball.</p>
            <div className="flex gap-[4px] items-center shrink-0">
              <p className="font-['Maax:Bold',sans-serif] font-bold leading-[24px] text-[#024731] text-[16px] tracking-[-0.16px]">Read Now</p>
              <CardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card 3 back: Circular product icon + Home Waste service card ─────────────

function NewCardTypeFaqBack() {
  return (
    <div className="content-stretch flex flex-col isolate items-center overflow-clip pb-[30px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full">
      {/* Circular product image – cream circle background with centered trash can */}
      <div className="mb-[-30px] relative shrink-0 size-[150px] z-[2]">
        {/* Cream circle background */}
        <div className="absolute inset-[2.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155.8 155.8">
            <circle cx="77.9" cy="77.9" fill="#EFEFE4" r="77.9" />
          </svg>
        </div>
        {/* Trash-can centered inside circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img alt="" className="size-[69.79%] max-w-none" src={img} />
        </div>
      </div>
      {/* White body – mb-[-30px] matches the image pull, pt-[32px] clears the circle overlap */}
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start mb-[-30px] min-h-px min-w-px overflow-clip pb-[16px] pt-[32px] px-[16px] relative w-full z-[1]">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative w-full">
          {/* Title block */}
          <div className="content-stretch flex flex-col font-['Maax:Bold',sans-serif] gap-[4px] items-start not-italic relative shrink-0 w-full">
            <p className="leading-[20px] relative shrink-0 text-[#024731] text-[14px] tracking-[1.4px] uppercase">Service</p>
            <p className="leading-[28px] min-w-full relative shrink-0 text-[20px] text-black tracking-[-0.96px] w-[min-content] whitespace-pre-wrap">Home Waste &amp; Recycling</p>
          </div>
          {/* Body */}
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#67696d] text-[14px] text-ellipsis w-full whitespace-pre-wrap">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
          {/* Tag + CTA */}
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            {/* "Home" tag */}
            <div className="content-stretch flex items-start relative shrink-0 w-full">
              <div className="h-[24px] relative shrink-0 w-[54px]">
                <div className="absolute inset-0 overflow-clip">
                  <p className="absolute font-['Maax:Regular',sans-serif] leading-[16px] left-[13.11%] not-italic right-[14.75%] text-[#024731] text-[14px] top-[calc(50%-8px)]">Home</p>
                  <div className="absolute border border-[#7ab800] border-solid inset-0 rounded-[4px]" />
                </div>
              </div>
            </div>
            {/* CTA – right-aligned */}
            <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full">
              <p className="font-['Maax:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#024731] text-[16px] tracking-[-0.16px]">Learn More</p>
              <CardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card 4 back: Downloads – text only, no image ────────────────────────────

function NewCardTypeContentCardBack() {
  return (
    <div className="bg-white border border-[#f8f8f8] border-solid flex flex-col items-start p-[16px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="flex flex-col gap-[4px] items-start w-full">
        <p className="font-['Maax:Bold',sans-serif] font-bold leading-[20px] shrink-0 text-[#024731] text-[14px] tracking-[1.4px] uppercase">Downloads</p>
        <p className="font-['Maax:Bold',sans-serif] font-bold leading-[28px] shrink-0 text-[20px] text-black tracking-[-0.96px] w-full">Our Position on Plastic</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] shrink-0 text-[#67696d] text-[14px] w-full">Learn how Waste Management is responding to recent shifts in the global plastics market.</p>
        <div className="flex gap-[10px] items-center shrink-0 w-full mt-[4px]">
          <p className="font-['Maax:Bold',sans-serif] font-bold leading-[24px] text-[#024731] text-[16px]">Download PDF</p>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
            <path d="M8 11V3M8 11L5 8M8 11L11 8M3 13h10" stroke="#024731" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Flip wrappers: wireframe front → real designed card back ────────────────

function NewCardTypeSolutionFlip() {
  return (
    <HoverRevealCard
      frontContent={<NewCardTypeSolutionContent />}
      backContent={<NewCardTypeSolutionBack />}
      dataName="New Card type / Solution (flip)"
    />
  );
}

function NewCardTypeServiceFlip() {
  return (
    <HoverRevealCard
      frontContent={<NewCardTypeServiceContent />}
      backContent={<NewCardTypeServiceBack />}
      dataName="New Card type / Service (flip)"
    />
  );
}

function NewCardTypeFaqFlip() {
  return (
    <HoverRevealCard
      frontContent={<NewCardTypeFaqContent />}
      backContent={<NewCardTypeFaqBack />}
      dataName="New Card type / FAQ (flip)"
    />
  );
}

function NewCardTypeContentCardFlip() {
  return (
    <HoverRevealCard
      frontContent={<NewCardTypeContentCardContent />}
      backContent={<NewCardTypeContentCardBack />}
      dataName="New Card type / Content Card (flip)"
    />
  );
}

function Frame115() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row flex-wrap gap-[16px] items-stretch">
      <NewCardTypeSolutionFlip />
      <NewCardTypeServiceFlip />
      <NewCardTypeFaqFlip />
      <NewCardTypeContentCardFlip />
    </div>
  );
}

function CardTypes1() {
  return (
    <div className="bg-[#f8f8f8] relative min-h-[400px] rounded-[8px] shrink-0 w-full" data-name="Card types 3">
      <div className="flex min-h-[400px] w-full flex-row items-stretch">
        <div className="flex min-h-0 min-w-0 flex-1 w-full flex-col items-stretch overflow-visible p-[32px]">
          <Frame115 />
        </div>
      </div>
    </div>
  );
}

function SectionCards2() {
  return (
    <div className="content-stretch flex flex-col gap-[57px] items-start relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull12 />
      <CardTypes1 />
    </div>
  );
}

function ComponentGroups() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="component groups">
      <GroupTypes />
      <SectionHeadingFull10 />
      <SectionCards1 />
      <SectionCards2 />
    </div>
  );
}

function Count14() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function CountTitle13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count14 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Created for easy reuse and personalized customization</p>
    </div>
  );
}

function Title13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle13 />
    </div>
  );
}

function SectionHeadingFull13() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] h-[32px] items-start relative shrink-0 w-[563px]" data-name="Section Heading / Full">
      <Title13 />
    </div>
  );
}

function Tag1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Tag">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[16px] left-[13.11%] not-italic right-[16.51%] text-[#024731] text-[14px] top-[calc(50%-8px)]">Home</p>
      <div className="absolute border border-[#7ab800] border-solid inset-0 rounded-[4px]" data-name="Rectangle" />
    </div>
  );
}

function Tag() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[370px] w-[54px]" data-name="Tag">
      <Tag1 />
    </div>
  );
}

function Image14() {
  return (
    <div className="absolute h-[164px] left-[60px] right-[60px] top-0" data-name="image">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155.8 155.8">
          <circle cx="77.9" cy="77.9" fill="var(--fill-0, #EFEFE4)" id="container" r="77.9" />
        </svg>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <img alt="" className="size-[69.79%] max-w-none" src={img} />
      </div>
    </div>
  );
}

function ComponentsNewSp103ProductCarouselServiceCardTablet() {
  return (
    <div className="h-[470px] relative shrink-0 w-[284px]" data-name="components/new/sp1/03-product_carousel/service-card/tablet">
      <div className="absolute bottom-0 h-[388px] left-0 right-0" data-name="container">
        <div className="absolute inset-[-0.52%_-1.41%_-1.55%_-1.41%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292 396">
            <g filter="url(#filter0_dd_359_3834)" id="container">
              <path clipRule="evenodd" d="M288 2V390H4V2H288Z" fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="396" id="filter0_dd_359_3834" width="292" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_359_3834" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.3" />
                <feGaussianBlur stdDeviation="0.25" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_359_3834" mode="normal" result="effect2_dropShadow_359_3834" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_359_3834" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[52px] decoration-solid font-['Maax:Regular',sans-serif] leading-[20px] left-[8.45%] not-italic right-[62.68%] text-[#024731] text-[16px] tracking-[-0.16px] translate-y-full underline">Learn More</p>
      <Tag />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#4f4f59] text-[16px] top-[266px] w-[244px] whitespace-pre-wrap">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[28px] left-[24px] not-italic text-[24px] text-black top-[202px] tracking-[-0.96px] w-[244px] whitespace-pre-wrap">
        {`Home Waste & `}
        <br aria-hidden="true" />
        Recycling
      </p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[14px] left-[24px] not-italic text-[#024731] text-[14px] top-[180px] tracking-[1.4px] uppercase">Service</p>
      <Image14 />
    </div>
  );
}

function Specimen() {
  return (
    <div className="bg-[#024731] relative rounded-[12px] w-full max-w-[426px] lg:max-w-[500px] xl:max-w-[560px] 2xl:max-w-[640px] aspect-[300/390] mx-auto z-[1]" data-name="specimen">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[32px] relative size-full font-medium">
          <ComponentsNewSp103ProductCarouselServiceCardTablet />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#9747ff] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Props() {
  return (
    <div className="content-stretch flex flex-1 flex-col items-center justify-center min-h-[640px] min-w-0 max-w-[426px] lg:max-w-[500px] xl:max-w-[560px] 2xl:max-w-[640px] relative w-full pl-0" data-name="props">
      <Specimen />
    </div>
  );
}

function FigmaIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Figma Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Figma Icon">
          <path d={svgPaths.p3b53aa00} id="Instance" stroke="var(--stroke-0, #9747FF)" />
        </g>
      </svg>
    </div>
  );
}

function PropertyType() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip p-[2px] relative shrink-0" data-name="Property type">
      <FigmaIcon />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center max-w-[270px] py-[4px] relative rounded-[8px] shrink-0" data-name="content">
      <PropertyType />
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">[SP1] 03 - Product Card</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107aed80} fill="var(--fill-0, #2E2F32)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[282px]" data-name="component">
      <Content4 />
      <Icon />
    </div>
  );
}

function FigmaIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Figma Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Figma Icon">
          <g id="Vector">
            <path d={svgPaths.p378a5c30} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p813a300} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p18081380} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p24834200} fill="var(--fill-0, #9747FF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function More() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="More">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="More">
          <path clipRule="evenodd" d={svgPaths.p25159800} fill="var(--fill-0, #2E2F32)" fillRule="evenodd" id="32" />
        </g>
      </svg>
    </div>
  );
}

function RightControls() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0" data-name="right controls">
      <FigmaIcon1 />
      <More />
    </div>
  );
}

function ComponentName() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Component name">
      <Component2 />
      <RightControls />
    </div>
  );
}

function Description() {
  return (
    <div className="relative shrink-0 w-full" data-name="Description">
      <div className="content-stretch flex items-start pl-[32px] relative w-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#74767c] text-[16px] text-ellipsis whitespace-nowrap">Card component used in carousels or high value placement for products.</p>
      </div>
    </div>
  );
}

function NameDescription() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Name + Description">
      <ComponentName />
      <Description />
    </div>
  );
}

function PropertyName() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Eyebrow</p>
    </div>
  );
}

function Switch1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch1 />
    </div>
  );
}

function RightControl() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch />
    </div>
  );
}

function FigmaProperty() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName />
      <RightControl />
    </div>
  );
}

function Child() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Eyebrow</p>
    </div>
  );
}

function RightControl1() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#2e2f32] text-[16px] whitespace-pre-wrap">Service</p>
    </div>
  );
}

function FigmaProperty1() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName1 />
      <RightControl1 />
    </div>
  );
}

function PropertyName2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Title</p>
    </div>
  );
}

function RightControl2() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">
        {`Home Waste & `}
        <br aria-hidden="true" />
        Recycling
      </p>
    </div>
  );
}

function FigmaProperty2() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName2 />
      <RightControl2 />
    </div>
  );
}

function PropertyName3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Body</p>
    </div>
  );
}

function Switch3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch2() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch3 />
    </div>
  );
}

function RightControl3() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch2 />
    </div>
  );
}

function FigmaProperty3() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName3 />
      <RightControl3 />
    </div>
  );
}

function Child1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Description</p>
    </div>
  );
}

function RightControl4() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
    </div>
  );
}

function FigmaProperty4() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName4 />
      <RightControl4 />
    </div>
  );
}

function PropertyName5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Tags</p>
    </div>
  );
}

function Switch5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch4() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch5 />
    </div>
  );
}

function RightControl5() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch4 />
    </div>
  );
}

function FigmaProperty5() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName5 />
      <RightControl5 />
    </div>
  );
}

function Child2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Tag patterns</p>
    </div>
  );
}

function FigmaIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Figma Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Figma Icon">
          <path d={svgPaths.p3b53aa00} id="Instance" stroke="var(--stroke-0, #9747FF)" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip p-[2px] relative shrink-0" data-name="Icon">
      <FigmaIcon2 />
    </div>
  );
}

function LeftControls() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="left controls">
      <Icon1 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">2 Tags</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d={svgPaths.p3a65ce00} fill="var(--fill-0, #74767C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function RightControl6() {
  return (
    <div className="content-stretch flex items-center justify-between pl-[4px] pr-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[175px]" data-name="Right control">
      <div aria-hidden="true" className="absolute border border-[#f5f6fa] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <LeftControls />
      <Icon2 />
    </div>
  );
}

function FigmaProperty6() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName6 />
      <RightControl6 />
    </div>
  );
}

function PropertyName7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Link</p>
    </div>
  );
}

function Switch7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch6() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch7 />
    </div>
  );
}

function RightControl7() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch6 />
    </div>
  );
}

function FigmaProperty7() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName7 />
      <RightControl7 />
    </div>
  );
}

function Child3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Link</p>
    </div>
  );
}

function RightControl8() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#2e2f32] text-[16px] whitespace-pre-wrap">Learn More</p>
    </div>
  );
}

function FigmaProperty8() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName8 />
      <RightControl8 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d={svgPaths.p3a65ce00} fill="var(--fill-0, #74767C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InstanceName() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="instance name">
      <Icon3 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#74767c] text-[16px] text-ellipsis whitespace-nowrap">Tag Patterns</p>
    </div>
  );
}

function NestedComponent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px py-[8px] relative" data-name="Nested component">
      <InstanceName />
    </div>
  );
}

function FigmaProperty9() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <NestedComponent />
    </div>
  );
}

function Props2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="props">
      <FigmaProperty />
      <FigmaProperty1 />
      <FigmaProperty2 />
      <FigmaProperty3 />
      <FigmaProperty4 />
      <FigmaProperty5 />
      <FigmaProperty6 />
      <FigmaProperty7 />
      <FigmaProperty8 />
      <FigmaProperty9 />
    </div>
  );
}

function DesignPanelProperties() {
  return (
    <div className="relative w-full max-w-[426px] bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] rounded-[8px] shadow-[0px_12px_10px_0px_rgba(0,0,0,0.1),0px_5px_10px_3px_rgba(0,0,0,0.15)] lg:absolute lg:-left-10 lg:top-0 z-[2]" data-name="Design Panel: Properties">
      <NameDescription />
      <Props2 />
    </div>
  );
}

function PointerLine3() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="absolute h-0 left-0 right-0 top-0" data-name="line">
        <div className="absolute inset-[-1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 2">
            <path d="M0 1H76" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-0 flex items-center justify-center left-1/2 top-0 w-0">
        <div className="-scale-y-100 flex-none h-px rotate-90 w-[65px]">
          <div className="relative size-full" data-name="line">
            <div className="absolute inset-[-1px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                <path d="M0 1H65" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill3() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill3 />
    </div>
  );
}

function Pointer3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-full items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "307" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none size-full">
          <PointerLine3 />
        </div>
      </div>
      <PointerStart3 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Optional</p>
    </div>
  );
}

function SpecCallout3() {
  return (
    <div className="absolute content-stretch flex h-[76px] items-center left-full ml-[24px] top-[106px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer3 />
      <Content5 />
    </div>
  );
}

function PointerLine4() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="absolute h-0 left-0 right-0 top-0" data-name="line">
        <div className="absolute inset-[-1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 2">
            <path d="M0 1H76" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-0 flex items-center justify-center left-1/2 top-0 w-0">
        <div className="-scale-y-100 flex-none h-px rotate-90 w-[65px]">
          <div className="relative size-full" data-name="line">
            <div className="absolute inset-[-1px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                <path d="M0 1H65" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill4() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill4 />
    </div>
  );
}

function Pointer4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-full items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "307" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none size-full">
          <PointerLine4 />
        </div>
      </div>
      <PointerStart4 />
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Optional</p>
    </div>
  );
}

function SpecCallout4() {
  return (
    <div className="absolute content-stretch flex h-[76px] items-center left-full ml-[24px] top-[239px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer4 />
      <Content6 />
    </div>
  );
}

function PointerLine5() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[65px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-8.21%_-5.33px_-1.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.3333 10.6667">
                    <path d={svgPaths.p3965b040} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill5() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill5 />
    </div>
  );
}

function Pointer5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <PointerLine5 />
          </div>
        </div>
      </div>
      <PointerStart5 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Select from preferred list of patterns</p>
    </div>
  );
}

function SpecCallout5() {
  return (
    <div className="absolute content-stretch flex items-center left-full ml-[24px] top-[390px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer5 />
      <Content7 />
    </div>
  );
}

function PointerLine6() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[65px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-8.21%_-5.33px_-1.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.3333 10.6667">
                    <path d={svgPaths.p3965b040} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill6() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill6 />
    </div>
  );
}

function Pointer6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <PointerLine6 />
          </div>
        </div>
      </div>
      <PointerStart6 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Required for A11y</p>
    </div>
  );
}

function SpecCallout6() {
  return (
    <div className="absolute content-stretch flex items-center left-full ml-[24px] top-[192px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer6 />
      <Content8 />
    </div>
  );
}

function PointerLine7() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[65px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-8.21%_-5.33px_-1.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.3333 10.6667">
                    <path d={svgPaths.p3965b040} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill7() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill7 />
    </div>
  );
}

function Pointer7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <PointerLine7 />
          </div>
        </div>
      </div>
      <PointerStart7 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Nested Instance</p>
    </div>
  );
}

function SpecCallout7() {
  return (
    <div className="absolute content-stretch flex items-center left-full ml-[24px] top-[476px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer7 />
      <Content9 />
    </div>
  );
}

function Props1() {
  return (
    <div className="flex-1 relative w-fit min-h-[640px] max-w-[425px] overflow-visible pr-0" data-name="props">
      <DesignPanelProperties />
      <SpecCallout3 />
      <SpecCallout4 />
      <SpecCallout5 />
      <SpecCallout6 />
      <SpecCallout7 />
    </div>
  );
}

function ComponentProps() {
  return (
    <div className="flex flex-1 min-w-0 w-full flex-col gap-6 items-stretch lg:flex-row lg:gap-0 lg:items-start relative" data-name="Component props">
      <Props />
      <Props1 />
    </div>
  );
}

function ComponetProps() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="componet props">
      <SectionHeadingFull13 />
      <ComponentProps />
    </div>
  );
}

function SectionCards() {
  return (
    <div id="approach" className="content-stretch flex flex-col gap-[57px] items-start pt-[32px] relative shrink-0 w-full" data-name="Section Cards">
      <Frame94 />
      <SectionCardsVertical />
      <ComponentGroups />
      <ComponetProps />
    </div>
  );
}

export function WmCaseStudyApproachSection() {
  return <SectionCards />;
}
