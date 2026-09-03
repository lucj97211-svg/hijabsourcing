import React, { useRef, useState, useCallback, useEffect } from "react";
import { useCustomization } from "./CustomizationContext.jsx";

/* ── Pantone-inspired colour library ────────────────────────────── */
const FAMILIES = [
  {
    id: "neutrals",
    label: "Neutrals",
    swatches: [
      { code: "11-0601", name: "Blanc de Blanc", hex: "#F5F2EC" },
      { code: "11-0105", name: "Coconut Milk",   hex: "#EDE9DF" },
      { code: "12-0104", name: "Antique White",  hex: "#E8E0D0" },
      { code: "13-0002", name: "Oatmeal",        hex: "#D8CEBC" },
      { code: "14-4102", name: "Silver Lining",  hex: "#C4BDB3" },
      { code: "15-3800", name: "Warm Taupe",     hex: "#B0A598" },
      { code: "16-0906", name: "Doeskin",        hex: "#9C8F84" },
      { code: "17-0808", name: "Driftwood",      hex: "#8A7D72" },
      { code: "18-1107", name: "Warm Stone",     hex: "#7A6E65" },
      { code: "19-0303", name: "Charcoal",       hex: "#4A4540" },
    ],
  },
  {
    id: "blush",
    label: "Blush & Rose",
    swatches: [
      { code: "11-1408", name: "Rosewater",      hex: "#F5E0D8" },
      { code: "13-2007", name: "Ballet Pink",    hex: "#F2CAC0" },
      { code: "14-1714", name: "Crystal Rose",   hex: "#F0B8AA" },
      { code: "15-1717", name: "Peach Amber",    hex: "#E8A090" },
      { code: "16-1620", name: "Rosette",        hex: "#D98070" },
      { code: "17-1635", name: "Dusty Rose",     hex: "#C26A5E" },
      { code: "18-1630", name: "Terra Cotta",    hex: "#B05A4A" },
      { code: "19-1557", name: "Burnt Sienna",   hex: "#8C3C2E" },
      { code: "19-1664", name: "Chili Pepper",   hex: "#7A2820" },
      { code: "19-1757", name: "Cayenne",        hex: "#6C1E16" },
    ],
  },
  {
    id: "earth",
    label: "Earth & Sand",
    swatches: [
      { code: "12-0712", name: "Vanilla Custard", hex: "#F5E8C0" },
      { code: "13-0916", name: "Sand Dollar",     hex: "#EDD9A3" },
      { code: "14-1118", name: "Apricot Nectar",  hex: "#E8C080" },
      { code: "15-1145", name: "Amber Gold",      hex: "#D4A055" },
      { code: "16-1142", name: "Nugget",          hex: "#C08040" },
      { code: "17-1040", name: "Autumn Maple",    hex: "#A86030" },
      { code: "18-1142", name: "Caramel",         hex: "#904A20" },
      { code: "18-1048", name: "Adobe",           hex: "#7C3A18" },
      { code: "19-1127", name: "Brown Sugar",     hex: "#6A2E14" },
      { code: "19-1217", name: "Dark Mahogany",   hex: "#502010" },
    ],
  },
  {
    id: "green",
    label: "Sage & Green",
    swatches: [
      { code: "12-0108", name: "Seafoam Green",   hex: "#D8EAD0" },
      { code: "13-0116", name: "Pistachio",       hex: "#BCD8A0" },
      { code: "15-0336", name: "Jade Lime",       hex: "#90C060" },
      { code: "16-0430", name: "Fern",            hex: "#78A848" },
      { code: "17-0340", name: "Grass Green",     hex: "#5A9030" },
      { code: "17-0535", name: "Foliage",         hex: "#4A7828" },
      { code: "18-0430", name: "Forest",          hex: "#3A6020" },
      { code: "16-0416", name: "Sea Spray",       hex: "#9AB890" },
      { code: "17-0316", name: "Sage",            hex: "#7A9870" },
      { code: "18-0317", name: "Laurel Wreath",   hex: "#5A7858" },
    ],
  },
  {
    id: "teal",
    label: "Teal & Blue",
    swatches: [
      { code: "13-4308", name: "Baby Blue",       hex: "#C8DCE8" },
      { code: "14-4318", name: "Sky Blue",        hex: "#A0C4D8" },
      { code: "15-4427", name: "Cerulean",        hex: "#70A8C8" },
      { code: "17-4328", name: "Niagara",         hex: "#5090B0" },
      { code: "18-4528", name: "Blue Sapphire",   hex: "#386890" },
      { code: "19-4241", name: "Moroccan Blue",   hex: "#285070" },
      { code: "16-5127", name: "Aqua Glass",      hex: "#78C0B8" },
      { code: "17-5029", name: "Biscay Bay",      hex: "#3898A0" },
      { code: "18-5020", name: "Deep Teal",       hex: "#286870" },
      { code: "19-4526", name: "Reflecting Pond", hex: "#204858" },
    ],
  },
  {
    id: "purple",
    label: "Mauve & Purple",
    swatches: [
      { code: "13-3405", name: "Lavender Mist",   hex: "#DED0E0" },
      { code: "15-3508", name: "Orchid Haze",     hex: "#C8A8C8" },
      { code: "16-3520", name: "Crocus",          hex: "#B080B8" },
      { code: "17-3628", name: "Violet Tulip",    hex: "#9060A0" },
      { code: "18-3633", name: "Ultra Violet",    hex: "#704888" },
      { code: "19-3536", name: "Deep Lavender",   hex: "#503068" },
      { code: "17-1708", name: "Dusty Mauve",     hex: "#B89090" },
      { code: "18-1612", name: "Woodrose",        hex: "#907878" },
      { code: "18-1703", name: "Quail",           hex: "#806868" },
      { code: "19-1606", name: "Plum Truffle",    hex: "#604848" },
    ],
  },
  {
    id: "dark",
    label: "Navy & Dark",
    swatches: [
      { code: "19-3911", name: "Pewter",          hex: "#585860" },
      { code: "19-3906", name: "Quiet Shade",     hex: "#484850" },
      { code: "19-3832", name: "Navy Peony",      hex: "#283060" },
      { code: "19-3830", name: "Blueprint",       hex: "#202858" },
      { code: "19-4024", name: "Dark Navy",       hex: "#181C40" },
      { code: "19-0000", name: "Jet Black",       hex: "#1A1818" },
      { code: "19-4005", name: "Anthracite",      hex: "#303030" },
      { code: "19-3906", name: "Ebony",           hex: "#2C2828" },
      { code: "19-3803", name: "Dark Chocolate",  hex: "#2A1E18" },
      { code: "19-4010", name: "Slate",           hex: "#404048" },
    ],
  },
];

