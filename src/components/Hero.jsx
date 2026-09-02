import React from "react";
import { CAPABILITIES, PROCESS } from "../data/site.js";

/* The first four process steps become the timed captions.
   Background images are the four factory storyboard stills. */
const SLIDES = [
  {
    img: "https://sc02.alicdn.com/kf/A9f8b1ec96a604536845ac26e659de6d8W.png",
    step: PROCESS[0],
  },
  {
    img: "https://sc02.alicdn.com/kf/A3a771797d07f4df68959704d29689ac3n.png",
    step: PROCESS[1],
  },
  {
    img: "https://sc02.alicdn.com/kf/A3819c36cf6af4412a45fb625e8fa22599.png",
    step: PROCESS[2],
  },
  {
    img: "https://sc02.alicdn.com/kf/A601cdcc2a0844e6a8dea636c65c5e32bv.png",
    step: PROCESS[3],
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
            <span className="hero__caption-step">Step {s.step.no}</span>
            <p className="hero__caption-title">{s.step.name}</p>
            <p className="hero__caption-note">{s.step.body}</p>
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
