import React from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="page-hero" style={{ '--page-hero-img': 'url(/assets/images/hero/hero-contact.png)' }}>
          <div className="container page-hero__inner">
            <span className="eyebrow page-hero__eyebrow">Get in touch</span>
            <h1 className="page-hero__title">Contact</h1>
            <p className="page-hero__lede">
              Send your fabric, weight and quantity — we come back with a quote and a
              dated schedule, usually within one business day.
            </p>
          </div>
        </div>
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}
