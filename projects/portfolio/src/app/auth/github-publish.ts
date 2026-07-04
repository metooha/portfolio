import type { SiteConfig } from "@/app/auth/site-config";

const GITHUB_PAT_KEY = "portfolio-github-pat";

export type GitHubRepoConfig = {
  owner: string;
  repo: string;
  branch: string;
  configPath: string;
  legacyPasswordsPath: string;
};

export const DEFAULT_GITHUB_REPO: GitHubRepoConfig = {
  owner: "metooha",
  repo: "portfolio",
  branch: "main",
  configPath: "projects/portfolio/public/site-config.json",
  legacyPasswordsPath: "projects/portfolio/public/page-passwords.json",
};

export const GITHUB_PAT_CREATE_URL =
  "https://github.com/settings/tokens/new?scopes=repo&description=Portfolio%20dashboard%20publish";

export const GITHUB_SECRETS_URL = "https://github.com/metooha/portfolio/settings/secrets/actions";

export function getStoredGitHubPat(): string {
  try {
    return localStorage.getItem(GITHUB_PAT_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}

export function setStoredGitHubPat(token: string) {
  const trimmed = token.trim();
  if (trimmed) {
    localStorage.setItem(GITHUB_PAT_KEY, trimmed);
    return;
  }
  localStorage.removeItem(GITHUB_PAT_KEY);
}

function encodeBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

async function githubRequest<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `GitHub API error (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // Ignore JSON parse failures.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

type GitRefResponse = {
  object: { sha: string };
};

type GitHubContentResponse = {
  sha: string;
};

type PullRequestResponse = {
  html_url: string;
  number: number;
};

type GitHubUserResponse = {
  login: string;
};

async function getExistingFileSha(
  token: string,
  repo: GitHubRepoConfig,
  filePath: string,
  branch: string,
): Promise<string | undefined> {
  try {
    const existing = await githubRequest<GitHubContentResponse>(
      `/repos/${repo.owner}/${repo.repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
      token,
    );
    return existing.sha;
  } catch {
    return undefined;
  }
}

async function upsertFile(
  token: string,
  repo: GitHubRepoConfig,
  filePath: string,
  branch: string,
  content: string,
  message: string,
) {
  const sha = await getExistingFileSha(token, repo, filePath, branch);
  await githubRequest(`/repos/${repo.owner}/${repo.repo}/contents/${filePath}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: encodeBase64Utf8(content),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function verifyGitHubPat(token: string): Promise<string> {
  const user = await githubRequest<GitHubUserResponse>("/user", token);
  return user.login;
}

export async function createSiteConfigPullRequest(
  token: string,
  config: SiteConfig,
  repo: GitHubRepoConfig = DEFAULT_GITHUB_REPO,
): Promise<{ prUrl: string; branch: string; prNumber: number }> {
  const baseRef = await githubRequest<GitRefResponse>(
    `/repos/${repo.owner}/${repo.repo}/git/ref/heads/${repo.branch}`,
    token,
  );
  const branchName = `site-config/update-${Date.now()}`;

  await githubRequest(`/repos/${repo.owner}/${repo.repo}/git/refs`, token, {
    method: "POST",
    body: JSON.stringify({
      ref: `refs/heads/${branchName}`,
      sha: baseRef.object.sha,
    }),
  });

  const commitMessage = "Update site settings from portfolio dashboard";
  const siteConfigContent = JSON.stringify(config, null, 2);
  const legacyPasswordsContent = JSON.stringify(config.pagePasswords, null, 2);

  await upsertFile(token, repo, repo.configPath, branchName, siteConfigContent, commitMessage);
  await upsertFile(
    token,
    repo,
    repo.legacyPasswordsPath,
    branchName,
    legacyPasswordsContent,
    commitMessage,
  );

  const pullRequest = await githubRequest<PullRequestResponse>(
    `/repos/${repo.owner}/${repo.repo}/pulls`,
    token,
    {
      method: "POST",
      body: JSON.stringify({
        title: "Update site settings from dashboard",
        head: branchName,
        base: repo.branch,
        body: [
          "Published from the portfolio admin dashboard.",
          "",
          "Merge this pull request to apply:",
          "- Page password gates",
          "- Per-page theme assignments",
          "- Custom themes from Theme Editor",
          "",
          "GitHub Pages will redeploy automatically after merge.",
        ].join("\n"),
      }),
    },
  );

  return {
    prUrl: pullRequest.html_url,
    branch: branchName,
    prNumber: pullRequest.number,
  };
}

export function buildAdminPasswordSecretInstructions(password: string): string {
  return [
    "Add this repository secret in GitHub Actions:",
    "",
    "Name: VITE_ADMIN_PASSWORD",
    `Value: ${password}`,
    "",
    `Settings: ${GITHUB_SECRETS_URL}`,
  ].join("\n");
}
