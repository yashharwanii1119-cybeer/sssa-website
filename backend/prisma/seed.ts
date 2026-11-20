import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const collectionsSeed = [
  {
    slug: 'living-room',
    title: 'Living Room',
    subtitle: 'Premium Wooden Furniture • Timeless Interiors',
    description: 'Solid hardwood console tables, sculptural centre tables, media credenzas, and ornamental accent units designed for distinguished living rooms.',
    image: '/images/furniture.jpg',
    displayOrder: 1,
    subcategories: [
      { slug: 'cabinets', name: 'Cabinets', description: 'Handcrafted solid wood storage cabinets with intricate latticework, brass fittings, and spacious shelving.', image: '/images/sub_cabinets.jpg', displayOrder: 1 },
      { slug: 'sideboards', name: 'Sideboards', description: 'Artisan sideboards with hand-rubbed timber finishes, carved door panels, and ample living space storage.', image: '/images/sub_sideboards.jpg', displayOrder: 2 },
      { slug: 'chest-of-drawers', name: 'Chest Of Drawers', description: 'Elegant multi-drawer chests combining solid timber joinery with traditional hand-carved drawer facings.', image: '/images/sub_drawers.jpg', displayOrder: 3 },
      { slug: 'tv-units', name: 'T.V. Units', description: 'Media consoles and television units balancing modern entertainment needs with classic artisanal woodwork.', image: '/images/sub_tv_units.jpg', displayOrder: 4 },
      { slug: 'console-tables', name: 'Console Tables', description: 'Architectural foyer and entryway console tables showcasing hand-lathed legs and warm timber grain.', image: '/images/sub_consoles.jpg', displayOrder: 5 },
      { slug: 'end-tables', name: 'End Tables', description: 'Versatile companion side tables crafted in solid wood to complement artisanal living room arrangements.', image: '/images/sub_end_tables.jpg', displayOrder: 6 },
      { slug: 'coffee-tables', name: 'Coffee Tables', description: 'Centrepiece living room coffee tables featuring rich wood grain textures and robust hand-joined frameworks.', image: '/images/sub_coffee_tables.jpg', displayOrder: 7 },
      { slug: 'shelves-racks', name: 'Shelves/Racks', description: 'Open display shelving units and bookcases crafted for refined interior curation and organization.', image: '/images/sub_shelves.jpg', displayOrder: 8 },
      { slug: 'trunks', name: 'Trunks', description: 'Vintage-inspired wooden storage trunks and blanket chests reinforced with traditional metal hardware.', image: '/images/sub_trunks.jpg', displayOrder: 9 },
      { slug: 'mirror-frames', name: 'Mirror Frames', description: 'Statement wall mirrors bordered in intricately carved solid mango and teak wood frameworks.', image: '/images/sub_mirrors.jpg', displayOrder: 10 },
    ],
  },
  {
    slug: 'bedroom',
    title: 'Bedroom',
    subtitle: 'Hand-Carved Sanctuary • Heirloom Comfort',
    description: 'Bespoke wooden beds, hand-turned headboards, bedside nightstands, and dressing cabinets crafted for restorative luxury.',
    image: '/images/sub_beds.jpg',
    displayOrder: 2,
    subcategories: [
      { slug: 'beds', name: 'Beds', description: 'Grand solid wood platform and poster beds designed with heirloom-grade joinery and serene hand-rubbed luster.', image: '/images/sub_beds.jpg', displayOrder: 1 },
      { slug: 'headboards', name: 'Headboards', description: 'Decorative carved timber headboards adding artisanal prominence to contemporary or traditional bedrooms.', image: '/images/sub_headboards.jpg', displayOrder: 2 },
      { slug: 'bedside-tables', name: 'Bedside Tables', description: 'Functional nightstands with discrete drawer storage and artisanal woodwork surfaces.', image: '/images/sub_bedside.jpg', displayOrder: 3 },
    ],
  },
  {
    slug: 'dining-room',
    title: 'Dining Room',
    subtitle: 'Artisanal Banquets • Gatherings of Distinction',
    description: 'Expansive solid timber dining tables, hand-carved dining chairs, and bespoke credenzas crafted for hospitality and fine homes.',
    image: '/images/sub_dining_tables.jpg',
    displayOrder: 3,
    subcategories: [
      { slug: 'dining-tables', name: 'Dining Tables', description: 'Substantial solid timber dining tables accommodating intimate dinners to expansive formal banquet seating.', image: '/images/sub_dining_tables.jpg', displayOrder: 1 },
      { slug: 'dining-chairs', name: 'Dining Chairs', description: 'Ergonomic yet regal hand-carved dining chairs with solid wood stability and artisanal silhouettes.', image: '/images/sub_dining_chairs.jpg', displayOrder: 2 },
      { slug: 'dining-sets', name: 'Dining Sets', description: 'Coordinated dining collections pairing matching hardwood dining tables and upholstered or carved chairs.', image: '/images/sub_dining_sets.jpg', displayOrder: 3 },
    ],
  },
  {
    slug: 'seating',
    title: 'Seating',
    subtitle: 'Ergonomic Woodcraft • Sculpted Form',
    description: 'Handcrafted timber sofas, accent lounge chairs, occasional benches, and upholstered daybeds celebrating Indian woodwork.',
    image: '/images/sub_benches.jpg',
    displayOrder: 4,
    subcategories: [
      { slug: 'sofas', name: 'Sofas', description: 'Solid timber frame sofas featuring deeply cushioned seating and hand-carved armrest accents.', image: '/images/sub_sofas.jpg', displayOrder: 1 },
      { slug: 'chairs', name: 'Chairs', description: 'Distinguished accent armchairs, occasional seating, and statement reading chairs crafted in premium hardwoods.', image: '/images/sub_chairs.jpg', displayOrder: 2 },
      { slug: 'stools', name: 'Stools', description: 'Compact wooden stools, vanity seats, and carved low seats versatile across residential and hospitality spaces.', image: '/images/sub_stools.jpg', displayOrder: 3 },
      { slug: 'benches', name: 'Benches', description: 'Statement entry and dining benches with woven cane or solid timber slab tops and carved legs.', image: '/images/sub_benches.jpg', displayOrder: 4 },
      { slug: 'daybeds', name: 'Daybeds', description: 'Lounge daybeds inspired by colonial Indian divans, crafted for relaxed comfort and visual grandeur.', image: '/images/sub_daybeds.jpg', displayOrder: 5 },
      { slug: 'poufs', name: 'Poufs', description: 'Artisanal footrests and upholstered timber poufs adding warm textures and functional seating accents.', image: '/images/sub_poufs.jpg', displayOrder: 6 },
    ],
  },
  {
    slug: 'bar-furniture',
    title: 'Bar Furniture',
    subtitle: 'Bespoke Hospitality • Connoisseur Display',
    description: 'High-top timber bar tables, ergonomic barstools, wine storage racks, and dedicated entertaining cabinets.',
    image: '/images/sub_bar_chairs.jpg',
    displayOrder: 5,
    subcategories: [
      { slug: 'bar-tables', name: 'Bar Tables', description: 'Counter-height and pub-height solid timber tables designed for hospitality lounges and residential bars.', image: '/images/sub_bar_tables.jpg', displayOrder: 1 },
      { slug: 'bar-stools-chairs', name: 'Bar Stools / Chairs', description: 'Swivel and fixed hardwood barstools with footrests, contoured seats, and robust hand-joined bases.', image: '/images/sub_bar_chairs.jpg', displayOrder: 2 },
      { slug: 'bar-counters', name: 'Bar Counters', description: 'Commercial and residential wooden bar counters with built-in bottle racks, stemware rails, and prep tops.', image: '/images/sub_bar_counters.jpg', displayOrder: 3 },
      { slug: 'bar-cabinets-trolleys', name: 'Bar Cabinets/Trolleys', description: 'Mobile timber bar carts on brass casters and lockable bar credenzas for connoisseur beverage storage.', image: '/images/sub_bar_cabinets.jpg', displayOrder: 4 },
      { slug: 'wine-bottle-holders', name: 'Wine Bottle Holders', description: 'Geometric modular wine racks and wall-mounted timber bottle displays showcasing fine vintages.', image: '/images/sub_wine_holders.jpg', displayOrder: 5 },
    ],
  },
  {
    slug: 'outdoor',
    title: 'Outdoor',
    subtitle: 'Weathered Endurance • Alfresco Luxury',
    description: 'Teak and weather-treated timber garden tables, verandah benches, and open-air lounge seating engineered for exterior living.',
    image: '/images/sub_garden_bench.jpg',
    displayOrder: 6,
    subcategories: [
      { slug: 'garden-tables', name: 'Garden Tables', description: 'Slatted teak and treated acacia patio tables built to endure temperature shifts while aging gracefully.', image: '/images/sub_garden_tables.jpg', displayOrder: 1 },
      { slug: 'garden-benches', name: 'Garden Benches', description: 'Classic courtyard benches with contoured slatted seats and weather-resistant joinery for gardens and patios.', image: '/images/sub_garden_bench.jpg', displayOrder: 2 },
      { slug: 'garden-furniture', name: 'Garden Furniture', description: 'Complete outdoor conversational sets, patio sun loungers, and alfresco dining ensembles.', image: '/images/sub_outdoor_furniture.jpg', displayOrder: 3 },
    ],
  },
];

