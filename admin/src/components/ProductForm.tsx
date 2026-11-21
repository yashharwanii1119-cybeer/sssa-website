import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, ProductImage } from '../types';
import {
  Upload,
  X,
  Plus,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Globe
} from 'lucide-react';

interface ProductFormProps {
  initialProduct?: Product | null;
  categories: Category[];
  onSave: (product: Partial<Product>) => Promise<void> | void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  categories,
  onSave,
  onCancel,
}) => {
  const isEditing = Boolean(initialProduct);

  const [formData, setFormData] = useState({
    name: initialProduct?.name || '',
    sku: initialProduct?.sku || '',
    categoryId: initialProduct?.categoryId || categories[0]?.id || '',
    subcategoryId: initialProduct?.subcategoryId || categories[0]?.subcategories[0]?.id || '',
    status: initialProduct?.status || 'DRAFT',
    isFeatured: initialProduct?.isFeatured || false,
    shortDescription: initialProduct?.shortDescription || '',
    description: initialProduct?.description || '',
    material: initialProduct?.material || 'Solid Mango Wood & Brass Hardware',
    woodType: initialProduct?.woodType || 'Mango Wood',
    finish: initialProduct?.finish || 'Hand-Rubbed Walnut Patina',
    colour: initialProduct?.colour || 'Walnut Brown',
    dimensions: initialProduct?.dimensions || '',
    weight: initialProduct?.weight || '',
    customizationAvailable: initialProduct?.customizationAvailable ?? true,
    mainImage: initialProduct?.mainImage || '',
    tags: initialProduct?.tags?.join(', ') || '',
  });

  const [galleryImages, setGalleryImages] = useState<ProductImage[]>(
    initialProduct?.images || []
  );

  // Sync state when initialProduct prop changes (e.g. switching between products to edit)
  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        sku: initialProduct.sku || '',
        categoryId: initialProduct.categoryId || categories[0]?.id || '',
        subcategoryId: initialProduct.subcategoryId || categories[0]?.subcategories[0]?.id || '',
        status: initialProduct.status || 'DRAFT',
        isFeatured: initialProduct.isFeatured || false,
        shortDescription: initialProduct.shortDescription || '',
        description: initialProduct.description || '',
        material: initialProduct.material || 'Solid Mango Wood & Brass Hardware',
        woodType: initialProduct.woodType || 'Mango Wood',
        finish: initialProduct.finish || 'Hand-Rubbed Walnut Patina',
        colour: initialProduct.colour || 'Walnut Brown',
        dimensions: initialProduct.dimensions || '',
        weight: initialProduct.weight || '',
        customizationAvailable: initialProduct.customizationAvailable ?? true,
        mainImage: initialProduct.mainImage || '',
        tags: initialProduct.tags?.join(', ') || '',
      });
      setGalleryImages(initialProduct.images || []);
    }
  }, [initialProduct, categories]);

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isReplacingMain, setIsReplacingMain] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamically update subcategories when main category changes
  const activeCategory = categories.find((c) => c.id === formData.categoryId);
  const availableSubcategories = activeCategory?.subcategories || [];

  useEffect(() => {
    // If selected subcategory doesn't belong to selected category, reset it
    if (availableSubcategories.length > 0) {
      const exists = availableSubcategories.some((s) => s.id === formData.subcategoryId);
      if (!exists) {
        setFormData((prev) => ({ ...prev, subcategoryId: availableSubcategories[0].id }));
      }
    }
  }, [formData.categoryId, availableSubcategories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddImage = () => {
    if (!imageUrlInput.trim()) return;

    if (!formData.mainImage) {
      setFormData((prev) => ({ ...prev, mainImage: imageUrlInput.trim() }));
    } else {
      const newImg: ProductImage = {
        id: `img-${Date.now()}`,
        url: imageUrlInput.trim(),
        order: galleryImages.length,
      };
      setGalleryImages((prev) => [...prev, newImg]);
    }

    setImageUrlInput('');
  };

  const handleSetMainImage = (url: string) => {
    setFormData((prev) => ({ ...prev, mainImage: url }));
  };

  const handleRemoveGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Compress and read image file to high-efficiency JPEG data URL
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(readerEvent.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          // Export as optimized JPEG at 82% quality (yielding ~100-250KB for pristine clarity)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = reject;
        img.src = readerEvent.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDeviceFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const selectedFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      if (!file.type.startsWith('image/') && !validExtensions.includes(ext)) {
        setUploadError(`"${file.name}" is not a supported format. Please select JPG, PNG, or WEBP.`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`"${file.name}" exceeds 10MB file size limit.`);
        return;
      }

      selectedFiles.push(file);
    }

    setIsUploading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://sssa-website.onrender.com';
      const token = localStorage.getItem('sssa_admin_token') || '';

      const uploadFormData = new FormData();
      selectedFiles.forEach((file) => {
        uploadFormData.append('images', file);
      });

      // Send images to backend media upload endpoint
      const res = await fetch(`${apiUrl}/api/media/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: uploadFormData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 401 || res.status === 403) {
          throw new Error(errData.message || 'Authentication error (403/401). Please re-login to upload images.');
        } else {
          throw new Error(errData.message || `Image upload failed (HTTP ${res.status}). Please verify Cloudinary configuration.`);
        }
      }

      const data = await res.json();
      if (!data.media || !Array.isArray(data.media) || data.media.length === 0) {
        throw new Error('Upload succeeded on server but returned no image URLs.');
      }

      const uploadedUrls: string[] = data.media.map((item: any) => item.url);

      // Assign uploaded images:
      // If user clicked "Replace Primary" or no primary image exists, the first uploaded image replaces primary!
      let currentMain = formData.mainImage;
      const newGalleryItems: ProductImage[] = [];

      if (isReplacingMain || !currentMain) {
        currentMain = uploadedUrls[0];
        // Any additional files go to gallery
        uploadedUrls.slice(1).forEach((url, idx) => {
          newGalleryItems.push({
            id: `img-${Date.now()}-${idx}`,
            url,
            order: galleryImages.length + newGalleryItems.length,
          });
        });
      } else {
        // Appending to existing images
        uploadedUrls.forEach((url, idx) => {
          newGalleryItems.push({
            id: `img-${Date.now()}-${idx}`,
            url,
            order: galleryImages.length + newGalleryItems.length,
          });
        });
      }

      setFormData((prev) => ({ ...prev, mainImage: currentMain }));
      if (newGalleryItems.length > 0) {
        setGalleryImages((prev) => [...prev, ...newGalleryItems]);
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setIsReplacingMain(false);
      // Reset input value so same files can be re-selected if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent, forcePublish: boolean = false) => {
    if (e && e.preventDefault) e.preventDefault();
    setUploadError(null);
    setSuccessMessage(null);

    if (!formData.name.trim()) {
      setUploadError('Product name is required.');
      return;
    }

    if (!formData.mainImage.trim()) {
      setUploadError('Please provide at least one primary product image before publishing.');
      return;
    }

    const targetStatus = forcePublish ? 'PUBLISHED' : (formData.status as any);

    const payload: Partial<Product> = {
      ...initialProduct,
      name: formData.name.trim(),
      sku: formData.sku.trim() || undefined,
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      status: targetStatus,
      isFeatured: formData.isFeatured,
      shortDescription: formData.shortDescription.trim() || undefined,
      description: formData.description.trim() || undefined,
      material: formData.material.trim() || undefined,
      woodType: formData.woodType.trim() || undefined,
      finish: formData.finish.trim() || undefined,
      colour: formData.colour.trim() || undefined,
      dimensions: formData.dimensions.trim() || undefined,
      weight: formData.weight.trim() || undefined,
      customizationAvailable: formData.customizationAvailable,
      mainImage: formData.mainImage.trim(),
      images: galleryImages,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    setIsSubmitting(true);
    try {
      await onSave(payload);
      if (forcePublish || targetStatus === 'PUBLISHED') {
        setSuccessMessage('Product published successfully! It is now live on your website.');
        setFormData((prev) => ({ ...prev, status: 'PUBLISHED' }));
      } else {
        setSuccessMessage('Product saved successfully as Draft.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to save product. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-800">
              {isEditing ? `Edit: ${initialProduct?.name}` : 'Create Product'}
            </h2>
            <p className="text-xs text-slate-500">
              Fill in product specifications, upload high-resolution images, and set publishing status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isEditing ? 'Save Product' : 'Save as Draft'}</span>
          </button>

          {/* Prominent Gold Publish Button */}
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#A77B42] via-[#C4975C] to-[#8f6633] text-white rounded-lg text-xs uppercase tracking-wider font-bold shadow-md hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 border border-amber-300/40"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Globe className="w-4 h-4 text-white" />
            )}
            <span>🌐 Publish Product</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {uploadError && (
        <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-xs text-red-800 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="font-semibold">{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-700 hover:text-red-900 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Fields & Specifications (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Basic Info */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              1. Basic Product Information
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Colonial Hand-Carved Timber Armoire"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product SKU / Code
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. SSSA-CAB-009"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#A77B42]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Living Room, Jali, Mango Wood"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Preview Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="A brief 1-2 sentence overview for cards and search results..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Detailed Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed artisanal backstory, timber joinery craftsmanship, hardware details..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42] resize-y"
              />
            </div>
          </div>

          {/* 2. Specifications */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              2. Specifications &amp; Materiality
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="e.g. Solid Mango Wood & Brass"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Wood Type / Species
                </label>
                <input
                  type="text"
                  name="woodType"
                  value={formData.woodType}
                  onChange={handleChange}
                  placeholder="Mango / Teak / Acacia / Oak"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Standard Finish
                </label>
                <input
                  type="text"
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  placeholder="e.g. Hand-Rubbed Walnut Patina"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Colour Tone
                </label>
                <input
                  type="text"
                  name="colour"
                  value={formData.colour}
                  onChange={handleChange}
                  placeholder="e.g. Warm Honey / Walnut Brown"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reference Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g. 160 cm (W) x 45 cm (D) x 85 cm (H)"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Approx Weight (optional)
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 45 kg"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="customizationAvailable"
                  checked={formData.customizationAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#A77B42] rounded-sm focus:ring-[#A77B42]"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Customization Available (Bespoke dimensions &amp; finishes on request)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Categorization, Publishing & Media (1 col) */}
        <div className="space-y-6">
          {/* 3. Categorization & Hierarchy */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              3. Category Placement
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#A77B42]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                name="subcategoryId"
                value={formData.subcategoryId}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#A77B42]"
              >
                {availableSubcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Publishing & Status */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              4. Publication Controls
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catalog Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#A77B42]"
              >
                <option value="DRAFT">Draft (Hidden from Public)</option>
                <option value="PUBLISHED">Published (Live in Collections)</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#A77B42] rounded-sm focus:ring-[#A77B42]"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Highlight as Featured Creation
                </span>
              </label>
            </div>
          </div>

          {/* 5. Media & Imagery */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                5. Imagery &amp; Media
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">
                JPG, PNG, WEBP (Max 10MB)
              </span>
            </div>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              multiple
              onChange={handleDeviceFileUpload}
              className="hidden"
            />

            {/* Upload Error Banner */}
            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Main Image Preview Area */}
            {formData.mainImage ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Primary Product Image
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, mainImage: '' }))}
                    className="text-[11px] text-red-600 hover:underline cursor-pointer"
                  >
                    Clear Primary
                  </button>
                </div>
                <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group">
                  <img
                    src={formData.mainImage}
                    alt="Main Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#1E140E]/80 text-[#C4975C] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                    Primary
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsReplacingMain(true);
                      fileInputRef.current?.click();
                    }}
                    disabled={isUploading}
                    className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E140E]/85 hover:bg-[#1E140E] text-[#EAE0D2] rounded-md text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer shadow-md"
                    title="Replace with image from device"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C4975C]" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-[#C4975C]" />
                    )}
                    <span>Replace</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-[#A77B42]/40 hover:border-[#A77B42] rounded-xl text-center space-y-3 cursor-pointer bg-amber-50/20 hover:bg-amber-50/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1E140E] text-[#C4975C] mx-auto flex items-center justify-center shadow-md">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {isUploading ? 'Uploading Image...' : 'Click to Upload Images from Device'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Select from computer, mobile gallery, or camera
                  </p>
                </div>
              </div>
            )}

            {/* Prominent + Device Upload Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#271911] hover:bg-[#1E140E] text-[#EAE0D2] border border-[#A77B42]/40 text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C4975C]" />
                    <span>Uploading selected image(s)...</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full bg-[#A77B42] text-white flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <span>Upload Images from Device</span>
                  </>
                )}
              </button>
            </div>

            {/* Gallery Images List with Remove (X) and Set Primary */}
            {galleryImages.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Gallery Images ({galleryImages.length})
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Hover to set as primary or delete
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-md overflow-hidden border border-slate-200 group bg-slate-50"
                    >
                      <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(img.url)}
                          className="px-2 py-1 bg-[#A77B42] rounded text-[10px] font-bold text-white shadow-xs cursor-pointer hover:bg-[#8f6633]"
                          title="Set as primary image"
                        >
                          Make Primary
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(img.id)}
                          className="p-1 bg-red-600 rounded text-white shadow-xs cursor-pointer hover:bg-red-700"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternative: Quick URL Input for Image */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-600">
                Or Add via URL / Asset Path
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://... or /images/product.jpg"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3.5 py-1.5 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633] transition-colors cursor-pointer"
                >
                  Add URL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
