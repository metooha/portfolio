import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Body } from "@/app/components/Text/Text";
import { CaseStudyHeroText } from "@/app/components/CaseStudyText/CaseStudyText";

interface CaseStudyHeroProps {
  /** The hero background image src */
  image: string;
  /** Large display title shown over the hero */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Text color for the title. Defaults to semantic text token. */
  titleColor?: string;
  /** How much the image moves on mouse move (default 12) */
  parallaxStrength?: number;
  /** Extra classes for the parallax image */
  imageClassName?: string;
  /** Curved wave divider at the bottom of the hero */
  curvedDivider?: boolean;
  className?: string;
}

const MotionHeroTitle = motion.div;

export function CaseStudyHero({
  image,
  title,
  subtitle,
  titleColor = "var(--ld-semantic-color-text, #2e2f32)",
  parallaxStrength = 12,
  imageClassName = "",
  curvedDivider = true,
  className = "",
}: CaseStudyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    setParallax({ x: x * parallaxStrength, y: y * parallaxStrength });
  };

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className={`h-[280px] sm:h-[400px] md:h-[560px] lg:h-[670px] xl:h-[870px] relative shrink-0 w-full overflow-hidden ${className}`}
      data-name="Heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 z-[1] transition-transform duration-300 ease-out"
        aria-hidden="true"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.08)` }}
      >
        <img
          alt=""
          className={`block w-full h-full min-h-full min-w-full object-cover object-center ${imageClassName}`}
          src={image}
        />
      </div>

      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none px-4 sm:px-8 md:px-16">
        <div
          className="flex flex-col items-center justify-center text-center w-full max-w-full pointer-events-none"
          style={{ gap: "var(--ld-semantic-spacing-250, 1.25rem)" }}
        >
          <MotionHeroTitle
            className="relative shrink-0 text-center"
            style={{ color: titleColor }}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8 }}
          >
            <CaseStudyHeroText
              as="p"
              UNSAFE_className="text-center"
              UNSAFE_style={{ color: titleColor }}
            >
              {title}
            </CaseStudyHeroText>
          </MotionHeroTitle>
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8, delay: 0.15 }}
            >
              <Body as="p" size="large" UNSAFE_className="text-center" UNSAFE_style={{ color: titleColor }}>
                {subtitle}
              </Body>
            </motion.div>
          )}
        </div>
      </div>

      {curvedDivider && (
        <div
          className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block w-full h-8 sm:h-10 md:h-12 lg:h-16"
          >
            <path
              d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"
              fill="var(--ld-semantic-color-fill, #ffffff)"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