async function main() {
  console.log('Seeding initial admin user and categories...');

  // 1. Initial Admin User
  const defaultEmail = 'admin@shreeshivshaktiart.com';
  const existingUser = await prisma.user.findUnique({ where: { email: defaultEmail } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('Sssa@Admin2026', 10);
    await prisma.user.create({
      data: {
        email: defaultEmail,
        password: hashedPassword,
        name: 'Shree Shiv Shakti Art Admin',
        role: 'SUPERADMIN',
      },
    });
    console.log(`Created default admin user: ${defaultEmail}`);
  }

  // 2. Categories & Subcategories
  for (const catData of collectionsSeed) {
    const { subcategories, ...catFields } = catData;

    const category = await prisma.category.upsert({
      where: { slug: catFields.slug },
      update: catFields,
      create: catFields,
    });

    for (const sub of subcategories) {
      await prisma.subcategory.upsert({
        where: { slug: sub.slug },
        update: {
          name: sub.name,
          description: sub.description,
          image: sub.image,
          displayOrder: sub.displayOrder,
          categoryId: category.id,
        },
        create: {
          slug: sub.slug,
          name: sub.name,
          description: sub.description,
          image: sub.image,
          displayOrder: sub.displayOrder,
          categoryId: category.id,
        },
      });
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
