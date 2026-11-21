import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// Configure Cloudinary credentials from env
const hasCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Memory storage so we can safely attempt Cloudinary and provide detailed diagnosis
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowed.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed types: JPG, PNG, WEBP.`));
    }
  },
});

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

      if (!hasCloudinary) {
        res.status(503).json({
          message: 'Cloudinary credentials are not configured on the server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.',
          code: 'CLOUDINARY_CONFIG_MISSING',
        });
        return;
      }

      const uploadPromises = files.map((file) => {
        return new Promise<{ url: string; publicId: string; filename: string; size: number }>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'sssa-products',
                resource_type: 'image',
                allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
                transformation: [{ width: 1600, height: 1600, crop: 'limit', quality: 'auto' }],
              },
              (error, result) => {
                if (error) {
                  return reject(error);
                }
                if (!result) {
                  return reject(new Error('Cloudinary returned empty result'));
                }
                resolve({
                  url: result.secure_url,
                  publicId: result.public_id,
                  filename: file.originalname,
                  size: file.size,
                });
              }
            );
            uploadStream.end(file.buffer);
          }
        );
      });

      try {
        const results = await Promise.all(uploadPromises);
        res.status(201).json({
          message: 'Upload successful',
          media: results,
        });
      } catch (cloudErr: any) {
        console.error('[Cloudinary Upload Error Details]:', {
          message: cloudErr.message,
          http_code: cloudErr.http_code,
          name: cloudErr.name,
        });

        const isForbidden = cloudErr.http_code === 403 || String(cloudErr.message || '').includes('403');
        res.status(isForbidden ? 403 : 502).json({
          message: `Cloudinary rejected the upload: ${cloudErr.message || 'Access Forbidden (403)'}. Please verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET on Render.`,
          code: isForbidden ? 'CLOUDINARY_403_FORBIDDEN' : 'CLOUDINARY_UPLOAD_FAILED',
          details: cloudErr.message,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
