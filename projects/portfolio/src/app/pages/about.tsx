import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionHeader,
} from "@/app/components/patterns/Accordion";
import { Link } from "@/app/components/Link/Link";
import gardenImage from "@/app/assets/pages/about/about-me.png";
import { motion, useInView } from "motion/react";
import React, { useRef, useEffect } from "react";
import timeline1 from "@/app/assets/pages/about/carbon.png";
import timeline2 from "@/app/assets/pages/about/retail.png";
import timeline3 from "@/app/assets/pages/about/xense-bio.png";
import timeline4 from "@/app/assets/pages/about/design-system.png";
import timeline5 from "@/app/assets/pages/about/desktop.png";
import timeline6 from "@/app/assets/pages/about/digit.png";
import timeline7 from "@/app/assets/pages/about/oportun.png";
import hobby1 from "@/app/assets/pages/about/hobbies/countries-visited.png";
import hobby2 from "@/app/assets/pages/about/hobbies/distance-ridden.png";
import hobby3 from "@/app/assets/pages/about/plants.png";
import hobby4 from "@/app/assets/pages/about/white-sands-national-park.png";
import hobby5 from "@/app/assets/pages/about/hobbies/wipe-outs.png";
import hobby6 from "@/app/assets/pages/about/fishing.png";
import hobby7 from "@/app/assets/pages/about/hobbies/board-games.png";
import hobby8 from "@/app/assets/pages/about/tahoe.png";
import coffeeIllustration from "@/app/assets/pages/profile/shared/coffee-illustration.png";
import sparklesIllustration from "@/app/assets/pages/profile/shared/sparkles-illustration.png";
import pencilIllustration from "@/app/assets/pages/profile/shared/pencil-illustration.png";
import peaceIllustration from "@/app/assets/pages/profile/shared/peace-illustration.png";
import colorSwatchIllustration from "@/app/assets/pages/profile/shared/color-swatch-illustration.png";

