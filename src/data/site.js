/* Hijab Sourcing — site content.
   Real, client-confirmed facts only. Nothing here is an invented statistic. */

export const CONTACT = {
  email: "sofia@wennuanfactory.com",
  phone: "+86 158 6896 5821",
  phoneRaw: "+8615868965821",
  whatsapp: "8615868965821",
  brand: "Hijab Sourcing",
  domain: "hijabsourcing.com",
  tagline: "Jersey & modal hijab fabric — OEM / ODM from one mill",
};

export const SOCIAL = [
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
];

export const NAV = [
  { id: "fabrics", label: "Fabrics" },
  { id: "customization", label: "Customization" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const CAPABILITIES = [
  { label: "OEM & ODM", line: "Your design, or ours developed with you." },
  { label: "500k / month", line: "Capacity for repeat programmes at scale." },
  { label: "Custom weight & shade", line: "60 to 240 GSM, matched to your reference." },
  { label: "30-day lead time", line: "From approved sample to finished goods." },
];

export const TRUST = [
  {
    figure: "500,000",
    unit: "pieces / month",
    title: "Monthly capacity",
    line: "Enough headroom to take a repeat programme without pushing your next order down the queue.",
  },
  {
    figure: "30",
    unit: "days",
    title: "Production lead time",
    line: "One month from approved sample to finished goods, quoted honestly before you commit.",
  },
  {
    figure: "10",
    unit: "markets",
    title: "Export coverage",
    line: "Nine countries plus the EU — North America, the UK, Europe, the Gulf, Southeast Asia and Oceania.",
  },
  {
    figure: "13",
    unit: "base fabrics",
    title: "Jersey & modal range",
    line: "Every base runs across a weight band from 60 to 240 GSM, not a single fixed weight.",
  },
];

/* Confirmed export markets. Grouped for display; the EU is a bloc, not one country. */
export const MARKETS = [
  { region: "North America", countries: ["United States", "Canada"] },
  { region: "Europe", countries: ["United Kingdom", "European Union"] },
  { region: "Middle East", countries: ["United Arab Emirates", "Oman"] },
  {
    region: "Asia Pacific",
    countries: ["Australia", "Singapore", "Malaysia", "Indonesia"],
  },
];

export const JERSEY = [
  {
    id: "jersey-cotton",
    name: "Cotton Jersey",
    image: "/assets/images/fabrics/jersey-cotton.jpg",
    gsm: [130, 220],
    handFeel:
      "Dense cotton loop with a matte face. It holds a pin, resists slipping and sits still all day — the workhorse of everyday wear.",
    tags: ["Everyday", "Matte", "Grippy"],
  },
  {
    id: "jersey-premium",
    name: "Premium Jersey",
    image: "/assets/images/fabrics/jersey-premium.jpg",
    gsm: [160, 200],
    handFeel:
      "Fine-gauge and compacted, with a faint mercerised sheen. The face stays smooth after washing where a coarser knit would fuzz.",
    tags: ["Fine gauge", "Soft sheen", "Retail"],
  },
  {
    id: "jersey-modal",
    name: "Modal Jersey",
    image: "/assets/images/fabrics/jersey-modal.jpg",
    gsm: [160, 200],
    handFeel:
      "Cool and fluid. The loop structure disappears into the drape, so it falls in long folds rather than breaking at the shoulder.",
    tags: ["Fluid", "Cool hand", "Draping"],
  },
  {
    id: "jersey-bamboo",
    name: "Bamboo Jersey",
    image: "/assets/images/fabrics/jersey-bamboo.jpg",
    gsm: [150, 240],
    handFeel:
      "Dry, powdery finish with almost no sheen. Built for humid climates — it moves moisture instead of holding it against the skin.",
    tags: ["Breathable", "Dry hand", "Humid climates"],
  },
  {
    id: "jersey-liquid",
    name: "Liquid Jersey",
    image: "/assets/images/fabrics/jersey-liquid.jpg",
    gsm: [150, 190],
    handFeel:
      "The most fluid knit we run. A long specular highlight travels across the surface as it moves, reading closer to poured silk than to jersey.",
    tags: ["High drape", "Lustrous", "Occasion"],
  },
  {
    id: "jersey-breathable",
    name: "Breathable Jersey",
    image: "/assets/images/fabrics/jersey-breathable.jpg",
    gsm: [150, 190],
    handFeel:
      "An open loop with measurable air flow between the wales. Crisp and dry to the touch, semi-sheer when backlit.",
    tags: ["Airy", "Semi-sheer", "Summer"],
  },
];

export const MODAL = [
  {
    id: "modal-30s",
    name: "30s Modal",
    image: "/assets/images/fabrics/modal-30s.jpg",
    gsm: [70, 140],
    handFeel:
      "Coarser count with a visible soft grain and real body. It holds a rounded fold instead of collapsing — good for structured wraps.",
    tags: ["Body", "Soft grain", "Structured"],
  },
  {
    id: "modal-40s",
    name: "40s Modal",
    image: "/assets/images/fabrics/modal-40s.jpg",
    gsm: [65, 140],
    handFeel:
      "The middle count and our most-ordered base. Smooth low-lustre face, fluid enough to fall in two long folds without looking slippery.",
    tags: ["Best seller", "Balanced", "Low lustre"],
  },
  {
    id: "modal-50s",
    name: "50s Modal",
    image: "/assets/images/fabrics/modal-50s.jpg",
    gsm: [60, 140],
    handFeel:
      "Yarn structure is effectively invisible. Glassy, feather-light and semi-sheer at the low end of its weight band.",
    tags: ["Ultra fine", "Feather light", "Semi-sheer"],
  },
  {
    id: "modal-bamboo",
    name: "Bamboo Modal",
    image: "/assets/images/fabrics/modal-bamboo.jpg",
    gsm: [60, 140],
    handFeel:
      "A hybrid hand — dry matte bamboo across the face, a faint modal sheen only at the fold crests. Relaxed, heavy drape.",
    tags: ["Blend", "Matte face", "Relaxed"],
  },
  {
    id: "modal-lenzing",
    name: "Lenzing Modal",
    image: "/assets/images/fabrics/modal-lenzing.jpg",
    gsm: [60, 140],
    handFeel:
      "Beech-derived modal fibre. Exceptionally uniform face with a refined pearlescent sheen, folding into deep vertical pleats.",
    tags: ["Premium", "Uniform", "Deep pleats"],
  },
  {
    id: "modal-tencel",
    name: "Tencel Modal",
    image: "/assets/images/fabrics/modal-tencel.jpg",
    gsm: [60, 140],
    handFeel:
      "Lyocell-blend modal with a distinctly cool-toned lustre and a crisp highlight edge. Falls in sharp fluid folds.",
    tags: ["Lyocell blend", "Cool tone", "Crisp fall"],
  },
  {
    id: "modal-twill",
    name: "Twill Modal",
    image: "/assets/images/fabrics/modal-twill.jpg",
    gsm: [60, 140],
    handFeel:
      "Clear diagonal twill ridges catch the light along their crests. The only structured weave in the range — it takes a crease and keeps it.",
    tags: ["Twill weave", "Textured", "Holds shape"],
  },
];

export const COLLECTIONS = [
  { id: "jersey", label: "Jersey Collection", items: JERSEY },
  { id: "modal", label: "Modal Collection", items: MODAL },
];

export const ALL_FABRICS = [...JERSEY, ...MODAL];

/* In-house mill shade codes. Deliberately NOT Pantone — that is a registered
   mark and unlicensed PMS references on a commercial site are a legal risk. */
export const SHADES = [
  { code: "HS-118", name: "Sage Ash", hex: "#56896A" },
  { code: "HS-133", name: "Seafoam", hex: "#9CBFAA" },
  { code: "HS-616", name: "Olive Smoke", hex: "#6B6B4E" },
  { code: "HS-402", name: "Sand", hex: "#D8C7AC" },
  { code: "HS-702", name: "Pearl", hex: "#EDE7DD" },
  { code: "HS-204", name: "Clay Rose", hex: "#B98A7E" },
  { code: "HS-021", name: "Terracotta", hex: "#A85F43" },
  { code: "HS-915", name: "Dusk Mauve", hex: "#8C7A8A" },
  { code: "HS-311", name: "Ink Navy", hex: "#2E3A4E" },
  { code: "HS-509", name: "Charcoal", hex: "#4A4845" },
  { code: "HS-808", name: "Espresso", hex: "#4A362B" },
  { code: "HS-240", name: "Black", hex: "#1F1E1C" },
];

export const CARRIERS = [
  {
    id: "woven-label",
    label: "Woven Label",
    caption: "Satin woven label, folded, sewn into the inside seam",
    image: "/assets/images/studio/carrier-woven-label.jpg",
    rect: { x: 32, y: 40, w: 36, h: 14, rotate: 0 },
    blend: "multiply",
    opacity: 0.92,
    filter: "contrast(0.92) saturate(0.85)",
  },
  {
    id: "packaging-bag",
    label: "Packaging",
    caption: "Matte kraft flat pouch, one-colour print",
    image: "/assets/images/studio/carrier-packaging-bag.jpg",
    rect: { x: 27, y: 32, w: 46, h: 22, rotate: 0 },
    blend: "multiply",
    opacity: 0.88,
    filter: "none",
  },
  {
    id: "hang-tag",
    label: "Hang Tag",
    caption: "Textured cardstock, metal eyelet, cotton string",
    image: "/assets/images/studio/carrier-hang-tag.jpg",
    rect: { x: 31, y: 26, w: 38, h: 22, rotate: -2 },
    blend: "multiply",
    opacity: 0.94,
    filter: "none",
  },
  {
    id: "thank-you-card",
    label: "Thank-You Card",
    caption: "Cotton card with a debossed border",
    image: "/assets/images/studio/carrier-thank-you-card.jpg",
    rect: { x: 24, y: 36, w: 52, h: 20, rotate: 0 },
    blend: "multiply",
    opacity: 0.95,
    filter: "none",
  },
  {
    id: "gift-box",
    label: "Gift Box",
    caption: "Rigid board box, matte lamination",
    image: "/assets/images/studio/carrier-gift-box.jpg",
    rect: { x: 33, y: 36, w: 34, h: 18, rotate: 0 },
    blend: "multiply",
    opacity: 0.9,
    filter: "none",
  },
];

export const PROCESS = [
  { no: "01", name: "Inquiry", body: "Send your weight, shade and quantity. We come back with a quote and a dated schedule." },
  { no: "02", name: "Fabric", body: "We post physical swatches from the base range so you judge the hand, not a screen." },
  { no: "03", name: "Lab Dip", body: "Three shade options against your reference. Approve one, or send it back with a note." },
  { no: "04", name: "Sample", body: "A full-size sample piece in your approved fabric and shade, cut and hemmed to spec." },
  { no: "05", name: "Approval", body: "You sign off on hand, shade, size and finish. Nothing enters bulk before this." },
  { no: "06", name: "Production", body: "Knitting, dyeing and finishing run in sequence in our own mill — around 30 days." },
  { no: "07", name: "Inspection", body: "Batch checks on shade, weight, dimensions and branding before packing." },
  { no: "08", name: "Shipping", body: "Roll goods or finished pieces, packed to your carton spec and shipped door to door." },
];

export const QC = [
  { name: "Weight Check", line: "Each batch is weighed against its target GSM band before it leaves the finishing line." },
  { name: "Colourfastness", line: "Rubbing and perspiration tested per batch so the shade survives real wear." },
  { name: "Shrinkage", line: "Wash-tested to confirm the finished dimension holds after the first launder." },
  { name: "Pilling", line: "Surface abrasion checked on the face that sits against hair and collar." },
  { name: "Dimension", line: "Cut length and width measured piece by piece, not sampled once per roll." },
  { name: "Branding", line: "Label placement, tag string and packaging verified against your approved sample." },
];

export const FAQ = [
  {
    q: "What is your minimum order per colour?",
    a: "It depends on the base fabric and whether the shade is from our stock range or a custom lab dip. Stock shades start considerably lower than custom ones. Send the fabric and shade you have in mind and we will quote the exact minimum rather than a marketing number.",
  },
  {
    q: "Can you match a colour I already sell?",
    a: "Yes. Send a physical swatch, a hex value, or a colour reference from your existing supplier. We produce three lab dips against it and you approve the closest one on real fabric before bulk dyeing starts.",
  },
  {
    q: "What does GSM actually change?",
    a: "GSM is grams per square metre — the fabric's weight. Lower weights are lighter and more sheer with a fluid fall; higher weights are more opaque, warmer and hold their shape. Every base fabric in our range runs across a band rather than a single fixed weight, so you choose where in that band your product sits.",
  },
  {
    q: "How long does production take?",
    a: "Around 30 days from approved sample to finished goods for a standard order. Sampling and lab dips happen before that clock starts. If your deadline is tighter, tell us the date up front — we would rather say no than miss it.",
  },
  {
    q: "What volume can you handle?",
    a: "Our capacity is about 500,000 pieces per month, so repeat programmes and seasonal peaks do not push your next order down the queue. Small first orders are welcome too — capacity is there for when you scale.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We currently export to the United States, Canada, the United Kingdom, the European Union, the United Arab Emirates, Oman, Australia, Singapore, Malaysia and Indonesia. If your market is not on that list, ask — it usually just means we have not shipped there yet, not that we cannot.",
  },
  {
    q: "Do you supply roll goods or finished hijabs?",
    a: "Both. We can ship fabric by the roll for your own cutting and sewing, or deliver finished pieces cut, hemmed, labelled and retail-packed under your brand.",
  },
  {
    q: "Can you produce our labels and packaging?",
    a: "Yes — woven labels, care labels, hang tags, thank-you cards, retail sleeves and rigid gift boxes are all finished in-house. Upload your logo in the customization studio to see it placed on each one.",
  },
  {
    q: "Is the logo I upload to your site stored anywhere?",
    a: "No. The preview runs entirely in your browser. The file is never uploaded to us or to any server until you deliberately attach it to an email.",
  },
  {
    q: "How accurate is the on-screen preview?",
    a: "It is a design preview, not a print proof. Screen colour varies by display and blend previews approximate how ink and thread behave. We always send a physical sample for approval before bulk.",
  },
  {
    q: "Which certifications can you provide?",
    a: "Certification availability depends on the specific fabric and dye route. Tell us which standard your market requires and we will confirm in writing what we can supply for that order — we would rather answer precisely than list logos.",
  },
];
