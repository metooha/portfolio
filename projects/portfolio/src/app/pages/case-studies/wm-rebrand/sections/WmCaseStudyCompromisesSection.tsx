import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/app/components/SectionHeading";
import svgPaths from "../svg/svg-wznnermhqa";
import imgImage1 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-2f6d2547.png";
import img from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-80347242.png";
import imgImage12 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-c7c28a59.png";
import imgDRecycling1011 from "@/app/assets/pages/case-study/wm-rebrand/drecycling1011.png";
import imgMedia from "@/app/assets/pages/case-study/wm-rebrand/media.png";
import img1 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-d95d6128.png";
import img2 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-e69489dc.png";
import img3 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-4a3fbfc0.png";
import img4 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-0975a4a7.png";
import img5 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-53d6618d.png";
import img6 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-0fa5d0d9.png";
import img7 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-6f7c0683.png";
import img8 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-7621bd34.png";
import img9 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-7168889a.png";
import img10 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-a5b8c90c.png";
import img11 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-9b7126f6.png";
import img12 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-43e55114.png";
import imgImage from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-001d291f.png";
import img13 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-3ebdf39c.png";
import imgImage1X1 from "@/app/assets/pages/case-study/wm-rebrand/image1-x1.png";
import imgImage1X2 from "@/app/assets/pages/case-study/wm-rebrand/image1-x2.png";
import img14 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-2fa2e71a.png";
import imgImage1X3 from "@/app/assets/pages/case-study/wm-rebrand/image1-x3.png";
import imgBgImage from "@/app/assets/pages/case-study/wm-rebrand/bg-image.png";
import imgImage13 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-afd15174.png";
import imgImage14 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-60517bb5.png";
import imgImage15 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-f2344db1.png";
import img15 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-50bb6448.png";

import { COMPARISON_FRAME_H, COMPARISON_CONTENT_H, COMPARISON_WIDTH, LEFT_PANEL_MAX_WIDTH, scrollbarHide } from "./shared/wmComparisonConstants";
import { useWmSyncedScroll } from "./shared/useWmSyncedScroll";

const RECYCLE_CONTENT_H = 3368;

function SectionHeadingFull17() {
  return <SectionHeading badge="3.0" badgeColor="yellow" title="Compromises along the way" />;
}

function SectionHeadingVertical7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[32px] text-black w-[min-content]">Interactive experiences</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content]">
        {`We design interactive brand experiences, but due to time and scope constraints, we had to compromise with a mix of old and new assets. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        For example, illustrations and infographics were not in the roadmap or scope.
      </p>
    </div>
  );
}

function ValueProp11() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Value Prop">
      <div className="content-stretch flex flex-col items-start px-[24px] py-[32px] relative size-full">
        <SectionHeadingVertical7 />
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ValueProp11 />
        </div>
      </div>
    </div>
  );
}

function ImageSlot2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Image slot">
      <div className="absolute inset-0 rounded-[16px]" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-white inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute inset-0 size-full object-contain object-center" src={imgImage12} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Interactive() {
  return (
    <div className="flex-[1_0_0] h-[616px] min-h-px min-w-px relative" data-name="interactive">
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <ImageSlot2 />
      </div>
    </div>
  );
}

function Row20() {
  return (
    <div className="bg-[#efefe4] content-stretch flex gap-[32px] h-[584px] items-start justify-end min-h-[400px] relative rounded-[16px] shrink-0 w-full" data-name="Row 1">
      <Frame81 />
      <Interactive />
    </div>
  );
}

function CountTitle18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Informational pages</p>
    </div>
  );
}

function Title18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle18 />
    </div>
  );
}

function SectionHeadingFull18() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start pt-[40px] relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title18 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Our recycling pages are highly branded and meant to be engaging and interactive but due to time and dev constraints we were left with a mix of old and new component and designs.</p>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex font-['Inter:Medium',sans-serif] font-medium items-start justify-between leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[17px] w-full">
      <p className="relative shrink-0">Proposed</p>
      <p className="relative shrink-0 text-right">Live site</p>
    </div>
  );
}

function RecycleRightRight({ scrollRef, onScroll }: { scrollRef?: React.RefObject<HTMLDivElement | null>; onScroll?: () => void } = {}) {
  return (
    <div
      ref={scrollRef}
      className={`absolute overflow-y-auto overflow-x-hidden right-0 top-0 w-[1184px] scroll-smooth ${scrollbarHide}`}
      style={{ height: COMPARISON_FRAME_H }}
      onScroll={onScroll}
      data-name="Recycle right right"
    >
      <div className="relative right-[-0.3px] top-0 w-[1184.352px]" style={{ height: RECYCLE_CONTENT_H }} data-name="D.Recycling 101 1">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover object-left-top pointer-events-none size-full"
          src={imgDRecycling1011}
        />
        <div className="absolute bg-[#f7f8f2] h-[58.335px] left-0 top-[3406.43px] w-[105.167px]" />
        <div className="absolute bg-[#f7f8f2] h-[14.789px] left-[1074.68px] top-[3407.26px] w-[108.454px]" />
        <div className="absolute bg-[#f7f8f2] h-[13.968px] left-[746.03px] mix-blend-multiply top-[3410.54px] w-[19.719px]" />
        <div className="absolute bg-[#f7f8f2] h-[14.789px] left-[416.56px] mix-blend-multiply top-[3409.72px] w-[19.719px]" />
        <div className="absolute bg-[#f7f8f2] h-[35.33px] left-[105.17px] mix-blend-multiply top-[3422.05px] w-[1077.965px]" />
      </div>
    </div>
  );
}

function Image17({ scrollRef, onScroll }: { scrollRef?: React.RefObject<HTMLDivElement | null>; onScroll?: () => void } = {}) {
  return (
    <div className="absolute left-px right-[-1px] top-0" style={{ height: COMPARISON_FRAME_H }} data-name="Image 2">
      <RecycleRightRight scrollRef={scrollRef} onScroll={onScroll} />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[39.438px] left-0 top-[174.18px] w-[241.556px]" data-name="button">
      <div className="absolute bg-[#e8f733] inset-0 rounded-[23.005px] shadow-[0px_0.657px_1.232px_0px_rgba(0,0,0,0.1),0px_4.93px_9.859px_0px_rgba(0,0,0,0.2)]" data-name="container" />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[86.86px] not-italic right-[86.69px] text-[#024731] text-[13.146px] text-center top-[calc(50%-6.29px)] tracking-[-0.1315px]">Learn More</p>
    </div>
  );
}

function Contents() {
  return (
    <div className="absolute inset-[7.24%_8.94%_33.94%_8.94%] overflow-clip" data-name="contents">
      <Button8 />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 not-italic text-[13.146px] text-white top-[36.15px] w-[241.556px] whitespace-pre-wrap">
        {`Reality: Containers should be clean, but don't have to be spotless. `}
        <br aria-hidden="true" />
        The goal is to make sure they are clean enough to avoid contaminating other materials, like paper, or your un-lined kitchen recycling bin.
      </p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 not-italic text-[26.292px] text-white top-0 tracking-[-1.0517px] w-[241.556px] whitespace-pre-wrap">False!</p>
    </div>
  );
}

function FlipCard2() {
  return (
    <div className="absolute h-[363.156px] left-[764.11px] top-[95.31px] w-[294.14px]" data-name="flip card 3">
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.45%_-1.12%_-1.36%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 369.729">
            <g filter="url(#filter0_dd_451_5768)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p1651e200} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369.729" id="filter0_dd_451_5768" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5768" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5768" mode="normal" result="effect2_dropShadow_451_5768" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5768" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card fill">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 294.14 363.156">
          <path clipRule="evenodd" d={svgPaths.p2779180} fill="var(--fill-0, #024731)" fillRule="evenodd" id="card fill" />
        </svg>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[51.1px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] not-italic right-[47.79px] text-[13.146px] text-white tracking-[-0.1315px] translate-x-full translate-y-full underline">Flip</p>
      <Contents />
    </div>
  );
}

