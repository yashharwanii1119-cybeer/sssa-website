import { ProductItem, productsData } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sssa-website.onrender.com';

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
        const apiProducts: ProductItem[] = data.products || [];

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
