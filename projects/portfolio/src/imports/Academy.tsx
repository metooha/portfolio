import imgImage1 from "figma:asset/42ca637efa8254de788bf106bc9cc80a6048f696.png";
import { imgImage } from "./svg-95dlw";

export default function Academy() {
  return (
    <div className="bg-[#0055a6] relative size-full overflow-hidden" data-name="academy">
      <div 
        className="absolute inset-[0_-21.15%_0_14.62%] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" 
        data-name="image" 
        style={{ 
          WebkitMaskImage: `url('${imgImage}')`,
          maskImage: `url('${imgImage}')`,
          WebkitMaskSize: '978px 780px',
          maskSize: '978px 780px',
          WebkitMaskPosition: '132px 0px',
          maskPosition: '132px 0px',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgImage1} />
      </div>
    </div>
  );
}