import imgImage1 from "figma:asset/2f6d2547a2c54fcfc9fc84ceb9be75a43ba5945b.png";
import imgImage2 from "figma:asset/01ed2e63949e78f30ef09cb6ad3a09342106da3f.png";
import imgImage3 from "figma:asset/ae435f5d7a6bc940609dbddbee23621273fd9da8.png";
import imgImage4 from "figma:asset/7657089aa80b7800fd50379f500bbf45525c51da.png";
import imgImage5 from "figma:asset/b4931e972c1439e31176052e18bfa071ed5535db.png";
import imgImage6 from "figma:asset/9daba2c9decd6e7ae9308c70feff4bc5e4828255.png";

function Row() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Row 1">
      <div className="h-[576px] relative rounded-[16px] shrink-0 w-full" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#2c6740] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[99.79%] left-[0.03%] max-w-none top-[0.16%] w-[165.24%]" src={imgImage1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[17px] items-start min-h-px min-w-px relative" data-name="Column 1">
      <div className="aspect-[325.3333435058594/267] relative rounded-[16px] shrink-0 w-full" data-name="Image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="" className="absolute h-[121.71%] left-[-0.1%] max-w-none top-[-2.32%] w-[99.65%]" src={imgImage2} />
        </div>
      </div>
      <div className="aspect-[325.3333435058594/267] relative rounded-[16px] shrink-0 w-full" data-name="Image 3">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#1c4633] inset-0 rounded-[16px]" />
          <img alt="" className="absolute max-w-none object-contain rounded-[16px] size-full" src={imgImage3} />
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="Column 2">
      <div className="aspect-[324/551] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage4} />
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[19px] items-start min-h-px min-w-px relative" data-name="Column 3">
      <div className="aspect-[325.33331298828125/178] relative rounded-[16px] shrink-0 w-full" data-name="Image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage5} />
      </div>
      <div className="aspect-[325.33331298828125/354] relative rounded-[16px] shrink-0 w-full" data-name="Image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage6} />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row 2">
      <Column />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column1 />
      </div>
      <Column2 />
    </div>
  );
}

function VisualGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Visual Grid">
      <Row />
      <Row1 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full" data-name="Section">
      <VisualGrid />
    </div>
  );
}