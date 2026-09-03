import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { GSM_MAX, GSM_MIN, GSM_STEP, gsmZone } from "./gsm.js";
import FabricPreview from "./FabricPreview.jsx";

const ZONES = [
  { id: "ultralight", label: "Ultra-light", range: "60–80" },
  { id: "light",      label: "Light",       range: "80–110" },
  { id: "all-season", label: "All-season",  range: "110–150" },
  { id: "medheavy",   label: "Med-heavy",   range: "150–180" },
  { id: "winter",     label: "Winter",      range: "180–240" },
];

export default function GsmSlider() {
  const { gsm, setGsm, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const pct = ((gsm - GSM_MIN) / (GSM_MAX - GSM_MIN)) * 100;
  const inBand = gsm >= fabric.gsm[0] && gsm <= fabric.gsm[1];

  return (
    <div className="studio-block studio-block--row" data-component="studio-gsm-slider">
      {/* LEFT — label */}
      <div className="srow__label">
        <span className="mono studio-step">01 — Weight</span>
        <h3>Fabric weight</h3>
        <p className="muted studio-block__hint">
          Drag to set GSM. The drape preview updates as the fabric gets heavier.
        </p>
      </div>

      {/* RIGHT — controls + preview */}
      <div className="srow__content">
        <div className="srow__controls">
          <div className="gsm-readout">
            <span className="gsm-readout__value">{gsm}</span>
            <span className="mono gsm-readout__unit">GSM</span>
          </div>

          <label className="sr-only" htmlFor="gsm-range">
            Fabric weight in grams per square metre
          </label>
          <input
            id="gsm-range"
            className="gsm-range"
            type="range"
            min={GSM_MIN}
            max={GSM_MAX}
            step={GSM_STEP}
            value={gsm}
            aria-valuetext={`${gsm} GSM, ${zone.label.toLowerCase()} weight`}
            onChange={(e) => setGsm(Number(e.target.value))}
            style={{ "--range-pct": `${pct}%` }}
          />

          <div className="gsm-zones" aria-hidden="true">
            {ZONES.map((z) => (
              <div key={z.id} className={`gsm-zone ${zone.id === z.id ? "is-active" : ""}`}>
                <span className="mono">{z.label}</span>
                <span className="mono gsm-zone__range">{z.range}</span>
              </div>
            ))}
          </div>

          <p className="gsm-note" role="status">{zone.note}</p>

          <p className={`mono gsm-band ${inBand ? "is-ok" : "is-warn"}`}>
            {inBand
              ? `Within the ${fabric.name} band (${fabric.gsm[0]}–${fabric.gsm[1]} GSM)`
              : `Outside the standard ${fabric.name} band — ask us if it can be run`}
          </p>
        </div>

        <div className="srow__preview">
          <FabricPreview />
        </div>
      </div>
    </div>
  );
}
