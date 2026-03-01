import React from "react";

export function CaseStudyHoverContent() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
      <div id="challenge" className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Challenge</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[1000px]">
          Teachers need quick access to educational resources and the ability to seamlessly share content with students. The challenge was to create an intuitive digital assistant that could understand natural language queries and provide relevant results while maintaining a clean, accessible interface suitable for educators with varying levels of technical expertise.
        </p>
      </div>

      <div id="solution" className="mb-20">
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
    </div>
  );
}
