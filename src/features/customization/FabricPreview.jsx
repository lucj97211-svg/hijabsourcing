import React from "react";
import { useCustomization } from "./CustomizationContext.jsx";
import { gsmStyleVars, gsmZone } from "./gsm.js";
import { relativeLuminance } from "./colorMath.js";

export default function FabricPreview() {
  const { gsm, shade, fabric } = useCustomization();
  const zone = gsmZone(gsm);
  const vars = gsmStyleVars(gsm);
  const light = relativeLuminance(shade.hex) > 0.86;

  return (
    <div className="preview" data-component="studio-weight-preview">
      <div
        className={`preview__stage ${light ? "is-lightshade" : ""}`}
        style={{ ...vars, "--shade": shade.hex }}
      >
        <div className="preview__grid" aria-hidden="true" />

        {/* Each layer is its own tinted unit: a cut-out hijab plus a colour
            wash masked to that same cut-out. Nothing outside the silhouette
            is ever painted, so the stage background stays neutral. */}
        <div className="preview__cloth">
          <span className="preview__piece preview__piece--base">
            <img
              className="preview__layer"
              src="/assets/images/studio/hijab-cut-1.png"
              alt={`Hijab preview at ${gsm} GSM in shade ${shade.code} ${shade.name}`}
            />
            <span className="preview__tint" aria-hidden="true" />
          </span>
          <span className="preview__piece preview__piece--drape2">
            <img
              className="preview__layer"
              src="/assets/images/studio/hijab-cut-2.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <span className="preview__tint preview__tint--2" aria-hidden="true" />
          </span>
          <span className="preview__piece preview__piece--drape3">
            <img
              className="preview__layer"
              src="/assets/images/studio/hijab-cut-3.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <span className="preview__tint preview__tint--3" aria-hidden="true" />
          </span>
          <span className="preview__grain" aria-hidden="true" />
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
