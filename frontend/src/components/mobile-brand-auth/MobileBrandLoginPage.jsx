import React, { useState } from 'react';
import { Briefcase, Share2, LayoutGrid, Check } from 'lucide-react';

export default function MobileBrandLoginPage({
  onNavigate,
  onBackToApp,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({ email });
        } else if (onBackToApp) {
          onBackToApp('home');
        }
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-6">
        <button
          onClick={() => onBackToApp?.('home')}
          className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]"
        >
          DRAPE
        </button>

        <div className="w-9 h-9 rounded-xl bg-[#EFECE6] border border-[#E2DDD3] text-[#4A4740] flex items-center justify-center">
          <Briefcase className="w-4 h-4 stroke-[1.75]" />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4 flex-1 flex flex-col justify-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif-luxury text-3xl font-medium text-[#1A3C24] mb-2 tracking-tight">
            Drape for Brand
          </h1>
          <p className="text-xs text-[#6A675F] leading-relaxed">
            Manage your catalog and connect with our curated audience.
          </p>
        </div>

        {/* Underline Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-[#4A4740] mb-1">
              Brand Email/Username
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. partner@luxurybrand.vn"
              className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-[#4A4740]">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate?.('brand-forgot')}
                className="font-mono text-[10px] tracking-wider text-[#1A3C24] font-semibold hover:underline"
              >
                FORGOT PASSWORD?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full py-3.5 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-8"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Authorized — Accessing Dashboard</span>
              </>
            ) : isLoading ? (
              <span>Verifying...</span>
            ) : (
              <span>Brand Login</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-7 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#EAE6DF]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#FBFBFA] px-3 font-mono text-[9px] tracking-[0.2em] text-[#9A968D] uppercase">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        {/* 2 Social Buttons Side by Side */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            onClick={() => {
              setEmail('director@tailorbrand.vn');
              setPassword('drapeSecure2026!');
            }}
            className="py-3 px-3 bg-white hover:bg-[#F3EFE7] border border-[#E2DDD3] rounded-md text-[11px] font-mono font-semibold tracking-wider text-[#2A2824] flex items-center justify-center space-x-2 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span>LINKEDIN BIZ</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEmail('admin@workspace.luxury');
              setPassword('drapeSecure2026!');
            }}
            className="py-3 px-3 bg-white hover:bg-[#F3EFE7] border border-[#E2DDD3] rounded-md text-[11px] font-mono font-semibold tracking-wider text-[#2A2824] flex items-center justify-center space-x-2 transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#5A5750]" />
            <span>WORKSPACE</span>
          </button>
        </div>

        {/* Bottom Link to Register */}
        <div className="text-center text-xs text-[#52504A]">
          <span>New Brand? </span>
          <button
            type="button"
            onClick={() => onNavigate?.('brand-register')}
            className="font-bold text-[#1A3C24] hover:underline"
          >
            Join our partner program
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-6 border-t border-[#EAE6DF]/60 text-center">
        <div className="flex justify-center space-x-4 font-mono text-[9px] tracking-widest text-[#8A867E] uppercase mb-1.5">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24]">
            PRIVACY POLICY
          </a>
          <span>·</span>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24]">
            TERMS OF SERVICE
          </a>
        </div>
        <div className="font-mono text-[8.5px] tracking-widest text-[#A29E96] uppercase">
          © 2024 DRAPE DIGITAL STYLIST SOLUTIONS
        </div>
      </footer>
    </div>
  );
}
