import { useEffect, useRef, useState } from "react";
import { hexToRgb } from "./colorMath.js";

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

      for (let i = 0; i < px.length; i += 4) {
        if (px[i + 3] === 0) continue; // outside the garment

        // Fabric is white, so its luminance is pure shading information.
        const shade = (px[i] * 0.2126 + px[i + 1] * 0.7152 + px[i + 2] * 0.0722) / 255;

        // Ease the ramp so deep folds keep contrast instead of going flat.
        const k = 0.25 + 0.75 * shade;

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
