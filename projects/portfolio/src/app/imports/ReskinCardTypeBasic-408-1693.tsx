import svgPaths from "./svg-1goctb6pgr";

function Group() {
  return (
    <div className="absolute bottom-1/2 left-[4.85%] right-[4.37%] top-[12.31%]">
      <div className="absolute inset-[-0.76%_-0.41%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 244.374 132.81">
          <g id="Group 13">
            <rect fill="var(--fill-0, #CCCCCC)" height="130.81" id="Rectangle 19" width="242.374" x="1.00022" y="1.00022" />
            <path d={svgPaths.p2795ca40} id="Vector 13" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p1fcf3c00} id="Vector 14" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[83.96%_56.31%_6.34%_4.85%]">
      <div className="absolute bg-[#eba900] inset-[83.96%_56.31%_6.34%_4.85%]" />
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[86.08%_59.71%_8.33%_8.25%] justify-center leading-[0] not-italic text-[14px] text-center text-white">
        <p className="leading-[20px] whitespace-pre-wrap">Read More</p>
      </div>
    </div>
  );
}

export default function ReskinCardTypeBasic() {
  return (
    <div className="relative size-full" data-name="Reskin Card type / Basic">
      <div className="absolute bg-white border-2 border-[#023625] border-solid inset-0 rounded-[10px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[4.1%_10.19%_87.69%_4.85%] leading-[24px] not-italic text-[16px] text-black whitespace-pre-wrap">Basic Info</p>
      <Group />
      <div className="absolute bg-[#eba900] inset-[55.22%_4.37%_38.81%_4.85%]" />
      <div className="absolute bg-[#ccc] inset-[63.06%_4.37%_33.21%_4.85%]" />
      <div className="absolute bg-[#ccc] inset-[69.78%_4.37%_26.49%_4.85%]" />
      <div className="absolute bg-[#ccc] inset-[76.49%_4.37%_19.78%_4.85%]" />
      <Group1 />
    </div>
  );
}