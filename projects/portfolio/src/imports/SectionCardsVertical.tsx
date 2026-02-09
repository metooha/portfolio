import svgPaths from "./svg-70p2r1pp29";
import imgScreencaptureWmUsEnBusinessBusinessWasteRecyclingPickup202108181424591 from "figma:asset/ed2ae4141ab5561496c0a6c107ed18d5e102b7dd.png";
import imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041 from "figma:asset/6bbca4fd1a566acd674aaec181de0fd2fc086952.png";
import imgScreencaptureWmUsEn202108041502201 from "figma:asset/27952ada7f25975e51134a2f048edb0959107527.png";
import imgBusinessNew1 from "figma:asset/c2a3fc3ff0661c4fa7b34f0e4bde6261049f911a.png";
import imgDSf1Landing2 from "figma:asset/31b8b3e4fb39d82564f6b9432163b6a147e6ef87.png";
import imgLandingPage1 from "figma:asset/75d4befc59540d329e85044451d2144c400cc32a.png";
import imgNaming from "figma:asset/2cce581fef4169a4e0ea0db9ad19572ac3d13045.png";

function Count() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.1</p>
    </div>
  );
}

function CountTitle() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">{`System Discovery & Audit`}</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative self-stretch" data-name="title">
      <CountTitle />
    </div>
  );
}

function SectionHeadingFull() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title />
    </div>
  );
}

function Count1() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function SectionHeadingVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Audit and System Discovery</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">I conducted a system-level audit of existing pages, components, and patterns to identify redundancy, inconsistencies, and opportunities for consolidation. This work established a shared design vocabulary and informed which elements should become foundational system components.</p>
    </div>
  );
}

function ValueProp() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Value Prop">
      <SectionHeadingVertical />
    </div>
  );
}

function Image() {
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

function Frame() {
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

function Frame3() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">Learn More About National Accounts</p>
      <IconControls />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[41px] items-center min-h-px min-w-px relative">
      <Image />
      <Frame />
      <Frame3 />
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

function Frame4() {
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

function Image1() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame4 />
        <div className="absolute h-[23px] left-[183px] top-[197px] w-[58px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[103.5px] not-italic text-[#1d8202] text-[13px] text-center top-[12px]">Sign Up Now</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d8202] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[62px] items-center min-h-px min-w-px relative">
      <Image1 />
      <Frame2 />
    </div>
  );
}

function Image2() {
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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">EXPLORE POPULAR SERVICES</p>
      <div className="flex items-center justify-center relative shrink-0 size-[13px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "8199" } as React.CSSProperties}>
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

function Frame5() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">More About Your Transition to WM</p>
      <IconControls2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[53px] items-center min-h-px min-w-px relative">
      <Image2 />
      <Frame1 />
      <Frame5 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame9 />
      <Frame8 />
      <Frame7 />
    </div>
  );
}

function VisualGrid() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full" data-name="Visual Grid">
      <div className="content-stretch flex flex-col items-start px-[30px] py-[56px] relative w-full">
        <Frame10 />
      </div>
    </div>
  );
}

function ElementButtonPrimaryCenteredAllDefault() {
  return (
    <div className="bg-[#1c8200] content-stretch flex h-[48px] items-center justify-center pb-[12px] pt-[16px] px-[49px] relative rounded-[48px] shadow-[0px_0px_1.5px_0px_rgba(0,0,0,0.1),0px_6px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-[150px]" data-name="element/button/primary/centered-all/default">
      <div className="flex flex-col font-['Maax:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">Button</p>
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-[357px]" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[335px] left-0 top-0 w-[357px]" data-name="Business new 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[351.65%] left-0 max-w-none top-0 w-[99.9%]" src={imgBusinessNew1} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[320px] left-0 overflow-clip top-0 w-[387px]">
      <div className="absolute h-[1015px] left-0 top-0 w-[357px]" data-name="D.SF.1 - Landing 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDSf1Landing2} />
      </div>
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-[357px]" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Image5() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-[357px]" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[1143.197px] left-0 top-0 w-[356.63px]" data-name="landing page 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[100.6%] left-[-1.02%] max-w-none top-[-0.21%] w-[102.04%]" src={imgLandingPage1} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[28px] left-1/2 top-0 w-[387px]" data-name="screencapture-wm-us-en-inside-wm-sustainability-forum-2021-10-13-11_55_04 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[4257.14%] left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Image3 />
      <Image4 />
      <Image5 />
    </div>
  );
}

function VisualGrid1() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full" data-name="Visual Grid">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[126px] items-center px-[30px] py-[36px] relative w-full">
          <ElementButtonPrimaryCenteredAllDefault />
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-end relative shrink-0 w-full" data-name="Row 2">
      <ValueProp />
      <VisualGrid />
      <VisualGrid1 />
    </div>
  );
}

function Count2() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function SectionHeadingVertical1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative w-full" data-name="Section Heading / Vertical">
      <Count2 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[20px] text-black w-[min-content] whitespace-pre-wrap">{`Tokens & Foundations`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">
        {`Our branding foundations and hierarchy are built on a mix of primitive and semantic tokens. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        We have established a token taxonomy based on their semantic usage, which we continuously refine to broaden their applications, especially when dealing with other surfaces.
      </p>
    </div>
  );
}

function ValueProp1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px pb-[24px] relative" data-name="Value Prop">
      <SectionHeadingVertical1 />
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

function Content() {
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
          <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
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
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
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
      <Content />
      <Pointer />
    </div>
  );
}

function Content1() {
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
          <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
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
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
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
      <Content1 />
      <Pointer1 />
    </div>
  );
}

function Content2() {
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
          <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
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
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
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
      <Content2 />
      <Pointer2 />
    </div>
  );
}

function Tokens() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="tokens">
      <div className="absolute flex inset-[14.17%_0.08%_4.07%_15.86%] items-center justify-center">
        <div className="flex-none h-[332.506px] rotate-[-29.31deg] scale-y-85 skew-x-[31.39deg] w-[205.387px]">
          <Component1 />
        </div>
      </div>
      <div className="absolute flex inset-[0_26.69%_53.57%_25.57%] items-center justify-center">
        <div className="flex-none h-[132.287px] rotate-[-29.31deg] scale-y-85 skew-x-[31.39deg] w-[173.188px]">
          <LdCard />
        </div>
      </div>
      <SpecCallout />
      <SpecCallout1 />
      <SpecCallout2 />
    </div>
  );
}

function Image6() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Image">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[16px] py-[16px] relative size-full">
          <Tokens />
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[32px] h-[354px] items-start justify-end relative shrink-0 w-full" data-name="Row 1">
      <ValueProp1 />
      <Image6 />
    </div>
  );
}

export default function SectionCardsVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full" data-name="Section Cards / Vertical">
      <SectionHeadingFull />
      <Row1 />
      <Row />
      <div className="h-[347px] relative rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="naming">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="" className="absolute h-[113.9%] left-0 max-w-none top-[-13.54%] w-full" src={imgNaming} />
        </div>
      </div>
    </div>
  );
}