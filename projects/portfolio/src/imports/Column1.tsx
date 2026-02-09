import imgImage2 from "figma:asset/01ed2e63949e78f30ef09cb6ad3a09342106da3f.png";
import imgImage3 from "figma:asset/ae435f5d7a6bc940609dbddbee23621273fd9da8.png";

export default function Column() {
  return (
    <div className="content-stretch flex flex-col gap-[17px] items-start relative size-full" data-name="Column 1">
      <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] w-full" data-name="Image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="" className="absolute h-[121.71%] left-[-0.1%] max-w-none top-[-5.13%] w-[99.65%]" src={imgImage2} />
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] w-full" data-name="Image 3">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#1c4633] inset-0 rounded-[16px]" />
          <img alt="" className="absolute max-w-none object-contain rounded-[16px] size-full" src={imgImage3} />
        </div>
      </div>
    </div>
  );
}