/* Parse "#RRGGBB" → [r, g, b] in 0-255 range */
function hexToRgb255(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/*
  Render the hijab image onto a canvas, recolouring only the hijab
  pixels while leaving background pixels untouched.

  Algorithm (pixel-level):
  - Compute luminance L = 0.299R + 0.587G + 0.114B  (0-255)
  - Background pixels: L > BG_THRESH (near-white) → write original pixel unchanged
  - Hijab pixels: L ≤ BG_THRESH → remap to target hue:
      outR = targetR * (L / MID_L)
      outG = targetG * (L / MID_L)
      outB = targetB * (L / MID_L)
    where MID_L is the median hijab luminance (calibrated to the source image).
    This preserves the fold/shadow structure while applying the chosen colour.
  - Alpha channel is always preserved unchanged.
*/
const BG_THRESH = 210;   // pixels brighter than this are background
const MID_L     = 175;   // reference luminance for the mid-tone hijab area

function applyShade(srcCanvas, dstCanvas, targetHex) {
  const ctx = srcCanvas.getContext("2d");
  const dstCtx = dstCanvas.getContext("2d");
  const { width, height } = srcCanvas;
  dstCanvas.width  = width;
  dstCanvas.height = height;

  const src = ctx.getImageData(0, 0, width, height);
  const dst = dstCtx.createImageData(width, height);
  const d = src.data;
  const o = dst.data;

  const [tR, tG, tB] = targetHex ? hexToRgb255(targetHex) : [null, null, null];

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (!tR || lum > BG_THRESH) {
      // Background or no colour selected — write through unchanged
      o[i] = r; o[i+1] = g; o[i+2] = b; o[i+3] = a;
    } else {
      // Hijab pixel — recolour preserving luminance structure
      const ratio = lum / MID_L;
      o[i]   = Math.min(255, Math.round(tR * ratio));
      o[i+1] = Math.min(255, Math.round(tG * ratio));
      o[i+2] = Math.min(255, Math.round(tB * ratio));
      o[i+3] = a;
    }
  }
  dstCtx.putImageData(dst, 0, 0);
}

/* ── Component ───────────────────────────────────────────────────── */

