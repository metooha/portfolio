import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Body } from "@/app/components/Text/Text";
import logo from "@/app/assets/pages/profile/shared/amy-ha-logo.png";
import { useAuth } from "@/app/auth/auth-context";
import "./AdminLayout.css";

export type AdminPage = "dashboard" | "theme-editor" | "palette-generator" | "component-library";

const ADMIN_PAGE_LABELS: Record<AdminPage, string> = {
  dashboard: "Settings",
  "theme-editor": "Theme Editor",
  "palette-generator": "Palette Generator",
  "component-library": "Component Library",
};

const ADMIN_PAGE_PATHS: Record<AdminPage, string> = {
  dashboard: "/dashboard",
  "theme-editor": "/theme-editor",
  "palette-generator": "/palette-generator",
  "component-library": "/component-library",
};

const ADMIN_PAGES: AdminPage[] = [
  "dashboard",
  "theme-editor",
  "palette-generator",
  "component-library",
];

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Other Work" },
  { to: "/contact", label: "Contact" },
] as const;

type AdminNavProps = {
  currentPage: AdminPage;
};

export const ADMIN_NAV_HEIGHT = 64;

export function AdminNav({ currentPage }: AdminNavProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
    setIsAccountMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`admin-nav fixed top-0 left-0 right-0 z-50 w-full border-b bg-white transition-transform duration-300${
        isVisible ? "" : " -translate-y-full"
      }`}
    >
      <div className="admin-nav__inner">
        <div className="relative shrink-0 flex items-center gap-1" ref={accountMenuRef}>
          <RouterLink to="/" className="admin-nav__logo-link">
            <img src={logo} alt="Amy Ha Logo" className="admin-nav__logo" />
          </RouterLink>
          <button
            type="button"
            className="admin-nav__brand"
            aria-expanded={isAccountMenuOpen}
            onClick={() => setIsAccountMenuOpen((open) => !open)}
          >
            <Body as="span" size="medium">
              Amy Ha
            </Body>
          </button>

          {isAccountMenuOpen ? (
            <div className="absolute left-0 top-full mt-2 min-w-[160px] rounded-md border bg-white py-1 shadow-lg z-50">
              {ADMIN_PAGES.map((page) => (
                <RouterLink
                  key={page}
                  to={ADMIN_PAGE_PATHS[page]}
                  className={`block px-3 py-2 text-sm hover:bg-gray-50${
                    page === currentPage ? " underline" : ""
                  }`}
                  onClick={() => setIsAccountMenuOpen(false)}
                >
                  {ADMIN_PAGE_LABELS[page]}
                </RouterLink>
              ))}
              <div className="my-1 h-px bg-gray-200" aria-hidden="true" />
              <button
                type="button"
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>

        <nav className="admin-nav__site-links" aria-label="Site pages">
          {publicLinks.map((link) => (
            <RouterLink key={link.to} to={link.to} className="admin-nav__site-link">
              {link.label}
            </RouterLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
