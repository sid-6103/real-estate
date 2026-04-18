import React, { useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import PropertiesPage from "@/pages/PropertiesPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import ShowcasePage from "@/pages/ShowcasePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

/* ─── Scroll restoration on route change ─── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    // Use Lenis API for scroll reset to avoid desyncing its internal state
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);
  return null;
};

/* ─── Page transition wrapper ─── */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ─── Animated Routes ─── */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/properties" element={<PageTransition><PropertiesPage /></PageTransition>} />
        <Route path="/property/:id" element={<PageTransition><PropertyDetailPage /></PageTransition>} />
        <Route path="/showcase" element={<PageTransition><ShowcasePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1.2 }}>
      <div className="App min-h-screen bg-[#0A0A0C]">
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <AnimatedRoutes />
          <Footer />
        </BrowserRouter>
      </div>
    </ReactLenis>
  );
}

export default App;
