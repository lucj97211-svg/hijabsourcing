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
        <div className="studio__stack">
          <GsmSlider />
          <ColorPicker />
          <LogoStudio />
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
