import imgImage1 from "figma:asset/2520a03a24b3b9c3e1724419117e04d643ad9734.png";
import { imgImage } from "./svg-wlu7g";

function Col1Image() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Col-1-image">
      <div className="absolute bg-[#979797] h-[249px] left-0 top-0 w-[298px]" data-name="Mask" />
      <div className="absolute h-[276px] left-[-80px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[80px_101px] mask-size-[298px_249px] top-[-101px] w-[416px]" data-name="Image" style={{ maskImage: `url('${imgImage}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage1} />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[175px] overflow-clip relative shrink-0 w-full">
      <Col1Image />
    </div>
  );
}

function RecyclingEyebrow() {
  return (
    <div className="h-[22.071px] relative shrink-0 w-full" data-name="Recycling-eyebrow">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-0 leading-[17.984px] not-italic text-[#1d890a] text-[13.079px] tracking-[1.6349px] uppercase whitespace-pre-wrap">Recycling</p>
    </div>
  );
}

function StackedGroup() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Stacked Group">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <RecyclingEyebrow />
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic relative shrink-0 text-[#4e4f58] text-[20px] w-full whitespace-pre-wrap">The Dangers of “Wishcycling”</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#67696d] text-[14px] text-ellipsis w-full whitespace-nowrap">By Susan Robinson, Director of Public Affairs for Waste Management As the impacts of China’s new import policies to reduce trash in the</p>
        <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d890a] text-[16px] underline w-full whitespace-pre-wrap">Keep Reading</p>
      </div>
    </div>
  );
}

export default function ReskinCardTypeBasic() {
  return (
    <div className="bg-white relative rounded-[16px] size-full" data-name="Reskin Card type / Basic">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <Frame />
        <StackedGroup />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-[-0.5px] pointer-events-none rounded-[16.5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}