import { getAssetPath } from '../utils/paths';

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: string;
}

export const collectionsData: CollectionItem[] = [
  {
    id: "hand-carved-furniture",
    title: "Hand-Carved Furniture",
    subtitle: "Heritage & Living",
    description: "Intricately detailed console tables, dining ensembles, ornate headboards, and artisanal armoires carved from selected wood species.",
    image: getAssetPath("/images/furniture.jpg"),
    itemCount: "Catalogue Available"
  },
  {
    id: "wooden-handicrafts",
    title: "Wooden Handicrafts",
    subtitle: "Authentic Traditions",
    description: "Finely sculptured figures, ritual boxes, ornamental artifacts, and cultural woodcraft shaped by skilled craft artisans.",
    image: getAssetPath("/images/handicrafts.jpg"),
    itemCount: "Artisanal Pieces"
  },
  {
    id: "decorative-wooden-art",
    title: "Decorative Wooden Art",
    subtitle: "Sculptural Wall & Accent",
    description: "Statement relief panels, multi-layered jali fretwork, arches, and carved murals designed to elevate residences and commercial interiors.",
    image: getAssetPath("/images/wall_art.jpg"),
    itemCount: "Bespoke Panels"
  },
  {
    id: "wooden-home-decor",
    title: "Wooden Home Décor",
    subtitle: "Refined Accents",
    description: "Handcrafted trays, candle pillars, turned vessels, mirror frames, and tabletop accents with natural wax and polished finishes.",
    image: getAssetPath("/images/decor.jpg"),
    itemCount: "Accent Line"
  },
  {
    id: "traditional-craftsmanship",
    title: "Traditional Craftsmanship",
    subtitle: "Cultural Heritage",
    description: "Authentic classical Indian motifs, brass inlay woodwork, and relief carvings reflecting traditional hand-chiseled art forms.",
    image: getAssetPath("/images/traditional.jpg"),
    itemCount: "Heritage Line"
  },
  {
    id: "custom-wooden-creations",
    title: "Custom Wooden Creations",
    subtitle: "Bespoke Manufacturing",
    description: "Custom-scaled architectural components, tailored hospitality projects, and private label collections crafted to client specifications.",
    image: getAssetPath("/images/custom.jpg"),
    itemCount: "To Specification"
  }
];
