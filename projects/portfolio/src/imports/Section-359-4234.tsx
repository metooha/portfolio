import svgPaths from "./svg-u4ryh4j3uw";
import imgImage2 from "figma:asset/1d3a95ad3efc75d8bf00c41fb3b8f16f412f4ca3.png";
import imgImage3 from "figma:asset/0056f1ef5de5a43f844716b00db48d1e61d92fd5.png";
import imgImage1 from "figma:asset/d75491a4c72a43b99476fcf81b19e69ef0b030b2.png";
import imgFormFields2X1 from "figma:asset/5691cc81eac26fa1c9bc5c2f84aa345d81085f66.png";
import imgButtonsDesktop1X from "figma:asset/c499e23cadaabdca183d8aa30b87f93bbbddcd5c.png";
import imgDesignSystemStyleGuide from "figma:asset/bd1c6ec16d99415fd4be43c5617711c9e3ac3d8f.png";
import DesignSystemsOverviewDiagram from "./DesignSystemsOverviewDiagram-359-4912";

function SectionHeadingVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[40px] text-black w-full">Problem Space</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] relative shrink-0 text-[#4e4f4e] text-[16px] w-full">Waste Management's digital products had grown through rapid, project-based development, resulting in fragmented UI patterns, inconsistent information architecture, and limited reuse across teams. As self-service experiences expanded, these inconsistencies created friction for users and increased maintenance costs for the organization.</p>
    </div>
  );
}

function WmLogoWhiteCircle() {
  return (
    <div className="absolute inset-[0_0.06%_0.06%_0]" data-name="wm-logo-white-circle (1)">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.973 47.973">
        <g id="wm-logo-white-circle (1)">
          <g id="Oval" />
          <g id="Group">
            <path d={svgPaths.p3b10edc0} fill="var(--fill-0, #00693C)" id="Path" />
            <path d={svgPaths.p11add3a0} fill="var(--fill-0, #EBAB00)" id="Path_2" />
            <path clipRule="evenodd" d={svgPaths.p15b9a700} fill="var(--fill-0, #00693C)" fillRule="evenodd" id="Shape" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="overflow-clip relative rounded-[16px] shrink-0 size-[48px]" data-name="logo">
      <WmLogoWhiteCircle />
    </div>
  );
}

function CountTitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Logo />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Brand + IA Principles</p>
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

function Group1() {
  return (
    <div className="absolute inset-[15%_20%_16.08%_20%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7998 33.082">
        <g id="Group 1410106519">
          <path d={svgPaths.p2ec749f0} fill="var(--fill-0, #006937)" id="Subtract" />
          <path d={svgPaths.p2c5e5840} fill="var(--fill-0, #EBAB00)" id="Polygon 3" />
        </g>
      </svg>
    </div>
  );
}

function Token() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Token">
      <Group1 />
    </div>
  );
}

function CountTitle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Token />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Design Tokens</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle1 />
    </div>
  );
}

function SectionHeadingFull1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title1 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(color / type / spacing / effect / scale / breakpoints)</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[15%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.5996 33.5998">
        <g id="Group 695">
          <path d={svgPaths.pb41a000} fill="var(--fill-0, #006937)" id="Subtract" />
          <ellipse cx="16.799" cy="16.7997" fill="var(--fill-0, #EBAB00)" id="Ellipse 176" rx="10.5599" ry="10.56" />
          <ellipse cx="24.8061" cy="3.80625" fill="var(--fill-0, #EBAB00)" id="Ellipse 177" rx="3.80619" ry="3.80621" />
        </g>
      </svg>
    </div>
  );
}

function Atoms() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Atoms">
      <Group />
    </div>
  );
}

function CountTitle2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Atoms />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Atomic Components</p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle2 />
    </div>
  );
}

