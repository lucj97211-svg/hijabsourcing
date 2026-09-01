import React, { useCallback, useEffect, useRef, useState } from "react";
import { SHADES } from "../../data/site.js";
import { useCustomization } from "./CustomizationContext.jsx";
import { clamp, hexToHsv, hsvToHex, isValidHex, normalizeHex } from "./colorMath.js";

export default function ShadeStudio() {
  const { shade, setShade, setCustomShade } = useCustomization();
  const [hsv, setHsv] = useState(() => hexToHsv(shade.hex) || { h: 143, s: 0.37, v: 0.54 });
  const [hexDraft, setHexDraft] = useState(shade.hex);
  const [hexTouched, setHexTouched] = useState(false);
  const [hexError, setHexError] = useState("");
  const svRef = useRef(null);
  const hueRef = useRef(null);

  // Keep local HSV + hex draft in sync when a swatch sets the shade externally.
  useEffect(() => {
    const next = hexToHsv(shade.hex);
    if (next) setHsv(next);
    setHexDraft(shade.hex);
    setHexError("");
  }, [shade.hex]);

  const applyHsv = useCallback(
    (next) => {
      setHsv(next);
      setCustomShade(hsvToHex(next.h, next.s, next.v));
    },
    [setCustomShade]
  );

  const pointerFromEvent = (el, event) => {
    const rect = el.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
    };
  };

  const startSvDrag = (event) => {
    const el = svRef.current;
    if (!el) return;
    el.setPointerCapture?.(event.pointerId);
    const move = (ev) => {
      const p = pointerFromEvent(el, ev);
      applyHsv({ ...hsv, s: p.x, v: 1 - p.y });
    };
    move(event);
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  const startHueDrag = (event) => {
    const el = hueRef.current;
    if (!el) return;
    el.setPointerCapture?.(event.pointerId);
    const move = (ev) => {
      const rect = el.getBoundingClientRect();
      const horizontal = rect.width > rect.height;
      const ratio = horizontal
        ? clamp((ev.clientX - rect.left) / rect.width, 0, 1)
        : clamp((ev.clientY - rect.top) / rect.height, 0, 1);
      applyHsv({ ...hsv, h: ratio * 360 });
    };
    move(event);
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  const onSvKey = (event) => {
    const step = event.shiftKey ? 0.1 : 0.01;
    let { s, v } = hsv;
    if (event.key === "ArrowRight") s = clamp(s + step, 0, 1);
    else if (event.key === "ArrowLeft") s = clamp(s - step, 0, 1);
    else if (event.key === "ArrowUp") v = clamp(v + step, 0, 1);
    else if (event.key === "ArrowDown") v = clamp(v - step, 0, 1);
    else return;
    event.preventDefault();
    applyHsv({ ...hsv, s, v });
  };

  const onHueKey = (event) => {
    const step = event.shiftKey ? 10 : 1;
    let h = hsv.h;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") h = (h + step) % 360;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") h = (h - step + 360) % 360;
    else return;
    event.preventDefault();
    applyHsv({ ...hsv, h });
  };

  const commitHex = () => {
    setHexTouched(true);
    if (!isValidHex(hexDraft)) {
      setHexError("Enter a 6-digit hex value, for example 56896A.");
      return;
    }
    const normalized = normalizeHex(hexDraft);
    setHexError("");
    setCustomShade(normalized);
  };

  const onHexChange = (event) => {
    const raw = event.target.value;
    setHexDraft(raw);
    if (hexTouched && isValidHex(raw)) {
      setHexError("");
      setCustomShade(normalizeHex(raw));
    }
  };

  const hueHex = hsvToHex(hsv.h, 1, 1);

  return (
    <div className="studio-block" data-component="studio-shade-studio">
      <div className="studio-block__head">
        <span className="mono studio-step">02 — Shade</span>
        <h3>Match the colour</h3>
        <p className="muted studio-block__hint">
          Pick from our mill shades or dial in any colour. We match it on a physical lab dip before
          bulk — screen colour is only a starting point.
        </p>
      </div>

      <div className="picker">
        <div
          ref={svRef}
          className="picker__sv"
          role="slider"
          tabIndex={0}
          aria-label="Colour saturation and brightness"
          aria-valuetext={`Saturation ${Math.round(hsv.s * 100)} percent, brightness ${Math.round(
            hsv.v * 100
          )} percent`}
          aria-valuenow={Math.round(hsv.s * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          onPointerDown={startSvDrag}
          onKeyDown={onSvKey}
          style={{ background: hueHex }}
        >
          <span className="picker__sv-white" aria-hidden="true" />
          <span className="picker__sv-black" aria-hidden="true" />
          <span
            className="picker__cursor"
            aria-hidden="true"
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
          />
        </div>

        <div
          ref={hueRef}
          className="picker__hue"
          role="slider"
          tabIndex={0}
          aria-label="Hue"
          aria-valuenow={Math.round(hsv.h)}
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuetext={`Hue ${Math.round(hsv.h)} degrees`}
          onPointerDown={startHueDrag}
          onKeyDown={onHueKey}
        >
          <span
            className="picker__hue-cursor"
            aria-hidden="true"
            style={{ "--hue-pos": `${(hsv.h / 360) * 100}%` }}
          />
        </div>

        <div className="picker__readout">
          <div className="picker__chip" style={{ background: shade.hex }} aria-hidden="true" />
          <div className="picker__fields">
            <label className="field">
              <span className="field__label">Hex</span>
              <input
                className="field__input mono"
                type="text"
                inputMode="text"
                spellCheck="false"
                value={hexDraft}
                onChange={onHexChange}
                onBlur={commitHex}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitHex();
                  }
                }}
                aria-invalid={hexError ? "true" : "false"}
                aria-describedby={hexError ? "hex-error" : undefined}
              />
            </label>
            {hexError && (
              <p className="field__error" id="hex-error" role="alert">
                {hexError}
              </p>
            )}
            <dl className="picker__hsb mono">
              <div>
                <dt>H</dt>
                <dd>{Math.round(hsv.h)}°</dd>
              </div>
              <div>
                <dt>S</dt>
                <dd>{Math.round(hsv.s * 100)}%</dd>
              </div>
              <div>
                <dt>B</dt>
                <dd>{Math.round(hsv.v * 100)}%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <p className="sr-only" role="status">
        Shade set to {shade.hex}, {shade.name}.
      </p>

      <div className="swatch-block" data-component="studio-shade-swatches">
        <span className="mono muted swatch-block__title">Mill shades</span>
        <ul className="swatch-row">
          {SHADES.map((s) => {
            const selected = s.hex.toUpperCase() === shade.hex.toUpperCase();
            return (
              <li key={s.code}>
                <button
                  type="button"
                  className={`swatch ${selected ? "is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setShade({ ...s })}
                  title={`${s.code} ${s.name}`}
                >
                  <span className="swatch__dot" style={{ background: s.hex }} aria-hidden="true" />
                  <span className="mono swatch__code">{s.code}</span>
                  <span className="mono swatch__name">{s.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mono muted swatch-block__note">
          In-house shade codes. Send a physical swatch or any colour reference and we will match it.
        </p>
      </div>
    </div>
  );
}
