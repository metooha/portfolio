import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { changeAdminPassword, verifyAdminPassword } from "@/app/auth/admin-password";

const ADMIN_SESSION_KEY = "portfolio-admin-session";

type AuthContextValue = {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateAdminPassword: (
    currentPassword: string,
    newPassword: string,
  ) => { ok: true } | { ok: false; error: string };
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(readSession);

  useEffect(() => {
    setIsAdmin(readSession());
  }, []);

  const login = useCallback((password: string) => {
    if (!verifyAdminPassword(password)) {
      return false;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setIsAdmin(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const updateAdminPassword = useCallback(
    (currentPassword: string, newPassword: string) => changeAdminPassword(currentPassword, newPassword),
    [],
  );

  const value = useMemo(
    () => ({
      isAdmin,
      login,
      logout,
      updateAdminPassword,
    }),
    [isAdmin, login, logout, updateAdminPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
