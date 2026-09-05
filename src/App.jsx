import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader.jsx";
import Hero from "./components/Hero.jsx";
import FabricCatalogue from "./components/FabricCatalogue.jsx";
import { TrustBar } from "./components/Sections.jsx";
import InquiryForm from "./components/InquiryForm.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import { CustomizationProvider } from "./features/customization/CustomizationContext.jsx";

import CustomizationPage from "./pages/CustomizationPage.jsx";
import ProcessPage from "./pages/ProcessPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import WhatsAppFab from "./components/WhatsAppFab.jsx";

function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <FabricCatalogue />
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}

/* CustomizationProvider wraps the whole tree so InquiryForm (which reads
   specText / fabric / logo from context) works on every page. Router is
   injected by the entry point (BrowserRouter in client, StaticRouter in SSR). */
export default function App() {
  return (
    <CustomizationProvider>
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/customization"  element={<CustomizationPage />} />
        <Route path="/process"        element={<ProcessPage />} />
        <Route path="/about"          element={<AboutPage />} />
        <Route path="/contact"        element={<ContactPage />} />
        <Route path="/blog"           element={<BlogPage />} />
        <Route path="/blog/:slug"     element={<BlogPostPage />} />
      </Routes>
      <WhatsAppFab />
    </CustomizationProvider>
  );
}
