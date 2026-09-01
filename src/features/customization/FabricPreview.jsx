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

        <div className="preview__cloth">
          <img
            className="preview__layer preview__layer--base"
            src="/assets/images/studio/hijab-base-neutral.jpg"
            alt={`Hijab preview at ${gsm} GSM in shade ${shade.code} ${shade.name}`}
          />
          <img
            className="preview__layer preview__layer--drape2"
            src="/assets/images/studio/hijab-base-drape-2.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <img
            className="preview__layer preview__layer--drape3"
            src="/assets/images/studio/hijab-base-drape-3.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <span className="preview__tint" aria-hidden="true" />
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
