import svgPaths from "./svg-0z8iaanw6j";

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="arrow/left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="arrow/left">
          <path d={svgPaths.p36efd180} fill="var(--fill-0, #4E4F4E)" id="arrowLeft" />
        </g>
      </svg>
    </div>
  );
}

function TextLinkBack() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Text Link / Back">
      <ArrowLeft />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">Back</p>
    </div>
  );
}

function SideNav() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="bg-[#207442] h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">Overview</p>
    </div>
  );
}

function SideNav1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">Problem Space</p>
    </div>
  );
}

function SideNav2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">Our Goals</p>
    </div>
  );
}

function SideNav3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">Approach</p>
    </div>
  );
}

function SideNav4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">System Audit</p>
    </div>
  );
}

function SideNav5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">
        {`Information `}
        <br aria-hidden="true" />
        Architecture
      </p>
    </div>
  );
}

function SideNav6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Calibre-R:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[20px]">Compromises</p>
    </div>
  );
}

function SideNavigation() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Side Navigation">
      <SideNav />
      <SideNav1 />
      <SideNav2 />
      <SideNav3 />
      <SideNav4 />
      <SideNav5 />
      <SideNav6 />
    </div>
  );
}

export default function PageNavigation() {
  return (
    <div className="content-stretch flex flex-col gap-[58px] items-start pl-[68px] pr-[20px] relative size-full" data-name="page navigation">
      <TextLinkBack />
      <SideNavigation />
    </div>
  );
}