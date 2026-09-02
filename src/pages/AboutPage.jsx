import React from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { FactoryAbout, MarketsBand, TrustBar } from "../components/Sections.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="page-hero page-hero--tint">
          <div className="container page-hero__inner">
            <span className="eyebrow page-hero__eyebrow">The mill</span>
            <h1 className="page-hero__title">About Us</h1>
            <p className="page-hero__lede">
              One factory, from yarn cone to packed carton. Knitting, dyeing, finishing and
              packaging under the same roof in Shaoxing since 2015.
            </p>
          </div>
        </div>
        <TrustBar />
        <FactoryAbout />
        <MarketsBand />
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}
