import { ProductItem, productsData } from '../data/products';
import { getAssetPath } from '../utils/paths';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sssa-website.onrender.com';

// Resolve image URL ensuring GitHub Pages subpaths, external URLs, and Base64 strings all render properly
export const resolveProductImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string') {
    return getAssetPath('/images/furniture.jpg');
  }
  // 1. Base64 data URLs - render directly
  if (url.startsWith('data:image/')) {
    return url;
  }
  // 2. Absolute external URLs - render directly
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // 3. Local relative paths (e.g. /images/sub_cabinets.jpg) - resolve via getAssetPath for GitHub Pages
  return getAssetPath(url);
};

export const storefrontApiService = {
  // Fetch published products from Neon DB with fallback to base curated catalog
  async getPublishedProducts(params?: {
    category?: string;
    subcategory?: string;
    search?: string;
  }): Promise<ProductItem[]> {
    try {
      const query = new URLSearchParams();
      query.set('limit', '100');
      if (params?.category && params.category !== 'all') query.set('category', params.category);
      if (params?.subcategory) query.set('subcategory', params.subcategory);
      if (params?.search) query.set('search', params.search);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`${API_BASE_URL}/api/public/products?${query.toString()}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const apiProducts: ProductItem[] = (data.products || []).map((p: any) => ({
          ...p,
          image: resolveProductImageUrl(p.image),
          gallery: Array.isArray(p.gallery) ? p.gallery.map((g: string) => resolveProductImageUrl(g)) : [],
        }));

        // Deduplication & Priority Merge:
        // Live products from Neon DB are the absolute source of truth.
        // Base catalog items are only kept if their name or SKU is not already defined in the live database.
        const liveNames = new Set(apiProducts.map((p) => p.name.trim().toLowerCase()));
        const liveSkus = new Set(apiProducts.filter((p) => p.sku).map((p) => p.sku!.trim().toLowerCase()));

        const combined = [...apiProducts];

        for (const baseItem of productsData) {
          const nameCollision = liveNames.has(baseItem.name.trim().toLowerCase());
          const skuCollision = (baseItem as any).sku && liveSkus.has((baseItem as any).sku.trim().toLowerCase());

          if (!nameCollision && !skuCollision) {
            combined.push(baseItem);
          }
        }
        return combined;
      }
    } catch (err) {
      console.warn('[Storefront API] Live backend offline or delayed, rendering curated fallback catalog.', err);
    }

    // Baseline offline fallback
    return productsData;
  },
};