function SectionHeadingFull2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title2 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(button / checkbox / radio / text field)</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[10%_3.7%_7.5%_12.5%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.226 39.6001">
        <g id="Group 1410106520">
          <g id="Group 674">
            <path d={svgPaths.p27673000} fill="var(--fill-0, #006937)" id="Subtract" />
            <ellipse cx="9.12891" cy="26.7586" fill="var(--fill-0, #EBA900)" id="Ellipse 178" rx="4.99203" ry="4.9922" />
            <ellipse cx="12.292" cy="20.4287" fill="var(--fill-0, #EBA900)" id="Ellipse 179" rx="2.06813" ry="2.0682" />
          </g>
          <g id="Group 675">
            <path d={svgPaths.p127b3f00} fill="var(--fill-0, #006937)" id="Subtract_2" />
            <ellipse cx="4.99213" cy="4.9921" fill="var(--fill-0, #EBA900)" id="Ellipse 178_2" rx="4.99213" ry="4.9921" transform="matrix(0.630846 -0.775908 0.775887 0.630871 20.3603 27.4817)" />
            <ellipse cx="2.06817" cy="2.06816" fill="var(--fill-0, #EBA900)" id="Ellipse 179_2" rx="2.06817" ry="2.06816" transform="matrix(0.630846 -0.775908 0.775887 0.630871 22.3923 19.8656)" />
          </g>
          <g id="Group 676">
            <path d={svgPaths.p3b50bdc0} fill="var(--fill-0, #006937)" id="Subtract_3" />
            <ellipse cx="4.99219" cy="4.99204" fill="var(--fill-0, #EBA900)" id="Ellipse 178_3" rx="4.99219" ry="4.99204" transform="matrix(-0.258811 0.965928 -0.965924 -0.258827 24.2486 7.65002)" />
            <ellipse cx="2.06819" cy="2.06813" fill="var(--fill-0, #EBA900)" id="Ellipse 179_3" rx="2.06819" ry="2.06813" transform="matrix(-0.258811 0.965928 -0.965924 -0.258827 25.5142 15.0504)" />
            <ellipse cx="2.06819" cy="2.06813" fill="var(--fill-0, #EBA900)" id="Ellipse 180" rx="2.06819" ry="2.06813" transform="matrix(-0.258811 0.965928 -0.965924 -0.258827 16.9947 15.8139)" />
          </g>
          <ellipse cx="2.06818" cy="2.06815" fill="var(--fill-0, #EBA900)" id="Ellipse 179_4" rx="2.06818" ry="2.06815" transform="matrix(0.499987 0.866033 -0.866018 0.500013 17.215 23.7158)" />
          <ellipse cx="2.06813" cy="2.06819" fill="var(--fill-0, #EBA900)" id="Ellipse 180_2" rx="2.06813" ry="2.06819" transform="matrix(-0.965924 0.258827 -0.258811 -0.965928 22.8048 28.3049)" />
        </g>
      </svg>
    </div>
  );
}

function Molecules() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Molecules">
      <Group2 />
    </div>
  );
}

function CountTitle3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Molecules />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Molecular Components</p>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative self-stretch" data-name="title">
      <CountTitle3 />
    </div>
  );
}

function SectionHeadingFull3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title3 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(navigation / cards / carousels / modules)</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute bottom-[20%] left-1/4 right-[23.08%] top-[20%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.9195 28.8">
        <g id="Group 1410106521">
          <path d={svgPaths.p29576900} fill="var(--fill-0, #EBA900)" id="Vector 85 (Stroke)" />
          <path d={svgPaths.p381ea100} fill="var(--fill-0, #006937)" id="Vector 86 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Templates() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Templates">
      <Group3 />
    </div>
  );
}

function CountTitle4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Templates />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Page Templates</p>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative self-stretch" data-name="title">
      <CountTitle4 />
    </div>
  );
}

function SectionHeadingFull4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title4 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(e-commerce / marketing / accounts / services)</p>
      </div>
    </div>
  );
}

function MobilePhone() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="mobilePhone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="mobilePhone">
          <rect fill="var(--fill-0, #EBA900)" height="6" id="Rectangle 1190" width="14.4" x="15.6" y="31.2" />
          <path d={svgPaths.p142be80} fill="var(--fill-0, #006937)" id="mobilePhone (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function CountTitle5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <MobilePhone />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Surfaces</p>
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative self-stretch" data-name="title">
      <CountTitle5 />
    </div>
  );
}

function SectionHeadingFull5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title5 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(web / mobile / native / omni)</p>
      </div>
    </div>
  );
}

function CountTitle6() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">Our Goals</p>
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative self-stretch" data-name="title">
      <CountTitle6 />
    </div>
  );
}

function SectionHeadingFull6() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title6 />
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
    <></>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full">
      <SectionHeadingFull6 />
      <SectionCardsWithValueProps />
      <img src={imgDesignSystemStyleGuide} alt="Design System Style Guide" className="w-full rounded-[16px]" />
      <DsPages />
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full" data-name="Section">
      <SectionHeadingVertical />
      <DesignSystemsOverviewDiagram />
      <Frame4 />
    </div>
  );
}