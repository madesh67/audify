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
  category: "headsets" | "headphones" | "speakers";
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
  // ==========================================
  // HEADSETS (8 Reference Instruments)
  // ==========================================
  {
    id: "audify-ultra",
    slug: "audify-ultra",
    name: "Audify Ultra",
    series: "Reference Wireless Series",
    price: 499,
    category: "headsets",
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
      "-42dB Hybrid Adaptive Active Noise Cancellation",
      "65-Hour Battery with 15-Minute Rapid Charge",
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
        image: "/images/headset-variant-obsidian.webp",
        finishDescription: "Deep light-absorbing black anodization with perforated Italian lambskin.",
      },
      {
        name: "Platinum Silver",
        colorKey: "silver",
        hex: "#D6D9DC",
        image: "/images/headset-variant-silver.webp",
        finishDescription: "Bead-blasted satin aluminum with cool mist acoustic memory foam.",
      },
      {
        name: "Champagne Dune",
        colorKey: "dune",
        hex: "#C8B39B",
        image: "/images/headset-variant-dune.webp",
        finishDescription: "Brushed bronze chassis paired with warm camel full-grain leather.",
      },
    ],
    boxContents: [
      "Audify Ultra Acoustic Headset",
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
    id: "audify-apex",
    slug: "audify-apex",
    name: "Audify Apex Wireless",
    series: "Spatial Acoustic Series",
    price: 429,
    category: "headsets",
    badge: "Spatial Audio",
    badgeType: "default",
    rating: 4.95,
    reviewCount: 1420,
    tagline: "Spatial Headset with Dynamic Head-Tracking",
    description:
      "Crafted with bespoke 42mm vapor-deposited graphene drivers and an onboard 9-axis inertial measurement unit for ultra-precise 3D spatial soundfield mapping and visceral low-end authority.",
    keyHighlights: [
      "42mm Vapor-Deposited Graphene Diaphragm",
      "9-Axis Dynamic Spatial Soundfield Tracking",
      "-40dB Dual-Feedforward Active Noise Cancellation",
      "55-Hour Playback with Ultra-Low Latency Mode",
    ],
    specs: [
      { label: "Transducer Type", value: "42mm Graphene-Coated Dynamic Driver" },
      { label: "Spatial Processing", value: "Real-Time 9-Axis Onboard IMU Head Tracker" },
      { label: "Frequency Range", value: "8 Hz – 42,000 Hz" },
      { label: "Total Harmonic Distortion", value: "< 0.05% @ 1 kHz" },
      { label: "Wireless Codecs", value: "LDAC, aptX Lossless, AAC, SBC" },
      { label: "Microphone Array", value: "5 Beamforming Mics with Wind Noise Guard" },
      { label: "Net Weight", value: "258g" },
    ],
    variants: [
      {
        name: "Matte Graphite",
        colorKey: "graphite",
        hex: "#24262B",
        image: "/images/products/apex-graphite.webp",
        finishDescription: "Vapor-honed dark graphite titanium finish with deep grey cushions.",
      },
      {
        name: "Glacier Frost",
        colorKey: "frost",
        hex: "#E2E6EA",
        image: "/images/products/apex-frost.webp",
        finishDescription: "Satin anodized silver chassis with frost microfiber breathable pads.",
      },
      {
        name: "Nordic Sand",
        colorKey: "sand",
        hex: "#C3B49E",
        image: "/images/products/apex-sand.webp",
        finishDescription: "Warm sand acoustic weave paired with brushed aluminum accents.",
      },
    ],
    boxContents: [
      "Audify Apex Wireless Headset",
      "Semi-Rigid Protective Travel Pod",
      "Shielded 3.5mm Analog Audio Cable",
      "USB-C Fast Charging Cable",
      "Quick Start Guide & Acoustic Spec Card",
    ],
    inStock: true,
    leadTime: "In Stock • Dispatch in 24 Hours",
    isFeatured: true,
  },
  {
    id: "audify-flow-anc",
    slug: "audify-flow-anc",
    name: "Audify Flow ANC",
    series: "Ultra-Light Mobility Series",
    price: 349,
    originalPrice: 399,
    category: "headsets",
    badge: "Featherlight Commute",
    badgeType: "emerald",
    rating: 4.93,
    reviewCount: 1890,
    tagline: "Ultra-Lightweight Travel Acoustic Headset",
    description:
      "Weighing only 215 grams, Audify Flow pairs dual-diaphragm composite dynamic drivers with intelligent acoustic isolation for continuous 16-hour intercontinental flights without fatigue.",
    keyHighlights: [
      "215g Featherlight Titanium & Composite Frame",
      "Intelligent Ambient Noise Suppression",
      "Multi-Point Bluetooth 5.4 with LDAC",
      "48-Hour Continuous High-Resolution Playback",
    ],
    specs: [
      { label: "Driver Size", value: "38mm Dual-Composite Titanium Transducer" },
      { label: "Frequency Range", value: "10 Hz – 40,000 Hz" },
      { label: "Noise Attenuation", value: "-38 dB Intelligent Adaptive Transparency" },
      { label: "Battery Endurance", value: "48 Hours (ANC Active) / 60 Hours (Standard)" },
      { label: "Weight", value: "215g" },
      { label: "Charging", value: "USB-C Fast Charge (10 min = 5 hours)" },
    ],
    variants: [
      {
        name: "Midnight Black",
        colorKey: "black",
        hex: "#151618",
        image: "/images/products/flow-black.webp",
        finishDescription: "Ultra-matte stealth coating with sweat-resistant memory pads.",
      },
      {
        name: "Arctic Silver",
        colorKey: "silver",
        hex: "#DCE0E5",
        image: "/images/products/flow-silver.webp",
        finishDescription: "Bead-blasted aerospace aluminum with cloud-soft padding.",
      },
      {
        name: "Desert Rose",
        colorKey: "rose",
        hex: "#BA9C8A",
        image: "/images/products/flow-rose.webp",
        finishDescription: "Earthy sandblasted rose bronze with premium contour headband.",
      },
    ],
    boxContents: [
      "Audify Flow ANC Headset",
      "Slim Magnetic Travel Pouch",
      "USB-C Charging Cable",
      "3.5mm Aux Cable",
      "Airplane Dual-Pin Audio Adapter",
    ],
    inStock: true,
    leadTime: "In Stock • Ships Same Day",
    isFeatured: false,
  },
  {
    id: "audify-command-pro",
    slug: "audify-command-pro",
    name: "Audify Command Pro",
    series: "Broadcast Communications Series",
    price: 389,
    category: "headsets",
    badge: "Broadcast Precision",
    badgeType: "default",
    rating: 4.97,
    reviewCount: 780,
    tagline: "Broadcast Headset with Detachable Acoustic Condenser",
    description:
      "Engineered for audio engineers, casters, and creators demanding immaculate vocal capture alongside reference monitoring. Features a 14mm studio capsule and zero-latency hardware sidetone.",
    keyHighlights: [
      "Supercardioid 14mm Broadcast Condenser Capsule",
      "40mm High-Flux Neodymium Transducers",
      "Zero-Latency Hardware Sidetone Wheel",
      "Dual Wireless 2.4GHz + Lossless USB-C Digital Mode",
    ],
    specs: [
      { label: "Capsule Type", value: "14mm Gold-Sputtered Supercardioid Condenser" },
      { label: "Mic Frequency Range", value: "20 Hz – 22,000 Hz" },
      { label: "Headphone Drivers", value: "40mm High-Flux Neodymium Transducers" },
      { label: "Connectivity", value: "2.4GHz Wireless USB Dongle + Lossless USB-C" },
      { label: "Battery Life", value: "42 Hours Continuous Transmission" },
      { label: "Chassis", value: "Machined Aluminum Yoke & Carbon Steel Headband" },
    ],
    variants: [
      {
        name: "Studio Onyx",
        colorKey: "onyx",
        hex: "#18191C",
        image: "/images/products/command-onyx.webp",
        finishDescription: "Non-reflective matte broadcast black with anti-fingerprint coating.",
      },
      {
        name: "Steel Gunmetal",
        colorKey: "gunmetal",
        hex: "#474B52",
        image: "/images/products/command-gunmetal.webp",
        finishDescription: "Brushed gunmetal alloy yoke with black acoustic mesh.",
      },
      {
        name: "Chalk Grey",
        colorKey: "chalk",
        hex: "#C5C8CE",
        image: "/images/products/command-chalk.webp",
        finishDescription: "Industrial matte light grey with high-durability ceramic finish.",
      },
    ],
    boxContents: [
      "Audify Command Pro Headset",
      "Detachable Supercardioid Boom Microphone",
      "2.4GHz Ultra-Low Latency USB-C Dongle",
      "Braided 2.0m Lossless USB-C Cable",
      "Foam Windscreen & Travel Pouch",
    ],
    inStock: true,
    leadTime: "In Stock • Batch Allocation Active",
    isFeatured: false,
  },
  {
    id: "audify-void-horizon",
    slug: "audify-void-horizon",
    name: "Audify Void Horizon",
    series: "Planar Immersion Series",
    price: 459,
    category: "headsets",
    badge: "Planar Magnetic",
    badgeType: "emerald",
    rating: 4.96,
    reviewCount: 920,
    tagline: "Planar Magnetic Ultra-Low Latency Reference Headset",
    description:
      "Fusing 50mm planar magnetic diaphragms with low-latency lossless wireless transmission. Unlocks instantaneous transient response, crystalline treble air, and deep sub-bass articulation.",
    keyHighlights: [
      "50mm Custom Planar Magnetic Transducers",
      "< 12ms Wireless Latency via 2.4GHz Digital Link",
      "Magnesium Alloy Gimbal Suspension",
      "24-Bit / 96kHz Lossless High-Resolution Audio",
    ],
    specs: [
      { label: "Transducer Type", value: "50mm Planar Magnetic (0.6µm Ultrathin Foil)" },
      { label: "Frequency Range", value: "6 Hz – 48,000 Hz" },
      { label: "Impedance", value: "28 Ω" },
      { label: "Wireless Latency", value: "< 12 ms Dedicated 2.4GHz Uncompressed" },
      { label: "Battery Playback", value: "38 Hours Continuous" },
      { label: "Weight", value: "295g" },
    ],
    variants: [
      {
        name: "Void Black",
        colorKey: "void",
        hex: "#0D0E10",
        image: "/images/products/void-black.webp",
        finishDescription: "Vantablack matte finish with real carbon fiber weave accents.",
      },
      {
        name: "Lunar Titanium",
        colorKey: "lunar",
        hex: "#8B919A",
        image: "/images/products/void-lunar.webp",
        finishDescription: "Natural brushed titanium with perforated black lambskin.",
      },
      {
        name: "Cosmic Dune",
        colorKey: "dune",
        hex: "#B9A48F",
        image: "/images/products/void-dune.webp",
        finishDescription: "Warm meteorite bronze with leather suspension strap.",
      },
    ],
    boxContents: [
      "Audify Void Horizon Planar Headset",
      "Magnetic Docking Display Cradle",
      "2.4GHz Wireless Transmitter Hub",
      "Braided 3.5mm Analog Cable",
      "USB-C Charging & Data Cable",
    ],
    inStock: true,
    leadTime: "In Stock • Priority Delivery",
    isFeatured: false,
  },
  {
    id: "audify-halo-wireless",
    slug: "audify-halo-wireless",
    name: "Audify Halo Wireless",
    series: "Urban Acoustic Series",
    price: 279,
    originalPrice: 319,
    category: "headsets",
    badge: "Urban Minimalist",
    badgeType: "default",
    rating: 4.91,
    reviewCount: 1340,
    tagline: "Minimalist Wireless Headset with Natural Transparency",
    description:
      "Distilled to the purest acoustic essentials: seamless continuous headband architecture, pressure-free memory ear cups, and intuitive tactile rotary dials. Tuned for natural vocal timber.",
    keyHighlights: [
      "Seamless Continuous Unibody Headband",
      "Custom 36mm Bio-Polymer Transducers",
      "Natural Transparency Awareness Mode",
      "40-Hour All-Day Fast-Charge Battery",
    ],
    specs: [
      { label: "Driver Size", value: "36mm Bio-Polymer Diaphragm" },
      { label: "Frequency Range", value: "12 Hz – 38,000 Hz" },
      { label: "Battery Playback", value: "40 Hours" },
      { label: "Wireless Protocol", value: "Bluetooth 5.4 Multipoint (AAC, SBC, LC3)" },
      { label: "Weight", value: "220g" },
    ],
    variants: [
      {
        name: "Obsidian Jet",
        colorKey: "jet",
        hex: "#141416",
        image: "/images/products/halo-jet.webp",
        finishDescription: "Satin obsidian black with liquid silicone comfort band.",
      },
      {
        name: "Pure Aluminum",
        colorKey: "aluminum",
        hex: "#D3D7DC",
        image: "/images/products/halo-aluminum.webp",
        finishDescription: "Natural anodized clear aluminum with mist cushions.",
      },
      {
        name: "Desert Terracotta",
        colorKey: "terracotta",
        hex: "#AC8C77",
        image: "/images/products/halo-terracotta.webp",
        finishDescription: "Earthy terracotta bronze with matching acoustic leather.",
      },
    ],
    boxContents: [
      "Audify Halo Wireless Headset",
      "Soft Microfiber Drawstring Sleeve",
      "USB-C to USB-C Charging Cable",
      "3.5mm Aux Audio Cable",
    ],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
  {
    id: "audify-strata-anc",
    slug: "audify-strata-anc",
    name: "Audify Strata ANC",
    series: "Dual-Chamber Series",
    price: 319,
    category: "headsets",
    badge: "Dual Chamber",
    badgeType: "default",
    rating: 4.94,
    reviewCount: 860,
    tagline: "Dual-Chamber Acoustic Isolation Headset",
    description:
      "Engineered with physical dual chambers that acoustically separate sub-bass resonance from critical vocal midrange clarity. Delivers thunderous depth without masking delicate harmonic overtones.",
    keyHighlights: [
      "Acoustic Dual-Chamber Ear Cup Geometry",
      "-38dB Active Noise Neutralization",
      "Memory Gel Thermal-Dissipating Cushions",
      "50-Hour Playback with Fast Top-Up",
    ],
    specs: [
      { label: "Acoustic Chamber", value: "Independent Dual-Cavity Bass/Mid Structure" },
      { label: "Driver Size", value: "40mm Multi-Layer Polymer Diaphragm" },
      { label: "Frequency Range", value: "8 Hz – 40,000 Hz" },
      { label: "Isolation", value: "-38 dB Adaptive ANC System" },
      { label: "Battery Life", value: "50 Hours (ANC On)" },
      { label: "Weight", value: "248g" },
    ],
    variants: [
      {
        name: "Stealth Onyx",
        colorKey: "onyx",
        hex: "#1B1C20",
        image: "/images/products/strata-onyx.webp",
        finishDescription: "Deep matte composite with dark chrome trim rings.",
      },
      {
        name: "Mercury Silver",
        colorKey: "mercury",
        hex: "#CBD0D7",
        image: "/images/products/strata-mercury.webp",
        finishDescription: "Polished chamfer edges with brushed silver ear cups.",
      },
      {
        name: "Sahara Clay",
        colorKey: "clay",
        hex: "#BCA691",
        image: "/images/products/strata-clay.webp",
        finishDescription: "Warm desert earth tone with perforated leather cushions.",
      },
    ],
    boxContents: [
      "Audify Strata ANC Headset",
      "Rigid Hard-Shell Travel Case",
      "USB-C Charging Cable",
      "3.5mm Gold-Plated Audio Cord",
    ],
    inStock: true,
    leadTime: "In Stock • Ships in 24 Hours",
    isFeatured: false,
  },
  {
    id: "audify-pulse-wireless",
    slug: "audify-pulse-wireless",
    name: "Audify Pulse Wireless",
    series: "Performance Bass Series",
    price: 249,
    category: "headsets",
    badge: "Dynamic Response",
    badgeType: "default",
    rating: 4.90,
    reviewCount: 1650,
    tagline: "Dynamic Precision Wireless Acoustic Headset",
    description:
      "Equipped with high-excursion 40mm bio-cellulose drivers and tuned acoustic bass exhaust ports. Tailored for authoritative low-end impact, crisp modern mixing, and all-day comfort.",
    keyHighlights: [
      "High-Excursion 40mm Dynamic Transducers",
      "Integrated Low-Noise Beamforming Microphones",
      "Ergonomic Swivel Collapsible Hinge",
      "60-Hour Maximum Playback Range",
    ],
    specs: [
      { label: "Transducer Type", value: "40mm High-Excursion Bio-Cellulose" },
      { label: "Frequency Range", value: "10 Hz – 36,000 Hz" },
      { label: "Bluetooth Version", value: "Bluetooth 5.4 (Low Energy Audio, AAC, SBC)" },
      { label: "Battery Capacity", value: "60 Hours Playback" },
      { label: "Weight", value: "235g" },
    ],
    variants: [
      {
        name: "Carbon Black",
        colorKey: "carbon",
        hex: "#18191B",
        image: "/images/products/pulse-carbon.webp",
        finishDescription: "Micro-textured carbon matte finish with plush memory pads.",
      },
      {
        name: "Titanium Grey",
        colorKey: "grey",
        hex: "#6B7079",
        image: "/images/products/pulse-grey.webp",
        finishDescription: "Industrial matte titanium with dark grey memory foam.",
      },
      {
        name: "Champagne Mist",
        colorKey: "mist",
        hex: "#C4B5A3",
        image: "/images/products/pulse-mist.webp",
        finishDescription: "Champagne anodized metal with warm sand accents.",
      },
    ],
    boxContents: [
      "Audify Pulse Wireless Headset",
      "Padded Travel Pouch",
      "USB-C Rapid Charging Cable",
      "3.5mm Straight Audio Cable",
    ],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },

  // ==========================================
  // HEADPHONES (4 Dedicated Studio Reference Models)
  // ==========================================
  {
    id: "audify-studio-pro",
    slug: "audify-studio-pro",
    name: "Audify Studio Pro",
    series: "Mastering Acoustic Series",
    price: 649,
    category: "headphones",
    badge: "Studio Mastering",
    badgeType: "default",
    rating: 4.97,
    reviewCount: 840,
    tagline: "Open-Back Planar Magnetic Reference Headphone",
    description:
      "Created for mixing and mastering engineers demanding uncompromising spatial coherence. 50mm ultra-thin planar magnetic diaphragm inside a resonance-damped magnesium open chassis.",
    keyHighlights: [
      "50mm Planar Magnetic Diaphragm (0.5µm Substrate)",
      "Open-Back Acoustic Transparency with Zero Back-Wave Reflection",
      "Balanced 4.4mm Pentaconn + 6.35mm Studio Connections",
      "Precision Magnesium Milled Open-Mesh Cup",
    ],
    specs: [
      { label: "Transducer Type", value: "50mm Planar Magnetic (0.5µm Substrate)" },
      { label: "Frequency Range", value: "4 Hz – 52,000 Hz" },
      { label: "Total Harmonic Distortion", value: "< 0.03% @ 1 kHz, 100 dB SPL" },
      { label: "Impedance", value: "32 Ω (High Sensitivity Direct Drive)" },
      { label: "Cup Enclosure", value: "Laser-Cut Open-Mesh Magnesium Alloy" },
      { label: "Cables Included", value: "Dual 3.5mm to 4.4mm Balanced + 6.35mm" },
      { label: "Net Weight", value: "310g" },
    ],
    variants: [
      {
        name: "Raw Magnesium",
        colorKey: "magnesium",
        hex: "#5C6068",
        image: "/images/products/studio-pro-magnesium.webp",
        finishDescription: "Satin vapor-deposited magnesium with open acoustic mesh.",
      },
    ],
    boxContents: [
      "Audify Studio Pro Headphone",
      "Hard Anodized Flight Case",
      "4.4mm Pentaconn Balanced Braided Cable (2.0m)",
      "3.5mm Single-Ended Studio Cable (2.0m)",
      "6.35mm Screw-On Gold Adapter",
      "Laboratory Sound Measurement Plot Certificate",
    ],
    inStock: true,
    leadTime: "In Stock • Batch No. 04 Allocated",
    isFeatured: true,
  },
  {
    id: "audify-linear-master",
    slug: "audify-linear-master",
    name: "Audify Linear Master",
    series: "Critical Tracking Series",
    price: 479,
    category: "headphones",
    badge: "Closed-Back Reference",
    badgeType: "default",
    rating: 4.95,
    reviewCount: 510,
    tagline: "Closed-Back Precision Studio Tracking Headphone",
    description:
      "Engineered with laser-tuned internal acoustic damping chambers to eradicate internal phase cancellation. Provides total isolation alongside a flat frequency curve from 10Hz to 42kHz.",
    keyHighlights: [
      "45mm Custom Matched Neodymium Transducers",
      "Acoustic Lab Calibrated ±0.5dB Flat Curve",
      "Replaceable Velour & Lambskin Cushion Pairs",
      "Detachable OFC Litz Cable Lock System",
    ],
    specs: [
      { label: "Driver Size", value: "45mm Matched Pair Dynamic Transducers" },
      { label: "Acoustic Principle", value: "Closed-Back Damped Studio Chamber" },
      { label: "Frequency Range", value: "10 Hz – 42,000 Hz" },
      { label: "Sensitivity", value: "102 dB SPL/mW" },
      { label: "Impedance", value: "64 Ω" },
      { label: "Net Weight", value: "285g" },
    ],
    variants: [
      {
        name: "Matte Studio Black",
        colorKey: "studio-black",
        hex: "#161719",
        image: "/images/products/linear-master-black.webp",
        finishDescription: "Non-reflective deep studio black finish with high-damping composite ear cups.",
      },
    ],
    boxContents: [
      "Audify Linear Master Headphone",
      "Molded EVA Transport Case",
      "3.0m Straight Studio Cable",
      "1.2m Portable Audio Cable",
      "Dual Cushion Sets (Acoustic Velour + Perforated Leather)",
    ],
    inStock: true,
    leadTime: "In Stock • Ready for Dispatch",
    isFeatured: false,
  },
  {
    id: "audify-open-acoustic",
    slug: "audify-open-acoustic",
    name: "Audify Open Acoustic",
    series: "Pure Transducer Series",
    price: 529,
    category: "headphones",
    badge: "Beryllium Driver",
    badgeType: "emerald",
    rating: 4.96,
    reviewCount: 430,
    tagline: "Beryllium Dynamic Open-Air Reference Headphone",
    description:
      "Hand-assembled in limited batches featuring solid vapor-deposited 40mm pure beryllium foil diaphragms. Experience lightning-fast micro-dynamics and a holographic, speaker-like acoustic soundstage.",
    keyHighlights: [
      "Pure Beryllium Vapor-Deposited Foil Drivers",
      "Open-Air Hexagonal Stainless Steel Grille",
      "Aircraft 6061 Billet Aluminum Yokes",
      "Individual Measurement & Plot Certificate",
    ],
    specs: [
      { label: "Diaphragm Material", value: "100% Pure Vapor-Deposited Beryllium Foil" },
      { label: "Acoustic Enclosure", value: "Open-Back Hexagonal Stainless Steel Mesh" },
      { label: "Frequency Range", value: "5 Hz – 50,000 Hz" },
      { label: "Impedance", value: "50 Ω" },
      { label: "THD+N", value: "< 0.02% @ 1kHz, 94dB" },
      { label: "Weight", value: "298g" },
    ],
    variants: [
      {
        name: "Satin Steel & Silver",
        colorKey: "steel-silver",
        hex: "#C8CCD2",
        image: "/images/products/open-acoustic-silver.webp",
        finishDescription: "Precision brushed steel yoke with polished perimeter bevels.",
      },
    ],
    boxContents: [
      "Audify Open Acoustic Headphone",
      "Solid Walnut Wood Display Pedestal",
      "Silver-Plated Balanced 4.4mm Cable",
      "3.5mm Single-Ended Cable with 6.35mm Adapter",
      "Laboratory Verification Certificate",
    ],
    inStock: true,
    leadTime: "Limited Production • Batch Allocation",
    isFeatured: false,
  },
  {
    id: "audify-field-monitor",
    slug: "audify-field-monitor",
    name: "Audify Field Monitor",
    series: "Location Sound Series",
    price: 299,
    category: "headphones",
    badge: "Location Sound",
    badgeType: "default",
    rating: 4.92,
    reviewCount: 670,
    tagline: "High-SPL Foldable Broadcast Monitoring Headphone",
    description:
      "Built for the rigors of field recording, ENG, and broadcast environments. Ultra-rugged reinforced composite chassis with 90-degree ear cup swivel for seamless single-ear cueing.",
    keyHighlights: [
      "High 128dB SPL Handling Without Breakup",
      "90-Degree Swivel Single-Ear Cue Mechanism",
      "Reinforced Spring-Steel Headband",
      "Coiled Studio Cable with 3.5mm Lock-Thread",
    ],
    specs: [
      { label: "Driver Size", value: "40mm Mylar/Titanium Hybrid Transducer" },
      { label: "Max SPL", value: "128 dB SPL" },
      { label: "Frequency Range", value: "12 Hz – 28,000 Hz" },
      { label: "Passive Isolation", value: "-26 dB High-Frequency Acoustic Damping" },
      { label: "Weight", value: "240g" },
    ],
    variants: [
      {
        name: "Industrial Black",
        colorKey: "industrial-black",
        hex: "#1F2023",
        image: "/images/products/field-monitor-black.webp",
        finishDescription: "High-durability textured polycarbonate with steel reinforcement.",
      },
    ],
    boxContents: [
      "Audify Field Monitor Headphone",
      "Weather-Resistant Ballistic Nylon Bag",
      "3.0m Coiled Cable with Threaded 6.35mm Adapter",
      "1.5m Straight Field Cable",
    ],
    inStock: true,
    leadTime: "In Stock • Ships Same Day",
    isFeatured: false,
  },

  // ==========================================
  // PORTABLE SPEAKERS (4 Acoustic Soundboxes — each with 3 Color Variants)
  // ==========================================
  {
    id: "audify-nomad",
    slug: "audify-nomad",
    name: "Audify Nomad Soundcore",
    series: "Acoustic Mobility Series",
    price: 199,
    category: "speakers",
    badge: "IP67 Waterproof",
    badgeType: "emerald",
    rating: 4.96,
    reviewCount: 1150,
    tagline: "Rugged Billet Aluminum Portable Acoustic Speaker",
    description:
      "Machined from an aircraft-grade aluminum cylinder paired with custom dual long-throw drivers and opposing passive radiators. Delivers room-filling acoustic presence in an IP67 waterproof enclosure.",
    keyHighlights: [
      "IP67 Submersible & Dustproof Architecture",
      "Dual Long-Throw Transducers + Opposing Bass Radiators",
      "TrueWireless Stereo Pairing with 2nd Unit",
      "28-Hour High-Efficiency Battery with USB-C Reverse Charging",
    ],
    specs: [
      { label: "Acoustic Transducers", value: "2x 45mm Neodymium Full-Range + Dual Passive Radiators" },
      { label: "Frequency Range", value: "52 Hz – 22,000 Hz" },
      { label: "Water & Dust Rating", value: "IP67 (Submersible up to 1m for 30 min)" },
      { label: "Battery Playback", value: "28 Hours (5,200 mAh High-Density Cell)" },
      { label: "Wireless Protocol", value: "Bluetooth 5.4, AAC, SBC, Broadcast Audio" },
      { label: "Materials", value: "Anodized 6063 Aluminum, Ballistic Acoustic Fabric" },
      { label: "Net Weight", value: "620g" },
    ],
    variants: [
      {
        name: "Obsidian Shadow",
        colorKey: "shadow",
        hex: "#1C1D20",
        image: "/images/products/nomad-shadow.webp",
        finishDescription: "Hard-coat black anodized cylinder with matching acoustic weave.",
      },
      {
        name: "Arctic Aluminum",
        colorKey: "arctic",
        hex: "#D3D7DD",
        image: "/images/products/nomad-arctic.webp",
        finishDescription: "Bead-blasted natural aluminum with silver accents.",
      },
      {
        name: "Dune Bronze",
        colorKey: "dune",
        hex: "#B59E87",
        image: "/images/products/nomad-dune.webp",
        finishDescription: "Warm bronze hard anodization with leather lanyard.",
      },
    ],
    boxContents: [
      "Audify Nomad Soundcore Speaker",
      "Reinforced Braided USB-C Charging Cable",
      "Italian Leather Removable Carry Strap",
      "Quick Setup Manual",
    ],
    inStock: true,
    leadTime: "In Stock • Ships in 24 Hours",
    isFeatured: true,
  },
  {
    id: "audify-roam",
    slug: "audify-roam",
    name: "Audify Roam Acoustic",
    series: "Pocket Precision Series",
    price: 149,
    category: "speakers",
    badge: "Ultra-Compact",
    badgeType: "default",
    rating: 4.93,
    reviewCount: 920,
    tagline: "Pocket Titanium Bluetooth Field Speaker",
    description:
      "Slim enough to slip into an inner jacket pocket yet powered by a neodymium micro-driver and planar acoustic diaphragm. High-clarity vocal intelligibility for travel, personal listening, and conference calls.",
    keyHighlights: [
      "Ultra-Slim 24mm Monoblock Profile",
      "Neodymium Acoustic Micro-Transducer",
      "CNC Laser-Micro-Perforated Grille",
      "18-Hour Continuous Playback Range",
    ],
    specs: [
      { label: "Transducer Type", value: "High-Flux Neodymium Micro-Driver + Planar Passive Plate" },
      { label: "Profile Thickness", value: "24 mm (Ultra-Slim Pocketable)" },
      { label: "Frequency Range", value: "70 Hz – 20,000 Hz" },
      { label: "Microphone", value: "Omnidirectional Clear-Voice Conference Mic" },
      { label: "Battery Playback", value: "18 Hours Continuous" },
      { label: "Weight", value: "310g" },
    ],
    variants: [
      {
        name: "Satin Silver",
        colorKey: "silver",
        hex: "#D7DBE0",
        image: "/images/products/roam-silver.webp",
        finishDescription: "Natural satin aluminum with tactile laser micro-perforations.",
      },
      {
        name: "Midnight Slate",
        colorKey: "slate",
        hex: "#222428",
        image: "/images/products/roam-slate.webp",
        finishDescription: "Dark slate grey hard anodized finish with matte perimeter.",
      },
      {
        name: "Desert Sand",
        colorKey: "sand",
        hex: "#C4B39F",
        image: "/images/products/roam-sand.webp",
        finishDescription: "Warm champagne desert finish with full-grain strap.",
      },
    ],
    boxContents: [
      "Audify Roam Acoustic Speaker",
      "USB-C Charging Cable",
      "Carabiner Carry Attachment",
      "Protective Felt Sleeve",
    ],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
  {
    id: "audify-monolith-360",
    slug: "audify-monolith-360",
    name: "Audify Monolith 360",
    series: "Spatial Dispersion Series",
    price: 269,
    category: "speakers",
    badge: "360° Omnidirectional",
    badgeType: "emerald",
    rating: 4.98,
    reviewCount: 740,
    tagline: "Radial Omnidirectional Portable Sound Sculpture",
    description:
      "Features an upward-firing acoustic lens that disperses uniform 360-degree high-fidelity audio across any room or terrace. Crafted with a spun metal conical body and an intuitive tactile touch dial.",
    keyHighlights: [
      "True 360-Degree Acoustic Wave Dispersion Lens",
      "Spun Titanium Conical Resonance Housing",
      "Touch-Sensitive Top Capacitive Dial with LED Ring",
      "32-Hour Continuous Battery Playback",
    ],
    specs: [
      { label: "Acoustic Dispersion", value: "Patented 360° Parabolic Reflector Lens" },
      { label: "Drivers", value: "1x 3.5\" Downward Woofer + 1x 1\" Dome Tweeter" },
      { label: "Frequency Range", value: "45 Hz – 24,000 Hz" },
      { label: "Maximum SPL", value: "96 dB @ 1 Meter" },
      { label: "Battery Playback", value: "32 Hours High-Efficiency" },
      { label: "Enclosure", value: "Spun Billet Titanium Alloy" },
      { label: "Weight", value: "1,180g" },
    ],
    variants: [
      {
        name: "Smoked Bronze",
        colorKey: "bronze",
        hex: "#7B6756",
        image: "/images/products/monolith-bronze.webp",
        finishDescription: "Deep brushed smoked bronze with acoustic base cloth.",
      },
      {
        name: "Brushed Silver",
        colorKey: "silver",
        hex: "#D2D6DC",
        image: "/images/products/monolith-silver.webp",
        finishDescription: "Natural brushed aluminum with light grey acoustic fabric.",
      },
      {
        name: "Eclipse Black",
        colorKey: "black",
        hex: "#161719",
        image: "/images/products/monolith-black.webp",
        finishDescription: "Matte black anodization with stealth black base.",
      },
    ],
    boxContents: [
      "Audify Monolith 360 Speaker",
      "Fast-Charging Base Stand",
      "Braided 1.5m USB-C Power Cable",
      "Acoustic Calibration Manual",
    ],
    inStock: true,
    leadTime: "In Stock • Priority Courier Dispatch",
    isFeatured: true,
  },
  {
    id: "audify-core-soundbox",
    slug: "audify-core-soundbox",
    name: "Audify Core Soundbox",
    series: "Stereo Architectural Series",
    price: 219,
    category: "speakers",
    badge: "Stereo Acoustic",
    badgeType: "default",
    rating: 4.94,
    reviewCount: 830,
    tagline: "Billet Aluminum Stereo Travel Soundbox",
    description:
      "Equipped with dual discrete left/right acoustic channels inside a reinforced aluminum monocoque shell. Delivers genuine stereo separation and articulate instrument separation on the move.",
    keyHighlights: [
      "Discrete Left & Right Acoustic Chambers",
      "Dual 48mm Silk-Dome Balanced Transducers",
      "Lossless USB-C Audio Input + Bluetooth 5.4",
      "24-Hour Battery with Magnetic Dock Support",
    ],
    specs: [
      { label: "Configuration", value: "True 2.0 Stereo Channels (Isolated Enclosures)" },
      { label: "Transducers", value: "2x 48mm Neodymium Drivers + Dual Passive Radiators" },
      { label: "Frequency Range", value: "50 Hz – 22,000 Hz" },
      { label: "Inputs", value: "Bluetooth 5.4, Lossless USB-C Audio DAC, 3.5mm Aux" },
      { label: "Battery Playback", value: "24 Hours Continuous" },
      { label: "Chassis", value: "Single-Block Extruded 6063 Aluminum" },
      { label: "Weight", value: "780g" },
    ],
    variants: [
      {
        name: "Space Grey",
        colorKey: "space-grey",
        hex: "#303338",
        image: "/images/products/core-spacegrey.webp",
        finishDescription: "Space grey anodized monocoque frame with perforated grille.",
      },
      {
        name: "Pure Silver",
        colorKey: "silver",
        hex: "#DEE2E7",
        image: "/images/products/core-silver.webp",
        finishDescription: "Bead-blasted clear natural aluminum.",
      },
      {
        name: "Warm Dune",
        colorKey: "dune",
        hex: "#B8A593",
        image: "/images/products/core-dune.webp",
        finishDescription: "Warm dune titanium finish with Italian leather strap.",
      },
    ],
    boxContents: [
      "Audify Core Soundbox Speaker",
      "Detachable Top Grain Leather Strap",
      "USB-C to USB-C Lossless Audio & Charging Cable",
      "3.5mm Aux Cable",
    ],
    inStock: true,
    leadTime: "In Stock",
    isFeatured: false,
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Instruments", count: PRODUCTS.length },
  {
    id: "headsets",
    label: "Headsets",
    count: PRODUCTS.filter((p) => p.category === "headsets").length,
  },
  {
    id: "headphones",
    label: "Headphones",
    count: PRODUCTS.filter((p) => p.category === "headphones").length,
  },
  {
    id: "speakers",
    label: "Portable Speakers",
    count: PRODUCTS.filter((p) => p.category === "speakers").length,
  },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentId: string, limit = 3): Product[] {
  const current = PRODUCTS.find((p) => p.id === currentId);
  if (!current) return PRODUCTS.slice(0, limit);

  // Prioritize instruments in the same category or adjacent categories
  const sameCat = PRODUCTS.filter(
    (p) => p.id !== currentId && p.category === current.category
  );
  if (sameCat.length >= limit) {
    return sameCat.slice(0, limit);
  }

  const others = PRODUCTS.filter(
    (p) => p.id !== currentId && p.category !== current.category
  );
  return [...sameCat, ...others].slice(0, limit);
}
