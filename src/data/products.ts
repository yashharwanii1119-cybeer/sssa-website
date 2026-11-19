import { getAssetPath } from '../utils/paths';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  material: string;
  finish: string;
  description: string;
  image: string;
  dimensions?: string;
  tags: string[];
}

export const productsData: ProductItem[] = [
  {
    id: "prod-01",
    name: "Artisanal Carved Console Table",
    category: "Hand-Carved Furniture",
    material: "Solid Hardwood (Customizable)",
    finish: "Hand-Rubbed Walnut Patina",
    description: "Gracefully proportioned console table showcasing deep relief floral scrollwork and handcrafted cabriole legs inspired by traditional architecture.",
    image: getAssetPath("/images/furniture.jpg"),
    dimensions: "140 cm (W) x 45 cm (D) x 85 cm (H)",
    tags: ["Living", "Console", "Carved"]
  },
  {
    id: "prod-02",
    name: "Heritage Jali Carved Wall Panel",
    category: "Decorative Wooden Art",
    material: "Selected Fine Wood",
    finish: "Antique Gold & Walnut Tint",
    description: "Geometric and floral perforated screen panel hand-chiselled with fine precision, suited for hotels, executive lounges, and accent walls.",
    image: getAssetPath("/images/wall_art.jpg"),
    dimensions: "90 cm (W) x 180 cm (H) x 5 cm (D)",
    tags: ["Wall Art", "Jali", "Architectural"]
  },
  {
    id: "prod-03",
    name: "Sculpted Elephant Artifact with Brass Inlay",
    category: "Wooden Handicrafts",
    material: "Seasoned Wood with Brass Detailing",
    finish: "Hand-Buffed Wax Luster",
    description: "Symbol of strength and poise, hand-chiseled from a solid block of wood with delicate hand-fitted brass filigree detailing.",
    image: getAssetPath("/images/handicrafts.jpg"),
    dimensions: "35 cm (L) x 18 cm (W) x 28 cm (H)",
    tags: ["Sculpture", "Brass Inlay", "Handicraft"]
  },
  {
    id: "prod-04",
    name: "Hand-Turned Pedestal Fruit Centerpiece",
    category: "Wooden Home Décor",
    material: "Natural Wood Specie",
    finish: "Organic Matte Protective Polish",
    description: "Turned on a traditional lathe and subtly carved on its outer perimeter, balancing clean lines with tactile artisanal character.",
    image: getAssetPath("/images/decor.jpg"),
    dimensions: "38 cm (Dia) x 22 cm (H)",
    tags: ["Dining", "Accent", "Tabletop"]
  },
  {
    id: "prod-05",
    name: "Ornate Architectural Mirror Frame",
    category: "Hand-Carved Furniture",
    material: "Solid Timber Selection",
    finish: "Antique Gold Foil & Wood Finish",
    description: "Regal mirror frame featuring traditional arches, rosettes, and foliage motifs executed by experienced woodcarvers.",
    image: getAssetPath("/images/custom.jpg"),
    dimensions: "80 cm (W) x 120 cm (H)",
    tags: ["Mirror", "Arch Style", "Accent"]
  },
  {
    id: "prod-06",
    name: "Bespoke Inlaid Wood Keepsake Box",
    category: "Wooden Handicrafts",
    material: "Fine Hardwood & Decorative Inlay",
    finish: "Smooth Lacquered Polish",
    description: "Classic commemorative decorative storage box featuring intricate botanical motifs and lined interior compartments.",
    image: getAssetPath("/images/traditional.jpg"),
    dimensions: "30 cm (L) x 20 cm (W) x 12 cm (H)",
    tags: ["Box", "Giftware", "Artisanal"]
  }
];
