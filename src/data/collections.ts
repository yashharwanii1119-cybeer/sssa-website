import { getAssetPath } from '../utils/paths';

export interface SubCategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: string;
  subcategories: SubCategoryItem[];
}

export const collectionsData: CollectionItem[] = [
  {
    id: "living-room",
    slug: "living-room",
    title: "Living Room",
    subtitle: "Premium Wooden Furniture • Timeless Interiors",
    description: "Solid hardwood console tables, sculptural centre tables, media credenzas, and ornamental accent units designed for distinguished living rooms.",
    image: getAssetPath("/images/furniture.jpg"),
    itemCount: "10 Subcategories",
    subcategories: [
      {
        id: "cabinets",
        slug: "cabinets",
        name: "Cabinets",
        description: "Handcrafted solid wood storage cabinets with intricate latticework, brass fittings, and spacious shelving.",
        image: getAssetPath("/images/sub_cabinets.jpg"),
      },
      {
        id: "sideboards",
        slug: "sideboards",
        name: "Sideboards",
        description: "Artisan sideboards with hand-rubbed timber finishes, carved door panels, and ample living space storage.",
        image: getAssetPath("/images/sub_sideboards.jpg"),
      },
      {
        id: "chest-of-drawers",
        slug: "chest-of-drawers",
        name: "Chest Of Drawers",
        description: "Elegant multi-drawer chests combining solid timber joinery with traditional hand-carved drawer facings.",
        image: getAssetPath("/images/sub_drawers.jpg"),
      },
      {
        id: "tv-units",
        slug: "tv-units",
        name: "T.V. Units",
        description: "Media consoles and television units balancing modern entertainment needs with classic artisanal woodwork.",
        image: getAssetPath("/images/sub_tv_units.jpg"),
      },
      {
        id: "console-tables",
        slug: "console-tables",
        name: "Console Tables",
        description: "Gracefully proportioned hallway and entryway console tables showcasing deep relief carvings.",
        image: getAssetPath("/images/sub_console_tables.jpg"),
      },
      {
        id: "side-end-tables",
        slug: "side-end-tables",
        name: "Side/End Tables",
        description: "Versatile companion tables with hand-turned legs and solid hardwood tops for living spaces.",
        image: getAssetPath("/images/sub_end_tables.jpg"),
      },
      {
        id: "coffee-tables",
        slug: "coffee-tables",
        name: "Coffee Tables",
        description: "Distinctive centrepieces sculpted from solid timbers, featuring live edges and hand-chiseled accents.",
        image: getAssetPath("/images/sub_coffee_tables.jpg"),
      },
      {
        id: "shelves-racks",
        slug: "shelves-racks",
        name: "Shelves/Racks",
        description: "Architectural wooden bookshelves, open display etageres, and wall-mounted storage racks.",
        image: getAssetPath("/images/sub_shelves.jpg"),
      },
      {
        id: "trunks",
        slug: "trunks",
        name: "Trunks",
        description: "Heritage storage trunks and blanket chests reinforced with traditional brass strapwork and iron clasps.",
        image: getAssetPath("/images/sub_trunks.jpg"),
      },
      {
        id: "mirror-wall-decor",
        slug: "mirror-wall-decor",
        name: "Mirror/Wall Decor",
        description: "Statement architectural mirror frames and hand-carved jali fretwork panels for luxury interiors.",
        image: getAssetPath("/images/sub_mirrors.jpg"),
      },
    ]
  },
  {
    id: "bedroom",
    slug: "bedroom",
    title: "Bedroom",
    subtitle: "Elegant Wooden Beds • Bedroom Collections",
    description: "Hand-carved wooden headboards, artisan nightstands, solid wood armoires, and vanity dressers crafted with timeless proportions.",
    image: getAssetPath("/images/custom.jpg"),
    itemCount: "3 Subcategories",
    subcategories: [
      {
        id: "beds",
        slug: "beds",
        name: "Beds",
        description: "Solid wood bed frames engineered with traditional mortise-and-tenon joinery and opulent carved details.",
        image: getAssetPath("/images/sub_beds.jpg"),
      },
      {
        id: "headboards",
        slug: "headboards",
        name: "Headboards",
        description: "Ornate wall-mounted and freestanding headboards showcasing intricate artisanal carvings.",
        image: getAssetPath("/images/sub_headboards.jpg"),
      },
      {
        id: "bedside-tables",
        slug: "bedside-tables",
        name: "Bedside Tables",
        description: "Compact, beautifully crafted nightstands with discreet storage drawers and open niches.",
        image: getAssetPath("/images/sub_bedside_tables.jpg"),
      },
    ]
  },
  {
    id: "dining-room",
    slug: "dining-room",
    title: "Dining Room",
    subtitle: "Handcrafted Dining Tables • Dining Collections",
    description: "Expansive solid timber dining tables, sideboard credenzas, display vitrines, and custom carved serving accessories for gracious entertaining.",
    image: getAssetPath("/images/decor.jpg"),
    itemCount: "3 Subcategories",
    subcategories: [
      {
        id: "dining-tables",
        slug: "dining-tables",
        name: "Dining Tables",
        description: "Stately 6-seater, 8-seater, and extension dining tables crafted from seasoned Mango, Oak, and Teak woods.",
        image: getAssetPath("/images/sub_dining_tables.jpg"),
      },
      {
        id: "dining-chairs",
        slug: "dining-chairs",
        name: "Dining Chairs",
        description: "Ergonomically contoured solid wood dining chairs with upholstered or solid hand-carved seats.",
        image: getAssetPath("/images/sub_dining_chairs.jpg"),
      },
      {
        id: "dining-sets",
        slug: "dining-sets",
        name: "Dining Sets",
        description: "Harmoniously coordinated dining suites pairing master dining tables with matching artisan seating.",
        image: getAssetPath("/images/sub_dining_sets.jpg"),
      },
    ]
  },
  {
    id: "seating",
    slug: "seating",
    title: "Seating",
    subtitle: "Wooden Chairs • Sofas & Seating",
    description: "Artisanal lounge chairs, accent benches, hand-turned armchairs, and carved settees combining solid wood frames with ergonomic comfort.",
    image: getAssetPath("/images/traditional.jpg"),
    itemCount: "6 Subcategories",
    subcategories: [
      {
        id: "sofas",
        slug: "sofas",
        name: "Sofas",
        description: "Deep-seated lounge sofas and statement armchairs sculpted with solid hardwood frameworks.",
        image: getAssetPath("/images/sub_sofas.jpg"),
      },
      {
        id: "chairs",
        slug: "chairs",
        name: "Chairs",
        description: "Versatile accent chairs, reading chairs, and library armchairs with hand-turned spindle woodwork.",
        image: getAssetPath("/images/sub_chairs.jpg"),
      },
      {
        id: "stools",
        slug: "stools",
        name: "Stools",
        description: "Compact low stools, milking stools, and tripod occasional seats carved from solid timber blocks.",
        image: getAssetPath("/images/sub_stools.jpg"),
      },
      {
        id: "benches",
        slug: "benches",
        name: "Benches",
        description: "Dining benches, entryway seating, and long foyer benches with character-rich wood finishes.",
        image: getAssetPath("/images/sub_benches.jpg"),
      },
      {
        id: "daybeds",
        slug: "daybeds",
        name: "Daybeds",
        description: "Relaxed wooden diwans and day beds featuring traditional turned bolsters and carved rails.",
        image: getAssetPath("/images/sub_daybeds.jpg"),
      },
      {
        id: "poufs",
        slug: "poufs",
        name: "Poufs",
        description: "Low upholstered footrests and wooden-footed poufs tailored for relaxed contemporary lounging.",
        image: getAssetPath("/images/sub_poufs.jpg"),
      },
    ]
  },
  {
    id: "bar-furniture",
    slug: "bar-furniture",
    title: "Bar Furniture",
    subtitle: "Premium Bar Tables • Custom Bar Furniture",
    description: "Solid wood bar counters, high-top cocktail tables, wine storage cabinets, and carved bar stools engineered for hospitality and luxury homes.",
    image: getAssetPath("/images/handicrafts.jpg"),
    itemCount: "5 Subcategories",
    subcategories: [
      {
        id: "bar-tables",
        slug: "bar-tables",
        name: "Bar Tables",
        description: "Pub-height and counter-height cocktail tables featuring durable solid wood surfaces.",
        image: getAssetPath("/images/sub_bar_tables.jpg"),
      },
      {
        id: "bar-stools-chairs",
        slug: "bar-stools-chairs",
        name: "Bar Stools / Chairs",
        description: "Elevated swivel and stationary bar stools with contoured seats and reinforced footrests.",
        image: getAssetPath("/images/sub_bar_stools.jpg"),
      },
      {
        id: "bar-counters",
        slug: "bar-counters",
        name: "Bar Counters",
        description: "Commercial and residential home bar counters equipped with wine racks and service ledges.",
        image: getAssetPath("/images/sub_bar_counters.jpg"),
      },
      {
        id: "bar-cabinets-trolleys",
        slug: "bar-cabinets-trolleys",
        name: "Bar Cabinets/Trolleys",
        description: "Mobile serving bar carts and locking liquor cabinets with stemware storage.",
        image: getAssetPath("/images/sub_bar_cabinets.jpg"),
      },
      {
        id: "wine-bottle-holders",
        slug: "wine-bottle-holders",
        name: "Wine Bottle Holders",
        description: "Hand-carved tabletop wine racks, modular timber wall holders, and decorative display pedestals.",
        image: getAssetPath("/images/sub_wine_holders.jpg"),
      },
    ]
  },
  {
    id: "outdoor",
    slug: "outdoor",
    title: "Outdoor",
    subtitle: "Garden Benches • Outdoor Wooden Furniture",
    description: "Weather-treated teak and hardwood garden benches, patio tables, veranda planters, and gazebo decorative elements built for outdoor longevity.",
    image: getAssetPath("/images/wall_art.jpg"),
    itemCount: "3 Subcategories",
    subcategories: [
      {
        id: "garden-tables",
        slug: "garden-tables",
        name: "Garden Tables",
        description: "Weather-treated folding and fixed outdoor dining tables built from seasoned teak timbers.",
        image: getAssetPath("/images/sub_garden_table.jpg"),
      },
      {
        id: "garden-benches",
        slug: "garden-benches",
        name: "Garden Benches",
        description: "Classic slatted veranda benches, garden armchairs, and patio loungers with natural oil sealants.",
        image: getAssetPath("/images/sub_garden_benches.jpg"),
      },
      {
        id: "garden-furniture",
        slug: "garden-furniture",
        name: "Garden Furniture",
        description: "Comprehensive outdoor lounge sets and patio furniture suites crafted for resort-style relaxation.",
        image: getAssetPath("/images/sub_garden_furniture.jpg"),
      },
    ]
  }
];

export const getCategoryBySlug = (slug: string) => {
  return collectionsData.find((c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase());
};

export const getSubCategoryBySlug = (categorySlug: string, subCategorySlug: string) => {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return null;
  return cat.subcategories.find((s) => s.slug.toLowerCase() === subCategorySlug.toLowerCase() || s.id.toLowerCase() === subCategorySlug.toLowerCase()) || null;
};
