import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import svgPaths from "./svg-wznnermhqa";
import imgDesign from "figma:asset/840e6895ac600c62a54c6dbd6cbb35a7f6faa2e0.png";
import imgRectangle1189 from "figma:asset/e5eea785a9075e6a9a782597f2df6c7e9f7ba229.png";
import imgImage1 from "figma:asset/2f6d2547a2c54fcfc9fc84ceb9be75a43ba5945b.png";
import imgImage2 from "figma:asset/01ed2e63949e78f30ef09cb6ad3a09342106da3f.png";
import imgImage3 from "figma:asset/ae435f5d7a6bc940609dbddbee23621273fd9da8.png";
import imgImage4 from "figma:asset/7657089aa80b7800fd50379f500bbf45525c51da.png";
import imgImage5 from "figma:asset/b4931e972c1439e31176052e18bfa071ed5535db.png";
import imgImage6 from "figma:asset/9daba2c9decd6e7ae9308c70feff4bc5e4828255.png";
import imgImage7 from "figma:asset/1d3a95ad3efc75d8bf00c41fb3b8f16f412f4ca3.png";
import imgImage8 from "figma:asset/0056f1ef5de5a43f844716b00db48d1e61d92fd5.png";
import imgImage9 from "figma:asset/d75491a4c72a43b99476fcf81b19e69ef0b030b2.png";
import imgFormFields2X1 from "figma:asset/5691cc81eac26fa1c9bc5c2f84aa345d81085f66.png";
import imgButtonsDesktop1X from "figma:asset/c499e23cadaabdca183d8aa30b87f93bbbddcd5c.png";
import imgFrame1618872760 from "figma:asset/c9423276beed31b68e1be0c284a45ffd1e0089b3.png";
import imgImage44 from "figma:asset/e9a68d34a7854ac9adc0b232ac95fbd522f56fb1.png";
import imgConfluenceSprint from "@/assets/confluence_2-3fe677da-8b94-4efa-b24e-4b4757270117.png";
import imgVisualGrid from "@/assets/Visual_Grid-7c6d6221-a0b3-4106-8126-55307f393b4d.png";
import imgDesignToolKit from "figma:asset/5c2294758c15bcb4844e7e2b628586263ba4f5b3.png";
import imgScreencaptureWmUsEnBusinessBusinessWasteRecyclingPickup202108181424591 from "figma:asset/ed2ae4141ab5561496c0a6c107ed18d5e102b7dd.png";
import imgRecyclingTruck from "@/assets/recycling-truck.png";
import imgJimFish from "@/assets/jim-fish.png";
import imgRollOffDumpster from "@/assets/roll-off-dumpster.png";
import imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041 from "figma:asset/6bbca4fd1a566acd674aaec181de0fd2fc086952.png";
import imgScreencaptureWmUsEn202108041502201 from "figma:asset/27952ada7f25975e51134a2f048edb0959107527.png";
import imgBusinessNew1 from "figma:asset/c2a3fc3ff0661c4fa7b34f0e4bde6261049f911a.png";
import imgDSf1Landing2 from "figma:asset/31b8b3e4fb39d82564f6b9432163b6a147e6ef87.png";
import imgLandingPage1 from "figma:asset/75d4befc59540d329e85044451d2144c400cc32a.png";
import imgNaming from "figma:asset/2cce581fef4169a4e0ea0db9ad19572ac3d13045.png";
import img from "figma:asset/8034724294787bdbafe3c9f198ba11eacf27626e.png";
import imgImage10 from "figma:asset/c8b74e9dddd7b7bb51f4d8c7fb37719ff3f56b02.png";
import imgImage11 from "figma:asset/6d8490c5183c0f00dd0e14e2c5f615c1a10ffef3.png";
import imgWireframe1 from "figma:asset/8f0e182098872906bfe1ae2e5c8753c973347910.png";
import imgImage12 from "figma:asset/c7c28a598ab9b54ce9056e3326c89c874fab8870.png";
import imgDRecycling1011 from "figma:asset/5a6597134fabb5047bbb0740a11b4501bad4cc42.png";
import imgMedia from "figma:asset/2ac7dac262dd37996c65dea9244a9411494e14e9.png";
import img1 from "figma:asset/d95d6128004dd523fdf9c574a7aef72ec05e8edb.png";
import img2 from "figma:asset/e69489dc678588d3e807ed0c7f48c08b04428f4f.png";
import img3 from "figma:asset/4a3fbfc0e483c0ccda131e2be35d99d1264838e7.png";
import img4 from "figma:asset/0975a4a7a4a6141ed14f323433486bfc1af77110.png";
import img5 from "figma:asset/53d6618d1bc610c75225d5e74f18c74c0975afca.png";
import img6 from "figma:asset/0fa5d0d9e9bd2eaae0d13cfc6b7305022c9d931f.png";
import img7 from "figma:asset/6f7c0683a88fe4e8200308b2ed3cbd3b0b64908e.png";
import img8 from "figma:asset/7621bd34170586543bc0829c744ad1e6e93a06db.png";
import img9 from "figma:asset/7168889a87fe0056b8038edf0000379f6a0f6b1f.png";
import img10 from "figma:asset/a5b8c90c5705d23456a4a418a54bf915bc0eac57.png";
import img11 from "figma:asset/9b7126f6e96abe3facc304a8cb62a223eed35941.png";
import img12 from "figma:asset/43e55114019c896d94a84c731bea8b6d5dff3b9c.png";
import imgImage from "figma:asset/001d291f22afade81215402e903d9b0be1a47025.png";
import img13 from "figma:asset/3ebdf39cc93ed9e1929f1e27a5bb02dfad006461.png";
import imgImage1X1 from "figma:asset/e5e9da95dc09b362edcc60d34c5358100d3286c7.png";
import imgImage1X2 from "figma:asset/6e1cd41084fd1761ca3c5fbe94aa914439493a7a.png";
import img14 from "figma:asset/2fa2e71ac29c9f57aec21cd0209e2865a5087432.png";
import imgImage1X3 from "figma:asset/6c150fef48b7c771b00a541c37297e391e381daa.png";
import imgBgImage from "figma:asset/820104b475b6dfc0a80b49ce0c201e5520b6f8d1.png";
import imgImage13 from "figma:asset/afd1517432ff6b0d1e7dfac8ab249cd7febf6fdb.png";
import imgImage14 from "figma:asset/60517bb5d4264772ddfa220c9e934f45ec8064d6.png";
import imgImage15 from "figma:asset/f2344db1cddb93c6805f35ec907fa52c39dbb648.png";
import img15 from "figma:asset/50bb644888dc4234e9b0382069335e7dca31d0ea.png";
import imgImage16 from "figma:asset/ff1d90c42bca5468b4405f784ab5969c22407d8e.png";
import imgImage17 from "figma:asset/5edaa9e9c837323fdffa7dfee7d48872949316f7.png";
import imgImage18 from "figma:asset/2d9e1526d7ce7129379c711b4d0f2eb469038272.png";
import imgGrid4 from "figma:asset/32a2d36ebb137b59f3791578c76908934bea604d.png";
import imgImage111 from "figma:asset/f09a309a527da9a2a05dbe94b77f41b60519965f.png";
import { imgScreencaptureWastemanagementAtlassianNetWikiSpacesTdcPages1427669170Sprint12Items202201171359311 } from "./svg-bny7f";

