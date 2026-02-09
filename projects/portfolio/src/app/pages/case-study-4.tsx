import { Link } from "react-router-dom";
import Academy from "@/imports/Academy";

export function CaseStudy4() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section with Image */}
        <div className="relative -mx-4 md:-mx-[68px] mb-16 overflow-hidden" id="overview">
          <div className="h-[60vh] min-h-[400px] bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
            <div className="w-full h-full">
              <Academy />
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
                Academy Sports + Outdoors Branding
              </h1>

              {/* Description */}
              <p className="font-['Inter',sans-serif] font-normal leading-relaxed md:leading-[36px] max-w-[1200px] not-italic text-lg md:text-[26px] text-black w-full break-words">
                Direct Mail catalogs are delivered every quarter at Academy Sports + Outdoors. The main categories are for sports such as golf, baseball/softball, football, athletics, fishing, and hunting. I created these catalogs from conception to print production, ensuring brand consistency and engaging visual storytelling.
              </p>
            </div>

            {/* Metrics and Links */}
            <div className="flex items-start justify-between relative w-full overflow-hidden">
              <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col md:flex-row gap-8 md:gap-[141px] items-start md:items-center relative w-full">
                  <div className="flex flex-[1_0_0] flex-row items-center w-full md:w-auto">
                    <div className="flex flex-[1_0_0] flex-col font-['Inter',sans-serif] font-normal gap-[24px] items-start not-italic relative text-[#4e4f4e] text-[16px] w-full">
                      <p className="leading-[normal] relative w-full break-words">Role: Brand Designer</p>
                      <p className="leading-[20px] relative w-full break-words">
                        Client: Academy Sports + Outdoors
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-[1_0_0] flex-col font-['Inter',sans-serif] font-normal gap-[24px] items-start not-italic relative text-[#4e4f4e] text-[16px] w-full md:w-auto">
                    <p className="leading-[normal] relative w-full break-words">Tags: Branding, Print, Digital, Campaigns</p>
                    <p className="leading-[20px] relative w-full break-words">
                      Focus: Quarterly catalog design and brand campaigns
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
              Academy Sports + Outdoors needed quarterly direct mail catalogs that would capture customer attention across diverse sporting categories - from golf and baseball to fishing and hunting. The challenge was to create cohesive designs that maintained brand consistency while showcasing the unique characteristics of each sport category and driving customer engagement through both print and digital channels.
            </p>
          </div>

          {/* Solution Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Solution</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px] mb-8">
              I developed a comprehensive approach to catalog design that balanced brand consistency with category-specific storytelling. From conception through print production, each catalog was crafted to inspire and inform customers about Academy's product offerings.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-[1000px]">
              <div className="bg-orange-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Category-Specific Design</h3>
                <p className="text-gray-700">Unique visual treatments for each sport category while maintaining brand cohesion.</p>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Print Production Management</h3>
                <p className="text-gray-700">End-to-end oversight ensuring high-quality printed materials and on-time delivery.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Cross-Channel Campaigns</h3>
                <p className="text-gray-700">Integrated print and digital designs for seamless multi-channel marketing.</p>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Seasonal Storytelling</h3>
                <p className="text-gray-700">Quarterly themes that align with sports seasons and customer interests.</p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-20 bg-gradient-to-br from-orange-50 to-red-50 p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Impact</h2>
            <ul className="space-y-4 text-lg md:text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-2xl">✓</span>
                <span>Produced multiple quarterly catalogs across diverse sport categories</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-2xl">✓</span>
                <span>Managed full production pipeline from concept to print delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-2xl">✓</span>
                <span>Created consistent brand experience across print and digital touchpoints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-2xl">✓</span>
                <span>Enhanced customer engagement through compelling visual storytelling</span>
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