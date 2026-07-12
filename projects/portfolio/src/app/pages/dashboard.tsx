import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminNav } from "@/app/components/admin/AdminNav";
import { Button, ButtonGroup } from "@/app/components/Button/Button";
import { Card, CardContent, CardHeader } from "@/app/components/Card/Card";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/app/components/DataTable/DataTable";
import {
  CheckCircleIcon,
  LockIcon,
  TrashIcon,
} from "@/app/components/Icons/Icons";
import { IconButton } from "@/app/components/IconButton/IconButton";
import { PageContainer } from "@/app/components/layout";
import { PageHeader } from "@/app/components/PageHeader/PageHeader";
import { Select } from "@/app/components/Select/Select";
import { SnackbarProvider, useSnackbar } from "@/app/components/Snackbar/Snackbar";
import { Tag } from "@/app/components/Tag/Tag";
import { TextField } from "@/app/components/TextField/TextField";
import { Body, Heading } from "@/app/components/Text/Text";
import {
  applyThemeForPath,
  clearPageTheme,
  getAllThemeNames,
  getDefaultThemeForPath,
  getEffectiveThemeForPath,
  getPageThemeForPath,
  getThemeTargetForPath,
  PAGE_THEME_CHANGE_EVENT,
  setPageTheme,
} from "@/app/components/utils/themeManager";
import { useAuth } from "@/app/auth/auth-context";
import { getAdminPassword } from "@/app/auth/admin-password";
import {
  createSiteConfigPullRequest,
  DEFAULT_GITHUB_REPO,
  getStoredGitHubPat,
  GITHUB_PAT_CREATE_URL,
  GITHUB_SECRETS_URL,
  setStoredGitHubPat,
  verifyGitHubPat,
  buildAdminPasswordSecretInstructions,
} from "@/app/auth/github-publish";
import {
  getSitePages,
  isPageProtected,
  setPagePassword,
  type SitePage,
} from "@/app/auth/page-protection";
import { prototypes } from "@/app/data/prototypes-data";
import {
  collectPublishedSiteConfig,
  downloadPublishedSiteConfig,
} from "@/app/auth/site-config-publish";
import { ProtectedRoute } from "@/app/auth/protected-route";
import "@/app/components/admin/AdminLayout.css";

type SettingsSection = "account" | "publish" | "prototypes" | SitePage["group"];

const SETTINGS_SECTIONS: Array<{
  id: SettingsSection;
  label: string;
  description: string;
}> = [
  {
    id: "account",
    label: "Account",
    description: "Manage your admin sign-in credentials.",
  },
  {
    id: "publish",
    label: "Publish",
    description: "Sync dashboard changes to GitHub so all visitors see them after merge.",
  },
  {
    id: "main",
    label: "Main pages",
    description: "Set optional passwords and assign themes for primary site pages.",
  },
  {
    id: "case-study",
    label: "Case studies",
    description: "Set optional passwords and assign themes for case study pages.",
  },
  {
    id: "other-work",
    label: "Other work",
    description: "Set optional passwords and assign themes for other work detail pages.",
  },
  {
    id: "prototypes",
    label: "Prototypes",
    description: "Interactive experiments and tools hosted outside the portfolio site.",
  },
];

