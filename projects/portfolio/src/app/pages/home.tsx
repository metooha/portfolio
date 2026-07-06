import { useNavigate } from "react-router-dom";
import coffeeIllustration from "@/app/assets/pages/profile/shared/coffee-illustration.png";
import sparklesIllustration from "@/app/assets/pages/profile/shared/sparkles-illustration.png";
import pencilIllustration from "@/app/assets/pages/profile/shared/pencil-illustration.png";
import peaceIllustration from "@/app/assets/pages/profile/shared/peace-illustration.png";
import colorSwatchIllustration from "@/app/assets/pages/profile/shared/color-swatch-illustration.png";
import pixelEmojiIllustration from "@/app/assets/pages/home/pixel-emoji-illustration.png";
import { Button } from "@/app/components/Button/Button";
import { CaseStudyCard } from "@/app/components/CaseStudyCard";
import { PageContainer } from "@/app/components/layout";
import { CaseStudyHeroText } from "@/app/components/CaseStudyText/CaseStudyText";
import { Body, Heading } from "@/app/components/Text/Text";
import { getFeaturedCaseStudies } from "@/app/data/case-studies-config";

const sparklesCursor =
  "https://images.unsplash.com/photo-1576499162440-5e55a43278e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFya2xlcyUyMHN0YXIlMjBpY29ufGVufDF8fHx8MTc2ODg2NTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const skillPillBaseClass =
  "inline-flex items-center px-4 py-2 text-sm font-normal border-2 border-black rounded-full whitespace-nowrap transition-transform hover:scale-110 hover:rotate-2 duration-200";

const skillPillOutlineClass = `${skillPillBaseClass} bg-white text-black`;

const skillPillFilledClass = `${skillPillBaseClass} bg-black text-white`;

function SkillTag({
  children,
  filled = false,
}: {
  children: React.ReactNode;
  filled?: boolean;
}) {
  return (
    <span
      className={filled ? skillPillFilledClass : skillPillOutlineClass}
      style={{ cursor: `url(${sparklesCursor}), auto` }}
    >
      {children}
    </span>
  );
}

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <PageContainer className="pt-0 pb-16 md:pb-24" maxWidth="max-w-7xl">
        <div className="py-6 md:py-8 mt-8 md:mt-10 mb-1 pb-8 md:pb-10">
          <CaseStudyHeroText
            as="p"
            UNSAFE_className="flex flex-wrap items-center gap-2 md:gap-3 w-full"
          >
            <span style={{ color: "var(--ld-semantic-color-text, #111827)" }}>Hello, there.</span>
            <img
              src={sparklesIllustration}
              alt=""
              className="w-8 h-8 md:w-10 md:h-10 inline-block hidden md:inline-block shrink-0"
            />
            <span style={{ color: "var(--ld-semantic-color-text, #111827)" }}>I'm Amy, a</span>
            <span style={{ color: "var(--ld-semantic-color-text-brand, #4f39f6)" }}>
              Principal Product
            </span>
            <span className="inline-flex items-center gap-2 md:gap-3">
              <span style={{ color: "var(--ld-semantic-color-text-brand, #4f39f6)" }}>
                Designer,
              </span>
              <img
                src={pencilIllustration}
                alt=""
                className="w-8 h-8 md:w-12 md:h-12 shrink-0 hidden md:inline-block"
              />
            </span>
            <span style={{ color: "var(--ld-semantic-color-text, #111827)" }}>
              who builds scalable products, with a focus on branding, usability, and workflow
              integrations.
            </span>
          </CaseStudyHeroText>
        </div>

        <div className="mb-16">
          <Heading
            as="h2"
            size="large"
            weight="default"
            UNSAFE_className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 my-6 md:my-8 pb-6 font-normal"
          >
            with my skills in:
          </Heading>
          <div className="flex flex-wrap justify-start items-center gap-3 w-full">
            <SkillTag>Enterprise Design Systems</SkillTag>
            <SkillTag filled>UX &amp; UI</SkillTag>
            <img src={coffeeIllustration} alt="" className="w-10 h-10 inline-block" />
            <SkillTag>Systems</SkillTag>
            <SkillTag filled>Platforms</SkillTag>
            <SkillTag filled>Branding</SkillTag>
            <img src={peaceIllustration} alt="" className="w-10 h-10 inline-block" />
            <SkillTag>Architecture</SkillTag>
            <SkillTag>Automation</SkillTag>
            <img src={pixelEmojiIllustration} alt="" className="w-10 h-10 inline-block" />
            <SkillTag>Infrastructure</SkillTag>
            <SkillTag>Governance</SkillTag>
            <img src={colorSwatchIllustration} alt="" className="w-10 h-10 inline-block" />
            <SkillTag filled>Tokenization</SkillTag>
            <SkillTag filled>Strategy</SkillTag>
            <SkillTag>Prototyping</SkillTag>
            <SkillTag filled>Scalability</SkillTag>
            <SkillTag filled>Workflow Integration</SkillTag>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center gap-6 pt-[60px] pb-[60px]">
            <Body as="p" size="large" color="subtle" UNSAFE_className="text-2xl font-normal">
              Wanna work together? Let's Chat
            </Body>
            <Button
              variant="primary"
              size="large"
              shape="pill"
              type="button"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <Heading
            as="h1"
            size="large"
            weight="default"
            color="brand"
            UNSAFE_className="text-[48px]"
          >
            My featured work
          </Heading>
        </div>

        <div className="space-y-16">
          {getFeaturedCaseStudies().map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-0 w-full">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24">
            <path
              d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"
              fill="var(--ld-semantic-color-fill-accent-yellow, #6366f1)"
            />
          </svg>
        </div>
      </PageContainer>
    </div>
  );
}
