import svgPaths from "./svg-ss7h42mgth";
import imgImage from "figma:asset/2520a03a24b3b9c3e1724419117e04d643ad9734.png";

function Image() {
  return (
    <div className="h-[175px] overflow-clip relative shrink-0 w-full" data-name="image">
      <div className="-translate-x-1/2 absolute aspect-[267/175] bottom-0 left-[calc(50%+0.5px)] top-[-1.31px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[157.71%] left-[-48.22%] max-w-none top-[-45.77%] w-[155.81%]" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow/right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow/right">
          <path d={svgPaths.pf3d430} fill="var(--fill-0, #006937)" id="arrowRight" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Maax:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#006937] text-[16px] tracking-[-0.16px]">Learn More</p>
      <ArrowRight />
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Text">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <p className="font-['Maax:Bold',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#006937] text-[14px] tracking-[1.4px] uppercase">Recycling</p>
        <p className="font-['Maax:Bold',sans-serif] leading-[27px] min-w-full not-italic relative shrink-0 text-[20px] text-black tracking-[-0.96px] w-[min-content] whitespace-pre-wrap">The Dangers of “Wishcycling”</p>
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#4e4f4e] text-[14px] text-ellipsis w-full whitespace-pre-wrap">By Susan Robinson, Director of Public Affairs for Waste Management As the impacts of China’s new import policies to reduce trash in the</p>
        <Frame />
      </div>
    </div>
  );
}

export default function NewCardTypeSolution() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="New Card type / Solution">
      <Image />
      <div className="bg-[#024731] h-px shrink-0 w-full" data-name="divider" />
      <Text />
    </div>
  );
}