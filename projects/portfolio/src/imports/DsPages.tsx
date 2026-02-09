import imgImage2 from "figma:asset/d75491a4c72a43b99476fcf81b19e69ef0b030b2.png";
import imgImage3 from "figma:asset/1d3a95ad3efc75d8bf00c41fb3b8f16f412f4ca3.png";
import imgImage4 from "figma:asset/0056f1ef5de5a43f844716b00db48d1e61d92fd5.png";
import imgFormFields2X1 from "figma:asset/5691cc81eac26fa1c9bc5c2f84aa345d81085f66.png";
import imgButtonsDesktop1X from "figma:asset/c499e23cadaabdca183d8aa30b87f93bbbddcd5c.png";
import { imgImage1 } from "./svg-cylk9";

function MaskGroup() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute h-[971.188px] left-[1.31px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.312px_-0.602px] mask-size-[1180px_684.4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] top-[0.6px] w-[590px]" data-name="image 1" style={{ maskImage: `url('${imgImage1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <div className="absolute h-[838.7px] left-[197.98px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-197.978px_-0.602px] mask-size-[1180px_684.4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] top-[0.6px] w-[590px]" data-name="image 2" style={{ maskImage: `url('${imgImage1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <div className="absolute h-[709.058px] left-[394.64px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-394.645px_-0.602px] mask-size-[1180px_684.4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] top-[0.6px] w-[590px]" data-name="image 3" style={{ maskImage: `url('${imgImage1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
      <div className="absolute h-[1223.615px] left-[591.31px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-591.312px_-0.602px] mask-size-[1180px_684.4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] top-[0.6px] w-[590px]" data-name="Form Fields@2x 1" style={{ maskImage: `url('${imgImage1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFormFields2X1} />
      </div>
      <div className="absolute h-[1237.689px] left-[787.98px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-787.978px_-0.602px] mask-size-[1180px_684.4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] top-[0.6px] w-[972.844px]" data-name="Buttons - Desktop@1x" style={{ maskImage: `url('${imgImage1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgButtonsDesktop1X} />
      </div>
    </div>
  );
}

export default function DsPages() {
  return (
    <div className="relative size-full" data-name="DS pages">
      <MaskGroup />
    </div>
  );
}