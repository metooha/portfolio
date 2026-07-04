import PaletteGeneratorPage from "@/component-library/PaletteGeneratorPage";
import { AdminNav } from "@/app/components/admin/AdminNav";
import "@/app/components/admin/AdminLayout.css";

export function PaletteGenerator() {
  return (
    <div className="admin-page flex h-screen flex-col overflow-hidden">
      <AdminNav currentPage="palette-generator" />
      <PaletteGeneratorPage />
    </div>
  );
}
