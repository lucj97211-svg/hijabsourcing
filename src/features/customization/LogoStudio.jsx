import React, { useEffect, useRef, useState } from "react";
import { CARRIERS } from "../../data/site.js";
import { useCustomization } from "./CustomizationContext.jsx";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ["image/png", "image/svg+xml", "image/jpeg", "image/webp"];

export default function LogoStudio() {
  const { logo, setLogo, carriers, toggleCarrier } = useCustomization();
  const [error, setError] = useState("");
  const [warn, setWarn] = useState("");
  const [dragging, setDragging] = useState(false);
  const [focusCarrier, setFocusCarrier] = useState(CARRIERS[0].id);
  const [scale, setScale] = useState(100);
  const [darkCarrier, setDarkCarrier] = useState(false);
  const inputRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    []
  );

  const accept = (file) => {
    setError("");
    setWarn("");
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      setError("That file type is not supported. Use PNG, SVG, JPG or WebP.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That file is over 5 MB. Please upload a smaller version.");
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;

    if (file.type !== "image/svg+xml") {
      const probe = new Image();
      probe.onload = () => {
        if (Math.max(probe.naturalWidth, probe.naturalHeight) < 600) {
          setWarn("Low resolution — fine for this preview, but we will ask for vector before sampling.");
        }
      };
      probe.src = url;
    }

    setLogo({ name: file.name, url, type: file.type });
  };

  const clear = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setLogo(null);
    setError("");
    setWarn("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const focused = CARRIERS.find((c) => c.id === focusCarrier) || CARRIERS[0];

  return (
    <div className="studio-block studio-block--row" data-component="studio-logo-uploader">
      {/* LEFT — label */}
      <div className="srow__label">
        <span className="mono studio-step">03 — Branding</span>
        <h3>Put your logo on it</h3>
        <p className="muted studio-block__hint">
          Upload your mark and see it placed on the label, packaging, hang tag, thank-you
          card and gift box. Everything runs in your browser.
        </p>
      </div>

      {/* RIGHT — upload + carrier preview */}
      <div className="srow__content">
        <div className="srow__controls">
          {!logo ? (
            <div
              className={`dropzone ${dragging ? "is-dragging" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files?.[0]); }}
            >
              <button type="button" className="btn btn--outline" onClick={() => inputRef.current?.click()}>
                Upload your logo
              </button>
              <p className="mono dropzone__hint">
                PNG or SVG · transparent background preferred · max 5 MB
              </p>
            </div>
          ) : (
            <div className="logo-loaded">
              <span className="logo-loaded__thumb">
                <img src={logo.url} alt={`Uploaded logo: ${logo.name}`} />
              </span>
              <span className="logo-loaded__meta">
                <span className="logo-loaded__name">{logo.name}</span>
                <span className="logo-loaded__actions">
                  <button type="button" className="linkish" onClick={() => inputRef.current?.click()}>Replace</button>
                  <button type="button" className="linkish" onClick={clear}>Remove</button>
                </span>
              </span>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept=".png,.svg,.jpg,.jpeg,.webp"
            onChange={(e) => accept(e.target.files?.[0])}
          />

          {error && <p className="field__error" role="alert">{error}</p>}
          {warn  && <p className="field__warn">{warn}</p>}

          <div className="carrier-block" data-component="studio-logo-carriers">
            <div className="carrier-toolbar">
              <span className="mono muted">Carriers</span>
              <ul className="carrier-picks">
                {CARRIERS.map((carrier) => {
                  const on = carriers.includes(carrier.id);
                  return (
                    <li key={carrier.id}>
                      <button
                        type="button"
                        className={`chip ${on ? "is-on" : ""}`}
                        aria-pressed={on}
                        onClick={() => { toggleCarrier(carrier.id); setFocusCarrier(carrier.id); }}
                      >
                        {carrier.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="carrier-controls">
              <label className="field field--inline">
                <span className="field__label">Logo scale</span>
                <input
                  type="range" min={60} max={140} step={5} value={scale}
                  className="gsm-range gsm-range--slim"
                  onChange={(e) => setScale(Number(e.target.value))}
                  style={{ "--range-pct": `${((scale - 60) / 80) * 100}%` }}
                />
                <span className="mono">{scale}%</span>
              </label>
              <button
                type="button"
                className={`chip ${darkCarrier ? "is-on" : ""}`}
                aria-pressed={darkCarrier}
                onClick={() => setDarkCarrier((v) => !v)}
              >
                {darkCarrier ? "Dark carrier" : "Light carrier"}
              </button>
            </div>

            <ul className="carrier-thumbs">
              {CARRIERS.map((carrier) => (
                <li key={carrier.id}>
                  <button
                    type="button"
                    className={`carrier-thumb ${focusCarrier === carrier.id ? "is-active" : ""}`}
                    aria-pressed={focusCarrier === carrier.id}
                    onClick={() => setFocusCarrier(carrier.id)}
                  >
                    <CarrierTile carrier={carrier} logo={logo} scale={scale} dark={darkCarrier} />
                    <span className="mono carrier-thumb__label">{carrier.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="mono muted carrier-note">
              Preview only — we send a physical sample for approval before anything is produced.
            </p>
          </div>
        </div>

        {/* Large carrier preview on the right */}
        <div className="srow__preview srow__preview--carrier">
          <CarrierTile carrier={focused} logo={logo} scale={scale} dark={darkCarrier} large />
        </div>
      </div>
    </div>
  );
}

function CarrierTile({ carrier, logo, scale, dark, large = false }) {
  const { rect } = carrier;
  const s = scale / 100;
  const clamp01 = (n) => Math.min(100, Math.max(0, n));
  const w = Math.min(rect.w * s, 96);
  const h = Math.min(rect.h * s, 96);
  const x = clamp01(Math.min(rect.x + (rect.w - w) / 2, 100 - w));
  const y = clamp01(Math.min(rect.y + (rect.h - h) / 2, 100 - h));

  return (
    <span
      className={`carrier-tile ${large ? "carrier-tile--large" : ""}`}
      data-component="studio-carrier-tile"
    >
      <span className="carrier-tile__frame">
        <img
          className="carrier-tile__base"
          src={carrier.image}
          alt={`${carrier.label} — blank base`}
          loading="lazy"
        />
        <span
          className="carrier-tile__zone"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${w}%`,
            height: `${h}%`,
            transform: `rotate(${rect.rotate}deg)`,
          }}
        >
          {logo ? (
            <img
              className="carrier-tile__logo"
              src={logo.url}
              alt=""
              style={{
                mixBlendMode: dark ? "screen" : carrier.blend,
                opacity: carrier.opacity,
                filter: carrier.filter,
              }}
            />
          ) : (
            large && <span className="mono carrier-tile__placeholder">Logo area</span>
          )}
        </span>
      </span>
      {large && <span className="mono carrier-tile__caption">{carrier.caption}</span>}
    </span>
  );
}
