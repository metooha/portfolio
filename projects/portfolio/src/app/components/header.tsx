import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CloseIcon, MenuIcon } from "@/app/components/Icons/Icons";
import { IconButton } from "@/app/components/IconButton/IconButton";
import { Body } from "@/app/components/Text/Text";
import logo from "@/app/assets/pages/profile/shared/amy-ha-logo.png";
import { useAuth } from "@/app/auth/auth-context";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Other Work" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex h-16 items-center px-4 md:px-[68px]">
        <div className="relative shrink-0" ref={accountMenuRef}>
          <button
            type="button"
            className="flex items-center space-x-2 text-inherit"
            onClick={() => setIsAccountMenuOpen((open) => !open)}
          >
            <img src={logo} alt="Amy Ha Logo" className="h-8 w-auto" />
            <Body as="span" size="medium">
              Amy Ha
            </Body>
          </button>

          {isAccountMenuOpen ? (
            <div className="absolute left-0 top-full mt-2 min-w-[160px] rounded-md border bg-white py-1 shadow-lg z-50">
              {isAdmin ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/theme-editor"
                    className="block px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    Theme Editor
                  </Link>
                  <Link
                    to="/component-library"
                    className="block px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    Component Library
                  </Link>
                  <div className="my-1 h-px bg-gray-200" aria-hidden="true" />
                  <button
                    type="button"
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => {
                    setIsAccountMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              )}
            </div>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>

          <span className="md:hidden">
            <IconButton
              a11yLabel={isMenuOpen ? "Close menu" : "Open menu"}
              size="small"
              color="tertiary"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <CloseIcon size="medium" decorative /> : <MenuIcon size="medium" decorative />}
            </IconButton>
          </span>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="md:hidden border-t bg-white">
          <div className="px-4 md:px-[68px] py-4 flex flex-col items-end gap-4">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm hover:underline py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
