import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LinkButton } from "@/app/components/LinkButton/LinkButton";
import { ChevronLeftIcon } from "@/app/components/Icons/Icons";
import { Body } from "@/app/components/Text/Text";

interface NavItem {
  id: string;
  label: string;
  multiline?: boolean;
  scrollTo?: string;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem-space", label: "Problem Space" },
  { id: "goals", label: "Our Goals" },
  { id: "approach", label: "Approach" },
  { id: "system-audit", label: "System Audit" },
  {
    id: "information-architecture",
    label: "Information Architecture",
    multiline: true,
    scrollTo: "system-audit",
  },
  { id: "compromises", label: "Compromises" },
];

export function CaseStudyNavigation() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[120px] self-start">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10" />

        <div className="flex flex-col gap-[58px] items-start pl-[68px] pr-[20px]">
          <LinkButton
            size="small"
            color="subtle"
            leading={<ChevronLeftIcon size="small" decorative />}
            onClick={() => navigate("/")}
          >
            Back
          </LinkButton>

          <div className="flex flex-col items-start">
            {navItems.map((item) => (
              <LinkButton
                key={item.id}
                size="small"
                color="subtle"
                onClick={() => scrollToSection(item.scrollTo || item.id)}
                UNSAFE_className="flex gap-[6px] items-center w-full group"
              >
                <span className="flex gap-[6px] items-center">
                  <span
                    className={`h-[22px] w-[3px] transition-colors ${
                      activeSection === item.id ? "bg-[#207442]" : "bg-transparent"
                    }`}
                  />
                  <Body as="span" size="small" UNSAFE_className="text-left">
                    {item.multiline ? (
                      <>
                        Information
                        <br />
                        Architecture
                      </>
                    ) : (
                      item.label
                    )}
                  </Body>
                </span>
              </LinkButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
