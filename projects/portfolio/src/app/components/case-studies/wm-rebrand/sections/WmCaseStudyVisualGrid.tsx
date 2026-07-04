import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import imgImage1 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-2f6d2547.png";
import imgImage2 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-01ed2e63.png";
import imgImage3 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-ae435f5d.png";
import imgImage4 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-7657089a.png";
import imgImage5 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-b4931e97.png";
import imgImage6 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-9daba2c9.png";
import img from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-80347242.png";
import imgImage from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-001d291f.png";

function Row2() {
  return (
    <div className="content-stretch flex flex-col min-h-[240px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px] xl:h-[576px] items-start relative shrink-0 w-full" data-name="Row 1">
      <div className="flex-1 min-h-[200px] min-w-0 relative rounded-xl md:rounded-[16px] w-full overflow-hidden" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-xl md:rounded-[16px]">
          <div className="absolute bg-[#2c6740] inset-0 rounded-xl md:rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-[16px]">
            <img alt="" className="absolute h-full left-0 max-w-none top-0 w-full object-cover md:w-[146.5%] md:left-0" src={imgImage1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col aspect-[324/551] w-full min-h-0 min-w-0 max-h-[min(75vh,680px)] relative shrink-0" data-name="Column 1">
      <div className="flex flex-1 min-h-0 flex-col gap-2 w-full">
        <div className="flex-1 min-h-0 relative rounded-[16px] overflow-hidden min-w-0" data-name="Image 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
            <img alt="" className="absolute inset-0 size-full object-cover rounded-[16px] md:inset-auto md:h-[121.71%] md:left-[-0.1%] md:max-w-none md:top-[-5.13%] md:w-[99.65%]" src={imgImage2} />
          </div>
        </div>
        <div className="flex-1 min-h-0 relative rounded-[16px] overflow-hidden min-w-0" data-name="Image 3">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
            <div className="absolute bg-[#1c4633] inset-0 rounded-[16px]" />
            <img alt="" className="absolute inset-0 size-full object-cover rounded-[16px]" src={imgImage3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col aspect-[324/551] w-full min-h-0 min-w-0 max-h-[min(75vh,680px)] relative shrink-0" data-name="Column 2">
      <div className="absolute inset-0 rounded-[16px] overflow-hidden" data-name="Image 4">
        <img alt="" className="absolute inset-0 size-full object-cover object-center pointer-events-none rounded-[16px]" src={imgImage4} />
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col aspect-[324/551] w-full min-h-0 min-w-0 max-h-[min(75vh,680px)] relative shrink-0 overflow-hidden" data-name="Column 3">
      <div className="flex flex-1 min-h-0 min-w-0 w-full h-full flex-col md:flex-row lg:flex-col gap-2">
        <div className="flex-1 min-h-0 min-w-0 w-full relative rounded-[16px] overflow-hidden" data-name="Image 5">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
            <div className="absolute bg-[#ecedea] inset-0 rounded-[16px]" />
            <img alt="" className="absolute inset-0 size-full object-cover object-center rounded-[16px]" src={imgImage5} />
          </div>
        </div>
        <div className="flex-1 min-h-0 min-w-0 w-full relative rounded-[16px] overflow-hidden" data-name="Image 6">
          <img alt="" className="absolute inset-0 size-full object-cover object-center pointer-events-none rounded-[16px]" src={imgImage6} />
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch relative flex-1 min-h-0 w-full min-w-0" data-name="Row 2">
      <div className="flex flex-row items-stretch self-stretch min-w-0 min-h-0 w-full">
        <Column />
      </div>
      <div className="flex flex-row items-stretch self-stretch min-w-0 min-h-0 w-full">
        <Column1 />
      </div>
      <div className="flex flex-row items-stretch self-stretch min-w-0 min-h-0 w-full md:col-span-2 lg:col-span-1">
        <Column2 />
      </div>
    </div>
  );
}

function VisualGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-stretch relative shrink-0 w-full min-w-0" data-name="Visual Grid">
      <Row2 />
      <Row3 />
    </div>
  );
}

export function WmCaseStudyVisualGrid() {
  return <VisualGrid />;
}
