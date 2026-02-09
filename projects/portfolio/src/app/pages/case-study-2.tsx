import { Link } from "react-router-dom";
import hoverImage from "figma:asset/c22af8bfcb65f93d01f2862c0d18f313ac7bc96a.png";

export function CaseStudy2() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section with Image */}
        <div className="relative -mx-4 md:-mx-[68px] mb-16 overflow-hidden" id="overview">
          <div className="h-[60vh] min-h-[400px] bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
            <img 
              src={hoverImage} 
              alt="Hover Digital Assistant" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full overflow-hidden">
          {/* Project Overview Section */}
          <div className="flex flex-col gap-6 md:gap-[36px] items-start relative w-full mb-12 md:mb-20 overflow-hidden">
            {/* Page Title */}
            <div className="flex flex-col gap-6 md:gap-[36px] items-start relative w-full overflow-hidden">
              {/* Main Heading */}
              <h1 className="font-['Inter',sans-serif] font-semibold leading-tight md:leading-[111px] not-italic text-4xl md:text-[84px] text-black w-full break-words">
                Hover - Digital Assistant Design System
              </h1>

              {/* Description */}
              <p className="font-['Inter',sans-serif] font-normal leading-relaxed md:leading-[36px] max-w-[1200px] not-italic text-lg md:text-[26px] text-black w-full break-words">
                Hover is a digital assistant web app concept for teachers in which they can find resources and assignments to share with students. Working with one other designer, I developed the vision and design system for this concept.
              </p>
            </div>

            {/* Metrics and Links */}
            <div className="flex items-start justify-between relative w-full overflow-hidden">
              <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col md:flex-row gap-8 md:gap-[141px] items-start md:items-center relative w-full">
                  <div className="flex flex-[1_0_0] flex-row items-center w-full md:w-auto">
                    <div className="flex flex-[1_0_0] flex-col font-['Inter',sans-serif] font-normal gap-[24px] items-start not-italic relative text-[#4e4f4e] text-[16px] w-full">
                      <p className="leading-[normal] relative w-full break-words">Role: Lead Designer</p>
                      <p className="leading-[20px] relative w-full break-words">
                        Team: 2 Designers
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-[1_0_0] flex-col font-['Inter',sans-serif] font-normal gap-[24px] items-start not-italic relative text-[#4e4f4e] text-[16px] w-full md:w-auto">
                    <p className="leading-[normal] relative w-full break-words">Tags: Design System, Digital Assistant, Education</p>
                    <p className="leading-[20px] relative w-full break-words">
                      Focus: Visual design system and component library
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Challenge Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Challenge</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px]">
              Teachers need quick access to educational resources and the ability to seamlessly share content with students. The challenge was to create an intuitive digital assistant that could understand natural language queries and provide relevant results while maintaining a clean, accessible interface suitable for educators with varying levels of technical expertise.
            </p>
          </div>

          {/* Solution Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Solution</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px] mb-8">
              We developed a comprehensive design system that prioritizes clarity and ease of use. The system includes conversational UI patterns, smart search components, and a resource library that adapts to teacher preferences and teaching styles.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-[1000px]">
              <div className="bg-purple-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Conversational Interface</h3>
                <p className="text-gray-700">Natural language processing enables teachers to ask questions and receive contextual responses.</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Smart Resource Library</h3>
                <p className="text-gray-700">Curated educational content with intelligent filtering and personalized recommendations.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Quick Actions</h3>
                <p className="text-gray-700">One-click sharing to classroom platforms and student management systems.</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Accessible Design</h3>
                <p className="text-gray-700">WCAG AA compliant with high contrast and keyboard navigation support.</p>
              </div>
            </div>
          </div>

          {/* Navigation to Projects */}
          <div className="max-w-5xl mb-20 pt-12 border-t border-gray-200">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              View More Projects
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}