function Heading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const PARALLAX_STRENGTH = 12;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    setParallax({
      x: x * PARALLAX_STRENGTH,
      y: y * PARALLAX_STRENGTH,
    });
  };

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className="h-[280px] sm:h-[400px] md:h-[560px] lg:h-[670px] xl:h-[870px] relative shrink-0 w-full overflow-hidden"
      data-name="Heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 z-[1] transition-transform duration-300 ease-out"
        data-name="design"
        aria-hidden="true"
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.08)`,
        }}
      >
        <img alt="" className="block w-full h-full min-h-full min-w-full object-cover object-center" src={imgDesign} />
      </div>
      <div className="relative z-[2] flex flex-col items-center justify-center size-full pointer-events-none">
        <div className="content-stretch flex flex-col gap-[10px] isolate items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[250px] py-12 sm:py-20 md:py-32 lg:py-40 xl:py-[294px] size-full pointer-events-auto">
          <motion.p
            className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative shrink-0 text-[#143526] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[140px] text-center"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
              mass: 0.8,
            }}
          >
            Waste Management
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow/left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow/left">
          <path d={svgPaths.p652cc80} fill="var(--fill-0, #4E4F4E)" id="arrowLeft" />
        </g>
      </svg>
    </div>
  );
}

function TextLinkBack() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Text Link / Back">
      <ArrowLeft />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Back</p>
    </div>
  );
}

function SideNav() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="bg-[#207442] h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Overview</p>
    </div>
  );
}

function SideNav1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Problem Space</p>
    </div>
  );
}

function SideNav2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Our Goals</p>
    </div>
  );
}

function SideNav3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Approach</p>
    </div>
  );
}

function SideNav4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">System Audit</p>
    </div>
  );
}

function SideNav5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">
        {`Information `}
        <br aria-hidden="true" />
        Architecture
      </p>
    </div>
  );
}

function SideNav6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Side Nav">
      <div className="h-[22px] shrink-0 w-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Compromises</p>
    </div>
  );
}

function SideNavigation() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Side Navigation">
      <SideNav />
      <SideNav1 />
      <SideNav2 />
      <SideNav3 />
      <SideNav4 />
      <SideNav5 />
      <SideNav6 />
    </div>
  );
}

function PageNavigation() {
  return (
    <div className="content-stretch flex flex-col gap-[58px] items-start pl-4 sm:pl-6 md:pl-12 lg:pl-[68px] pr-4 sm:pr-5 relative shrink-0 w-full md:w-auto" data-name="page navigation">
      <TextLinkBack />
      <SideNavigation />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[49px] items-start leading-[normal] not-italic relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] text-black">Waste Management</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4e4f4e] text-[16px]">Design Systems, Branding</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <div className="relative rounded-[16px] shrink-0 size-[48px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[146.99%] left-[-176.91%] max-w-none top-[-18.98%] w-[316.82%]" src={imgRectangle1189} />
          </div>
        </div>
      </div>
      <Frame43 />
    </div>
  );
}

function PageTitle() {
  return (
    <div className="content-stretch flex flex-col gap-6 md:gap-9 items-start relative shrink-0 w-full" data-name="Page Title">
      <Frame44 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight md:leading-[1.2] not-italic relative shrink-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[84px] text-black w-full max-w-[1200px]">Designing a scalable system for a digital rebrand</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-snug md:leading-[36px] max-w-[1200px] not-italic relative shrink-0 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] text-black w-full">In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation focused on improving customer self-service. I worked with the branding agency and led the systems work behind the rebrand, treating it as an opportunity to establish shared UX infrastructure rather than redesign individual pages.</p>
    </div>
  );
}

function ValueProp() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-[24px] h-full items-start min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap" data-name="Value Prop">
      <p className="leading-[normal] relative shrink-0 w-full">{`Role: Principal Product Designer `}</p>
      <p className="leading-[20px] relative shrink-0 w-full">
        {`Team: Partnered with product, engineering, `}
        <br aria-hidden="true" />
        and brand leadership
      </p>
    </div>
  );
}

function ValueProp1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-[24px] items-start min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap" data-name="Value Prop">
      <p className="leading-[normal] relative shrink-0 w-full">Scope: Company-wide rebrand across web platforms</p>
      <p className="leading-[20px] relative shrink-0 w-full">
        {`Focus: Platform UX patterns, information architecture, `}
        <br aria-hidden="true" />
        and shared systems
      </p>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[141px] items-start sm:items-center relative shrink-0 w-full" data-name="Row 1">
      <div className="flex flex-1 flex-row items-center self-stretch min-w-0">
        <ValueProp />
      </div>
      <ValueProp1 />
    </div>
  );
}

function Metrics() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="metrics">
      <Row1 />
    </div>
  );
}

function MetricsAndLinks() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Metrics and Links">
      <Metrics />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-1 flex-col gap-6 md:gap-9 items-start min-h-px min-w-0 w-full max-w-4xl lg:max-w-[1046px] pt-8 md:pt-16 lg:pt-[100px] relative" data-name="content">
      <PageTitle />
      <MetricsAndLinks />
    </div>
  );
}

function ProjectDetails() {
  return (
    <div className="relative shrink-0 w-full" data-name="project details">
      <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-12 items-start pr-4 sm:pr-6 md:pr-8 lg:pr-16 xl:pr-[280px] relative w-full">
        <PageNavigation />
        <Content />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex flex-col min-h-[240px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px] xl:h-[576px] items-start relative shrink-0 w-full" data-name="Row 1">
      <div className="flex-1 min-h-[200px] min-w-0 relative rounded-xl md:rounded-[16px] w-full overflow-hidden" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-xl md:rounded-[16px]">
          <div className="absolute bg-[#2c6740] inset-0 rounded-xl md:rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-[16px]">
            <img alt="" className="absolute h-full left-0 max-w-none top-0 w-full object-cover md:w-[146.5%] md:left-0" src={imgImage1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[17px] h-full items-start min-h-px min-w-px relative" data-name="Column 1">
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
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[19px] h-full items-start min-h-px min-w-px relative" data-name="Column 3">
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

function Row3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row 2">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column1 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column2 />
      </div>
    </div>
  );
}

function VisualGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Visual Grid">
      <Row2 />
      <Row3 />
    </div>
  );
}

function SectionHeadingVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[40px] text-black w-full">Problem Space</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] relative shrink-0 text-[#4e4f4e] text-[16px] w-full">Waste Management’s digital products had grown through rapid, project-based development, resulting in fragmented UI patterns, inconsistent information architecture, and limited reuse across teams. As self-service experiences expanded, these inconsistencies created friction for users and increased maintenance costs for the organization.</p>
    </div>
  );
}

function WmLogoWhiteCircle() {
  return (
    <div className="absolute inset-[0_0.06%_0.06%_0]" data-name="wm-logo-white-circle (1)">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.973 47.973">
        <g id="wm-logo-white-circle (1)">
          <g id="Oval" />
          <g id="Group">
            <path d={svgPaths.p3b10edc0} fill="var(--fill-0, #00693C)" id="Path" />
            <path d={svgPaths.p11add3a0} fill="var(--fill-0, #EBAB00)" id="Path_2" />
            <path clipRule="evenodd" d={svgPaths.p15b9a700} fill="var(--fill-0, #00693C)" fillRule="evenodd" id="Shape" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="overflow-clip relative rounded-[16px] shrink-0 size-[48px]" data-name="logo">
      <WmLogoWhiteCircle />
    </div>
  );
}

function CountTitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Logo />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Brand + IA Principles</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle />
    </div>
  );
}

function SectionHeadingFull() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[15%_20%_16.08%_20%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7998 33.082">
        <g id="Group 1410106519">
          <path d={svgPaths.p2ec749f0} fill="var(--fill-0, #006937)" id="Subtract" />
          <path d={svgPaths.p2c5e5840} fill="var(--fill-0, #EBAB00)" id="Polygon 3" />
        </g>
      </svg>
    </div>
  );
}

function Token() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Token">
      <Group17 />
    </div>
  );
}

function CountTitle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Token />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Design Tokens</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle1 />
    </div>
  );
}

function SectionHeadingFull1() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title1 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(color / type / spacing / effect / scale / breakpoints)</p>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[15%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.5996 33.5998">
        <g id="Group 695">
          <path d={svgPaths.pb41a000} fill="var(--fill-0, #006937)" id="Subtract" />
          <ellipse cx="16.799" cy="16.7997" fill="var(--fill-0, #EBAB00)" id="Ellipse 176" rx="10.5599" ry="10.56" />
          <ellipse cx="24.8061" cy="3.80625" fill="var(--fill-0, #EBAB00)" id="Ellipse 177" rx="3.80619" ry="3.80621" />
        </g>
      </svg>
    </div>
  );
}

function Atoms() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Atoms">
      <Group14 />
    </div>
  );
}

function CountTitle2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Atoms />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Atomic Components</p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle2 />
    </div>
  );
}

function SectionHeadingFull2() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title2 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(button / checkbox / radio / text field)</p>
      </div>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute inset-[10%_3.7%_7.5%_12.5%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.226 39.6001">
        <g id="Group 1410106520">
          <g id="Group 674">
            <path d={svgPaths.p27673000} fill="var(--fill-0, #006937)" id="Subtract" />
            <ellipse cx="9.12891" cy="26.7586" fill="var(--fill-0, #EBA900)" id="Ellipse 178" rx="4.99203" ry="4.9922" />
            <ellipse cx="12.292" cy="20.4287" fill="var(--fill-0, #EBA900)" id="Ellipse 179" rx="2.06813" ry="2.0682" />
          </g>
          <g id="Group 675">
            <path d={svgPaths.p127b3f00} fill="var(--fill-0, #006937)" id="Subtract_2" />
            <ellipse cx="4.99213" cy="4.9921" fill="var(--fill-0, #EBA900)" id="Ellipse 178_2" rx="4.99213" ry="4.9921" transform="matrix(0.630846 -0.775908 0.775887 0.630871 20.3603 27.4817)" />
            <ellipse cx="2.06817" cy="2.06816" fill="var(--fill-0, #EBA900)" id="Ellipse 179_2" rx="2.06817" ry="2.06816" transform="matrix(0.630846 -0.775908 0.775887 0.630871 22.3923 19.8656)" />
          </g>
          <g id="Group 676">
            <path d={svgPaths.p3b50bdc0} fill="var(--fill-0, #006937)" id="Subtract_3" />
            <ellipse cx="4.99219" cy="4.99204" fill="var(--fill-0, #EBA900)" id="Ellipse 178_3" rx="4.99219" ry="4.99204" transform="matrix(-0.258811 0.965928 -0.965924 -0.258827 24.2486 7.65002)" />
            <ellipse cx="2.06819" cy="2.06813" fill="var(--fill-0, #EBA900)" id="Ellipse 179_3" rx="2.06819" ry="2.06813" transform="matrix(-0.258811 0.965928 -0.965924 -0.258827 25.5142 15.0504)" />
            <ellipse cx="2.06819" cy="2.06813" fill="var(--fill-0, #EBA900)" id="Ellipse 180" rx="2.06819" ry="2.06813" transform="matrix(-0.258811 0.965928 -0.965924 -0.258827 16.9947 15.8139)" />
          </g>
          <ellipse cx="2.06818" cy="2.06815" fill="var(--fill-0, #EBA900)" id="Ellipse 179_4" rx="2.06818" ry="2.06815" transform="matrix(0.499987 0.866033 -0.866018 0.500013 17.215 23.7158)" />
          <ellipse cx="2.06813" cy="2.06819" fill="var(--fill-0, #EBA900)" id="Ellipse 180_2" rx="2.06813" ry="2.06819" transform="matrix(-0.965924 0.258827 -0.258811 -0.965928 22.8048 28.3049)" />
        </g>
      </svg>
    </div>
  );
}

function Molecules() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Molecules">
      <Group18 />
    </div>
  );
}

function CountTitle3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Molecules />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Molecular Components</p>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle3 />
    </div>
  );
}

function SectionHeadingFull3() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title3 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(navigation / cards / carousels / modules)</p>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute bottom-[20%] left-1/4 right-[23.08%] top-[20%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.9195 28.8">
        <g id="Group 1410106521">
          <path d={svgPaths.p29576900} fill="var(--fill-0, #EBA900)" id="Vector 85 (Stroke)" />
          <path d={svgPaths.p381ea100} fill="var(--fill-0, #006937)" id="Vector 86 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Templates() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Templates">
      <Group19 />
    </div>
  );
}

function CountTitle4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Templates />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Page Templates</p>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle4 />
    </div>
  );
}

function SectionHeadingFull4() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title4 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(e-commerce / marketing / accounts / services)</p>
      </div>
    </div>
  );
}

function MobilePhone() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="mobilePhone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="mobilePhone">
          <rect fill="var(--fill-0, #EBA900)" height="6" id="Rectangle 1190" width="14.4" x="15.6" y="31.2" />
          <path d={svgPaths.pc1b8300} fill="var(--fill-0, #006937)" id="mobilePhone (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function CountTitle5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <MobilePhone />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[18px] text-black">Surfaces</p>
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle5 />
    </div>
  );
}

function SectionHeadingFull5() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <div aria-hidden="true" className="absolute border-[#ccc] border-b border-solid inset-0 pointer-events-none" />
      <Title5 />
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[18px]">
        <p className="leading-[24px] whitespace-pre-wrap">(web / mobile / native / omni)</p>
      </div>
    </div>
  );
}

function DesignSystemsOverviewDiagram() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full" data-name="Design Systems Overview Diagram">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[32px] relative w-full">
        <SectionHeadingFull />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Shared foundations</p>
        <SectionHeadingFull1 />
        <SectionHeadingFull2 />
        <SectionHeadingFull3 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Governed layers</p>
        <SectionHeadingFull4 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Flexible outputs</p>
        <SectionHeadingFull5 />
      </div>
    </div>
  );
}

function CountTitle6() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">Our Goals</p>
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle6 />
    </div>
  );
}

function SectionHeadingFull6() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title6 />
    </div>
  );
}

function Pin() {
  return (
    <div className="h-[44px] relative shrink-0 w-[48px]" data-name="Pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 44">
        <g id="Pin">
          <path d={svgPaths.p4f2f100} fill="var(--fill-0, #1C8200)" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Revamp our website and define a migration plan for hundreds of local external pages.</p>
    </div>
  );
}

function ValueProp2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="Value Prop">
      <Pin />
      <Frame45 />
    </div>
  );
}

function Star() {
  return (
    <div className="h-[44px] relative shrink-0 w-[48px]" data-name="star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 44">
        <g id="star">
          <path clipRule="evenodd" d={svgPaths.p2d858e00} fill="var(--fill-0, #E8A73A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Establish a guiding framework and scalable system that accelerates our market entry.</p>
    </div>
  );
}

function ValueProp3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[150px] items-start min-h-px min-w-px relative" data-name="Value Prop">
      <Star />
      <Frame46 />
    </div>
  );
}

function Chat() {
  return (
    <div className="h-[44.34px] relative shrink-0 w-[48px]" data-name="chat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 44.3408">
        <g id="chat">
          <path d={svgPaths.p15d40980} fill="var(--fill-0, #8ABF00)" id="Chat" />
          <path d={svgPaths.p2038b100} fill="var(--fill-0, #003F2E)" id="Combined Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">Collaborate and execute with our product, brand, design, and engineering teams.</p>
    </div>
  );
}

function ValueProp4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[150px] items-start min-h-px min-w-px relative" data-name="Value Prop">
      <Chat />
      <Frame47 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-center flex flex-wrap gap-[16px] items-start pt-[16px] relative shrink-0 w-full">
      <ValueProp2 />
      <ValueProp3 />
      <ValueProp4 />
    </div>
  );
}

function SectionCardsWithValueProps() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards / With Value Props">
      <Frame53 />
    </div>
  );
}

function DsPages() {
  return (
    <div className="h-[684.4px] overflow-clip relative shrink-0 w-full" data-name="DS pages">
      <div className="absolute inset-[0.13%_57.03%_-2.12%_0.08%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.24%] left-0 max-w-none top-[-0.1%] w-full" src={imgImage7} />
        </div>
      </div>
      <div className="absolute inset-[0.09%_33.25%_-3.69%_16.75%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
      </div>
      <div className="absolute inset-[0.13%_25.17%_-0.07%_33.31%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[117.91%] left-[-0.08%] max-w-none top-[-0.03%] w-[100.27%]" src={imgImage9} />
        </div>
      </div>
      <div className="absolute inset-[0.13%_-0.08%_-0.07%_50.08%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="Form Fields@2x 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[178.89%] left-[0.05%] max-w-none top-[-0.04%] w-full" src={imgFormFields2X1} />
        </div>
      </div>
      <div className="absolute inset-[-1.48%_-49.24%_-0.07%_66.78%] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="Buttons - Desktop@1x">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[178.11%] left-0 max-w-none top-[-0.06%] w-[99.98%]" src={imgButtonsDesktop1X} />
        </div>
      </div>
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <SectionHeadingFull6 />
      <SectionCardsWithValueProps />
      <DsPages />
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section">
      <SectionHeadingVertical />
      <DesignSystemsOverviewDiagram />
      <Frame103 />
    </div>
  );
}

function Count() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-[12px] relative rounded-[100px] shrink-0 w-[48px]" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-pre-wrap">1.0</p>
    </div>
  );
}

function CountTitle7() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[40px] text-black">Approach</p>
    </div>
  );
}

function Title7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle7 />
    </div>
  );
}

function SectionHeadingFull7() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title7 />
    </div>
  );
}

function SectionHeadingVertical1() {
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

function ValueProp5() {
  return (
    <div className="flex flex-col gap-[32px] items-start pl-[24px] py-[24px] relative min-w-0 flex-1 max-w-[574px] w-full h-auto" data-name="Value Prop">
      <SectionHeadingVertical1 />
      <BodyBulletPoint />
      <BodyBulletPoint1 />
      <BodyBulletPoint2 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="absolute inset-[0_3.95%_-135.71%_26.53%]">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFrame1618872760} />
      <div className="absolute inset-[3.21%_6.14%_85.21%_22.14%]" data-name="image 44">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage44} />
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[0_3.95%_-135.71%_26.53%]">
      <Frame87 />
    </div>
  );
}

function MaskGroup() {
  return (
    <img
      alt="Sprint 1-2 Items - WM.com Atlassian tracker view (AEM Components timeline and Sprint 1-2 Items)"
      className="absolute inset-0 w-full h-full object-contain object-center rounded-[8px] pointer-events-none"
      src={imgConfluenceSprint}
    />
  );
}

function Audit() {
  return (
    <div className="aspect-[613/502] flex-[1_0_0] min-h-px min-w-px overflow-clip relative" data-name="audit" style={{ color: 'rgba(248, 248, 248, 1)' }}>
      <Group20 />
      <MaskGroup />
    </div>
  );
}

function Iamge() {
  return (
    <div className="content-stretch flex items-center pl-[16px] py-[16px] relative shrink-0 w-[574px]" data-name="iamge">
      <Audit />
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[#f8f8f8] content-start flex flex-wrap gap-[32px] items-start justify-end relative rounded-[16px] shrink-0 w-full" data-name="Row 2">
      <ValueProp5 />
      <Iamge />
    </div>
  );
}

function SectionHeadingVertical2() {
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

function ValueProp6() {
  return (
    <div className="flex flex-col gap-[40px] items-start pl-[24px] py-[24px] relative min-w-0 flex-1 max-w-[574px] w-full h-auto" data-name="Value Prop">
      <SectionHeadingVertical2 />
      <Points />
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

function Image() {
  return (
    <div className="content-stretch flex items-center pl-[16px] py-[16px] relative shrink-0 w-[574px]" data-name="image">
      <DesignToolKit />
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-[#f8f8f8] content-start flex flex-wrap gap-[32px] items-start relative rounded-[16px] shrink-0 w-full" data-name="Row 3">
      <ValueProp6 />
      <Image />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <SectionHeadingFull7 />
      <Row4 />
      <Row5 />
    </div>
  );
}

function Count7() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.1</p>
    </div>
  );
}

function CountTitle8() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count7 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">{`System Discovery & Audit`}</p>
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle8 />
    </div>
  );
}

function SectionHeadingFull8() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title8 />
    </div>
  );
}

function Count8() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function SectionHeadingVertical3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count8 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Audit and System Discovery</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">I conducted a system-level audit of existing pages, components, and patterns to identify redundancy, inconsistencies, and opportunities for consolidation. This work established a shared design vocabulary and informed which elements should become foundational system components.</p>
    </div>
  );
}

function ValueProp7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Value Prop">
      <SectionHeadingVertical3 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[376px] left-[-23px] top-0 w-[414px]" data-name="screencapture-wm-us-en-business-business-waste-recycling-pickup-2021-08-18-14_24_59 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[413.49%] left-0 max-w-none top-[-0.01%] w-full" src={imgScreencaptureWmUsEnBusinessBusinessWasteRecyclingPickup202108181424591} />
          </div>
        </div>
        <div className="absolute h-[26.747px] left-[239px] top-[196px] w-[80.497px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
        <div className="absolute h-[19px] left-[144px] top-[236px] w-[80px]">
          <div aria-hidden="true" className="absolute border-[#c324b8] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame89() {
  return (
    <div className="bg-[#1d8202] h-[40px] overflow-clip relative rounded-[4px] shrink-0 w-[205px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[16px] leading-[normal] left-[103px] not-italic text-[13px] text-center text-white top-[12px] w-[54px] whitespace-pre-wrap">Search</p>
    </div>
  );
}

function IconControls() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="icon/controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="icon/controls">
          <path clipRule="evenodd" d={svgPaths.p2bd8cb80} fill="var(--fill-0, #1D890A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">Learn More About National Accounts</p>
      <IconControls />
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center min-h-px min-w-px relative">
      <Image1 />
      <Frame89 />
      <Frame92 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white left-[189px] top-[201px] w-[44px]" data-name>
      <div className="content-stretch flex items-center justify-center overflow-clip px-px py-[4px] relative rounded-[inherit] w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1d8202] text-[4.758px] text-center">Sign Up Now</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#1d8202] border-[0.366px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame93() {
  return (
    <div className="absolute h-[320px] left-0 overflow-clip top-0 w-[387px]">
      <div className="absolute h-[312px] left-0 top-0 w-[357px]" data-name="screencapture-wm-us-en-inside-wm-sustainability-forum-2021-10-13-11_55_04 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[352.66%] left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041} />
        </div>
      </div>
      <Component />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame93 />
        <div className="absolute h-[23px] left-[183px] top-[197px] w-[58px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame91() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[103.5px] not-italic text-[#1d8202] text-[13px] text-center top-[12px]">Sign Up Now</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d8202] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center min-h-px min-w-px relative">
      <Image2 />
      <Frame91 />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[320px] relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[323px] left-0 top-0 w-[357px]" data-name="screencapture-wm-us-en-2021-08-04-15_02_20 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[241.2%] left-0 max-w-none top-0 w-[99.9%]" src={imgScreencaptureWmUsEn202108041502201} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[28px] left-[calc(50%-0.17px)] top-0 w-[387px]" data-name="screencapture-wm-us-en-inside-wm-sustainability-forum-2021-10-13-11_55_04 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[4257.14%] left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041} />
          </div>
        </div>
        <div className="absolute h-[20.124px] left-[66.74px] top-[109.28px] w-[66.741px]">
          <div aria-hidden="true" className="absolute border-[#ea09db] border-[1.274px] border-solid inset-[-0.637px] pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function IconControls1() {
  return (
    <div className="relative size-[13px]" data-name="icon/controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="icon/controls">
          <path clipRule="evenodd" d={svgPaths.p2bd8cb80} fill="var(--fill-0, #1D890A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">EXPLORE POPULAR SERVICES</p>
      <div className="flex items-center justify-center relative shrink-0 size-[13px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <IconControls1 />
        </div>
      </div>
    </div>
  );
}

function IconControls2() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="icon/controls">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="icon/controls">
          <path clipRule="evenodd" d={svgPaths.p2bd8cb80} fill="var(--fill-0, #1D890A)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1d890a] text-[13px] text-center">More About Your Transition to WM</p>
      <IconControls2 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center min-h-px min-w-px relative">
      <Image3 />
      <Frame90 />
      <Frame95 />
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame111 />
      <Frame110 />
      <Frame109 />
    </div>
  );
}

function VisualGrid1() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full" data-name="Visual Grid">
      <div className="content-stretch flex flex-col items-start px-[30px] py-[56px] relative w-full">
        <Frame112 />
      </div>
    </div>
  );
}

function ElementButtonPrimaryCenteredAllDefault() {
  return (
    <div className="bg-[#1c8200] content-stretch flex items-center justify-center min-h-[48px] py-3 px-[49px] relative rounded-[48px] shadow-[0px_0px_1.5px_0px_rgba(0,0,0,0.1),0px_6px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-[150px]" data-name="element/button/primary/centered-all/default">
      <div className="flex flex-col font-['Maax:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">Button</p>
      </div>
    </div>
  );
}

function Image4() {
  return (
    <div className="flex-1 min-w-0 min-h-0 aspect-[357/320] relative rounded-[8px]" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-0 overflow-hidden" data-name="Business new 1">
          <img alt="" className="absolute inset-0 w-full h-full min-w-0 min-h-0 object-cover object-center pointer-events-none" src={imgBusinessNew1} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame96() {
  return (
    <div className="absolute inset-0 overflow-hidden" data-name="D.SF.1 - Landing 2">
      <img alt="" className="absolute inset-0 w-full h-full min-w-0 min-h-0 object-cover object-center pointer-events-none" src={imgDSf1Landing2} />
    </div>
  );
}

function Image5() {
  return (
    <div className="flex-1 min-w-0 min-h-0 aspect-[357/320] relative rounded-[8px]" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame96 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Image6() {
  return (
    <div className="flex-1 min-w-0 min-h-0 aspect-[357/320] relative rounded-[8px]" data-name="Image">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-0 overflow-hidden" data-name="landing page 1">
          <img alt="" className="absolute inset-0 w-full h-full min-w-0 min-h-0 object-cover object-center pointer-events-none" src={imgLandingPage1} />
        </div>
        <div className="-translate-x-1/2 absolute h-[28px] left-1/2 top-0 w-[387px]" data-name="screencapture-wm-us-en-inside-wm-sustainability-forum-2021-10-13-11_55_04 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[4257.14%] left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScreencaptureWmUsEnInsideWmSustainabilityForum202110131155041} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1.769px_7.077px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame113() {
  return (
    <div className="flex gap-[24px] items-stretch relative w-full min-w-0">
      <Image4 />
      <Image5 />
      <Image6 />
    </div>
  );
}

function VisualGrid2() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shrink-0 w-full overflow-hidden" data-name="Visual Grid">
      <img
        alt="Button component with Primary Green and Primary Yellow paths to page templates: Business Waste & Recycling, Sustainability Forum, Modern Landfills"
        className="block w-full h-auto object-contain object-center"
        src={imgVisualGrid}
      />
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-end relative shrink-0 w-full" data-name="Row 2">
      <ValueProp7 />
      <VisualGrid1 />
      <VisualGrid2 />
    </div>
  );
}

function Count9() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function SectionHeadingVertical4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-fit max-w-[375px]" data-name="Section Heading / Vertical">
      <Count9 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-full min-w-0">{`Tokens & Foundations`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full min-w-0">
        {`Our branding foundations and hierarchy are built on a mix of primitive and semantic tokens. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        We have established a token taxonomy based on their semantic usage, which we continuously refine to broaden their applications, especially when dealing with other surfaces.
      </p>
    </div>
  );
}

function ValueProp8() {
  return (
    <div className="content-stretch flex w-full min-w-0 max-w-[350px] flex-1 flex-col items-start pb-[24px] relative shrink" data-name="Value Prop">
      <SectionHeadingVertical4 />
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[11.755px] size-full" data-name>
      <div aria-hidden="true" className="absolute border-[2.204px] border-[rgba(0,0,0,0.12)] border-solid inset-[-2.204px] pointer-events-none rounded-[13.959000000000001px]" />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.063px] items-center px-[22.126px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Bogle:Bold',sans-serif] justify-center leading-[0] min-h-[55.31477737426758px] min-w-px not-italic relative text-[#222] text-[17.632px]">
            <p className="leading-[38.72px] whitespace-pre-wrap">Card title</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Content Container">
      <div className="content-stretch flex flex-col items-start p-[22.126px] size-full" />
    </div>
  );
}

function LdCard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[11.755px] shadow-[0px_-1.383px_2.766px_0px_rgba(0,0,0,0.1),0px_1.383px_2.766px_1.383px_rgba(0,0,0,0.15)] size-full" data-name="[LD] Card">
      <Header />
      <ContentContainer />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#cb2586] text-[16px] text-right">Text</p>
    </div>
  );
}

function CircleFill() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill />
    </div>
  );
}

function PointerLine() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[70.79px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-7.53%_-5.33px_-1.41%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.1231 10.6667">
                    <path d={svgPaths.p390ca680} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pointer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Pointer">
      <PointerStart />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="flex-none rotate-90 size-full">
            <PointerLine />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCallout() {
  return (
    <div className="absolute content-stretch flex inset-[24.48%_69.71%_69.27%_3.09%] items-center justify-center" data-name="🛠️ Spec Callout">
      <Content1 />
      <Pointer />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#cb2586] text-[16px] text-right">surface</p>
    </div>
  );
}

function CircleFill1() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill1 />
    </div>
  );
}

function PointerLine1() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[136.484px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-3.91%_-5.33px_-0.73%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142.817 10.6667">
                    <path d={svgPaths.p16be7b80} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pointer1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Pointer">
      <PointerStart1 />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="flex-none rotate-90 size-full">
            <PointerLine1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCallout1() {
  return (
    <div className="absolute content-stretch flex inset-[37.76%_53.63%_55.99%_3.09%] items-center justify-center" data-name="🛠️ Spec Callout">
      <Content2 />
      <Pointer1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#cb2586] text-[16px] text-right">background</p>
    </div>
  );
}

function CircleFill2() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill2 />
    </div>
  );
}

function PointerLine2() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[103.484px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-5.15%_-5.33px_-0.97%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.817 10.6667">
                    <path d={svgPaths.p24dce800} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pointer2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Pointer">
      <PointerStart2 />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="flex-none rotate-90 size-full">
            <PointerLine2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCallout2() {
  return (
    <div className="absolute content-stretch flex inset-[54.17%_53.63%_39.58%_3.09%] items-center justify-center" data-name="🛠️ Spec Callout">
      <Content3 />
      <Pointer2 />
    </div>
  );
}

function Tokens() {
  return (
    <div className="aspect-[647/384] flex-[1_0_0] min-h-px min-w-px relative" data-name="tokens">
      <div className="absolute flex inset-[14.17%_0.08%_4.07%_15.86%] items-center justify-center">
        <div className="-rotate-30 flex-none h-[334.801px] scale-y-87 skew-x-30 w-[206.805px]">
          <Component1 />
        </div>
      </div>
      <div className="absolute flex inset-[0_26.69%_53.57%_25.57%] items-center justify-center">
        <div className="-rotate-30 flex-none h-[133.2px] scale-y-87 skew-x-30 w-[174.384px]">
          <LdCard />
        </div>
      </div>
      <SpecCallout />
      <SpecCallout1 />
      <SpecCallout2 />
    </div>
  );
}

function Image7() {
  return (
    <div className="content-stretch flex min-w-0 max-w-[574px] flex-1 items-center pl-[16px] py-[16px] relative shrink" data-name="Image">
      <Tokens />
    </div>
  );
}

function Row7() {
  return (
    <div className="content-start flex flex-nowrap gap-[24px] items-start justify-start relative min-w-0 w-full" data-name="Row 1">
      <ValueProp8 />
      <Image7 />
    </div>
  );
}

function SectionCardsVertical() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards / Vertical">
      <SectionHeadingFull8 />
      <Row6 />
      <Row7 />
      <div className="aspect-[1180/347] relative rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="naming">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="" className="absolute h-[113.9%] left-0 max-w-none top-[-13.54%] w-full" src={imgNaming} />
        </div>
      </div>
    </div>
  );
}

function Count10() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.2</p>
    </div>
  );
}

function CountTitle9() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count10 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black">Component Groups</p>
    </div>
  );
}

function Title9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle9 />
    </div>
  );
}

