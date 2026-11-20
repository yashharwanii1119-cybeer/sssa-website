import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@shreeshivshaktiart.com');
  const [password, setPassword] = useState('Sssa@Admin2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Mock / Local verification for quick initial access
      if (email.toLowerCase() === 'admin@shreeshivshaktiart.com' && password === 'Sssa@Admin2026') {
        const user: User = {
          id: 'usr-admin-1',
          name: 'Shree Shiv Shakti Art Admin',
          email: 'admin@shreeshivshaktiart.com',
          role: 'SUPERADMIN',
        };
        localStorage.setItem('sssa_admin_token', 'mock-jwt-token-active');
        localStorage.setItem('sssa_admin_user', JSON.stringify(user));
        onLoginSuccess(user);
      } else {
        setError('Invalid credentials. Please enter authorized administrator details.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#1E140E] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#271911] border border-[#A77B42]/30 rounded-2xl p-8 shadow-2xl text-[#EAE0D2]">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A77B42] to-[#8f6633] text-white mx-auto flex items-center justify-center font-serif text-2xl font-bold shadow-lg mb-4 border border-amber-300/30">
            S
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
            SHREE SHIV SHAKTI ART
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#C4975C] mt-1 font-semibold">
            Administrative Control Panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-950/60 border border-red-800/40 rounded-lg text-xs text-red-200 flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#EAE0D2]/80 mb-1.5">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C4975C] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shreeshivshaktiart.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1E140E] border border-[#A77B42]/40 text-xs text-white focus:outline-none focus:border-[#C4975C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#EAE0D2]/80 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C4975C] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1E140E] border border-[#A77B42]/40 text-xs text-white focus:outline-none focus:border-[#C4975C]"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#A77B42] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#8f6633] transition-colors shadow-lg cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#A77B42]/20 text-center">
          <p className="text-[11px] text-[#EAE0D2]/50">
            Protected internal system. Unauthorized access attempts are monitored and recorded.
          </p>
        </div>
      </div>
    </div>
  );
};
