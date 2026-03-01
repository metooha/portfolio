import React from "react";

export function CaseStudyXenseContent() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
      <div id="challenge" className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Challenge</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px]">
          Medical imaging software requires precision, clarity, and reliability. The interface needed to support radiologists and medical professionals in making critical diagnostic decisions while displaying complex x-ray data. The challenge was to create a UI kit that balances technical sophistication with intuitive usability.
        </p>
      </div>

      <div id="solution" className="mb-20">
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

      <div id="impact" className="mb-20 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 md:p-12 rounded-3xl">
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
    </div>
  );
}
