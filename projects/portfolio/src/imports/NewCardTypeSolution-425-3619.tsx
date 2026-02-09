import svgPaths from "./svg-v8mjeai1ay";

function Image() {
  return (
    <div className="bg-[#ccc] h-[130px] max-h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.42%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 132">
          <path d={svgPaths.p301e9800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.346px] shrink-0 w-[120px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.664px] items-center justify-center px-[9px] py-[7px] relative shrink-0" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Read More</p>
      </div>
    </div>
  );
}

export default function NewCardTypeSolution() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[8px] size-full" data-name="New Card type / Solution">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[226.82px] whitespace-pre-wrap">Solution</p>
      <Image />
      <Text />
      <Button />
    </div>
  );
}