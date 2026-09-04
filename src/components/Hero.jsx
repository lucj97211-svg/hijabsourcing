import React from "react";
import { CAPABILITIES } from "../data/site.js";

/* The first four process steps become the timed captions.
   Slide 1 uses the user-supplied drape photo with custom factory caption.
   Slides 2-4 retain the original factory storyboard images. */
const SLIDES = [
  {
    img: "/assets/images/hero/hero-slide1.jpg",
    caption: {
      step: "OEM · Private Label",
      title: "From fabric to finished hijab — under one roof.",
      note: "Modal, jersey, bamboo and liquid jersey in 60–240 GSM. We knit, dye, cut, sew and pack in-house.",
    },
  },
];

export default function Hero() {
  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="top" data-component="hero">

      {/* ── Background slideshow ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="hero__poster"
          style={{ backgroundImage: `url('${s.img}')` }}
          aria-hidden="true"
        />
      ))}

      {/* ── Cinematic scrim ── */}
      <div className="hero__scrim" aria-hidden="true" />

      {/* ── Subtle film grain ── */}
      <div className="hero__grain" aria-hidden="true" />

      {/* ── Timed captions ── */}
      <div className="hero__captions" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={i} className="hero__caption">
            <span className="hero__caption-step">{s.caption.step}</span>
            <p className="hero__caption-title">{s.caption.title}</p>
            <p className="hero__caption-note">{s.caption.note}</p>
          </div>
        ))}
      </div>

      {/* ── Final lockup (visible in last quarter of the cycle) ── */}
      <div className="hero__lockup">
        <span className="hero__lockup-eyebrow">OEM · Private label · Bulk production</span>
        <h1 className="hero__lockup-title">
          Your hijab brand,
          <br />
          built from fabric up.
        </h1>
        <div className="hero__lockup-rule" aria-hidden="true" />
        <p className="hero__lockup-sub">
          Thirteen base fabrics from 60 to 240 GSM —
          choose the weight, match the shade, add your label.
        </p>
        <div className="hero__lockup-actions">
          <a className="btn btn--solid" href="#contact" onClick={go("contact")}>
            Start your OEM project
          </a>
          <a className="btn btn--inverse" href="#fabrics" onClick={go("fabrics")}>
            View fabric range
          </a>
        </div>
      </div>

      {/* ── Progress track ── */}
      <div className="hero__track" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <div key={i} className="hero__track-seg" />
        ))}
      </div>

      {/* ── Metric strip ── */}
      <ul className="hero__metrics">
        {CAPABILITIES.map((cap) => (
          <li key={cap.label} className="hero__metric">
            <span className="hero__metric-label">{cap.label}</span>
            <span className="hero__metric-desc">{cap.line}</span>
          </li>
        ))}
      </ul>

    </section>
  );
}
