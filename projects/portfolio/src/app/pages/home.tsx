import { Link } from "react-router-dom";
import coffeeIllustration from "figma:asset/733a7871df6fcaf7034192ea656e0879f5c27768.png";
import sparklesIllustration from "figma:asset/abceb447c7b4723a4186029f5f69bb90179b0e6a.png";
import pencilIllustration from "figma:asset/a11b8f2d4e3a31105c0a88c92c8abee704d829b5.png";
import peaceIllustration from "figma:asset/afce2a00dc589e65b89908eeb96feb128961ff73.png";
import colorSwatchIllustration from "figma:asset/66fffb1db7cc8a8b4d18368a523c4d55f2aa5019.png";
import pixelEmojiIllustration from "figma:asset/ef7f42724cb7196ae5428abc2d8d64ad71405f94.png";
import { PageContainer } from "@/app/components/layout";
import { CaseStudyCard } from "@/app/components/CaseStudyCard";
import { getFeaturedCaseStudies } from "@/data/case-studies-config";

const sparklesCursor = "https://images.unsplash.com/photo-1576499162440-5e55a43278e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFya2xlcyUyMHN0YXIlMjBpY29ufGVufDF8fHx8MTc2ODg2NTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Home() {
  return (
    <div className="min-h-screen">
      <PageContainer className="pt-0 pb-16 md:pb-24" maxWidth="max-w-7xl">
      {/* Hero Header */}
      <div className="py-6 md:py-8 mt-8 md:mt-10 mb-1 pb-8 md:pb-10">
        <p className="flex flex-wrap items-center gap-2 md:gap-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.15] w-full">
          <span className="text-black">Hello, there.</span>
          <img src={sparklesIllustration} alt="" className="w-8 h-8 md:w-10 md:h-10 inline-block hidden md:inline-block shrink-0" />
          <span className="text-black">I'm Amy, a</span>
          <span className="text-indigo-600 font-bold">Principal Product Designer,</span>
          <img src={pencilIllustration} alt="" className="w-8 h-8 md:w-12 md:h-12 inline-block hidden md:inline-block shrink-0" />
          <span className="text-black">who builds scalable products, with a focus on branding, usability, and workflow integrations.</span>
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 my-6 md:my-8 font-normal">with my skills in:</h2>
        <div className="flex flex-wrap justify-start items-center gap-2 w-full">
          {/* Skill pills - uniform size and straight alignment */}
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Enterprise Design Systems</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>UX & UI</span>
          
          <img src={coffeeIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Systems</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Platforms</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Branding</span>
          
          <img src={peaceIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Architecture</span>
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Automation</span>
          
          <img src={pixelEmojiIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Infrastructure</span>
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Governance</span>
          
          <img src={colorSwatchIllustration} alt="" className="w-10 h-10 inline-block" />
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Tokenization</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Strategy</span>
          
          <span className="px-3 py-1.5 border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Prototyping</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Scalability</span>
          
          <span className="px-3 py-1.5 bg-black text-white border-2 border-black rounded-full text-sm font-medium transition-transform hover:scale-110 hover:rotate-2 duration-200" style={{ cursor: `url(${sparklesCursor}), auto` }}>Workflow Integration</span>
        </div>
      </div>

      {/* Let's Chat Section */}
      <div className="mb-16">
        <div className="flex items-center justify-center gap-6 pt-[100px] pr-[0px] pb-[0px] pl-[0px] px-[0px] py-[100px]">
          <p className="text-2xl text-gray-700 font-normal">Wanna work together? Let's Chat</p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-[#4F39F6] text-white rounded-full hover:bg-[#3d2bc4] transition-colors font-semibold">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Work Section */}
      <div className="mb-8">
        <h1 className="text-[48px] font-bold text-[rgb(79,57,246)]">My featured work</h1>
      </div>

      {/* Case Studies Section */}
      <div className="space-y-16">
        {getFeaturedCaseStudies().map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>

      {/* Purple wavy decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-24"
        >
          <path
            d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"
            fill="#6366f1"
          />
        </svg>
      </div>
      </PageContainer>
    </div>
  );
}