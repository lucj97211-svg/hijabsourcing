import React, { useMemo } from "react";
import { useCustomization } from "./CustomizationContext.jsx";

/* 5 reference images with their GSM anchor values */
const GSM_IMAGES = [
  { gsm: 60,  src: "/assets/images/studio/gsm/gsm-60.jpg",  label: "60 GSM — Ultra-light, sheer drape" },
  { gsm: 90,  src: "/assets/images/studio/gsm/gsm-90.jpg",  label: "90 GSM — Lightweight, airy feel" },
  { gsm: 105, src: "/assets/images/studio/gsm/gsm-105.jpg", label: "105 GSM — Light, soft body" },
  { gsm: 120, src: "/assets/images/studio/gsm/gsm-120.jpg", label: "120 GSM — All-season, balanced drape" },
  { gsm: 140, src: "/assets/images/studio/gsm/gsm-140.jpg", label: "140 GSM — Med-heavy, opaque" },
];

const GSM_MIN = 60;
const GSM_MAX = 140;
const GSM_STEP = 5;

/* Find the closest image anchor for the current GSM value */
function closestImage(gsm) {
  return GSM_IMAGES.reduce((best, img) =>
    Math.abs(img.gsm - gsm) < Math.abs(best.gsm - gsm) ? img : best
  );
}

export default function GsmSlider() {
  const { gsm, setGsm } = useCustomization();

  const active = useMemo(() => closestImage(gsm), [gsm]);

  /* Slider fill percentage for the green track */
  const pct = ((gsm - GSM_MIN) / (GSM_MAX - GSM_MIN)) * 100;

  return (
    <div className="studio-block studio-block--row" data-component="studio-gsm">
      {/* LEFT — label */}
      <div className="srow__label">
        <span className="mono studio-step">01 — Weight</span>
        <h3>Fabric weight</h3>
        <p className="muted studio-block__hint">
          Drag to set GSM. The fabric preview updates as the weight changes.
        </p>
      </div>

      {/* CENTRE — controls */}
      <div className="srow__content">
        <div className="srow__controls">
          {/* GSM readout */}
          <div className="gsm-readout">
            <span className="gsm-readout__value">{gsm}</span>
            <span className="gsm-readout__unit">GSM</span>
          </div>

          {/* Slider */}
          <div className="gsm-track-wrap">
            <input
              type="range"
              className="gsm-range"
              min={GSM_MIN}
              max={GSM_MAX}
              step={GSM_STEP}
              value={gsm}
              onChange={e => setGsm(Number(e.target.value))}
              aria-label="Fabric weight in GSM"
              style={{ '--gsm-pct': `${pct}%` }}
            />
          </div>

          {/* GSM tick markers */}
          <div className="gsm-ticks">
            {GSM_IMAGES.map(img => (
              <button
                key={img.gsm}
                className={`gsm-tick ${gsm === img.gsm ? "is-active" : ""}`}
                onClick={() => setGsm(img.gsm)}
                aria-label={`Set ${img.gsm} GSM`}
              >
                <span className="gsm-tick__val">{img.gsm}</span>
                <span className="gsm-tick__unit">GSM</span>
              </button>
            ))}
          </div>

          {/* Label for active zone */}
          <p className="mono gsm-zone-label">{active.label}</p>
        </div>

        {/* RIGHT — fabric preview image */}
        <div className="srow__preview">
          {GSM_IMAGES.map(img => (
            <img
              key={img.gsm}
              src={img.src}
              alt={img.label}
              className={`gsm-preview-img ${active.gsm === img.gsm ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