function SitePageRow({ page }: { page: SitePage }) {
  const { addSnack } = useSnackbar();
  const [protectedPage, setProtectedPage] = useState(() => isPageProtected(page.path));
  const [draftPassword, setDraftPassword] = useState("");
  const [themeRevision, setThemeRevision] = useState(0);

  useEffect(() => {
    const refreshThemes = () => setThemeRevision((value) => value + 1);
    window.addEventListener(PAGE_THEME_CHANGE_EVENT, refreshThemes);
    window.addEventListener("ld-kit-theme-change", refreshThemes);
    return () => {
      window.removeEventListener(PAGE_THEME_CHANGE_EVENT, refreshThemes);
      window.removeEventListener("ld-kit-theme-change", refreshThemes);
    };
  }, []);

  const themeInfo = useMemo(() => {
    void themeRevision;
    const target = getThemeTargetForPath(page.path);
    const assignedTheme = getPageThemeForPath(page.path);
    const effectiveTheme = getEffectiveThemeForPath(page.path);
    const defaultTheme = getDefaultThemeForPath(page.path);
    return {
      target,
      assignedTheme,
      effectiveTheme,
      defaultTheme,
      isOverride: assignedTheme !== null,
    };
  }, [page.path, themeRevision]);

  const themeNames = useMemo(() => {
    void themeRevision;
    return getAllThemeNames();
  }, [themeRevision]);

  const [selectedTheme, setSelectedTheme] = useState(themeInfo.effectiveTheme);

  useEffect(() => {
    setSelectedTheme(themeInfo.effectiveTheme);
  }, [themeInfo.effectiveTheme]);

  const handleApplyTheme = () => {
    if (!themeInfo.target) return;
    setPageTheme(themeInfo.target.id, selectedTheme);
    applyThemeForPath(page.path);
    addSnack({ message: "Theme updated." });
  };

  const handleClearTheme = () => {
    if (!themeInfo.target) return;
    clearPageTheme(themeInfo.target.id);
    applyThemeForPath(page.path);
    setSelectedTheme(themeInfo.defaultTheme);
    addSnack({ message: "Theme reset to default." });
  };

  const handleSave = () => {
    setPagePassword(page.path, draftPassword || null);
    setProtectedPage(isPageProtected(page.path));
    setDraftPassword("");
    addSnack({
      message:
        "Password saved in this browser. Publish to GitHub when you're ready for all visitors to see it.",
    });
  };

  const handleClear = () => {
    setPagePassword(page.path, null);
    setProtectedPage(false);
    setDraftPassword("");
    addSnack({ message: "Password removed." });
  };

  return (
    <DataTableRow>
      <DataTableCell>
        <Link to={page.path} className="font-medium hover:underline break-words">
          {page.name}
        </Link>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mt-0.5 break-all">
          {page.path}
        </Body>
      </DataTableCell>
      <DataTableCell>
        {protectedPage ? (
          <Tag
            color="warning"
            variant="secondary"
            size="small"
            leading={<LockIcon size="small" decorative />}
          >
            Password protected
          </Tag>
        ) : (
          <Tag
            color="positive"
            variant="secondary"
            size="small"
            leading={<CheckCircleIcon size="small" decorative />}
          >
            Public
          </Tag>
        )}
      </DataTableCell>
      <DataTableCell>
        {themeInfo.target ? (
          <div className="admin-page-row-actions">
            <div className="admin-page-row-select">
              <Select
                label="Theme"
                size="small"
                value={selectedTheme}
                onChange={(event) => setSelectedTheme(event.target.value)}
                selectProps={{ "aria-label": `Theme for ${page.name}` }}
              >
                {themeNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
            <ButtonGroup>
              <Button variant="primary" size="small" type="button" onClick={handleApplyTheme}>
                Apply
              </Button>
              {themeInfo.isOverride ? (
                <Button variant="secondary" size="small" type="button" onClick={handleClearTheme}>
                  Use default
                </Button>
              ) : null}
            </ButtonGroup>
          </div>
        ) : null}
      </DataTableCell>
      <DataTableCell>
        <div className="admin-page-row-actions">
          <div className="admin-page-row-field">
            <TextField
              label="Password"
              type="password"
              size="small"
              value={draftPassword}
              onChange={(event) => setDraftPassword(event.target.value)}
              textFieldProps={{
                placeholder: protectedPage ? "Change password" : "Set password",
              }}
            />
          </div>
          <ButtonGroup>
            <Button variant="primary" size="small" type="button" onClick={handleSave}>
              Save
            </Button>
          </ButtonGroup>
          {protectedPage ? (
            <IconButton
              a11yLabel="Remove password"
              color="tertiary"
              size="small"
              type="button"
              onClick={handleClear}
            >
              <TrashIcon size="small" decorative />
            </IconButton>
          ) : null}
        </div>
      </DataTableCell>
    </DataTableRow>
  );
}

function SiteSettingsPublishPanel() {
  const { addSnack } = useSnackbar();
  const [githubPat, setGithubPat] = useState(() => getStoredGitHubPat());
  const [githubUser, setGithubUser] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const [prUrl, setPrUrl] = useState("");

  const handleSavePat = async () => {
    setError("");
    setIsConnecting(true);
    try {
      const trimmed = githubPat.trim();
      if (!trimmed) {
        setStoredGitHubPat("");
        setGithubUser("");
        addSnack({ message: "GitHub connection removed." });
        return;
      }

      const login = await verifyGitHubPat(trimmed);
      setStoredGitHubPat(trimmed);
      setGithubUser(login);
      addSnack({ message: `Connected to GitHub as ${login}.` });
    } catch (connectError) {
      setStoredGitHubPat("");
      setGithubUser("");
      setError(connectError instanceof Error ? connectError.message : "Could not connect to GitHub.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePublish = async () => {
    setError("");
    setPrUrl("");
    const token = getStoredGitHubPat();
    if (!token) {
      setError("Connect GitHub first with a personal access token.");
      return;
    }

    setIsPublishing(true);
    try {
      const config = collectPublishedSiteConfig();
      const result = await createSiteConfigPullRequest(token, config);
      setPrUrl(result.prUrl);
      addSnack({ message: "Pull request created. Review and merge on GitHub." });
      window.open(result.prUrl, "_blank", "noopener,noreferrer");
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Could not create pull request.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownload = () => {
    downloadPublishedSiteConfig();
    addSnack({
      message:
        "Downloaded site-config.json. Commit it to projects/portfolio/public/site-config.json if you prefer manual publish.",
    });
  };

  return (
    <div className="admin-settings-layout__panel-stack">
      <Card size="small">
        <CardHeader title="GitHub connection" headingLevel="h3" />
        <CardContent UNSAFE_className="admin-card-stack">
          <Body as="p" size="small" color="subtle">
            Create a token with <Body as="span" size="small">repo</Body> access, paste it here once,
            then publish changes as a pull request to{" "}
            <Body as="span" size="small" UNSAFE_className="font-mono">
              {DEFAULT_GITHUB_REPO.owner}/{DEFAULT_GITHUB_REPO.repo}
            </Body>
            .
          </Body>
          <TextField
            label="GitHub personal access token"
            type="password"
            size="small"
            value={githubPat}
            onChange={(event) => {
              setGithubPat(event.target.value);
              setError("");
            }}
            error={error || undefined}
            textFieldProps={{
              autoComplete: "off",
              placeholder: githubUser ? `Connected as ${githubUser}` : "ghp_…",
            }}
          />
          <ButtonGroup>
            <Button
              variant="secondary"
              size="small"
              type="button"
              onClick={handleSavePat}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting…" : "Save connection"}
            </Button>
            <Button
              variant="secondary"
              size="small"
              type="button"
              onClick={() => window.open(GITHUB_PAT_CREATE_URL, "_blank", "noopener,noreferrer")}
            >
              Create token
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card size="small">
        <CardHeader title="Publish site settings" headingLevel="h3" />
        <CardContent UNSAFE_className="admin-card-stack">
          <Body as="p" size="small" color="subtle">
            Opens a pull request with your current page passwords, per-page themes, and custom themes.
            Merge the PR on GitHub and GitHub Pages will redeploy automatically.
          </Body>
          <ButtonGroup>
            <Button
              variant="primary"
              size="small"
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? "Creating pull request…" : "Open pull request on GitHub"}
            </Button>
            <Button variant="secondary" size="small" type="button" onClick={handleDownload}>
              Download site-config.json
            </Button>
          </ButtonGroup>
          {prUrl ? (
            <Body as="p" size="small">
              <a href={prUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Review pull request on GitHub
              </a>
            </Body>
          ) : null}
        </CardContent>
      </Card>

      <Card size="small">
        <CardHeader title="Admin login password" headingLevel="h3" />
        <CardContent UNSAFE_className="admin-card-stack">
          <Body as="p" size="small" color="subtle">
            Admin login is not stored in public site files. Add{" "}
            <Body as="span" size="small" UNSAFE_className="font-mono">
              VITE_ADMIN_PASSWORD
            </Body>{" "}
            as a GitHub Actions secret, then redeploy.
          </Body>
          <ButtonGroup>
            <Button
              variant="secondary"
              size="small"
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(buildAdminPasswordSecretInstructions(getAdminPassword()));
                addSnack({ message: "Copied admin password secret instructions." });
              }}
            >
              Copy secret instructions
            </Button>
            <Button
              variant="secondary"
              size="small"
              type="button"
              onClick={() => window.open(GITHUB_SECRETS_URL, "_blank", "noopener,noreferrer")}
            >
              Open GitHub secrets
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </div>
  );
}

function PrototypesPanel() {
  return (
    <Card size="small">
      <CardContent>
        <ul className="admin-prototypes-list">
          {prototypes.map((prototype) => (
            <li key={prototype.id} className="admin-prototypes-list__item">
              <Heading as="h3" size="small" weight="default">
                {prototype.name}
              </Heading>
              <Body as="p" size="small" color="subtle" UNSAFE_className="mt-1">
                {prototype.description}
              </Body>
              <div className="admin-prototypes-list__actions">
                <Button
                  variant="primary"
                  size="small"
                  href={prototype.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open prototype
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SitePagesPanel({ group }: { group: SitePage["group"] }) {
  const pages = useMemo(
    () => getSitePages().filter((page) => page.group === group),
    [group],
  );

  if (pages.length === 0) {
    return (
      <Card size="small">
        <CardContent>
          <Body as="p" size="small" color="subtle">
            No pages in this group.
          </Body>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card size="small" UNSAFE_className="admin-pages-card">
        <CardContent UNSAFE_className="admin-pages-table">
          <DataTable UNSAFE_className="w-full text-left text-sm">
            <DataTableHead>
              <DataTableRow>
                <DataTableHeader>Page</DataTableHeader>
                <DataTableHeader>Status</DataTableHeader>
                <DataTableHeader>Theme</DataTableHeader>
                <DataTableHeader>Password</DataTableHeader>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {pages.map((page) => (
                <SitePageRow key={page.path} page={page} />
              ))}
            </DataTableBody>
          </DataTable>
      </CardContent>
    </Card>
  );
}

function AccountSettings() {
  const { updateAdminPassword } = useAuth();
  const { addSnack } = useSnackbar();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setShowPasswordForm(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const result = updateAdminPassword(currentPassword, newPassword);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    addSnack({ message: "Password updated." });
  };

  return (
    <Card size="small">
      <CardHeader
        title="Sign-in password"
        headingLevel="h3"
        trailing={
          <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={() => {
              setShowPasswordForm((open) => !open);
              setError("");
            }}
          >
            {showPasswordForm ? "Cancel" : "Change"}
          </Button>
        }
      />
      <CardContent UNSAFE_className="admin-card-stack">
        <Body as="p" size="small" color="subtle">
          Password used to sign in at /login.
        </Body>

        {showPasswordForm ? (
          <form onSubmit={handleSubmit} className="admin-password-form">
            <TextField
              label="Current password"
              type="password"
              size="small"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              textFieldProps={{
                id: "current-admin-password",
                autoComplete: "current-password",
              }}
            />
            <TextField
              label="New password"
              type="password"
              size="small"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              textFieldProps={{
                id: "new-admin-password",
                autoComplete: "new-password",
              }}
            />
            <TextField
              label="Confirm new password"
              type="password"
              size="small"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={error || undefined}
              textFieldProps={{
                id: "confirm-admin-password",
                autoComplete: "new-password",
              }}
            />

            <ButtonGroup>
              <Button variant="primary" size="small" type="submit">
                Save password
              </Button>
              <Button variant="secondary" size="small" type="button" onClick={resetPasswordForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        ) : (
          <Body as="p" size="small" color="subtle" UNSAFE_className="admin-password-mask">
            <LockIcon size="small" decorative />
            ••••••••
          </Body>
        )}
      </CardContent>
    </Card>
  );
}

function SettingsPanel({ section }: { section: SettingsSection }) {
  if (section === "account") {
    return <AccountSettings />;
  }

  if (section === "publish") {
    return <SiteSettingsPublishPanel />;
  }

  if (section === "prototypes") {
    return <PrototypesPanel />;
  }

  return <SitePagesPanel group={section} />;
}

function DashboardContent() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const currentSection =
    SETTINGS_SECTIONS.find((section) => section.id === activeSection) ?? SETTINGS_SECTIONS[0];

  return (
    <div className="admin-page">
      <AdminNav currentPage="dashboard" />

      <div className="admin-page-header-band">
        <PageContainer maxWidth="max-w-[1660px]">
          <PageHeader
            section="Admin"
            title="Settings"
            description="Manage your admin account, page passwords, and per-page themes."
            UNSAFE_className="admin-page-header"
          />
        </PageContainer>
      </div>

      <PageContainer as="main" maxWidth="max-w-[1660px]" className="admin-page__content">
        <div className="admin-settings-layout">
          <aside className="admin-settings-layout__nav">
            <nav aria-label="Settings">
              <ul className="admin-settings-nav-list">
                {SETTINGS_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <Button
                      type="button"
                      variant={activeSection === section.id ? "secondary" : "tertiary"}
                      size="small"
                      isFullWidth
                      aria-current={activeSection === section.id ? "page" : undefined}
                      UNSAFE_className="admin-settings-nav-button"
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <section className="admin-settings-layout__panel">
            <div className="admin-settings-layout__panel-intro">
              <Heading as="h2" size="medium" weight="default">
                {currentSection.label}
              </Heading>
              <Body as="p" size="small" color="subtle">
                {currentSection.description}
              </Body>
            </div>
            <div className="admin-settings-layout__panel-body">
              <SettingsPanel section={activeSection} />
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}

export function Dashboard() {
  return (
    <ProtectedRoute>
      <SnackbarProvider>
        <DashboardContent />
      </SnackbarProvider>
    </ProtectedRoute>
  );
}
