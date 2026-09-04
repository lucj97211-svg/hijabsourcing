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
        <div className="page-hero" style={{ '--page-hero-img': 'url(/assets/images/hero/hero-customization.png)' }}>
          <div className="container page-hero__inner" style={{ color: '#111' }}>
            <span className="eyebrow page-hero__eyebrow" style={{ color: '#2c3e30' }}>Studio</span>
            <h1 className="page-hero__title" style={{ color: '#111' }}>Customization</h1>
            <p className="page-hero__lede" style={{ color: '#222' }}>
              Set your fabric weight, match a shade on physical lab dip, and preview your logo
              across every label and packaging piece — all before committing to a sample.
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
