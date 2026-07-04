import ThemeEditorPage from "@/component-library/ThemeEditorPage";
import { AdminNav } from "@/app/components/admin/AdminNav";
import "@/app/components/admin/AdminLayout.css";

/**
 * Standalone Theme Editor route for the main portfolio site (outside the
 * component library showcase). Route-based theming applies Portfolio to the
 * editor chrome via ApplyPageThemeOnRouteChange in App.tsx.
 */
export function ThemeEditor() {
  return (
    <div className="admin-page flex h-screen flex-col overflow-hidden">
      <AdminNav currentPage="theme-editor" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <ThemeEditorPage />
      </div>
    </div>
  );
}
