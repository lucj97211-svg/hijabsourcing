import React, { useMemo } from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";
import { hexToImgFilter } from "./colorMath.js";

/* Two layers per GSM zone:
   - base:   full photo (mannequin + backdrop) — NEVER tinted
   - fabric: transparent cut-out of the hijab only — the ONLY tinted layer   */
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

  /* Colour filter — applied ONLY to the transparent fabric cut-out, so the
     mannequin and backdrop underneath keep their original colour. */
  const fabricFilter = useMemo(() => hexToImgFilter(shade.hex), [shade.hex]);

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
            src={layers.fabric}
            key={`fabric-${zone.id}`}
            alt={`Hijab preview at ${gsm} GSM in shade ${shade.code} ${shade.name}`}
            style={{
              filter: fabricFilter,
              opacity: vars["--fabric-opacity"],
            }}
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
        <div>
          <dt>Shade</dt>
          <dd>
            {shade.code} {shade.hex}
          </dd>
        </div>
      </dl>
    </div>
  );
}
