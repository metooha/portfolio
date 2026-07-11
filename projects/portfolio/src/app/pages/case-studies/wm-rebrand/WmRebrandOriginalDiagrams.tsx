/**
 * Original Figma-exported diagrams, kept as-is (rather than rebuilt on the
 * shared primitives) at the user's request: the design-system architecture
 * diagram and the IA site map. Both are self-contained and already
 * responsive (percentage insets + an aspect-ratio wrapper + clamp() type),
 * so there's no fidelity trade-off to rebuilding them.
 */
import svgPaths from "./svg/svg-wznnermhqa";

/* -------------------------------------------------------------------------- */
/* Design Systems Overview Diagram — "Brand + IA Principles"                  */
/* -------------------------------------------------------------------------- */

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
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle />
    </div>
  );
}

function SectionHeadingFull() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title />
    </div>
  );
}

function Group17() {
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
      <Group17 />
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
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title1 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(color / type / spacing / effect / scale / breakpoints)</p>
      </div>
    </div>
  );
}

function Group14() {
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
      <Group14 />
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
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title2 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(button / checkbox / radio / text field)</p>
      </div>
    </div>
  );
}

function Group18() {
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
      <Group18 />
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
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle3 />
    </div>
  );
}

function SectionHeadingFull3() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title3 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(navigation / cards / carousels / modules)</p>
      </div>
    </div>
  );
}

function Group19() {
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
      <Group19 />
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
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle4 />
    </div>
  );
}

function SectionHeadingFull4() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title4 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
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
          <path d={svgPaths.pc1b8300} fill="var(--fill-0, #006937)" id="mobilePhone (Stroke)" />
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
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle5 />
    </div>
  );
}

function SectionHeadingFull5() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title5 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(web / mobile / native / omni)</p>
      </div>
    </div>
  );
}

export function DesignSystemsOverviewDiagram() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full" data-name="Design Systems Overview Diagram">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[32px] relative w-full">
        <SectionHeadingFull />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Shared foundations</p>
        <SectionHeadingFull1 />
        <SectionHeadingFull2 />
        <SectionHeadingFull3 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Governed layers</p>
        <SectionHeadingFull4 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Flexible outputs</p>
        <SectionHeadingFull5 />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Site Map — the original IA tree diagram                                    */
/* -------------------------------------------------------------------------- */

