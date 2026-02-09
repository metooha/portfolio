import svgPaths from "./svg-u4ryh4j3uw";
import imgImage2 from "figma:asset/1d3a95ad3efc75d8bf00c41fb3b8f16f412f4ca3.png";
import imgImage3 from "figma:asset/0056f1ef5de5a43f844716b00db48d1e61d92fd5.png";
import imgImage1 from "figma:asset/d75491a4c72a43b99476fcf81b19e69ef0b030b2.png";
import imgFormFields2X1 from "figma:asset/5691cc81eac26fa1c9bc5c2f84aa345d81085f66.png";
import imgButtonsDesktop1X from "figma:asset/c499e23cadaabdca183d8aa30b87f93bbbddcd5c.png";

function CountTitle() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">Our Goals</p>
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

function Pin() {
  return (
    <div className="h-[44px] relative shrink-0 w-[48px]" data-name="Pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 44">
        <g id="Pin">
          <path d={svgPaths.p4f2f100} fill="var(--fill-0, #1C8200)" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Revamp our website and define a migration plan for hundreds of local external pages.</p>
    </div>
  );
}

function ValueProp() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="Value Prop">
      <Pin />
      <Frame />
    </div>
  );
}

function Star() {
  return (
    <div className="h-[44px] relative shrink-0 w-[48px]" data-name="star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 44">
        <g id="star">
          <path clipRule="evenodd" d={svgPaths.p2d858e00} fill="var(--fill-0, #E8A73A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Establish a guiding framework and scalable system that accelerates our market entry.</p>
    </div>
  );
}

function ValueProp1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-full items-start min-h-px min-w-px relative" data-name="Value Prop">
      <Star />
      <Frame1 />
    </div>
  );
}

function Chat() {
  return (
    <div className="h-[44.34px] relative shrink-0 w-[48px]" data-name="chat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 44.3408">
        <g id="chat">
          <path d={svgPaths.p15d40980} fill="var(--fill-0, #8ABF00)" id="Chat" />
          <path d={svgPaths.p2038b100} fill="var(--fill-0, #003F2E)" id="Combined Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Collaborate and execute with our product, brand, design, and engineering teams.</p>
    </div>
  );
}

function ValueProp2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-full items-start min-h-px min-w-px relative" data-name="Value Prop">
      <Chat />
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[16px] relative shrink-0 w-full">
      <ValueProp />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <ValueProp1 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <ValueProp2 />
      </div>
    </div>
  );
}

function SectionCardsWithValueProps() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards / With Value Props">
      <Frame3 />
    </div>
  );
}

function DsPages() {
  return (
    <div className="h-[684.4px] overflow-clip relative shrink-0 w-full" data-name="DS pages">
      <div className="absolute inset-[0.13%_57.03%_-2.12%_0.08%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.24%] left-0 max-w-none top-[-0.1%] w-full" src={imgImage2} />
        </div>
      </div>
      <div className="absolute inset-[0.09%_33.25%_-3.69%_16.75%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <div className="absolute inset-[0.13%_25.17%_-0.07%_33.31%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[117.91%] left-[-0.08%] max-w-none top-[-0.03%] w-[100.27%]" src={imgImage1} />
        </div>
      </div>
      <div className="absolute inset-[0.13%_-0.08%_-0.07%_50.08%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="Form Fields@2x 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[178.89%] left-[0.05%] max-w-none top-[-0.04%] w-full" src={imgFormFields2X1} />
        </div>
      </div>
      <div className="absolute inset-[-1.48%_-49.24%_-0.07%_66.78%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="Buttons - Desktop@1x">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[178.11%] left-0 max-w-none top-[-0.06%] w-[99.98%]" src={imgButtonsDesktop1X} />
        </div>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full">
      <SectionHeadingFull />
      <SectionCardsWithValueProps />
      <DsPages />
    </div>
  );
}