import { getAssetPath } from '../utils/paths';

export interface ProductItem {
  id: string;
  name: string;
  category: string; // e.g. "Living Room"
  categorySlug: string; // e.g. "living-room"
  subcategory: string; // e.g. "Cabinets"
  subcategorySlug: string; // e.g. "cabinets"
  material: string;
  finish: string;
  description: string;
  image: string;
  dimensions?: string;
  tags: string[];
}

export const productsData: ProductItem[] = [
  // --- LIVING ROOM ---
  {
    id: "prod-cab-01",
    name: "Artisan Solid Wood Lattice Cabinet",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Cabinets",
    subcategorySlug: "cabinets",
    material: "Solid Mango Wood & Brass Hardware",
    finish: "Hand-Rubbed Walnut Patina",
    description: "Handcrafted storage cabinet featuring perforated floral jali panels, dual interior shelves, and magnetic latches.",
    image: getAssetPath("/images/sub_cabinets.jpg"),
    dimensions: "95 cm (W) x 42 cm (D) x 130 cm (H)",
    tags: ["Living Room", "Cabinets", "Storage", "Jali"]
  },
  {
    id: "prod-side-01",
    name: "Heritage Multi-Door Timber Sideboard",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Sideboards",
    subcategorySlug: "sideboards",
    material: "Solid Teak & Acacia",
    finish: "Muted Antique Honey Luster",
    description: "Four-door credential sideboard with hand-chiseled concentric geometric carvings and soft-close concealed hinges.",
    image: getAssetPath("/images/sub_sideboards.jpg"),
    dimensions: "160 cm (W) x 45 cm (D) x 85 cm (H)",
    tags: ["Living Room", "Sideboards", "Credenza", "Carved"]
  },
  {
    id: "prod-draw-01",
    name: "Colonial 6-Drawer Artisan Chest",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Chest Of Drawers",
    subcategorySlug: "chest-of-drawers",
    material: "Seasoned Solid Hardwood",
    finish: "Distressed Espresso Wax Polish",
    description: "Generous six-drawer dresser with dovetailed drawer boxes, fluted bracket feet, and solid brass pull rings.",
    image: getAssetPath("/images/sub_drawers.jpg"),
    dimensions: "110 cm (W) x 48 cm (D) x 115 cm (H)",
    tags: ["Living Room", "Chest Of Drawers", "Dresser", "Storage"]
  },
  {
    id: "prod-tv-01",
    name: "Acoustic Slat Wooden T.V. Credenza",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "T.V. Units",
    subcategorySlug: "tv-units",
    material: "Selected Mango Wood & Iron Base",
    finish: "Warm Walnut & Matte Black",
    description: "Low-profile media entertainment unit with cord management ports, open media bays, and slatted ventilation doors.",
    image: getAssetPath("/images/sub_tv_units.jpg"),
    dimensions: "180 cm (W) x 45 cm (D) x 52 cm (H)",
    tags: ["Living Room", "T.V. Units", "Media Console", "Entertainment"]
  },
  {
    id: "prod-con-01",
    name: "Artisanal Carved Hallway Console Table",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Console Tables",
    subcategorySlug: "console-tables",
    material: "Solid Mango & Teak",
    finish: "Hand-Rubbed Walnut Patina",
    description: "Gracefully proportioned console table showcasing deep relief floral scrollwork and handcrafted cabriole legs.",
    image: getAssetPath("/images/sub_console_tables.jpg"),
    dimensions: "140 cm (W) x 42 cm (D) x 85 cm (H)",
    tags: ["Living Room", "Console Tables", "Carved", "Accent"]
  },
  {
    id: "prod-end-01",
    name: "Turned Pedestal End Table",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Side/End Tables",
    subcategorySlug: "side-end-tables",
    material: "Natural Mango Wood",
    finish: "Organic Matte Clear Coat",
    description: "Sculptural round accent table with a massive turned baluster column base and beveled solid wood top.",
    image: getAssetPath("/images/sub_end_tables.jpg"),
    dimensions: "50 cm (Dia) x 60 cm (H)",
    tags: ["Living Room", "Side/End Tables", "Accent", "Turned Wood"]
  },
  {
    id: "prod-cof-01",
    name: "Rustic Parquet Coffee Table",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Coffee Tables",
    subcategorySlug: "coffee-tables",
    material: "Solid Reclaimed Timber & Mango Wood",
    finish: "Natural Wax Luster",
    description: "Statement cocktail table displaying a hand-laid geometric chevron wood parquet surface and reinforced stretcher base.",
    image: getAssetPath("/images/sub_coffee_tables.jpg"),
    dimensions: "120 cm (L) x 70 cm (W) x 45 cm (H)",
    tags: ["Living Room", "Coffee Tables", "Parquet", "Solid Wood"]
  },
  {
    id: "prod-shf-01",
    name: "Architectural Etagere Bookshelf",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Shelves/Racks",
    subcategorySlug: "shelves-racks",
    material: "Solid Timber & Antique Iron Frame",
    finish: "Warm Golden Teak Stain",
    description: "Five-tier open display bookcase designed for showcasing art pieces, books, and heirloom ceramics.",
    image: getAssetPath("/images/sub_shelves.jpg"),
    dimensions: "100 cm (W) x 38 cm (D) x 190 cm (H)",
    tags: ["Living Room", "Shelves/Racks", "Bookshelf", "Display"]
  },
  {
    id: "prod-trk-01",
    name: "Royal Rajasthani Dowry Trunk",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Trunks",
    subcategorySlug: "trunks",
    material: "Solid Hardwood with Brass Medallions",
    finish: "Antique Patina & Wax Seal",
    description: "Traditional storage trunk with decorative repousse brass motifs, heavy forged side handles, and safety stay hinges.",
    image: getAssetPath("/images/sub_trunks.jpg"),
    dimensions: "90 cm (L) x 50 cm (W) x 50 cm (H)",
    tags: ["Living Room", "Trunks", "Brass Work", "Heritage"]
  },
  {
    id: "prod-mir-01",
    name: "Heritage Jali Carved Wall Mirror",
    category: "Living Room",
    categorySlug: "living-room",
    subcategory: "Mirror/Wall Decor",
    subcategorySlug: "mirror-wall-decor",
    material: "Solid Wood Frame & Beveled Mirror",
    finish: "Antique Gold & Walnut Tint",
    description: "Regal arched mirror framed by deep hand-chiselled lattice screens and ornamental finials.",
    image: getAssetPath("/images/sub_mirrors.jpg"),
    dimensions: "80 cm (W) x 120 cm (H) x 4 cm (D)",
    tags: ["Living Room", "Mirror/Wall Decor", "Mirror", "Wall Art"]
  },

  // --- BEDROOM ---
  {
    id: "prod-bed-01",
    name: "King Artisanal Platform Bed Frame",
    category: "Bedroom",
    categorySlug: "bedroom",
    subcategory: "Beds",
    subcategorySlug: "beds",
    material: "Grade-A Seasoned Teak Wood",
    finish: "Natural Satin Oil Rub",
    description: "Solid wood platform bed with mortise-and-tenon construction, robust slats, and integrated low-profile perimeter rails.",
    image: getAssetPath("/images/sub_beds.jpg"),
    dimensions: "195 cm (W) x 215 cm (L) x 110 cm (H)",
    tags: ["Bedroom", "Beds", "King Size", "Solid Wood"]
  },
  {
    id: "prod-hdb-01",
    name: "Mandala Relief Carved Headboard",
    category: "Bedroom",
    categorySlug: "bedroom",
    subcategory: "Headboards",
    subcategorySlug: "headboards",
    material: "Solid Mango Wood",
    finish: "Bleached White & Natural Patina",
    description: "Hand-sculpted circular mandala headboard featuring intricate botanical chiseling and mounting hardware.",
    image: getAssetPath("/images/sub_headboards.jpg"),
    dimensions: "185 cm (W) x 120 cm (H) x 5 cm (D)",
    tags: ["Bedroom", "Headboards", "Carved", "Mandala"]
  },
  {
    id: "prod-bsd-01",
    name: "Heritage Single Drawer Bedside Table",
    category: "Bedroom",
    categorySlug: "bedroom",
    subcategory: "Bedside Tables",
    subcategorySlug: "bedside-tables",
    material: "Solid Acacia & Mango Wood",
    finish: "Warm Honey Patina",
    description: "Charming nightstand with a smooth-gliding storage drawer and lower shelf for nighttime essentials.",
    image: getAssetPath("/images/sub_bedside_tables.jpg"),
    dimensions: "45 cm (W) x 40 cm (D) x 60 cm (H)",
    tags: ["Bedroom", "Bedside Tables", "Nightstand", "Storage"]
  },

  // --- DINING ROOM ---
  {
    id: "prod-dt-01",
    name: "Grand Trestle Solid Timber Dining Table",
    category: "Dining Room",
    categorySlug: "dining-room",
    subcategory: "Dining Tables",
    subcategorySlug: "dining-tables",
    material: "Solid Teak & Reclaimed Timber",
    finish: "Natural Protective Poly-Coat",
    description: "Stately 8-seater dining table with breadboard-ended top and traditional mortise-and-tenon trestle legs.",
    image: getAssetPath("/images/sub_dining_tables.jpg"),
    dimensions: "240 cm (L) x 100 cm (W) x 78 cm (H)",
    tags: ["Dining Room", "Dining Tables", "8-Seater", "Solid Wood"]
  },
  {
    id: "prod-dc-01",
    name: "Artisan Turned Spindle Dining Chair",
    category: "Dining Room",
    categorySlug: "dining-room",
    subcategory: "Dining Chairs",
    subcategorySlug: "dining-chairs",
    material: "Seasoned Solid Hardwood",
    finish: "Hand-Rubbed Walnut Tint",
    description: "Sculpted curved backrest with hand-turned vertical spindles and a contoured wooden comfort seat.",
    image: getAssetPath("/images/sub_dining_chairs.jpg"),
    dimensions: "48 cm (W) x 52 cm (D) x 90 cm (H)",
    tags: ["Dining Room", "Dining Chairs", "Turned Wood", "Seating"]
  },
  {
    id: "prod-ds-01",
    name: "Complete Royal 7-Piece Dining Suite",
    category: "Dining Room",
    categorySlug: "dining-room",
    subcategory: "Dining Sets",
    subcategorySlug: "dining-sets",
    material: "Kiln-Dried Mango Hardwood",
    finish: "Warm Golden Brown Luster",
    description: "Harmoniously paired solid wood dining table with 6 matching artisan dining chairs engineered for export durability.",
    image: getAssetPath("/images/sub_dining_sets.jpg"),
    dimensions: "Table: 200 x 95 x 77 cm | 6 Chairs",
    tags: ["Dining Room", "Dining Sets", "Dining Suite", "Full Set"]
  },

  // --- SEATING ---
  {
    id: "prod-sof-01",
    name: "Sculpted Hardwood Club Armchair",
    category: "Seating",
    categorySlug: "seating",
    subcategory: "Sofas/Arm Chairs",
    subcategorySlug: "sofas-arm-chairs",
    material: "Solid Acacia Frame & Linen Upholstery",
    finish: "Natural Matte Wood & Warm Cream",
    description: "Deep lounge club chair featuring broad carved timber armrests, down-blend cushions, and reinforced frame joints.",
    image: getAssetPath("/images/sub_sofas.jpg"),
    dimensions: "85 cm (W) x 88 cm (D) x 82 cm (H)",
    tags: ["Seating", "Sofas/Arm Chairs", "Lounge", "Upholstered"]
  },
  {
    id: "prod-chr-01",
    name: "Classic Colonial Reading Chair",
    category: "Seating",
    categorySlug: "seating",
    subcategory: "Chairs",
    subcategorySlug: "chairs",
    material: "Solid Teak Wood",
    finish: "Antiqued Walnut Finish",
    description: "Timeless library accent chair featuring ergonomic lumbar slats and gentle curved arm rails.",
    image: getAssetPath("/images/sub_chairs.jpg"),
    dimensions: "62 cm (W) x 64 cm (D) x 86 cm (H)",
    tags: ["Seating", "Chairs", "Accent Chair", "Solid Wood"]
  },
  {
    id: "prod-stl-01",
    name: "Turned Timber Three-Legged Stool",
    category: "Seating",
    categorySlug: "seating",
    subcategory: "Stools",
    subcategorySlug: "stools",
    material: "Single Log Solid Mango Wood",
    finish: "Hand-Burnished Natural Wax",
    description: "Compact accent occasional stool sculpted with an ergonomic dished seat and wedged tenon legs.",
    image: getAssetPath("/images/sub_stools.jpg"),
    dimensions: "36 cm (Dia) x 45 cm (H)",
    tags: ["Seating", "Stools", "Compact", "Solid Wood"]
  },
  {
    id: "prod-bnc-01",
    name: "Slatted Entryway Bench with Storage",
    category: "Seating",
    categorySlug: "seating",
    subcategory: "Benches",
    subcategorySlug: "benches",
    material: "Solid Mango & Reclaimed Wood",
    finish: "Distressed Walnut",
    description: "Versatile wooden bench ideal for dining tables or foyers, featuring hand-planed top edges and under-shelf.",
    image: getAssetPath("/images/sub_benches.jpg"),
    dimensions: "150 cm (L) x 40 cm (D) x 48 cm (H)",
    tags: ["Seating", "Benches", "Entryway", "Dining Bench"]
  },
  {
    id: "prod-dyb-01",
    name: "Imperial Indian Carved Day Bed",
    category: "Seating",
    categorySlug: "seating",
    subcategory: "Day Beds",
    subcategorySlug: "day-beds",
    material: "Solid Teak Wood & Cotton Mattress",
    finish: "Heritage Brown Tint",
    description: "Traditional diwan day bed with turned ball finials, open spindle balustrades, and removable firm bolster.",
    image: getAssetPath("/images/sub_daybeds.jpg"),
    dimensions: "190 cm (L) x 85 cm (W) x 75 cm (H)",
    tags: ["Seating", "Day Beds", "Diwan", "Traditional"]
  },
  {
    id: "prod-pof-01",
    name: "Leather & Timber Footed Pouf",
    category: "Seating",
    categorySlug: "seating",
    subcategory: "Poufs/Ottomans",
    subcategorySlug: "poufs-ottomans",
    material: "Top-Grain Saddle Leather & Teak Feet",
    finish: "Aged Cognac & Dark Walnut",
    description: "Hand-stitched leather ottoman resting on turned solid wooden bun feet with dense supportive fill.",
    image: getAssetPath("/images/sub_poufs.jpg"),
    dimensions: "55 cm (W) x 55 cm (D) x 42 cm (H)",
    tags: ["Seating", "Poufs/Ottomans", "Leather", "Footrest"]
  },

  // --- BAR FURNITURE ---
  {
    id: "prod-bt-01",
    name: "Industrial Solid Timber High Bar Table",
    category: "Bar Furniture",
    categorySlug: "bar-furniture",
    subcategory: "Bar Tables",
    subcategorySlug: "bar-tables",
    material: "Thick Solid Mango Slab & Iron Trestle",
    finish: "Water-Resistant Matte Polyurethane",
    description: "Counter-height gathering table with heavy live-edge timber top and powder-coated cast iron foot stretcher.",
    image: getAssetPath("/images/sub_bar_tables.jpg"),
    dimensions: "150 cm (L) x 60 cm (W) x 105 cm (H)",
    tags: ["Bar Furniture", "Bar Tables", "High Top", "Hospitality"]
  },
  {
    id: "prod-bs-01",
    name: "Swivel Saddle Solid Wood Bar Stool",
    category: "Bar Furniture",
    categorySlug: "bar-furniture",
    subcategory: "Bar Stool/Chairs",
    subcategorySlug: "bar-stool-chairs",
    material: "Solid Hardwood Selection",
    finish: "Hand-Buffed Wax Patina",
    description: "Pub-height bar stool featuring full 360-degree silent swivel bearing, contoured saddle seat, and brass kick-plates.",
    image: getAssetPath("/images/sub_bar_stools.jpg"),
    dimensions: "42 cm (W) x 42 cm (D) x 76 cm (H)",
    tags: ["Bar Furniture", "Bar Stool/Chairs", "Swivel", "Stool"]
  },
  {
    id: "prod-bc-01",
    name: "Commercial Grade Wooden Bar Counter",
    category: "Bar Furniture",
    categorySlug: "bar-furniture",
    subcategory: "Bar Counters",
    subcategorySlug: "bar-counters",
    material: "Solid Teak & Reclaimed Truck Timber",
    finish: "Spill-Proof Clear Finish",
    description: "Complete service bar counter with bartender work surface, interior bottle racks, locked drawer, and customer footrest.",
    image: getAssetPath("/images/sub_bar_counters.jpg"),
    dimensions: "180 cm (W) x 65 cm (D) x 110 cm (H)",
    tags: ["Bar Furniture", "Bar Counters", "Home Bar", "Commercial"]
  },
  {
    id: "prod-bct-01",
    name: "Mobile Wooden Bar Trolley & Cart",
    category: "Bar Furniture",
    categorySlug: "bar-furniture",
    subcategory: "Bar Cabinets/Trolleys",
    subcategorySlug: "bar-cabinets-trolleys",
    material: "Solid Hardwood & Brass Casters",
    finish: "Warm Walnut Polish",
    description: "Two-tiered rolling beverage service trolley with perimeter brass gallery rails and 6-bottle rack.",
    image: getAssetPath("/images/sub_bar_cabinets.jpg"),
    dimensions: "80 cm (L) x 45 cm (W) x 85 cm (H)",
    tags: ["Bar Furniture", "Bar Cabinets/Trolleys", "Bar Cart", "Mobile"]
  },
  {
    id: "prod-wb-01",
    name: "Artisan Geometric Timber Wine Rack",
    category: "Bar Furniture",
    categorySlug: "bar-furniture",
    subcategory: "Wine Bottle Holders",
    subcategorySlug: "wine-bottle-holders",
    material: "Solid Teak Wood",
    finish: "Organic Danish Oil",
    description: "Modular tabletop wine holder cradling up to 12 wine bottles securely with chiseled angled notches.",
    image: getAssetPath("/images/sub_wine_holders.jpg"),
    dimensions: "45 cm (W) x 25 cm (D) x 38 cm (H)",
    tags: ["Bar Furniture", "Wine Bottle Holders", "Wine Rack", "Tabletop"]
  },

  // --- OUTDOOR ---
  {
    id: "prod-gt-01",
    name: "Folding Outdoor Teak Garden Table",
    category: "Outdoor",
    categorySlug: "outdoor",
    subcategory: "Garden Table",
    subcategorySlug: "garden-table",
    material: "Grade-A Weatherproof Teak",
    finish: "Natural Outdoor Teak Shield",
    description: "Foldable solid teak round patio table with parasol hole and heavy-gauge brass folding mechanisms.",
    image: getAssetPath("/images/sub_garden_table.jpg"),
    dimensions: "120 cm (Dia) x 75 cm (H)",
    tags: ["Outdoor", "Garden Table", "Folding", "Teak"]
  },
  {
    id: "prod-gb-01",
    name: "Classic Veranda Slatted Garden Bench",
    category: "Outdoor",
    categorySlug: "outdoor",
    subcategory: "Chair, Armchair, Bench",
    subcategorySlug: "chair-armchair-bench",
    material: "Kiln-Dried Solid Teak",
    finish: "UV-Resistant Protective Sealant",
    description: "Timeless 3-seater garden bench with ergonomic curved seat slats and broad armrests built for all weather conditions.",
    image: getAssetPath("/images/sub_garden_benches.jpg"),
    dimensions: "155 cm (L) x 62 cm (D) x 92 cm (H)",
    tags: ["Outdoor", "Chair, Armchair, Bench", "Garden Bench", "Weatherproof"]
  },
  {
    id: "prod-gf-01",
    name: "Resort Teak Lounge Set with Ottoman",
    category: "Outdoor",
    categorySlug: "outdoor",
    subcategory: "Garden Furniture",
    subcategorySlug: "garden-furniture",
    material: "Solid Teak Wood & Quick-Dry Foam",
    finish: "Marine Grade Outdoor Oil",
    description: "Patio relaxation suite featuring deep-seating armchairs, coordinating ottoman, and side drink stand.",
    image: getAssetPath("/images/sub_garden_furniture.jpg"),
    dimensions: "Armchair: 80 x 85 x 75 cm | Ottoman: 60 x 50 x 40 cm",
    tags: ["Outdoor", "Garden Furniture", "Lounge Set", "Resort"]
  }
];

export const getProductsBySubcategory = (categorySlug: string, subcategorySlug: string) => {
  return productsData.filter(
    (p) =>
      p.categorySlug.toLowerCase() === categorySlug.toLowerCase() &&
      p.subcategorySlug.toLowerCase() === subcategorySlug.toLowerCase()
  );
};

export const getProductsByCategory = (categorySlug: string) => {
  if (categorySlug.toLowerCase() === 'all' || categorySlug.toLowerCase() === 'all products') {
    return productsData;
  }
  return productsData.filter(
    (p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
};
