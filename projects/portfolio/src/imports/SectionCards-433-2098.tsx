import svgPaths from "./svg-hyrn66r3bc";
import imgImage1 from "figma:asset/c8b74e9dddd7b7bb51f4d8c7fb37719ff3f56b02.png";
import imgImage2 from "figma:asset/6d8490c5183c0f00dd0e14e2c5f615c1a10ffef3.png";

function Count() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-[12px] relative rounded-[100px] shrink-0 w-[48px]" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-pre-wrap">2.0</p>
    </div>
  );
}

function CountTitle() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[40px] text-black">Information Architecture</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle />
    </div>
  );
}

function SectionHeadingFull() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Rather than designing pages individually, I defined a flexible information architecture that supported multiple content types and use cases. This abstraction allowed the system to scale without redesigning layouts for each new scenario.</p>
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
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Function over form</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[24px] mb-0">The site itself is simple and as basic information, but hard to navigate to information like recycling, self-service needs, and it’s more branded pages live externally on a different website.</p>
        <p className="leading-[24px] mb-0">&nbsp;</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[24px]">
            <span className="leading-[24px]">Colors were muted and dull</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[24px]">Angular designs made the site feel dated</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[24px]">Typography made headlines feel cramped and difficult to read</span>
          </li>
          <li className="ms-[24px]">
            <span className="leading-[24px]">Text color was very light, causing accessibility concerns</span>
          </li>
        </ul>
      </div>
    </div>
  );
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

function Row1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-wrap gap-[32px] items-start justify-end min-h-px min-w-px relative w-full" data-name="Row 1">
      <ValueProp />
      <Ia />
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
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count2 />
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

function Row2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-wrap gap-[32px] items-start justify-end min-h-px min-w-px relative w-full" data-name="Row 2">
      <ValueProp1 />
      <Ia1 />
    </div>
  );
}

function SectionCardsVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[1005px] items-start relative shrink-0 w-full" data-name="Section Cards / Vertical">
      <Row1 />
      <Row2 />
    </div>
  );
}

function Count3() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">2.1</p>
    </div>
  );
}

function CountTitle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count3 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">{`Site Map `}</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle1 />
    </div>
  );
}

