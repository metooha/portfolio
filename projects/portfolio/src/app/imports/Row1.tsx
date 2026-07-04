import svgPaths from "./svg-s5yoss7xv0";

function Count() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function SectionHeadingVertical() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative w-full" data-name="Section Heading / Vertical">
      <Count />
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

function ValueProp() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px pb-[24px] relative" data-name="Value Prop">
      <SectionHeadingVertical />
    </div>
  );
}

function Component() {
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
          <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
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
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "0", "--transform-inner-height": "19" } as React.CSSProperties}>
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
          <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
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
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "0", "--transform-inner-height": "19" } as React.CSSProperties}>
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
          <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
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
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "0", "--transform-inner-height": "19" } as React.CSSProperties}>
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
          <Component />
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

function Image() {
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

export default function Row() {
  return (
    <div className="content-stretch flex flex-wrap gap-[32px] items-start justify-end relative size-full" data-name="Row 1">
      <ValueProp />
      <Image />
    </div>
  );
}