function Frame10() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_86.12%_91.52%_0] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">WM Homepage</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_85.48%_75.54%_0.63%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Services for Home</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_69.77%_75.54%_16.35%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Services for Business</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_54.06%_75.54%_32.06%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Recycle Right</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.83%_53.49%_63.76%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Recycle 101</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[39.05%_53.49%_52.54%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Recycle 101</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[50.27%_53.49%_41.32%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Recycling Resources</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_8%_75.54%_78.12%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Support</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_40.94%_91.52%_49.6%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Pay My Bill</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_29.96%_91.52%_60.58%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Drop Off Locations</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_18.98%_91.52%_71.56%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Notifications</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_8%_91.52%_82.54%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Log In</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[24.18%_38.22%_67.4%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Who We Are</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[35.4%_38.22%_56.18%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Our Story</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[46.62%_38.22%_44.96%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Our Leadership</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[24.18%_23.27%_67.4%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Environmental Stewardship</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[35.4%_23.27%_56.18%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Social Impact</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[46.62%_23.27%_44.96%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Sustainable Technology</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[57.84%_23.27%_33.74%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Sustainable Reporting</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[69.06%_23.27%_22.53%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">WM Sustainability Forum</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[80.28%_23.27%_11.31%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">WM Phoenix Open</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[57.84%_38.22%_33.74%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">{`Inclusion & Diversity `}</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[69.06%_38.22%_22.53%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">{`Careers `}</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[80.28%_38.22%_11.31%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Investors</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[91.5%_38.22%_0.09%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Media Room</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute bg-white inset-[29.63%_84.92%_64.32%_3.56%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute bg-white inset-[28.45%_85.44%_65.5%_3.04%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.27%_86.02%_66.68%_2.46%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Services</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[27.27%_84.92%_64.32%_2.46%]">
      <Frame35 />
      <Frame36 />
      <Frame37 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute bg-white inset-[29.63%_69.27%_64.32%_19.26%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute bg-white inset-[28.45%_69.79%_65.5%_18.74%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.27%_70.41%_66.68%_18.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Services</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[27.27%_69.27%_64.32%_18.11%]">
      <Frame38 />
      <Frame39 />
      <Frame40 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute bg-white inset-[40.85%_69.27%_53.1%_19.26%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-white inset-[39.67%_69.79%_54.28%_18.74%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[38.49%_70.41%_55.46%_18.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Solutions</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[38.49%_69.27%_53.1%_18.11%]">
      <Frame41 />
      <Frame42 />
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute bg-white inset-[30.19%_7.62%_63.76%_80.91%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute bg-white inset-[29.01%_8.14%_64.94%_80.39%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.83%_8.77%_66.12%_79.76%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Topics</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[27.83%_7.62%_63.76%_79.76%]">
      <Frame49 />
      <Frame50 />
      <Frame51 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute bg-white inset-[52.07%_68.33%_41.88%_22.1%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute bg-white inset-[50.89%_68.77%_43.06%_21.66%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[49.71%_69.29%_44.24%_21.14%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Services</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[49.71%_68.33%_41.88%_21.14%]">
      <Frame54 />
      <Frame55 />
      <Frame56 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="absolute bg-white inset-[41.41%_6.93%_52.54%_83.5%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame58() {
  return (
    <div className="absolute bg-white inset-[40.23%_7.37%_53.72%_83.06%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame59() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[39.05%_7.89%_54.9%_82.54%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">FAQs</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[39.05%_6.93%_52.54%_82.54%]">
      <Frame57 />
      <Frame58 />
      <Frame59 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="absolute bg-white inset-[63.15%_-0.01%_30.8%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame61() {
  return (
    <div className="absolute bg-white inset-[61.97%_0.43%_31.98%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame62() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[60.79%_0.95%_33.16%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Campaigns</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[60.79%_-0.01%_30.8%_89.48%]">
      <Frame60 />
      <Frame61 />
      <Frame62 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="absolute bg-white inset-[74.93%_-0.01%_19.02%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute bg-white inset-[73.75%_0.43%_20.2%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[72.57%_0.95%_21.38%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Local Pages</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[72.57%_-0.01%_19.02%_89.48%]">
      <Frame63 />
      <Frame64 />
      <Frame65 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="absolute bg-white inset-[86.71%_-0.01%_7.24%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame67() {
  return (
    <div className="absolute bg-white inset-[85.53%_0.43%_8.42%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[84.35%_0.95%_9.6%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Footer Links</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[84.35%_-0.01%_7.24%_89.48%]">
      <Frame66 />
      <Frame67 />
      <Frame68 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="absolute bg-white inset-[63.29%_68.33%_30.66%_22.1%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame70() {
  return (
    <div className="absolute bg-white inset-[62.11%_68.77%_31.84%_21.66%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame71() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[60.93%_69.29%_33.02%_21.14%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Solutions</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[60.93%_68.33%_30.66%_21.14%]">
      <Frame69 />
      <Frame70 />
      <Frame71 />
    </div>
  );
}

export function SitemapWm() {
  return (
    <div className="aspect-[1149/517] relative shrink-0 w-full" data-name="sitemap wm">
      <div className="absolute bg-white inset-[-2.32%_-3.05%_-2.86%_-1.83%]" />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
      <Frame34 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group9 />
      <Group7 />
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group8 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.89%_41.78%_80.1%_53.47%] leading-tight not-italic min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Inside WM</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.89%_26%_80.1%_67.82%] leading-tight not-italic min-w-0 max-w-full text-[#006937] text-center text-[clamp(8px,1.2vw,11px)] break-words line-clamp-2">Sustainability</p>
      <div className="absolute inset-[8.76%_17.46%_4.18%_1.4%]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 957.429 462.275">
          <path d={svgPaths.p2f8c8f00} fill="var(--fill-0, #006937)" id="Union" />
        </svg>
      </div>
    </div>
  );
}
