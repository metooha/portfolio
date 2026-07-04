const ADMIN_PASSWORD_KEY = "portfolio-admin-password";
const DEFAULT_ADMIN_PASSWORD = "leo123";

export function getAdminPassword(): string {
  try {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (stored?.trim()) {
      return stored;
    }
  } catch {
    // localStorage may be unavailable
  }

  return import.meta.env.VITE_ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
}

export function setAdminPassword(password: string) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, password.trim());
}

export function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
): { ok: true } | { ok: false; error: string } {
  if (currentPassword !== getAdminPassword()) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const trimmed = newPassword.trim();
  if (!trimmed) {
    return { ok: false, error: "New password cannot be empty." };
  }

  setAdminPassword(trimmed);
  return { ok: true };
}
