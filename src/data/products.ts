export const products = [
  // 1. Business Cards & Identity
  {
    id: "business-cards",
    name: "Business Cards",
    icon: "Briefcase",
    image: "/images/business-cards.png",
    subcategories: [
      { id: "bc-standard", name: "Standard Business Cards" },
      { id: "bc-die-cut", name: "Die-Cut Business Cards" },
      { id: "bc-foil", name: "Foil Accent Cards" },
      { id: "bc-plastic", name: "Plastic / PVC ID Cards" },
      { id: "bc-folded", name: "Folded Business Cards" },
      { id: "bc-magnetic", name: "Magnetic Business Cards" },
    ]
  },
  
  // 2. Marketing Materials
  {
    id: "marketing",
    name: "Marketing Materials",
    icon: "Megaphone",
    image: "/images/letterhead.png", // Generic paper placeholder
    subcategories: [
      { id: "mkt-flyers", name: "Flyers & Leaflets" },
      { id: "mkt-brochures", name: "Tri-Fold Brochures" },
      { id: "mkt-postcards", name: "Postcards (Direct Mail)" },
      { id: "mkt-rack-cards", name: "Rack Cards" },
      { id: "mkt-menus", name: "Menus & Rate Cards" },
      { id: "mkt-door-hangers", name: "Door Hangers" },
      { id: "mkt-newsletters", name: "Newsletters / Bulletins" },
    ]
  },

  // 3. Signs & Large Format
  {
    id: "signs-banners",
    name: "Signs & Banners",
    icon: "Image",
    image: "/images/banner.png",
    subcategories: [
      { id: "sgn-vinyl-banner", name: "Vinyl Banners (Outdoor)" },
      { id: "sgn-retractable", name: "Retractable Banners (Roll-up)" },
      { id: "sgn-mesh", name: "Mesh Banners (Wind Resistant)" },
      { id: "sgn-posters", name: "Large Format Posters" },
      { id: "sgn-yard", name: "Corrugated Yard Signs" },
      { id: "sgn-aluminum", name: "Aluminum / Metal Signs" },
      { id: "sgn-foamcore", name: "Foamcore Boards" },
      { id: "sgn-window", name: "Window Graphics / Clings" },
    ]
  },

  // 4. Labels & Stickers
  {
    id: "labels-stickers",
    name: "Labels & Stickers",
    icon: "Tag",
    image: "/images/business-cards.png", // Placeholder
    subcategories: [
      { id: "lbl-roll", name: "Roll Labels (Product)" },
      { id: "lbl-cut-to-size", name: "Cut-to-Size Stickers" },
      { id: "lbl-bumper", name: "Bumper Stickers" },
      { id: "lbl-clear", name: "Clear / Transparent Labels" },
      { id: "lbl-security", name: "Holographic Security Seals" },
    ]
  },

  // 5. Official Government Stationery
  {
    id: "gov-stationery",
    name: "Official Stationery",
    icon: "FileText",
    image: "/images/letterhead.png",
    subcategories: [
      { id: "gov-letterhead", name: "Official Letterheads (A4)" },
      { id: "gov-envelopes", name: "Envelopes (DL, C4, C5)" },
      { id: "gov-notepads", name: "Branded Notepads" },
      { id: "gov-folders", name: "Presentation Folders" },
      { id: "gov-certificates", name: "Award & Degree Certificates" },
      { id: "gov-ncr", name: "NCR Forms (2-Part, 3-Part)" },
      { id: "gov-id-badges", name: "Civil Service ID Badges" },
    ]
  },

  // 6. Apparel & Promo (Added for completeness)
  {
    id: "apparel-promo",
    name: "Apparel & Promo",
    icon: "Shirt",
    image: "/images/banner.png", // Generic promo placeholder
    subcategories: [
      { id: "app-tshirts", name: "T-Shirts (Campaign/Staff)" },
      { id: "app-caps", name: "Embroidered Caps" },
      { id: "app-polo", name: "Polo Shirts (Uniforms)" },
      { id: "prom-pens", name: "Branded Pens" },
      { id: "prom-lanyards", name: "Custom Lanyards" },
      { id: "prom-usb", name: "USB Drives" },
    ]
  }
];
