function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[93.058px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.896px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[124.515px]" data-name="text" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-[104.854px]" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-[86.505px]">
        <p className="leading-[20px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

export default function ReskinCardTypeDownload() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[10px] size-full" data-name="Reskin Card type / Download">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[229.369px] whitespace-pre-wrap">Download</p>
      <Text />
      <Button />
    </div>
  );
}
