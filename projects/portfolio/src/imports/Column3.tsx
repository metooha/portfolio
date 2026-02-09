import imgImage5 from "figma:asset/b4931e972c1439e31176052e18bfa071ed5535db.png";
import imgImage6 from "figma:asset/9daba2c9decd6e7ae9308c70feff4bc5e4828255.png";

export default function Column() {
  return (
    <div className="content-stretch flex flex-col gap-[19px] items-start relative size-full" data-name="Column 3">
      <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] w-full" data-name="Image 5">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#ecedea] inset-0 rounded-[16px]" />
          <img alt="" className="absolute max-w-none object-contain rounded-[16px] size-full" src={imgImage5} />
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] w-full" data-name="Image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage6} />
      </div>
    </div>
  );
}