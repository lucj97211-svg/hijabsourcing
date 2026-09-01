# Hijab Sourcing — Design Contract

**Branch:** Canvas design (`referenceReplication=false`, dual-reference inspiration mode)
**Baseline system:** `vendor/open-design/upstream/design-systems/Botanical-Modernist-Apothecary`

## Product Goal & Audience

B2B English export site for a Chinese hijab-fabric OEM/ODM mill. Audience: overseas hijab brand
founders, boutique buyers, e-commerce sellers, wholesale distributors. Conversion goal is an
inquiry via email or WhatsApp. No cart, no checkout, no payment.

## Visual Direction — "Mill Ledger"

A quiet, material-first factory dossier: cream paper ground, sage-green ink, 90° corners, hairline
rules, serif headlines against monospaced technical data. Reference B (noorsilk) supplies the
skeleton — serif display + sans body, uppercase eyebrows, numbered index cards, one dark full-bleed
process band, hairline borders with zero shadow. Reference A (ohscarf) contributes structure only —
a legible product grid and an explicit trust spine. Neither site's colour, type, imagery or copy is
reused. The signature move: technical data (GSM, shade codes, step numbers) is typeset in monospace
and treated as ornament.

## Reference Sources

- `vendor/open-design/adapter/STATIC_POLICY.md` — static-input policy, no runtime/MCP semantics
- `vendor/open-design/adapter/RESOURCE_INDEX.md` — baseline + craft file selection
- `vendor/open-design/upstream/design-systems/Botanical-Modernist-Apothecary/DESIGN.md` — baseline
- `.../Botanical-Modernist-Apothecary/tokens.css` — token structure source
- `.../Botanical-Modernist-Apothecary/components.html` — component fixture
- `vendor/open-design/upstream/design-systems/Architectural-Warm-Minimalism/DESIGN.md` — serif display justification
- `vendor/open-design/upstream/craft/anti-ai-slop.md`
- `vendor/open-design/upstream/craft/color.md`
- `vendor/open-design/upstream/craft/animation-discipline.md`
- `vendor/open-design/upstream/craft/form-validation.md`

## Vendor Grounding

- **Baseline:** Botanical-Modernist-Apothecary — cream canvas, muted green ink, strict `0px` radius,
  flat with 1px hairlines, uppercase utility labels, numbered hierarchy convention.
- **Token source:** its `tokens.css` structure adopted (`--bg`/`--surface`/`--surface-warm`, 4-level
  fg ramp, 2-level border, `0px` radii, `--elev-flat: none`, `--focus-ring`, section-rhythm triplet),
  values rebound to the user's `#56896A` sage anchor.
- **Component fixture:** its `components.html` — sticky nav with hairline bottom rule, `.btn` at
  `12px 24px` with matching 1px border and `opacity .8` hover, `.field` label-over-square-input,
  `.split-layout` `min-width:300px` panes, `3/4` media block over uppercase caption.
- **Anti-ai-slop checks:** no indigo/violet, no two-stop hero gradient, no emoji in headings or
  buttons, monoline SVG icons only, square cards with hairlines, no invented metrics, all images
  local, accent capped at ~2 visible uses per viewport.
- **Intentional deviations:** (1) serif display face (Fraunces) replaces the baseline's sans-only
  display, justified by Architectural-Warm-Minimalism; (2) `--accent` rebound from near-black to
  sage `#56896A`; (3) a brass tone `#A8895C` is used **only** for 01–08 process numerals and card
  index digits, never on an interactive control, so it stays outside the accent budget; (4) fluid
  6-step display scale replaces the baseline's uniform 30px heading.

## Colour Tokens

Sage ramp built from the user's Photoshop picker anchor `#56896A` (H143 S37 B54):
`--brand-50 #F2F6F3` · `100 #E3ECE6` · `200 #C7DACD` · `300 #9CBFAA` · `400 #74A187` ·
`500 #56896A` (anchor, fills) · `600 #446E55` (accent-for-text, AA on cream) · `700 #33543F` ·
`800 #24382D` (dark process band) · `900 #1B2A22` (footer).

