import React, { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';

interface ProductFormProps {
  initialProduct?: Product | null;
  categories: Category[];
  onSave: (product: Partial<Product>) => void;
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

  const [imageUrlInput, setImageUrlInput] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Product name is required.');
      return;
    }

    if (!formData.mainImage.trim()) {
      alert('Please provide at least a main product image.');
      return;
    }

    const payload: Partial<Product> = {
      ...initialProduct,
      name: formData.name.trim(),
      sku: formData.sku.trim() || undefined,
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      status: formData.status as any,
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

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12 animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
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
              {isEditing ? `Edit: ${initialProduct?.name}` : 'Add New Handcrafted Creation'}
            </h2>
            <p className="text-xs text-slate-500">
              Fill in product specifications, upload high-resolution images, and set publishing status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633] transition-colors shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Create Product'}</span>
          </button>
        </div>
      </div>

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
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              5. Imagery &amp; Media
            </h3>

            {/* Main Image Preview */}
            {formData.mainImage ? (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Main Product Image (Featured)
                </label>
                <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={formData.mainImage}
                    alt="Main Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#1E140E]/80 text-[#C4975C] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                    Primary
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-lg text-center space-y-2">
                <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500">No primary image set yet.</p>
              </div>
            )}

            {/* Quick URL Input for Image */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Add Image via URL or Asset Path
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://... or /images/sub_cab.jpg"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3 py-1.5 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Gallery Images List */}
            {galleryImages.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700">
                  Gallery Images ({galleryImages.length})
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border border-slate-200 group">
                      <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(img.url)}
                          className="p-1 bg-white rounded-xs text-[9px] font-bold text-slate-800"
                          title="Set as primary"
                        >
                          Main
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(img.id)}
                          className="p-1 bg-red-600 rounded-xs text-white"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
