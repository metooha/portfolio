import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "@/app/components/LinkButton/LinkButton";
import { ChevronLeftIcon } from "@/app/components/Icons/Icons";
import { Body } from "@/app/components/Text/Text";

export interface NavSection {
  label: string;
  href: string;
}

interface CaseStudyPageNavProps {
  sections: NavSection[];
  /** Accent color for the active indicator bar and hover text. Defaults to green. */
  accentColor?: string;
  /** px from the left viewport edge that acts as the hover trigger zone. Defaults to 60. */
  triggerWidth?: number;
  /** Approximate px width of the nav panel when open, used to keep nav open while hovering links. Defaults to 300. */
  navWidth?: number;
  /** px scrolled before the nav becomes hoverable (skips the hero). Defaults to 300. */
  heroScrollThreshold?: number;
  /** Called whenever the nav's visible state changes (e.g. to push page content). */
  onVisibleChange?: (visible: boolean) => void;
}

function scrollToSection(href: string) {
  const el = document.getElementById(href.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CaseStudyPageNav({
  sections,
  accentColor = "#207442",
  triggerWidth = 60,
  navWidth = 300,
  heroScrollThreshold = 300,
  onVisibleChange,
}: CaseStudyPageNavProps) {
  const navigate = useNavigate();
  const [activeHref, setActiveHref] = useState(sections[0]?.href ?? "");
  const [isHovered, setIsHovered] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);

  const visible = isHovered && isPastHero;

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > heroScrollThreshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroScrollThreshold]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const inTriggerZone = e.clientX < triggerWidth;
      const inNavPanel = isHoveredRef.current && e.clientX < navWidth;

      if (inTriggerZone || inNavPanel) {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
      } else {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = setTimeout(() => {
          isHoveredRef.current = false;
          setIsHovered(false);
        }, 150);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, [triggerWidth, navWidth]);

  useEffect(() => {
    onVisibleChange?.(visible);
  }, [visible, onVisibleChange]);

  return (
    <div
      className="hidden lg:block fixed top-[76px] left-0 z-40"
      data-name="page navigation"
    >
      <div
        className="flex flex-col gap-[58px] items-start pl-4 sm:pl-6 md:pl-12 lg:pl-[68px] pr-4 sm:pr-5"
        style={{
          transform: visible ? "translateX(0)" : "translateX(calc(-100% - 68px))",
          opacity: visible ? 1 : 0,
          transition: "transform 400ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <LinkButton
          size="small"
          color="subtle"
          leading={<ChevronLeftIcon size="small" decorative />}
          onClick={() => navigate(-1)}
          data-name="Text Link / Back"
        >
          Back
        </LinkButton>

        <nav className="flex flex-col items-start shrink-0" data-name="Side Navigation">
          {sections.map(({ label, href }) => {
            const isActive = activeHref === href;
            return (
              <LinkButton
                key={href}
                size="small"
                color="subtle"
                onClick={() => {
                  setActiveHref(href);
                  scrollToSection(href);
                }}
                UNSAFE_className="flex gap-[6px] items-center shrink-0 w-full group"
                data-name="Side Nav"
              >
                <span className="flex gap-[6px] items-center">
                  <span
                    className="h-[22px] shrink-0 w-[3px] rounded-full transition-colors duration-200"
                    style={{ backgroundColor: isActive ? accentColor : "transparent" }}
                  />
                  <Body
                    as="span"
                    size="small"
                    UNSAFE_style={{ color: isActive ? accentColor : "#4e4f4e" }}
                  >
                    {label}
                  </Body>
                </span>
              </LinkButton>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
