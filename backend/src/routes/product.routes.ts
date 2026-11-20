import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

// Zod Schema for Product validation
const productSchema = z.object({
  name: z.string().min(2),
  sku: z.string().optional().nullable(),
  categoryId: z.string().uuid(),
  subcategoryId: z.string().uuid(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  isFeatured: z.boolean().default(false),
  shortDescription: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  material: z.string().optional().nullable(),
  woodType: z.string().optional().nullable(),
  finish: z.string().optional().nullable(),
  colour: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  customizationAvailable: z.boolean().default(true),
  mainImage: z.string().min(1),
  mainImagePublicId: z.string().optional().nullable(),
  images: z.array(z.object({
    url: z.string(),
    publicId: z.string().optional().nullable(),
    altText: z.string().optional().nullable(),
    order: z.number().default(0),
  })).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
});

// GET /api/products - List products with search, pagination, category filtering
router.get('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      search = '',
      category = '',
      subcategory = '',
      status = ''
    } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const take = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * take;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
        { material: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categoryId = category as string;
    }

    if (subcategory) {
      where.subcategoryId = subcategory as string;
    }

    if (status) {
      where.status = status as any;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { updatedAt: 'desc' },
        include: {
          category: { select: { id: true, title: true, slug: true } },
          subcategory: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { order: 'asc' } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats - Dashboard overview statistics
router.get('/stats', authenticateToken, async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [total, published, draft, categories, recentProducts] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: 'PUBLISHED' } }),
      prisma.product.count({ where: { status: 'DRAFT' } }),
      prisma.category.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { title: true } },
          subcategory: { select: { name: true } },
        },
      }),
    ]);

    res.json({
      totalProducts: total,
      publishedProducts: published,
      draftProducts: draft,
      totalCategories: categories,
      recentProducts,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id - Single product details
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
        subcategory: true,
        images: { orderBy: { order: 'asc' } },
      },
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Helper slug generator
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
}

// POST /api/products - Create new product
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: 'Validation failed', errors: parsed.error.format() });
      return;
    }

    const data = parsed.data;
    const slug = generateSlug(data.name);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        sku: data.sku || undefined,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        status: data.status,
        isFeatured: data.isFeatured,
        shortDescription: data.shortDescription,
        description: data.description,
        material: data.material,
        woodType: data.woodType,
        finish: data.finish,
        colour: data.colour,
        dimensions: data.dimensions,
        weight: data.weight,
        customizationAvailable: data.customizationAvailable,
        mainImage: data.mainImage,
        mainImagePublicId: data.mainImagePublicId,
        tags: data.tags,
        images: {
          create: data.images.map((img, idx) => ({
            url: img.url,
            publicId: img.publicId,
            altText: img.altText,
            order: img.order || idx,
          })),
        },
      },
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - Update existing product
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: 'Validation failed', errors: parsed.error.format() });
      return;
    }

    const data = parsed.data;

    // Delete existing gallery images and recreate with updated order
    await prisma.productImage.deleteMany({ where: { productId: req.params.id } });

    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: data.name,
        sku: data.sku || undefined,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        status: data.status,
        isFeatured: data.isFeatured,
        shortDescription: data.shortDescription,
        description: data.description,
        material: data.material,
        woodType: data.woodType,
        finish: data.finish,
        colour: data.colour,
        dimensions: data.dimensions,
        weight: data.weight,
        customizationAvailable: data.customizationAvailable,
        mainImage: data.mainImage,
        mainImagePublicId: data.mainImagePublicId,
        tags: data.tags,
        images: {
          create: data.images.map((img, idx) => ({
            url: img.url,
            publicId: img.publicId,
            altText: img.altText,
            order: img.order || idx,
          })),
        },
      },
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/products/:id/status - Quick publish / unpublish toggle
router.patch('/:id/status', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: { status },
      select: { id: true, name: true, status: true },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// POST /api/products/:id/duplicate - Duplicate product
router.post('/:id/duplicate', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const original = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { images: true },
    });

    if (!original) {
      res.status(404).json({ message: 'Original product not found' });
      return;
    }

    const copyName = `${original.name} (Copy)`;
    const copySlug = generateSlug(copyName);

    const duplicated = await prisma.product.create({
      data: {
        name: copyName,
        slug: copySlug,
        sku: original.sku ? `${original.sku}-COPY` : null,
        status: 'DRAFT',
        isFeatured: false,
        categoryId: original.categoryId,
        subcategoryId: original.subcategoryId,
        shortDescription: original.shortDescription,
        description: original.description,
        material: original.material,
        woodType: original.woodType,
        finish: original.finish,
        colour: original.colour,
        dimensions: original.dimensions,
        weight: original.weight,
        customizationAvailable: original.customizationAvailable,
        mainImage: original.mainImage,
        mainImagePublicId: original.mainImagePublicId,
        tags: original.tags,
        images: {
          create: original.images.map((img) => ({
            url: img.url,
            publicId: img.publicId,
            altText: img.altText,
            order: img.order,
          })),
        },
      },
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });

    res.status(201).json(duplicated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
