import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// Configure Cloudinary credentials from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
let upload: multer.Multer;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'sssa-products',
      allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
      transformation: [{ width: 1600, height: 1600, crop: 'limit', quality: 'auto' }],
    } as any,
  });
  upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
} else {
  // Disk storage fallback for development
  const diskStorage = multer.diskStorage({
    destination: 'dist/uploads',
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s+/g, '_')}`);
    },
  });
  upload = multer({ storage: diskStorage, limits: { fileSize: 10 * 1024 * 1024 } });
}

// POST /api/media/upload - Upload single or multiple images
router.post(
  '/upload',
  authenticateToken,
  upload.array('images', 10),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ message: 'No image files provided' });
        return;
      }

      const results = files.map((file: any) => ({
        url: file.path || file.secure_url || `/uploads/${file.filename}`,
        publicId: file.filename || file.public_id || null,
        filename: file.originalname,
        size: file.size,
      }));

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
