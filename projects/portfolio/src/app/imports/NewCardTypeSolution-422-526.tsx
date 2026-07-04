import svgPaths from "./svg-9yej0w9pdx";
import img from "figma:asset/8034724294787bdbafe3c9f198ba11eacf27626e.png";

function Icon() {
  return (
    <div className="h-[16px] relative shrink-0 w-[16px]" data-name="arrow-right">
      <div className="absolute inset-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.pf3d430} id="Icon" fill="var(--fill-0, #1d890a)" />
        </svg>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <img alt="" className="absolute inset-[-0.77%_-0.42%] object-cover size-full" src={img} />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#1d890a] text-[13.079px] tracking-[1.6349px] uppercase w-full whitespace-pre-wrap">Solutions</p>
      <p className="font-['DIN_OT:Bold',sans-serif] leading-[27px] not-italic relative shrink-0 text-[#4e4f58] text-[20px] w-full whitespace-pre-wrap">Waste Reduction Programs</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#67696d] text-[14px] w-full whitespace-pre-wrap">Comprehensive solutions to help your business reduce waste and improve sustainability.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-row gap-[8px] items-center relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d890a] text-[14px] underline whitespace-pre-wrap">Read More</p>
      <Icon />
    </div>
  );
}

export default function NewCardTypeSolution() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="New Card type / Solution">
      <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <Image />
        <Text />
        <Button />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}
