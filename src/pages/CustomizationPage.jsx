import React from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import CustomizationStudio from "../features/customization/CustomizationStudio.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

export default function CustomizationPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="page-hero" style={{ '--page-hero-img': 'url(/assets/images/hero/hero-customization.webp)' }}>
          <div className="container page-hero__inner">
            <span className="eyebrow page-hero__eyebrow">Studio</span>
            <h1 className="page-hero__title">Customization</h1>
            <p className="page-hero__lede">
              Set your fabric weight, match a shade on physical lab dip, and preview your logo
              across every label and packaging piece â€?all before committing to a sample.
            </p>
          </div>
        </div>
        <CustomizationStudio />
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}
