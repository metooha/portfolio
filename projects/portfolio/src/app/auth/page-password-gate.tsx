import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/app/components/Button/Button";
import { LockIcon } from "@/app/components/Icons/Icons";
import { TextField } from "@/app/components/TextField/TextField";
import { Body, Heading } from "@/app/components/Text/Text";
import { useAuth } from "@/app/auth/auth-context";
import {
  getSitePages,
  isPageProtected,
  isPageUnlocked,
  unlockPage,
} from "@/app/auth/page-protection";

type PagePasswordGateProps = {
  path: string;
  pageName: string;
  children: ReactNode;
};

export function PagePasswordGate({ path, pageName, children }: PagePasswordGateProps) {
  const { isAdmin } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(() => isPageUnlocked(path));

  useEffect(() => {
    setUnlocked(isPageUnlocked(path));
    setPassword("");
    setError("");
  }, [path]);

  const protectedPage = isPageProtected(path);

  if (isAdmin || !protectedPage || unlocked) {
    return children;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (unlockPage(path, password)) {
      setUnlocked(true);
      setError("");
      return;
    }
    setError("Incorrect password. Try again.");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <LockIcon size="medium" decorative />
          </div>
          <div>
            <Heading as="h1" size="medium" weight="default">
              Password required
            </Heading>
            <Body as="p" size="small" color="subtle">
              {pageName}
            </Body>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Enter password to view this page"
            type="password"
            size="small"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            error={error || undefined}
            textFieldProps={{
              id: "page-password",
              autoComplete: "current-password",
            }}
          />

          <Button variant="primary" size="medium" type="submit" isFullWidth>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export function usePageGatePath(pathname: string): { path: string; name: string } {
  const sitePage = getSitePages().find((page) => page.path === pathname);
  if (sitePage) {
    return { path: sitePage.path, name: sitePage.name };
  }

  return { path: pathname, name: "Page" };
}
