import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/Button/Button";
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

  const adminActions = isAdmin ? (
    <>
      <span className="h-4 w-px bg-gray-200" aria-hidden="true" />
      <Link to="/dashboard" className="text-sm hover:underline">
        Dashboard
      </Link>
      <Link to="/theme-editor" className="text-sm hover:underline">
        Theme Editor
      </Link>
      <Link to="/component-library" className="text-sm hover:underline">
        Component Library
      </Link>
      <Button variant="secondary" size="small" type="button" onClick={handleLogout}>
        Sign out
      </Button>
    </>
  ) : (
    <Button variant="secondary" size="small" type="button" onClick={() => navigate("/login")}>
      Sign in
    </Button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex h-16 items-center px-4 md:px-[68px]">
        <Link to="/" className="flex items-center space-x-2 no-underline text-inherit shrink-0">
          <img src={logo} alt="Amy Ha Logo" className="h-8 w-auto" />
          <Body as="span" size="medium">
            Amy Ha
          </Body>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm hover:underline">
                {link.label}
              </Link>
            ))}
            {adminActions}
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

            {isAdmin ? (
              <>
                <div className="my-1 h-px bg-gray-200" aria-hidden="true" />
                <Link
                  to="/dashboard"
                  className="text-sm hover:underline py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/theme-editor"
                  className="text-sm hover:underline py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Theme Editor
                </Link>
                <Link
                  to="/component-library"
                  className="text-sm hover:underline py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Component Library
                </Link>
                <Button variant="secondary" size="small" type="button" onClick={handleLogout}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
              >
                Sign in
              </Button>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
