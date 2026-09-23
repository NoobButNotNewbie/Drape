import React from 'react';
import { User, Building2, ArrowRight, HelpCircle } from 'lucide-react';

export default function MobilePortalSelectPage({
  onSelectPersonal,
  onSelectBrand,
  onBackToApp,
}) {
  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-6 border-b border-[#EAE6DF]/60">
        <button
          onClick={() => onBackToApp?.('home')}
          className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]"
        >
          DRAPE
        </button>

        <button
          type="button"
          onClick={() => alert('DRAPE Help Center: Hotline hỗ trợ trực tiếp dành cho cá nhân & đối tác thương hiệu.')}
          className="w-7 h-7 rounded-full border border-[#9A968D] text-[#6A675F] hover:text-[#1A3C24] hover:border-[#1A3C24] flex items-center justify-center transition-colors"
          title="Trợ giúp / Help"
        >
          <HelpCircle className="w-4 h-4 stroke-[1.75]" />
        </button>
      </header>

      {/* Main Content */}
      <main className="py-6 flex-1 flex flex-col justify-center">
        {/* Title Group */}
        <div className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#6A675F] uppercase font-semibold block mb-2">
            ONBOARDING
          </span>
          <h1 className="font-serif-luxury text-3xl font-medium text-[#151816] leading-tight">
            How do you want to start with Drape?
          </h1>
        </div>

        {/* 2 Vertical Action Cards */}
        <div className="space-y-4">
          {/* Card 1: For Personal */}
          <div
            onClick={onSelectPersonal}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E7E3DC] shadow-xs active:scale-[0.99] hover:border-[#1A3C24] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#E8F2EB] text-[#1A3C24] flex items-center justify-center group-hover:scale-105 transition-transform">
                <User className="w-5 h-5 stroke-[1.75]" />
              </div>
              <ArrowRight className="w-5 h-5 text-[#9A968D] group-hover:text-[#1A3C24] group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="font-serif-luxury text-2xl font-normal text-[#1A3C24] mb-2">
              For Personal
            </h2>
            <p className="text-xs text-[#6A675F] leading-relaxed">
              Unlock your Style DNA with curated recommendations, professional consultations, and a
              digital smart wardrobe management system.
            </p>
          </div>

          {/* Card 2: For Brand */}
          <div
            onClick={onSelectBrand}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E7E3DC] shadow-xs active:scale-[0.99] hover:border-[#1A3C24] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#E8F2EB] text-[#1A3C24] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 stroke-[1.75]" />
              </div>
              <ArrowRight className="w-5 h-5 text-[#9A968D] group-hover:text-[#1A3C24] group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="font-serif-luxury text-2xl font-normal text-[#1A3C24] mb-2">
              For Brand
            </h2>
            <p className="text-xs text-[#6A675F] leading-relaxed">
              Join our partner program to manage catalogs, access consumer style insights, and showcase
              collections to our curated audience.
            </p>
          </div>
        </div>

        {/* Visual Preview Swatches */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {/* Swatch 1: Linen Fabric */}
          <div className="rounded-xl overflow-hidden border border-[#E7E3DC] bg-[#EBE7DF] h-28 relative shadow-2xs group">
            <div className="absolute top-1.5 left-2 z-10 font-mono text-[9px] text-[#6A675F] bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded">
              Drape - Lựa chọn vai trò
            </div>
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80')`,
              }}
            />
          </div>

          {/* Swatch 2: Window / Office Desk */}
          <div className="rounded-xl overflow-hidden border border-[#E7E3DC] bg-[#EBE7DF] h-28 relative shadow-2xs group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80')`,
              }}
            />
          </div>
        </div>
      </main>

      {/* Subtle bottom note */}
      <footer className="text-center pt-4 border-t border-[#EAE6DF]/60 text-[10px] font-mono tracking-widest text-[#9A968D] uppercase">
        © 2024 DRAPE DIGITAL STYLIST
      </footer>
    </div>
  );
}
