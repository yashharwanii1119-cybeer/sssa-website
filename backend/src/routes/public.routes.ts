import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma.js';

const router = Router();

// GET /api/public/products - Only PUBLISHED products for public storefront
router.get('/products', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '30',
      category = '',
      subcategory = '',
      search = '',
    } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const take = parseInt(limit as string, 10) || 30;
    const skip = (pageNum - 1) * take;

    const where: any = {
      status: 'PUBLISHED',
    };

    if (category && category !== 'all') {
      where.category = { slug: category as string };
    }

    if (subcategory) {
      where.subcategory = { slug: subcategory as string };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { material: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { title: true, slug: true } },
          subcategory: { select: { name: true, slug: true } },
          images: { orderBy: { order: 'asc' } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Format output consistent with public frontend ProductItem interface
    const formatted = products.map((p) => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category.title,
      categorySlug: p.category.slug,
      subcategory: p.subcategory.name,
      subcategorySlug: p.subcategory.slug,
      material: p.material || 'Solid Wood',
      finish: p.finish || 'Natural Finish',
      description: p.description || p.shortDescription || '',
      image: p.mainImage,
      dimensions: p.dimensions,
      tags: p.tags,
      gallery: p.images.map((img) => img.url),
    }));

    res.json({
      products: formatted,
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

// GET /api/public/categories - Categories and subcategories for public navigation
router.get('/categories', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        subcategories: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

export default router;
