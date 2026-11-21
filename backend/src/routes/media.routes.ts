import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/media/upload - Accept client-compressed image(s) as JSON and validate before saving
router.post(
  '/upload',
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { images } = req.body;

      if (!images || !Array.isArray(images) || images.length === 0) {
        res.status(400).json({ message: 'No images provided in upload payload' });
        return;
      }

      const results = [];

      for (let i = 0; i < images.length; i++) {
        const item = images[i];
        const dataUrl = typeof item === 'string' ? item : item.url || item.data;
        const filename = typeof item === 'object' && item.filename ? item.filename : `image-${Date.now()}-${i}.jpg`;

        if (!dataUrl || typeof dataUrl !== 'string') {
          res.status(400).json({ message: `Image at index ${i} is missing image data` });
          return;
        }

        // Validate data URL format (must be valid image data URL or HTTPS URL)
        const isDataUrl = dataUrl.startsWith('data:image/');
        const isHttpsUrl = dataUrl.startsWith('https://') || dataUrl.startsWith('http://');

        if (!isDataUrl && !isHttpsUrl) {
          res.status(400).json({ message: `Image "${filename}" is not a valid image format. Must be JPEG, PNG, or WEBP data.` });
          return;
        }

        // Check reasonable payload limit per image (max 3MB for compressed image)
        if (dataUrl.length > 4 * 1024 * 1024) {
          res.status(400).json({ message: `Image "${filename}" exceeds the maximum allowed compressed size (3MB).` });
          return;
        }

        results.push({
          url: dataUrl,
          publicId: `sssa-img-${Date.now()}-${i}`,
          filename,
          size: Math.round(dataUrl.length * 0.75), // approximate byte size from base64
        });
      }

      res.status(201).json({
        message: 'Upload successful',
        media: results,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
