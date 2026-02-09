import { useState, useEffect } from "react";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show footer when scrolling down and past 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Hide when scrolling up
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 border-t bg-white z-40 transition-transform duration-300 ease-in-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)'
      }}
    >
      <div className="w-full py-8 px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} Amy Ha. All rights reserved.
          </div>
          <div>
            Last updated: January 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
