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
    const savedUser = localStorage.getItem('sssa_admin_user');
    const savedToken = localStorage.getItem('sssa_admin_token');
    // Only consider authenticated if a token is present
    if (savedUser && savedToken) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load live categories and live products from Neon backend on startup
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

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
        if (isMounted) {
          if (data.products) {
            setProducts(data.products);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Could not fetch products from API, checking local backup:', err);
          if (err.message && (err.message.includes('401') || err.message.includes('403') || err.message.includes('Forbidden') || err.message.includes('Unauthorized'))) {
            // Token is invalid or expired - force re-login to acquire a fresh JWT
            localStorage.removeItem('sssa_admin_token');
            localStorage.removeItem('sssa_admin_user');
            setCurrentUser(null);
            return;
          }
          setApiError('Unable to connect to live database. Please check your connection.');
          const saved = localStorage.getItem('sssa_admin_products');
          if (saved) {
            try {
              setProducts(JSON.parse(saved));
            } catch (e) {
              setProducts([]);
            }
          }
          setLoading(false);
        }
      });

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
    } catch (apiErr: any) {
      console.error('Backend API save error:', apiErr);
      throw apiErr;
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
      // Refresh full list from backend to maintain absolute single source of truth
      if (savedProduct) {
        setProducts([savedProduct, ...products.filter((p) => p.id !== savedProduct?.id)]);
      }
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
      console.error('Backend API delete error:', apiErr);
      alert('Failed to delete product from database. Please check your connection.');
      return;
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
      console.error('Backend duplicate API error:', apiErr);
      alert('Failed to duplicate product in database.');
      return;
    }

    if (duplicated) {
      setProducts([duplicated, ...products]);
    }
  };

  const handleToggleProductStatus = async (id: string) => {
    const current = products.find((p) => p.id === id);
    const nextStatus = current?.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

    try {
      if (id.includes('-') && id.length > 20) {
        await adminApiService.toggleStatus(id, nextStatus as any);
      }
    } catch (apiErr) {
      console.error('Backend toggle status error:', apiErr);
      alert('Failed to update status on server.');
      return;
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
