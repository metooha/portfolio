import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Home } from "@/app/pages/home";
import { CaseStudyPage } from "@/app/pages/case-study-page";
import { About } from "@/app/pages/about";
import { OtherWork } from "@/app/pages/other-work";
import { OtherWorkDetail } from "@/app/pages/other-work-detail";
import { Contact } from "@/app/pages/contact";
import { Login } from "@/app/pages/login";
import { Dashboard } from "@/app/pages/dashboard";
import { applyThemeForPath, PAGE_THEME_CHANGE_EVENT } from "@/app/components/utils/themeManager";
import { AuthProvider } from "@/app/auth/auth-context";
import { ProtectedRoute } from "@/app/auth/protected-route";
import { PagePasswordGate, usePageGatePath } from "@/app/auth/page-password-gate";

const ComponentLibraryShowcase = lazy(() =>
  import("@/app/components/ComponentLibraryShowcase").then((module) => ({
    default: module.ComponentLibraryShowcase,
  })),
);

const ThemeEditor = lazy(() =>
  import("@/app/pages/theme-editor").then((module) => ({
    default: module.ThemeEditor,
  })),
);

const PaletteGenerator = lazy(() =>
  import("@/app/pages/palette-generator").then((module) => ({
    default: module.PaletteGenerator,
  })),
);

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function ApplyPageThemeOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    const apply = () => applyThemeForPath(pathname);
    apply();
    window.addEventListener(PAGE_THEME_CHANGE_EVENT, apply);
    return () => window.removeEventListener(PAGE_THEME_CHANGE_EVENT, apply);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const gate = usePageGatePath(pathname);

  return (
    <div className="w-full min-h-full py-12">
      <Header />
      <main className="flex-1 w-full max-w-full">
        <PagePasswordGate key={gate.path} path={gate.path} pageName={gate.name}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study" element={<Navigate to="/case-study/1" replace />} />
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<OtherWork />} />
            <Route path="/other-work/:id" element={<OtherWorkDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PagePasswordGate>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollToTopOnRouteChange />
        <ApplyPageThemeOnRouteChange />
        <div className="min-h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/component-library"
              element={
                <ProtectedRoute>
                  <Suspense fallback={null}>
                    <ComponentLibraryShowcase />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/theme-editor"
              element={
                <ProtectedRoute>
                  <Suspense fallback={null}>
                    <ThemeEditor />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/palette-generator"
              element={
                <ProtectedRoute>
                  <Suspense fallback={null}>
                    <PaletteGenerator />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
