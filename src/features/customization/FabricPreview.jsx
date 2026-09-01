import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";
import { useTintedFabric } from "./useTintedFabric.js";

/* Two layers per GSM zone:
   - base:   full photo (charcoal mannequin + white backdrop) — NEVER tinted
   - fabric: true-alpha cut-out of the hijab only — the ONLY tinted layer   */
const ZONE_LAYERS = {
  ultralight: {
    base: "/assets/images/studio/hijab-ultralight.png",
    fabric: "/assets/images/studio/fabric-ultralight.png",
  },
  light: {
    base: "/assets/images/studio/hijab-light.png",
    fabric: "/assets/images/studio/fabric-light.png",
  },
  "all-season": {
    base: "/assets/images/studio/hijab-allseason.png",
    fabric: "/assets/images/studio/fabric-allseason.png",
  },
  medheavy: {
    base: "/assets/images/studio/hijab-medheavy.png",
    fabric: "/assets/images/studio/fabric-medheavy.png",
  },
  winter: {
    base: "/assets/images/studio/hijab-winter.png",
    fabric: "/assets/images/studio/fabric-winter.png",
  },
};

export default function FabricPreview() {
  const { gsm, shade, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);
  const layers = ZONE_LAYERS[zone.id];

  /* Per-pixel tint on a canvas — reproduces the exact hex, unlike a CSS
     sepia/hue-rotate chain which washes out saturated hues on white. */
  const tinted = useTintedFabric(layers.fabric, shade.hex);

  return (
    <div className="preview" data-component="studio-weight-preview">
      <div className="preview__stage" style={vars}>
        <div className="preview__cloth">
          {/* Untinted base: mannequin + backdrop */}
          <img
            className="preview__base"
            src={layers.base}
            key={`base-${zone.id}`}
            alt=""
            aria-hidden="true"
          />

          {/* Tinted layer: hijab fabric only */}
          <img
            className="preview__fabric"
            src={tinted || layers.fabric}
            key={`fabric-${zone.id}`}
            alt={`Hijab preview at ${gsm} GSM in shade ${shade.code} ${shade.name}`}
            style={{ opacity: vars["--fabric-opacity"] }}
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
