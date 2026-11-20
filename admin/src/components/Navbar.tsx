import React from 'react';
import { User } from '../types';
import { Bell, Globe, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  user: User;
  onOpenPublicSite: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenPublicSite }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Manufacturing &amp; Export Control Suite
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenPublicSite}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium hover:bg-amber-100 transition-colors cursor-pointer"
          title="Open Public Showcase Site"
        >
          <Globe className="w-3.5 h-3.5 text-amber-700" />
          <span>Live Storefront</span>
        </button>

        <div className="h-5 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1E140E] text-[#C4975C] flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0)}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
            <p className="text-[10px] text-slate-500">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
