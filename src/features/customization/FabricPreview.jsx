import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";
import { relativeLuminance } from "./colorMath.js";

const ZONE_IMAGE = {
  light: "/assets/images/studio/hijab-cut-1.png",
  "all-season": "/assets/images/studio/hijab-cut-2.png",
  winter: "/assets/images/studio/hijab-cut-3.png",
};

export default function FabricPreview() {
  const { gsm, shade, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);
  const light = relativeLuminance(shade.hex) > 0.86;
  const imgSrc = ZONE_IMAGE[zone.id];

  return (
    <div className="preview" data-component="studio-weight-preview">
      <div
        className={`preview__stage ${light ? "is-lightshade" : ""}`}
        style={{ ...vars, "--shade": shade.hex }}
      >
        <div className="preview__grid" aria-hidden="true" />

        <div className="preview__cloth">
          {/* Base hijab image — swaps by GSM zone */}
          <span
            className="preview__piece preview__piece--base"
            style={{ "--zone-img": `url("${imgSrc}")` }}
          >
            <img
              className="preview__layer"
              src={imgSrc}
              alt={`Hijab preview at ${gsm} GSM in shade ${shade.code} ${shade.name}`}
              key={zone.id}
            />
            {/* Colour wash masked to exactly this image's silhouette */}
            <span
              className="preview__tint"
              aria-hidden="true"
              style={{
                WebkitMaskImage: `url("${imgSrc}")`,
                maskImage: `url("${imgSrc}")`,
              }}
            />
          </span>

          {/* Fabric grain texture, also masked to the active image */}
          <span
            className="preview__grain"
            aria-hidden="true"
            style={{
              WebkitMaskImage: `url("${imgSrc}")`,
              maskImage: `url("${imgSrc}")`,
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
