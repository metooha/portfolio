import svgPaths from "./svg-hozj6omt08";

function Image() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
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
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[57.029px]" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-[176.272px]" data-name="text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[57.029px]" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-[176.272px]" data-name="text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[57.029px]" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-[176.272px]" data-name="text" />
    </div>
  );
}

export default function ReskinCardTypeProduct() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[7px] items-start p-[16px] relative rounded-[10px] size-full" data-name="Reskin Card type / Product">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-full whitespace-pre-wrap">Product Info</p>
      <Image />
      <Text />
    </div>
  );
}
