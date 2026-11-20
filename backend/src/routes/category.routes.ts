import { Router, Response, NextFunction } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/categories - List all categories with their subcategories
router.get('/', authenticateToken, async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        subcategories: {
          orderBy: { displayOrder: 'asc' },
          include: {
            _count: { select: { products: true } },
          },
        },
        _count: { select: { products: true } },
      },
    });

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:id - Single category with its subcategories
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: {
        subcategories: {
          orderBy: { displayOrder: 'asc' },
          include: {
            _count: { select: { products: true } },
          },
        },
      },
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
});

export default router;
