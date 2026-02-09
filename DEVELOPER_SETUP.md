# Mac Developer Setup Guide

Use this guide to set up your Mac for development. Run each section in **Terminal** (Applications → Utilities → Terminal, or press `Cmd + Space` and type "Terminal").

---

## 1. Xcode Command Line Tools (required first)

These provide `git`, compilers, and other tools many dev tools depend on.

1. Open **Terminal**.
2. Run:
   ```bash
   xcode-select --install
   ```
3. When the dialog appears, click **Install** and accept the license.
4. Wait for the install to finish (can take 10–15 minutes).
5. Confirm:
   ```bash
   git --version
   ```
   You should see something like `git version 2.x.x`.

---

## 2. Homebrew (package manager)

Homebrew lets you install and update dev tools easily.

1. Install Homebrew:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Follow the on-screen instructions. At the end it will tell you to add Homebrew to your PATH. It will show two lines like:
   ```bash
   echo >> ~/.zprofile
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```
   **Run those lines** (copy-paste them into Terminal).
3. Confirm:
   ```bash
   brew --version
   ```

---

## 3. Node.js (for JavaScript/TypeScript and this project)

This project uses **Node.js** with **pnpm**. Using **nvm** (Node Version Manager) makes it easy to switch Node versions later.

1. Install nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```
2. Restart Terminal (or run `source ~/.zshrc`).
3. Install the current LTS Node.js:
   ```bash
   nvm install --lts
   nvm use --lts
   ```
4. Confirm:
   ```bash
   node --version
   npm --version
   ```

---

## 4. pnpm (used by this project)

1. Install pnpm:
   ```bash
   npm install -g pnpm
   ```
2. Confirm:
   ```bash
   pnpm --version
   ```

---

## 5. Git identity (for commits)

Set your name and email so commits are attributed correctly:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the same email as your GitHub/GitLab account if you push there.

---

## 6. Verify this project

From the project root:

```bash
cd /Users/amyha/Documents/design-assistant/projects/portfolio
pnpm install
pnpm dev
```

You should see the dev server start (e.g. http://localhost:5173). Press `Ctrl+C` to stop it.

---

## Optional but useful

| Tool | Install | Why |
|------|--------|-----|
| **GitHub CLI** | `brew install gh` | Login to GitHub and manage repos from the terminal. |
| **VS Code / Cursor** | You’re already using Cursor | Great for TS/React. |
| **Docker** | [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) | If you ever need containers or Docker-based dev. |

---

## Troubleshooting

- **“command not found: git” after installing Xcode tools**  
  Quit and reopen Terminal, or run `source ~/.zprofile` (or `source ~/.zshrc`).

- **Homebrew “command not found”**  
  Make sure you ran the `echo` and `eval` lines it printed at the end of install (step 2.2).

- **nvm “command not found”**  
  Restart Terminal or run `source ~/.zshrc`.

- **Permission errors**  
  Avoid `sudo` for installing dev tools. Use Homebrew and nvm as above; they install under your user.

---

## Quick reference after setup

```bash
git status
git add -A
git commit -m "Your message"
git push

cd projects/portfolio && pnpm install && pnpm dev
```

You’re set up when: `git --version`, `brew --version`, `node --version`, and `pnpm --version` all work, and `pnpm dev` runs in this project.