function FlipCard1() {
  return (
    <div className="absolute h-[363.156px] left-[443.67px] top-[95.31px] w-[294.14px]" data-name="flip card 2">
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.45%_-1.12%_-1.36%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 369.729">
            <g filter="url(#filter0_dd_451_5768)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p1651e200} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369.729" id="filter0_dd_451_5768" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5768" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5768" mode="normal" result="effect2_dropShadow_451_5768" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5768" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[51.1px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] not-italic right-[47.79px] text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-x-full translate-y-full underline">Flip</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-[26.29px] not-italic text-[26.292px] text-black top-[26.29px] tracking-[-1.0517px] w-[241.556px] whitespace-pre-wrap">Are all types of glass bottles are recyclable?</p>
    </div>
  );
}

function FlipCard() {
  return (
    <div className="absolute h-[363.156px] left-[123.24px] top-[95.31px] w-[294.14px]" data-name="flip card 1">
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.45%_-1.12%_-1.36%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 369.729">
            <g filter="url(#filter0_dd_451_5768)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p1651e200} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369.729" id="filter0_dd_451_5768" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5768" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5768" mode="normal" result="effect2_dropShadow_451_5768" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5768" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[51.1px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] not-italic right-[47.79px] text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-x-full translate-y-full underline">Flip</p>
      <div className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-[26.29px] not-italic text-[26.292px] text-black top-[26.29px] tracking-[-1.0517px] w-[241.556px] whitespace-pre-wrap">
        <p className="mb-0">
          {`True or False? `}
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p>{`Even if I am not sure about an item, I can put it in my bin. `}</p>
      </div>
    </div>
  );
}

function FlipCards() {
  return (
    <div className="absolute h-[497.901px] left-0 top-[1268.58px] w-[1183.132px]" data-name="flip cards">
      <div className="absolute h-[497.901px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <div className="absolute bg-[#f8f8f2] bottom-[-0.1px] h-[207.048px] left-0 w-[1183.132px]" data-name="container short" />
      <FlipCard2 />
      <FlipCard1 />
      <FlipCard />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#024731] text-[32.865px] top-[32.86px] tracking-[-0.2465px] w-[615.393px] whitespace-pre-wrap">Recycling myths</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[39.438px] relative shrink-0 w-[106.811px]" data-name="button">
      <div className="absolute bg-[#1c8200] inset-0 rounded-[39.438px] shadow-[0px_0.657px_1.232px_0px_rgba(0,0,0,0.1),0px_4.93px_9.859px_0px_rgba(0,0,0,0.2)]" data-name="btn container" />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[32.86px] not-italic right-[32.95px] text-[13.146px] text-center text-white top-[calc(50%-6.29px)] tracking-[-0.1315px]">Button</p>
    </div>
  );
}

function TextHeadlineBodyButton() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[13.146px] items-start left-[690.76px] top-[52.58px] w-[312.215px]" data-name="TEXT/Headline+Body+Button">
      <div className="font-['Maax:Black',sans-serif] leading-[36.151px] min-w-full not-italic relative shrink-0 text-[#024731] text-[32.865px] tracking-[-0.2465px] w-[min-content] whitespace-pre-wrap">
        <p className="mb-0">{`Seasonal `}</p>
        <p>recycling tips</p>
      </div>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] min-w-full not-italic relative shrink-0 text-[#4f4f59] text-[13.146px] w-[min-content] whitespace-pre-wrap">{`The holidays can be a tough time for your trash bin. Check out our tips for what do do with seasonal items like wrapping paper, christmas trees and string lights.  `}</p>
      <Button9 />
    </div>
  );
}

function Multimedia2Copy() {
  return (
    <div className="absolute h-[427.242px] left-0 top-[1832.21px] w-[1183.132px]" data-name="multimedia 2 copy">
      <div className="absolute bottom-0 h-[446.961px] left-0 right-0" data-name="container" />
      <div className="absolute bg-white h-[341.794px] left-[283.46px] top-0 w-[776.43px]" data-name="container-content" />
      <TextHeadlineBodyButton />
      <div className="-translate-x-1/2 absolute bottom-0 h-[334.399px] left-[calc(50%-204.58px)] w-[527.48px]" data-name="media">
        <img alt="" className="block max-w-none size-full" height="334.399" src={imgMedia} width="527.48" />
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="absolute h-[19.719px] left-[123.24px] not-italic overflow-clip text-[13.146px] top-[14.79px] w-[244.021px]" data-name="contents">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[183.22px] text-[#024731] top-[3.29px] tracking-[-0.1315px]">Read Why</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] top-0">When in doubt, throw it out!</p>
    </div>
  );
}

function Cta() {
  return (
    <div className="absolute bottom-0 h-[49.297px] left-0 w-[1183.132px]" data-name="cta">
      <div className="absolute bg-[#f8f8f2] h-[49.297px] left-0 top-0 w-[1183.132px]" data-name="container" />
      <Contents1 />
    </div>
  );
}

function Graphic() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
    </div>
  );
}

function Material5() {
  return (
    <div className="absolute h-[160.216px] left-[917.75px] top-[147.89px] w-[133.924px]" data-name="material 6">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Polystyrene Foam and Plastic</p>
      <Graphic />
    </div>
  );
}

function Graphic1() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2} />
    </div>
  );
}

function Material4() {
  return (
    <div className="absolute h-[160.216px] left-[764.11px] top-[147.89px] w-[133.924px]" data-name="material 5">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Cups with Wax or Plastic Coatings</p>
      <Graphic1 />
    </div>
  );
}

function Graphic2() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3} />
    </div>
  );
}

function Material3() {
  return (
    <div className="absolute h-[160.216px] left-[603.89px] top-[147.89px] w-[133.924px]" data-name="material 4">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Flexible Packaging</p>
      <Graphic2 />
    </div>
  );
}

function Graphic3() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
    </div>
  );
}

function Material2() {
  return (
    <div className="absolute h-[160.216px] left-[443.67px] top-[147.89px] w-[133.924px]" data-name="material 3">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Plastic Wrap & Film`}</p>
      <Graphic3 />
    </div>
  );
}

function Graphic4() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
    </div>
  );
}

function Material1() {
  return (
    <div className="absolute h-[160.216px] left-[283.46px] top-[147.89px] w-[133.924px]" data-name="material 2">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Plastic Bags</p>
      <Graphic4 />
    </div>
  );
}

function Graphic5() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img6} />
    </div>
  );
}

function Material() {
  return (
    <div className="absolute h-[160.216px] left-[129.82px] top-[147.89px] w-[133.924px]" data-name="material 1">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Bagged Recyclables</p>
      <Graphic5 />
    </div>
  );
}

function Row21() {
  return (
    <div className="absolute contents left-[129.82px] top-[147.89px]" data-name="row 1">
      <Material5 />
      <Material4 />
      <Material3 />
      <Material2 />
      <Material1 />
      <Material />
    </div>
  );
}

function HeadlineBody() {
  return (
    <div className="absolute h-[62.443px] left-[123.24px] not-italic top-[65.73px] w-[589.101px] whitespace-pre-wrap" data-name="headline + body">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 right-0 text-[#4f4f59] text-[13.146px] top-[42.72px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est auctor donec et molestie mi.</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-0 right-0 text-[#024731] text-[32.865px] top-0 tracking-[-0.2465px]">Not accepted in your bin</p>
    </div>
  );
}

function No() {
  return (
    <div className="absolute left-[123.24px] size-[52.584px] top-0" data-name="no">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.5836 52.5836">
        <g id="no">
          <path clipRule="evenodd" d={svgPaths.pf9b5bc0} fill="var(--fill-0, #EA0018)" fillRule="evenodd" id="shape" />
          <g id="icon">
            <path d={svgPaths.p18803f00} fill="var(--fill-0, white)" id="icon color" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NotAccepted() {
  return (
    <div className="absolute h-[383.696px] left-0 top-[436.28px] w-[1183.132px]" data-name="not accepted">
      <Cta />
      <Row21 />
      <HeadlineBody />
      <No />
    </div>
  );
}

function Contents2() {
  return (
    <div className="absolute h-[19.719px] left-[123.24px] not-italic overflow-clip text-[13.146px] top-[14.79px] w-[244.021px]" data-name="contents">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[183.22px] text-[#024731] top-[3.29px] tracking-[-0.1315px]">Read Why</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] top-0">When in doubt, throw it out!</p>
    </div>
  );
}

function Cta1() {
  return (
    <div className="absolute bottom-[0.12px] h-[49.297px] left-0 w-[1183.132px]" data-name="cta">
      <div className="absolute bg-[#f8f8f2] h-[49.297px] left-0 top-0 w-[1183.132px]" data-name="container" />
      <Contents2 />
    </div>
  );
}

function Graphic6() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img7} />
    </div>
  );
}

function Material6() {
  return (
    <div className="absolute h-[160.216px] left-[787.93px] top-0 w-[133.924px]" data-name="material 6">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Glass Bottles & Containers`}</p>
      <Graphic6 />
    </div>
  );
}

