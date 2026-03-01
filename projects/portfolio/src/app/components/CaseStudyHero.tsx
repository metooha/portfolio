import React, { useRef, useState } from "react";
import { motion } from "motion/react";

interface CaseStudyHeroProps {
  /** The hero background image src */
  image: string;
  /** Large display title shown over the hero */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Text color for the title. Defaults to dark green. */
  titleColor?: string;
  /** How much the image moves on mouse move (default 12) */
  parallaxStrength?: number;
  className?: string;
}

export function CaseStudyHero({
  image,
  title,
  subtitle,
  titleColor = "#143526",
  parallaxStrength = 12,
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
      {/* Parallax background image */}
      <div
        className="absolute inset-0 z-[1] transition-transform duration-300 ease-out"
        aria-hidden="true"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.08)` }}
      >
        <img
          alt=""
          className="block w-full h-full min-h-full min-w-full object-cover object-center"
          src={image}
        />
      </div>

      {/* Title overlay */}
      <div className="relative z-[2] flex flex-col items-center justify-center size-full pointer-events-none">
        <div className="flex flex-col gap-[10px] items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[250px] py-12 sm:py-20 md:py-32 lg:py-40 xl:py-[294px] size-full pointer-events-auto">
          <motion.p
            className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight not-italic relative shrink-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[140px] text-center"
            style={{ color: titleColor }}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8 }}
          >
            {title}
          </motion.p>
          {subtitle && (
            <motion.p
              className="font-['Inter:Regular',sans-serif] font-normal text-lg md:text-2xl text-center mt-4"
              style={{ color: titleColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8, delay: 0.15 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
