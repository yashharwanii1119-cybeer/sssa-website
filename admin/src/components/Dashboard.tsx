import React from 'react';
import { Product, Category } from '../types';
import {
  Package,
  CheckCircle2,
  FileEdit,
  PlusCircle,
  ArrowRight,
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
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      colour: 'from-amber-600 to-amber-700',
      desc: 'All catalog items',
    },
    {
      title: 'Published Products',
      value: publishedCount,
      icon: CheckCircle2,
      colour: 'from-emerald-600 to-emerald-700',
      desc: 'Live on storefront',
    },
    {
      title: 'Draft Products',
      value: draftCount,
      icon: FileEdit,
      colour: 'from-slate-600 to-slate-700',
      desc: 'Unpublished items',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-800">
            Catalog Overview
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Summary of your handcrafted furniture products and publishing status.
          </p>
        </div>

        <button
          onClick={() => onNavigate('create-product')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#A77B42] text-white rounded-lg text-xs font-semibold hover:bg-[#8f6633] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Product</span>
        </button>
      </div>

      {/* KPI Stats Cards (3 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{s.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{s.desc}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.colour} text-white flex items-center justify-center shadow-xs`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recently Added Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
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
          {recentProducts.length > 0 ? (
            recentProducts.map((p) => {
              const cat = categories.find((c) => c.id === p.categoryId);
              return (
                <div
                  key={p.id}
                  onClick={() => onEditProduct(p)}
                  className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.mainImage}
                      alt={p.name}
                      className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{p.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {p.sku ? `${p.sku} • ` : ''}{cat?.title || 'Living Room'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        p.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {p.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No products found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
