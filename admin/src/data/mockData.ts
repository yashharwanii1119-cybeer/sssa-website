import { Category, Product, DashboardStats, User } from '../types';

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    slug: "living-room",
    title: "Living Room",
    displayOrder: 1,
    subcategories: [
      { id: "sub-1-1", slug: "cabinets", name: "Cabinets", categoryId: "cat-1", displayOrder: 1 },
      { id: "sub-1-2", slug: "sideboards", name: "Sideboards", categoryId: "cat-1", displayOrder: 2 },
      { id: "sub-1-3", slug: "chest-of-drawers", name: "Chest Of Drawers", categoryId: "cat-1", displayOrder: 3 },
      { id: "sub-1-4", slug: "tv-units", name: "T.V. Units", categoryId: "cat-1", displayOrder: 4 },
      { id: "sub-1-5", slug: "console-tables", name: "Console Tables", categoryId: "cat-1", displayOrder: 5 },
      { id: "sub-1-6", slug: "end-tables", name: "End Tables", categoryId: "cat-1", displayOrder: 6 },
      { id: "sub-1-7", slug: "coffee-tables", name: "Coffee Tables", categoryId: "cat-1", displayOrder: 7 },
      { id: "sub-1-8", slug: "shelves-racks", name: "Shelves/Racks", categoryId: "cat-1", displayOrder: 8 },
      { id: "sub-1-9", slug: "trunks", name: "Trunks", categoryId: "cat-1", displayOrder: 9 },
      { id: "sub-1-10", slug: "mirror-frames", name: "Mirror Frames", categoryId: "cat-1", displayOrder: 10 },
    ]
  },
  {
    id: "cat-2",
    slug: "bedroom",
    title: "Bedroom",
    displayOrder: 2,
    subcategories: [
      { id: "sub-2-1", slug: "beds", name: "Beds", categoryId: "cat-2", displayOrder: 1 },
      { id: "sub-2-2", slug: "headboards", name: "Headboards", categoryId: "cat-2", displayOrder: 2 },
      { id: "sub-2-3", slug: "bedside-tables", name: "Bedside Tables", categoryId: "cat-2", displayOrder: 3 },
    ]
  },
  {
    id: "cat-3",
    slug: "dining-room",
    title: "Dining Room",
    displayOrder: 3,
    subcategories: [
      { id: "sub-3-1", slug: "dining-tables", name: "Dining Tables", categoryId: "cat-3", displayOrder: 1 },
      { id: "sub-3-2", slug: "dining-chairs", name: "Dining Chairs", categoryId: "cat-3", displayOrder: 2 },
      { id: "sub-3-3", slug: "dining-sets", name: "Dining Sets", categoryId: "cat-3", displayOrder: 3 },
    ]
  },
  {
    id: "cat-4",
    slug: "seating",
    title: "Seating",
    displayOrder: 4,
    subcategories: [
      { id: "sub-4-1", slug: "sofas", name: "Sofas", categoryId: "cat-4", displayOrder: 1 },
      { id: "sub-4-2", slug: "chairs", name: "Chairs", categoryId: "cat-4", displayOrder: 2 },
      { id: "sub-4-3", slug: "stools", name: "Stools", categoryId: "cat-4", displayOrder: 3 },
      { id: "sub-4-4", slug: "benches", name: "Benches", categoryId: "cat-4", displayOrder: 4 },
      { id: "sub-4-5", slug: "daybeds", name: "Daybeds", categoryId: "cat-4", displayOrder: 5 },
      { id: "sub-4-6", slug: "poufs", name: "Poufs", categoryId: "cat-4", displayOrder: 6 },
    ]
  },
  {
    id: "cat-5",
    slug: "bar-furniture",
    title: "Bar Furniture",
    displayOrder: 5,
    subcategories: [
      { id: "sub-5-1", slug: "bar-tables", name: "Bar Tables", categoryId: "cat-5", displayOrder: 1 },
      { id: "sub-5-2", slug: "bar-stools-chairs", name: "Bar Stools / Chairs", categoryId: "cat-5", displayOrder: 2 },
      { id: "sub-5-3", slug: "bar-counters", name: "Bar Counters", categoryId: "cat-5", displayOrder: 3 },
      { id: "sub-5-4", slug: "bar-cabinets-trolleys", name: "Bar Cabinets/Trolleys", categoryId: "cat-5", displayOrder: 4 },
      { id: "sub-5-5", slug: "wine-bottle-holders", name: "Wine Bottle Holders", categoryId: "cat-5", displayOrder: 5 },
    ]
  },
  {
    id: "cat-6",
    slug: "outdoor",
    title: "Outdoor",
    displayOrder: 6,
    subcategories: [
      { id: "sub-6-1", slug: "garden-tables", name: "Garden Tables", categoryId: "cat-6", displayOrder: 1 },
      { id: "sub-6-2", slug: "garden-benches", name: "Garden Benches", categoryId: "cat-6", displayOrder: 2 },
      { id: "sub-6-3", slug: "garden-furniture", name: "Garden Furniture", categoryId: "cat-6", displayOrder: 3 },
    ]
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    sku: "SSSA-CAB-001",
    name: "Artisan Solid Wood Lattice Cabinet",
    slug: "artisan-solid-wood-lattice-cabinet",
    status: "PUBLISHED",
    isFeatured: true,
    categoryId: "cat-1",
    subcategoryId: "sub-1-1",
    shortDescription: "Handcrafted storage cabinet featuring perforated floral jali panels.",
    description: "Handcrafted storage cabinet featuring perforated floral jali panels, dual interior shelves, and magnetic latches.",
    material: "Solid Mango Wood & Brass Hardware",
    woodType: "Mango Wood",
    finish: "Hand-Rubbed Walnut Patina",
    colour: "Walnut Brown",
    dimensions: "95 cm (W) x 42 cm (D) x 130 cm (H)",
    weight: "48 kg",
    customizationAvailable: true,
    mainImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    images: [],
    tags: ["Living Room", "Cabinets", "Jali", "Artisan"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    sku: "SSSA-BCT-001",
    name: "Mobile Wooden Bar Trolley & Cart",
    slug: "mobile-wooden-bar-trolley-cart",
    status: "PUBLISHED",
    isFeatured: true,
    categoryId: "cat-5",
    subcategoryId: "sub-5-4",
    shortDescription: "Two-tier timber bar trolley on smooth brass caster wheels.",
    description: "Mobile timber bar cart on brass casters and lockable compartments for connoisseur beverage storage.",
    material: "Solid Teak & Acacia",
    woodType: "Teak Wood",
    finish: "Muted Antique Honey Luster",
    colour: "Warm Honey",
    dimensions: "85 cm (W) x 45 cm (D) x 80 cm (H)",
    weight: "22 kg",
    customizationAvailable: true,
    mainImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    images: [],
    tags: ["Bar Furniture", "Bar Trolley", "Wheels", "Teak"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    sku: "SSSA-DT-001",
    name: "Royal Carved Timber Dining Table",
    slug: "royal-carved-timber-dining-table",
    status: "DRAFT",
    isFeatured: false,
    categoryId: "cat-3",
    subcategoryId: "sub-3-1",
    shortDescription: "8-seater grand banquet dining table in natural oiled teak.",
    description: "Substantial solid timber dining table accommodating formal banquet seating with hand-carved fluted baluster legs.",
    material: "A-Grade Solid Teak",
    woodType: "Teak Wood",
    finish: "Natural Oiled Matte",
    colour: "Natural Teak",
    dimensions: "240 cm (L) x 100 cm (W) x 76 cm (H)",
    weight: "95 kg",
    customizationAvailable: true,
    mainImage: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    images: [],
    tags: ["Dining Room", "Dining Table", "Teak", "Banquet"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const defaultUser: User = {
  id: "usr-admin-1",
  name: "Shree Shiv Shakti Art Admin",
  email: "admin@shreeshivshaktiart.com",
  role: "SUPERADMIN"
};