function SectionHeadingFull9() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title9 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Created with reuse in mind rather than customization, our components are organized to assist content designers. This structure helps users easily understand calls to action and how to interact with the pages.</p>
    </div>
  );
}

function Labels() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-start justify-between leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[17px] w-full" data-name="labels">
      <p className="relative shrink-0">{`Action & Conversion`}</p>
      <p className="relative shrink-0 text-right">{`Brand & Story Telling`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Global & Navigation`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Heroes & Headers`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Story Telling</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Informational</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Grids & Pathing`}</p>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-center flex flex-wrap gap-[35px] items-center relative shrink-0 w-full" data-name="row 2">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Library of Cards</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">{`Action & Conversion`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Forms</p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Support</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#023625] flex-[1_0_0] min-h-px min-w-px relative rounded-[6.271px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[15.049px] py-[24px] relative w-full">
          <p className="flex-[1_0_0] font-['Calibre-R:Semibold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#e8f733] text-[12px] text-center whitespace-pre-wrap">Integrations</p>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-center flex flex-wrap gap-[35px] items-center relative shrink-0 w-full" data-name="row 1">
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function ComponentGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pb-[32px] relative shrink-0 w-full" data-name="component group">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-7.36px_-0.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1182 14.7279">
            <path d={svgPaths.p1c7c4b00} fill="var(--stroke-0, #006937)" id="Vector 12" />
          </svg>
        </div>
      </div>
      <Row8 />
      <Row9 />
    </div>
  );
}

function GroupTypes() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="group types">
      <SectionHeadingFull9 />
      <Labels />
      <ComponentGroup />
    </div>
  );
}

function Count11() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">1.3</p>
    </div>
  );
}

function CountTitle10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Count + Title">
      <Count11 />
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-h-px min-w-px not-italic relative text-[32px] text-black whitespace-pre-wrap">Redesigning the Card component</p>
    </div>
  );
}

function Title10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle10 />
    </div>
  );
}

function SectionHeadingFull10() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title10 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">We recognized that cards are essential, but there was a lack of consistent rules or patterns across various designs. We aimed to collaborate with the agency to clarify how cards should be used for the different paths a customer might take.</p>
    </div>
  );
}

function Count12() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function CountTitle11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Count + Title">
      <Count12 />
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-h-px min-w-px not-italic relative text-[20px] text-black whitespace-pre-wrap">Reskin existing card types</p>
    </div>
  );
}

function Title11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle11 />
    </div>
  );
}

function SectionHeadingFull11() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title11 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Most of our existing cards served a few basic purposes, information about services and products, downloadable information, and general information.</p>
    </div>
  );
}

function Image8() {
  return (
    <div className="bg-[#ccc] h-[130px] max-h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function TextLine() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text line">
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" />
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

function HoverRevealCard({
  frontContent,
  backContent,
  dataName,
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  dataName: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="flex min-h-0 min-w-0 flex-[1_0_0] relative [perspective:1000px] self-stretch"
      data-name={dataName}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Front - wireframe (first image) */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="size-full">{frontContent}</div>
        </div>
        {/* Back - real design (second image) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] [transform-style:preserve-3d]">
          <div className="size-full">{backContent}</div>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeBasicContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full not-italic relative shrink-0 text-[16px] text-black w-[min-content] whitespace-pre-wrap">Basic Info</p>
        <Image8 />
        <TextLine />
        <Button />
      </div>
    </div>
  );
}

function ReskinCardTypeBasicBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
      <div className="content-stretch flex flex-col size-full">
        <div className="relative h-[140px] min-h-[140px] w-full shrink-0 overflow-hidden bg-[#e5e7e5]">
          <img alt="Recycling" className="absolute inset-0 size-full object-cover object-center" src={imgRecyclingTruck} />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative flex-1 min-h-0">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic text-[#1d890a] text-[13px] tracking-widest uppercase">Recycling</p>
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full">The Dangers of &quot;Wishcycling&quot;</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic text-[#67696d] text-[14px] line-clamp-2 w-full">By Susan Robinson, Director of P...</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#1d890a] text-[12px] underline decoration-solid [text-decoration-skip-ink:none]">Keep Reading</p>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeBasic() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeBasicContent />}
      backContent={<ReskinCardTypeBasicBack />}
      dataName="Reskin Card type / Basic"
    />
  );
}

function Image9() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="Text" />
      <div className="bg-[#eba900] h-[12.948px] shrink-0 w-[127.4px]" data-name="Text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="Text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="Text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="Text" />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#eba900] content-stretch flex min-w-0 h-[33.664px] flex-1 items-center justify-center px-[9px] py-[7px] relative" data-name="button 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Learn More</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#eba900] content-stretch flex min-w-0 h-[33.664px] flex-1 items-center justify-center px-[9px] py-[7px] relative" data-name="button 1">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">View Video</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex min-w-0 w-full gap-[10px] items-stretch relative" data-name="buttons">
      <Button2 />
      <Button1 />
    </div>
  );
}

function ReskinCardTypeProfileContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[226.82px] whitespace-pre-wrap">Profile</p>
        <Image9 />
        <Text />
        <Buttons />
      </div>
    </div>
  );
}

function ReskinCardTypeProfileBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
      <div className="content-stretch flex flex-col size-full">
        <div className="relative h-[140px] min-h-[140px] w-full shrink-0 overflow-hidden bg-[#e5e5e5]">
          <img alt="Jim Fish" className="absolute inset-0 size-full object-cover object-center" src={imgJimFish} />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative flex-1 min-h-0">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full">Jim Fish</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#67696d] text-[16px] w-full line-clamp-2">Prospects, technology and the new HR...</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#1d890a] text-[12px] underline decoration-solid [text-decoration-skip-ink:none]">Listen Now</p>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeProfile() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeProfileContent />}
      backContent={<ReskinCardTypeProfileBack />}
      dataName="Reskin Card type / Profile"
    />
  );
}

function Image10() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text1() {
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

function ReskinCardTypeProductContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[7px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-full whitespace-pre-wrap">Product Info</p>
        <Image10 />
        <Text1 />
      </div>
    </div>
  );
}

function ReskinCardTypeProductBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
      <div className="content-stretch flex flex-col size-full">
        <div className="relative h-[140px] min-h-[140px] w-full shrink-0 overflow-hidden bg-white">
          <img alt="Roll-off dumpster" className="absolute inset-0 size-full object-contain object-center" src={imgRollOffDumpster} />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative flex-1 min-h-0">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full">Temporary Roll-Off Dumpster</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#67696d] text-[14px] w-full line-clamp-3">Temporary roll-off dumpsters are ideal for home renovations, construction sites, office cleanup...</p>
        </div>
      </div>
    </div>
  );
}

function ReskinCardTypeProduct() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeProductContent />}
      backContent={<ReskinCardTypeProductBack />}
      dataName="Reskin Card type / Product"
    />
  );
}

function Text2() {
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

function Button3() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-[104.854px]" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-[86.505px]">
        <p className="leading-[20px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function ReskinCardTypeDownloadContent() {
  return (
    <div className="bg-white border-2 border-[#023625] border-solid rounded-[8px] overflow-hidden size-full min-h-0 min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full min-h-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[229.369px] whitespace-pre-wrap">Download</p>
        <Text2 />
        <Button3 />
      </div>
    </div>
  );
}

function ReskinCardTypeDownloadBack() {
  return (
    <div className="bg-white size-full min-h-0 min-w-0 relative rounded-[8px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic text-[#1d890a] text-[13px] tracking-widest uppercase">Download</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic text-[#4e4f58] text-[20px] w-full">Our Position on Plastic</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#67696d] text-[14px] w-full flex-1 min-h-0">Learn how Waste Management is responding to recent shifts in the global plastics market.</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#1d890a] text-[12px] underline decoration-solid [text-decoration-skip-ink:none] inline-flex items-center gap-[6px]">
          Download PDF
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
            <path d="M8 11V3M8 11L5 8M8 11L11 8M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </div>
  );
}

function ReskinCardTypeDownload() {
  return (
    <HoverRevealCard
      frontContent={<ReskinCardTypeDownloadContent />}
      backContent={<ReskinCardTypeDownloadBack />}
      dataName="Reskin Card type / Download"
    />
  );
}

function Frame114() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row gap-[16px] items-stretch">
      <ReskinCardTypeBasic />
      <ReskinCardTypeProfile />
      <ReskinCardTypeProduct />
      <ReskinCardTypeDownload />
    </div>
  );
}

function CardTypes() {
  return (
    <div className="bg-[#f8f8f8] relative h-[400px] min-h-[400px] rounded-[8px] shrink-0 w-full" data-name="Card types 2">
      <div className="flex h-full w-full flex-row items-stretch">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-stretch overflow-hidden p-[32px]">
          <Frame114 />
        </div>
      </div>
    </div>
  );
}

function SectionCards1() {
  return (
    <div className="content-stretch flex flex-col gap-[57px] items-start relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull11 />
      <CardTypes />
    </div>
  );
}

function Count13() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function CountTitle12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count13 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">New card types</p>
    </div>
  );
}

function Title12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle12 />
    </div>
  );
}

function SectionHeadingFull12() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title12 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">These cards are reusable, configurable components designed for consistency, scalability, and continuous optimization based on user needs and performance</p>
    </div>
  );
}

function Image11() {
  return (
    <div className="bg-[#ccc] h-[130px] max-h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.346px] shrink-0 w-[120px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.664px] items-center justify-center px-[9px] py-[7px] relative shrink-0" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Read More</p>
      </div>
    </div>
  );
}

function NewCardTypeSolution() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8px]" data-name="New Card type / Solution">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[226.82px] whitespace-pre-wrap">Solution</p>
        <Image11 />
        <Text3 />
        <Button4 />
      </div>
    </div>
  );
}

function Image12() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[238px]" data-name="text">
      <div className="bg-[#ccc] h-[13.346px] shrink-0 w-[120px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.716px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[12.948px] shrink-0 w-full" data-name="text" />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.664px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-[103.689px]" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
        <p className="leading-[20px]">Learn More</p>
      </div>
    </div>
  );
}

function NewCardTypeService() {
  return (
    <div className="aspect-[300/390] bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]" data-name="New Card type / Service">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[226.82px] whitespace-pre-wrap">Service</p>
        <Image12 />
        <Text4 />
        <Button5 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#eba900] h-[13.06px] shrink-0 w-[79.951px]" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[124.515px]" data-name="text" />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-[104.854px]" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-[86.505px]">
        <p className="leading-[20px] whitespace-pre-wrap">Learn More</p>
      </div>
    </div>
  );
}

function NewCardTypeFaq() {
  return (
    <div className="aspect-[300/390] bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]" data-name="New Card type / FAQ">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[229.369px] whitespace-pre-wrap">FAQ</p>
        <Text5 />
        <Button6 />
      </div>
    </div>
  );
}

function Image13() {
  return (
    <div className="bg-[#ccc] h-[130px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="image">
      <div className="absolute inset-[-0.77%_-0.43%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237 132">
          <path d={svgPaths.p288fadf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="text">
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[93.058px]" data-name="text" />
      <div className="bg-[#eba900] h-[20.896px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-full" data-name="text" />
      <div className="bg-[#ccc] h-[13.06px] shrink-0 w-[124.515px]" data-name="text" />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#eba900] content-stretch flex h-[33.955px] items-center justify-center px-[9px] py-[7px] relative shrink-0 w-[104.854px]" data-name="button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.59px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center w-[86.505px]">
        <p className="leading-[20px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function NewCardTypeContentCard() {
  return (
    <div className="aspect-[300/390] bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]" data-name="New Card type / Content Card">
      <div aria-hidden="true" className="absolute border-2 border-[#023625] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-black w-[229.369px] whitespace-pre-wrap">Content Card</p>
        <Image13 />
        <Text6 />
        <Button7 />
      </div>
    </div>
  );
}

function Frame115() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row gap-[16px] items-stretch">
      <ReskinCardTypeBasic />
      <ReskinCardTypeProfile />
      <ReskinCardTypeProduct />
      <ReskinCardTypeDownload />
    </div>
  );
}

function CardTypes1() {
  return (
    <div className="bg-[#f8f8f8] relative h-[400px] min-h-[400px] rounded-[8px] shrink-0 w-full" data-name="Card types 3">
      <div className="flex h-full w-full flex-row items-stretch">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-stretch overflow-hidden p-[32px]">
          <Frame115 />
        </div>
      </div>
    </div>
  );
}

function SectionCards2() {
  return (
    <div className="content-stretch flex flex-col gap-[57px] items-start relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull12 />
      <CardTypes1 />
    </div>
  );
}

function ComponentGroups() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="component groups">
      <GroupTypes />
      <SectionHeadingFull10 />
      <SectionCards1 />
      <SectionCards2 />
    </div>
  );
}

function Count14() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function CountTitle13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count14 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Created for easy reuse and personalized customization</p>
    </div>
  );
}

function Title13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle13 />
    </div>
  );
}

function SectionHeadingFull13() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] h-[32px] items-start relative shrink-0 w-[563px]" data-name="Section Heading / Full">
      <Title13 />
    </div>
  );
}

function Tag1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Tag">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[16px] left-[13.11%] not-italic right-[16.51%] text-[#024731] text-[14px] top-[calc(50%-8px)]">Home</p>
      <div className="absolute border border-[#7ab800] border-solid inset-0 rounded-[4px]" data-name="Rectangle" />
    </div>
  );
}

function Tag() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[370px] w-[54px]" data-name="Tag">
      <Tag1 />
    </div>
  );
}

function Image14() {
  return (
    <div className="absolute h-[164px] left-[60px] right-[60px] top-0" data-name="image">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155.8 155.8">
          <circle cx="77.9" cy="77.9" fill="var(--fill-0, #EFEFE4)" id="container" r="77.9" />
        </svg>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-[69.79%] top-0" src={img} />
      </div>
    </div>
  );
}

function ComponentsNewSp103ProductCarouselServiceCardTablet() {
  return (
    <div className="h-[470px] relative shrink-0 w-[284px]" data-name="components/new/sp1/03-product_carousel/service-card/tablet">
      <div className="absolute bottom-0 h-[388px] left-0 right-0" data-name="container">
        <div className="absolute inset-[-0.52%_-1.41%_-1.55%_-1.41%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292 396">
            <g filter="url(#filter0_dd_359_3834)" id="container">
              <path clipRule="evenodd" d="M288 2V390H4V2H288Z" fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="396" id="filter0_dd_359_3834" width="292" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_359_3834" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.3" />
                <feGaussianBlur stdDeviation="0.25" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_359_3834" mode="normal" result="effect2_dropShadow_359_3834" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_359_3834" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[52px] decoration-solid font-['Maax:Regular',sans-serif] leading-[20px] left-[8.45%] not-italic right-[62.68%] text-[#024731] text-[16px] tracking-[-0.16px] translate-y-full underline">Learn More</p>
      <Tag />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#4f4f59] text-[16px] top-[266px] w-[244px] whitespace-pre-wrap">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[28px] left-[24px] not-italic text-[24px] text-black top-[202px] tracking-[-0.96px] w-[244px] whitespace-pre-wrap">
        {`Home Waste & `}
        <br aria-hidden="true" />
        Recycling
      </p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[14px] left-[24px] not-italic text-[#024731] text-[14px] top-[180px] tracking-[1.4px] uppercase">Service</p>
      <Image14 />
    </div>
  );
}

function Specimen() {
  return (
    <div className="bg-[#024731] relative rounded-[12px] w-full max-w-[426px] aspect-[300/390] mx-auto z-[1]" data-name="specimen">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[32px] relative size-full font-medium">
          <ComponentsNewSp103ProductCarouselServiceCardTablet />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#9747ff] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Props() {
  return (
    <div className="content-stretch flex flex-none flex-col items-center justify-center min-h-[640px] min-w-0 relative w-[400px] pl-0" data-name="props">
      <Specimen />
    </div>
  );
}

function FigmaIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Figma Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Figma Icon">
          <path d={svgPaths.p3b53aa00} id="Instance" stroke="var(--stroke-0, #9747FF)" />
        </g>
      </svg>
    </div>
  );
}

function PropertyType() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip p-[2px] relative shrink-0" data-name="Property type">
      <FigmaIcon />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center max-w-[270px] py-[4px] relative rounded-[8px] shrink-0" data-name="content">
      <PropertyType />
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">[SP1] 03 - Product Card</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107aed80} fill="var(--fill-0, #2E2F32)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[282px]" data-name="component">
      <Content4 />
      <Icon />
    </div>
  );
}

function FigmaIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Figma Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Figma Icon">
          <g id="Vector">
            <path d={svgPaths.p378a5c30} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p813a300} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p18081380} fill="var(--fill-0, #9747FF)" />
            <path d={svgPaths.p24834200} fill="var(--fill-0, #9747FF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function More() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="More">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="More">
          <path clipRule="evenodd" d={svgPaths.p25159800} fill="var(--fill-0, #2E2F32)" fillRule="evenodd" id="32" />
        </g>
      </svg>
    </div>
  );
}

function RightControls() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0" data-name="right controls">
      <FigmaIcon1 />
      <More />
    </div>
  );
}

function ComponentName() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Component name">
      <Component2 />
      <RightControls />
    </div>
  );
}

function Description() {
  return (
    <div className="relative shrink-0 w-full" data-name="Description">
      <div className="content-stretch flex items-start pl-[32px] relative w-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#74767c] text-[16px] text-ellipsis whitespace-nowrap">Card component used in carousels or high value placement for products.</p>
      </div>
    </div>
  );
}

function NameDescription() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Name + Description">
      <ComponentName />
      <Description />
    </div>
  );
}

function PropertyName() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Eyebrow</p>
    </div>
  );
}

function Switch1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch1 />
    </div>
  );
}

function RightControl() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch />
    </div>
  );
}

function FigmaProperty() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName />
      <RightControl />
    </div>
  );
}

function Child() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Eyebrow</p>
    </div>
  );
}

function RightControl1() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#2e2f32] text-[16px] whitespace-pre-wrap">Service</p>
    </div>
  );
}

function FigmaProperty1() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName1 />
      <RightControl1 />
    </div>
  );
}

function PropertyName2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Title</p>
    </div>
  );
}

function RightControl2() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">
        {`Home Waste & `}
        <br aria-hidden="true" />
        Recycling
      </p>
    </div>
  );
}

function FigmaProperty2() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName2 />
      <RightControl2 />
    </div>
  );
}

function PropertyName3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Body</p>
    </div>
  );
}

function Switch3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch2() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch3 />
    </div>
  );
}

function RightControl3() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch2 />
    </div>
  );
}

function FigmaProperty3() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName3 />
      <RightControl3 />
    </div>
  );
}

function Child1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Description</p>
    </div>
  );
}

function RightControl4() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
    </div>
  );
}

function FigmaProperty4() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName4 />
      <RightControl4 />
    </div>
  );
}

function PropertyName5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Tags</p>
    </div>
  );
}

function Switch5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch4() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch5 />
    </div>
  );
}

function RightControl5() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch4 />
    </div>
  );
}

function FigmaProperty5() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName5 />
      <RightControl5 />
    </div>
  );
}

function Child2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Tag patterns</p>
    </div>
  );
}

function FigmaIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Figma Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Figma Icon">
          <path d={svgPaths.p3b53aa00} id="Instance" stroke="var(--stroke-0, #9747FF)" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip p-[2px] relative shrink-0" data-name="Icon">
      <FigmaIcon2 />
    </div>
  );
}

function LeftControls() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="left controls">
      <Icon1 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2e2f32] text-[16px] text-ellipsis whitespace-nowrap">2 Tags</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d={svgPaths.p3a65ce00} fill="var(--fill-0, #74767C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function RightControl6() {
  return (
    <div className="content-stretch flex items-center justify-between pl-[4px] pr-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[175px]" data-name="Right control">
      <div aria-hidden="true" className="absolute border border-[#f5f6fa] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <LeftControls />
      <Icon2 />
    </div>
  );
}

function FigmaProperty6() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName6 />
      <RightControl6 />
    </div>
  );
}

function PropertyName7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Link</p>
    </div>
  );
}

function Switch7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44px]" data-name="switch">
      <div className="absolute inset-[-12.5%_-4.55%_-8.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 29">
          <g id="switch">
            <path d={svgPaths.p148018f0} fill="var(--fill-0, #0860F6)" />
            <g filter="url(#filter0_dd_451_5657)" id="Ellipse">
              <circle cx="32" cy="15" fill="var(--fill-0, white)" r="10" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29" id="filter0_dd_451_5657" width="28" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect1_dropShadow_451_5657" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5657" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5657" mode="normal" result="effect2_dropShadow_451_5657" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5657" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Switch6() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0" data-name="Switch">
      <Switch7 />
    </div>
  );
}

function RightControl7() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <Switch6 />
    </div>
  );
}

function FigmaProperty7() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName7 />
      <RightControl7 />
    </div>
  );
}

function Child3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Child">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Child">
          <path d={svgPaths.p3126fb80} fill="var(--fill-0, #2E2F32)" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function PropertyName8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px py-[4px] relative rounded-[8px]" data-name="Property Name">
      <Child3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#74767c] text-[16px]">Link</p>
    </div>
  );
}

function RightControl8() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[175px]" data-name="Right control">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#2e2f32] text-[16px] whitespace-pre-wrap">Learn More</p>
    </div>
  );
}

function FigmaProperty8() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <PropertyName8 />
      <RightControl8 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d={svgPaths.p3a65ce00} fill="var(--fill-0, #74767C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InstanceName() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="instance name">
      <Icon3 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#74767c] text-[16px] text-ellipsis whitespace-nowrap">Tag Patterns</p>
    </div>
  );
}

function NestedComponent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px py-[8px] relative" data-name="Nested component">
      <InstanceName />
    </div>
  );
}

function FigmaProperty9() {
  return (
    <div className="content-stretch flex gap-[32px] h-[40px] items-center py-[4px] relative shrink-0 w-full" data-name="Figma Property">
      <NestedComponent />
    </div>
  );
}

function Props2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="props">
      <FigmaProperty />
      <FigmaProperty1 />
      <FigmaProperty2 />
      <FigmaProperty3 />
      <FigmaProperty4 />
      <FigmaProperty5 />
      <FigmaProperty6 />
      <FigmaProperty7 />
      <FigmaProperty8 />
      <FigmaProperty9 />
    </div>
  );
}

function DesignPanelProperties() {
  return (
    <div className="absolute left-0 top-0 bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] rounded-[8px] shadow-[0px_12px_10px_0px_rgba(0,0,0,0.1),0px_5px_10px_3px_rgba(0,0,0,0.15)] w-full max-w-[426px] z-[2]" data-name="Design Panel: Properties">
      <NameDescription />
      <Props2 />
    </div>
  );
}

function PointerLine3() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="absolute h-0 left-0 right-0 top-0" data-name="line">
        <div className="absolute inset-[-1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 2">
            <path d="M0 1H76" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-0 flex items-center justify-center left-1/2 top-0 w-0">
        <div className="-scale-y-100 flex-none h-px rotate-90 w-[65px]">
          <div className="relative size-full" data-name="line">
            <div className="absolute inset-[-1px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                <path d="M0 1H65" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill3() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill3 />
    </div>
  );
}

function Pointer3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-full items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "307" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none size-full">
          <PointerLine3 />
        </div>
      </div>
      <PointerStart3 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Optional</p>
    </div>
  );
}

function SpecCallout3() {
  return (
    <div className="absolute content-stretch flex h-[76px] items-center left-full ml-[24px] top-[106px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer3 />
      <Content5 />
    </div>
  );
}

function PointerLine4() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="absolute h-0 left-0 right-0 top-0" data-name="line">
        <div className="absolute inset-[-1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 2">
            <path d="M0 1H76" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-0 flex items-center justify-center left-1/2 top-0 w-0">
        <div className="-scale-y-100 flex-none h-px rotate-90 w-[65px]">
          <div className="relative size-full" data-name="line">
            <div className="absolute inset-[-1px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                <path d="M0 1H65" id="line" stroke="var(--stroke-0, #B7BAC7)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill4() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill4 />
    </div>
  );
}

function Pointer4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-full items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "307" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none size-full">
          <PointerLine4 />
        </div>
      </div>
      <PointerStart4 />
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Optional</p>
    </div>
  );
}

function SpecCallout4() {
  return (
    <div className="absolute content-stretch flex h-[76px] items-center left-full ml-[24px] top-[239px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer4 />
      <Content6 />
    </div>
  );
}

function PointerLine5() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[65px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-8.21%_-5.33px_-1.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.3333 10.6667">
                    <path d={svgPaths.p3965b040} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill5() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill5 />
    </div>
  );
}

function Pointer5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <PointerLine5 />
          </div>
        </div>
      </div>
      <PointerStart5 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Select from preferred list of patterns</p>
    </div>
  );
}

function SpecCallout5() {
  return (
    <div className="absolute content-stretch flex items-center left-full ml-[24px] top-[390px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer5 />
      <Content7 />
    </div>
  );
}

function PointerLine6() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[65px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-8.21%_-5.33px_-1.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.3333 10.6667">
                    <path d={svgPaths.p3965b040} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill6() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill6 />
    </div>
  );
}

function Pointer6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <PointerLine6 />
          </div>
        </div>
      </div>
      <PointerStart6 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Required for A11y</p>
    </div>
  );
}

function SpecCallout6() {
  return (
    <div className="absolute content-stretch flex items-center left-full ml-[24px] top-[192px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer6 />
      <Content8 />
    </div>
  );
}

function PointerLine7() {
  return (
    <div className="relative size-full" data-name="Pointer line">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[4px] relative size-full">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none h-full">
              <div className="h-full relative w-[65px]" data-name="Pointer">
                <div className="absolute inset-[-5.33px_-8.21%_-5.33px_-1.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.3333 10.6667">
                    <path d={svgPaths.p3965b040} fill="var(--stroke-0, #B7BAC7)" id="Pointer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleFill7() {
  return <div className="bg-[#ff38ac] max-h-[12px] max-w-[12px] rounded-[9999px] shrink-0 size-[12px]" data-name="Circle fill" />;
}

function PointerStart7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[100px] shrink-0" data-name="Pointer Start">
      <CircleFill7 />
    </div>
  );
}

function Pointer7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-end min-h-px min-w-px relative" data-name="Pointer">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153.5" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <PointerLine7 />
          </div>
        </div>
      </div>
      <PointerStart7 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex items-start px-[16px] relative shrink-0 w-[220px]" data-name="content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#cb2586] text-[16px] whitespace-pre-wrap">Nested Instance</p>
    </div>
  );
}

function SpecCallout7() {
  return (
    <div className="absolute content-stretch flex items-center left-full ml-[24px] top-[476px] w-[301px]" data-name="🛠️ Spec Callout">
      <Pointer7 />
      <Content9 />
    </div>
  );
}

function Props1() {
  return (
    <div className="flex-1 min-w-0 relative w-fit min-h-[640px] overflow-visible pr-0" data-name="props">
      <DesignPanelProperties />
      <SpecCallout3 />
      <SpecCallout4 />
      <SpecCallout5 />
      <SpecCallout6 />
      <SpecCallout7 />
    </div>
  );
}

function ComponentProps() {
  return (
    <div className="flex flex-1 min-w-0 w-full gap-[32px] items-stretch lg:flex-row lg:items-start relative" data-name="Component props">
      <Props />
      <Props1 />
    </div>
  );
}

function ComponetProps() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="componet props">
      <SectionHeadingFull13 />
      <ComponentProps />
    </div>
  );
}

function SectionCards() {
  return (
    <div className="content-stretch flex flex-col gap-[57px] items-start pt-[32px] relative shrink-0 w-full" data-name="Section Cards">
      <Frame94 />
      <SectionCardsVertical />
      <ComponentGroups />
      <ComponetProps />
    </div>
  );
}

function Count15() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-[12px] relative rounded-[100px] shrink-0 w-[48px]" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-pre-wrap">2.0</p>
    </div>
  );
}

function CountTitle14() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count15 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[40px] text-black">Information Architecture</p>
    </div>
  );
}

function Title14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle14 />
    </div>
  );
}

function SectionHeadingFull14() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title14 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Rather than designing pages individually, I defined a flexible information architecture that supported multiple content types and use cases. This abstraction allowed the system to scale without redesigning layouts for each new scenario.</p>
    </div>
  );
}

function Count16() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">A</p>
    </div>
  );
}

function SectionHeadingVertical5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count16 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Function over form</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[24px] mb-0">The site itself is simple and as basic information, but hard to navigate to information like recycling, self-service needs, and it’s more branded pages live externally on a different website.</p>
        <p className="leading-[24px] mb-0">&nbsp;</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[24px]">
            <span className="leading-[24px]">Colors were muted and dull</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[24px]">Angular designs made the site feel dated</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[24px]">Typography made headlines feel cramped and difficult to read</span>
          </li>
          <li className="ms-[24px]">
            <span className="leading-[24px]">Text color was very light, causing accessibility concerns</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ValueProp9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px pb-[24px] relative" data-name="Value Prop">
      <SectionHeadingVertical5 />
    </div>
  );
}

function ImageSlot() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Image slot">
      <div className="absolute inset-0 rounded-[16px]" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#efefe4] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-full left-[13.51%] max-w-none top-[4.31%] w-[72.98%]" src={imgImage10} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Ia() {
  return (
    <div className="content-stretch flex h-full items-center pl-[16px] py-[16px] relative shrink-0 w-[647px]" data-name="IA 1">
      <ImageSlot />
    </div>
  );
}

function Row10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-wrap gap-[32px] items-start justify-end min-h-px min-w-px relative w-full" data-name="Row 1">
      <ValueProp9 />
      <Ia />
    </div>
  );
}

function Count17() {
  return (
    <div className="bg-[#dae4e1] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">B</p>
    </div>
  );
}

function SectionHeadingVertical6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Section Heading / Vertical">
      <Count17 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Photography felt lacking and inconsistent</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">
        {`The current website's imagery, drawn from various photography campaigns, creates a disjointed and inconsistent experience for users navigating the top landing pages. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />A cohesive photography strategy could transform this into a powerful storytelling tool, enhancing the overall impact and consistency of our visual narrative.
      </p>
    </div>
  );
}

