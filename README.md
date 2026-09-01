# Hijab Sourcing

Marketing and inquiry site for a jersey & modal hijab fabric OEM / ODM mill.

Live domain: **www.hijabsourcing.com**

## What the site does

- **Fabric catalogue** — 13 base fabrics in two collections (Jersey ×6, Modal ×7), each with a
  macro texture image, hand-feel description and working GSM band.
- **Customization studio** — the core interactive module:
  - GSM slider (60–240) that drives a live fabric preview across opacity, grain, shadow depth and
    drape-layer count.
  - Shade picker with an SV square, hue bar, hex input and 12 in-house mill shades; the preview
    recolours live.
  - Logo upload that composites onto five carriers (woven label, packaging, hang tag, thank-you
    card, gift box). Runs entirely client-side — the file is never uploaded to a server.
  - The resulting spec feeds straight into the inquiry form.
- **Inquiry flow** — client-side validation, then a prefilled `mailto` plus a WhatsApp deep link
  and clipboard copy. No backend, no database, no payment.

## Stack

React 18 + Vite 5, plain CSS with design tokens. No UI framework, no runtime dependencies beyond
React. Static output in `dist/`.

## Local development

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deployment

Deployed on Vercel as a static Vite build (`vercel.json` pins the framework, build command and
output directory).

## Design

`DESIGN.md` holds the full design contract: colour tokens, typography, component inventory, page
structure, responsive rules and the image manifest.

## Content notes

- Shade codes are in-house (`HS-118 Sage Ash` etc.), deliberately not Pantone references.
- Branded fibre names appear as plain product names without trademark symbols or logos.
- Only client-confirmed factory figures are published: 500,000 pieces/month capacity, 30-day lead
  time, ten export markets. Nothing else is invented.
- Instagram and Facebook links in the footer are placeholders pending real URLs.

## Contact

sofia@wennuanfactory.com · +86 158 6896 5821
