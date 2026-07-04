import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button/Button";
import { CloseIcon, MenuIcon } from "@/app/components/Icons/Icons";
import { IconButton } from "@/app/components/IconButton/IconButton";
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

type AdminNavProps = {
  currentPage: AdminPage;
};

export const ADMIN_NAV_HEIGHT = 64;

export function AdminNav({ currentPage }: AdminNavProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const linkClass = (page: AdminPage) =>
    `text-sm hover:underline${page === currentPage ? " underline" : ""}`;

  return (
    <header
      className={`admin-nav fixed top-0 left-0 right-0 z-50 w-full border-b bg-white transition-transform duration-300${
        isVisible ? "" : " -translate-y-full"
      }`}
    >
      <div className="admin-nav__inner">
        <RouterLink to="/" className="admin-nav__brand">
          <img src={logo} alt="Amy Ha Logo" className="admin-nav__logo" />
          <Body as="span" size="medium">
            Amy Ha
          </Body>
        </RouterLink>

        <div className="admin-nav__actions">
          <nav className="admin-nav__links--desktop">
            {ADMIN_PAGES.map((page) => (
              <RouterLink
                key={page}
                to={ADMIN_PAGE_PATHS[page]}
                className={linkClass(page)}
              >
                {ADMIN_PAGE_LABELS[page]}
              </RouterLink>
            ))}
            <Button variant="secondary" size="small" type="button" onClick={handleLogout}>
              Sign out
            </Button>
          </nav>

          <span className="admin-nav__menu-button">
            <IconButton
              a11yLabel={isMenuOpen ? "Close menu" : "Open menu"}
              size="small"
              color="tertiary"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <CloseIcon size="medium" decorative />
              ) : (
                <MenuIcon size="medium" decorative />
              )}
            </IconButton>
          </span>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="admin-nav__mobile">
          <div className="admin-nav__mobile-inner">
            {ADMIN_PAGES.map((page) => (
              <RouterLink
                key={page}
                to={ADMIN_PAGE_PATHS[page]}
                className={`${linkClass(page)} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {ADMIN_PAGE_LABELS[page]}
              </RouterLink>
            ))}
            <Button variant="secondary" size="small" type="button" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