function ValueProp10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px pb-[24px] relative" data-name="Value Prop">
      <SectionHeadingVertical6 />
    </div>
  );
}

function ImageSlot1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Image slot">
      <div className="absolute inset-0 rounded-[16px]" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#efefe4] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[135.06%] left-[14.32%] max-w-none top-[0.16%] w-[71.8%]" src={imgImage11} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Ia1() {
  return (
    <div className="content-stretch flex h-full items-center pl-[16px] py-[16px] relative shrink-0 w-[647px]" data-name="IA 2">
      <ImageSlot1 />
    </div>
  );
}

function Row11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-wrap gap-[32px] items-start justify-end min-h-px min-w-px relative w-full" data-name="Row 2">
      <ValueProp10 />
      <Ia1 />
    </div>
  );
}

function SectionCardsVertical1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[1005px] items-start relative shrink-0 w-full" data-name="Section Cards / Vertical">
      <Row10 />
      <Row11 />
    </div>
  );
}

function Count18() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">2.1</p>
    </div>
  );
}

function CountTitle15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count18 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">{`Site Map `}</p>
    </div>
  );
}

function Title15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle15 />
    </div>
  );
}

function SectionHeadingFull15() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title15 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">{`We kick off our rebranding journey by analyzing our page templates' hierarchy to create a strategic site map that identifies key areas for impactful branded pages and outlines the necessary components to improve each template.`}</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_86.12%_91.52%_0] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">WM Homepage</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_85.48%_75.54%_0.63%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services for Home</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_69.77%_75.54%_16.35%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services for Business</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_54.06%_75.54%_32.06%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycle Right</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.83%_53.49%_63.76%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycle 101</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[39.05%_53.49%_52.54%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycle 101</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[50.27%_53.49%_41.32%_33.89%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Recycling Resources</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[16.05%_8%_75.54%_78.12%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Support</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_40.94%_91.52%_49.6%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Pay My Bill</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_29.96%_91.52%_60.58%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Drop Off Locations</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_18.98%_91.52%_71.56%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Notifications</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[0.06%_8%_91.52%_82.54%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Log In</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[24.18%_38.22%_67.4%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Who We Are</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[35.4%_38.22%_56.18%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Our Story</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[46.62%_38.22%_44.96%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Our Leadership</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[24.18%_23.27%_67.4%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
        <p className="mb-0">{`Environmental `}</p>
        <p>Stewardship</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[35.4%_23.27%_56.18%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Social Impact</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[46.62%_23.27%_44.96%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Sustainable Technology</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[57.84%_23.27%_33.74%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Sustainable Reporting</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[69.06%_23.27%_22.53%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">WM Sustainability Forum</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[80.28%_23.27%_11.31%_64.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">WM Phoenix Open</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[57.84%_38.22%_33.74%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">{`Inclusion & Diversity `}</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[69.06%_38.22%_22.53%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">{`Careers `}</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[80.28%_38.22%_11.31%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Investors</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[91.5%_38.22%_0.09%_49.16%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Media Room</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute bg-white inset-[29.63%_84.92%_64.32%_3.56%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute bg-white inset-[28.45%_85.44%_65.5%_3.04%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.27%_86.02%_66.68%_2.46%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[27.27%_84.92%_64.32%_2.46%]">
      <Frame35 />
      <Frame36 />
      <Frame37 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute bg-white inset-[29.63%_69.27%_64.32%_19.26%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute bg-white inset-[28.45%_69.79%_65.5%_18.74%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.27%_70.41%_66.68%_18.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[27.27%_69.27%_64.32%_18.11%]">
      <Frame38 />
      <Frame39 />
      <Frame40 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute bg-white inset-[40.85%_69.27%_53.1%_19.26%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-white inset-[39.67%_69.79%_54.28%_18.74%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[38.49%_70.41%_55.46%_18.11%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Solutions</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[38.49%_69.27%_53.1%_18.11%]">
      <Frame41 />
      <Frame42 />
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute bg-white inset-[30.19%_7.62%_63.76%_80.91%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute bg-white inset-[29.01%_8.14%_64.94%_80.39%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[27.83%_8.77%_66.12%_79.76%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Topics</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[27.83%_7.62%_63.76%_79.76%]">
      <Frame49 />
      <Frame50 />
      <Frame51 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute bg-white inset-[52.07%_68.33%_41.88%_22.1%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute bg-white inset-[50.89%_68.77%_43.06%_21.66%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[49.71%_69.29%_44.24%_21.14%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Services</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[49.71%_68.33%_41.88%_21.14%]">
      <Frame54 />
      <Frame55 />
      <Frame56 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="absolute bg-white inset-[41.41%_6.93%_52.54%_83.5%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame58() {
  return (
    <div className="absolute bg-white inset-[40.23%_7.37%_53.72%_83.06%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame59() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[39.05%_7.89%_54.9%_82.54%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">FAQs</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[39.05%_6.93%_52.54%_82.54%]">
      <Frame57 />
      <Frame58 />
      <Frame59 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="absolute bg-white inset-[63.15%_-0.01%_30.8%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame61() {
  return (
    <div className="absolute bg-white inset-[61.97%_0.43%_31.98%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame62() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[60.79%_0.95%_33.16%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Campaigns</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[60.79%_-0.01%_30.8%_89.48%]">
      <Frame60 />
      <Frame61 />
      <Frame62 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="absolute bg-white inset-[74.93%_-0.01%_19.02%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute bg-white inset-[73.75%_0.43%_20.2%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[72.57%_0.95%_21.38%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Local Pages</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[72.57%_-0.01%_19.02%_89.48%]">
      <Frame63 />
      <Frame64 />
      <Frame65 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="absolute bg-white inset-[86.71%_-0.01%_7.24%_90.44%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame67() {
  return (
    <div className="absolute bg-white inset-[85.53%_0.43%_8.42%_90%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[84.35%_0.95%_9.6%_89.48%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-solid inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Footer Links</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[84.35%_-0.01%_7.24%_89.48%]">
      <Frame66 />
      <Frame67 />
      <Frame68 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="absolute bg-white inset-[63.29%_68.33%_30.66%_22.1%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame70() {
  return (
    <div className="absolute bg-white inset-[62.11%_68.77%_31.84%_21.66%] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
    </div>
  );
}

function Frame71() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[60.93%_69.29%_33.02%_21.14%] items-center justify-center p-[16px] rounded-[2.5px]">
      <div aria-hidden="true" className="absolute border-[#006937] border-[1.256px] border-dashed inset-[-1.256px] pointer-events-none rounded-[3.7560000000000002px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.076px] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Solutions</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[60.93%_68.33%_30.66%_21.14%]">
      <Frame69 />
      <Frame70 />
      <Frame71 />
    </div>
  );
}

function SitemapWm() {
  return (
    <div className="aspect-[1149/517] relative shrink-0 w-full" data-name="sitemap wm">
      <div className="absolute bg-white inset-[-2.32%_-3.05%_-2.86%_-1.83%]" />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
      <Frame34 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group9 />
      <Group7 />
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group8 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.89%_41.78%_80.1%_53.47%] leading-[15.076px] not-italic text-[#006937] text-[11px] text-center whitespace-nowrap">Inside WM</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.89%_26%_80.1%_67.82%] leading-[15.076px] not-italic text-[#006937] text-[11px] text-center">Sustainability</p>
      <div className="absolute inset-[8.76%_17.46%_4.18%_1.4%]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 957.429 462.275">
          <path d={svgPaths.p2f8c8f00} fill="var(--fill-0, #006937)" id="Union" />
        </svg>
      </div>
    </div>
  );
}

function Count19() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-[100px] shrink-0" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center">2.2</p>
    </div>
  );
}

function CountTitle16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <Count19 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Page Templates</p>
    </div>
  );
}

function Title16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle16 />
    </div>
  );
}

function SectionHeadingFull16() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title16 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Page templates were created as composition frameworks rather than fixed layouts, enabling teams to assemble consistent experiences quickly while maintaining flexibility for different product needs.</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold items-start justify-between leading-[normal] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[17px]">
      <p className="relative shrink-0">{`Action & Conversion`}</p>
      <p className="relative shrink-0 text-right">{`Brand & Story Telling`}</p>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Logged in Pages</p>
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">{`Support Landing `}</p>
        </div>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Support Detail</p>
        </div>
      </div>
    </div>
  );
}

function Row12() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="row">
      <div aria-hidden="true" className="absolute border-2 border-[#006937] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <Frame72 />
        <Frame73 />
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="column 1">
      <Row />
      <Row12 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">{`Service & Solutions `}</p>
            <p>{`Landing `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">
            Solution
            <br aria-hidden="true" />
            Detail
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Service</p>
            <p>Detail</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame75 />
      <Frame76 />
    </div>
  );
}

function Row13() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="row">
      <div aria-hidden="true" className="absolute border-2 border-[#006937] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <Frame74 />
        <Frame101 />
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px] self-stretch">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative size-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Campaign</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">{`Local & `}</p>
            <p className="mb-0">{`Franchise `}</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame77 />
      <Frame78 />
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="column 2">
      <Row13 />
      <Frame116 />
    </div>
  );
}

function Row14() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Locator</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row15() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Location</p>
            <p>Detail</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start py-[16px] relative self-stretch shrink-0 w-[125px]" data-name="column 3">
      <Row14 />
      <Row15 />
    </div>
  );
}

function Row16() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">Homepage</p>
        </div>
      </div>
    </div>
  );
}

function Row17() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Blank</p>
            <p>Template</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start py-[16px] relative self-stretch shrink-0 w-[125px]" data-name="column 4">
      <Row16 />
      <Row17 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Immersive</p>
            <p>Story Telling Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="bg-[#dae4e1] flex-[1_0_0] min-h-[50px] min-w-px relative rounded-[2.5px]">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center whitespace-nowrap">
            <p className="mb-0">Educational</p>
            <p>Landing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row18() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="row">
      <Frame79 />
      <Frame80 />
    </div>
  );
}

function Row19() {
  return (
    <div className="bg-[#dae4e1] min-h-[50px] relative rounded-[2.5px] shrink-0 w-full" data-name="row">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[16.718px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#006937] text-[11px] text-center">General Detail Page</p>
        </div>
      </div>
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[349px]" data-name="column 5">
      <div aria-hidden="true" className="absolute border-2 border-[#006937] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
      <Row18 />
      <Row19 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative w-full">
      <Column3 />
      <Column4 />
      <Column5 />
      <Column6 />
      <Column7 />
    </div>
  );
}

function PageTemplates() {
  return (
    <div className="content-start flex flex-1 min-w-0 w-full flex-wrap gap-[24px_695.88px] items-stretch pb-[32px] relative" data-name="page templates">
      <Frame99 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-7.36px_-0.09%]">
          <svg className="block size-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1173.64 14.7279">
            <path d={svgPaths.p2a075dc0} fill="var(--stroke-0, #006937)" id="Vector 12" />
          </svg>
        </div>
      </div>
      <Frame102 />
    </div>
  );
}

function SectionCards4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull16 />
      <PageTemplates />
    </div>
  );
}

function SectionCards3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] relative shrink-0 w-full" data-name="Section Cards">
      <SectionHeadingFull14 />
      <SectionCardsVertical1 />
      <SectionHeadingFull15 />
      <SitemapWm />
      <SectionCards4 />
    </div>
  );
}

function Left({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={scrollRef}
      className="absolute h-[3366px] overflow-x-clip overflow-y-auto right-0 top-[-0.47px] w-[1184px] scroll-smooth"
      data-name="Left"
    >
      <div className="absolute h-[3368px] right-[-0.3px] top-0 w-[1184.352px]" data-name="D.SF.1 - Landing 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDSf1Landing2} />
      </div>
    </div>
  );
}

function Image15({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="absolute h-[2623px] left-px right-[-1px] top-[1.47px]" data-name="Image 2">
      <Left scrollRef={scrollRef} />
    </div>
  );
}

function Slot() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[-53px] w-[154px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto" data-name="Slot">
      <div className="h-[40px] shrink-0 w-full rounded-lg bg-white px-3 py-2 shadow-md border border-[#e8e8e8] flex items-center text-[#4e4f4e] text-[14px] font-['Inter:Regular',sans-serif]" data-name="slot">Callout 1</div>
    </div>
  );
}

function Pin1() {
  return (
    <div className="absolute right-0 size-[22px] top-[15px] cursor-pointer z-10" data-name="Pin">
      <div className="absolute bg-[rgba(239,242,255,0.6)] inset-0 rounded-[1000px]" />
      <div className="absolute bg-[rgba(0,38,255,0.9)] inset-[22.73%] rounded-[1000px]" />
    </div>
  );
}

function Callout() {
  return (
    <div className="group absolute h-[50px] left-[229.85px] top-[481px] w-[154px]" data-name="Callout 1">
      <Slot />
      <Pin1 />
    </div>
  );
}

function Slot1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[-53px] w-[154px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto" data-name="Slot">
      <div className="h-[40px] shrink-0 w-full rounded-lg bg-white px-3 py-2 shadow-md border border-[#e8e8e8] flex items-center text-[#4e4f4e] text-[14px] font-['Inter:Regular',sans-serif]" data-name="slot">Callout 2</div>
    </div>
  );
}

function Pin2() {
  return (
    <div className="absolute right-0 size-[22px] top-[15px] cursor-pointer z-10" data-name="Pin">
      <div className="absolute bg-[rgba(239,242,255,0.6)] inset-0 rounded-[1000px]" />
      <div className="absolute bg-[rgba(0,38,255,0.9)] inset-[22.73%] rounded-[1000px]" />
    </div>
  );
}

function Callout1() {
  return (
    <div className="group absolute h-[53px] left-[261.85px] top-[850px] w-[154px]" data-name="Callout 2">
      <Slot1 />
      <Pin2 />
    </div>
  );
}

function Pin3() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[22px] top-1/2 cursor-pointer z-10" data-name="Pin">
      <div className="absolute bg-[rgba(239,242,255,0.6)] inset-0 rounded-[1000px]" />
      <div className="absolute bg-[rgba(0,38,255,0.9)] inset-[22.73%] rounded-[1000px]" />
    </div>
  );
}

function Callout2() {
  return (
    <div className="group absolute h-[230px] left-[95.85px] top-[1368px] w-[764px]" data-name="Callout 3">
      <div className="absolute inset-0 left-[30px] top-1/2 -translate-y-1/2 w-[300px] rounded-lg bg-white p-4 shadow-lg border border-[#e8e8e8] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col gap-2">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#2e2f32] text-[16px]">Callout 3</p>
        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#4e4f4e]">Content for this callout.</p>
      </div>
      <Pin3 />
    </div>
  );
}

function Pin4() {
  return (
    <div className="absolute bottom-0 right-[281px] size-[22px] cursor-pointer z-10" data-name="Pin">
      <div className="absolute bg-[rgba(239,242,255,0.6)] inset-0 rounded-[1000px]" />
      <div className="absolute bg-[rgba(0,38,255,0.9)] inset-[22.73%] rounded-[1000px]" />
    </div>
  );
}

function Callout3() {
  return (
    <div className="group absolute h-[101px] right-[61.15px] top-[1903px] w-[350px]" data-name="Callout 4">
      <div className="absolute bottom-full left-0 mb-2 w-[280px] rounded-lg bg-white p-4 shadow-lg border border-[#e8e8e8] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col gap-2">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#2e2f32] text-[16px]">Callout 4</p>
        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#4e4f4e]">Content for this callout.</p>
      </div>
      <Pin4 />
    </div>
  );
}

function Image16() {
  return (
    <div className="bg-[#f4f4f4] h-full overflow-x-clip overflow-y-auto relative shrink-0 w-[587px]" data-name="Image 1">
      <div className="absolute h-[3368px] left-[0.15px] top-0 w-[1185px]" data-name="Wireframe 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWireframe1} />
      </div>
      <Callout />
      <Callout1 />
      <Callout2 />
      <Callout3 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.176px] left-[calc(50%+0.35px)] top-[calc(50%-0.41px)] w-[36.706px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.7059 27.1765">
        <g id="Frame 1618872789">
          <path clipRule="evenodd" d={svgPaths.p10075300} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall" />
          <path clipRule="evenodd" d={svgPaths.pb462e00} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall_2" />
        </g>
      </svg>
    </div>
  );
}

function CircleCaretLeft({ onDrag }: { onDrag: (deltaX: number) => void }) {
  const dragStart = useRef<{ x: number; scrollTop: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, scrollTop: 0 };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const deltaX = e.clientX - dragStart.current.x;
    dragStart.current = { x: e.clientX, scrollTop: dragStart.current.scrollTop };
    onDrag(deltaX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragStart.current = null;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="absolute bg-[rgba(25,25,25,0.4)] right-[-40px] rounded-[1000px] size-[80px] top-[270.34px] cursor-grab active:cursor-grabbing touch-none select-none"
      data-name="circleCaret/left"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onDrag(40);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          onDrag(-40);
        }
      }}
      aria-label="Drag left or right to scroll image"
    >
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-[-0.5px] pointer-events-none rounded-[1000.5px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <Frame97 />
      <div className="absolute border border-[#e8e8e8] border-solid inset-0 rounded-[100px] pointer-events-none" data-name="border" />
    </div>
  );
}

