import React from "react";

export function CaseStudyAcademyContent() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
      <div id="challenge" className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Challenge</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px]">
          Academy Sports + Outdoors needed quarterly direct mail catalogs that would capture customer attention across diverse sporting categories - from golf and baseball to fishing and hunting. The challenge was to create cohesive designs that maintained brand consistency while showcasing the unique characteristics of each sport category and driving customer engagement through both print and digital channels.
        </p>
      </div>

      <div id="solution" className="mb-20">
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

      <div id="impact" className="mb-20 bg-gradient-to-br from-orange-50 to-red-50 p-8 md:p-12 rounded-3xl">
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
    </div>
  );
}
