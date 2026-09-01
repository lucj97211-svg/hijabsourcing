import { useEffect, useRef, useState } from "react";
import { hexToRgb } from "./colorMath.js";

/* Darkest fold factor. Tuned offline against the real cut-outs: this value
   maximises fold contrast while keeping the rendered mid-tone within ~6/255
   of the requested hex. */
const SHADOW = 0.15;

/**
 * Tint a white fabric cut-out to an exact target colour.
 *
 * CSS `sepia + hue-rotate` cannot reproduce saturated hues on a near-white
 * base (red came out cream), so the tint is done per pixel on a canvas:
 * each pixel keeps its own luminance — that is what carries the fold shading —
 * and that luminance modulates the target colour. Alpha is untouched, so the
 * cut-out stays transparent everywhere the garment is absent.
 */
export function useTintedFabric(src, hex) {
  const [url, setUrl] = useState(null);
  const cache = useRef(new Map());

  useEffect(() => {
    if (!src) return undefined;

    const key = `${src}|${hex}`;
    const cached = cache.current.get(key);
    if (cached) {
      setUrl(cached);
      return undefined;
    }

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = frame.data;
      const target = hexToRgb(hex) || { r: 255, g: 255, b: 255 };

      // The white garment only spans ~40 luminance levels, so tinting it
      // directly yields a flat, painted-on look. Measure the actual range
      // first, then stretch it so the folds survive the dye.
      let lo = 255;
      let hi = 0;
      for (let i = 0; i < px.length; i += 4) {
        if (px[i + 3] < 200) continue;
        const l = px[i] * 0.2126 + px[i + 1] * 0.7152 + px[i + 2] * 0.0722;
        if (l < lo) lo = l;
        if (l > hi) hi = l;
      }
      const span = Math.max(hi - lo, 1);

      for (let i = 0; i < px.length; i += 4) {
        if (px[i + 3] === 0) continue; // outside the garment

        const l = px[i] * 0.2126 + px[i + 1] * 0.7152 + px[i + 2] * 0.0722;
        // Normalise this pixel within the garment's own tonal range.
        const t = Math.min(Math.max((l - lo) / span, 0), 1);

        // Dyed cloth is a subtractive layer: fold shadows scale the hue down,
        // lit areas approach the full-strength dye. Scaling alone (no lift
        // toward white) is what keeps the rendered colour equal to the hex
        // the user picked — adding a specular lift washes the hue out.
        const k = SHADOW + (1 - SHADOW) * t;

        px[i] = Math.round(target.r * k);
        px[i + 1] = Math.round(target.g * k);
        px[i + 2] = Math.round(target.b * k);
      }

      ctx.putImageData(frame, 0, 0);
      const out = canvas.toDataURL("image/png");
      cache.current.set(key, out);
      if (!cancelled) setUrl(out);
    };

    img.onerror = () => {
      if (!cancelled) setUrl(null);
    };

    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, hex]);

  return url;
}
