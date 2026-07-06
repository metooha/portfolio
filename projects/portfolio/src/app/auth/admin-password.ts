const ADMIN_PASSWORD_KEY = "portfolio-admin-password";
const ADMIN_PASSWORD_CUSTOM_KEY = "portfolio-admin-password-custom";
const DEFAULT_ADMIN_PASSWORD = "leo123";

function readCustomAdminPassword(): string | null {
  try {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY)?.trim();
    if (!stored) {
      return null;
    }

    const isCustom = localStorage.getItem(ADMIN_PASSWORD_CUSTOM_KEY) === "true";
    if (isCustom) {
      return stored;
    }

    // Password was saved before the custom-password flag existed.
    localStorage.setItem(ADMIN_PASSWORD_CUSTOM_KEY, "true");
    return stored;
  } catch {
    return null;
  }
}

export function getAdminPassword(): string {
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD?.trim();
  if (envPassword) {
    return envPassword;
  }

  return readCustomAdminPassword() ?? DEFAULT_ADMIN_PASSWORD;
}

export function verifyAdminPassword(password: string): boolean {
  const normalized = password.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  if (normalized === getAdminPassword().trim().toLowerCase()) {
    return true;
  }

  // Local dev recovery when no build-time password is configured.
  if (!import.meta.env.VITE_ADMIN_PASSWORD?.trim()) {
    return normalized === DEFAULT_ADMIN_PASSWORD.toLowerCase();
  }

  return false;
}

export function setAdminPassword(password: string) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, password.trim());
  localStorage.setItem(ADMIN_PASSWORD_CUSTOM_KEY, "true");
}

export function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
): { ok: true } | { ok: false; error: string } {
  if (!verifyAdminPassword(currentPassword)) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const trimmed = newPassword.trim();
  if (!trimmed) {
    return { ok: false, error: "New password cannot be empty." };
  }

  setAdminPassword(trimmed);
  return { ok: true };
}
