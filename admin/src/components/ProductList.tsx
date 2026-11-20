import React, { useState } from 'react';
import { Product, Category } from '../types';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  Star,
  ExternalLink
} from 'lucide-react';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onDuplicate: (product: Product) => void;
  onToggleStatus: (productId: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  onAddNew,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.material && p.material.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' || p.categoryId === selectedCategory;

    const matchesStatus =
      selectedStatus === 'ALL' || p.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-800">Product Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your furniture listings, update specifications, and toggle publishing.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633] transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name, SKU..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#A77B42]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#A77B42]"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#A77B42]"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category / Subcategory</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Material &amp; Finish</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filtered.length > 0 ? (
                filtered.map((product) => {
                  const cat = categories.find((c) => c.id === product.categoryId);
                  const sub = cat?.subcategories.find((s) => s.id === product.subcategoryId);

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">{product.name}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{product.dimensions || 'Custom'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{cat?.title || 'Living Room'}</span>
                        <p className="text-[11px] text-slate-500">{sub?.name || 'General'}</p>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600">
                        {product.sku || '—'}
                      </td>

                      <td className="py-3 px-4">
                        <p className="line-clamp-1 font-medium text-slate-800">{product.material || 'Solid Wood'}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{product.finish || 'Natural'}</p>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => onToggleStatus(product.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                            product.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle publish status"
                        >
                          {product.status === 'PUBLISHED' ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>Live</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEdit(product)}
                            className="p-1.5 text-slate-500 hover:text-[#A77B42] hover:bg-amber-50 rounded-md transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onDuplicate(product)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Duplicate Product"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                                onDelete(product.id);
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No products found matching your current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