Surfaces: `--bg #FBF8F2`, `--surface #FFFDF8`, `--surface-warm #F3EDE1`. Never pure `#FFF`/`#000`.
Foreground ramp: `--fg #2C2A26`, `--fg-2 #4A463F`, `--muted #7A7368`, `--meta #A69D90`.
Material detail: `--brass #A8895C` (numerals only).

## Typography

`Fraunces` 300/400 display (serif) · `Karla` 400/500/600 body · `IBM Plex Mono` 400/500 data.
Three registers per screen only: mono eyebrow/data, serif statement, sans explanation.
Uppercase micro-type carries `0.14em` tracking; serif display carries `-0.02em`.

## Spacing, Radii, Shadows

4→100px space scale; section rhythm 116/84/60px. Radii are `0px` everywhere except colour swatches
and social icons (`9999px`) and usage chips (`2px`). Elevation is flat: `--elev-flat: none`,
`--elev-ring` hairline. `--elev-float` is permitted on exactly three elements (spec bar, dropdown,
colour popover).

## Component Inventory

Shell — `UtilityStrip`, `SiteHeader`, `MobileDrawer`, `SectionHeader`, `Button`, `SiteFooter`, `Reveal`.
Content — `Hero`, `CapabilityCard`, `TrustBar`, `FabricCatalogue`, `CollectionTabs`, `FabricCard`,
`ProcessGrid`, `QcGrid`, `FactoryAbout`, `FaqAccordion`, `InquiryForm`, `StickyMobileCta`.
Studio — `CustomizationStudio`, `GsmSlider`, `FabricWeightPreview`, `ShadeStudio`, `ShadeSwatchRow`,
`ShadePreview`, `LogoUploader`, `LogoCarrierPreview`, `CarrierTile`, `SpecBar`.

Every major section carries `data-component`.

## Page Structure

Single primary page `/` with anchors `#fabrics #customization #process #about #contact`, in order:
utility strip → sticky header → hero (+4 glass capability cards) → capability bar → fabric catalogue
(Jersey 6 / Modal 7, tabbed) → customization studio → production process (dark, 8 steps) → QC (6) →
factory & about → FAQ → inquiry form → footer.

## Responsive Rules

Breakpoints sm 480 / md 768 / lg 1024 / xl 1280, mobile-first, usable from 320px. Studio is
two-column 46/54 with a sticky preview ≥lg, stacked md–lg, tabbed <md. SV square goes full-width
square on phone with the hue bar rotated horizontal. All touch targets ≥44px. No `100vw` full-bleed.

## Interaction & Motion

Scroll reveal fade + 8px rise at 520ms, `once`, 60ms stagger, max 4 per group. Hover ≤200ms, press
90ms, accordion 280ms, studio preview crossfade 150ms. No parallax, no autoplay, no counting stats.
Under `prefers-reduced-motion` all transforms drop to opacity-only and studio previews update
instantly (motion is never the sole state signal — mono readouts carry it).

**GSM → visual mapping** (pure function): `t = clamp((gsm-60)/180)` drives fabric-layer opacity
`0.72→1.0` over a printed grid backdrop (sheerness cue), grain overlay `0.18→0.62`, shadow depth,
drape-layer count (1/2/3 at t>0.38 / t>0.72), and saturation/contrast.

**Shade studio** — SV square (hue base + white→transparent + transparent→black), vertical hue bar,
mono hex input, 12 in-house mill shades. Recolouring uses a desaturated base photo plus a masked
`multiply` layer with a `screen` highlight at 12%.

**Logo carriers** — percentage-based placement rects per carrier, `object-fit: contain`,
`mix-blend-mode: multiply` (toggleable to `screen` for dark carriers). Client-side only; the file
never leaves the browser.

## Image Manifest

All under `public/assets/images/`, referenced as `/assets/images/…`. All generated locally, no
external CDN at runtime, no imagery from either reference site.