function SectionHeadingFull1() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title1 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">{`We kick off our rebranding journey by analyzing our page templates' hierarchy to create a strategic site map that identifies key areas for impactful branded pages and outlines the necessary components to improve each template.`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_86.12%_91.52%_0] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">WM Homepage</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_85.48%_75.54%_0.63%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services for Home</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_69.77%_75.54%_16.35%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services for Business</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_54.06%_75.54%_32.06%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycle Right</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.83%_53.49%_63.76%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycle 101</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[39.05%_53.49%_52.54%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycle 101</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[50.27%_53.49%_41.32%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycling Resources</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_8%_75.54%_78.12%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Support</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_40.94%_91.52%_49.6%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Pay My Bill</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_29.96%_91.52%_60.58%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Drop Off Locations</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_18.98%_91.52%_71.56%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Notifications</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_8%_91.52%_82.54%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Log In</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[24.18%_38.22%_67.4%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Who We Are</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[35.4%_38.22%_56.18%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Our Story</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[46.62%_38.22%_44.96%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Our Leadership</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[24.18%_23.27%_67.4%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
        <p className="mb-0">{`Environmental `}</p>
        <p>Stewardship</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[35.4%_23.27%_56.18%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Social Impact</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[46.62%_23.27%_44.96%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Sustainable Technology</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[57.84%_23.27%_33.74%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Sustainable Reporting</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[69.06%_23.27%_22.53%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">WM Sustainability Forum</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[80.28%_23.27%_11.31%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">WM Phoenix Open</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[57.84%_38.22%_33.74%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">{`Inclusion & Diversity `}</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[69.06%_38.22%_22.53%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">{`Careers `}</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[80.28%_38.22%_11.31%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Investors</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[91.5%_38.22%_0.09%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Media Room</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white inset-[29.63%_84.92%_64.32%_3.56%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-white inset-[28.45%_85.44%_65.5%_3.04%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.27%_86.02%_66.68%_2.46%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[27.27%_84.92%_64.32%_2.46%]">
      <Frame4 />
      <Frame3 />
      <Frame2 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-white inset-[29.63%_69.27%_64.32%_19.26%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute bg-white inset-[28.45%_69.79%_65.5%_18.74%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.27%_70.41%_66.68%_18.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[27.27%_69.27%_64.32%_18.11%]">
      <Frame10 />
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute bg-white inset-[40.85%_69.27%_53.1%_19.26%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-white inset-[39.67%_69.79%_54.28%_18.74%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[38.49%_70.41%_55.46%_18.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Solutions</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[38.49%_69.27%_53.1%_18.11%]">
      <Frame31 />
      <Frame32 />
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute bg-white inset-[30.19%_7.62%_63.76%_80.91%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute bg-white inset-[29.01%_8.14%_64.94%_80.39%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.83%_8.77%_66.12%_79.76%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Topics</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[27.83%_7.62%_63.76%_79.76%]">
      <Frame34 />
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute bg-white inset-[52.07%_68.33%_41.88%_22.1%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute bg-white inset-[50.89%_68.77%_43.06%_21.66%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[49.71%_69.29%_44.24%_21.14%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[49.71%_68.33%_41.88%_21.14%]">
      <Frame37 />
      <Frame38 />
      <Frame39 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute bg-white inset-[41.41%_6.93%_52.54%_83.5%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute bg-white inset-[40.23%_7.37%_53.72%_83.06%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[39.05%_7.89%_54.9%_82.54%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">FAQs</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[39.05%_6.93%_52.54%_82.54%]">
      <Frame40 />
      <Frame41 />
      <Frame42 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute bg-white inset-[63.15%_-0.01%_30.8%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute bg-white inset-[61.97%_0.43%_31.98%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[60.79%_0.95%_33.16%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Campaigns</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[60.79%_-0.01%_30.8%_89.48%]">
      <Frame43 />
      <Frame44 />
      <Frame45 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="absolute bg-white inset-[74.93%_-0.01%_19.02%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute bg-white inset-[73.75%_0.43%_20.2%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[72.57%_0.95%_21.38%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Local Pages</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[72.57%_-0.01%_19.02%_89.48%]">
      <Frame46 />
      <Frame47 />
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute bg-white inset-[86.71%_-0.01%_7.24%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute bg-white inset-[85.53%_0.43%_8.42%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[84.35%_0.95%_9.6%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Footer Links</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[84.35%_-0.01%_7.24%_89.48%]">
      <Frame49 />
      <Frame50 />
      <Frame51 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute bg-white inset-[63.29%_68.33%_30.66%_22.1%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame53() {
  return (
    <div className="absolute bg-white inset-[62.11%_68.77%_31.84%_21.66%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[60.93%_69.29%_33.02%_21.14%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Solutions</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[60.93%_68.33%_30.66%_21.14%]">
      <Frame52 />
      <Frame53 />
      <Frame54 />
    </div>
  );
}

function SitemapWm() {
  return (
    <div className="aspect-[1149/517] relative shrink-0 w-full" data-name="sitemap wm">
      <div className="absolute bg-white inset-[-2.32%_-3.05%_-2.86%_-1.83%]" />
      <Frame />
      <Frame1 />
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame23 />
      <Frame22 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Group />
      <Group1 />
      <Group2 />
      <Group5 />
      <Group3 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
      <Group4 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.89%_41.78%_80.1%_53.47%] leading-[15.076px] not-italic text-[#006937] text-[11px] text-center">Inside WM</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.89%_26%_80.1%_67.82%] leading-[15.076px] not-italic text-[#006937] text-[11px] text-center">Sustainability</p>
      <div className="absolute inset-[8.76%_17.46%_4.18%_1.4%]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 957.429 462.275">
          <path d={svgPaths.p2f8c8f00} fill="var(--fill-0, #006937)" id="Union" />
        </svg>
      </div>
    </div>
  );
}

function Count4() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">2.2</p>
    </div>
  );
}

function CountTitle2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count4 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Page Templates</p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle2 />
    </div>
  );
}

function SectionHeadingFull2() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title2 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Page templates were created as composition frameworks rather than fixed layouts, enabling teams to assemble consistent experiences quickly while maintaining flexibility for different product needs.</p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold items-start justify-between leading-[normal] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[17px]">
      <p className="relative shrink-0">{`Action & Conversion`}</p>
      <p className="relative shrink-0 text-right">{`Brand & Story Telling`}</p>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Logged in Pages</p>
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">{`Support Landing `}</p>
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Support Detail</p>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="row">
      <div aria-hidden="true" className="absolute border-2 border-[#006937] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <Frame55 />
        <Frame56 />
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="column 1">
      <Row />
      <Row3 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">{`Service & Solutions `}</p>
            <p>{`Landing `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">
            Solution
            <br aria-hidden="true" />
            Detail
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Service</p>
            <p>Detail</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame58 />
      <Frame59 />
    </div>
  );
}

function Row4() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="row">
      <div aria-hidden="true" className="absolute border-2 border-[#006937] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <Frame57 />
        <Frame65 />
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px] self-stretch">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative size-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Campaign</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">{`Local & `}</p>
            <p className="mb-0">{`Franchise `}</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame60 />
      <Frame61 />
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="column 2">
      <Row4 />
      <Frame67 />
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Locator</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Location</p>
            <p>Detail</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start py-[16px] relative self-stretch shrink-0 w-[125px]" data-name="column 3">
      <Row5 />
      <Row6 />
    </div>
  );
}

function Row7() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Homepage</p>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Blank</p>
            <p>Template</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start py-[16px] relative self-stretch shrink-0 w-[125px]" data-name="column 4">
      <Row7 />
      <Row8 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Immersive</p>
            <p>Story Telling Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Educational</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="row">
      <Frame62 />
      <Frame63 />
    </div>
  );
}

function Row10() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">General Detail Page</p>
        </div>
      </div>
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[349px]" data-name="column 5">
      <div aria-hidden="true" className="absolute border-2 border-[#006937] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
      <Row9 />
      <Row10 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
    </div>
  );
}

function PageTemplates() {
  return (
    <div className="content-start flex flex-1 min-w-0 w-full flex-wrap gap-[24px_695.88px] items-stretch pb-[32px] relative" data-name="page templates">
      <Frame64 />
      <div className="h-0 relative shrink-0 w-[1171.641px]">
        <div className="absolute inset-[-7.36px_-0.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1173.64 14.7279">
            <path d={svgPaths.p2a075dc0} fill="var(--stroke-0, #006937)" id="Vector 12" />
          </svg>
        </div>
      </div>
      <Frame66 />
    </div>
  );
}

function SectionCards1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull2 />
      <PageTemplates />
    </div>
  );
}

export default function SectionCards() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] relative size-full" data-name="Section Cards">
      <SectionHeadingFull />
      <SectionCardsVertical />
      <SectionHeadingFull1 />
      <SitemapWm />
      <SectionCards1 />
    </div>
  );
}