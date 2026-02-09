import { Link } from "react-router-dom";
import Xense from "@/imports/Xense";

export function CaseStudy3() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section with Image */}
        <div className="relative -mx-4 md:-mx-[68px] mb-16 overflow-hidden" id="overview">
          <div className="h-[60vh] min-h-[400px] bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
            <div className="w-full h-full">
              <Xense />
            </div>
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
                Xense Biotech
              </h1>

              {/* Description */}
              <p className="font-['Inter',sans-serif] font-normal leading-relaxed md:leading-[36px] max-w-[1200px] not-italic text-lg md:text-[26px] text-black w-full break-words">
                Xense Biotech is a leading company in the medical imaging industry, specializing in advanced x-ray technology. Their flagship product, uTomoTM, is a groundbreaking image acquisition and reconstruction system that enhances diagnostic capabilities. I was tasked with designing a comprehensive UI kit to support their software platform and establish a cohesive visual language.
              </p>
            </div>

            {/* Metrics and Links */}
            <div className="flex items-start justify-between relative w-full overflow-hidden">
              <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col md:flex-row gap-8 md:gap-[141px] items-start md:items-center relative w-full">
                  <div className="flex flex-[1_0_0] flex-row items-center w-full md:w-auto">
                    <div className="flex flex-[1_0_0] flex-col font-['Inter',sans-serif] font-normal gap-[24px] items-start not-italic relative text-[#4e4f4e] text-[16px] w-full">
                      <p className="leading-[normal] relative w-full break-words">Role: UI/UX Designer</p>
                      <p className="leading-[20px] relative w-full break-words">
                        Industry: Medical Imaging & Biotech
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-[1_0_0] flex-col font-['Inter',sans-serif] font-normal gap-[24px] items-start not-italic relative text-[#4e4f4e] text-[16px] w-full md:w-auto">
                    <p className="leading-[normal] relative w-full break-words">Tags: Desktop, Biotech, UI Kit</p>
                    <p className="leading-[20px] relative w-full break-words">
                      Focus: Medical software interface design system
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
              Medical imaging software requires precision, clarity, and reliability. The interface needed to support radiologists and medical professionals in making critical diagnostic decisions while displaying complex x-ray data. The challenge was to create a UI kit that balances technical sophistication with intuitive usability, ensuring that healthcare professionals could efficiently navigate and interpret medical imaging data.
            </p>
          </div>

          {/* Solution Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Solution</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px] mb-8">
              I developed a comprehensive UI kit specifically tailored for medical imaging applications. The design system emphasizes clarity, precision, and accessibility, with specialized components for image viewing, data visualization, and diagnostic workflows.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-[1000px]">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Medical-Grade Interface</h3>
                <p className="text-gray-700">High-contrast design optimized for detailed medical image viewing and analysis.</p>
              </div>
              <div className="bg-cyan-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Advanced Imaging Controls</h3>
                <p className="text-gray-700">Specialized tools for image manipulation, zoom, rotation, and measurement.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Data Visualization</h3>
                <p className="text-gray-700">Clear presentation of patient data, diagnostic metrics, and imaging parameters.</p>
              </div>
              <div className="bg-cyan-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Workflow Optimization</h3>
                <p className="text-gray-700">Streamlined interfaces that reduce cognitive load and support efficient diagnosis.</p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-20 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Impact</h2>
            <ul className="space-y-4 text-lg md:text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">✓</span>
                <span>Established a cohesive visual language for the uTomoTM platform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">✓</span>
                <span>Improved usability for radiologists and medical professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">✓</span>
                <span>Created reusable components that accelerated development timelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">✓</span>
                <span>Ensured accessibility compliance for medical software standards</span>
              </li>
            </ul>
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