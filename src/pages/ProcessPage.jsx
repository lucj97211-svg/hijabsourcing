import React from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { ProcessGrid, QcGrid, FaqAccordion } from "../components/Sections.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="page-hero" style={{ '--page-hero-img': 'url(/assets/images/hero/hero-process.webp)' }}>
          <div className="container page-hero__inner">
            <span className="eyebrow page-hero__eyebrow">How it works</span>
            <h1 className="page-hero__title">Production Process</h1>
            <p className="page-hero__lede">
              Eight steps from inquiry to delivery. An approval gate before bulk means nothing
              enters production until you have held the sample and signed off.
            </p>
          </div>
        </div>
        <ProcessGrid />
        <QcGrid />
        <FaqAccordion />
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}
