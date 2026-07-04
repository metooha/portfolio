import svgPaths from "./svg-8v2e2t4lkc";

export default function Hover() {
  return (
    <div className="bg-white relative rounded-[100px] size-full" data-name="hover">
      <div className="content-stretch flex gap-[2px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[inherit] size-full">
        <div className="h-[8.066px] relative shrink-0 w-[22px]" data-name="glasses">
          <div className="absolute inset-[-3.1%_-1.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 8.56648">
              <g id="glasses">
                <path d={svgPaths.p27d0f170} fill="black" />
                <path d={svgPaths.p10e7600} fill="var(--fill-0, #F9F9F9)" />
                <path d={svgPaths.p27d0f170} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
                <path d={svgPaths.p10e7600} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
              </g>
            </svg>
          </div>
        </div>
        <div className="css-g0mm18 flex flex-col font-['Calibre-R:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black text-center">
          <p className="css-ew64yg leading-[normal]">View Case Study</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#121212] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}