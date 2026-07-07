import React from "react";

const cardStyle: React.CSSProperties = {
  background: "var(--ld-semantic-color-surface-subtle, #3a3b3e)",
};

const cardStyleAccent: React.CSSProperties = {
  background: "var(--ld-semantic-color-surface-brand, #034401)",
};

const impactStyle: React.CSSProperties = {
  background:
    "linear-gradient(to bottom right, var(--ld-semantic-color-surface, #2e2f32), var(--ld-semantic-color-surface-brand, #034401))",
};

const bodyTextClass = "text-lg md:text-xl leading-relaxed max-w-[1000px]";
const bodyTextStyle: React.CSSProperties = {
  color: "var(--ld-semantic-color-text-subtle, #c1c7cc)",
};

const checkColor = "var(--ld-semantic-color-text-brand, #0bfc06)";

export function CaseStudyXenseContent() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
      <div id="challenge" className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Challenge</h2>
        <p className={bodyTextClass} style={bodyTextStyle}>
          Medical imaging software requires precision, clarity, and reliability. The interface needed to support radiologists and medical professionals in making critical diagnostic decisions while displaying complex x-ray data. The challenge was to create a UI kit that balances technical sophistication with intuitive usability.
        </p>
      </div>

      <div id="solution" className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Solution</h2>
        <p className={`${bodyTextClass} mb-8`} style={bodyTextStyle}>
          I developed a comprehensive UI kit specifically tailored for medical imaging applications. The design system emphasizes clarity, precision, and accessibility, with specialized components for image viewing, data visualization, and diagnostic workflows.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-[1000px]">
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="text-xl font-bold mb-3">Medical-Grade Interface</h3>
            <p style={bodyTextStyle}>High-contrast design optimized for detailed medical image viewing and analysis.</p>
          </div>
          <div className="p-6 rounded-2xl" style={cardStyleAccent}>
            <h3 className="text-xl font-bold mb-3">Advanced Imaging Controls</h3>
            <p style={bodyTextStyle}>Specialized tools for image manipulation, zoom, rotation, and measurement.</p>
          </div>
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="text-xl font-bold mb-3">Data Visualization</h3>
            <p style={bodyTextStyle}>Clear presentation of patient data, diagnostic metrics, and imaging parameters.</p>
          </div>
          <div className="p-6 rounded-2xl" style={cardStyleAccent}>
            <h3 className="text-xl font-bold mb-3">Workflow Optimization</h3>
            <p style={bodyTextStyle}>Streamlined interfaces that reduce cognitive load and support efficient diagnosis.</p>
          </div>
        </div>
      </div>

      <div id="impact" className="mb-20 p-8 md:p-12 rounded-3xl" style={impactStyle}>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Impact</h2>
        <ul className={`space-y-4 ${bodyTextClass}`} style={bodyTextStyle}>
          <li className="flex items-start gap-3">
            <span className="text-2xl" style={{ color: checkColor }}>✓</span>
            <span>Established a cohesive visual language for the uTomoTM platform</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl" style={{ color: checkColor }}>✓</span>
            <span>Improved usability for radiologists and medical professionals</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl" style={{ color: checkColor }}>✓</span>
            <span>Created reusable components that accelerated development timelines</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl" style={{ color: checkColor }}>✓</span>
            <span>Ensured accessibility compliance for medical software standards</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
