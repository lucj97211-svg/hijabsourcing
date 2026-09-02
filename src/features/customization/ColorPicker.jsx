import React, { useRef, useState, useCallback } from "react";
import { useCustomization } from "./CustomizationContext.jsx";

/* ── Pantone-inspired colour library ───────────────────────────────
   Colours are grouped by family. Each swatch has a Pantone-style
   code, a display name, and the closest printable hex.
   These are representative colour references — actual production
   shades are confirmed via physical lab dip. */
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

const ALL_SWATCHES = FAMILIES.flatMap((f) => f.swatches);

export default function ColorPicker() {
  const { shade, setShade } = useCustomization();
  const [activeFamily, setActiveFamily] = useState("neutrals");
  const swatchesRef = useRef(null);

  const family = FAMILIES.find((f) => f.id === activeFamily) || FAMILIES[0];

  const select = useCallback(
    (swatch) => {
      if (shade && shade.code === swatch.code) {
        setShade(null); // deselect = natural
      } else {
        setShade(swatch);
      }
    },
    [shade, setShade]
  );

  /* Drag-scroll the swatch strip horizontally */
  const dragState = useRef({ dragging: false, startX: 0, scrollX: 0 });
  const onMouseDown = (e) => {
    dragState.current = { dragging: true, startX: e.clientX, scrollX: swatchesRef.current.scrollLeft };
    swatchesRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    swatchesRef.current.scrollLeft = dragState.current.scrollX - dx;
  };
  const onMouseUp = () => {
    dragState.current.dragging = false;
    if (swatchesRef.current) swatchesRef.current.style.cursor = "";
  };

  return (
    <div className="studio-block color-picker" data-component="studio-color-picker">
      <div className="studio-block__head">
        <span className="mono studio-step">02 — Colour</span>
        <h3>Choose a shade</h3>
        <p className="muted studio-block__hint">
          Select a Pantone reference. The preview updates live — final shades are confirmed
          via physical lab dip before bulk production.
        </p>
      </div>

      {/* Family tabs */}
      <div className="color-families" role="tablist" aria-label="Colour families">
        {FAMILIES.map((fam) => (
          <button
            key={fam.id}
            role="tab"
            aria-selected={fam.id === activeFamily}
            className={`color-family-tab ${fam.id === activeFamily ? "is-active" : ""}`}
            onClick={() => setActiveFamily(fam.id)}
          >
            {fam.label}
          </button>
        ))}
      </div>

      {/* Swatch strip — drag-scrollable */}
      <div
        ref={swatchesRef}
        className="color-swatches"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        role="group"
        aria-label={`${family.label} swatches`}
      >
        {family.swatches.map((sw) => {
          const isSelected = shade?.code === sw.code;
          return (
            <button
              key={sw.code}
              className={`color-swatch ${isSelected ? "is-selected" : ""}`}
              style={{ "--sw-hex": sw.hex }}
              onClick={() => select(sw)}
              aria-pressed={isSelected}
              title={`${sw.name} (${sw.code})`}
            >
              <span className="sr-only">{sw.name} — {sw.code}</span>
            </button>
          );
        })}
      </div>

      {/* Selected info or prompt */}
      <div className="color-readout" aria-live="polite">
        {shade ? (
          <>
            <span
              className="color-readout__dot"
              style={{ background: shade.hex }}
              aria-hidden="true"
            />
            <span className="color-readout__code mono">{shade.code}</span>
            <span className="color-readout__name">{shade.name}</span>
            <button
              className="color-readout__clear linkish"
              onClick={() => setShade(null)}
              aria-label="Clear colour selection"
            >
              Clear
            </button>
          </>
        ) : (
          <span className="color-readout__prompt muted">
            No colour selected — tap a swatch to preview
          </span>
        )}
      </div>
    </div>
  );
}
