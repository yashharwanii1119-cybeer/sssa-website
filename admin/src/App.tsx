import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { CategoryList } from './components/CategoryList';
import { Login } from './components/Login';
import { Product, Category, User } from './types';
import { initialProducts, initialCategories, defaultUser } from './data/mockData';

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

  const [categories] = useState<Category[]>(initialCategories);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  // Product CRUD Handlers
  const handleCreateOrUpdateProduct = (data: Partial<Product>) => {
    if (editingProduct) {
      // Update
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? ({ ...p, ...data, updatedAt: new Date().toISOString() } as Product)
          : p
      );
      setProducts(updated);
    } else {
      // Create
      const newProduct: Product = {
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

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicateProduct = (product: Product) => {
    const copy: Product = {
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

  const handleToggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED',
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('add-product');
  };

  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'add-product') {
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
                if (tab === 'add-product') setEditingProduct(null);
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
                setActiveTab('add-product');
              }}
              onEdit={handleStartEdit}
              onDelete={handleDeleteProduct}
              onDuplicate={handleDuplicateProduct}
              onToggleStatus={handleToggleProductStatus}
            />
          )}

          {activeTab === 'add-product' && (
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

          {activeTab === 'categories' && (
            <CategoryList categories={categories} />
          )}

          {activeTab === 'media' && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
              <h3 className="font-serif font-bold text-lg text-slate-800">Media Library</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Product images can be uploaded directly within the Product Editor or synced to Cloudinary persistent storage.
              </p>
              <button
                onClick={() => setActiveTab('add-product')}
                className="px-4 py-2 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633]"
              >
                Go to Product Editor
              </button>
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
              <h3 className="font-serif font-bold text-lg text-slate-800">Enquiries &amp; Quotation Leads</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Customer inquiries from WhatsApp &amp; the Contact Form are logged here for export tracking.
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 max-w-xl mx-auto space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-800 border-b border-slate-100 pb-2">
                Administrator Settings
              </h3>
              <div className="text-xs space-y-2 text-slate-600">
                <p><strong>System Role:</strong> {currentUser.role}</p>
                <p><strong>Logged Email:</strong> {currentUser.email}</p>
                <p><strong>Database Status:</strong> PostgreSQL Architecture Ready</p>
                <p><strong>Image Storage:</strong> Cloudinary Multi-tier Provider</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
