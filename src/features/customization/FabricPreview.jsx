import React, { useMemo } from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";
import { hexToImgFilter } from "./colorMath.js";

/* One image per GSM zone — swap as the slider crosses zone boundaries. */
const ZONE_IMAGE = {
  ultralight: "/assets/images/studio/hijab-ultralight.png",
  light: "/assets/images/studio/hijab-light.png",
  "all-season": "/assets/images/studio/hijab-allseason.png",
  medheavy: "/assets/images/studio/hijab-medheavy.png",
  winter: "/assets/images/studio/hijab-winter.png",
};

export default function FabricPreview() {
  const { gsm, shade, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);
  const imgSrc = ZONE_IMAGE[zone.id];

  /* CSS filter applied directly to the <img> — the stage background and every
     other element in the DOM are completely unaffected. */
  const colourFilter = useMemo(() => hexToImgFilter(shade.hex), [shade.hex]);

  /* Combine colour tint with per-GSM contrast/saturate tweaks.
     filter is applied to the img itself so it never bleeds outside. */
  const imgFilter = [
    colourFilter,
    `saturate(var(--fabric-saturate, 1))`,
    `contrast(var(--fabric-contrast, 1))`,
  ].join(" ");

  return (
    <div className="preview" data-component="studio-weight-preview">
      <div className="preview__stage" style={vars}>
        <div className="preview__cloth">
          <img
            className="preview__hijab"
            src={imgSrc}
            key={zone.id}
            alt={`Hijab preview at ${gsm} GSM in shade ${shade.code} ${shade.name}`}
            style={{
              filter: imgFilter,
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
