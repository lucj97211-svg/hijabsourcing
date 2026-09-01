import React, { useState } from "react";
import { FAQ, MARKETS, PROCESS, QC, TRUST } from "../data/site.js";
import Reveal from "./Reveal.jsx";

export function TrustBar() {
  return (
    <section className="trust-bar" data-component="trust-bar">
      <div className="container">
        <ul className="trust-grid">
          {TRUST.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i} className="trust-item">
              <p className="trust-item__figure">
                <span className="trust-item__number">{item.figure}</span>
                <span className="mono trust-item__unit">{item.unit}</span>
              </p>
              <h3 className="trust-item__title">{item.title}</h3>
              <p className="trust-item__line">{item.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MarketsBand() {
  return (
    <section className="markets-band" data-component="markets-band">
      <div className="container markets-layout">
        <Reveal className="markets-intro">
          <span className="eyebrow">Where we ship</span>
          <h2>Exporting to ten markets.</h2>
          <p className="lead">
            We already handle the documentation, packing standards and freight routes for these
            destinations, so your first shipment is not our first attempt.
          </p>
        </Reveal>
        <Reveal className="markets-cols" delay={1}>
          {MARKETS.map((group) => (
            <div className="markets-col" key={group.region}>
              <h3 className="mono markets-col__region">{group.region}</h3>
              <ul>
                {group.countries.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessGrid() {
  return (
    <section className="section section--dark" id="process" data-component="process-grid">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Production process</span>
          <h2>From first inquiry to finished delivery.</h2>
          <p className="lead lead--inv">
            Eight steps, in order, with an approval gate before bulk. Nothing is knitted in volume
            until you have held the sample.
          </p>
        </Reveal>
        <ol className="process-matrix">
          {PROCESS.map((step, i) => (
            <Reveal as="li" key={step.no} delay={i % 4} className="process-cell">
              <span className="process-cell__no">{step.no}</span>
              <h3 className="mono process-cell__name">{step.name}</h3>
              <p className="process-cell__body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function QcGrid() {
  return (
    <section className="section" data-component="qc-grid">
      <div className="container qc-layout">
        <Reveal className="section-header qc-head">
          <span className="eyebrow">Quality control</span>
          <h2>Six checks every batch has to pass.</h2>
          <p className="lead">
            Checks happen on the line, not as a certificate at the end. If a batch drifts, it is
            caught before it is packed.
          </p>
        </Reveal>
        <Reveal className="qc-media">
          <img
            src="/assets/images/qc/inspection-detail.jpg"
            alt="Hands checking a length of neutral knit fabric on an inspection light table"
            loading="lazy"
          />
        </Reveal>
        <ul className="qc-matrix">
          {QC.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i % 3} className="qc-cell">
              <h3 className="qc-cell__name">{item.name}</h3>
              <p className="qc-cell__line">{item.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FactoryAbout() {
  return (
    <section className="section section--tint" id="about" data-component="factory-about">
      <div className="container about-layout">
        <Reveal className="about-media">
          <img
            className="about-media__tall"
            src="/assets/images/factory/knitting-floor.jpg"
            alt="Circular knitting machine on a textile mill floor with cream yarn cones feeding in"
            loading="lazy"
          />
          <img
            className="about-media__wide"
            src="/assets/images/factory/fabric-warehouse.jpg"
            alt="Warehouse aisle with racks of neutral fabric rolls"
            loading="lazy"
          />
        </Reveal>
        <Reveal className="about-copy" delay={1}>
          <span className="eyebrow">The mill</span>
          <h2>One factory, from yarn cone to packed carton.</h2>
          <p>
            We knit, dye, finish and pack in the same building. That is the whole reason this site
            can offer a weight slider instead of a fixed product list — when the knitting floor and
            the dye house answer to the same production plan, changing a GSM target or a shade is a
            scheduling decision rather than a negotiation between three suppliers.
          </p>
          <p>
            Most of our customers are building their own hijab label. They arrive with a shade
            reference and a rough idea of the hand they want, and leave with a spec sheet, a
            physical sample and a repeatable order. We would rather answer a hard technical question
            honestly than win an order on a promise we cannot hold.
          </p>
          <ul className="about-spec mono">
            <li>
              <span>Mill</span>
              <span>Shaoxing, Zhejiang, China · established 2015</span>
            </li>
            <li>
              <span>Scale</span>
              <span>8,000 m² · 120 staff</span>
            </li>
            <li>
              <span>Certification</span>
              <span>OEKO-TEX Standard 100 · BSCI</span>
            </li>
            <li>
              <span>Capability</span>
              <span>Knitting · dyeing · finishing · cut &amp; sew</span>
            </li>
            <li>
              <span>Capacity</span>
              <span>500,000 pieces per month</span>
            </li>
            <li>
              <span>Lead time</span>
              <span>30 days from approved sample</span>
            </li>
            <li>
              <span>Output</span>
              <span>Roll goods or finished pieces</span>
            </li>
            <li>
              <span>Branding</span>
              <span>Woven labels · tags · cards · boxes</span>
            </li>
            <li>
              <span>Customers</span>
              <span>Brand owners · boutiques · online sellers · distributors</span>
            </li>
            <li>
              <span>Export</span>
              <span>10 markets across 4 regions</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" data-component="faq-accordion">
      <div className="container-narrow">
        <Reveal className="section-header">
          <span className="eyebrow">Questions</span>
          <h2>Before you send the first email.</h2>
        </Reveal>
        <ul className="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="faq-item" key={item.q} data-component="faq-item">
                <h3>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-glyph" aria-hidden="true">
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  className={`faq-panel ${isOpen ? "is-open" : ""}`}
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
