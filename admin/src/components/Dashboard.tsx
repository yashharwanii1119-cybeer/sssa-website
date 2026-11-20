import React from 'react';
import { Product, Category } from '../types';
import {
  Package,
  CheckCircle2,
  FileEdit,
  FolderTree,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

interface DashboardProps {
  products: Product[];
  categories: Category[];
  onNavigate: (tab: string) => void;
  onEditProduct: (product: Product) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  products,
  categories,
  onNavigate,
  onEditProduct,
}) => {
  const publishedCount = products.filter((p) => p.status === 'PUBLISHED').length;
  const draftCount = products.filter((p) => p.status === 'DRAFT').length;
  const recentProducts = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      colour: 'from-amber-600 to-amber-700',
      desc: 'All catalog items',
    },
    {
      title: 'Published (Live)',
      value: publishedCount,
      icon: CheckCircle2,
      colour: 'from-emerald-600 to-emerald-700',
      desc: 'Visible to public',
    },
    {
      title: 'Drafts',
      value: draftCount,
      icon: FileEdit,
      colour: 'from-slate-600 to-slate-700',
      desc: 'Unpublished items',
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: FolderTree,
      colour: 'from-amber-800 to-[#1E140E]',
      desc: '30 Subcategories',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800">
            Welcome to Shree Shiv Shakti Art Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your furniture creations, categories, and international export catalog from here.
          </p>
        </div>

        <button
          onClick={() => onNavigate('add-product')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633] transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Creation</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{s.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{s.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.colour} text-white flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A77B42]" />
              <h3 className="font-bold text-sm text-slate-800">Recently Added Products</h3>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-semibold text-[#A77B42] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentProducts.map((p) => {
              const cat = categories.find((c) => c.id === p.categoryId);
              return (
                <div
                  key={p.id}
                  onClick={() => onEditProduct(p)}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.mainImage}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.name}</h4>
                      <p className="text-[11px] text-slate-500">
                        {cat?.title || 'Living Room'} • {p.material || 'Solid Wood'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                        p.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {p.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-800 mb-2">Quick Management</h3>
            <p className="text-xs text-slate-500 mb-4">
              Direct access to essential catalog configuration tools.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('add-product')}
                className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-[#A77B42] hover:bg-amber-50/40 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Add Product With Images</span>
                <PlusCircle className="w-4 h-4 text-[#A77B42]" />
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-[#A77B42] hover:bg-amber-50/40 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Edit / Reorder Catalog</span>
                <Package className="w-4 h-4 text-[#A77B42]" />
              </button>

              <button
                onClick={() => onNavigate('categories')}
                className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-[#A77B42] hover:bg-amber-50/40 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Browse 6 Core Categories</span>
                <FolderTree className="w-4 h-4 text-[#A77B42]" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
            <p className="font-bold mb-1">B2B Export Ready</p>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Any products published here automatically become queryable by your public showcase storefront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