function Graphic7() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8} />
    </div>
  );
}

function Material7() {
  return (
    <div className="absolute h-[160.216px] left-[634.29px] top-0 w-[133.924px]" data-name="material 5">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Food & Beverage Containers`}</p>
      <Graphic7 />
    </div>
  );
}

function Graphic8() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img9} />
    </div>
  );
}

function Material8() {
  return (
    <div className="absolute h-[160.216px] left-[474.07px] top-0 w-[133.924px]" data-name="material 4">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Flattened Cardboard & Paperboard`}</p>
      <Graphic8 />
    </div>
  );
}

function Graphic9() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img10} />
    </div>
  );
}

function Material9() {
  return (
    <div className="absolute h-[160.216px] left-[313.86px] top-0 w-[133.924px]" data-name="material 3">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Paper</p>
      <Graphic9 />
    </div>
  );
}

function Graphic10() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
    </div>
  );
}

function Material10() {
  return (
    <div className="absolute h-[160.216px] left-[153.64px] top-0 w-[133.924px]" data-name="material 2">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Food & Beverage Cans`}</p>
      <Graphic10 />
    </div>
  );
}

function Graphic11() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img12} />
    </div>
  );
}

function Material11() {
  return (
    <div className="absolute h-[160.216px] left-0 top-0 w-[133.924px]" data-name="material 1">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Plastic Bottles & Containers`}</p>
      <Graphic11 />
    </div>
  );
}

function Row22() {
  return (
    <div className="absolute h-[160.216px] left-[129.82px] overflow-clip top-[147.89px] w-[921.857px]" data-name="row 1">
      <Material6 />
      <Material7 />
      <Material8 />
      <Material9 />
      <Material10 />
      <Material11 />
    </div>
  );
}

function HeadlineBody1() {
  return (
    <div className="absolute h-[62.443px] left-[123.24px] not-italic top-[65.73px] w-[589.101px] whitespace-pre-wrap" data-name="headline + body">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 right-0 text-[#4f4f59] text-[13.146px] top-[42.72px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est auctor donec et molestie mi.</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-0 right-0 text-[#024731] text-[32.865px] top-0 tracking-[-0.2465px]">Accepted in your bin</p>
    </div>
  );
}

function ElementRecycleYes() {
  return (
    <div className="absolute left-[123.24px] size-[52.584px] top-0" data-name="element/recycle/yes">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.5836 52.5836">
        <g id="element/recycle/yes">
          <path d={svgPaths.p350e0e00} fill="var(--fill-0, #00A2FF)" id="shape" />
          <g id="icon">
            <path clipRule="evenodd" d={svgPaths.p9de5f00} fill="var(--fill-0, white)" fillRule="evenodd" id="icon color" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Accepted() {
  return (
    <div className="absolute h-[377.123px] left-0 top-[32.86px] w-[1183.132px]" data-name="accepted">
      <Cta1 />
      <Row22 />
      <HeadlineBody1 />
      <ElementRecycleYes />
    </div>
  );
}

function InteractiveAcceptedMaterials() {
  return (
    <div className="absolute h-[757.533px] left-0 top-[2436.92px] w-[1183.132px]" data-name="interactive accepted materials">
      <div className="absolute bg-white h-[993.338px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <NotAccepted />
      <Accepted />
    </div>
  );
}

function HeadlineBodyDesktop() {
  return (
    <div className="absolute h-[62.443px] left-[123.24px] not-italic top-[2374.48px] w-[615.393px] whitespace-pre-wrap" data-name="headline+body/desktop">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 right-0 text-[#4f4f59] text-[13.146px] top-[42.72px]">{`Stuff about seasonal items such as Christmas trees, wrapping paper, fall yard waste, etc. `}</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-0 right-0 text-[#024731] text-[32.865px] top-0 tracking-[-0.2465px]">What should I do with....</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[39.438px] left-[123.24px] top-[197.19px] w-[192.259px]" data-name="button">
      <div className="absolute bg-[#e8f733] inset-0 rounded-[39.438px] shadow-[0px_0.657px_1.232px_0px_rgba(0,0,0,0.1),0px_4.93px_9.859px_0px_rgba(0,0,0,0.2)]" data-name="btn container" />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[58.86px] not-italic right-[59.39px] text-[#024731] text-[13.146px] text-center top-[calc(50%-6.29px)] tracking-[-0.1315px]">See Toolkits</p>
    </div>
  );
}

function PromotionalModuleDarkGreen() {
  return (
    <div className="absolute h-[269.491px] left-0 top-[966.22px] w-[1183.132px]" data-name="promotional module - dark green">
      <div className="absolute h-[304.821px] right-[0.13px] top-[0.35px] w-[734.528px]" data-name="image">
        <img alt="" className="block max-w-none size-full" height="304.821" src={imgImage} width="734.528" />
      </div>
      <div className="absolute flex h-[305.642px] items-center justify-center left-0 top-0 w-[607.177px]">
        <div className="flex-none rotate-180">
          <div className="h-[305.642px] relative w-[607.177px]" data-name="split">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 607.177 305.642">
              <path clipRule="evenodd" d={svgPaths.p26f2de00} fill="var(--fill-0, #024731)" fillRule="evenodd" id="split" />
            </svg>
          </div>
        </div>
      </div>
      <Button10 />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#e8f733] text-[32.865px] top-[105.17px] tracking-[-0.2465px] w-[422.312px] whitespace-pre-wrap">Check out our toolkits.</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[32.865px] text-white top-[69.02px] tracking-[-0.2465px] w-[422.312px] whitespace-pre-wrap">Looking for our resources?</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="absolute left-[70.66px] size-[16.432px] top-0" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 16.4324">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p119a5500} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Cta2() {
  return (
    <div className="absolute inset-[88.62%_61.45%_7%_8.94%]" data-name="cta">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-0 not-italic text-[#024731] text-[13.146px] top-[2.46px] tracking-[-0.1315px]">Show More</p>
      <ArrowRight />
    </div>
  );
}

function Graphic12() {
  return (
    <div className="absolute inset-[6.57px_6.94px_6.94px_6.57px]" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img13} />
    </div>
  );
}

function ElementRulesRecyclingItemB() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%-0.07px)] size-[196.367px] top-[26.29px]" data-name="element/rules-recycling/item B">
      <div className="absolute flex inset-[-20.59%_-19.97%_-19.97%_-20.59%] items-center justify-center">
        <div className="flex-none rotate-112 size-[212.028px]">
          <div className="relative size-full" data-name="shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.028 212.028">
              <path clipRule="evenodd" d={svgPaths.p1382180} fill="var(--fill-0, #EA0018)" fillRule="evenodd" id="shape" />
            </svg>
          </div>
        </div>
      </div>
      <Graphic12 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute h-[375.48px] left-[764.11px] top-[95.31px] w-[294.14px]" data-name="card 3">
      <div className="absolute h-[375.48px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.44%_-1.12%_-1.31%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 382.053">
            <g filter="url(#filter0_dd_451_5660)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p13de680} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5660" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5660" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5660" mode="normal" result="effect2_dropShadow_451_5660" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5660" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Cta2 />
      <div className="absolute font-['Maax:Bold',sans-serif] leading-[21.362px] left-[26.29px] not-italic text-[19.719px] text-black top-[248.95px] tracking-[-0.7888px] w-[241.556px] whitespace-pre-wrap">
        <p className="mb-0">{`No loose plastic bags `}</p>
        <p className="mb-0">or bagged recyclables</p>
        <p>&nbsp;</p>
      </div>
      <ElementRulesRecyclingItemB />
      <div className="absolute h-[196.367px] left-[49.3px] right-[48.62px] top-[26.29px]" data-name="image 1x1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1X1} />
      </div>
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="absolute left-[70.66px] size-[16.432px] top-0" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 16.4324">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p119a5500} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Cta3() {
  return (
    <div className="absolute inset-[88.62%_61.45%_7%_8.94%]" data-name="cta">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-0 not-italic text-[#024731] text-[13.146px] top-[2.46px] tracking-[-0.1315px]">Show More</p>
      <ArrowRight1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute h-[375.48px] left-[124.06px] top-[95.31px] w-[294.14px]" data-name="card 2">
      <div className="absolute h-[375.48px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.44%_-1.12%_-1.31%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 382.053">
            <g filter="url(#filter0_dd_451_5660)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p13de680} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5660" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5660" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5660" mode="normal" result="effect2_dropShadow_451_5660" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5660" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Cta3 />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[21.362px] left-[26.29px] not-italic text-[19.719px] text-black top-[248.95px] tracking-[-0.7888px] w-[241.556px] whitespace-pre-wrap">Clean bottles, cans, paper, and cardboard are good to go!</p>
      <div className="absolute h-[196.367px] left-[49.3px] right-[48.62px] top-[26.29px]" data-name="image 1x1">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage1X2} />
      </div>
    </div>
  );
}

function ArrowRight2() {
  return (
    <div className="absolute left-[70.66px] size-[16.432px] top-0" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 16.4324">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p119a5500} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Cta4() {
  return (
    <div className="absolute inset-[88.62%_61.45%_7%_8.94%]" data-name="cta">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-0 not-italic text-[#024731] text-[13.146px] top-[2.46px] tracking-[-0.1315px]">Show More</p>
      <ArrowRight2 />
    </div>
  );
}

function Graphic13() {
  return (
    <div className="absolute inset-[6.57px_6.94px_6.94px_6.57px]" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img14} />
    </div>
  );
}

function ElementRulesRecyclingItemB1() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%-0.07px)] size-[196.367px] top-[26.29px]" data-name="element/rules-recycling/item B">
      <div className="absolute flex inset-[-20.59%_-19.97%_-19.97%_-20.59%] items-center justify-center">
        <div className="flex-none rotate-112 size-[212.028px]">
          <div className="relative size-full" data-name="shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.028 212.028">
              <path clipRule="evenodd" d={svgPaths.p1382180} fill="var(--fill-0, #EA0018)" fillRule="evenodd" id="shape" />
            </svg>
          </div>
        </div>
      </div>
      <Graphic13 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute h-[375.48px] left-[443.67px] top-[95.31px] w-[294.14px]" data-name="card 1">
      <div className="absolute h-[375.48px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.44%_-1.12%_-1.31%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 382.053">
            <g filter="url(#filter0_dd_451_5660)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p13de680} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5660" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5660" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5660" mode="normal" result="effect2_dropShadow_451_5660" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5660" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Cta4 />
      <div className="absolute font-['Maax:Bold',sans-serif] leading-[21.362px] left-[26.29px] not-italic text-[19.719px] text-black top-[248.95px] tracking-[-0.7888px] w-[241.556px] whitespace-pre-wrap">
        <p className="mb-0">{`No food or liquid waste. `}</p>
        <p>This contaminates the other recyclables.</p>
      </div>
      <ElementRulesRecyclingItemB1 />
      <div className="absolute h-[196.367px] left-[49.3px] right-[48.62px] top-[26.29px]" data-name="image 1x1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1X3} />
      </div>
    </div>
  );
}