function RightImage({ onDrag }: { onDrag: (deltaX: number) => void }) {
  return (
    <div className="absolute content-stretch flex h-[3366px] items-center left-0 top-px" data-name="Right Image">
      <Image16 />
      <div className="bg-[#023625] h-[1144px] shrink-0 w-[2px]" data-name="Line" />
      <CircleCaretLeft onDrag={onDrag} />
    </div>
  );
}

function Comparison() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCaretDrag = (deltaX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    el.scrollTop = Math.max(0, Math.min(maxScroll, el.scrollTop + deltaX));
  };

  return (
    <div className="h-[3369px] relative rounded-[16px] shrink-0 w-[1180px]" data-name="Comparison">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Image15 scrollRef={scrollRef} />
        <RightImage onDrag={handleCaretDrag} />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Count20() {
  return (
    <div className="bg-[#e9f722] content-stretch flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-[12px] relative rounded-[100px] shrink-0 w-[48px]" data-name="Count">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center w-full whitespace-pre-wrap">3.0</p>
    </div>
  );
}

function CountTitle17() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Count + Title">
      <Count20 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[40px] text-black">Compromises along the way</p>
    </div>
  );
}

function Title17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center min-h-px min-w-px relative" data-name="title">
      <CountTitle17 />
    </div>
  );
}

function SectionHeadingFull17() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title17 />
    </div>
  );
}

function SectionHeadingVertical7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Section Heading / Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[32px] text-black w-[min-content]">Interactive experiences</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] max-w-[800px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content]">
        {`We design interactive brand experiences, but due to time and scope constraints, we had to compromise with a mix of old and new assets. `}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        For example, illustrations and infographics were not in the roadmap or scope.
      </p>
    </div>
  );
}

function ValueProp11() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Value Prop">
      <div className="content-stretch flex flex-col items-start px-[24px] py-[32px] relative size-full">
        <SectionHeadingVertical7 />
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <ValueProp11 />
        </div>
      </div>
    </div>
  );
}

function ImageSlot2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Image slot">
      <div className="absolute inset-0 rounded-[16px]" data-name="Image 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-white inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[109.3%] left-0 max-w-none top-[-0.13%] w-full" src={imgImage12} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Interactive() {
  return (
    <div className="flex-[1_0_0] h-[616px] min-h-px min-w-px relative" data-name="interactive">
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <ImageSlot2 />
      </div>
    </div>
  );
}

function Row20() {
  return (
    <div className="bg-[#efefe4] content-stretch flex gap-[32px] h-[584px] items-start justify-end min-h-[400px] relative rounded-[16px] shrink-0 w-full" data-name="Row 1">
      <Frame81 />
      <Interactive />
    </div>
  );
}

function CountTitle18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Informational pages</p>
    </div>
  );
}

function Title18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle18 />
    </div>
  );
}

function SectionHeadingFull18() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start pt-[40px] relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title18 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Our recycling pages are highly branded and meant to be engaging and interactive but due to time and dev constraints we were left with a mix of old and new component and designs.</p>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex font-['Inter:Medium',sans-serif] font-medium items-start justify-between leading-[normal] not-italic relative shrink-0 text-[#4e4f4e] text-[17px] w-full">
      <p className="relative shrink-0">Proposed</p>
      <p className="relative shrink-0 text-right">Live site</p>
    </div>
  );
}

function RecycleRightRight() {
  return (
    <div className="absolute h-[3366px] overflow-clip right-0 top-[-0.47px] w-[1184px]" data-name="Recycle right right">
      <div className="absolute h-[4062.103px] left-0 top-0 w-[1183.127px]" data-name="D.Recycling 101 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDRecycling1011} />
      </div>
      <div className="absolute bg-[#f7f8f2] h-[58.335px] left-0 top-[3406.43px] w-[105.167px]" />
      <div className="absolute bg-[#f7f8f2] h-[14.789px] left-[1074.68px] top-[3407.26px] w-[108.454px]" />
      <div className="absolute bg-[#f7f8f2] h-[13.968px] left-[746.03px] mix-blend-multiply top-[3410.54px] w-[19.719px]" />
      <div className="absolute bg-[#f7f8f2] h-[14.789px] left-[416.56px] mix-blend-multiply top-[3409.72px] w-[19.719px]" />
      <div className="absolute bg-[#f7f8f2] h-[35.33px] left-[105.17px] mix-blend-multiply top-[3422.05px] w-[1077.965px]" />
    </div>
  );
}

function Image17() {
  return (
    <div className="absolute h-[2623px] left-px right-[-1px] top-[1.47px]" data-name="Image 2">
      <RecycleRightRight />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[39.438px] left-0 top-[174.18px] w-[241.556px]" data-name="button">
      <div className="absolute bg-[#e8f733] inset-0 rounded-[23.005px] shadow-[0px_0.657px_1.232px_0px_rgba(0,0,0,0.1),0px_4.93px_9.859px_0px_rgba(0,0,0,0.2)]" data-name="container" />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[86.86px] not-italic right-[86.69px] text-[#024731] text-[13.146px] text-center top-[calc(50%-6.29px)] tracking-[-0.1315px]">Learn More</p>
    </div>
  );
}

function Contents() {
  return (
    <div className="absolute inset-[7.24%_8.94%_33.94%_8.94%] overflow-clip" data-name="contents">
      <Button8 />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 not-italic text-[13.146px] text-white top-[36.15px] w-[241.556px] whitespace-pre-wrap">
        {`Reality: Containers should be clean, but don't have to be spotless. `}
        <br aria-hidden="true" />
        The goal is to make sure they are clean enough to avoid contaminating other materials, like paper, or your un-lined kitchen recycling bin.
      </p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 not-italic text-[26.292px] text-white top-0 tracking-[-1.0517px] w-[241.556px] whitespace-pre-wrap">False!</p>
    </div>
  );
}

function FlipCard2() {
  return (
    <div className="absolute h-[363.156px] left-[764.11px] top-[95.31px] w-[294.14px]" data-name="flip card 3">
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.45%_-1.12%_-1.36%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 369.729">
            <g filter="url(#filter0_dd_451_5768)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p1651e200} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369.729" id="filter0_dd_451_5768" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5768" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5768" mode="normal" result="effect2_dropShadow_451_5768" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5768" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card fill">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 294.14 363.156">
          <path clipRule="evenodd" d={svgPaths.p2779180} fill="var(--fill-0, #024731)" fillRule="evenodd" id="card fill" />
        </svg>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[51.1px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] not-italic right-[47.79px] text-[13.146px] text-white tracking-[-0.1315px] translate-x-full translate-y-full underline">Flip</p>
      <Contents />
    </div>
  );
}

function FlipCard1() {
  return (
    <div className="absolute h-[363.156px] left-[443.67px] top-[95.31px] w-[294.14px]" data-name="flip card 2">
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.45%_-1.12%_-1.36%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 369.729">
            <g filter="url(#filter0_dd_451_5768)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p1651e200} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369.729" id="filter0_dd_451_5768" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5768" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5768" mode="normal" result="effect2_dropShadow_451_5768" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5768" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[51.1px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] not-italic right-[47.79px] text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-x-full translate-y-full underline">Flip</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-[26.29px] not-italic text-[26.292px] text-black top-[26.29px] tracking-[-1.0517px] w-[241.556px] whitespace-pre-wrap">Are all types of glass bottles are recyclable?</p>
    </div>
  );
}

function FlipCard() {
  return (
    <div className="absolute h-[363.156px] left-[123.24px] top-[95.31px] w-[294.14px]" data-name="flip card 1">
      <div className="absolute h-[363.156px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.45%_-1.12%_-1.36%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 369.729">
            <g filter="url(#filter0_dd_451_5768)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p1651e200} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369.729" id="filter0_dd_451_5768" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5768" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5768" mode="normal" result="effect2_dropShadow_451_5768" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5768" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[51.1px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] not-italic right-[47.79px] text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-x-full translate-y-full underline">Flip</p>
      <div className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-[26.29px] not-italic text-[26.292px] text-black top-[26.29px] tracking-[-1.0517px] w-[241.556px] whitespace-pre-wrap">
        <p className="mb-0">
          {`True or False? `}
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p>{`Even if I am not sure about an item, I can put it in my bin. `}</p>
      </div>
    </div>
  );
}

function FlipCards() {
  return (
    <div className="absolute h-[497.901px] left-0 top-[1268.58px] w-[1183.132px]" data-name="flip cards">
      <div className="absolute h-[497.901px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <div className="absolute bg-[#f8f8f2] bottom-[-0.1px] h-[207.048px] left-0 w-[1183.132px]" data-name="container short" />
      <FlipCard2 />
      <FlipCard1 />
      <FlipCard />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#024731] text-[32.865px] top-[32.86px] tracking-[-0.2465px] w-[615.393px] whitespace-pre-wrap">Recycling myths</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[39.438px] relative shrink-0 w-[106.811px]" data-name="button">
      <div className="absolute bg-[#1c8200] inset-0 rounded-[39.438px] shadow-[0px_0.657px_1.232px_0px_rgba(0,0,0,0.1),0px_4.93px_9.859px_0px_rgba(0,0,0,0.2)]" data-name="btn container" />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[32.86px] not-italic right-[32.95px] text-[13.146px] text-center text-white top-[calc(50%-6.29px)] tracking-[-0.1315px]">Button</p>
    </div>
  );
}

function TextHeadlineBodyButton() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[13.146px] items-start left-[690.76px] top-[52.58px] w-[312.215px]" data-name="TEXT/Headline+Body+Button">
      <div className="font-['Maax:Black',sans-serif] leading-[36.151px] min-w-full not-italic relative shrink-0 text-[#024731] text-[32.865px] tracking-[-0.2465px] w-[min-content] whitespace-pre-wrap">
        <p className="mb-0">{`Seasonal `}</p>
        <p>recycling tips</p>
      </div>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] min-w-full not-italic relative shrink-0 text-[#4f4f59] text-[13.146px] w-[min-content] whitespace-pre-wrap">{`The holidays can be a tough time for your trash bin. Check out our tips for what do do with seasonal items like wrapping paper, christmas trees and string lights.  `}</p>
      <Button9 />
    </div>
  );
}

function Multimedia2Copy() {
  return (
    <div className="absolute h-[427.242px] left-0 top-[1832.21px] w-[1183.132px]" data-name="multimedia 2 copy">
      <div className="absolute bottom-0 h-[446.961px] left-0 right-0" data-name="container" />
      <div className="absolute bg-white h-[341.794px] left-[283.46px] top-0 w-[776.43px]" data-name="container-content" />
      <TextHeadlineBodyButton />
      <div className="-translate-x-1/2 absolute bottom-0 h-[334.399px] left-[calc(50%-204.58px)] w-[527.48px]" data-name="media">
        <img alt="" className="block max-w-none size-full" height="334.399" src={imgMedia} width="527.48" />
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="absolute h-[19.719px] left-[123.24px] not-italic overflow-clip text-[13.146px] top-[14.79px] w-[244.021px]" data-name="contents">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[183.22px] text-[#024731] top-[3.29px] tracking-[-0.1315px]">Read Why</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] top-0">When in doubt, throw it out!</p>
    </div>
  );
}

function Cta() {
  return (
    <div className="absolute bottom-0 h-[49.297px] left-0 w-[1183.132px]" data-name="cta">
      <div className="absolute bg-[#f8f8f2] h-[49.297px] left-0 top-0 w-[1183.132px]" data-name="container" />
      <Contents1 />
    </div>
  );
}

function Graphic() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
    </div>
  );
}

function Material5() {
  return (
    <div className="absolute h-[160.216px] left-[917.75px] top-[147.89px] w-[133.924px]" data-name="material 6">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Polystyrene Foam and Plastic</p>
      <Graphic />
    </div>
  );
}

function Graphic1() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2} />
    </div>
  );
}

function Material4() {
  return (
    <div className="absolute h-[160.216px] left-[764.11px] top-[147.89px] w-[133.924px]" data-name="material 5">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Cups with Wax or Plastic Coatings</p>
      <Graphic1 />
    </div>
  );
}

