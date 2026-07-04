import { useState, useEffect } from "react";
import { Body } from "@/app/components/Text/Text";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 border-t bg-white z-40 transition-transform duration-300 ease-in-out"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="w-full py-8 px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Body as="div" size="small" color="subtle">
            © {new Date().getFullYear()} Amy Ha. All rights reserved.
          </Body>
          <Body as="div" size="small" color="subtle">
            Last updated: January 2026
          </Body>
        </div>
      </div>
    </footer>
  );
}
