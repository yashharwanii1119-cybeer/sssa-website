import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { Login } from './components/Login';
import { Product, Category, User } from './types';
import { initialProducts, initialCategories, defaultUser } from './data/mockData';
import { adminApiService } from './services/api';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sssa_admin_user');
    return saved ? JSON.parse(saved) : defaultUser; // Start logged-in with default user in development
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sssa_admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load live categories and live products from Neon backend on startup
  useEffect(() => {
    let isMounted = true;

    adminApiService
      .getCategories()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setCategories(data);
        }
      })
      .catch((err) => console.warn('Could not fetch categories from API:', err));

    adminApiService
      .getProducts({ limit: 100 })
      .then((data) => {
        if (isMounted && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.warn('Could not fetch products from API:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync products to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('sssa_admin_products', JSON.stringify(products));
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem('sssa_admin_token');
    localStorage.removeItem('sssa_admin_user');
    setCurrentUser(null);
  };

  const handleOpenPublicSite = () => {
    window.open('https://yashharwanii1119-cybeer.github.io/sssa-website/', '_blank');
  };

  // Product CRUD Handlers with backend database sync
  const handleCreateOrUpdateProduct = async (data: Partial<Product>) => {
    let savedProduct: Product | null = null;

    try {
      if (editingProduct && editingProduct.id.includes('-') && editingProduct.id.length > 20) {
        // Real UUID from database
        savedProduct = await adminApiService.updateProduct(editingProduct.id, data);
      } else if (!editingProduct) {
        // Create in database
        savedProduct = await adminApiService.createProduct(data);
      }
    } catch (apiErr) {
      console.warn('Backend API save error, updating local store:', apiErr);
    }

    if (editingProduct) {
      // Update local state
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? ({ ...p, ...data, ...(savedProduct || {}), updatedAt: new Date().toISOString() } as Product)
          : p
      );
      setProducts(updated);
    } else {
      // Create local state fallback or enriched
      const newProduct: Product = savedProduct || {
        id: `prod-${Date.now()}`,
        name: data.name || 'Untitled Product',
        slug: data.name?.toLowerCase().replace(/\s+/g, '-') || `prod-${Date.now()}`,
        sku: data.sku || `SSSA-${Math.floor(1000 + Math.random() * 9000)}`,
        status: data.status || 'DRAFT',
        isFeatured: data.isFeatured || false,
        categoryId: data.categoryId || categories[0].id,
        subcategoryId: data.subcategoryId || categories[0].subcategories[0].id,
        shortDescription: data.shortDescription,
        description: data.description,
        material: data.material,
        woodType: data.woodType,
        finish: data.finish,
        colour: data.colour,
        dimensions: data.dimensions,
        weight: data.weight,
        customizationAvailable: data.customizationAvailable ?? true,
        mainImage: data.mainImage || '',
        images: data.images || [],
        tags: data.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([newProduct, ...products]);
    }

    setEditingProduct(null);
    setActiveTab('products');
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      if (id.includes('-') && id.length > 20) {
        await adminApiService.deleteProduct(id);
      }
    } catch (apiErr) {
      console.warn('Backend API delete error:', apiErr);
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicateProduct = async (product: Product) => {
    let duplicated: Product | null = null;
    try {
      if (product.id.includes('-') && product.id.length > 20) {
        duplicated = await adminApiService.duplicateProduct(product.id);
      }
    } catch (apiErr) {
      console.warn('Backend duplicate API error:', apiErr);
    }

    const copy: Product = duplicated || {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (Copy)`,
      sku: product.sku ? `${product.sku}-COPY` : undefined,
      slug: `${product.slug}-copy-${Date.now()}`,
      status: 'DRAFT',
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts([copy, ...products]);
  };

  const handleToggleProductStatus = async (id: string) => {
    const current = products.find((p) => p.id === id);
    const nextStatus = current?.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

    try {
      if (id.includes('-') && id.length > 20) {
        await adminApiService.toggleStatus(id, nextStatus as any);
      }
    } catch (apiErr) {
      console.warn('Backend toggle status error:', apiErr);
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: nextStatus as any,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('create-product');
  };

  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'create-product') {
            setEditingProduct(null);
          }
          setActiveTab(tab);
        }}
        onLogout={handleLogout}
        productCount={products.length}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar user={currentUser} onOpenPublicSite={handleOpenPublicSite} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              products={products}
              categories={categories}
              onNavigate={(tab) => {
                if (tab === 'create-product') setEditingProduct(null);
                setActiveTab(tab);
              }}
              onEditProduct={handleStartEdit}
            />
          )}

          {activeTab === 'products' && (
            <ProductList
              products={products}
              categories={categories}
              onAddNew={() => {
                setEditingProduct(null);
                setActiveTab('create-product');
              }}
              onEdit={handleStartEdit}
              onDelete={handleDeleteProduct}
              onDuplicate={handleDuplicateProduct}
              onToggleStatus={handleToggleProductStatus}
            />
          )}

          {activeTab === 'create-product' && (
            <ProductForm
              initialProduct={editingProduct}
              categories={categories}
              onSave={handleCreateOrUpdateProduct}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab('products');
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
