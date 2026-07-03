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

const LivingDesignShowcase = lazy(() =>
  import("@/app/components/LivingDesignShowcase").then((module) => ({
    default: module.LivingDesignShowcase,
  })),
);

const ThemeEditor = lazy(() =>
  import("@/app/pages/theme-editor").then((module) => ({
    default: module.ThemeEditor,
  })),
);

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <div className="w-full min-h-full py-12">
      <Header />
      <main className="flex-1 w-full max-w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-study" element={<Navigate to="/case-study/1" replace />} />
          <Route path="/case-study/:id" element={<CaseStudyPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<OtherWork />} />
          <Route path="/other-work/:id" element={<OtherWorkDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/living-design"
            element={
              <Suspense fallback={null}>
                <LivingDesignShowcase />
              </Suspense>
            }
          />
          <Route
            path="/theme-editor"
            element={
              <Suspense fallback={null}>
                <ThemeEditor />
              </Suspense>
            }
          />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
