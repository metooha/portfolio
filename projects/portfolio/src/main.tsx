import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./app/styles/index.css";
import "./app/components/theme/index.css";
import {
  applyThemeForPath,
  initMegaMode,
  prepareThemeStorage,
} from "./app/components/utils/themeManager";
import { prepareSiteConfig } from "./app/auth/site-config";

function getInitialPathname(): string {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  const { pathname } = window.location;
  if (!basename) return pathname || "/";
  if (pathname === basename) return "/";
  if (pathname.startsWith(`${basename}/`)) {
    return pathname.slice(basename.length) || "/";
  }
  return pathname || "/";
}

async function bootstrap() {
  prepareThemeStorage();
  await prepareSiteConfig();
  initMegaMode();
  applyThemeForPath(getInitialPathname());

  createRoot(document.getElementById("root")!).render(<App />);
}

bootstrap();
  