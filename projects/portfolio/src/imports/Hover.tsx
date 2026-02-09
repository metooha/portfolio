import svgPaths from "./svg-8v2e2t4lkc";

interface HoverProps {
  cursorPosition: { x: number; y: number };
  isHoveringInteractive: boolean;
}

export default function Hover({ cursorPosition, isHoveringInteractive }: HoverProps) {
  return (
    <div 
      className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: isHoveringInteractive ? 'translate(10px, -50%)' : 'translate(-50%, -50%)'
      }}
    >
      <div className="relative">
        {/* Black dot - fades out when hovering */}
        <div 
          className="w-2 h-2 bg-black rounded-full transition-all duration-300 ease-out"
          style={{
            opacity: isHoveringInteractive ? 0 : 1,
            transform: isHoveringInteractive ? 'scale(0)' : 'scale(1)'
          }}
        ></div>
        
        {/* Hover pill - grows in when hovering */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            opacity: isHoveringInteractive ? 1 : 0,
            transform: isHoveringInteractive ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0)'
          }}
        >
          <div className="bg-white relative rounded-[100px] border border-[#121212] inline-flex">
            <div className="flex gap-2 items-center px-[8px] py-[4px] relative rounded-[inherit]">
              {/* Glasses icon from Figma */}
              <div className="h-[8.066px] relative shrink-0 w-[22px]">
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
              
              {/* Text */}
              <span className="text-[10px] font-medium text-black whitespace-nowrap leading-none">
                View Case Study
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}