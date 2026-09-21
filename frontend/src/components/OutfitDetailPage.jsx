import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Lightbulb,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { outfitDetails } from '../data/outfitDetailData';

export default function OutfitDetailPage({
  isMobileFrame,
  outfitId = 'the-modern-minimalist',
  onBack,
  onNavigateToCanvas,
  onOpenAuth,
}) {
  const [selectedOutfitKey, setSelectedOutfitKey] = useState(
    isMobileFrame ? 'navy-cream-heritage' : 'the-modern-minimalist'
  );
  const [isLiked, setIsLiked] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const outfit = outfitDetails[selectedOutfitKey] || outfitDetails['the-modern-minimalist'];

  const handleAffiliateClick = (actionLabel, itemName) => {
    setToastMessage(`Đang chuyển hướng tới ${actionLabel} cho "${itemName}"...`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // ----------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789556665554.png)
  // ----------------------------------------------------
  if (isMobileFrame) {
    const mobOutfit = outfitDetails['navy-cream-heritage'];

    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-24">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#16291C] text-white px-4 py-2 rounded-lg shadow-lg text-xs flex items-center space-x-2 border border-[#2A4933] animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Mobile Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30">
          <button
            onClick={onBack}
            className="p-1 text-[#33312B] hover:text-[#183B22]"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#183B22]">
            DRAPE
          </span>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-1 text-[#33312B] hover:text-[#C53030]"
            title="Lưu"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? 'fill-[#C53030] text-[#C53030]' : 'text-[#33312B]'
              }`}
            />
          </button>
        </header>

        {/* Hero Image */}
        <div className="px-4 pt-3 pb-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xs bg-[#F4F0E8]">
            <img
              src={mobOutfit.heroImage}
              alt={mobOutfit.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Title & Tags */}
        <div className="px-5 pb-5 border-b border-[#EAE6DF]">
          <h2 className="font-serif-luxury text-xl font-bold text-[#151816] mb-3 leading-snug">
            {mobOutfit.title}
          </h2>

          <div className="flex flex-wrap gap-2">
            {mobOutfit.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white border border-[#E0DBD0] text-[#4A4740] rounded-full text-[10px] font-semibold tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Items In This Look */}
        <div className="px-5 py-5 border-b border-[#EAE6DF]">
          <h3 className="text-xs uppercase font-bold tracking-wider text-[#736F67] mb-3">
            ITEMS IN THIS LOOK ({mobOutfit.items.length} SẢN PHẨM)
          </h3>

          <div className="space-y-3">
            {mobOutfit.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E6E1D7] p-3 shadow-2xs flex items-center space-x-3"
              >
                <div className="w-16 h-16 rounded-lg bg-[#FAF8F5] border border-[#EDE8DE] overflow-hidden shrink-0 p-1 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#8A867E]">
                      {item.brand}
                    </span>
                    {item.badge && (
                      <span className="text-[8px] font-bold text-[#183B22] bg-[#ECF4EE] px-1.5 py-0.5 rounded-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif-luxury text-xs font-bold text-[#151816] truncate mb-0.5">
                    {item.name}
                  </h4>
                  <div className="font-serif-luxury text-xs font-bold text-[#183B22] mb-2">
                    {item.price}
                  </div>

                  <button
                    onClick={() => handleAffiliateClick('WEBSITE', item.name)}
                    className="w-full py-1 text-[10px] font-bold tracking-widest text-[#4A4740] bg-[#FAF8F5] hover:bg-[#183B22] hover:text-white border border-[#D5CEC0] rounded-sm transition-colors"
                  >
                    WEBSITE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#8C8880] italic leading-relaxed mt-4 text-center">
            Drape nhận hoa hồng khi bạn mua qua link. Không ảnh hưởng giá bạn trả. Giá có thể thay đổi tùy khuyến mãi.
          </p>
        </div>

        {/* Similar Outfits */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif-luxury text-base font-bold text-[#151816]">
              Gợi ý tương tự
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#183B22] cursor-pointer">
              XEM TẤT CẢ
            </span>
          </div>

          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
            {mobOutfit.similarOutfits.map((sim) => (
              <div
                key={sim.id}
                onClick={() => setSelectedOutfitKey('the-modern-minimalist')}
                className="w-36 shrink-0 rounded-xl bg-white border border-[#E6E1D7] overflow-hidden shadow-2xs cursor-pointer group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={sim.image}
                    alt={sim.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <h5 className="font-serif-luxury text-xs font-bold text-[#151816] truncate">
                    {sim.title}
                  </h5>
                  <div className="text-[9px] text-[#86837B]">
                    {sim.itemsCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789556665574.png)
  // ----------------------------------------------------
  const deskOutfit = outfitDetails['the-modern-minimalist'];

  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#16291C] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 border border-[#2B4B34] animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Breadcrumb & Back */}
        <div className="flex items-center space-x-3 mb-6 text-xs text-[#706D65]">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 hover:text-[#183B22] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Bảng tin</span>
          </button>
          <span>/</span>
          <span className="text-[#183B22] font-semibold">Chi tiết Bộ phối đồ</span>
        </div>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Column 1 (Left): Hero Image (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D6] rounded-2xl overflow-hidden shadow-xs relative">
            <div className="relative aspect-[3/4] bg-[#FAF8F5]">
              <img
                src={deskOutfit.heroImage}
                alt={deskOutfit.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#DDD7CD] rounded text-[9px] font-mono tracking-widest text-[#55524B] uppercase shadow-2xs">
                {deskOutfit.visualizerTag}
              </div>
            </div>
          </div>

          {/* Column 2 (Right): Details, Items & Stylist Insights (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header Badges & Title */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 text-[10px] font-bold tracking-widest text-[#183B22] uppercase mb-2">
                <span>{deskOutfit.styleProfile}</span>
                <span>•</span>
                <span className="bg-[#ECF4EE] px-2 py-0.5 rounded-sm">
                  {deskOutfit.matchScoreBadge}
                </span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#151816] tracking-tight mb-3">
                {deskOutfit.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                {deskOutfit.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 bg-white border border-[#E0DBD0] text-[#55524B] rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Items in this look */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-[#6B675E] uppercase tracking-wider mb-3">
                <span>Items in this look</span>
                <span className="font-mono text-[10px]">
                  {deskOutfit.items.length} PIECES TOTAL
                </span>
              </div>

              <div className="space-y-3">
                {deskOutfit.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-[#E6E1D7] p-3.5 shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] overflow-hidden shrink-0 p-1 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold tracking-wider text-[#8A867E]">
                            {item.brand}
                          </span>
                          {item.isLocalBrand && (
                            <span className="text-[8px] font-bold text-[#183B22] bg-[#ECF4EE] px-1.5 py-0.2 rounded-xs uppercase">
                              THƯƠNG HIỆU VIỆT
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-[#151816] truncate">
                          {item.name}
                        </h4>
                        <div className="font-serif-luxury text-xs font-bold text-[#183B22]">
                          {item.price}
                        </div>
                      </div>
                    </div>

                    {/* Affiliate Action Buttons */}
                    <div className="flex items-center space-x-2 shrink-0">
                      {item.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAffiliateClick(act.label, item.name)}
                          className={`px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-wider transition-colors ${
                            act.type === 'shopee'
                              ? 'bg-[#183B22] hover:bg-[#122E1A] text-white'
                              : act.type === 'shopee-mall'
                              ? 'bg-[#D03B2A] hover:bg-[#B32D1E] text-white'
                              : act.type === 'tiktok'
                              ? 'bg-black hover:bg-[#222] text-white'
                              : 'bg-white hover:bg-[#FAF8F5] text-[#33312C] border border-[#DDD7CD]'
                          }`}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylist Insights Box */}
            <div className="rounded-xl bg-[#F0F5F1] border border-[#D5E5D8] p-5 shadow-2xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#183B22] uppercase tracking-wider mb-3">
                <Lightbulb className="w-4 h-4 text-[#183B22]" />
                <span>Stylist Insights</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#3E4D41] leading-relaxed mb-4">
                {deskOutfit.stylistInsights.map((insight) => (
                  <div key={insight.num} className="flex items-start space-x-2.5">
                    <span className="font-mono font-bold text-[#183B22] shrink-0">
                      {insight.num}
                    </span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: insight.text.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong>$1</strong>'
                        ),
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#D5E5D8] text-xs">
                <span className="font-mono text-[10px] font-bold text-[#183B22]">
                  DNA AI CONFIDENCE: {deskOutfit.aiConfidence}
                </span>

                <button
                  onClick={onOpenAuth}
                  className="font-serif-luxury font-bold text-xs text-[#183B22] hover:underline flex items-center space-x-1"
                >
                  <span>Ask Stylist chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Gợi ý tương tự */}
        <div className="border-t border-[#EAE6DF] pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#151816]">
              Gợi ý tương tự
            </h3>
            <button
              onClick={() => setSelectedOutfitKey('navy-cream-heritage')}
              className="text-xs font-serif-luxury font-semibold text-[#183B22] hover:underline flex items-center space-x-1"
            >
              <span>Xem thêm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {deskOutfit.similarOutfits.map((sim) => (
              <div
                key={sim.id}
                onClick={() => setSelectedOutfitKey('navy-cream-heritage')}
                className="bg-white rounded-xl border border-[#E6E1D7] overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={sim.image}
                    alt={sim.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-bold text-[#183B22] bg-[#ECF4EE] rounded-sm shadow-2xs">
                    {sim.matchBadge}
                  </span>
                </div>

                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-[#151816]">
                      {sim.title}
                    </h4>
                    <span className="text-[10px] text-[#706D65]">
                      {sim.itemsCount}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#8A867E]">
                    {sim.code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
