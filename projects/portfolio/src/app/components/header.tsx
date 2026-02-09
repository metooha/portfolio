import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "figma:asset/3f0c759b55402043fc4bd3ebfab557f801742b45.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or near top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-white transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-[68px]">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Amy Ha Logo" className="h-8 w-auto" />
          <span className="text-xl">Amy Ha</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-sm hover:underline">
            About
          </Link>
          <Link to="/work" className="text-sm hover:underline">
            Other Work
          </Link>
          <Link to="/contact" className="text-sm hover:underline">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/work"
              className="text-sm hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Other Work
            </Link>
            <Link
              to="/contact"
              className="text-sm hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}