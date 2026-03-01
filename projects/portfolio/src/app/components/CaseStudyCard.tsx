import React from "react";
import { Link } from "react-router-dom";
import type { CaseStudyConfig } from "@/data/case-studies-config";

const TAG_PALETTE = [
  { bg: "#7C3AED", text: "#FFFFFF" },
  { bg: "#2563EB", text: "#FFFFFF" },
  { bg: "#059669", text: "#FFFFFF" },
  { bg: "#DB2777", text: "#FFFFFF" },
  { bg: "#EA580C", text: "#FFFFFF" },
  { bg: "#4F46E5", text: "#FFFFFF" },
  { bg: "#0D9488", text: "#FFFFFF" },
  { bg: "#DC2626", text: "#FFFFFF" },
];

export interface CaseStudyCardProps {
  caseStudy: CaseStudyConfig;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const title = caseStudy.cardTitle ?? caseStudy.title;
  const description = caseStudy.cardDescription ?? caseStudy.shortDescription;

  const heroContent =
    caseStudy.heroType === "component" && caseStudy.HeroComponent ? (
      <caseStudy.HeroComponent />
    ) : (
      <img
        src={caseStudy.thumbnail}
        alt={title}
        className="w-full h-full object-cover transition-all duration-300"
      />
    );

  return (
    <Link to={caseStudy.path} className="block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[16/9] group">
          <div className="w-full h-full">{heroContent}</div>
          <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        <div className="bg-[rgb(241,241,241)] p-8 w-full h-full flex flex-col justify-between">
          <p className="text-xs uppercase tracking-wider mb-2 text-gray-600">
            CASE STUDY {String(caseStudy.id).padStart(2, "0")}
          </p>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex gap-2 flex-wrap">
            {caseStudy.tags.map((tag, idx) => {
              const color = TAG_PALETTE[idx % TAG_PALETTE.length];
              return (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs uppercase tracking-wide"
                  style={{ backgroundColor: color.bg, color: color.text }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
