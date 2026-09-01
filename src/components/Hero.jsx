import React from "react";
import { CAPABILITIES } from "../data/site.js";

export default function Hero() {
  const go = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="top" data-component="hero">
      <picture className="hero__media">
        <source
          media="(max-width: 767px)"
          srcSet="/assets/images/hero/hero-fabric-daylight-mobile.jpg"
        />
        <img
          src="/assets/images/hero/hero-fabric-daylight.jpg"
          alt="Folded lengths of neutral hijab fabric in cream, oat and sage tones under raking morning daylight"
          fetchpriority="high"
        />
      </picture>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">OEM &amp; ODM hijab fabric mill</span>
        <h1 className="hero__title">Jersey and modal, woven to your weight.</h1>
        <p className="hero__sub">
          Thirteen base fabrics from 60 to 240 GSM. Choose the weight, match the shade, add your
          label — we knit, dye and finish it in one mill.
        </p>
        <div className="hero__actions">
          <a className="btn btn--solid" href="#contact" onClick={go("contact")}>
            Request a Quote
          </a>
          <a className="btn btn--inverse" href="#fabrics" onClick={go("fabrics")}>
            Explore 13 Fabrics
          </a>
        </div>
      </div>

      <div className="container hero__caps">
        <ul className="cap-grid">
          {CAPABILITIES.map((cap) => (
            <li className="cap-card" key={cap.label} data-component="hero-capability-card">
              <span className="mono cap-card__label">{cap.label}</span>
              <p className="cap-card__line">{cap.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
