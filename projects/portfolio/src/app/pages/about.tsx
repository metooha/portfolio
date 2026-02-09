import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import gardenImage from "figma:asset/bcba4309c4413f66ba1670f338c909933eea6d40.png";
import { motion } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import timeline1 from "figma:asset/f6b670d7136c94aefa409fc41093bb3a8321cd5c.png";
import timeline2 from "figma:asset/dfc3f48eee89232d687cb7e44a79036645f8d842.png";
import timeline3 from "figma:asset/b43fef14eebad328ddd1d90efb04565737b40d74.png";
import timeline4 from "figma:asset/b784861b3767300678432b939093af03ca7985df.png";
import timeline5 from "figma:asset/d0c49a36dfc6602b8ed37c85d29d447f5c77bd83.png";
import timeline6 from "figma:asset/ee9fad5fe71fead45570ab7c722c95220767f2a4.png";
import timeline7 from "figma:asset/c02effe235772ba9bbd59129d76803ab6ef8e15a.png";
import hobby1 from "figma:asset/44d10a559bd5029af6d0ad8c8825825d1dab5380.png";
import hobby2 from "figma:asset/10d0cda067425d00b1609b442126311a8c2ef767.png";
import hobby3 from "figma:asset/63e7ed985a2f7e61dc78fb9d9749374af7ce97d1.png";
import hobby4 from "figma:asset/385a43c8506f3781b2f4d988bdaa70702aa5ee7b.png";
import hobby5 from "figma:asset/567818549e99611135158f0a0441ebe5b9e55fbc.png";
import hobby6 from "figma:asset/279f8d1ef1e899b016c01c20722d7b2a3d1559cb.png";
import hobby7 from "figma:asset/c159c06a416c7949298dd8b48d728f465f8a4227.png";
import hobby8 from "figma:asset/0e73aaad0f2d982b69d9935a91e290ed0671c87f.png";
import aiIllustration from "figma:asset/bf5771133342b8de9c2234960f7c5a720d64c50e.png";
import coffeeIllustration from "figma:asset/733a7871df6fcaf7034192ea656e0879f5c27768.png";
import sparklesIllustration from "figma:asset/abceb447c7b4723a4186029f5f69bb90179b0e6a.png";
import pencilIllustration from "figma:asset/a11b8f2d4e3a31105c0a88c92c8abee704d829b5.png";
import peaceIllustration from "figma:asset/afce2a00dc589e65b89908eeb96feb128961ff73.png";
import colorSwatchIllustration from "figma:asset/66fffb1db7cc8a8b4d18368a523c4d55f2aa5019.png";
import smileyIllustration from "figma:asset/c4148cce376a0d6238affeede96c2415696c2383.png";

export function About() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollDuration = 7000; // Match the line animation duration
    const startTime = Date.now();

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      
      // Scroll to the right as the animation progresses
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScroll * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    // Start scrolling animation after a short delay
    const timeoutId = setTimeout(() => {
      animateScroll();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      {/* Hero Section with Purple Background */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden -mx-4 md:-mx-[68px]">
        <div className="w-full pt-24 pb-32 px-4 md:px-[68px]">
          {/* H1 at the top */}
          <h1 className="text-5xl md:text-6xl font-bold text-[48px] mb-12">Principal UX Designer at Walmart - Platform & Design Systems, Architect</h1>
          
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
            <div className="rounded-2xl overflow-hidden relative z-10 flex items-start justify-center">
              <img
                src={gardenImage}
                alt="Garden with fountain"
                className="w-[600px] h-auto object-cover rounded-[24px]"
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

      <div className="w-full h-full py-12 px-4 md:px-[68px] bg-white pt-[0px] md:pr-[68px] pb-[100px] md:pl-[68px] pr-[0px] pl-[0px]">
        {/* My Experience Section */}
        <div className="mb-24">
          <h2 className="text-6xl font-bold text-indigo-600 mb-8">My Experience</h2>
        
          <p className="text-base text-gray-800 mb-2">
            View the entire history on <a href="https://www.linkedin.com/in/haamy/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-medium">LinkedIn</a>.
          
            <span> Download my <a href="https://drive.google.com/file/d/1Ey7f4JafSZUQ2PZdavkqzrZTLgSGfO2M/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-medium">resume</a>.</span>
          </p>
        </div>

        {/* My Skills and Tools Section */}
        

        {/* Work History Timeline Section */}
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
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: 3 + index * 0.15,
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: 3 + index * 0.15 + 0.2,
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: 3 + index * 0.15 + 0.3,
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

        <Accordion type="single" collapsible defaultValue="walmart-current" className="w-full mt-8">
          <AccordionItem value="walmart-current">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Principal UX Designer, Platform & Design Systems - Walmart</div>
                <div className="text-sm text-gray-600">San Bruno, CA | 2023 - Present</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="oportun">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Lead Product Designer, Design Systems - Oportun</div>
                <div className="text-sm text-gray-600">2023</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="digit">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Lead Product Designer, Design Systems - Digit</div>
                <div className="text-sm text-gray-600">2022 - 2023</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="carbon">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Lead Product Designer - Carbon</div>
                <div className="text-sm text-gray-600">2022</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="waste-principal">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col items-start">
                <div className="font-semibold">Principal Product Designer - Waste Management</div>
                <div className="text-sm text-gray-600">2019 - 2022</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>


        <div className="mb-24 mt-16">
          <h2 className="text-4xl font-bold mb-8">My Skills & Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
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
        <div className="mt-16">
          <h2 className="text-4xl font-bold mb-8">Me After 5</h2>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
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