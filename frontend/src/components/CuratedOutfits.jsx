import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { curatedOutfits } from '../data/mockData';

export default function CuratedOutfits({ isMobileFrame, onSelectOutfit, onOpenLookbook }) {
  // Mobile layout matching screenshot 1
  if (isMobileFrame) {
    return (
      <section className="px-4 py-6 border-b border-[#EFECE6] bg-[#FBFBFA]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-luxury text-lg font-bold text-[#151816]">
            Curated Outfits
          </h3>
          <button
            onClick={() => onOpenLookbook(curatedOutfits[0])}
            className="text-xs font-serif-luxury text-[#1A3C24] underline hover:text-[#122B1A] font-medium transition-colors"
          >
            View Lookbook
          </button>
        </div>

        <div className="space-y-3">
          {curatedOutfits.slice(0, 3).map((outfit) => (
            <div
              key={outfit.id}
              onClick={() => onSelectOutfit(outfit)}
              className="bg-white rounded-xl p-3 border border-[#EDE8E0] shadow-2xs hover:border-[#D5CEC2] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                {/* Thumbnail Image */}
                <div className="w-16 h-18 rounded-lg overflow-hidden shrink-0 bg-[#F4F1EA]">
                  <img
                    src={outfit.image}
                    alt={outfit.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-2">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#1C4A29] bg-[#ECF4EE] rounded-sm mb-1">
                    {outfit.matchBadge}
                  </span>

                  <h4 className="font-serif-luxury text-sm font-bold text-[#151816] truncate mb-1.5">
                    {outfit.title}
                  </h4>

                  {/* Swatches */}
                  <div className="flex items-center space-x-1.5">
                    {outfit.swatches.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#A19D94] group-hover:text-[#151816] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop layout matching screenshot 2
  const mainOutfit = curatedOutfits[0]; // The Nautical Minimalist
  const middleTop = curatedOutfits[1]; // Evening Courtyard
  const middleBottom = curatedOutfits[2]; // Texture Study 04
  const rightOutfit = curatedOutfits[3]; // The City Wanderer

  return (
    <section className="py-10 border-b border-[#EAE6DF] bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#151816]">
              Curated Outfits
            </h3>
            <p className="text-xs text-[#706D65] mt-1 font-normal">
              Expertly styled combinations based on your Style DNA.
            </p>
          </div>

          <button
            onClick={() => onOpenLookbook(mainOutfit)}
            className="group font-serif-luxury text-sm font-semibold text-[#1A3C24] hover:text-[#122B1A] flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View Lookbook</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Column Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {/* Column 1: The Nautical Minimalist (4 cols or 5 cols) */}
          <div
            onClick={() => onSelectOutfit(mainOutfit)}
            className="md:col-span-5 lg:col-span-4 bg-white border border-[#E9E4DC] rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1EA]">
              <img
                src={mainOutfit.image}
                alt={mainOutfit.title}
                className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#151816]">
                  {mainOutfit.title}
                </h4>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#1C4A29] bg-[#ECF4EE] rounded-sm">
                  {mainOutfit.matchPercentage}% Match
                </span>
              </div>

              <p className="text-xs text-[#6A675F] leading-relaxed mb-3">
                {mainOutfit.description}
              </p>

              {/* Swatches */}
              <div className="flex items-center space-x-2">
                {mainOutfit.swatches.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Stacked 2 Cards (Evening Courtyard & Texture Study 04) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-5">
            {/* Top Card: Evening Courtyard */}
            <div
              onClick={() => onSelectOutfit(middleTop)}
              className="bg-white border border-[#E9E4DC] rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col flex-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA]">
                <img
                  src={middleTop.image}
                  alt={middleTop.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 bg-white flex items-center justify-between">
                <h4 className="font-serif-luxury text-sm font-bold text-[#151816]">
                  {middleTop.title}
                </h4>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#1C4A29] bg-[#ECF4EE] rounded-sm">
                  {middleTop.matchPercentage}% Match
                </span>
              </div>
            </div>

            {/* Bottom Card: Texture Study 04 */}
            <div
              onClick={() => onSelectOutfit(middleBottom)}
              className="bg-white border border-[#E9E4DC] rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col flex-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA]">
                <img
                  src={middleBottom.image}
                  alt={middleBottom.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 bg-white flex items-center justify-between">
                <h4 className="font-serif-luxury text-sm font-bold text-[#151816]">
                  {middleBottom.title}
                </h4>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#1C4A29] bg-[#ECF4EE] rounded-sm">
                  {middleBottom.matchPercentage}% Match
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: The City Wanderer (Tall Card) */}
          <div
            onClick={() => onSelectOutfit(rightOutfit)}
            className="md:col-span-3 lg:col-span-4 bg-white border border-[#E9E4DC] rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1EA]">
              <img
                src={rightOutfit.image}
                alt={rightOutfit.title}
                className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            <div className="p-4 bg-white flex items-center justify-between">
              <h4 className="font-serif-luxury text-base font-bold text-[#151816]">
                {rightOutfit.title}
              </h4>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#1C4A29] bg-[#ECF4EE] rounded-sm">
                {rightOutfit.matchPercentage}% Match
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
