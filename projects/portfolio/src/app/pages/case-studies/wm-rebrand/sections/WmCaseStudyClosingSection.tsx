import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/app/components/SectionHeading";
import imgImage1 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-2f6d2547.png";
import img from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-80347242.png";
import imgImage11 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-6d8490c5.png";
import imgImage from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-001d291f.png";
import imgImage16 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-ff1d90c4.png";
import imgImage17 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-5edaa9e9.png";
import imgImage18 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-2d9e1526.png";
import imgGrid4 from "@/app/assets/pages/case-study/wm-rebrand/grid4.png";
import imgImage111 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-f09a309a.png";

function CountTitle19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Designing for different surfaces</p>
    </div>
  );
}

function Title19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle19 />
    </div>
  );
}

function SectionHeadingFull19() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start pt-[40px] relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title19 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Although brand expression has shifted to focus on photography, the system rules remain unchanged to ensure that scaling does not affect performance.</p>
    </div>
  );
}

function Grid() {
  return (
    <div className="flex flex-1 min-w-0 relative" data-name="grid 1">
      <div className="w-full aspect-[2/3] relative rounded-[16px]" data-name="Image 4">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#e3f233] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[124.38%] left-[6.39%] max-w-none top-[4.1%] w-[88.21%]" src={imgImage16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Grid1() {
  return (
    <div className="flex flex-1 min-w-0 relative" data-name="grid 2">
      <div className="w-full aspect-[2/3] relative rounded-[16px]" data-name="Image 4">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#3c8a2e] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[127.57%] left-[4.84%] max-w-none top-[-29.37%] w-[90.47%]" src={imgImage17} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Grid2() {
  return (
    <div className="flex flex-1 min-w-0 relative" data-name="grid 3">
      <div className="w-full aspect-[2/3] relative rounded-[16px]" data-name="Image 4">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#1c4632] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[122.6%] left-[6.52%] max-w-none top-[3.49%] w-[86.95%]" src={imgImage18} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualGrid3() {
  return (
    <div className="flex gap-[16px] items-stretch relative shrink-0 w-full" data-name="Visual Grid">
      <Grid />
      <Grid1 />
      <Grid2 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <VisualGrid3 />
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full">
      <div className="aspect-[356/354] flex-[1_0_0] min-h-px min-w-px relative rounded-[18px]" data-name="grid 4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
          <img alt="" className="absolute h-[251.13%] left-[-194.39%] max-w-none top-[-29.1%] w-[524.46%]" src={imgGrid4} />
        </div>
      </div>
      <div className="aspect-[352/354] flex-[1_0_0] min-h-px min-w-px relative rounded-[18px]" data-name="grid 5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
          <img alt="" className="absolute h-[251.13%] left-[-305.69%] max-w-none top-[-29.1%] w-[530.42%]" src={imgGrid4} />
        </div>
      </div>
      <div className="aspect-[356/356] flex-[1_0_0] min-h-px min-w-px relative rounded-[18px]" data-name="grid 6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
          <img alt="" className="absolute h-[249.72%] left-[-194.39%] max-w-none top-[-133.43%] w-[524.46%]" src={imgGrid4} />
        </div>
      </div>
    </div>
  );
}

function Grid3() {
  return (
    <div className="bg-[#e3f233] h-[547px] overflow-clip relative shrink-0 w-full" data-name="grid 7">
      <div className="absolute h-[860px] left-[133px] top-[30px] w-[440px]" data-name="image 111">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.37%] left-[-27.28%] max-w-none top-[-3.37%] w-[424.33%]" src={imgImage111} />
        </div>
      </div>
      <div className="absolute h-[860px] left-[608px] top-[-384px] w-[440px]" data-name="image 112">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.37%] left-[-27.28%] max-w-none top-[-3.37%] w-[424.33%]" src={imgImage111} />
        </div>
      </div>
    </div>
  );
}

function VisualGrid4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Visual Grid">
      <Frame107 />
      <Grid3 />
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Section1 />
      <VisualGrid4 />
    </div>
  );
}

function SectionHeadingFull20() {
  return (
    <SectionHeading
      title="Reflections & Takeaways"
      description="Reflecting on this ambitious project with its tight deadlines, I realize it taught me the importance of being systematic. I learned how to implement strategies for quick scaling, but I also recognize that I could have improved by compromising more effectively and delegating tasks better throughout the process."
    />
  );
}

export function WmCaseStudyClosingSection() {
  return (
    <>
      <SectionHeadingFull19 />
      <Frame108 />
      <SectionHeadingFull20 />
    </>
  );
}
