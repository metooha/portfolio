import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ThemeEditorPage from "@/living-design-showcase/pages/ThemeEditorPage";
import { initTheme } from "@/living-design/utils/themeManager";

/**
 * Standalone Theme Editor route for the main portfolio site (outside the
 * Living Design showcase). Loads the active theme on mount so any previously
 * applied custom theme is restored, then renders the full editor.
 */
export function ThemeEditor() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <div className="flex h-14 items-center gap-3 border-b border-[#E6E6E8] bg-white px-4 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2E2F32] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
        <span className="ml-1 text-sm font-semibold text-[#74767C]">Theme Editor</span>
      </div>
      <ThemeEditorPage />
    </div>
  );
}
