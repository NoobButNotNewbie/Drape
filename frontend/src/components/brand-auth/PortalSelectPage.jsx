import React from 'react';
import { User, Briefcase, ArrowRight } from 'lucide-react';
import BrandAuthHeader from './BrandAuthHeader';
import BrandAuthFooter from './BrandAuthFooter';

export default function PortalSelectPage({
  onSelectPersonal,
  onSelectBrand,
  onNavigate,
  onBackToApp,
}) {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <BrandAuthHeader
        activeScreen="portal-select"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 max-w-6xl mx-auto w-full">
        {/* Intro Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#636059] uppercase block mb-3">
            BEGIN YOUR JOURNEY
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#151816] tracking-tight mb-4">
            Refine Your Identity
          </h1>
          <p className="text-xs sm:text-sm text-[#6A675F] leading-relaxed max-w-lg mx-auto">
            Select your path to access personalized aesthetic consultations tailored for
            individuals or brand ecosystems.
          </p>
        </div>

        {/* 2 Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full mx-auto mb-14">
          {/* Card 1: For Personal */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E7E3DC] shadow-xs hover:shadow-md hover:border-[#CFD9D1] transition-all duration-300 flex flex-col justify-between items-center text-center group">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#E8F2EB] text-[#1A3C24] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#DEECE2] transition-all duration-300">
                <User className="w-7 h-7 stroke-[1.75]" />
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#151816] mb-3">
                For Personal
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[#6A675F] leading-relaxed mb-8 max-w-xs">
                Experience a private digital concierge. Define your Style DNA, curate a timeless
                wardrobe, and receive precision outfit recommendations based on your physique and lifestyle.
              </p>
            </div>

            {/* Action */}
            <button
              onClick={onSelectPersonal}
              className="w-full py-3 px-5 rounded-md border border-[#1A3C24] text-[#1A3C24] hover:bg-[#1A3C24] hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-xs"
            >
              <span>Select Individual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: For Brand */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E7E3DC] shadow-xs hover:shadow-md hover:border-[#CFD9D1] transition-all duration-300 flex flex-col justify-between items-center text-center group">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#E8F2EB] text-[#1A3C24] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#DEECE2] transition-all duration-300">
                <Briefcase className="w-7 h-7 stroke-[1.75]" />
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#151816] mb-3">
                For Brand
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[#6A675F] leading-relaxed mb-8 max-w-xs">
                Transform your retail or fashion business with AI-driven style intelligence.
                Integrate our API for smart sizing, trend forecasting, and editorial-level virtual
                merchandising.
              </p>
            </div>

            {/* Action */}
            <button
              onClick={onSelectBrand}
              className="w-full py-3 px-5 rounded-md border border-[#1A3C24] text-[#1A3C24] hover:bg-[#1A3C24] hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-xs"
            >
              <span>Explore Enterprise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Authenticity & Accuracy Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-mono tracking-[0.2em] text-[#7A766F] uppercase">
          <div className="flex items-center space-x-2">
            <span>AUTHENTICITY VERIFIED</span>
          </div>
          <span className="text-[#D3CECA] hidden sm:inline">—</span>
          <div className="flex items-center space-x-2">
            <span>98.4% DNA ACCURACY</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BrandAuthFooter />
    </div>
  );
}
