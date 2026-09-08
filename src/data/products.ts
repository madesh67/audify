export interface ProductVariant {
  name: string;
  colorKey: string;
  hex: string;
  image: string;
  finishDescription: string;
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  price: number;
  originalPrice?: number;
  category: "flagship" | "studio" | "hardware" | "accessories";
  badge: string;
  badgeType?: "default" | "emerald" | "amber";
  rating: number;
  reviewCount: number;
  tagline: string;
  description: string;
  keyHighlights: string[];
  specs: ProductSpecItem[];
  variants: ProductVariant[];
  boxContents: string[];
  inStock: boolean;
  leadTime: string;
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "audify-ultra-01",
    slug: "audify-ultra-01",
    name: "Audify Ultra 01",
    series: "Reference Wireless Series",
    price: 499,
    category: "flagship",
    badge: "Flagship Reference",
    badgeType: "emerald",
    rating: 4.98,
    reviewCount: 2410,
    tagline: "The Reference Wireless Over-Ear Headset",
    description:
      "Engineered from cryogenic Grade-5 titanium and custom 40mm bio-cellulose drivers. Featuring 6-mic hybrid ANC, zero-pressure acoustic suspension, and up to 65 hours of lossless wireless playback.",
    keyHighlights: [
      "Grade-5 PVD Titanium Chassis",
      "40mm Bio-Cellulose Sound Chamber",
      "-42dB Active Noise Cancellation",
      "65-Hour Battery + 15m Fast Charge",
    ],
    specs: [
      { label: "Acoustic Driver", value: "40mm Custom Bio-Cellulose Transducer" },
      { label: "Frequency Range", value: "5 Hz – 45,000 Hz" },
      { label: "Active Isolation", value: "-42 dB Hybrid Adaptive (6 Beamforming Mics)" },
      { label: "Battery Playback", value: "65 Hours (8 Hours with 15-min Charge)" },
      { label: "Wireless Protocol", value: "Bluetooth 5.4 LE Audio, LDAC, AAC, SBC" },
      { label: "Chassis Alloy", value: "Cryogenic Grade-5 PVD Coated Titanium" },
      { label: "Cushion Seal", value: "Italian Perforated Nappa Leather & Memory Foam" },
      { label: "Net Weight", value: "268g (Featherlight Studio Balance)" },
    ],
    variants: [
      {
        name: "Obsidian Onyx",
        colorKey: "obsidian",
        hex: "#1A1A1A",
        image: "/images/variant-obsidian.png",
        finishDescription: "Deep light-absorbing black anodization with perforated Italian lambskin.",
      },
      {
        name: "Platinum Silver",
        colorKey: "silver",
        hex: "#D6D9DC",
        image: "/images/variant-silver.png",
        finishDescription: "Bead-blasted satin aluminum with cool mist acoustic memory foam.",
      },
      {
        name: "Champagne Dune",
        colorKey: "dune",
        hex: "#C8B39B",
        image: "/images/variant-dune.png",
        finishDescription: "Brushed bronze chassis paired with warm camel full-grain leather.",
      },
    ],
    boxContents: [
      "Audify Ultra 01 Acoustic Headset",
      "Magnetic Molded Travel Case",
      "Silver-Plated 3.5mm DAC Passthrough Cable (1.5m)",
      "USB-C to USB-C Fast-Charging Cable",
      "6.35mm Gold-Plated Studio Adapter",
      "Individual Acoustic Calibration Certificate",
    ],
    inStock: true,
    leadTime: "Ships within 24 Hours • Complimentary 2-Day Air",
    isFeatured: true,
  },
  {
    id: "audify-studio-pro-02",
    slug: "audify-studio-pro-02",
    name: "Audify Studio Pro 02",
    series: "Mastering Acoustic Series",
    price: 649,
    category: "studio",
    badge: "Studio Mastering",
    badgeType: "default",
    rating: 4.96,
    reviewCount: 840,
    tagline: "Open-Back Planar Magnetic Reference Headphone",
    description:
      "Created for mixing and mastering engineers who demand uncompromising spatial coherence. 50mm ultra-thin planar magnetic diaphragm inside a resonance-damped magnesium open chassis.",
    keyHighlights: [
      "50mm Planar Magnetic Diaphragm",
      "Open-Back Acoustic Transparency",
      "Balanced 4.4mm Pentaconn Connection",
      "Precision Magnesium Milled Cup",
    ],
    specs: [
      { label: "Transducer Type", value: "50mm Planar Magnetic (0.5µm Substrate)" },
      { label: "Frequency Range", value: "4 Hz – 52,000 Hz" },
      { label: "Total Harmonic Distortion", value: "< 0.03% @ 1 kHz, 100 dB SPL" },
      { label: "Impedance", value: "32 Ω (High Sensitivity Direct Drive)" },
      { label: "Cup Enclosure", value: "Laser-Cut Open-Mesh Magnesium Alloy" },
      { label: "Cables Included", value: "Dual 3.5mm to 4.4mm Balanced + 6.35mm" },
      { label: "Headband Design", value: "Self-Adjusting Carbon Fiber Leaf Spring" },
      { label: "Net Weight", value: "310g" },
    ],
    variants: [
      {
        name: "Raw Magnesium",
        colorKey: "magnesium",
        hex: "#5C6068",
        image: "/images/headset-frame-382-crop.png",
        finishDescription: "Satin vapor-deposited magnesium with open acoustic mesh.",
      },
      {
        name: "Stealth Titanium",
        colorKey: "stealth",
        hex: "#22252A",
        image: "/images/headset-transparent.png",
        finishDescription: "Matte DLC coated structural frame with perforated lambskin.",
      },
    ],
    boxContents: [
      "Audify Studio Pro 02 Headphone",
      "Hard Anodized Flight Case",
      "4.4mm Pentaconn Balanced Braided Cable (2.0m)",
      "3.5mm Single-Ended Studio Cable (2.0m)",
      "6.35mm Screw-On Adapter",
      "Laboratory Sound Measurement Plot",
    ],
    inStock: true,
    leadTime: "In Stock • Batch No. 04 Allocated",
    isFeatured: true,
  },
  {
    id: "audify-air-anc",
    slug: "audify-air-anc",
    name: "Audify Air ANC",
    series: "Ultra-Light Mobility Series",
    price: 379,
    originalPrice: 429,
    category: "flagship",
    badge: "Featherlight Commute",
    badgeType: "emerald",
    rating: 4.93,
    reviewCount: 1120,
    tagline: "Ultra-Lightweight Travel Acoustic Headset",
    description:
      "Tipping the scales at an astonishing 218 grams, Audify Air combines continuous adaptive noise canceling with breathable contour ear cushions for effortless 14-hour cross-continental flights.",
    keyHighlights: [
      "218g Featherlight Architecture",
      "Multi-Point Bluetooth 5.4",
      "Adaptive Wind-Shield Acoustic Microphones",
      "48-Hour Continuous Battery",
    ],
    specs: [
      { label: "Acoustic Driver", value: "38mm Titanium Composite Diaphragm" },
      { label: "Frequency Range", value: "10 Hz – 40,000 Hz" },
      { label: "Active Isolation", value: "-38 dB Intelligent Adaptive Transparency" },
      { label: "Battery Playback", value: "48 Hours (ANC On) / 60 Hours (ANC Off)" },
      { label: "Microphone Array", value: "5 Microphones with AI Spatial Voice Isolation" },
      { label: "Contour Fold", value: "Flat-Folding Dual Swivel Architecture" },
      { label: "Net Weight", value: "218g" },
    ],
    variants: [
      {
        name: "Liquid Silver",
        colorKey: "silver",
        hex: "#E0E3E6",
        image: "/images/headset-variant-silver.webp",
        finishDescription: "Micro-arc oxidized aircraft aluminum finish with frost cushions.",
      },
      {
        name: "Obsidian Black",
        colorKey: "obsidian",
        hex: "#1E1E22",
        image: "/images/headset-variant-obsidian.webp",
        finishDescription: "Satin matte carbon composite with ultra-plush black cushions.",
      },
    ],
    boxContents: [
      "Audify Air ANC Headphone",
      "Slim Magnetic Travel Pouch",
      "USB-C Charging Cable",
      "3.5mm Audio Cable",
      "Airplane Dual-Pin Audio Adapter",
    ],
    inStock: true,
    leadTime: "In Stock • Ships Same Day",
    isFeatured: false,
  },
  {
    id: "audify-cryo-dac",
    slug: "audify-cryo-dac",
    name: "Audify CryoDAC 01",
    series: "Precision Amplification",
    price: 299,
    category: "hardware",
    badge: "Hardware Accelerator",
    badgeType: "default",
    rating: 4.99,
    reviewCount: 460,
    tagline: "Cryogenic Dual ESS SABRE Balanced Desktop DAC & Amp",
    description:
      "Milled from a solid billet of 6000-series aluminum, CryoDAC 01 features dual ESS SABRE 9038Q2M converter chips, native DSD512 decode, and 600mW of clean, uncolored balanced output.",
    keyHighlights: [
      "Dual ESS SABRE 9038Q2M DACs",
      "32-Bit / 768kHz PCM & Native DSD512",
      "4.4mm Pentaconn + 3.5mm Dual Output",
      "0.00012% Ultra-Low Harmonic Distortion",
    ],
    specs: [
      { label: "DAC Architecture", value: "Dual ESS SABRE ES9038Q2M (True Balanced Mono)" },
      { label: "Decoding Capability", value: "PCM up to 768 kHz / 32-Bit, DSD512 Native, MQA" },
      { label: "Max Output Power", value: "600 mW @ 32 Ω / 120 mW @ 300 Ω (Balanced)" },
      { label: "Dynamic Range", value: "126 dB (A-Weighted)" },
      { label: "Outputs", value: "4.4mm Balanced Pentaconn, 3.5mm Single-Ended Line" },
      { label: "Inputs", value: "USB-C Asynchronous Audio, Optical Toslink" },
      { label: "Chassis Material", value: "CNC Monoblock Anodized Aerospace Aluminum" },
    ],
    variants: [
      {
        name: "Matte Obsidian",
        colorKey: "black",
        hex: "#121214",
        image: "/images/headset-transparent.png",
        finishDescription: "Anodized deep matte black with diamond-knurled volume dial.",
      },
    ],
    boxContents: [
      "Audify CryoDAC 01 Unit",
      "Shielded High-Purity USB-C to USB-C Interconnect (1.0m)",
      "USB-A to USB-C Gold Adapter",
      "Silicone Anti-Resonance Desk Footing Pad",
      "Precision CNC Volume Dial Ring",
    ],
    inStock: true,
    leadTime: "Limited Run • Ready for Dispatch",
    isFeatured: true,
  },
  {
    id: "audify-artisan-case",
    slug: "audify-artisan-case",
    name: "Audify Artisan Aluminum Case",
    series: "Protective Architecture",
    price: 89,
    category: "accessories",
    badge: "Custom Molded",
    badgeType: "default",
    rating: 4.89,
    reviewCount: 620,
    tagline: "Form-Fitted Anodized Aluminum Travel Vault",
    description:
      "Crafted with a rigid aluminum clamshell and laser-cut shock-absorbent microfiber interior. Engineered to cradle your Audify headphones with magnetic snap closure and dedicated cable dock.",
    keyHighlights: [
      "Rigid Anodized Aluminum Clamshell",
      "Fidlock Magnetic Mechanical Snap",
      "Molded Interior Acoustic Vault",
      "Water-Repellent Sealed Zipper Trim",
    ],
    specs: [
      { label: "Exterior Shell", value: "Anodized 6063 Aluminum & Ballistic Weave" },
      { label: "Interior Lining", value: "Anti-Scratch Acoustic Microfiber Foam" },
      { label: "Closure Mechanism", value: "Magnetic Latch + Weather-Resistant Seam" },
      { label: "Compatibility", value: "Audify Ultra 01, Studio Pro 02, Air ANC" },
      { label: "Storage Capacity", value: "Headset + 2 Cables + DAC Adapter + Charger" },
    ],
    variants: [
      {
        name: "Dark Titanium",
        colorKey: "dark-titanium",
        hex: "#2B2D31",
        image: "/images/headset-frame-382-crop.png",
        finishDescription: "Bead-blasted titanium gray aluminum with magnetic latch.",
      },
    ],
    boxContents: ["Audify Artisan Travel Case", "Microfiber Polishing Cloth"],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
  {
    id: "audify-silver-core-cable",
    slug: "audify-silver-core-cable",
    name: "Audify 4.4mm Silver-Core Cable",
    series: "Signal Purity",
    price: 69,
    category: "accessories",
    badge: "Ultra-Purity",
    badgeType: "default",
    rating: 4.95,
    reviewCount: 310,
    tagline: "8-Core Monocrystalline Silver-Plated Balanced Cable",
    description:
      "Zero-latency analog audio conduit. 8 braided cores of ultra-pure copper coated in 99.999% fine silver, eliminating signal degradation and transient smearing.",
    keyHighlights: [
      "8-Core Silver-Plated Monocrystalline Copper",
      "Gold-Plated 4.4mm Balanced Pentaconn Jack",
      "Dual 3.5mm Click-Lock Cup Terminations",
      "Ultra-Flexible Carbon-Damped Sheathing",
    ],
    specs: [
      { label: "Conductor Material", value: "99.999% Silver-Plated OCC Copper (8 Cores)" },
      { label: "Termination Plug", value: "4.4mm Balanced TRRRS (24K Gold-Plated)" },
      { label: "Headphone Plug", value: "Dual 3.5mm TRS with Precision Detents" },
      { label: "Cable Length", value: "1.5 Meters (4.9 Feet)" },
      { label: "Resistance", value: "< 0.012 Ω/m" },
    ],
    variants: [
      {
        name: "Braided Silver",
        colorKey: "silver",
        hex: "#CFD3D8",
        image: "/images/headset-variant-silver.webp",
        finishDescription: "Satin silver braided weave with milled aluminum splitters.",
      },
    ],
    boxContents: ["Audify 4.4mm Silver-Core Cable", "Leather Cable Tie"],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
  {
    id: "audify-memory-gel-cushions",
    slug: "audify-memory-gel-cushions",
    name: "Audify Cooling Gel Cushions (Pair)",
    series: "Ergonomics & Isolation",
    price: 49,
    category: "accessories",
    badge: "Breathable Seal",
    badgeType: "default",
    rating: 4.92,
    reviewCount: 540,
    tagline: "Dual-Density Gel Infused Acoustic Replacement Pads",
    description:
      "Breathable perforated lambskin paired with heat-dissipating cooling gel. Guarantees an airtight acoustic bass seal without heat buildup during long studio sessions.",
    keyHighlights: [
      "Dual-Density Cooling Memory Foam",
      "Perforated Italian Lambskin Surround",
      "Magnetic Snap-Lock Quick Alignment",
      "Optimized Bass Reflex Acoustic Chamber",
    ],
    specs: [
      { label: "Outer Material", value: "Micro-Perforated Italian Nappa Lambskin" },
      { label: "Internal Core", value: "High-Resilience Slow-Rebound Gel Memory Foam" },
      { label: "Mounting Type", value: "High-Flux Neodymium Magnetic Snap System" },
      { label: "Acoustic Attenuation", value: "-14 dB Passive High-Frequency Damping" },
    ],
    variants: [
      {
        name: "Onyx Black",
        colorKey: "black",
        hex: "#1A1A1A",
        image: "/images/variant-obsidian.png",
        finishDescription: "Jet black perforated lambskin with magnetic snap plate.",
      },
      {
        name: "Champagne Tan",
        colorKey: "tan",
        hex: "#B59E87",
        image: "/images/variant-dune.png",
        finishDescription: "Warm saddle tan perforated lambskin.",
      },
    ],
    boxContents: ["1 Pair Audify Cooling Gel Ear Pads (Left + Right)", "Instruction Card"],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
  {
    id: "audify-aluminum-stand",
    slug: "audify-aluminum-stand",
    name: "Audify Billet Aluminum Desk Stand",
    series: "Desk Architecture",
    price: 119,
    category: "accessories",
    badge: "Precision Milled",
    badgeType: "default",
    rating: 4.97,
    reviewCount: 410,
    tagline: "Weighted CNC Billet Aluminum Headset Pedestal",
    description:
      "Sculpted from 1.2 kilograms of bead-blasted aircraft aluminum. The contoured silicone cradle protects headband curvature while internal routing keeps audio cables pristine.",
    keyHighlights: [
      "1.2kg Solid Weighted Anti-Tip Base",
      "Anatomical Silicone Headband Cradle",
      "Hidden Magnetic Cable Dock",
      "Micro-Suction Nano Base Pad",
    ],
    specs: [
      { label: "Construction", value: "Solid CNC Milled 6061-T6 Aluminum" },
      { label: "Cradle Material", value: "Medical-Grade Anti-Static Silicone" },
      { label: "Height", value: "285 mm (11.2 Inches)" },
      { label: "Base Weight", value: "1,220 g (Ultra-Stable)" },
      { label: "Finish", value: "Micro-Bead Blasted Titanium Hard Anodized" },
    ],
    variants: [
      {
        name: "Titanium Matte",
        colorKey: "titanium",
        hex: "#383B40",
        image: "/images/headset-frame-382.png",
        finishDescription: "Matte titanium hard anodized finish.",
      },
    ],
    boxContents: [
      "Audify CNC Desk Stand",
      "Magnetic Cable Management Clip",
      "Hex Key & Spare Footings",
    ],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Instruments", count: PRODUCTS.length },
  {
    id: "flagship",
    label: "Flagship Over-Ear",
    count: PRODUCTS.filter((p) => p.category === "flagship").length,
  },
  {
    id: "studio",
    label: "Studio Reference",
    count: PRODUCTS.filter((p) => p.category === "studio").length,
  },
  {
    id: "hardware",
    label: "DAC & Amplification",
    count: PRODUCTS.filter((p) => p.category === "hardware").length,
  },
  {
    id: "accessories",
    label: "Accessories & Cables",
    count: PRODUCTS.filter((p) => p.category === "accessories").length,
  },
] as const;
