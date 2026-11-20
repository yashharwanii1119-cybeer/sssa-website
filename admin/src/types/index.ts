export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  displayOrder: number;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  displayOrder: number;
  subcategories: Subcategory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  publicId?: string;
  altText?: string;
  order: number;
}

export interface Product {
  id: string;
  sku?: string;
  name: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured: boolean;
  categoryId: string;
  category?: Category;
  subcategoryId: string;
  subcategory?: Subcategory;
  shortDescription?: string;
  description?: string;
  material?: string;
  woodType?: string;
  finish?: string;
  colour?: string;
  dimensions?: string;
  weight?: string;
  customizationAvailable: boolean;
  mainImage: string;
  images: ProductImage[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalCategories: number;
  recentProducts: Product[];
}
