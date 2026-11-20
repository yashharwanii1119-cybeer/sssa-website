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
    id: "living-room",
    title: "Living Room",
    subtitle: "Premium Wooden Furniture • Timeless Interiors",
    description: "Solid hardwood console tables, sculptural centre tables, media credenzas, and ornamental accent units designed for distinguished living rooms.",
    image: getAssetPath("/images/furniture.jpg"),
    itemCount: "Living Room Series"
  },
  {
    id: "bedroom",
    title: "Bedroom",
    subtitle: "Elegant Wooden Beds • Bedroom Collections",
    description: "Hand-carved wooden headboards, artisan nightstands, solid wood armoires, and vanity dressers crafted with timeless proportions.",
    image: getAssetPath("/images/custom.jpg"),
    itemCount: "Bedroom Suites"
  },
  {
    id: "dining-room",
    title: "Dining Room",
    subtitle: "Handcrafted Dining Tables • Dining Collections",
    description: "Expansive solid timber dining tables, sideboard credenzas, display vitrines, and custom carved serving accessories for gracious entertaining.",
    image: getAssetPath("/images/decor.jpg"),
    itemCount: "Dining Collections"
  },
  {
    id: "seating",
    title: "Seating",
    subtitle: "Wooden Chairs • Sofas & Seating",
    description: "Artisanal lounge chairs, accent benches, hand-turned armchairs, and carved settees combining solid wood frames with ergonomic comfort.",
    image: getAssetPath("/images/traditional.jpg"),
    itemCount: "Seating Line"
  },
  {
    id: "bar-furniture",
    title: "Bar Furniture",
    subtitle: "Premium Bar Tables • Custom Bar Furniture",
    description: "Solid wood bar counters, high-top cocktail tables, wine storage cabinets, and carved bar stools engineered for hospitality and luxury homes.",
    image: getAssetPath("/images/handicrafts.jpg"),
    itemCount: "Bar & Lounge"
  },
  {
    id: "outdoor",
    title: "Outdoor",
    subtitle: "Garden Benches • Outdoor Wooden Furniture",
    description: "Weather-treated teak and hardwood garden benches, patio tables, veranda planters, and gazebo decorative elements built for outdoor longevity.",
    image: getAssetPath("/images/wall_art.jpg"),
    itemCount: "Outdoor & Veranda"
  }
];
