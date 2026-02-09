import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  label: string;
  multiline?: boolean;
  scrollTo?: string; // Optional target section to scroll to (defaults to id)
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem-space", label: "Problem Space" },
  { id: "goals", label: "Our Goals" },
  { id: "approach", label: "Approach" },
  { id: "system-audit", label: "System Audit" },
  { id: "information-architecture", label: "Information Architecture", multiline: true, scrollTo: "system-audit" },
  { id: "compromises", label: "Compromises" },
];

function ArrowLeft() {
  return (
    <svg className="block size-[28px]" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
      <path
        d="M23.2308 13.2499H6.58678L13.5267 6.27173C13.5968 6.20185 13.6522 6.11856 13.6894 6.02684C13.7266 5.93511 13.745 5.83683 13.7434 5.73785C13.7418 5.63887 13.7203 5.54123 13.6801 5.45074C13.64 5.36026 13.582 5.27879 13.5097 5.21119C13.3615 5.07266 13.1653 4.997 12.9625 5.00009C12.7596 5.00319 12.5659 5.08481 12.4219 5.22779L4.21678 13.4779C4.14807 13.5464 4.09355 13.6277 4.05635 13.7173C4.01915 13.8069 4 13.9029 4 13.9999C4 14.0969 4.01915 14.1929 4.05635 14.2825C4.09355 14.3721 4.14807 14.4535 4.21678 14.5219L12.4219 22.772C12.5658 22.9151 12.7595 22.9968 12.9624 22.9999C13.1654 23.003 13.3615 22.9273 13.5097 22.7886C13.582 22.721 13.64 22.6395 13.6801 22.549C13.7203 22.4586 13.7418 22.3609 13.7434 22.2619C13.7449 22.163 13.7266 22.0647 13.6893 21.9729C13.6521 21.8812 13.5968 21.7979 13.5267 21.7281L6.58678 14.7499H23.2308C23.3309 14.7524 23.4304 14.7349 23.5237 14.6983C23.6169 14.6618 23.7018 14.6069 23.7735 14.537C23.8452 14.4672 23.9022 14.3836 23.9411 14.2914C23.98 14.1991 24 14.1 24 13.9999C24 13.8998 23.98 13.8007 23.9411 13.7084C23.9022 13.6161 23.8452 13.5326 23.7735 13.4627C23.7018 13.3928 23.6169 13.338 23.5237 13.3014C23.4304 13.2649 23.3309 13.2473 23.2308 13.2499H23.2308Z"
        fill="#4E4F4E"
      />
    </svg>
  );
}

export function CaseStudyNavigation() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      // Find which section is currently in view
      const currentSection = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[120px] self-start">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Invisible hover trigger area */}
        <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10" />
        
        {/* Navigation content */}
        <div 
          className="flex flex-col gap-[58px] items-start pl-[68px] pr-[20px]"
        >
          {/* Back Button */}
          <Link
            to="/"
            className="flex gap-[6px] items-center group hover:opacity-70 transition-opacity"
          >
            <ArrowLeft />
            <p className="font-['Inter',sans-serif] leading-[36px] text-[#4e4f4e] text-[16px]">
              Back
            </p>
          </Link>

          {/* Side Navigation */}
          <div className="flex flex-col items-start">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.scrollTo || item.id)}
                className="flex gap-[6px] items-center w-full group hover:opacity-70 transition-opacity"
              >
                <div
                  className={`h-[22px] w-[3px] transition-colors ${
                    activeSection === item.id ? "bg-[#207442]" : "bg-transparent"
                  }`}
                />
                <p className="font-['Inter',sans-serif] leading-[36px] text-[#4e4f4e] text-[16px] text-left">
                  {item.multiline ? (
                    <>
                      Information
                      <br />
                      Architecture
                    </>
                  ) : (
                    item.label
                  )}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}