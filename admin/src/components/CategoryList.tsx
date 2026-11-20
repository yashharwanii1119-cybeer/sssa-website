import React from 'react';
import { Category } from '../types';
import { FolderTree, Layers, ChevronRight } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onSelectCategory?: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-800">
            Category &amp; Subcategory Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Strictly synchronized with the 6 core collections and 30 subcategories of Shree Shiv Shakti Art.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1E140E] text-[#C4975C] flex items-center justify-center font-bold text-xs">
                  {cat.displayOrder}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-slate-800">{cat.title}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">/{cat.slug}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#A77B42] border border-amber-200">
                {cat.subcategories.length} Subcategories
              </span>
            </div>

            <div className="p-4 flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Mapped Subcategories
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.subcategories.map((sub) => (
                  <span
                    key={sub.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium"
                  >
                    <span>• {sub.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Synchronized with Public Storefront</span>
              <Layers className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
