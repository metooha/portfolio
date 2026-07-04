function Count() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.3</p>
    </div>
  );
}

function CountTitle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative" data-name="Count + Title">
      <Count />
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-h-px min-w-px not-italic relative text-[32px] text-black whitespace-pre-wrap">Redesigning the Card component</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle />
    </div>
  );
}

export default function SectionHeadingFull() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative size-full" data-name="Section Heading / Full">
      <Title />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">We recognized that cards are essential, but there was a lack of consistent rules or patterns across various designs. We aimed to collaborate with the agency to clarify how cards should be used for the different paths a customer might take.</p>
    </div>
  );
}