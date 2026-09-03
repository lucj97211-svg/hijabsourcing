import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";

const ZONE_IMAGE = {
  ultralight:   "/assets/images/studio/weight-ultralight.png",
  light:        "/assets/images/studio/weight-light.png",
  "all-season": "/assets/images/studio/weight-allseason.png",
  medheavy:     "/assets/images/studio/weight-medheavy.png",
  winter:       "/assets/images/studio/weight-winter.png",
};

/* Full-bleed drape image — fills the srow__preview column edge-to-edge */
export function FabricDrape() {
  const { gsm, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);

  return (
    <div className="preview__drape-wrap" style={vars}>
      <img
        className="preview__drape"
        src={ZONE_IMAGE[zone.id]}
        key={zone.id}
        alt={`${fabric.name} draped at ${gsm} GSM — ${zone.label.toLowerCase()} weight`}
      />
    </div>
  );
}

/* Spec table — rendered inside srow__controls, below the slider */
export function FabricSpecs() {
  const { gsm, fabric } = useCustomization();
  const zone = gsmZone(gsm);

  return (
    <dl className="preview__specs mono">
      <div><dt>Base</dt><dd>{fabric.name}</dd></div>
      <div><dt>Weight</dt><dd>{gsm} GSM</dd></div>
      <div><dt>Drape</dt><dd>{zone.drape}</dd></div>
      <div><dt>Opacity</dt><dd>{zone.opacity}</dd></div>
    </dl>
  );
}

/* Legacy default export — kept for any future standalone use */
export default function FabricPreview() {
  return (
    <div className="preview" data-component="studio-weight-preview">
      <FabricDrape />
      <FabricSpecs />
    </div>
  );
}