export default function ColorPicker() {
  const { shade, setShade } = useCustomization();
  const [activeFamily, setActiveFamily] = useState("neutrals");
  const swatchesRef = useRef(null);

  // Two canvases: source (hidden, holds original pixels) + display
  const srcCanvasRef = useRef(null);
  const dstCanvasRef = useRef(null);
  const imgLoadedRef = useRef(false);

  const family = FAMILIES.find((f) => f.id === activeFamily) || FAMILIES[0];

  /* Load source image once into the hidden canvas */
  useEffect(() => {
    const src = srcCanvasRef.current;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/assets/images/studio/color-base.png";
    img.onload = () => {
      src.width  = img.naturalWidth;
      src.height = img.naturalHeight;
      src.getContext("2d").drawImage(img, 0, 0);
      imgLoadedRef.current = true;
      // Render initial state
      applyShade(src, dstCanvasRef.current, shade?.hex ?? null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Re-render whenever shade changes */
  useEffect(() => {
    if (!imgLoadedRef.current) return;
    applyShade(srcCanvasRef.current, dstCanvasRef.current, shade?.hex ?? null);
  }, [shade]);

  const select = useCallback(
    (sw) => setShade(shade?.code === sw.code ? null : sw),
    [shade, setShade]
  );

  /* Drag-scroll */
  const drag = useRef({ on: false, x0: 0, sl0: 0 });
  const onMD = (e) => {
    drag.current = { on: true, x0: e.clientX, sl0: swatchesRef.current.scrollLeft };
    swatchesRef.current.style.cursor = "grabbing";
  };
  const onMM = (e) => {
    if (!drag.current.on) return;
    swatchesRef.current.scrollLeft = drag.current.sl0 - (e.clientX - drag.current.x0);
  };
  const onMU = () => {
    drag.current.on = false;
    if (swatchesRef.current) swatchesRef.current.style.cursor = "";
  };

  return (
    <div className="studio-block color-picker" data-component="studio-color-picker">
      <div className="studio-block__head">
        <span className="mono studio-step">02 — Colour</span>
        <h3>Choose a shade</h3>
        <p className="muted studio-block__hint">
          Select a Pantone reference. The preview updates live — actual shades are confirmed
          via physical lab dip before bulk production.
        </p>
      </div>

      {/* Hidden source canvas — never rendered visibly */}
      <canvas ref={srcCanvasRef} style={{ display: "none" }} aria-hidden="true" />

      {/* ── Layout: controls left, preview right ── */}
      <div className="cp-layout">

        {/* LEFT: tabs + swatches + readout */}
        <div className="cp-controls">
          <div className="color-families" role="tablist" aria-label="Colour families">
            {FAMILIES.map((fam) => (
              <button
                key={fam.id}
                role="tab"
                aria-selected={fam.id === activeFamily}
                className={`color-family-tab${fam.id === activeFamily ? " is-active" : ""}`}
                onClick={() => setActiveFamily(fam.id)}
              >
                {fam.label}
              </button>
            ))}
          </div>

          <div
            ref={swatchesRef}
            className="color-swatches"
            onMouseDown={onMD}
            onMouseMove={onMM}
            onMouseUp={onMU}
            onMouseLeave={onMU}
            role="group"
            aria-label={`${family.label} swatches`}
          >
            {family.swatches.map((sw) => {
              const sel = shade?.code === sw.code;
              return (
                <button
                  key={sw.code}
                  className={`color-swatch${sel ? " is-selected" : ""}`}
                  style={{ "--sw-hex": sw.hex }}
                  onClick={() => select(sw)}
                  aria-pressed={sel}
                  title={`${sw.name} · ${sw.code}`}
                >
                  <span className="sr-only">{sw.name} — {sw.code}</span>
                </button>
              );
            })}
          </div>

          <div className="color-readout" aria-live="polite">
            {shade ? (
              <>
                <span className="color-readout__dot" style={{ background: shade.hex }} aria-hidden="true" />
                <span className="color-readout__code mono">{shade.code}</span>
                <span className="color-readout__name">{shade.name}</span>
                <button className="color-readout__clear linkish" onClick={() => setShade(null)}>
                  Clear
                </button>
              </>
            ) : (
              <span className="color-readout__prompt muted">
                Select a swatch to preview the shade
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: canvas colour preview */}
        <div className="cp-preview" aria-label="Colour preview">
          <div className="cp-preview__stage">
            <canvas
              ref={dstCanvasRef}
              className="cp-preview__canvas"
              aria-label={shade ? `Hijab preview in ${shade.name}` : "Hijab preview in natural colour"}
            />
          </div>
          <p className="cp-preview__label mono">
            {shade ? `${shade.code} · ${shade.name}` : "Natural — select a shade above"}
          </p>
        </div>
      </div>
    </div>
  );
}
