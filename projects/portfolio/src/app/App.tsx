import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Home } from "@/app/pages/home";
import { CaseStudy } from "@/app/pages/case-study";
import { CaseStudy2 } from "@/app/pages/case-study-2";
import { CaseStudy3 } from "@/app/pages/case-study-3";
import { CaseStudy4 } from "@/app/pages/case-study-4";
import { About } from "@/app/pages/about";
import { OtherWork } from "@/app/pages/other-work";
import { OtherWorkDetail } from "@/app/pages/other-work-detail";
import { Contact } from "@/app/pages/contact";

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <div className="min-h-screen">
        <div className="w-full min-h-full py-12">
          <Header />
          <main className="flex-1 w-full max-w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study" element={<CaseStudy />} />
              <Route path="/case-study/1" element={<CaseStudy />} />
              <Route path="/case-study/2" element={<CaseStudy2 />} />
              <Route path="/case-study/3" element={<CaseStudy3 />} />
              <Route path="/case-study/4" element={<CaseStudy4 />} />
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