function CardGrid() {
  return (
    <div className="absolute h-[516.799px] left-0 top-[449.43px] w-[1183.132px]" data-name="card grid">
      <div className="absolute bg-white h-[516.799px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <Card2 />
      <Card1 />
      <Card />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[124.06px] not-italic text-[#024731] text-[32.865px] top-[32.86px] tracking-[-0.2465px]">The Golden Rules of Recycling</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bottom-[75.37px] left-[123.24px] not-italic overflow-clip text-white top-[75.59px] w-[442.031px] whitespace-pre-wrap" data-name="text">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[21.362px] left-0 text-[14.789px] top-[59.16px] w-[442.031px]">Inspiring statement about why recycling right is important</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[52.584px] left-0 text-[49.297px] top-0 tracking-[-0.6847px] w-[442.031px]">Recycling 101</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute h-[295.783px] left-0 top-[101.06px] w-[1183.132px]" data-name="hero">
      <div className="absolute bg-[#024731] inset-0" data-name="container" />
      <div className="absolute h-[295.783px] right-[0.13px] top-0 w-[1183.132px]" data-name="bg image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBgImage} />
      </div>
      <div className="absolute bg-gradient-to-r from-black h-[295.783px] right-[0.13px] to-1/2 to-[rgba(0,0,0,0)] top-0 w-[1183.132px]" data-name="gradient" />
      <Text7 />
    </div>
  );
}

function UtilityBar1() {
  return (
    <div className="absolute inset-[0_17.22%_0_0] overflow-clip" data-name="utility bar">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 not-italic right-[87.34%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Support</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[17.41%] not-italic right-[53.13%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Drop Off Locations</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[51.59%] not-italic right-[31.61%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Pay My Bill</p>
      <div className="absolute inset-[0_0_0_70.7%]" data-name="container - notifications" />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[73.25%] not-italic right-[7.37%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Notifications</p>
      <div className="absolute inset-[29.17%_5.1%_56.25%_93.42%]" data-name="notification dot">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.75134 5.75134">
          <circle cx="2.87567" cy="2.87567" fill="var(--fill-0, #FF0000)" id="notification dot" r="2.87567" />
        </svg>
      </div>
    </div>
  );
}

function ArrowRight3() {
  return (
    <div className="absolute inset-[33.33%_2.99%_33.33%_94.2%]" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1459 13.1459">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p123c2100} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function NavigationUtilityGroup() {
  return (
    <div className="absolute h-[39.438px] right-[123.37px] top-0 w-[467.501px]" data-name="Navigation/UtilityGroup">
      <UtilityBar1 />
      <div className="absolute bg-[#efefe4] inset-[0_0_0_82.78%]" data-name="container - login" />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[85.59%] not-italic right-[6.5%] text-[#024731] text-[13.146px] top-[calc(50%-9.58px)] tracking-[-0.1315px]">Log In</p>
      <ArrowRight3 />
    </div>
  );
}

function UtilityBar() {
  return (
    <div className="absolute inset-[0_0_60.98%_0]" data-name="UtilityBar">
      <div className="absolute bg-[#f8f8f2] inset-0" data-name="Container" />
      <NavigationUtilityGroup />
    </div>
  );
}

function Search() {
  return (
    <div className="-translate-y-1/2 absolute right-[123.37px] size-[19.719px] top-[calc(50%+0.19px)]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7189 19.7189">
        <g id="Search">
          <path d={svgPaths.p6842700} fill="var(--fill-0, #024731)" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function MenuList() {
  return (
    <div className="-translate-y-1/2 absolute font-['Maax:Bold',sans-serif] h-[14.789px] leading-[13.146px] left-[439.57px] not-italic overflow-clip text-[#024731] text-[13.146px] text-center top-[calc(50%-0.63px)] tracking-[-0.1315px] w-[580.885px]" data-name="Menu List">
      <p className="absolute left-0 right-[89.84%] top-[calc(50%-6.15px)]">For Home</p>
      <p className="absolute left-[14.57%] right-[72.18%] top-[calc(50%-6.15px)]">For Business</p>
      <p className="absolute left-[32.39%] right-[53.32%] top-[calc(50%-6.15px)]">Sustainability</p>
      <p className="absolute left-[51.06%] right-[34.65%] top-[calc(50%-6.15px)]">Recycle Right</p>
      <p className="absolute left-[69.87%] right-[19.28%] top-[calc(50%-6.15px)]">Inside WM</p>
      <p className="absolute left-[85.29%] right-[0.08%] top-[calc(50%-6.15px)]">Phoenix Open</p>
    </div>
  );
}

function WmLogo() {
  return (
    <div className="absolute inset-[15.91%_0.12%_18.7%_0]" data-name="wm logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.5999 21.431">
        <g id="wm logo">
          <path clipRule="evenodd" d={svgPaths.p3137e80} fill="var(--fill-0, #006937)" fillRule="evenodd" id="w" />
          <path clipRule="evenodd" d={svgPaths.p2570a7c0} fill="var(--fill-0, #EBA900)" fillRule="evenodd" id="m" />
          <path clipRule="evenodd" d={svgPaths.p32c75f00} fill="var(--fill-0, #006937)" fillRule="evenodd" id="register mark" />
        </g>
      </svg>
    </div>
  );
}

function Logo1() {
  return (
    <div className="absolute h-[32.773px] left-[123.24px] top-[13.15px] w-[79.697px]" data-name="Logo">
      <WmLogo />
    </div>
  );
}

function MenuBar() {
  return (
    <div className="absolute inset-[39.02%_0_0_0]" data-name="Menu Bar">
      <div className="absolute bg-white inset-0 shadow-[0px_0.246px_0.411px_0px_rgba(0,0,0,0.1),0px_1.643px_3.286px_0px_rgba(0,0,0,0.2)]" data-name="container" />
      <Search />
      <MenuList />
      <Logo1 />
    </div>
  );
}

function TopNav() {
  return (
    <div className="absolute h-[101.059px] left-0 top-0 w-[1183.132px]" data-name="top nav">
      <UtilityBar />
      <MenuBar />
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex gap-[13.146px] h-[52.584px] items-center justify-center px-[13.146px] relative shrink-0" data-name="tab 1">
      <p className="font-['Maax:Bold',sans-serif] leading-[13.146px] not-italic relative shrink-0 text-[#024731] text-[13.146px] text-center tracking-[-0.1315px]">Recycling 101</p>
      <div className="-translate-x-1/2 absolute bg-[#70a116] bottom-0 h-[6.573px] left-[calc(50%-0.27px)] w-[37.794px]" data-name="active line" />
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[13.146px] relative shrink-0" data-name="tab 2">
      <div className="h-[52.584px] shrink-0 w-[0.822px]" data-name="container" />
      <p className="font-['Maax:Bold',sans-serif] leading-[13.146px] not-italic relative shrink-0 text-[#9b9b9b] text-[13.146px] text-center tracking-[-0.1315px]">Recycling Toolkits</p>
      <div className="absolute inset-[87.5%_29.09%_0_29.09%]" data-name="active line" />
    </div>
  );
}

function Tab2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[13.146px] relative shrink-0" data-name="tab 3">
      <div className="h-[52.584px] shrink-0 w-[0.822px]" data-name="container" />
      <p className="font-['Maax:Bold',sans-serif] leading-[13.146px] not-italic relative shrink-0 text-[#9b9b9b] text-[13.146px] text-center tracking-[-0.1315px]">Recycling Stories</p>
      <div className="absolute inset-[87.5%_29.09%_0_29.09%]" data-name="active line" />
    </div>
  );
}

function StickyNav() {
  return (
    <div className="absolute content-stretch flex items-center left-[121.6px] top-0" data-name="Sticky Nav">
      <Tab />
      <Tab1 />
      <Tab2 />
      <div className="absolute h-[52.584px] left-[90.38px] top-0 w-[0.822px]" data-name="line" />
    </div>
  );
}

function SubNav() {
  return (
    <div className="absolute h-[52.584px] left-0 top-[396.84px] w-[1183.132px]" data-name="sub nav">
      <div className="absolute inset-[-3.12%_-0.28%_-9.37%_-0.28%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1189.7 59.1566">
          <g filter="url(#filter0_dd_451_5728)" id="container shadow">
            <path clipRule="evenodd" d={svgPaths.pd84b500} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59.1566" id="filter0_dd_451_5728" width="1189.7" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.64324" />
              <feGaussianBlur stdDeviation="1.64324" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5728" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.246486" />
              <feGaussianBlur stdDeviation="0.205405" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5728" mode="normal" result="effect2_dropShadow_451_5728" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5728" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1183.13 52.5836">
        <path clipRule="evenodd" d="M0 0H1183.13V52.5836H0V0Z" fill="var(--fill-0, #F8F8F2)" fillRule="evenodd" id="container color" />
      </svg>
      <StickyNav />
    </div>
  );
}

function Links() {
  return (
    <div className="absolute inset-[36.36%_10.45%_32.95%_46.77%] overflow-clip" data-name="links">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 not-italic right-[90.32%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Sitemap</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[14.77%] not-italic right-[68.83%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Privacy Policy</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[36.2%] not-italic right-[48.39%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Terms of Use</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[85.19%] not-italic right-[0.19%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Accessibility</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[56.82%] not-italic right-[19.67%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Disputes/Arbitration</p>
      <div className="absolute flex inset-[14.81%_87.66%_25.93%_12.34%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[14.81%_45.94%_25.93%_54.06%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[14.81%_66.4%_25.93%_33.6%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[14.81%_17.05%_25.93%_82.95%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Subfooter() {
  return (
    <div className="absolute bottom-[-0.33px] h-[72.302px] left-0 overflow-clip right-[0.13px]" data-name="Subfooter">
      <div className="absolute bg-[#023625] inset-0" data-name="container-subfooter" />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[10.42%] not-italic right-[64.48%] text-[13.146px] text-white top-[calc(50%-10.01px)]">© 2021 WM Intellectual Property Holdings, L.L.C.</p>
      <Links />
    </div>
  );
}

function Fb() {
  return (
    <div className="absolute contents right-[281.13px] top-[447.78px]" data-name="FB">
      <div className="absolute right-[281.13px] size-[26.292px] top-[447.78px]" data-name="fb">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <div className="absolute h-[15.024px] right-[291.09px] top-[453.42px] w-[6.935px]" data-name="fb">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.93544 15.0239">
          <path d={svgPaths.p2897ca00} fill="var(--fill-0, white)" id="fb" />
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents right-[132.97px] top-[453.42px]" data-name="Group">
      <div className="absolute h-[4.342px] right-[132.97px] top-[454.94px] w-[2.268px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.26781 4.342">
          <path d={svgPaths.p14dd7980} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[4.395px] right-[135.91px] top-[454.9px] w-[2.309px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.30889 4.3948">
          <path clipRule="evenodd" d={svgPaths.p234d800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[5.8px] right-[138.18px] top-[453.42px] w-[3.004px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.00419 5.80009">
          <path d={svgPaths.p2c366e80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents right-[130.08px] top-[460.19px]" data-name="Group">
      <div className="absolute h-[8.253px] right-[130.08px] top-[460.19px] w-[13.017px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0172 8.25273">
          <path clipRule="evenodd" d={svgPaths.p817bf00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[0.889px] right-[132.05px] top-[463.61px] w-[0.669px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.668903 0.888939">
          <path d={svgPaths.pb1c3800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[2.888px] right-[134.85px] top-[463.6px] w-[0.634px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.633696 2.88763">
          <path d={svgPaths.p36f39340} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function YoutubeIcon() {
  return (
    <div className="absolute contents right-[130.08px] top-[453.42px]" data-name="youtube icon">
      <Group />
      <Group1 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents right-[123.37px] top-[447.78px]">
      <div className="absolute right-[123.37px] size-[26.292px] top-[447.78px]" data-name="youtube">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <YoutubeIcon />
    </div>
  );
}

function Tw() {
  return (
    <div className="absolute contents right-[241.69px] top-[447.78px]" data-name="TW">
      <div className="absolute right-[241.69px] size-[26.292px] top-[447.78px]" data-name="twitter">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <div className="absolute h-[11.268px] right-[247.54px] top-[455.29px] w-[13.871px]" data-name="twitter">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.871 11.2679">
          <path d={svgPaths.p323b700} fill="var(--fill-0, white)" id="twitter" />
        </svg>
      </div>
    </div>
  );
}

function IgIcon() {
  return (
    <div className="absolute contents right-[207.88px] top-[453.42px]" data-name="IG icon">
      <div className="absolute right-[207.88px] size-[15.024px] top-[453.42px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0239 15.0239">
          <path clipRule="evenodd" d={svgPaths.pd17f400} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute right-[211.53px] size-[7.716px] top-[457.07px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.71635 7.71635">
          <path clipRule="evenodd" d={svgPaths.paaaf680} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute right-[210.48px] size-[1.801px] top-[456.02px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.80134 1.80133">
          <path d={svgPaths.p327c9e00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents right-[202.25px] top-[447.78px]">
      <div className="absolute right-[202.25px] size-[26.292px] top-[447.78px]" data-name="IG">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <IgIcon />
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="absolute contents right-[162.81px] top-[447.78px]" data-name="LinkedIn">
      <div className="absolute right-[162.81px] size-[26.292px] top-[447.78px]" data-name="IG">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <div className="absolute h-[10.727px] right-[170.48px] top-[455.45px] w-[10.955px]" data-name="linkedin">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9549 10.7267">
          <path clipRule="evenodd" d={svgPaths.p4705870} fill="var(--fill-0, white)" fillRule="evenodd" id="linkedin" />
        </svg>
      </div>
    </div>
  );
}

function SocialMedia() {
  return (
    <div className="absolute contents right-[123.37px] top-[447.78px]" data-name="social media">
      <Fb />
      <Group16 />
      <Tw />
      <Group15 />
      <LinkedIn />
    </div>
  );
}

function ProductsServices() {
  return (
    <div className="absolute h-[327.004px] leading-[19.719px] left-[123.24px] not-italic overflow-clip text-white top-[110.92px] w-[184.043px]" data-name="Products & Services">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[22.3%] text-[16.432px] top-[calc(50%-163px)] tracking-[-0.6573px]">{`Products & Services`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[11.56%_0_76.21%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">{`Trash Collection & Recycling For Home`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[25.63%_0_62.14%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">{`Waste Disposal & Recycling for Business`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[39.7%_0_54.19%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Roll-Off Dumpster Rental</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[48.74%_0_45.14%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Bulk Trash Pickup</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[57.79%_0_36.09%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Construction Waste Disposal</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[66.83%_0_27.05%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Bagster - Dumpster in a Bag</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[75.88%_0_18%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">eWaste</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[84.92%_0_8.96%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">National Accounts</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[93.97%_0_-0.09%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Moving?</p>
    </div>
  );
}

function QuickInfo() {
  return (
    <div className="absolute h-[142.962px] leading-[19.719px] left-[545.56px] not-italic overflow-clip text-white top-[112.56px] w-[122.421px]" data-name="Quick Info">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[39.55%] text-[16.432px] top-[calc(50%-73.6px)] tracking-[-0.6573px]">Quick Info</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[31.38%] text-[13.146px] top-[calc(50%-37.45px)] tracking-[-0.1315px]">Recycling 101</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[11.78%] text-[13.146px] top-[calc(50%-7.88px)] tracking-[-0.1315px]">Our Service Areas</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[4.43%] text-[13.146px] top-[calc(50%+21.7px)] tracking-[-0.1315px]">Drop-Off Locations</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[-0.47%] text-[13.146px] top-[calc(50%+51.28px)] tracking-[-0.1315px]">Service Notifications</p>
    </div>
  );
}

function CustomerSupport() {
  return (
    <div className="absolute h-[264.561px] leading-[19.719px] left-[336.04px] not-italic overflow-clip text-white top-[110.92px] w-[180.756px]" data-name="Customer Support">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[26.97%] text-[16.432px] top-[calc(50%-132.56px)] tracking-[-0.6573px]">Customer Support</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[14.29%_0_78.15%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Pay My Bill</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[25.47%_0_66.97%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Manage My Account</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[36.65%_0_55.79%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Log in to My WM</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[47.83%_0_44.61%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Customer Support</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[59.01%_0_33.43%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Request an Extra Pickup</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[70.19%_0_22.25%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Missed Pickup</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[81.37%_0_11.07%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Frequently Asked Questions</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[92.55%_0_-0.11%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">WM.com Security</p>
    </div>
  );
}

function OurCompany() {
  return (
    <div className="absolute h-[202.118px] leading-[19.719px] left-[694.27px] not-italic overflow-clip text-white top-[112.56px] w-[140.497px]" data-name="Our Company">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[28.82%] text-[16.432px] top-[calc(50%-102.76px)] tracking-[-0.6573px]">Our Company</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[48.04%] text-[13.146px] top-[calc(50%-66.61px)] tracking-[-0.1315px]">Who We Are</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[58.01%] text-[13.146px] top-[calc(50%-37.03px)] tracking-[-0.1315px]">Why WM?</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[46.62%] text-[13.146px] top-[calc(50%-7.45px)] tracking-[-0.1315px]">Media Room</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[11.74%] text-[13.146px] top-[calc(50%+22.12px)] tracking-[-0.1315px]">{`Compliance & Ethics`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[20.99%] text-[13.146px] top-[calc(50%+51.7px)] tracking-[-0.1315px]">WM Phoenix Open</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[-1.07%] text-[13.146px] top-[calc(50%+81.28px)] tracking-[-0.1315px]">Sustainability Reporting</p>
    </div>
  );
}

function WorkWithUs() {
  return (
    <div className="absolute h-[141.319px] leading-[19.719px] left-[861.88px] not-italic overflow-clip text-white top-[112.56px] w-[157.751px]" data-name="Work With Us">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[39.14%] text-[16.432px] top-[calc(50%-71.96px)] tracking-[-0.6573px]">Work With Us</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[70.84%] text-[13.146px] top-[calc(50%-37.45px)] tracking-[-0.1315px]">Careers</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[66.4%] text-[13.146px] top-[calc(50%-7.88px)] tracking-[-0.1315px]">Investors</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[64.5%] text-[13.146px] top-[calc(50%+21.7px)] tracking-[-0.1315px]">Suppliers</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[-0.16%] text-[13.146px] top-[calc(50%+51.28px)] tracking-[-0.1315px]">{`Acquisitions & Divestitures`}</p>
    </div>
  );
}

function Logo2() {
  return (
    <div className="absolute h-[28.463px] left-[123.24px] top-[32.86px] w-[79.697px]" data-name="logo">
      <div className="absolute inset-[0_-0.06%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.7475 28.4632">
          <g id="logo">
            <path d={svgPaths.p309a5200} fill="var(--fill-0, white)" id="icon color" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="-translate-y-1/2 absolute h-[18.076px] left-[48.89px] top-[calc(50%+0.14px)] w-[16.432px]" data-name="dropdown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 18.0756">
        <g id="dropdown">
          <path clipRule="evenodd" d={svgPaths.p3bf01900} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function ElementLanguageSelectorClose() {
  return (
    <div className="absolute h-[19.719px] right-[115.16px] top-[37.79px] w-[65.73px]" data-name="element/language selector/close">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[19.719px] left-[-0.41px] not-italic text-[#4f4f59] text-[13.146px] top-[calc(50%-9.72px)]">English</p>
      <Dropdown />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-[-2598.59px] left-0 top-[4739.92px] w-[1183.132px]" data-name="footer">
      <div className="absolute bg-[#024731] inset-0" data-name="container" />
      <Subfooter />
      <SocialMedia />
      <ProductsServices />
      <QuickInfo />
      <CustomerSupport />
      <OurCompany />
      <WorkWithUs />
      <div className="absolute bg-white inset-[14.92%_10.21%_84.94%_10.63%]" data-name="Line" />
      <Logo2 />
      <ElementLanguageSelectorClose />
    </div>
  );
}

function Contents3() {
  return (
    <div className="absolute h-[111.74px] left-[320.43px] not-italic overflow-clip top-0 w-[535.696px] whitespace-pre-wrap" data-name="contents">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] text-[13.146px] top-[72.3px] w-[535.696px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio metus ipsum tellus ornare amet feugiat amet. Enim amet facilisi amet eget auctor.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 text-[26.292px] text-black top-0 tracking-[-1.0517px] w-[535.696px]">
        Article headline goes here lorem ipsum
        <br aria-hidden="true" />
        Second line headline goes here lorem ipsum
      </p>
    </div>
  );
}

function ArticleList3() {
  return (
    <div className="absolute h-[223.48px] left-[123.24px] top-[594.85px] w-[936.646px]" data-name="article list 3">
      <div className="absolute h-[196.367px] left-0 top-0 w-[936.646px]" data-name="container" />
      <div className="absolute bottom-[0.48px] h-[0.822px] left-0 w-[936.646px]" data-name="line" />
      <Contents3 />
      <div className="absolute h-[196.367px] left-0 top-0 w-[294.14px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
      </div>
    </div>
  );
}

function Contents4() {
  return (
    <div className="absolute h-[111.74px] left-[320.43px] not-italic overflow-clip top-0 w-[535.696px] whitespace-pre-wrap" data-name="contents">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] text-[13.146px] top-[72.3px] w-[535.696px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio metus ipsum tellus ornare amet feugiat amet. Enim amet facilisi amet eget auctor.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 text-[26.292px] text-black top-0 tracking-[-1.0517px] w-[535.696px]">
        Article headline goes here lorem ipsum
        <br aria-hidden="true" />
        Second line headline goes here lorem ipsum
      </p>
    </div>
  );
}

function ArticleList2() {
  return (
    <div className="absolute h-[223.48px] left-[123.24px] top-[345.08px] w-[936.646px]" data-name="article list 2">
      <div className="absolute h-[196.367px] left-0 top-0 w-[936.646px]" data-name="container" />
      <div className="absolute bg-[#d6d6d6] bottom-[0.48px] h-[0.822px] left-0 w-[936.646px]" data-name="line" />
      <Contents4 />
      <div className="absolute h-[196.367px] left-0 top-0 w-[294.14px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
    </div>
  );
}

function Contents5() {
  return (
    <div className="absolute h-[111.74px] left-[320.43px] not-italic overflow-clip top-0 w-[535.696px] whitespace-pre-wrap" data-name="contents">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] text-[13.146px] top-[72.3px] w-[535.696px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio metus ipsum tellus ornare amet feugiat amet. Enim amet facilisi amet eget auctor.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 text-[26.292px] text-black top-0 tracking-[-1.0517px] w-[535.696px]">
        Article headline goes here lorem ipsum
        <br aria-hidden="true" />
        Second line headline goes here lorem ipsum
      </p>
    </div>
  );
}

function ArticleList1() {
  return (
    <div className="absolute h-[223.48px] left-[123.24px] top-[95.31px] w-[936.646px]" data-name="article list 1">
      <div className="absolute h-[196.367px] left-0 top-0 w-[936.646px]" data-name="container" />
      <div className="absolute bg-[#d6d6d6] bottom-[0.48px] h-[0.822px] left-0 w-[936.646px]" data-name="line" />
      <Contents5 />
      <div className="absolute h-[196.367px] left-0 top-0 w-[294.14px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage15} />
      </div>
    </div>
  );
}

function ArticleList() {
  return (
    <div className="absolute h-[851.198px] left-0 top-0 w-[1183.132px]" data-name="article list">
      <div className="absolute bg-white h-[851.198px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <ArticleList3 />
      <ArticleList2 />
      <ArticleList1 />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#024731] text-[32.865px] top-[32.86px] tracking-[-0.2465px] w-[615.393px] whitespace-pre-wrap">More recycing stories</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute font-['Maax:Bold',sans-serif] h-[583.35px] leading-[normal] left-[201.3px] not-italic overflow-clip text-[65.73px] text-white top-[133.92px] tracking-[-0.6573px] w-[133.924px]" data-name="Group">
      <p className="absolute left-0 opacity-50 right-[-0.06%] top-[calc(50%-291.67px)]">FPO</p>
      <p className="absolute left-0 opacity-50 right-[-0.06%] top-[calc(50%-39.44px)]">FPO</p>
      <p className="absolute left-0 opacity-50 right-[-0.06%] top-[calc(50%+212.8px)]">FPO</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[120.01%_0_-51.38%_0] overflow-clip">
      <ArticleList />
      <Group3 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[26.29px] h-[6.573px] left-1/2 w-[46.011px]" data-name="pagination">
      <div className="absolute inset-[-25%_0_-25%_-3.57%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.6539 9.85943">
          <g id="pagination">
            <circle cx="44.3674" cy="4.92972" fill="var(--fill-0, #767676)" id="pagination dot 4" r="3.28648" />
            <circle cx="31.2215" cy="4.92972" fill="var(--fill-0, #767676)" id="pagination dot 3" r="3.28648" />
            <circle cx="18.0756" cy="4.92972" fill="var(--fill-0, #767676)" id="pagination dot 2" r="3.28648" />
            <circle cx="4.92972" cy="4.92972" id="pagination dot 1" r="4.1081" stroke="var(--stroke-0, #024731)" strokeWidth="1.64324" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame105() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.573px] items-start left-[26.29px] not-italic top-[147.89px] w-[242.378px] whitespace-pre-wrap">
      <p className="font-['Maax:Bold',sans-serif] leading-[11.503px] relative shrink-0 text-[#024731] text-[11.503px] tracking-[1.1503px] uppercase w-full">Service</p>
      <p className="font-['Maax:Bold',sans-serif] leading-[29.578px] relative shrink-0 text-[26.292px] text-black tracking-[-1.0517px] w-full">Electronics Recycling</p>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] relative shrink-0 text-[#4f4f59] text-[13.146px] w-full">Wondering what to do with old TVs, computers, printers, phones, or appliances? Waste Management will help you dispose of electronics safely and responsibly.</p>
    </div>
  );
}

function GraphicsCutoutElectronicRecycling() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.41px)] size-[134.746px] top-0" data-name="graphics/cutout/electronic_recycling">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.008 128.008">
          <circle cx="64.0041" cy="64.0041" fill="var(--fill-0, #EFEFE4)" id="container" r="64.0041" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img15} />
    </div>
  );
}

function ServiceCardCopy() {
  return (
    <div className="absolute h-[442.853px] left-[765.75px] top-[129.82px] w-[294.961px]" data-name="service card copy 6">
      <div className="absolute h-[375.48px] left-0 top-[67.37px] w-[294.961px]" data-name="container">
        <div className="absolute inset-[-0.44%_-1.11%_-1.31%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.534 382.053">
            <g filter="url(#filter0_dd_451_5736)" id="container">
              <path clipRule="evenodd" d={svgPaths.p4523d80} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5736" width="301.534" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5736" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5736" mode="normal" result="effect2_dropShadow_451_5736" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5736" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[42.72px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] left-[26.29px] not-italic text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-y-full underline">Learn More</p>
      <Frame105 />
      <GraphicsCutoutElectronicRecycling />
    </div>
  );
}

function Frame104() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.573px] items-start left-[26.29px] not-italic top-[147.89px] w-[242.378px] whitespace-pre-wrap">
      <p className="font-['Maax:Bold',sans-serif] leading-[11.503px] relative shrink-0 text-[#024731] text-[11.503px] tracking-[1.1503px] uppercase w-full">Service</p>
      <p className="font-['Maax:Bold',sans-serif] leading-[29.578px] relative shrink-0 text-[26.292px] text-black tracking-[-1.0517px] w-full">LampTracker® - Universal Waste Recycling by Mail</p>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] relative shrink-0 text-[#4f4f59] text-[13.146px] w-full">The WM LampTracker® program is a safe, cost-effective way to recycle universal waste, including items that contain mercury. The program includes prepaid postage and complete online documentation.</p>
    </div>
  );
}

function GraphicsCutoutLamptracker() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.41px)] size-[134.746px] top-0" data-name="graphics/cutout/lamptracker">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.008 128.008">
          <circle cx="64.0041" cy="64.0041" fill="var(--fill-0, #EFEFE4)" id="container" r="64.0041" />
        </svg>
      </div>
    </div>
  );
}

function ServiceCardCopy1() {
  return (
    <div className="absolute h-[442.853px] left-[444.5px] top-[129.82px] w-[294.961px]" data-name="service card copy 7">
      <div className="absolute h-[375.48px] left-0 top-[67.37px] w-[294.961px]" data-name="container">
        <div className="absolute inset-[-0.44%_-1.11%_-1.31%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.534 382.053">
            <g filter="url(#filter0_dd_451_5736)" id="container">
              <path clipRule="evenodd" d={svgPaths.p4523d80} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5736" width="301.534" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5736" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5736" mode="normal" result="effect2_dropShadow_451_5736" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5736" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[42.72px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] left-[26.29px] not-italic text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-y-full underline">Learn More</p>
      <Frame104 />
      <GraphicsCutoutLamptracker />
    </div>
  );
}

function Frame106() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.573px] items-start left-[26.29px] not-italic top-[147.89px] w-[242.378px] whitespace-pre-wrap">
      <p className="font-['Maax:Bold',sans-serif] leading-[11.503px] relative shrink-0 text-[#024731] text-[11.503px] tracking-[1.1503px] uppercase w-full">Service</p>
      <p className="font-['Maax:Bold',sans-serif] leading-[29.578px] relative shrink-0 text-[26.292px] text-black tracking-[-1.0517px] w-full">{`Home Waste & Recycling`}</p>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] relative shrink-0 text-[#4f4f59] text-[13.146px] w-full">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
    </div>
  );
}

function Cutout() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.41px)] size-[134.746px] top-0" data-name="cutout">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.008 128.008">
          <circle cx="64.0041" cy="64.0041" fill="var(--fill-0, #EFEFE4)" id="container" r="64.0041" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
    </div>
  );
}

function ProductCard() {
  return (
    <div className="absolute h-[442.853px] left-[123.24px] top-[129.82px] w-[294.961px]" data-name="product card">
      <div className="absolute bottom-0 h-[375.48px] left-0 w-[294.961px]" data-name="container">
        <div className="absolute inset-[-0.44%_-1.11%_-1.31%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.534 382.053">
            <g filter="url(#filter0_dd_451_5736)" id="container">
              <path clipRule="evenodd" d={svgPaths.p4523d80} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5736" width="301.534" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5736" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5736" mode="normal" result="effect2_dropShadow_451_5736" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5736" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[42.72px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] left-[26.29px] not-italic text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-y-full underline">Learn More</p>
      <Frame106 />
      <Cutout />
    </div>
  );
}

function ArrowButton() {
  return (
    <div className="-translate-y-1/2 absolute left-[57.51px] size-[39.438px] top-[calc(50%+16.02px)]" data-name="arrow button">
      <div className="absolute inset-[-12.5%_-25%_-37.5%_-25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.1566 59.1566">
          <g id="arrow button">
            <g filter="url(#filter0_dd_451_5502)" id="container">
              <circle cx="29.5783" cy="24.6486" fill="var(--fill-0, #1C8200)" r="19.7189" />
            </g>
            <g id="arrow - right">
              <path clipRule="evenodd" d={svgPaths.p38295900} fill="var(--fill-0, white)" fillRule="evenodd" id="icon color" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59.1566" id="filter0_dd_451_5502" width="59.1566" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.92972" />
              <feGaussianBlur stdDeviation="4.92972" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5502" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.657295" />
              <feGaussianBlur stdDeviation="0.616214" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5502" mode="normal" result="effect2_dropShadow_451_5502" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5502" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ArrowButton1() {
  return (
    <div className="-translate-y-1/2 absolute right-[59.98px] size-[40.259px] top-[calc(50%+16.43px)]" data-name="arrow button">
      <div className="absolute inset-[-12.24%_-24.49%_-36.73%_-24.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.9782 59.9782">
          <g id="arrow button">
            <g filter="url(#filter0_dd_451_5522)" id="container">
              <circle cx="29.9891" cy="25.0594" fill="var(--fill-0, #1C8200)" r="20.1297" />
            </g>
            <g id="arrow - right">
              <path clipRule="evenodd" d={svgPaths.p3326d940} fill="var(--fill-0, white)" fillRule="evenodd" id="icon color" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59.9782" id="filter0_dd_451_5522" width="59.9782" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.92972" />
              <feGaussianBlur stdDeviation="4.92972" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5522" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.657295" />
              <feGaussianBlur stdDeviation="0.616214" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5522" mode="normal" result="effect2_dropShadow_451_5522" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5522" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ProductCarousel() {
  return (
    <div className="absolute h-[631.825px] left-[0.82px] top-[4108.1px] w-[1183.132px]" data-name="product carousel">
      <div className="absolute bg-white h-[631.825px] left-0 top-0 w-[1183.132px]" data-name="container" />
      <div className="absolute bg-[#f8f8f2] bottom-0 h-[299.891px] left-0 w-[1183.132px]" data-name="container - half" />
      <Pagination />
      <ServiceCardCopy />
      <ServiceCardCopy1 />
      <ProductCard />
      <ArrowButton />
      <ArrowButton1 />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[21.362px] left-[123.24px] not-italic text-[14.789px] text-white top-[82.16px] w-[455.177px] whitespace-pre-wrap">Body</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#024731] text-[32.865px] top-[39.44px] tracking-[-0.2465px] w-[775.609px] whitespace-pre-wrap">Explore our recycling services</p>
    </div>
  );
}

function Image18() {
  return (
    <div className="bg-white relative overflow-clip" style={{ height: RECYCLE_CONTENT_H, minWidth: COMPARISON_WIDTH }} data-name="Image 1">
      <div className="absolute bg-[#f8f8f2] h-[558.701px] left-0 top-[1766.48px] w-[1183.132px]" data-name="Rectangle" />
      <FlipCards />
      <Multimedia2Copy />
      <InteractiveAcceptedMaterials />
      <HeadlineBodyDesktop />
      <PromotionalModuleDarkGreen />
      <CardGrid />
      <Hero />
      <TopNav />
      <SubNav />
      <Footer />
      <Group2 />
      <ProductCarousel />
    </div>
  );
}

function Frame98() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.176px] left-[calc(50%+0.35px)] top-[calc(50%-0.41px)] w-[36.706px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.7059 27.1765">
        <g id="Frame 1618872789">
          <path clipRule="evenodd" d={svgPaths.p10075300} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall" />
          <path clipRule="evenodd" d={svgPaths.pb462e00} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall_2" />
        </g>
      </svg>
    </div>
  );
}

function CircleCaretLeft1({ onDrag, splitX }: { onDrag: (deltaX: number) => void; splitX: number }) {
  const dragStart = useRef<{ x: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current == null) return;
    const deltaX = e.clientX - dragStart.current.x;
    dragStart.current = { x: e.clientX };
    onDrag(deltaX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragStart.current = null;
  };

  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-[rgba(25,25,25,0.4)] rounded-[1000px] size-[80px] cursor-grab active:cursor-grabbing touch-none select-none border-0 p-0 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(25,25,25,0.4)]"
      style={{ left: splitX + 1 }}
      data-name="circleCaret/left"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onDrag(150);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          onDrag(-150);
        }
      }}
      aria-label="Drag to resize left panel"
    >
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-[-0.5px] pointer-events-none rounded-[1000.5px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <Frame98 />
      <div className="absolute border border-[#e8e8e8] border-solid inset-0 rounded-[100px] pointer-events-none" data-name="border" />
    </button>
  );
}

function RightImage1({
  leftPanelWidth,
  onDrag,
  leftScrollRef,
  onLeftScroll,
}: {
  leftPanelWidth: number;
  onDrag: (deltaX: number) => void;
  leftScrollRef: React.RefObject<HTMLDivElement | null>;
  onLeftScroll: () => void;
}) {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0" style={{ height: COMPARISON_FRAME_H }} data-name="Right Image">
      <div className="h-full overflow-hidden shrink-0 transition-[width] duration-75" style={{ width: leftPanelWidth }}>
        <div
          ref={leftScrollRef}
          onScroll={onLeftScroll}
          className={`h-full overflow-x-clip overflow-y-auto relative w-full min-w-0 ${scrollbarHide} scroll-smooth`}
        >
          <Image18 />
        </div>
      </div>
      <div className="bg-[#023625] h-full shrink-0 w-[2px]" data-name="Line" />
      <CircleCaretLeft1 onDrag={onDrag} splitX={leftPanelWidth} />
    </div>
  );
}

function Comparison1() {
  const [leftPanelWidth, setLeftPanelWidth] = useState(Math.round(COMPARISON_WIDTH / 2));
  const { leftScrollRef, rightScrollRef, syncScrollFromLeft, syncScrollFromRight } = useWmSyncedScroll();

  const handleCaretDrag = (deltaX: number) => {
    const step = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 1.8, 400);
    setLeftPanelWidth((prev) => Math.max(0, Math.min(COMPARISON_WIDTH, prev + step)));
  };

  return (
    <div className={`w-full max-w-[1180px] overflow-x-auto overflow-y-hidden rounded-[16px] ${scrollbarHide}`}>
      <div className="relative rounded-[16px] min-w-[1180px]" style={{ height: COMPARISON_FRAME_H }} data-name="Comparison">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Image17 scrollRef={rightScrollRef} onScroll={syncScrollFromRight} />
          <RightImage1 leftPanelWidth={leftPanelWidth} onDrag={handleCaretDrag} leftScrollRef={leftScrollRef} onLeftScroll={syncScrollFromLeft} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
    </div>
  );
}

function SectionCardsVertical2() {
  return (
    <div id="compromises" className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards / Vertical">
      <SectionHeadingFull17 />
      <Row20 />
      <SectionHeadingFull18 />
      <Frame100 />
      <Comparison1 />
    </div>
  );
}

export function WmCaseStudyCompromisesSection() {
  return <SectionCardsVertical2 />;
}
