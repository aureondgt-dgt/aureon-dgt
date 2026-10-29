import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Hero, Navbar } from "./components/Top";
import { Calculator, FAQ, Included, Marquee, Offer, Process, SiteTypes } from "./components/Sections";
import { Contact, CursorGlow, FloatingWhats, Footer, ScrollProgress } from "./components/Contact";
import { LogoMark } from "./components/ui";

const Scene = lazy(() => import("./components/Scene"));

function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 1300);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (gone) return null;
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-700 ${hide ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <LogoMark className="loader-logo h-20 w-20" />
      <div className="mt-6 font-display text-sm font-bold tracking-[0.6em] chrome-text">AUREON</div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
        <div className="loader-bar h-full bg-white" />
      </div>
    </div>
  );
}

export default function App() {
  const sceneWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = () => {
      const p = window.scrollY / window.innerHeight;
      if (sceneWrap.current) sceneWrap.current.style.opacity = String(Math.max(1 - p * 0.7, 0.28));
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white antialiased selection:bg-white selection:text-black">
      <Loader />
      <ScrollProgress />

      {/* 3D background */}
      <div ref={sceneWrap} className="fixed inset-0 z-0">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85))]" />
      </div>
      <div className="noise pointer-events-none fixed inset-0 z-[2]" />
      <CursorGlow />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Calculator />
        <SiteTypes />
        <Included />
        <Process />
        <Offer />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
