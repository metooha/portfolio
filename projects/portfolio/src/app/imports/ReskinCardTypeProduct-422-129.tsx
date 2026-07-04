import imgDumpster from "figma:asset/263f4340731c99a287005fdd17c1fbf0666846a4.png";

function Image() {
  return (
    <div className="h-[180px] overflow-clip relative shrink-0 w-full" data-name="image">
      <div className="absolute h-[148.909px] left-0 top-[20.05px] w-[274.624px]" data-name="dumpster">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDumpster} />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px not-italic overflow-clip pb-[16px] px-[16px] relative w-[268px] whitespace-pre-wrap" data-name="Text">
      <p className="font-['DIN_OT:Medium',sans-serif] leading-[27px] relative shrink-0 text-[#065920] text-[20px] w-full">Temporary Roll-Off Dumpster</p>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px overflow-hidden relative text-[#67696d] text-[14px] text-ellipsis w-full">{`Temporary roll-off dumpsters are ideal for home renovations, construction sites, office cleanups and other large projects. We'll roll it off wherever you need, and pick it up whenever you're ready.`}</p>
    </div>
  );
}

export default function ReskinCardTypeProduct() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Reskin Card type / Product">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Image />
        <Text />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}
