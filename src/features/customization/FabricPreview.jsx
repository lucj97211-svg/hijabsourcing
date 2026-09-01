import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";

/* One photo per GSM zone. Each frame is the same length of cloth over the same
   rod, shot identically — only the drape changes, so stepping through the
   slider reads as the fabric getting heavier. */
const ZONE_IMAGE = {
  ultralight: "/assets/images/studio/weight-ultralight.png",
  light: "/assets/images/studio/weight-light.png",
  "all-season": "/assets/images/studio/weight-allseason.png",
  medheavy: "/assets/images/studio/weight-medheavy.png",
  winter: "/assets/images/studio/weight-winter.png",
};

export default function FabricPreview() {
  const { gsm, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);

  return (
    <div className="preview" data-component="studio-weight-preview">
      <div className="preview__stage" style={vars}>
        <div className="preview__cloth">
          <img
            className="preview__drape"
            src={ZONE_IMAGE[zone.id]}
            key={zone.id}
            alt={`${fabric.name} draped at ${gsm} GSM — ${zone.label.toLowerCase()} weight`}
          />
        </div>
      </div>

      <dl className="preview__specs mono">
        <div>
          <dt>Base</dt>
          <dd>{fabric.name}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>{gsm} GSM</dd>
        </div>
        <div>
          <dt>Drape</dt>
          <dd>{zone.drape}</dd>
        </div>
        <div>
          <dt>Opacity</dt>
          <dd>{zone.opacity}</dd>
        </div>
      </dl>
    </div>
  );
}