export function About() {
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineSectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isTimelineInView) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const scrollDuration = 7000;
    const startTime = Date.now();
    let frameId = 0;

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      container.scrollLeft = maxScroll * progress;

      if (progress < 1) {
        frameId = requestAnimationFrame(animateScroll);
      }
    };

    const timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(animateScroll);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [isTimelineInView]);

  return (
    <div className="min-h-screen px-4 md:px-[68px] [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      {/* Hero Section with Purple Background */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden -mx-4 md:-mx-[68px]">
        <div className="w-full pt-24 pb-32 px-4 md:px-[68px]">
          {/* H1 at the top */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12">Principal UX Designer at Walmart - Platform & Design Systems, Architect</h1>

          {/* Body text and image side by side */}
          <div className="grid md:grid-cols-2 gap-12 items-start w-full">
            {/* Left side - Text content */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm Amy and I work at the platform and systems level, focused on building enterprise-scale design infrastructure rather than one-off features.
              </p>
              <p className="text-lg leading-relaxed">
                At Walmart, I own design systems as production infrastructure — spanning information architecture, visual language, tokens, automation, and design-to-code workflows that support internal tools, B2B platforms, and consumer products at massive scale. I'm especially interested in self-serve systems, AI-driven workflows, and the balance between evolving visual language and long-term system stability. I enjoy partnering closely with engineering and design leadership to shape platform strategy and build systems that create real organizational leverage.
              </p>
              <p className="text-lg leading-relaxed">
                Outside of work I enjoy traveling, hiking, and biking (mountain and
                gravel). I have a lot of hobbies like gardening, boardgames, collecting plants and building aquascapes.
              </p>
            </div>

            {/* Right side - Garden image */}
            <div className="rounded-2xl overflow-hidden relative z-10 flex items-start justify-center w-full">
              <img
                src={gardenImage}
                alt="Garden with fountain"
                className="w-full max-w-[600px] h-auto object-cover rounded-[24px]"
              />
            </div>
          </div>
        </div>
        
        {/* Wavy bottom border */}
        <div className="absolute bottom-0 left-0 right-0 mt-[-20px] mr-[0px] mb-[0px] ml-[0px]">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24"
          >
            <path
              d="M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="w-full min-h-0 py-12 px-0 pb-16 md:pb-24 bg-white">
        {/* My Experience Section */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-600 mb-6 md:mb-8">My Experience</h2>
        
          <p className="text-base text-gray-800 mb-2">
            View the entire history on{" "}
            <Link href="https://www.linkedin.com/in/haamy/" target="_blank">
              LinkedIn
            </Link>
            . Download my{" "}
            <Link
              href="https://drive.google.com/file/d/1Ey7f4JafSZUQ2PZdavkqzrZTLgSGfO2M/view?usp=drive_link"
              target="_blank"
            >
              resume
            </Link>
            .
          </p>
        </div>

        {/* My Skills and Tools Section */}
        

        {/* Work History Timeline Section */}
        <div ref={timelineSectionRef}>
        <div ref={scrollContainerRef} className="relative w-full overflow-x-auto pt-[0px] pr-[0px] pl-[0px] [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-400">
          <div className="flex justify-start w-full gap-4 p-[0px] relative">
            {[
              {
                period: "Jan. 16' - Mar. 19'",
                company: "Academy Sports + Outdoors",
                title: "Sr. Brand Designer",
                description: "Digital Marketing, Email, Social, Campaigns, Direct Mail",
                image: timeline2,
                size: "small"
              },
              {
                period: "Mar. 19' - Mar. 22'",
                company: "Waste Management",
                title: "Principal Product Designer",
                description: "Internal Tools, AEM Components, E-com, Self-service, Mobile, Design System",
                image: timeline4,
                size: "large"
              },
              {
                period: "Feb. 21' - Jun. 22'",
                company: "Xense Biotech, Inc. (freelance)",
                title: "Lead Product Designer",
                description: "3D Imaging Software, Design Systems",
                image: timeline3,
                size: "large"
              },
              {
                period: "Mar. - Jul. 22'",
                company: "Carbon 3D",
                title: "Lead Product Designer",
                description: "3D printing SAAS products, Design Systems",
                image: timeline1,
                size: "small"
              },
              {
                period: "Jul. 22' - Present",
                company: "Digit/Oportun",
                title: "Lead Product Designer",
                description: "Design Systems Mobile & Web apps",
                image: timeline6,
                size: "large"
              },
              {
                period: "Aug. 22' - Mar. 23'",
                company: "Walmart",
                title: "Principal UX Designer",
                description: "Design Subsystems Internal Mobile apps",
                image: timeline5,
                size: "medium"
              },
              {
                period: "Mar. 23' - Present",
                company: "Walmart",
                title: "Principal UX Designer",
                description: "Design Language Systems Architect, Automation with a focus on AI to accelerate workflow",
                image: timeline7,
                size: "large"
              }
            ].map((job, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center flex-1 min-w-[200px] relative z-10 pt-[0px] pr-[0px] pb-[16px] pl-[0px]"
                initial={{ opacity: 0, x: -50 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                {/* Circle with image - centered vertically */}
                <div className="h-40 flex items-center justify-center mb-3 w-full">
                  <div className={`rounded-full overflow-hidden aspect-square ${
                    job.size === "small" ? "w-16 sm:w-20 md:w-24" : 
                    job.size === "medium" ? "w-20 sm:w-24 md:w-32" : 
                    "w-24 sm:w-32 md:w-40"
                  }`}>
                    <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Date range - animated */}
                <motion.div 
                  className="text-xs text-indigo-600 font-semibold mb-2 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{
                    delay: index * 0.12 + 0.15,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  {job.period}
                </motion.div>
                
                {/* Company and title - animated */}
                <motion.div 
                  className="text-center px-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{
                    delay: index * 0.12 + 0.25,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <div className="text-xs text-gray-600 mb-1">{job.company}</div>
                  <div className="text-sm font-semibold mb-2">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.description}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>

        <Accordion collapsible defaultOpenItems={["walmart-current"]} multiple={false} className="w-full mt-8">
          <AccordionItem value="walmart-current">
            <AccordionHeader className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Principal UX Designer, Platform & Design Systems - Walmart</div>
                <div className="text-sm text-gray-600">San Bruno, CA | 2023 - Present</div>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              <div className="pt-4 space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Architect and lead a platform-level design system supporting internal tools, enterprise B2B platforms, and consumer-facing products at massive scale.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Own design systems as production infrastructure, spanning information architecture, visual language strategy, tokenization, accessibility, and extensible system foundations.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Designed and governed a tokenized design architecture (color, typography, spacing, motion, iconography) enabling theming, brand evolution, and long-term system stability.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Led end-to-end design-to-production workflows integrating Figma, design tokens, Storybook, GitHub, and production code to reduce drift and increase delivery velocity.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Built internal tooling and automation to enable self-serve system adoption and reduce reliance on manual enablement.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Partner closely with engineering and product leadership to define platform strategy, roadmap priorities, and system evolution.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Explore AI-driven UX workflows, including generative and adaptive systems for producing, enforcing, and evolving UX standards at scale.</span>
                  </li>
                </ul>
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="oportun">
            <AccordionHeader className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Lead Product Designer, Design Systems - Oportun</div>
                <div className="text-sm text-gray-600">2023</div>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              <div className="pt-4 space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Led design systems work supporting consumer-facing products within a complex marketplace ecosystem.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Defined system-level UX patterns and information architecture across web and mobile platforms.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Partnered with engineering to transition design systems from project-based assets to shared platform infrastructure.</span>
                  </li>
                </ul>
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="digit">
            <AccordionHeader className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Lead Product Designer, Design Systems - Digit</div>
                <div className="text-sm text-gray-600">2022 - 2023</div>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              <div className="pt-4 space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Standardized reusable components, patterns, and theming for an AI-powered financial health application.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Established documentation, adoption tracking, and accessibility standards across teams.</span>
                  </li>
                </ul>
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="carbon">
            <AccordionHeader className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Lead Product Designer - Carbon</div>
                <div className="text-sm text-gray-600">2022</div>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              <div className="pt-4 space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Designed SaaS and touchscreen experiences for manufacturing-scale 3D printing hardware.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Built and maintained a design system in Figma and Storybook to support cross-platform consistency.</span>
                  </li>
                </ul>
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="waste-principal">
            <AccordionHeader className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Principal Product Designer - Waste Management</div>
                <div className="text-sm text-gray-600">2019 - 2022</div>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              <div className="pt-4 space-y-3">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Led UX strategy and design systems for large-scale internal operations software and consumer products.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600">•</span>
                    <span className="text-gray-700">Mentored junior designers and established processes for scalable design delivery.</span>
                  </li>
                </ul>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>


        <div className="mb-16 md:mb-24 mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">My Skills & Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Skills Column */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-indigo-600">Skills</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Design systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Branding, visual design</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Interaction design</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Design tokens</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Data visualization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">User research and testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">User flows</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Systems thinking and architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Program management, automated workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Agile methodology</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">HTML, CSS, Javascript</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Graphic design</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Coding with IDEs</span>
                </li>
              </ul>
            </div>

            {/* Tools Column */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-indigo-600">Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Figma</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">GitHub</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Airtable / Coda / Notion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Cursor / VSCode</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Builder.io</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Jira</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Confluence</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Adobe Firefly</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Photoshop</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">InDesign</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Illustrator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">Adobe AEM</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span>
                  <span className="text-gray-700">ChatGPT/Gemini Pro/Claude etc.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Amy after 5 - Hobbies Section */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Me After 5</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { image: hobby1, stat: "32+", label: "Countries Visited" },
              { image: hobby2, stat: "1,799 mi.", label: "Distance Ridden" },
              { image: hobby3, stat: "140+", label: "Plants Growing" },
              { image: hobby4, stat: "27", label: "National Parks" },
              { image: hobby5, stat: "100+", label: "Wipe Outs" },
              { image: hobby6, stat: "30+", label: "Fish Caught" },
              { image: hobby7, stat: "27", label: "Board Games" },
              { image: hobby8, stat: "1", label: "Fur Baby" }
            ].map((hobby, index) => (
              <div key={index} className="group flex flex-col items-center bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src={hobby.image} 
                    alt={hobby.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-3xl font-bold text-indigo-600 mb-1">{hobby.stat}</p>
                <p className="text-sm text-gray-600 text-center">{hobby.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}