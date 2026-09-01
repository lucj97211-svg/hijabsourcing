import { clamp } from "./colorMath.js";

export const GSM_MIN = 60;
export const GSM_MAX = 240;
export const GSM_STEP = 5;

/** Normalised position in the weight band, 0..1 */
export function gsmT(gsm) {
  return clamp((gsm - GSM_MIN) / (GSM_MAX - GSM_MIN), 0, 1);
}

export function gsmZone(gsm) {
  if (gsm < 110) {
    return {
      id: "light",
      label: "Light",
      note: "Light weight — airy and semi-sheer, falls close to the head.",
      drape: "Soft",
      opacity: "Semi-sheer",
    };
  }
  if (gsm <= 170) {
    return {
      id: "all-season",
      label: "All-season",
      note: "All-season weight — holds shape without bulk, opaque in most shades.",
      drape: "Balanced",
      opacity: "Opaque",
    };
  }
  return {
    id: "winter",
    label: "Winter",
    note: "Winter weight — dense and warm, folds are fewer and deeper.",
    drape: "Structured",
    opacity: "Fully opaque",
  };
}

/** Pure GSM -> visual mapping. Values are pushed into CSS custom properties. */
export function gsmVisuals(gsm) {
  const t = gsmT(gsm);
  return {
    t,
    fabricOpacity: 0.72 + 0.28 * t,
    grainOpacity: 0.18 + 0.44 * t,
    shadowBlur: 10 + 18 * t,
    shadowY: 4 + 10 * t,
    shadowAlpha: 0.1 + 0.16 * t,
    drapeLayers: t > 0.72 ? 3 : t > 0.38 ? 2 : 1,
    saturate: 0.96 + 0.08 * t,
    contrast: 0.98 + 0.08 * t,
  };
}

export function gsmStyleVars(gsm) {
  const v = gsmVisuals(gsm);
  // Light (60-110): slightly blurred + lower opacity = sheer/airy feel
  // All-season (110-170): crisp, normal opacity
  // Winter (170-240): high contrast + deep shadow = dense/heavy feel
  const blurPx = gsm < 110 ? (1 - (gsm - 60) / 50) * 1.2 : 0;
  const filterStr =
    blurPx > 0
      ? `blur(${blurPx.toFixed(2)}px) saturate(${v.saturate.toFixed(3)}) contrast(${v.contrast.toFixed(3)})`
      : `saturate(${v.saturate.toFixed(3)}) contrast(${v.contrast.toFixed(3)})`;

  return {
    "--fabric-opacity": v.fabricOpacity.toFixed(3),
    "--grain-opacity": v.grainOpacity.toFixed(3),
    "--fabric-shadow": `0 ${v.shadowY.toFixed(1)}px ${v.shadowBlur.toFixed(
      1
    )}px rgba(27,42,34,${v.shadowAlpha.toFixed(3)})`,
    "--fabric-filter": filterStr,
  };
}
