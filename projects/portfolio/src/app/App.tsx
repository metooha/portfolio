import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Home } from "@/app/pages/home";
import { CaseStudyPage } from "@/app/pages/case-study-page";
import { About } from "@/app/pages/about";
import { OtherWork } from "@/app/pages/other-work";
import { OtherWorkDetail } from "@/app/pages/other-work-detail";
import { Contact } from "@/app/pages/contact";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="min-h-screen">
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
      </div>
    </BrowserRouter>
  );
}