/* Minimal colour maths — no dependency needed. */

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export function hsvToRgb(h, s, v) {
  const hh = ((h % 360) + 360) % 360;
  const ss = clamp(s, 0, 1);
  const vv = clamp(v, 0, 1);
  const c = vv * ss;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = vv - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh < 60) [r, g, b] = [c, x, 0];
  else if (hh < 120) [r, g, b] = [x, c, 0];
  else if (hh < 180) [r, g, b] = [0, c, x];
  else if (hh < 240) [r, g, b] = [0, x, c];
  else if (hh < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHex({ r, g, b }) {
  const to = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

export function hsvToHex(h, s, v) {
  return rgbToHex(hsvToRgb(h, s, v));
}

export function hexToRgb(hex) {
  const clean = String(hex).replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHsv({ r, g, b }) {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rr) h = 60 * (((gg - bb) / d) % 6);
    else if (max === gg) h = 60 * ((bb - rr) / d + 2);
    else h = 60 * ((rr - gg) / d + 4);
  }
  if (h < 0) h += 360;
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

export function hexToHsv(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsv(rgb) : null;
}

export function isValidHex(hex) {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(hex).trim());
}

export function normalizeHex(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHex(rgb) : null;
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function relativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

/** Readable ink colour for a given background. */
export function inkOn(hex) {
  return relativeLuminance(hex) > 0.45 ? "#2C2A26" : "#FFFDF8";
}

/**
 * Convert a hex colour into a CSS filter string that tints a white/near-white
 * image to the target colour.  Works by composing:
 *   sepia(1) → places us on the warm-brown axis
 *   hue-rotate(Xdeg) → rotates to the target hue
 *   saturate(Y) → sets the saturation
 *   brightness(Z) → sets the lightness
 *
 * The filter is applied directly to the <img> element, so the stage background,
 * grid, and any surrounding DOM are completely unaffected.
 */
export function hexToImgFilter(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "none";

  const { h, s, v } = rgbToHsv(rgb);

  // sepia(1) puts the image at hue ≈ 35°.
  // We need to rotate from 35° to the target hue.
  const hueRotate = ((h - 35) + 360) % 360;

  // Saturation: sepia gives ~0.85 base; scale to match target.
  // At s=0 (grey/white/black) we want sat=0; at s=1 full chroma.
  const saturate = s < 0.05 ? 0 : Math.max(0.1, s * 3.5);

  // Brightness: v=1 (white target) → bright; v=0 (black) → dark.
  // sepia(1) on white gives ~0.93 luminance, so scale relative to that.
  const brightness = Math.max(0.05, v * 1.05);

  return [
    "sepia(1)",
    `hue-rotate(${hueRotate.toFixed(1)}deg)`,
    `saturate(${saturate.toFixed(2)})`,
    `brightness(${brightness.toFixed(2)})`,
  ].join(" ");
}
