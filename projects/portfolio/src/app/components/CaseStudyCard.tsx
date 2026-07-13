import React from "react";
import { Link } from "react-router-dom";
import type { CaseStudyConfig } from "@/app/data/case-studies-config";
import { isPageProtected } from "@/app/auth/page-protection";
import { LockIcon } from "@/app/components/Icons/Icons";
import { Tag } from "@/app/components/Tag/Tag";

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
  /** Eager-load and high-priority decode for above-the-fold cards */
  priority?: boolean;
}

export function CaseStudyCard({ caseStudy, priority = false }: CaseStudyCardProps) {
  const title = caseStudy.cardTitle ?? caseStudy.title;
  const description = caseStudy.cardDescription ?? caseStudy.shortDescription;
  const isClickable = caseStudy.isPublished !== false;
  const isProtected = isPageProtected(caseStudy.path);
  const coverImage = caseStudy.heroType === "image" ? (caseStudy.heroImage ?? caseStudy.thumbnail) : null;

  const heroContent = caseStudy.cardImage ? (
    <img
      src={caseStudy.cardImage}
      alt={title}
      className="block w-full h-full object-cover object-center"
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  ) : caseStudy.heroType === "component" && caseStudy.HeroComponent ? (
    <caseStudy.HeroComponent />
  ) : (
    <img
      src={coverImage ?? caseStudy.thumbnail}
      alt={title}
      className="block w-full h-full object-cover object-center"
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );

  const card = (
    <div
      className={`bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow duration-300 ${
        isClickable ? "hover:shadow-2xl" : "opacity-90"
      }`}
    >
        <div className="relative aspect-[16/9] group">
          <div className="w-full h-full">{heroContent}</div>
          {isClickable && (
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          )}
        </div>
        <div className="bg-[rgb(241,241,241)] p-8 w-full h-full flex flex-col justify-between">
          {isProtected ? (
            <div className="flex items-center justify-end gap-2 mb-2">
              <Tag
                color="warning"
                variant="secondary"
                size="small"
                leading={<LockIcon size="small" decorative />}
              >
                Password protected
              </Tag>
            </div>
          ) : null}
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
  );

  if (!isClickable) {
    return <div className="block cursor-default">{card}</div>;
  }

  return (
    <Link to={caseStudy.path} className="block">
      {card}
    </Link>
  );
}
