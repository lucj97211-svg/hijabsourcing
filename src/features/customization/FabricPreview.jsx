import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";

const ZONE_IMAGE = {
  ultralight: "/assets/images/studio/weight-ultralight.png",
  light: "/assets/images/studio/weight-light.png",
  "all-season": "/assets/images/studio/weight-allseason.png",
  medheavy: "/assets/images/studio/weight-medheavy.png",
  winter: "/assets/images/studio/weight-winter.png",
};

export default function FabricPreview() {
  const { gsm, fabric, shade } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);

  return (
    <div className="preview" data-component="studio-weight-preview">
      <div className="preview__stage" style={vars}>
        <div className="preview__cloth">
          {/* Base fabric drape photo — always shown */}
          <img
            className="preview__drape"
            src={ZONE_IMAGE[zone.id]}
            key={zone.id}
            alt={`${fabric.name} draped at ${gsm} GSM — ${zone.label.toLowerCase()} weight`}
          />
          {/* Colour overlay using multiply blend — sits over fabric, preserves drape */}
          {shade && (
            <div
              className="preview__tint"
              style={{ "--tint-color": shade.hex }}
              aria-hidden="true"
            />
          )}
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
          <dt>Shade</dt>
          <dd>
            {shade ? (
              <span className="preview__shade-chip">
                <span
                  className="preview__shade-dot"
                  style={{ background: shade.hex }}
                  aria-hidden="true"
                />
                {shade.code}
              </span>
            ) : (
              "Natural"
            )}
          </dd>
        </div>
        <div>
          <dt>Drape</dt>
          <dd>{zone.drape}</dd>
        </div>
      </dl>
    </div>
  );
}