function Graphic2() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3} />
    </div>
  );
}

function Material3() {
  return (
    <div className="absolute h-[160.216px] left-[603.89px] top-[147.89px] w-[133.924px]" data-name="material 4">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Flexible Packaging</p>
      <Graphic2 />
    </div>
  );
}

function Graphic3() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
    </div>
  );
}

function Material2() {
  return (
    <div className="absolute h-[160.216px] left-[443.67px] top-[147.89px] w-[133.924px]" data-name="material 3">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Plastic Wrap & Film`}</p>
      <Graphic3 />
    </div>
  );
}

function Graphic4() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
    </div>
  );
}

function Material1() {
  return (
    <div className="absolute h-[160.216px] left-[283.46px] top-[147.89px] w-[133.924px]" data-name="material 2">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Plastic Bags</p>
      <Graphic4 />
    </div>
  );
}

function Graphic5() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img6} />
    </div>
  );
}

function Material() {
  return (
    <div className="absolute h-[160.216px] left-[129.82px] top-[147.89px] w-[133.924px]" data-name="material 1">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Bagged Recyclables</p>
      <Graphic5 />
    </div>
  );
}

function Row21() {
  return (
    <div className="absolute contents left-[129.82px] top-[147.89px]" data-name="row 1">
      <Material5 />
      <Material4 />
      <Material3 />
      <Material2 />
      <Material1 />
      <Material />
    </div>
  );
}

function HeadlineBody() {
  return (
    <div className="absolute h-[62.443px] left-[123.24px] not-italic top-[65.73px] w-[589.101px] whitespace-pre-wrap" data-name="headline + body">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 right-0 text-[#4f4f59] text-[13.146px] top-[42.72px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est auctor donec et molestie mi.</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-0 right-0 text-[#024731] text-[32.865px] top-0 tracking-[-0.2465px]">Not accepted in your bin</p>
    </div>
  );
}

function No() {
  return (
    <div className="absolute left-[123.24px] size-[52.584px] top-0" data-name="no">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.5836 52.5836">
        <g id="no">
          <path clipRule="evenodd" d={svgPaths.pf9b5bc0} fill="var(--fill-0, #EA0018)" fillRule="evenodd" id="shape" />
          <g id="icon">
            <path d={svgPaths.p18803f00} fill="var(--fill-0, white)" id="icon color" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NotAccepted() {
  return (
    <div className="absolute h-[383.696px] left-0 top-[436.28px] w-[1183.132px]" data-name="not accepted">
      <Cta />
      <Row21 />
      <HeadlineBody />
      <No />
    </div>
  );
}

function Contents2() {
  return (
    <div className="absolute h-[19.719px] left-[123.24px] not-italic overflow-clip text-[13.146px] top-[14.79px] w-[244.021px]" data-name="contents">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[183.22px] text-[#024731] top-[3.29px] tracking-[-0.1315px]">Read Why</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] top-0">When in doubt, throw it out!</p>
    </div>
  );
}

function Cta1() {
  return (
    <div className="absolute bottom-[0.12px] h-[49.297px] left-0 w-[1183.132px]" data-name="cta">
      <div className="absolute bg-[#f8f8f2] h-[49.297px] left-0 top-0 w-[1183.132px]" data-name="container" />
      <Contents2 />
    </div>
  );
}

function Graphic6() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img7} />
    </div>
  );
}

function Material6() {
  return (
    <div className="absolute h-[160.216px] left-[787.93px] top-0 w-[133.924px]" data-name="material 6">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Glass Bottles & Containers`}</p>
      <Graphic6 />
    </div>
  );
}

function Graphic7() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8} />
    </div>
  );
}

function Material7() {
  return (
    <div className="absolute h-[160.216px] left-[634.29px] top-0 w-[133.924px]" data-name="material 5">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Food & Beverage Containers`}</p>
      <Graphic7 />
    </div>
  );
}

function Graphic8() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img9} />
    </div>
  );
}

function Material8() {
  return (
    <div className="absolute h-[160.216px] left-[474.07px] top-0 w-[133.924px]" data-name="material 4">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Flattened Cardboard & Paperboard`}</p>
      <Graphic8 />
    </div>
  );
}

function Graphic9() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img10} />
    </div>
  );
}

function Material9() {
  return (
    <div className="absolute h-[160.216px] left-[313.86px] top-0 w-[133.924px]" data-name="material 3">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">Paper</p>
      <Graphic9 />
    </div>
  );
}

function Graphic10() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
    </div>
  );
}

