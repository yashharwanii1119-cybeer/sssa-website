import { Category, Product, DashboardStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sssa-website.onrender.com';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('sssa_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const adminApiService = {
  // Fetch categories from Neon DB
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE_URL}/api/categories`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Failed to load categories: ${res.statusText}`);
    }
    return res.json();
  },

  // Fetch all products with search & filters
  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }): Promise<{ products: Product[]; pagination: any }> {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.search) query.set('search', params.search);
    if (params?.category) query.set('category', params.category);
    if (params?.status) query.set('status', params.status);

    const res = await fetch(`${API_BASE_URL}/api/products?${query.toString()}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Failed to load products: ${res.statusText}`);
    }
    return res.json();
  },

  // Fetch Dashboard Stats
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE_URL}/api/products/stats`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Failed to load stats: ${res.statusText}`);
    }
    return res.json();
  },

  // Create Product in Neon DB
  async createProduct(productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to create product (${res.status})`);
    }
    return res.json();
  },

  // Update Product in Neon DB
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to update product (${res.status})`);
    }
    return res.json();
  },

  // Quick Toggle Status (PUBLISHED / DRAFT)
  async toggleStatus(id: string, status: 'PUBLISHED' | 'DRAFT'): Promise<{ id: string; name: string; status: string }> {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to change status (${res.status})`);
    }
    return res.json();
  },

  // Duplicate Product
  async duplicateProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}/duplicate`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to duplicate product (${res.status})`);
    }
    return res.json();
  },

  // Delete Product
  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to delete product (${res.status})`);
    }
  },
};