| Local path | Source | Mode | Usage |
|---|---|---|---|
| `fabrics/jersey-cotton.jpg` | imageGenerate: cotton single-jersey macro | local | Fabric card — Cotton Jersey |
| `fabrics/jersey-premium.jpg` | imageGenerate: fine-gauge premium jersey macro | local | Fabric card — Premium Jersey |
| `fabrics/jersey-modal.jpg` | imageGenerate: modal jersey macro | local | Fabric card — Modal Jersey |
| `fabrics/jersey-bamboo.jpg` | imageGenerate: bamboo-viscose jersey macro | local | Fabric card — Bamboo Jersey |
| `fabrics/jersey-liquid.jpg` | imageGenerate: liquid jersey macro | local | Fabric card — Liquid Jersey |
| `fabrics/jersey-breathable.jpg` | imageGenerate: breathable jersey macro | local | Fabric card — Breathable Jersey |
| `fabrics/modal-30s.jpg` | imageGenerate: 30s modal macro | local | Fabric card — 30s Modal |
| `fabrics/modal-40s.jpg` | imageGenerate: 40s modal macro | local | Fabric card — 40s Modal |
| `fabrics/modal-50s.jpg` | imageGenerate: 50s modal macro | local | Fabric card — 50s Modal |
| `fabrics/modal-bamboo.jpg` | imageGenerate: bamboo-modal macro | local | Fabric card — Bamboo Modal |
| `fabrics/modal-lenzing.jpg` | imageGenerate: beech-derived modal macro | local | Fabric card — Lenzing Modal |
| `fabrics/modal-tencel.jpg` | imageGenerate: lyocell-blend modal macro | local | Fabric card — Tencel Modal |
| `fabrics/modal-twill.jpg` | imageGenerate: twill-weave modal macro | local | Fabric card — Twill Modal |
| `studio/hijab-base-neutral.jpg` | imageGenerate: neutral hijab on invisible form | local | Studio preview base (GSM + shade) |
| `studio/hijab-base-drape-2.jpg` | imageGenerate: deeper folds variant | local | Studio drape layer, >110 GSM |
| `studio/hijab-base-drape-3.jpg` | imageGenerate: heavy structured folds variant | local | Studio drape layer, >190 GSM |
| `studio/carrier-woven-label.jpg` | imageGenerate: blank satin woven label | local | Carrier tile — woven label |
| `studio/carrier-packaging-bag.jpg` | imageGenerate: blank kraft pouch | local | Carrier tile — packaging |
| `studio/carrier-hang-tag.jpg` | imageGenerate: blank cardstock hang tag | local | Carrier tile — hang tag |
| `studio/carrier-thank-you-card.jpg` | imageGenerate: blank cream card | local | Carrier tile — thank-you card |
| `studio/carrier-gift-box.jpg` | imageGenerate: blank sage rigid box | local | Carrier tile — gift box |
| `hero/hero-fabric-daylight.jpg` | imageGenerate: folded fabric in raking daylight | local | Hero background (desktop) |
| `hero/hero-fabric-daylight-mobile.jpg` | imageGenerate: vertical crop | local | Hero background (<768px) |
| `factory/knitting-floor.jpg` | imageGenerate: circular knitting machine | local | About — tall factory image |
| `factory/fabric-warehouse.jpg` | imageGenerate: fabric roll warehouse | local | About — wide warehouse image |
| `factory/dye-lab-swatches.jpg` | imageGenerate: dye lab swatch bench | local | Shade studio supporting image |
| `qc/inspection-detail.jpg` | imageGenerate: hands inspecting fabric | local | QC section image |
| `brand/favicon-512.png` | imageGenerate: abstract sage H monogram | local | Favicon / apple-touch-icon |

## Content Integrity Decisions

- **No Pantone naming.** The module is *Shade Studio* with in-house codes (`HS-118 Sage Ash`).
  Pantone is a registered mark; unlicensed PMS references on a commercial site are a takedown risk.
  The picker behaviour the user asked for is fully preserved.
- **Branded fibre names** (Lenzing, Tencel) appear as plain product names with no ™/®, no logos, and
  neutral descriptions ("beech-derived modal", "lyocell-blend").
- **No invented statistics.** Capacity, lead times, country counts, founding year and certifications
  are not fabricated. The trust bar ships as non-numeric capability labels until the client supplies
  real figures.
- **No client-logo wall** — would require written permission from named brands.
- **Social links** ship as `#` placeholders pending real URLs.
- **Form transport:** static site, so validation → prefilled `mailto` + WhatsApp deep link +
  clipboard copy. No backend, no database, no file upload to a server.
