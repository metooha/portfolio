import imgDesign from "figma:asset/840e6895ac600c62a54c6dbd6cbb35a7f6faa2e0.png";

export default function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] isolate items-center justify-center px-[250px] py-[294px] relative size-full" data-name="Heading">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#143526] text-[140px] text-center z-[2]">Waste Management</p>
      <div className="absolute inset-0 z-[1]" data-name="design">
        <img alt="" className="block max-w-none size-full" height="870" src={imgDesign} width="1740" />
      </div>
    </div>
  );
}