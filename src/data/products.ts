import { getAssetPath } from '../utils/paths';

export interface ProductItem {
  id: string;
  name: string;
  category: 'Living Room' | 'Bedroom' | 'Dining Room' | 'Seating' | 'Bar Furniture' | 'Outdoor' | string;
  material: string;
  finish: string;
  description: string;
  image: string;
  dimensions?: string;
  tags: string[];
}

export const productsData: ProductItem[] = [
  // Living Room
  {
    id: "prod-lr-01",
    name: "Artisanal Carved Console Table",
    category: "Living Room",
    material: "Solid Mango & Teak Hardwood",
    finish: "Hand-Rubbed Walnut Patina",
    description: "Gracefully proportioned console table showcasing deep relief floral scrollwork and handcrafted cabriole legs inspired by traditional architecture.",
    image: getAssetPath("/images/furniture.jpg"),
    dimensions: "140 cm (W) x 45 cm (D) x 85 cm (H)",
    tags: ["Living", "Console", "Carved", "Accent"]
  },
  {
    id: "prod-lr-02",
    name: "Heritage Jali Carved Wall Panel",
    category: "Living Room",
    material: "Selected Fine Wood",
    finish: "Antique Gold & Walnut Tint",
    description: "Geometric and floral perforated screen panel hand-chiselled with fine precision, suited for hotels, executive lounges, and accent walls.",
    image: getAssetPath("/images/wall_art.jpg"),
    dimensions: "90 cm (W) x 180 cm (H) x 5 cm (D)",
    tags: ["Living", "Wall Art", "Jali", "Architectural"]
  },
  {
    id: "prod-lr-03",
    name: "Sculpted Elephant Artifact with Brass Inlay",
    category: "Living Room",
    material: "Seasoned Wood with Brass Detailing",
    finish: "Hand-Buffed Wax Luster",
    description: "Symbol of strength and poise, hand-chiseled from a solid block of wood with delicate hand-fitted brass filigree detailing.",
    image: getAssetPath("/images/handicrafts.jpg"),
    dimensions: "35 cm (L) x 18 cm (W) x 28 cm (H)",
    tags: ["Living", "Sculpture", "Brass Inlay", "Handicraft"]
  },

  // Bedroom
  {
    id: "prod-bd-01",
    name: "Ornate Architectural Mirror Frame",
    category: "Bedroom",
    material: "Solid Timber Selection",
    finish: "Antique Gold Foil & Wood Finish",
    description: "Regal mirror frame featuring traditional arches, rosettes, and foliage motifs executed by experienced woodcarvers.",
    image: getAssetPath("/images/custom.jpg"),
    dimensions: "80 cm (W) x 120 cm (H)",
    tags: ["Bedroom", "Mirror", "Arch Style", "Accent"]
  },
  {
    id: "prod-bd-02",
    name: "Bespoke Inlaid Wood Keepsake Box",
    category: "Bedroom",
    material: "Fine Hardwood & Decorative Inlay",
    finish: "Smooth Lacquered Polish",
    description: "Classic commemorative decorative storage box featuring intricate botanical motifs and lined interior compartments.",
    image: getAssetPath("/images/traditional.jpg"),
    dimensions: "30 cm (L) x 20 cm (W) x 12 cm (H)",
    tags: ["Bedroom", "Box", "Giftware", "Artisanal"]
  },
  {
    id: "prod-bd-03",
    name: "Hand-Carved Heritage Bedside Credenza",
    category: "Bedroom",
    material: "Solid Oak & Acacia Hardwood",
    finish: "Muted Antique Patina",
    description: "Intricately detailed two-drawer nightstand with chiseled rosette drawer fronts and solid joinery.",
    image: getAssetPath("/images/slide2_collections.jpg"),
    dimensions: "60 cm (W) x 45 cm (D) x 65 cm (H)",
    tags: ["Bedroom", "Bedside", "Drawers", "Storage"]
  },

  // Dining Room
  {
    id: "prod-dn-01",
    name: "Hand-Turned Pedestal Fruit Centerpiece",
    category: "Dining Room",
    material: "Natural Mango Wood",
    finish: "Organic Matte Protective Polish",
    description: "Turned on a traditional lathe and subtly carved on its outer perimeter, balancing clean lines with tactile artisanal character.",
    image: getAssetPath("/images/decor.jpg"),
    dimensions: "38 cm (Dia) x 22 cm (H)",
    tags: ["Dining Room", "Accent", "Tabletop", "Turned Wood"]
  },
  {
    id: "prod-dn-02",
    name: "Artisan Plank Dining Table with Inlay",
    category: "Dining Room",
    material: "Solid Teak & Natural Wood Species",
    finish: "Natural Wax & Protective Poly-Coat",
    description: "Stately 8-seater dining table with solid breadboard-ended top, traditional mortise-and-tenon trestle base, and delicate brass accents.",
    image: getAssetPath("/images/about_european_interior.jpg"),
    dimensions: "240 cm (L) x 100 cm (W) x 78 cm (H)",
    tags: ["Dining Room", "Dining Table", "Solid Wood", "Hospitality"]
  },

  // Seating
  {
    id: "prod-st-01",
    name: "Traditional Hand-Carved Accent Armchair",
    category: "Seating",
    material: "Seasoned Acacia Hardwood",
    finish: "Warm Honey Wax Finish",
    description: "Ergonomically contoured solid wood armchair featuring relief-carved armrests, turned spindle supports, and sturdy joinery.",
    image: getAssetPath("/images/traditional.jpg"),
    dimensions: "68 cm (W) x 65 cm (D) x 95 cm (H)",
    tags: ["Seating", "Armchair", "Carved", "Accent"]
  },
  {
    id: "prod-st-02",
    name: "Heritage Slatted Hallway Bench",
    category: "Seating",
    material: "Solid Mango Wood & Reclaimed Timber",
    finish: "Distressed Walnut Luster",
    description: "Solid wooden bench with carved back splats, under-seat storage shelf, and hand-finished rounded edges.",
    image: getAssetPath("/images/slide1_heritage.jpg"),
    dimensions: "150 cm (L) x 48 cm (D) x 85 cm (H)",
    tags: ["Seating", "Bench", "Hallway", "Solid Wood"]
  },

  // Bar Furniture
  {
    id: "prod-br-01",
    name: "Reclaimed Wood Industrial Bar Cabinet",
    category: "Bar Furniture",
    material: "Old Sleeper Reclaimed Wood & Iron Accents",
    finish: "Rustic Matte Polyurethane Seal",
    description: "Multi-functional wine and spirits cabinet with stemware racks, internal bottle partitions, and character-rich reclaimed timber doors.",
    image: getAssetPath("/images/slide3_export.jpg"),
    dimensions: "110 cm (W) x 50 cm (D) x 105 cm (H)",
    tags: ["Bar Furniture", "Cabinet", "Reclaimed Wood", "Wine Storage"]
  },
  {
    id: "prod-br-02",
    name: "Artisan Turned High Bar Stool",
    category: "Bar Furniture",
    material: "Solid Teak & Mango Hardwood",
    finish: "Rich Dark Chocolate Polish",
    description: "Sturdy high-top bar stool featuring hand-turned circular seat, reinforced footrest stretchers, and non-slip pads.",
    image: getAssetPath("/images/craft_tools.jpg"),
    dimensions: "40 cm (Dia) x 76 cm (H)",
    tags: ["Bar Furniture", "Bar Stool", "Turned", "Solid Wood"]
  },

  // Outdoor
  {
    id: "prod-od-01",
    name: "Weather-Resistant Teak Garden Bench",
    category: "Outdoor",
    material: "Grade-A Seasoned Teak",
    finish: "Natural Outdoor Teak Oil Protection",
    description: "Timeless slatted garden bench constructed with mortise-and-tenon joints, built specifically to withstand varying climate conditions.",
    image: getAssetPath("/images/wall_art.jpg"),
    dimensions: "160 cm (L) x 60 cm (D) x 90 cm (H)",
    tags: ["Outdoor", "Garden Bench", "Teak", "Weather Resistant"]
  },
  {
    id: "prod-od-02",
    name: "Veranda Carved Plant Stand & Accent Pedestal",
    category: "Outdoor",
    material: "Kiln-Dried Hardwood",
    finish: "Water-Repellent Protective Coat",
    description: "Architectural carved pedestal designed for verandas, patios, and botanical entryways with ornamental fluted column carvings.",
    image: getAssetPath("/images/handicrafts.jpg"),
    dimensions: "35 cm (W) x 35 cm (D) x 80 cm (H)",
    tags: ["Outdoor", "Veranda", "Plant Stand", "Carved"]
  }
];
