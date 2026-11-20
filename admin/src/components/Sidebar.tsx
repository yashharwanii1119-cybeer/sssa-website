import React from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Image,
  Inbox,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  productCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  productCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: productCount },
    { id: 'add-product', label: 'Add New Product', icon: PlusCircle },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'enquiries', label: 'Enquiries', icon: Inbox, badge: 'Soon' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1E140E] text-[#EAE0D2] flex flex-col shrink-0 border-r border-[#A77B42]/30 select-none min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#A77B42]/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#A77B42] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md">
          S
        </div>
        <div>
          <h1 className="font-serif font-bold text-sm tracking-wide text-white leading-tight">
            SHREE SHIV SHAKTI
          </h1>
          <p className="text-[10px] text-[#C4975C] tracking-wider uppercase">
            Admin Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-[#A77B42] font-semibold">
          Catalogue Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#A77B42] text-white shadow-md'
                  : 'text-[#EAE0D2]/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#C4975C]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#2E1F16] text-[#C4975C] border border-[#A77B42]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Security Info & Logout */}
      <div className="p-4 border-t border-[#A77B42]/20 space-y-3">
        <div className="px-3 py-2 rounded-lg bg-[#281A12] border border-[#A77B42]/20 text-[11px] text-[#EAE0D2]/70 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>Role: Super Administrator</span>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-950/40 text-red-200 hover:bg-red-900/60 transition-colors text-xs font-semibold cursor-pointer border border-red-800/40"
        >
          <LogOut className="w-4 h-4" />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
};
