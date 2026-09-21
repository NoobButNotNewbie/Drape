import React from 'react';
import { X, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function LookbookModal({ outfit, onClose, onSelectProduct, products }) {
  if (!outfit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FBFBFA] rounded-2xl shadow-2xl border border-[#E5E0D6] overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-[#706C64] hover:text-[#151816] bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Outfit Image */}
        <div className="md:w-1/2 bg-[#F4F0E8] relative min-h-[300px] md:min-h-[480px]">
          <img
            src={outfit.image}
            alt={outfit.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-[#1C4A29] bg-[#ECF4EE]/95 backdrop-blur-sm rounded-sm shadow-xs">
              {outfit.matchBadge}
            </span>
          </div>
        </div>

        {/* Details Column */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#7D7971] mb-1">
              Curated Outfit Lookbook
            </div>

            <h3 className="font-serif-luxury text-2xl font-bold text-[#151816] mb-2">
              {outfit.title}
            </h3>

            <p className="text-xs text-[#6A675F] leading-relaxed mb-4">
              {outfit.fullDescription || outfit.description}
            </p>

            {/* Color Palette */}
            <div className="mb-5">
              <div className="text-[10px] font-bold text-[#45433E] uppercase tracking-wider mb-2">
                Color Harmony Palette
              </div>
              <div className="flex items-center space-x-2">
                {outfit.swatches.map((c, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-[10px] text-[#6E6B63]">
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: c }}
                    />
                    <span className="font-mono text-[9px] uppercase">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Style DNA Analysis */}
            <div className="bg-[#F3EFE7] rounded-xl p-4 border border-[#E3DDD1] mb-5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#1A3C24] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Style DNA Affinity Analysis</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#5D5A52]">
                {outfit.dnaInsights?.map((insight, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1A3C24] shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pieces in this Outfit */}
            <div>
              <div className="text-[10px] font-bold text-[#45433E] uppercase tracking-wider mb-2">
                Pieces in this Look
              </div>
              <div className="space-y-2">
                {outfit.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-white border border-[#EBE6DC]"
                  >
                    <span className="font-medium text-[#252826]">{item.name}</span>
                    <span className="text-[#1A3C24] font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-[#EAE5DC]">
            <button
              onClick={() => {
                onClose();
                if (products?.[0]) onSelectProduct(products[0]);
              }}
              className="w-full py-3 bg-[#183B22] hover:bg-[#112B18] text-white text-xs font-semibold tracking-widest uppercase rounded-md shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Items in this Look</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
