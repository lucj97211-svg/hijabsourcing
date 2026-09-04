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
        <div
          className="page-hero page-hero--custom"
          style={{ '--page-hero-img': 'url(/assets/images/hero/hero-customization.png?v=3)' }}
        >
          <div className="container page-hero__inner">
            <div className="custom-hero-text">
              <span className="custom-hero-eyebrow">Studio</span>
              <h1 className="custom-hero-title">Customization</h1>
              <div className="custom-hero-rule" />
              <p className="custom-hero-lede">
                Set your fabric weight, match a shade on physical lab dip,
                and preview your logo across every label and packaging piece —
                all before committing to a sample.
              </p>
            </div>
          </div>
        </div>
        <CustomizationStudio />
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}
