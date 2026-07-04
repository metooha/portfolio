import svgPaths from "./svg-2dhazgsnt9";

function Icon() {
  return (
    <div className="h-[16px] relative shrink-0 w-[16px]" data-name="download-icon">
      <div className="absolute inset-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p3fb78400} id="Icon" stroke="var(--stroke-0, #1d890a)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.371" />
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[17.984px] not-italic relative shrink-0 text-[#1d890a] text-[13.079px] tracking-[1.6349px] uppercase w-full whitespace-pre-wrap">Downloads</p>
      <p className="font-['DIN_OT:Bold',sans-serif] leading-[27px] not-italic relative shrink-0 text-[#4e4f58] text-[20px] w-full whitespace-pre-wrap">Recycling and Waste Reduction Guide</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#67696d] text-[14px] text-ellipsis w-full whitespace-nowrap">Learn how to reduce waste and recycle more effectively with our comprehensive guide for homes and businesses.</p>
      <div className="content-stretch flex flex-row gap-[8px] items-center relative shrink-0 w-full">
        <Icon />
        <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d890a] text-[14px] underline whitespace-pre-wrap">Download PDF</p>
      </div>
    </div>
  );
}

export default function ReskinCardTypeDownload() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Reskin Card type / Download">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Text />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}