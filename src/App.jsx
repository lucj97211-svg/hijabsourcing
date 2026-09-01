import React from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import Hero from "./components/Hero.jsx";
import FabricCatalogue from "./components/FabricCatalogue.jsx";
import { FactoryAbout, FaqAccordion, ProcessGrid, QcGrid, TrustBar } from "./components/Sections.jsx";
import InquiryForm from "./components/InquiryForm.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import CustomizationStudio from "./features/customization/CustomizationStudio.jsx";
import { CustomizationProvider } from "./features/customization/CustomizationContext.jsx";

export default function App() {
  return (
    <CustomizationProvider>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <FabricCatalogue />
        <CustomizationStudio />
        <ProcessGrid />
        <QcGrid />
        <FactoryAbout />
        <FaqAccordion />
        <InquiryForm />
      </main>
      <SiteFooter />
    </CustomizationProvider>
  );
}
