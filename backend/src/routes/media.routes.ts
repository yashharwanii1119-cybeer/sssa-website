import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// Configure memory storage for multipart/form-data uploads
const storage = multer.memoryStorage();
const multerUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowed.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed types: JPG, PNG, WEBP.`));
    }
  },
});

// Helper to convert buffer to data URL
function bufferToDataUrl(buffer: Buffer, mimetype: string): string {
  const mime = mimetype || 'image/jpeg';
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

// POST /api/media/upload - Accept client-compressed images via JSON OR multipart/form-data
router.post(
  '/upload',
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) => {
    // Check Content-Type: if multipart/form-data, pass through multer
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
      multerUpload.array('images', 10)(req, res, (err) => {
        if (err) {
          res.status(400).json({ message: err.message || 'File upload error' });
          return;
        }
        next();
      });
    } else {
      // Standard JSON body
      next();
    }
  },
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const results: Array<{ url: string; publicId: string; filename: string; size: number }> = [];

      // 1. Process files from multipart/form-data (FormData)
      const files = req.files as Express.Multer.File[] | undefined;
      if (files && Array.isArray(files) && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const dataUrl = bufferToDataUrl(file.buffer, file.mimetype);
          results.push({
            url: dataUrl,
            publicId: `sssa-img-${Date.now()}-${i}`,
            filename: file.originalname || `upload-${i}.jpg`,
            size: file.size,
          });
        }
      }

      // 2. Process images from JSON body ({ images: [...] })
      const bodyImages = req.body?.images;
      if (bodyImages && Array.isArray(bodyImages) && bodyImages.length > 0) {
        for (let i = 0; i < bodyImages.length; i++) {
          const item = bodyImages[i];
          const dataUrl = typeof item === 'string' ? item : item.url || item.data;
          const filename = typeof item === 'object' && item.filename ? item.filename : `image-${Date.now()}-${i}.jpg`;

          if (!dataUrl || typeof dataUrl !== 'string') {
            res.status(400).json({ message: `Image at index ${i} is missing image data` });
            return;
          }

          const isDataUrl = dataUrl.startsWith('data:image/');
          const isHttpsUrl = dataUrl.startsWith('https://') || dataUrl.startsWith('http://');

          if (!isDataUrl && !isHttpsUrl) {
            res.status(400).json({ message: `Image "${filename}" is not a valid image format. Must be JPEG, PNG, or WEBP data.` });
            return;
          }

          if (dataUrl.length > 6 * 1024 * 1024) {
            res.status(400).json({ message: `Image "${filename}" exceeds the maximum allowed compressed size (4.5MB).` });
            return;
          }

          results.push({
            url: dataUrl,
            publicId: `sssa-img-${Date.now()}-${i}`,
            filename,
            size: Math.round(dataUrl.length * 0.75),
          });
        }
      }

      if (results.length === 0) {
        res.status(400).json({ message: 'No images provided in upload payload' });
        return;
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
