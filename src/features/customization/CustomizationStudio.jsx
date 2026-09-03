import React, { useState } from "react";
import { ALL_FABRICS } from "../../data/site.js";
import Reveal from "../../components/Reveal.jsx";
import { useCustomization } from "./CustomizationContext.jsx";
import FabricPreview from "./FabricPreview.jsx";
import GsmSlider from "./GsmSlider.jsx";
import ColorPicker from "./ColorPicker.jsx";
import LogoStudio from "./LogoStudio.jsx";

export default function CustomizationStudio() {
  const { fabricId, setFabricId, specLine, specText } = useCustomization();
  const [copied, setCopied] = useState(false);

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(specText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const sendSpec = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById("inq-name")?.focus();
    }, 600);
  };

  return (
    <section
      className="section section--brandtint studio"
      id="customization"
      data-component="customization-studio"
    >
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Customization studio</span>
          <h2>Build the spec before you write the email.</h2>
          <p className="lead">
            Set the weight and drop in your logo. Everything updates live, and the finished
            configuration goes straight into your inquiry.
          </p>
        </Reveal>

        <div className="studio__base">
          <label className="field field--inline">
            <span className="field__label">Base fabric</span>
            <select
              className="field__input"
              value={fabricId}
              onChange={(e) => setFabricId(e.target.value)}
            >
              {ALL_FABRICS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.gsm[0]}–{f.gsm[1]} GSM)
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="studio__row">
          {/* Column 1 — Weight */}
          <div className="studio__col">
            <GsmSlider />
            <div className="studio__col-preview">
              <FabricPreview />
            </div>
          </div>

          {/* Column 2 — Colour */}
          <div className="studio__col">
            <ColorPicker />
          </div>

          {/* Column 3 — Branding */}
          <div className="studio__col">
            <LogoStudio />
          </div>
        </div>

        <div className="spec-bar" data-component="studio-spec-bar">
          <p className="mono spec-bar__line">{specLine}</p>
          <div className="spec-bar__actions">
            <button type="button" className="btn btn--ghost btn--sm" onClick={copySpec}>
              {copied ? "Copied" : "Copy spec"}
            </button>
            <button type="button" className="btn btn--solid btn--sm" onClick={sendSpec}>
              Send this spec
            </button>
          </div>
          <p className="sr-only" role="status">
            {copied ? "Specification copied to clipboard." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
