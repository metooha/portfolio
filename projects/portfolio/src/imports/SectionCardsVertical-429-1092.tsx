import imgImage1 from "figma:asset/c8b74e9dddd7b7bb51f4d8c7fb37719ff3f56b02.png";
import imgImage2 from "figma:asset/6d8490c5183c0f00dd0e14e2c5f615c1a10ffef3.png";

function Count() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function SectionHeadingVertical() {
  return null;
}

function ValueProp() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px pb-[24px] relative" data-name="Value Prop">
      <SectionHeadingVertical />
    </div>
  );
}

function ImageSlot() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Image slot">
      <div className="absolute inset-0 rounded-[16px]" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#efefe4] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-full left-[13.51%] max-w-none top-[4.31%] w-[72.98%]" src={imgImage1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Ia() {
  return (
    <div className="content-stretch flex h-full items-center pl-[16px] py-[16px] relative shrink-0 w-[647px]" data-name="IA 1">
      <ImageSlot />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-wrap gap-[32px] items-start justify-end min-h-px min-w-px relative w-full" data-name="Row 1">
      <ValueProp />
      <Ia />
    </div>
  );
}

function Count1() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function SectionHeadingVertical1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Photography felt lacking and inconsistent</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">
        {`The current website's imagery, drawn from various photography campaigns, creates a disjointed and inconsistent experience for users navigating the top landing pages. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />A cohesive photography strategy could transform this into a powerful storytelling tool, enhancing the overall impact and consistency of our visual narrative.
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

function ImageSlot1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Image slot">
      <div className="absolute inset-0 rounded-[16px]" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#efefe4] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[135.06%] left-[14.32%] max-w-none top-[0.16%] w-[71.8%]" src={imgImage2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Ia1() {
  return (
    <div className="content-stretch flex h-full items-center pl-[16px] py-[16px] relative shrink-0 w-[647px]" data-name="IA 2">
      <ImageSlot1 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-wrap gap-[32px] items-start justify-end min-h-px min-w-px relative w-full" data-name="Row 2">
      <ValueProp1 />
      <Ia1 />
    </div>
  );
}

export default function SectionCardsVertical() {
  return null;
}