function Material10() {
  return (
    <div className="absolute h-[160.216px] left-[153.64px] top-0 w-[133.924px]" data-name="material 2">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Food & Beverage Cans`}</p>
      <Graphic10 />
    </div>
  );
}

function Graphic11() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.45px)] size-[120.778px] top-0" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img12} />
    </div>
  );
}

function Material11() {
  return (
    <div className="absolute h-[160.216px] left-0 top-0 w-[133.924px]" data-name="material 1">
      <p className="absolute font-['Maax:Bold',sans-serif] h-[26.292px] leading-[13.146px] left-0 not-italic right-0 text-[#024731] text-[13.146px] text-center top-[133.92px] tracking-[-0.1315px] whitespace-pre-wrap">{`Plastic Bottles & Containers`}</p>
      <Graphic11 />
    </div>
  );
}

function Row22() {
  return (
    <div className="absolute h-[160.216px] left-[129.82px] overflow-clip top-[147.89px] w-[921.857px]" data-name="row 1">
      <Material6 />
      <Material7 />
      <Material8 />
      <Material9 />
      <Material10 />
      <Material11 />
    </div>
  );
}

function HeadlineBody1() {
  return (
    <div className="absolute h-[62.443px] left-[123.24px] not-italic top-[65.73px] w-[589.101px] whitespace-pre-wrap" data-name="headline + body">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 right-0 text-[#4f4f59] text-[13.146px] top-[42.72px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est auctor donec et molestie mi.</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-0 right-0 text-[#024731] text-[32.865px] top-0 tracking-[-0.2465px]">Accepted in your bin</p>
    </div>
  );
}

function ElementRecycleYes() {
  return (
    <div className="absolute left-[123.24px] size-[52.584px] top-0" data-name="element/recycle/yes">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.5836 52.5836">
        <g id="element/recycle/yes">
          <path d={svgPaths.p350e0e00} fill="var(--fill-0, #00A2FF)" id="shape" />
          <g id="icon">
            <path clipRule="evenodd" d={svgPaths.p9de5f00} fill="var(--fill-0, white)" fillRule="evenodd" id="icon color" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Accepted() {
  return (
    <div className="absolute h-[377.123px] left-0 top-[32.86px] w-[1183.132px]" data-name="accepted">
      <Cta1 />
      <Row22 />
      <HeadlineBody1 />
      <ElementRecycleYes />
    </div>
  );
}

function InteractiveAcceptedMaterials() {
  return (
    <div className="absolute h-[757.533px] left-0 top-[2436.92px] w-[1183.132px]" data-name="interactive accepted materials">
      <div className="absolute bg-white h-[993.338px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <NotAccepted />
      <Accepted />
    </div>
  );
}

function HeadlineBodyDesktop() {
  return (
    <div className="absolute h-[62.443px] left-[123.24px] not-italic top-[2374.48px] w-[615.393px] whitespace-pre-wrap" data-name="headline+body/desktop">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 right-0 text-[#4f4f59] text-[13.146px] top-[42.72px]">{`Stuff about seasonal items such as Christmas trees, wrapping paper, fall yard waste, etc. `}</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-0 right-0 text-[#024731] text-[32.865px] top-0 tracking-[-0.2465px]">What should I do with....</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[39.438px] left-[123.24px] top-[197.19px] w-[192.259px]" data-name="button">
      <div className="absolute bg-[#e8f733] inset-0 rounded-[39.438px] shadow-[0px_0.657px_1.232px_0px_rgba(0,0,0,0.1),0px_4.93px_9.859px_0px_rgba(0,0,0,0.2)]" data-name="btn container" />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-[58.86px] not-italic right-[59.39px] text-[#024731] text-[13.146px] text-center top-[calc(50%-6.29px)] tracking-[-0.1315px]">See Toolkits</p>
    </div>
  );
}

function PromotionalModuleDarkGreen() {
  return (
    <div className="absolute h-[269.491px] left-0 top-[966.22px] w-[1183.132px]" data-name="promotional module - dark green">
      <div className="absolute h-[304.821px] right-[0.13px] top-[0.35px] w-[734.528px]" data-name="image">
        <img alt="" className="block max-w-none size-full" height="304.821" src={imgImage} width="734.528" />
      </div>
      <div className="absolute flex h-[305.642px] items-center justify-center left-0 top-0 w-[607.177px]">
        <div className="flex-none rotate-180">
          <div className="h-[305.642px] relative w-[607.177px]" data-name="split">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 607.177 305.642">
              <path clipRule="evenodd" d={svgPaths.p26f2de00} fill="var(--fill-0, #024731)" fillRule="evenodd" id="split" />
            </svg>
          </div>
        </div>
      </div>
      <Button10 />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#e8f733] text-[32.865px] top-[105.17px] tracking-[-0.2465px] w-[422.312px] whitespace-pre-wrap">Check out our toolkits.</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[32.865px] text-white top-[69.02px] tracking-[-0.2465px] w-[422.312px] whitespace-pre-wrap">Looking for our resources?</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="absolute left-[70.66px] size-[16.432px] top-0" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 16.4324">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p119a5500} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Cta2() {
  return (
    <div className="absolute inset-[88.62%_61.45%_7%_8.94%]" data-name="cta">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-0 not-italic text-[#024731] text-[13.146px] top-[2.46px] tracking-[-0.1315px]">Show More</p>
      <ArrowRight />
    </div>
  );
}

function Graphic12() {
  return (
    <div className="absolute inset-[6.57px_6.94px_6.94px_6.57px]" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img13} />
    </div>
  );
}

function ElementRulesRecyclingItemB() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%-0.07px)] size-[196.367px] top-[26.29px]" data-name="element/rules-recycling/item B">
      <div className="absolute flex inset-[-20.59%_-19.97%_-19.97%_-20.59%] items-center justify-center">
        <div className="flex-none rotate-112 size-[212.028px]">
          <div className="relative size-full" data-name="shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.028 212.028">
              <path clipRule="evenodd" d={svgPaths.p1382180} fill="var(--fill-0, #EA0018)" fillRule="evenodd" id="shape" />
            </svg>
          </div>
        </div>
      </div>
      <Graphic12 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute h-[375.48px] left-[764.11px] top-[95.31px] w-[294.14px]" data-name="card 3">
      <div className="absolute h-[375.48px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.44%_-1.12%_-1.31%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 382.053">
            <g filter="url(#filter0_dd_451_5660)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p13de680} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5660" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5660" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5660" mode="normal" result="effect2_dropShadow_451_5660" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5660" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Cta2 />
      <div className="absolute font-['Maax:Bold',sans-serif] leading-[21.362px] left-[26.29px] not-italic text-[19.719px] text-black top-[248.95px] tracking-[-0.7888px] w-[241.556px] whitespace-pre-wrap">
        <p className="mb-0">{`No loose plastic bags `}</p>
        <p className="mb-0">or bagged recyclables</p>
        <p>&nbsp;</p>
      </div>
      <ElementRulesRecyclingItemB />
      <div className="absolute h-[196.367px] left-[49.3px] right-[48.62px] top-[26.29px]" data-name="image 1x1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1X1} />
      </div>
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="absolute left-[70.66px] size-[16.432px] top-0" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 16.4324">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p119a5500} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Cta3() {
  return (
    <div className="absolute inset-[88.62%_61.45%_7%_8.94%]" data-name="cta">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-0 not-italic text-[#024731] text-[13.146px] top-[2.46px] tracking-[-0.1315px]">Show More</p>
      <ArrowRight1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute h-[375.48px] left-[124.06px] top-[95.31px] w-[294.14px]" data-name="card 2">
      <div className="absolute h-[375.48px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.44%_-1.12%_-1.31%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 382.053">
            <g filter="url(#filter0_dd_451_5660)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p13de680} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5660" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5660" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5660" mode="normal" result="effect2_dropShadow_451_5660" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5660" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Cta3 />
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[21.362px] left-[26.29px] not-italic text-[19.719px] text-black top-[248.95px] tracking-[-0.7888px] w-[241.556px] whitespace-pre-wrap">Clean bottles, cans, paper, and cardboard are good to go!</p>
      <div className="absolute h-[196.367px] left-[49.3px] right-[48.62px] top-[26.29px]" data-name="image 1x1">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage1X2} />
      </div>
    </div>
  );
}

function ArrowRight2() {
  return (
    <div className="absolute left-[70.66px] size-[16.432px] top-0" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 16.4324">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p119a5500} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function Cta4() {
  return (
    <div className="absolute inset-[88.62%_61.45%_7%_8.94%]" data-name="cta">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[13.146px] left-0 not-italic text-[#024731] text-[13.146px] top-[2.46px] tracking-[-0.1315px]">Show More</p>
      <ArrowRight2 />
    </div>
  );
}

function Graphic13() {
  return (
    <div className="absolute inset-[6.57px_6.94px_6.94px_6.57px]" data-name="graphic">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="container" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img14} />
    </div>
  );
}

function ElementRulesRecyclingItemB1() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%-0.07px)] size-[196.367px] top-[26.29px]" data-name="element/rules-recycling/item B">
      <div className="absolute flex inset-[-20.59%_-19.97%_-19.97%_-20.59%] items-center justify-center">
        <div className="flex-none rotate-112 size-[212.028px]">
          <div className="relative size-full" data-name="shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.028 212.028">
              <path clipRule="evenodd" d={svgPaths.p1382180} fill="var(--fill-0, #EA0018)" fillRule="evenodd" id="shape" />
            </svg>
          </div>
        </div>
      </div>
      <Graphic13 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute h-[375.48px] left-[443.67px] top-[95.31px] w-[294.14px]" data-name="card 1">
      <div className="absolute h-[375.48px] left-0 top-0 w-[294.14px]" data-name="card container">
        <div className="absolute inset-[-0.44%_-1.12%_-1.31%_-1.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.713 382.053">
            <g filter="url(#filter0_dd_451_5660)" id="card container">
              <path clipRule="evenodd" d={svgPaths.p13de680} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5660" width="300.713" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5660" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5660" mode="normal" result="effect2_dropShadow_451_5660" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5660" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Cta4 />
      <div className="absolute font-['Maax:Bold',sans-serif] leading-[21.362px] left-[26.29px] not-italic text-[19.719px] text-black top-[248.95px] tracking-[-0.7888px] w-[241.556px] whitespace-pre-wrap">
        <p className="mb-0">{`No food or liquid waste. `}</p>
        <p>This contaminates the other recyclables.</p>
      </div>
      <ElementRulesRecyclingItemB1 />
      <div className="absolute h-[196.367px] left-[49.3px] right-[48.62px] top-[26.29px]" data-name="image 1x1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1X3} />
      </div>
    </div>
  );
}

function CardGrid() {
  return (
    <div className="absolute h-[516.799px] left-0 top-[449.43px] w-[1183.132px]" data-name="card grid">
      <div className="absolute bg-white h-[516.799px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <Card2 />
      <Card1 />
      <Card />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[124.06px] not-italic text-[#024731] text-[32.865px] top-[32.86px] tracking-[-0.2465px]">The Golden Rules of Recycling</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bottom-[75.37px] left-[123.24px] not-italic overflow-clip text-white top-[75.59px] w-[442.031px] whitespace-pre-wrap" data-name="text">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[21.362px] left-0 text-[14.789px] top-[59.16px] w-[442.031px]">Inspiring statement about why recycling right is important</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[52.584px] left-0 text-[49.297px] top-0 tracking-[-0.6847px] w-[442.031px]">Recycling 101</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute h-[295.783px] left-0 top-[101.06px] w-[1183.132px]" data-name="hero">
      <div className="absolute bg-[#024731] inset-0" data-name="container" />
      <div className="absolute h-[295.783px] right-[0.13px] top-0 w-[1183.132px]" data-name="bg image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBgImage} />
      </div>
      <div className="absolute bg-gradient-to-r from-black h-[295.783px] right-[0.13px] to-1/2 to-[rgba(0,0,0,0)] top-0 w-[1183.132px]" data-name="gradient" />
      <Text7 />
    </div>
  );
}

function UtilityBar1() {
  return (
    <div className="absolute inset-[0_17.22%_0_0] overflow-clip" data-name="utility bar">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 not-italic right-[87.34%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Support</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[17.41%] not-italic right-[53.13%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Drop Off Locations</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[51.59%] not-italic right-[31.61%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Pay My Bill</p>
      <div className="absolute inset-[0_0_0_70.7%]" data-name="container - notifications" />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[73.25%] not-italic right-[7.37%] text-[#024731] text-[13.146px] text-center top-[calc(50%-9.58px)] tracking-[-0.1315px]">Notifications</p>
      <div className="absolute inset-[29.17%_5.1%_56.25%_93.42%]" data-name="notification dot">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.75134 5.75134">
          <circle cx="2.87567" cy="2.87567" fill="var(--fill-0, #FF0000)" id="notification dot" r="2.87567" />
        </svg>
      </div>
    </div>
  );
}

function ArrowRight3() {
  return (
    <div className="absolute inset-[33.33%_2.99%_33.33%_94.2%]" data-name="arrow - right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1459 13.1459">
        <g id="arrow - right">
          <path clipRule="evenodd" d={svgPaths.p123c2100} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function NavigationUtilityGroup() {
  return (
    <div className="absolute h-[39.438px] right-[123.37px] top-0 w-[467.501px]" data-name="Navigation/UtilityGroup">
      <UtilityBar1 />
      <div className="absolute bg-[#efefe4] inset-[0_0_0_82.78%]" data-name="container - login" />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[85.59%] not-italic right-[6.5%] text-[#024731] text-[13.146px] top-[calc(50%-9.58px)] tracking-[-0.1315px]">Log In</p>
      <ArrowRight3 />
    </div>
  );
}

function UtilityBar() {
  return (
    <div className="absolute inset-[0_0_60.98%_0]" data-name="UtilityBar">
      <div className="absolute bg-[#f8f8f2] inset-0" data-name="Container" />
      <NavigationUtilityGroup />
    </div>
  );
}

function Search() {
  return (
    <div className="-translate-y-1/2 absolute right-[123.37px] size-[19.719px] top-[calc(50%+0.19px)]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7189 19.7189">
        <g id="Search">
          <path d={svgPaths.p6842700} fill="var(--fill-0, #024731)" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function MenuList() {
  return (
    <div className="-translate-y-1/2 absolute font-['Maax:Bold',sans-serif] h-[14.789px] leading-[13.146px] left-[439.57px] not-italic overflow-clip text-[#024731] text-[13.146px] text-center top-[calc(50%-0.63px)] tracking-[-0.1315px] w-[580.885px]" data-name="Menu List">
      <p className="absolute left-0 right-[89.84%] top-[calc(50%-6.15px)]">For Home</p>
      <p className="absolute left-[14.57%] right-[72.18%] top-[calc(50%-6.15px)]">For Business</p>
      <p className="absolute left-[32.39%] right-[53.32%] top-[calc(50%-6.15px)]">Sustainability</p>
      <p className="absolute left-[51.06%] right-[34.65%] top-[calc(50%-6.15px)]">Recycle Right</p>
      <p className="absolute left-[69.87%] right-[19.28%] top-[calc(50%-6.15px)]">Inside WM</p>
      <p className="absolute left-[85.29%] right-[0.08%] top-[calc(50%-6.15px)]">Phoenix Open</p>
    </div>
  );
}

function WmLogo() {
  return (
    <div className="absolute inset-[15.91%_0.12%_18.7%_0]" data-name="wm logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.5999 21.431">
        <g id="wm logo">
          <path clipRule="evenodd" d={svgPaths.p3137e80} fill="var(--fill-0, #006937)" fillRule="evenodd" id="w" />
          <path clipRule="evenodd" d={svgPaths.p2570a7c0} fill="var(--fill-0, #EBA900)" fillRule="evenodd" id="m" />
          <path clipRule="evenodd" d={svgPaths.p32c75f00} fill="var(--fill-0, #006937)" fillRule="evenodd" id="register mark" />
        </g>
      </svg>
    </div>
  );
}

function Logo1() {
  return (
    <div className="absolute h-[32.773px] left-[123.24px] top-[13.15px] w-[79.697px]" data-name="Logo">
      <WmLogo />
    </div>
  );
}

function MenuBar() {
  return (
    <div className="absolute inset-[39.02%_0_0_0]" data-name="Menu Bar">
      <div className="absolute bg-white inset-0 shadow-[0px_0.246px_0.411px_0px_rgba(0,0,0,0.1),0px_1.643px_3.286px_0px_rgba(0,0,0,0.2)]" data-name="container" />
      <Search />
      <MenuList />
      <Logo1 />
    </div>
  );
}

function TopNav() {
  return (
    <div className="absolute h-[101.059px] left-0 top-0 w-[1183.132px]" data-name="top nav">
      <UtilityBar />
      <MenuBar />
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex gap-[13.146px] h-[52.584px] items-center justify-center px-[13.146px] relative shrink-0" data-name="tab 1">
      <p className="font-['Maax:Bold',sans-serif] leading-[13.146px] not-italic relative shrink-0 text-[#024731] text-[13.146px] text-center tracking-[-0.1315px]">Recycling 101</p>
      <div className="-translate-x-1/2 absolute bg-[#70a116] bottom-0 h-[6.573px] left-[calc(50%-0.27px)] w-[37.794px]" data-name="active line" />
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[13.146px] relative shrink-0" data-name="tab 2">
      <div className="h-[52.584px] shrink-0 w-[0.822px]" data-name="container" />
      <p className="font-['Maax:Bold',sans-serif] leading-[13.146px] not-italic relative shrink-0 text-[#9b9b9b] text-[13.146px] text-center tracking-[-0.1315px]">Recycling Toolkits</p>
      <div className="absolute inset-[87.5%_29.09%_0_29.09%]" data-name="active line" />
    </div>
  );
}

function Tab2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[13.146px] relative shrink-0" data-name="tab 3">
      <div className="h-[52.584px] shrink-0 w-[0.822px]" data-name="container" />
      <p className="font-['Maax:Bold',sans-serif] leading-[13.146px] not-italic relative shrink-0 text-[#9b9b9b] text-[13.146px] text-center tracking-[-0.1315px]">Recycling Stories</p>
      <div className="absolute inset-[87.5%_29.09%_0_29.09%]" data-name="active line" />
    </div>
  );
}

function StickyNav() {
  return (
    <div className="absolute content-stretch flex items-center left-[121.6px] top-0" data-name="Sticky Nav">
      <Tab />
      <Tab1 />
      <Tab2 />
      <div className="absolute h-[52.584px] left-[90.38px] top-0 w-[0.822px]" data-name="line" />
    </div>
  );
}

function SubNav() {
  return (
    <div className="absolute h-[52.584px] left-0 top-[396.84px] w-[1183.132px]" data-name="sub nav">
      <div className="absolute inset-[-3.12%_-0.28%_-9.37%_-0.28%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1189.7 59.1566">
          <g filter="url(#filter0_dd_451_5728)" id="container shadow">
            <path clipRule="evenodd" d={svgPaths.pd84b500} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59.1566" id="filter0_dd_451_5728" width="1189.7" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.64324" />
              <feGaussianBlur stdDeviation="1.64324" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5728" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.246486" />
              <feGaussianBlur stdDeviation="0.205405" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5728" mode="normal" result="effect2_dropShadow_451_5728" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5728" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1183.13 52.5836">
        <path clipRule="evenodd" d="M0 0H1183.13V52.5836H0V0Z" fill="var(--fill-0, #F8F8F2)" fillRule="evenodd" id="container color" />
      </svg>
      <StickyNav />
    </div>
  );
}

function Links() {
  return (
    <div className="absolute inset-[36.36%_10.45%_32.95%_46.77%] overflow-clip" data-name="links">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 not-italic right-[90.32%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Sitemap</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[14.77%] not-italic right-[68.83%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Privacy Policy</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[36.2%] not-italic right-[48.39%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Terms of Use</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[85.19%] not-italic right-[0.19%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Accessibility</p>
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[56.82%] not-italic right-[19.67%] text-[13.146px] text-center text-white top-[calc(50%-11.59px)] tracking-[-0.1315px]">Disputes/Arbitration</p>
      <div className="absolute flex inset-[14.81%_87.66%_25.93%_12.34%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[14.81%_45.94%_25.93%_54.06%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[14.81%_66.4%_25.93%_33.6%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[14.81%_17.05%_25.93%_82.95%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[13.146px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.82px_0.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0632 1.64324">
                <path d={svgPaths.pa15fe40} id="Line 29" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Subfooter() {
  return (
    <div className="absolute bottom-[-0.33px] h-[72.302px] left-0 overflow-clip right-[0.13px]" data-name="Subfooter">
      <div className="absolute bg-[#023625] inset-0" data-name="container-subfooter" />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-[10.42%] not-italic right-[64.48%] text-[13.146px] text-white top-[calc(50%-10.01px)]">© 2021 WM Intellectual Property Holdings, L.L.C.</p>
      <Links />
    </div>
  );
}

function Fb() {
  return (
    <div className="absolute contents right-[281.13px] top-[447.78px]" data-name="FB">
      <div className="absolute right-[281.13px] size-[26.292px] top-[447.78px]" data-name="fb">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <div className="absolute h-[15.024px] right-[291.09px] top-[453.42px] w-[6.935px]" data-name="fb">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.93544 15.0239">
          <path d={svgPaths.p2897ca00} fill="var(--fill-0, white)" id="fb" />
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents right-[132.97px] top-[453.42px]" data-name="Group">
      <div className="absolute h-[4.342px] right-[132.97px] top-[454.94px] w-[2.268px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.26781 4.342">
          <path d={svgPaths.p14dd7980} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[4.395px] right-[135.91px] top-[454.9px] w-[2.309px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.30889 4.3948">
          <path clipRule="evenodd" d={svgPaths.p234d800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[5.8px] right-[138.18px] top-[453.42px] w-[3.004px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.00419 5.80009">
          <path d={svgPaths.p2c366e80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents right-[130.08px] top-[460.19px]" data-name="Group">
      <div className="absolute h-[8.253px] right-[130.08px] top-[460.19px] w-[13.017px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0172 8.25273">
          <path clipRule="evenodd" d={svgPaths.p817bf00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[0.889px] right-[132.05px] top-[463.61px] w-[0.669px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.668903 0.888939">
          <path d={svgPaths.pb1c3800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[2.888px] right-[134.85px] top-[463.6px] w-[0.634px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.633696 2.88763">
          <path d={svgPaths.p36f39340} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function YoutubeIcon() {
  return (
    <div className="absolute contents right-[130.08px] top-[453.42px]" data-name="youtube icon">
      <Group />
      <Group1 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents right-[123.37px] top-[447.78px]">
      <div className="absolute right-[123.37px] size-[26.292px] top-[447.78px]" data-name="youtube">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <YoutubeIcon />
    </div>
  );
}

function Tw() {
  return (
    <div className="absolute contents right-[241.69px] top-[447.78px]" data-name="TW">
      <div className="absolute right-[241.69px] size-[26.292px] top-[447.78px]" data-name="twitter">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <div className="absolute h-[11.268px] right-[247.54px] top-[455.29px] w-[13.871px]" data-name="twitter">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.871 11.2679">
          <path d={svgPaths.p323b700} fill="var(--fill-0, white)" id="twitter" />
        </svg>
      </div>
    </div>
  );
}

function IgIcon() {
  return (
    <div className="absolute contents right-[207.88px] top-[453.42px]" data-name="IG icon">
      <div className="absolute right-[207.88px] size-[15.024px] top-[453.42px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0239 15.0239">
          <path clipRule="evenodd" d={svgPaths.pd17f400} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute right-[211.53px] size-[7.716px] top-[457.07px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.71635 7.71635">
          <path clipRule="evenodd" d={svgPaths.paaaf680} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute right-[210.48px] size-[1.801px] top-[456.02px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.80134 1.80133">
          <path d={svgPaths.p327c9e00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents right-[202.25px] top-[447.78px]">
      <div className="absolute right-[202.25px] size-[26.292px] top-[447.78px]" data-name="IG">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <IgIcon />
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="absolute contents right-[162.81px] top-[447.78px]" data-name="LinkedIn">
      <div className="absolute right-[162.81px] size-[26.292px] top-[447.78px]" data-name="IG">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.2918 26.2918">
          <circle cx="13.1459" cy="13.1459" id="fb" r="12.7351" stroke="var(--stroke-0, white)" strokeWidth="0.821619" />
        </svg>
      </div>
      <div className="absolute h-[10.727px] right-[170.48px] top-[455.45px] w-[10.955px]" data-name="linkedin">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9549 10.7267">
          <path clipRule="evenodd" d={svgPaths.p4705870} fill="var(--fill-0, white)" fillRule="evenodd" id="linkedin" />
        </svg>
      </div>
    </div>
  );
}

function SocialMedia() {
  return (
    <div className="absolute contents right-[123.37px] top-[447.78px]" data-name="social media">
      <Fb />
      <Group16 />
      <Tw />
      <Group15 />
      <LinkedIn />
    </div>
  );
}

function ProductsServices() {
  return (
    <div className="absolute h-[327.004px] leading-[19.719px] left-[123.24px] not-italic overflow-clip text-white top-[110.92px] w-[184.043px]" data-name="Products & Services">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[22.3%] text-[16.432px] top-[calc(50%-163px)] tracking-[-0.6573px]">{`Products & Services`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[11.56%_0_76.21%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">{`Trash Collection & Recycling For Home`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[25.63%_0_62.14%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">{`Waste Disposal & Recycling for Business`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[39.7%_0_54.19%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Roll-Off Dumpster Rental</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[48.74%_0_45.14%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Bulk Trash Pickup</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[57.79%_0_36.09%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Construction Waste Disposal</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[66.83%_0_27.05%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Bagster - Dumpster in a Bag</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[75.88%_0_18%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">eWaste</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[84.92%_0_8.96%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">National Accounts</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[93.97%_0_-0.09%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Moving?</p>
    </div>
  );
}

function QuickInfo() {
  return (
    <div className="absolute h-[142.962px] leading-[19.719px] left-[545.56px] not-italic overflow-clip text-white top-[112.56px] w-[122.421px]" data-name="Quick Info">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[39.55%] text-[16.432px] top-[calc(50%-73.6px)] tracking-[-0.6573px]">Quick Info</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[31.38%] text-[13.146px] top-[calc(50%-37.45px)] tracking-[-0.1315px]">Recycling 101</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[11.78%] text-[13.146px] top-[calc(50%-7.88px)] tracking-[-0.1315px]">Our Service Areas</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[4.43%] text-[13.146px] top-[calc(50%+21.7px)] tracking-[-0.1315px]">Drop-Off Locations</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[-0.47%] text-[13.146px] top-[calc(50%+51.28px)] tracking-[-0.1315px]">Service Notifications</p>
    </div>
  );
}

function CustomerSupport() {
  return (
    <div className="absolute h-[264.561px] leading-[19.719px] left-[336.04px] not-italic overflow-clip text-white top-[110.92px] w-[180.756px]" data-name="Customer Support">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[26.97%] text-[16.432px] top-[calc(50%-132.56px)] tracking-[-0.6573px]">Customer Support</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[14.29%_0_78.15%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Pay My Bill</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[25.47%_0_66.97%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Manage My Account</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[36.65%_0_55.79%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Log in to My WM</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[47.83%_0_44.61%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Customer Support</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[59.01%_0_33.43%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Request an Extra Pickup</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[70.19%_0_22.25%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Missed Pickup</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[81.37%_0_11.07%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">Frequently Asked Questions</p>
      <p className="absolute font-['Maax:Regular',sans-serif] inset-[92.55%_0_-0.11%_0] text-[13.146px] tracking-[-0.1315px] whitespace-pre-wrap">WM.com Security</p>
    </div>
  );
}

function OurCompany() {
  return (
    <div className="absolute h-[202.118px] leading-[19.719px] left-[694.27px] not-italic overflow-clip text-white top-[112.56px] w-[140.497px]" data-name="Our Company">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[28.82%] text-[16.432px] top-[calc(50%-102.76px)] tracking-[-0.6573px]">Our Company</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[48.04%] text-[13.146px] top-[calc(50%-66.61px)] tracking-[-0.1315px]">Who We Are</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[58.01%] text-[13.146px] top-[calc(50%-37.03px)] tracking-[-0.1315px]">Why WM?</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[46.62%] text-[13.146px] top-[calc(50%-7.45px)] tracking-[-0.1315px]">Media Room</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[11.74%] text-[13.146px] top-[calc(50%+22.12px)] tracking-[-0.1315px]">{`Compliance & Ethics`}</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[20.99%] text-[13.146px] top-[calc(50%+51.7px)] tracking-[-0.1315px]">WM Phoenix Open</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[-1.07%] text-[13.146px] top-[calc(50%+81.28px)] tracking-[-0.1315px]">Sustainability Reporting</p>
    </div>
  );
}

function WorkWithUs() {
  return (
    <div className="absolute h-[141.319px] leading-[19.719px] left-[861.88px] not-italic overflow-clip text-white top-[112.56px] w-[157.751px]" data-name="Work With Us">
      <p className="absolute font-['Maax:Bold',sans-serif] left-0 right-[39.14%] text-[16.432px] top-[calc(50%-71.96px)] tracking-[-0.6573px]">Work With Us</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[70.84%] text-[13.146px] top-[calc(50%-37.45px)] tracking-[-0.1315px]">Careers</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[66.4%] text-[13.146px] top-[calc(50%-7.88px)] tracking-[-0.1315px]">Investors</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[64.5%] text-[13.146px] top-[calc(50%+21.7px)] tracking-[-0.1315px]">Suppliers</p>
      <p className="absolute font-['Maax:Regular',sans-serif] left-0 right-[-0.16%] text-[13.146px] top-[calc(50%+51.28px)] tracking-[-0.1315px]">{`Acquisitions & Divestitures`}</p>
    </div>
  );
}

function Logo2() {
  return (
    <div className="absolute h-[28.463px] left-[123.24px] top-[32.86px] w-[79.697px]" data-name="logo">
      <div className="absolute inset-[0_-0.06%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.7475 28.4632">
          <g id="logo">
            <path d={svgPaths.p309a5200} fill="var(--fill-0, white)" id="icon color" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="-translate-y-1/2 absolute h-[18.076px] left-[48.89px] top-[calc(50%+0.14px)] w-[16.432px]" data-name="dropdown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4324 18.0756">
        <g id="dropdown">
          <path clipRule="evenodd" d={svgPaths.p3bf01900} fill="var(--fill-0, #1C8200)" fillRule="evenodd" id="icon color" />
        </g>
      </svg>
    </div>
  );
}

function ElementLanguageSelectorClose() {
  return (
    <div className="absolute h-[19.719px] right-[115.16px] top-[37.79px] w-[65.73px]" data-name="element/language selector/close">
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[19.719px] left-[-0.41px] not-italic text-[#4f4f59] text-[13.146px] top-[calc(50%-9.72px)]">English</p>
      <Dropdown />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-[-2598.59px] left-0 top-[4739.92px] w-[1183.132px]" data-name="footer">
      <div className="absolute bg-[#024731] inset-0" data-name="container" />
      <Subfooter />
      <SocialMedia />
      <ProductsServices />
      <QuickInfo />
      <CustomerSupport />
      <OurCompany />
      <WorkWithUs />
      <div className="absolute bg-white inset-[14.92%_10.21%_84.94%_10.63%]" data-name="Line" />
      <Logo2 />
      <ElementLanguageSelectorClose />
    </div>
  );
}

function Contents3() {
  return (
    <div className="absolute h-[111.74px] left-[320.43px] not-italic overflow-clip top-0 w-[535.696px] whitespace-pre-wrap" data-name="contents">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] text-[13.146px] top-[72.3px] w-[535.696px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio metus ipsum tellus ornare amet feugiat amet. Enim amet facilisi amet eget auctor.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 text-[26.292px] text-black top-0 tracking-[-1.0517px] w-[535.696px]">
        Article headline goes here lorem ipsum
        <br aria-hidden="true" />
        Second line headline goes here lorem ipsum
      </p>
    </div>
  );
}

function ArticleList3() {
  return (
    <div className="absolute h-[223.48px] left-[123.24px] top-[594.85px] w-[936.646px]" data-name="article list 3">
      <div className="absolute h-[196.367px] left-0 top-0 w-[936.646px]" data-name="container" />
      <div className="absolute bottom-[0.48px] h-[0.822px] left-0 w-[936.646px]" data-name="line" />
      <Contents3 />
      <div className="absolute h-[196.367px] left-0 top-0 w-[294.14px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
      </div>
    </div>
  );
}

function Contents4() {
  return (
    <div className="absolute h-[111.74px] left-[320.43px] not-italic overflow-clip top-0 w-[535.696px] whitespace-pre-wrap" data-name="contents">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] text-[13.146px] top-[72.3px] w-[535.696px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio metus ipsum tellus ornare amet feugiat amet. Enim amet facilisi amet eget auctor.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 text-[26.292px] text-black top-0 tracking-[-1.0517px] w-[535.696px]">
        Article headline goes here lorem ipsum
        <br aria-hidden="true" />
        Second line headline goes here lorem ipsum
      </p>
    </div>
  );
}

function ArticleList2() {
  return (
    <div className="absolute h-[223.48px] left-[123.24px] top-[345.08px] w-[936.646px]" data-name="article list 2">
      <div className="absolute h-[196.367px] left-0 top-0 w-[936.646px]" data-name="container" />
      <div className="absolute bg-[#d6d6d6] bottom-[0.48px] h-[0.822px] left-0 w-[936.646px]" data-name="line" />
      <Contents4 />
      <div className="absolute h-[196.367px] left-0 top-0 w-[294.14px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
    </div>
  );
}

function Contents5() {
  return (
    <div className="absolute h-[111.74px] left-[320.43px] not-italic overflow-clip top-0 w-[535.696px] whitespace-pre-wrap" data-name="contents">
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[19.719px] left-0 text-[#4f4f59] text-[13.146px] top-[72.3px] w-[535.696px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio metus ipsum tellus ornare amet feugiat amet. Enim amet facilisi amet eget auctor.</p>
      <p className="absolute font-['Maax:Bold',sans-serif] leading-[29.578px] left-0 text-[26.292px] text-black top-0 tracking-[-1.0517px] w-[535.696px]">
        Article headline goes here lorem ipsum
        <br aria-hidden="true" />
        Second line headline goes here lorem ipsum
      </p>
    </div>
  );
}

function ArticleList1() {
  return (
    <div className="absolute h-[223.48px] left-[123.24px] top-[95.31px] w-[936.646px]" data-name="article list 1">
      <div className="absolute h-[196.367px] left-0 top-0 w-[936.646px]" data-name="container" />
      <div className="absolute bg-[#d6d6d6] bottom-[0.48px] h-[0.822px] left-0 w-[936.646px]" data-name="line" />
      <Contents5 />
      <div className="absolute h-[196.367px] left-0 top-0 w-[294.14px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage15} />
      </div>
    </div>
  );
}

function ArticleList() {
  return (
    <div className="absolute h-[851.198px] left-0 top-0 w-[1183.132px]" data-name="article list">
      <div className="absolute bg-white h-[851.198px] left-0 top-0 w-[1183.132px]" data-name="bg" />
      <ArticleList3 />
      <ArticleList2 />
      <ArticleList1 />
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#024731] text-[32.865px] top-[32.86px] tracking-[-0.2465px] w-[615.393px] whitespace-pre-wrap">More recycing stories</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute font-['Maax:Bold',sans-serif] h-[583.35px] leading-[normal] left-[201.3px] not-italic overflow-clip text-[65.73px] text-white top-[133.92px] tracking-[-0.6573px] w-[133.924px]" data-name="Group">
      <p className="absolute left-0 opacity-50 right-[-0.06%] top-[calc(50%-291.67px)]">FPO</p>
      <p className="absolute left-0 opacity-50 right-[-0.06%] top-[calc(50%-39.44px)]">FPO</p>
      <p className="absolute left-0 opacity-50 right-[-0.06%] top-[calc(50%+212.8px)]">FPO</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[120.01%_0_-51.38%_0] overflow-clip">
      <ArticleList />
      <Group3 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[26.29px] h-[6.573px] left-1/2 w-[46.011px]" data-name="pagination">
      <div className="absolute inset-[-25%_0_-25%_-3.57%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.6539 9.85943">
          <g id="pagination">
            <circle cx="44.3674" cy="4.92972" fill="var(--fill-0, #767676)" id="pagination dot 4" r="3.28648" />
            <circle cx="31.2215" cy="4.92972" fill="var(--fill-0, #767676)" id="pagination dot 3" r="3.28648" />
            <circle cx="18.0756" cy="4.92972" fill="var(--fill-0, #767676)" id="pagination dot 2" r="3.28648" />
            <circle cx="4.92972" cy="4.92972" id="pagination dot 1" r="4.1081" stroke="var(--stroke-0, #024731)" strokeWidth="1.64324" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame105() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.573px] items-start left-[26.29px] not-italic top-[147.89px] w-[242.378px] whitespace-pre-wrap">
      <p className="font-['Maax:Bold',sans-serif] leading-[11.503px] relative shrink-0 text-[#024731] text-[11.503px] tracking-[1.1503px] uppercase w-full">Service</p>
      <p className="font-['Maax:Bold',sans-serif] leading-[29.578px] relative shrink-0 text-[26.292px] text-black tracking-[-1.0517px] w-full">Electronics Recycling</p>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] relative shrink-0 text-[#4f4f59] text-[13.146px] w-full">Wondering what to do with old TVs, computers, printers, phones, or appliances? Waste Management will help you dispose of electronics safely and responsibly.</p>
    </div>
  );
}

function GraphicsCutoutElectronicRecycling() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.41px)] size-[134.746px] top-0" data-name="graphics/cutout/electronic_recycling">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.008 128.008">
          <circle cx="64.0041" cy="64.0041" fill="var(--fill-0, #EFEFE4)" id="container" r="64.0041" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img15} />
    </div>
  );
}

function ServiceCardCopy() {
  return (
    <div className="absolute h-[442.853px] left-[765.75px] top-[129.82px] w-[294.961px]" data-name="service card copy 6">
      <div className="absolute h-[375.48px] left-0 top-[67.37px] w-[294.961px]" data-name="container">
        <div className="absolute inset-[-0.44%_-1.11%_-1.31%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.534 382.053">
            <g filter="url(#filter0_dd_451_5736)" id="container">
              <path clipRule="evenodd" d={svgPaths.p4523d80} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5736" width="301.534" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5736" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5736" mode="normal" result="effect2_dropShadow_451_5736" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5736" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[42.72px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] left-[26.29px] not-italic text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-y-full underline">Learn More</p>
      <Frame105 />
      <GraphicsCutoutElectronicRecycling />
    </div>
  );
}

function Frame104() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.573px] items-start left-[26.29px] not-italic top-[147.89px] w-[242.378px] whitespace-pre-wrap">
      <p className="font-['Maax:Bold',sans-serif] leading-[11.503px] relative shrink-0 text-[#024731] text-[11.503px] tracking-[1.1503px] uppercase w-full">Service</p>
      <p className="font-['Maax:Bold',sans-serif] leading-[29.578px] relative shrink-0 text-[26.292px] text-black tracking-[-1.0517px] w-full">LampTracker® - Universal Waste Recycling by Mail</p>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] relative shrink-0 text-[#4f4f59] text-[13.146px] w-full">The WM LampTracker® program is a safe, cost-effective way to recycle universal waste, including items that contain mercury. The program includes prepaid postage and complete online documentation.</p>
    </div>
  );
}

function GraphicsCutoutLamptracker() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.41px)] size-[134.746px] top-0" data-name="graphics/cutout/lamptracker">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.008 128.008">
          <circle cx="64.0041" cy="64.0041" fill="var(--fill-0, #EFEFE4)" id="container" r="64.0041" />
        </svg>
      </div>
    </div>
  );
}

function ServiceCardCopy1() {
  return (
    <div className="absolute h-[442.853px] left-[444.5px] top-[129.82px] w-[294.961px]" data-name="service card copy 7">
      <div className="absolute h-[375.48px] left-0 top-[67.37px] w-[294.961px]" data-name="container">
        <div className="absolute inset-[-0.44%_-1.11%_-1.31%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.534 382.053">
            <g filter="url(#filter0_dd_451_5736)" id="container">
              <path clipRule="evenodd" d={svgPaths.p4523d80} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5736" width="301.534" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5736" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5736" mode="normal" result="effect2_dropShadow_451_5736" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5736" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[42.72px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] left-[26.29px] not-italic text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-y-full underline">Learn More</p>
      <Frame104 />
      <GraphicsCutoutLamptracker />
    </div>
  );
}

function Frame106() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.573px] items-start left-[26.29px] not-italic top-[147.89px] w-[242.378px] whitespace-pre-wrap">
      <p className="font-['Maax:Bold',sans-serif] leading-[11.503px] relative shrink-0 text-[#024731] text-[11.503px] tracking-[1.1503px] uppercase w-full">Service</p>
      <p className="font-['Maax:Bold',sans-serif] leading-[29.578px] relative shrink-0 text-[26.292px] text-black tracking-[-1.0517px] w-full">{`Home Waste & Recycling`}</p>
      <p className="font-['Maax:Regular',sans-serif] leading-[19.719px] relative shrink-0 text-[#4f4f59] text-[13.146px] w-full">Get free account setup and container delivery to help you manage your residential waste and recycling.</p>
    </div>
  );
}

function Cutout() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.41px)] size-[134.746px] top-0" data-name="cutout">
      <div className="absolute inset-[2.5%]" data-name="container">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.008 128.008">
          <circle cx="64.0041" cy="64.0041" fill="var(--fill-0, #EFEFE4)" id="container" r="64.0041" />
        </svg>
      </div>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
    </div>
  );
}

function ProductCard() {
  return (
    <div className="absolute h-[442.853px] left-[123.24px] top-[129.82px] w-[294.961px]" data-name="product card">
      <div className="absolute bottom-0 h-[375.48px] left-0 w-[294.961px]" data-name="container">
        <div className="absolute inset-[-0.44%_-1.11%_-1.31%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.534 382.053">
            <g filter="url(#filter0_dd_451_5736)" id="container">
              <path clipRule="evenodd" d={svgPaths.p4523d80} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="382.053" id="filter0_dd_451_5736" width="301.534" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.64324" />
                <feGaussianBlur stdDeviation="1.64324" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5736" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.246486" />
                <feGaussianBlur stdDeviation="0.205405" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="effect1_dropShadow_451_5736" mode="normal" result="effect2_dropShadow_451_5736" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5736" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] absolute bottom-[42.72px] decoration-solid font-['Maax:Regular',sans-serif] leading-[16.432px] left-[26.29px] not-italic text-[#024731] text-[13.146px] tracking-[-0.1315px] translate-y-full underline">Learn More</p>
      <Frame106 />
      <Cutout />
    </div>
  );
}

function ArrowButton() {
  return (
    <div className="-translate-y-1/2 absolute left-[57.51px] size-[39.438px] top-[calc(50%+16.02px)]" data-name="arrow button">
      <div className="absolute inset-[-12.5%_-25%_-37.5%_-25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.1566 59.1566">
          <g id="arrow button">
            <g filter="url(#filter0_dd_451_5502)" id="container">
              <circle cx="29.5783" cy="24.6486" fill="var(--fill-0, #1C8200)" r="19.7189" />
            </g>
            <g id="arrow - right">
              <path clipRule="evenodd" d={svgPaths.p38295900} fill="var(--fill-0, white)" fillRule="evenodd" id="icon color" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59.1566" id="filter0_dd_451_5502" width="59.1566" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.92972" />
              <feGaussianBlur stdDeviation="4.92972" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5502" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.657295" />
              <feGaussianBlur stdDeviation="0.616214" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5502" mode="normal" result="effect2_dropShadow_451_5502" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5502" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ArrowButton1() {
  return (
    <div className="-translate-y-1/2 absolute right-[59.98px] size-[40.259px] top-[calc(50%+16.43px)]" data-name="arrow button">
      <div className="absolute inset-[-12.24%_-24.49%_-36.73%_-24.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.9782 59.9782">
          <g id="arrow button">
            <g filter="url(#filter0_dd_451_5522)" id="container">
              <circle cx="29.9891" cy="25.0594" fill="var(--fill-0, #1C8200)" r="20.1297" />
            </g>
            <g id="arrow - right">
              <path clipRule="evenodd" d={svgPaths.p3326d940} fill="var(--fill-0, white)" fillRule="evenodd" id="icon color" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59.9782" id="filter0_dd_451_5522" width="59.9782" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.92972" />
              <feGaussianBlur stdDeviation="4.92972" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_451_5522" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.657295" />
              <feGaussianBlur stdDeviation="0.616214" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect1_dropShadow_451_5522" mode="normal" result="effect2_dropShadow_451_5522" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_451_5522" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ProductCarousel() {
  return (
    <div className="absolute h-[631.825px] left-[0.82px] top-[4108.1px] w-[1183.132px]" data-name="product carousel">
      <div className="absolute bg-white h-[631.825px] left-0 top-0 w-[1183.132px]" data-name="container" />
      <div className="absolute bg-[#f8f8f2] bottom-0 h-[299.891px] left-0 w-[1183.132px]" data-name="container - half" />
      <Pagination />
      <ServiceCardCopy />
      <ServiceCardCopy1 />
      <ProductCard />
      <ArrowButton />
      <ArrowButton1 />
      <p className="absolute font-['Maax:Regular',sans-serif] leading-[21.362px] left-[123.24px] not-italic text-[14.789px] text-white top-[82.16px] w-[455.177px] whitespace-pre-wrap">Body</p>
      <p className="absolute font-['Maax:Black',sans-serif] leading-[36.151px] left-[123.24px] not-italic text-[#024731] text-[32.865px] top-[39.44px] tracking-[-0.2465px] w-[775.609px] whitespace-pre-wrap">Explore our recycling services</p>
    </div>
  );
}

function Image18() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="Image 1">
      <div className="absolute bg-[#f8f8f2] h-[558.701px] left-0 top-[1766.48px] w-[1183.132px]" data-name="Rectangle" />
      <FlipCards />
      <Multimedia2Copy />
      <InteractiveAcceptedMaterials />
      <HeadlineBodyDesktop />
      <PromotionalModuleDarkGreen />
      <CardGrid />
      <Hero />
      <TopNav />
      <SubNav />
      <Footer />
      <Group2 />
      <ProductCarousel />
    </div>
  );
}

function Frame98() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.176px] left-[calc(50%+0.35px)] top-[calc(50%-0.41px)] w-[36.706px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.7059 27.1765">
        <g id="Frame 1618872789">
          <path clipRule="evenodd" d={svgPaths.p10075300} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall" />
          <path clipRule="evenodd" d={svgPaths.pb462e00} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall_2" />
        </g>
      </svg>
    </div>
  );
}

function CircleCaretLeft1() {
  return (
    <div className="absolute bg-[rgba(25,25,25,0.4)] right-[-40px] rounded-[1000px] size-[80px] top-[532.8px]" data-name="circleCaret/left">
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-[-0.5px] pointer-events-none rounded-[1000.5px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <Frame98 />
      <div className="absolute border border-[#e8e8e8] border-solid inset-0 rounded-[100px]" data-name="border" />
    </div>
  );
}

function RightImage1() {
  return (
    <div className="absolute content-stretch flex h-[3366px] items-center left-0 top-px w-[589px]" data-name="Right Image">
      <Image18 />
      <div className="bg-[#023625] h-[1144px] shrink-0 w-[2px]" data-name="Line" />
      <CircleCaretLeft1 />
    </div>
  );
}

function Comparison1() {
  return (
    <div className="h-[3369px] relative rounded-[16px] shrink-0 w-[1180px]" data-name="Comparison">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Image17 />
        <RightImage1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function SectionCardsVertical2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section Cards / Vertical">
      <SectionHeadingFull17 />
      <Row20 />
      <SectionHeadingFull18 />
      <Frame100 />
      <Comparison1 />
    </div>
  );
}

function CountTitle19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Count + Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Designing for different surfaces</p>
    </div>
  );
}

function Title19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[72px] items-start min-h-px min-w-px relative" data-name="title">
      <CountTitle19 />
    </div>
  );
}

function SectionHeadingFull19() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start pt-[40px] relative shrink-0 w-full" data-name="Section Heading / Full">
      <Title19 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Although brand expression has shifted to focus on photography, the system rules remain unchanged to ensure that scaling does not affect performance.</p>
    </div>
  );
}

function Grid() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="grid 1">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[16px]" data-name="Image 4">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#e3f233] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[124.38%] left-[6.39%] max-w-none top-[4.1%] w-[88.21%]" src={imgImage16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Grid1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="grid 2">
      <div className="flex-[1_0_0] h-[571.407px] min-h-px min-w-px relative rounded-[16px]" data-name="Image 4">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#3c8a2e] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[127.57%] left-[4.84%] max-w-none top-[-29.37%] w-[90.47%]" src={imgImage17} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Grid2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="grid 3">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[16px]" data-name="Image 4">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#1c4632] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[122.6%] left-[6.52%] max-w-none top-[3.49%] w-[86.95%]" src={imgImage18} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualGrid3() {
  return (
    <div className="content-stretch flex gap-[16px] h-[571.407px] items-start relative shrink-0 w-full" data-name="Visual Grid">
      <Grid />
      <Grid1 />
      <Grid2 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <VisualGrid3 />
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full">
      <div className="aspect-[356/354] flex-[1_0_0] min-h-px min-w-px relative rounded-[18px]" data-name="grid 4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
          <img alt="" className="absolute h-[251.13%] left-[-194.39%] max-w-none top-[-29.1%] w-[524.46%]" src={imgGrid4} />
        </div>
      </div>
      <div className="aspect-[352/354] flex-[1_0_0] min-h-px min-w-px relative rounded-[18px]" data-name="grid 5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
          <img alt="" className="absolute h-[251.13%] left-[-305.69%] max-w-none top-[-29.1%] w-[530.42%]" src={imgGrid4} />
        </div>
      </div>
      <div className="aspect-[356/356] flex-[1_0_0] min-h-px min-w-px relative rounded-[18px]" data-name="grid 6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
          <img alt="" className="absolute h-[249.72%] left-[-194.39%] max-w-none top-[-133.43%] w-[524.46%]" src={imgGrid4} />
        </div>
      </div>
    </div>
  );
}

function Grid3() {
  return (
    <div className="bg-[#e3f233] h-[547px] overflow-clip relative shrink-0 w-full" data-name="grid 7">
      <div className="absolute h-[860px] left-[133px] top-[30px] w-[440px]" data-name="image 111">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.37%] left-[-27.28%] max-w-none top-[-3.37%] w-[424.33%]" src={imgImage111} />
        </div>
      </div>
      <div className="absolute h-[860px] left-[608px] top-[-384px] w-[440px]" data-name="image 112">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.37%] left-[-27.28%] max-w-none top-[-3.37%] w-[424.33%]" src={imgImage111} />
        </div>
      </div>
    </div>
  );
}

function VisualGrid4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Visual Grid">
      <Frame107 />
      <Grid3 />
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Section1 />
      <VisualGrid4 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[83px] items-start min-h-px min-w-px relative">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[40px] text-black w-full whitespace-pre-wrap">{`Reflections & Takeaways`}</p>
    </div>
  );
}

function SectionHeadingFull20() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Section Heading / Full">
      <Frame82 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">Reflecting on this ambitious project with its tight deadlines, I realize it taught me the importance of being systematic. I learned how to implement strategies for quick scaling, but I also recognize that I could have improved by compromising more effectively and delegating tasks better throughout the process.</p>
    </div>
  );
}

function ArrowLeft1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow/left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow/left">
          <path d={svgPaths.p652cc80} fill="var(--fill-0, #4E4F4E)" id="arrowLeft" />
        </g>
      </svg>
    </div>
  );
}

function TextLinkBack1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Text Link / Back">
      <ArrowLeft1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Back</p>
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex h-[200px] items-center relative shrink-0 w-full" data-name="Column 4">
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-full min-h-px min-w-px rounded-[16px]" data-name="Image 4" />
    </div>
  );
}

function ImageSlotSmall() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Image slot / small">
      <div className="absolute bg-[#d9d9d9] inset-0 rounded-[16px]" />
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black">Project name</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">{`Lorem ipsum dolor sit amet consectetur. Risus leo et eu pellentesque viverra enim eget tempor. Laoreet pulvinar `}</p>
    </div>
  );
}

function ValueProp12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Value Prop">
      <ImageSlotSmall />
      <Frame84 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
      <TextLinkBack1 />
      <Column8 />
      <ValueProp12 />
    </div>
  );
}

function ArrowRight4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow/right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow/right">
          <path d={svgPaths.pf3d430} fill="var(--fill-0, black)" id="arrowRight" />
        </g>
      </svg>
    </div>
  );
}

function TextLinkNext() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Text Link / Next">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">Next</p>
      <ArrowRight4 />
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex h-[200px] items-center relative shrink-0 w-full" data-name="Column 4">
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-full min-h-px min-w-px rounded-[16px]" data-name="Image 4" />
    </div>
  );
}

function ImageSlotSmall1() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Image slot / small">
      <div className="absolute bg-[#d9d9d9] inset-0 rounded-[16px]" />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black">Project name</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">{`Lorem ipsum dolor sit amet consectetur. Risus leo et eu pellentesque viverra enim eget tempor. Laoreet pulvinar `}</p>
    </div>
  );
}

function ValueProp13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Value Prop">
      <ImageSlotSmall1 />
      <Frame86 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-h-px min-w-px relative">
      <TextLinkNext />
      <Column9 />
      <ValueProp13 />
    </div>
  );
}

function Component2Colums() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="2 colums">
      <Frame83 />
      <Frame85 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-1 flex-col gap-12 md:gap-16 lg:gap-[80px] items-center min-h-px w-full max-w-full min-w-0 relative">
      <VisualGrid />
      <Section />
      <SectionCards />
      <SectionCards3 />
      <Comparison />
      <SectionCardsVertical2 />
      <SectionHeadingFull19 />
      <Frame108 />
      <SectionHeadingFull20 />
      <Component2Colums />
    </div>
  );
}

function Frame88() {
  return (
    <div className="relative shrink-0 w-full overflow-x-hidden">
      <div className="flex flex-row items-center justify-center w-full">
        <div className="content-stretch flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[280px] relative w-full max-w-full">
          <Frame52 />
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#1c8200] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[1000px] shrink-0" data-name="button">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white">All Projects</p>
    </div>
  );
}

export default function WmDesignSystem() {
  return (
    <div className="bg-white w-full max-w-full overflow-x-hidden flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-[80px] items-center justify-center pb-12 md:pb-16 lg:pb-[100px] relative" data-name="WM Design System 2026">
      <Heading />
      <ProjectDetails />
      <Frame88 />
      <Button11 />
    </div>
  );
}