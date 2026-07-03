import React from "react";

export type JourneyMood = "friction" | "blocker" | "progress" | "win";

export interface CaseStudyJourneyItem {
  date: string;
  phase: string;
  who: string[];
  story: string;
  tension?: string;
  win?: string;
  mood: JourneyMood;
}

const MOOD_DOT: Record<JourneyMood, string> = {
  friction: "#E8A73A",
  blocker: "#C53030",
  progress: "#207442",
  win: "#1C8200",
};

const WHO_ACCENT = "#207442";

interface CaseStudyJourneyTimelineProps {
  items: CaseStudyJourneyItem[];
  className?: string;
}

export function CaseStudyJourneyTimeline({ items, className = "" }: CaseStudyJourneyTimelineProps) {
  return (
    <div className={`flex flex-col gap-6 md:gap-8 min-w-0 w-full ${className}`}>
      {items.map((item, i) => (
        <div
          key={`${item.date}-${item.phase}`}
          className="grid grid-cols-1 md:grid-cols-[180px_24px_1fr] gap-4 md:gap-6 min-w-0"
        >
          <div className="min-w-0">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#4e4f4e] mb-1">
              {item.date}
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-black mb-2">
              {item.phase}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.who.map((w) => (
                <span
                  key={w}
                  className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] px-2 py-0.5 rounded-full bg-[#dae4e1] text-black"
                  style={{ borderLeft: `2px solid ${WHO_ACCENT}` }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: MOOD_DOT[item.mood] }}
            />
            {i < items.length - 1 && <div className="w-0.5 flex-1 bg-[#dae4e1] mt-1" />}
          </div>

          <div className="min-w-0">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] leading-relaxed mb-3">
              {item.story}
            </p>
            {item.tension && (
              <div className="font-['Inter:Regular',sans-serif] text-[16px] text-[#4e4f4e] p-4 rounded-[16px] bg-[#fff8eb] border border-[#E8A73A]/30 mb-2 leading-relaxed">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-black">Tension: </span>
                {item.tension.replace(/^Tension:\s*/i, "")}
              </div>
            )}
            {item.win && (
              <div className="font-['Inter:Regular',sans-serif] text-[16px] text-[#4e4f4e] p-4 rounded-[16px] bg-[#dae4e1]/60 border border-[#207442]/20 leading-relaxed">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-black">Aligned: </span>
                {item.win.replace(/^(Aligned|Win):\s*/i, "")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
