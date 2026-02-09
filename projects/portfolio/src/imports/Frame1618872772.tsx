import imgFrame1618872760 from "figma:asset/c9423276beed31b68e1be0c284a45ffd1e0089b3.png";
import imgImage44 from "figma:asset/e9a68d34a7854ac9adc0b232ac95fbd522f56fb1.png";
import imgScreencaptureWastemanagementAtlassianNetWikiSpacesTdcPages1427669170Sprint12Items202201171359312 from "figma:asset/1543b1584f9a55c881d0df49d6028a48eb6d3dbc.png";
import imgDesignToolKit from "figma:asset/5c2294758c15bcb4844e7e2b628586263ba4f5b3.png";
import { imgScreencaptureWastemanagementAtlassianNetWikiSpacesTdcPages1427669170Sprint12Items202201171359311 } from "./svg-wj67v";

function Count() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-[12px] relative rounded-[100px] shrink-0 w-[48px]" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-pre-wrap">1.0</p>
    </div>
  );
}

function CountTitle() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[40px] text-black">Approach</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative self-stretch" data-name="title">
      <CountTitle />
    </div>
  );
}

function SectionHeadingFull() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title />
    </div>
  );
}

function SectionHeadingVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">{`Internal Audit & Alignment `}</p>
    </div>
  );
}

function Count1() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">1</p>
    </div>
  );
}

function BodyBulletPoint() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count1 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">
        Ranked, story pointed, and aligned on level of effort for each component
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        Created a cataloging system to enable us to scale to new components
      </p>
    </div>
  );
}

function Count2() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">2</p>
    </div>
  );
}

function BodyBulletPoint1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count2 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Defined requirements and technical constraints and how our design system integrates with the AEM platform with eng team</p>
    </div>
  );
}

function Count3() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">3</p>
    </div>
  );
}

function BodyBulletPoint2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count3 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">
        Organized sprint planning and outlined the design and development tasks
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        Collaborated with the business, prioritized scope, and migration roadmap
      </p>
    </div>
  );
}

function ValueProp() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Value Prop">
      <div className="content-stretch flex flex-col gap-[32px] items-start pl-[24px] py-[24px] relative size-full">
        <SectionHeadingVertical />
        <BodyBulletPoint />
        <BodyBulletPoint1 />
        <BodyBulletPoint2 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute inset-[0_3.95%_-135.71%_26.53%]">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFrame1618872760} />
      <div className="absolute inset-[3.21%_6.14%_85.21%_22.14%]" data-name="image 44">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage44} />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_3.95%_-135.71%_26.53%]">
      <Frame />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[34.13%_30.48%_-25.4%_0]" data-name="Mask Group">
      <div className="absolute inset-[34.13%_30.48%_-273.66%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[438.673px_471.626px]" data-name="screencapture-wastemanagement-atlassian-net-wiki-spaces-TDC-pages-1427669170-Sprint-1-2-Items-2022-01-17-13_59_31 1" style={{ maskImage: `url('${imgScreencaptureWastemanagementAtlassianNetWikiSpacesTdcPages1427669170Sprint12Items202201171359311}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[105.12%] left-0 max-w-none top-[0.04%] w-[100.07%]" src={imgScreencaptureWastemanagementAtlassianNetWikiSpacesTdcPages1427669170Sprint12Items202201171359312} />
        </div>
      </div>
    </div>
  );
}

function Audit() {
  return (
    <div className="aspect-[613/502] flex-[1_0_0] min-h-px min-w-px overflow-clip relative" data-name="audit">
      <Group />
      <MaskGroup />
    </div>
  );
}

function Iamge() {
  return (
    <div className="content-stretch flex items-center pl-[16px] py-[16px] relative shrink-0 w-[647px]" data-name="iamge">
      <Audit />
    </div>
  );
}

function Row() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[32px] items-start justify-end relative rounded-[16px] shrink-0 w-full" data-name="Row 2">
      <ValueProp />
      <Iamge />
    </div>
  );
}

function SectionHeadingVertical1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center not-italic relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black">3rd Party Engagement</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">{`Collaborating with an external branding agency proved to be a significant hurdle. We had to thoroughly educate the team on our product's unique requirements, and intricacies to ensure they could produce effective assets and deliverables.`}</p>
    </div>
  );
}

function Count4() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">1</p>
    </div>
  );
}

function BodyBulletPoint3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count4 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Created a site map to align on where brand could provide those moments of joy</p>
    </div>
  );
}

function Count5() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">2</p>
    </div>
  );
}

function BodyBulletPoint4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count5 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Focused on form and function, but there were times where we had compromised on brand experience</p>
    </div>
  );
}

function Count6() {
  return (
    <div className="bg-[#207442] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-white">3</p>
    </div>
  );
}

function BodyBulletPoint5() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body / Bullet Point">
      <Count6 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Our Digital Tool Kit was a partnership to ensure that we scaled and aligned with our product design principles</p>
    </div>
  );
}

function Points() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="points">
      <BodyBulletPoint3 />
      <BodyBulletPoint4 />
      <BodyBulletPoint5 />
    </div>
  );
}

function ValueProp1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Value Prop">
      <div className="content-stretch flex flex-col gap-[40px] items-start pl-[24px] py-[24px] relative w-full">
        <SectionHeadingVertical1 />
        <Points />
      </div>
    </div>
  );
}

function DesignToolKit() {
  return (
    <div className="aspect-[1071/606] flex-[1_0_0] min-h-px min-w-px overflow-clip relative" data-name="Design Tool kit">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDesignToolKit} />
    </div>
  );
}

function Iamge1() {
  return (
    <div className="content-stretch flex items-center pl-[16px] py-[16px] relative self-stretch shrink-0 w-[647px]" data-name="iamge">
      <DesignToolKit />
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[32px] items-start justify-end relative rounded-[16px] shrink-0 w-full" data-name="Row 3">
      <ValueProp1 />
      <Iamge1 />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full">
      <SectionHeadingFull />
      <Row />
      <Row1 />
    </div>
  );
}