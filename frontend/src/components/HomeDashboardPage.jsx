import React, { useState } from 'react';
import {
  Wand2,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Bell,
  Search,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  heroCollection,
  quickActionCards,
  dailySuggestions,
  weeklyStyleAnalysis,
} from '../data/homeDashboardData';

export default function HomeDashboardPage({
  isMobileFrame,
  onNavigateToCanvas,
  onNavigateToWardrobe,
  onNavigateToSearch,
  onNavigateToBrand,
  onSelectOutfit,
  onOpenAuth,
}) {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : dailySuggestions.length - 2));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev < dailySuggestions.length - 2 ? prev + 1 : 0));
  };

  // ------------------------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789557295532.png)
  // ------------------------------------------------------------------
  if (isMobileFrame) {
    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-24 relative font-sans">
        {/* Mobile Top Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30 border-b border-[#EAE6DF]">
          {/* User Avatar with online indicator */}
          <button
            onClick={onOpenAuth}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D5CEC0] shrink-0"
            title="Hồ sơ cá nhân"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
          </button>

          {/* Logo DRAPE */}
          <h1 className="font-serif-luxury text-2xl font-bold tracking-wider text-[#183B22]">
            DRAPE
          </h1>

          {/* Bell Notifications */}
          <button
            onClick={onOpenAuth}
            className="p-1 text-[#33312B] hover:text-[#183B22] relative"
            title="Thông báo"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#183B22] rounded-full"></span>
          </button>
        </header>

        {/* Content Container */}
        <div className="px-4 pt-4 space-y-4">
          {/* 1. Hero Seasonal Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#18261D] text-white">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85"
              alt="Seasonal Collection"
              className="w-full h-56 object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 flex flex-col justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#B5D4BF] uppercase">
                {heroCollection.seasonalTag}
              </span>

              <div>
                <h2 className="font-serif-luxury text-xl font-bold leading-snug mb-3">
                  {heroCollection.title}
                </h2>
                <button
                  onClick={onNavigateToBrand}
                  className="px-4 py-2 bg-white text-[#151816] rounded-md text-xs font-semibold tracking-wide hover:bg-[#F4F1EA] transition-all"
                >
                  Khám phá bộ sưu tập
                </button>
              </div>
            </div>
          </div>

          {/* 2. Quick Action Cards */}
          <div className="space-y-2.5">
            {/* Styling AI Card */}
            <button
              onClick={onNavigateToCanvas}
              className="w-full text-left p-4 rounded-xl bg-[#E8EFE9] border border-[#D5E1D8] flex items-center justify-between hover:bg-[#DEE9E0] transition-all group"
            >
              <div className="pr-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#183B22] uppercase block mb-0.5">
                  STYLING AI
                </span>
                <h3 className="font-serif-luxury text-base font-bold text-[#151816]">
                  Phối đồ gợi ý
                </h3>
                <p className="text-[11px] text-[#4F5B52] mt-0.5">
                  Dựa trên tủ đồ và sở thích của bạn
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#183B22]/10 flex items-center justify-center text-[#183B22] group-hover:scale-110 transition-transform shrink-0">
                <Wand2 className="w-5 h-5" />
              </div>
            </button>

            {/* Marketplace Card */}
            <button
              onClick={onNavigateToBrand}
              className="w-full text-left p-4 rounded-xl bg-[#F4F1EA] border border-[#E5DFD4] flex items-center justify-between hover:bg-[#EDE8DE] transition-all group"
            >
              <div className="pr-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#787163] uppercase block mb-0.5">
                  MARKETPLACE
                </span>
                <h3 className="font-serif-luxury text-base font-bold text-[#151816]">
                  Cửa hàng/Sản phẩm
                </h3>
                <p className="text-[11px] text-[#6E695D] mt-0.5">
                  Mua sắm từ các thương hiệu cao cấp
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#353027]/10 flex items-center justify-center text-[#353027] group-hover:scale-110 transition-transform shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* 3. Daily Suggestions Carousel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#151816]">
                  Gợi ý cho bạn hôm nay
                </h3>
                <p className="text-[10px] text-[#706D65]">
                  Dựa trên dữ liệu phong cách cá nhân & thời tiết Hà Nội
                </p>
              </div>
              <button
                onClick={onNavigateToCanvas}
                className="text-[11px] font-medium text-[#183B22] hover:underline underline-offset-4"
              >
                Xem tất cả
              </button>
            </div>

            {/* Horizontal Scroll Cards */}
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none pt-1">
              {dailySuggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectOutfit && onSelectOutfit(item)}
                  className="min-w-[210px] max-w-[210px] bg-white rounded-xl border border-[#EAE6DF] overflow-hidden shadow-2xs cursor-pointer group shrink-0"
                >
                  <div className="relative h-56 bg-[#F5F2EA] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#183B22] rounded-md shadow-2xs">
                      {item.matchBadge}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-serif-luxury text-xs font-bold text-[#151816] truncate mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-[#706D65] line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Weekly Style Analysis (Dark Green Signature Card) */}
          <div className="rounded-2xl bg-[#14341E] text-white p-5 space-y-4 shadow-md relative overflow-hidden">
            <h3 className="font-serif-luxury text-xl font-bold tracking-tight">
              {weeklyStyleAnalysis.title}
            </h3>

            <p className="text-xs text-[#CFE2D4] leading-relaxed">
              {weeklyStyleAnalysis.subtitle}
            </p>

            {/* 3 Recommendations */}
            <div className="space-y-3 pt-1">
              {weeklyStyleAnalysis.recommendations.map((rec) => (
                <div key={rec.num} className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full border border-[#487353] text-[10px] font-mono font-bold flex items-center justify-center text-[#BBD8C3] shrink-0">
                    {rec.num}
                  </span>
                  <p className="text-xs text-[#EAF3EC] pt-0.5 leading-snug">
                    {rec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Precision Box */}
            <div className="mt-4 p-6 rounded-xl bg-[#0F2817] border border-[#234B2E] text-center">
              <div className="text-4xl font-serif-luxury font-bold text-[#8CE3A7] tracking-tight mb-1">
                {weeklyStyleAnalysis.precisionRate}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-[#B3D9BD] uppercase">
                {weeklyStyleAnalysis.precisionLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Sparkles Button */}
        <button
          onClick={onNavigateToCanvas}
          className="fixed bottom-20 right-5 z-40 w-12 h-12 rounded-2xl bg-[#14341E] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-[#2D5A38]"
          title="Tư vấn AI Stylist"
        >
          <Sparkles className="w-5 h-5 text-emerald-300" />
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789557295599.png)
  // ------------------------------------------------------------------
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 1. Hero Collection Banner */}
        <section className="relative rounded-2xl overflow-hidden shadow-lg bg-[#141F17] text-white min-h-[460px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85"
            alt="Hero Collection"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent"></div>

          <div className="relative z-10 max-w-2xl px-10 sm:px-14 py-12">
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#BBD8C3] uppercase mb-4">
              {heroCollection.exclusiveTag}
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4 text-white">
              {heroCollection.title}
            </h2>
            <p className="text-sm text-[#D1DDD4] mb-8 max-w-lg leading-relaxed">
              {heroCollection.subtitle}
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateToCanvas}
                className="px-7 py-3 bg-[#183B22] text-white rounded-md text-xs font-semibold tracking-wider uppercase hover:bg-[#224E2E] shadow-sm transition-all"
              >
                Shop the Look
              </button>
              <button
                onClick={onNavigateToBrand}
                className="px-7 py-3 bg-black/40 text-white border border-white/30 rounded-md text-xs font-semibold tracking-wider uppercase hover:bg-black/60 transition-all"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </section>

        {/* 2. Quick Action Cards (2 Columns) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Styling AI */}
          <div className="p-8 rounded-2xl bg-[#E8EFE9] border border-[#D5E1D8] flex flex-col justify-between hover:border-[#183B22]/40 transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#183B22]/10 text-[#183B22] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#151816] mb-2">
                Phối đồ gợi ý
              </h3>
              <p className="text-xs sm:text-sm text-[#4F5B52] leading-relaxed max-w-md">
                Sử dụng AI để tạo ra những bộ trang phục phù hợp nhất với vóc dáng và phong cách cá nhân của bạn.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={onNavigateToCanvas}
                className="inline-flex items-center space-x-1 text-xs font-serif-luxury font-bold text-[#183B22] hover:text-[#0E2515] group-hover:translate-x-1 transition-all"
              >
                <span>Bắt đầu ngay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Marketplace */}
          <div className="p-8 rounded-2xl bg-[#F4F1EA] border border-[#E5DFD4] flex flex-col justify-between hover:border-[#353027]/40 transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#353027]/10 text-[#353027] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#151816] mb-2">
                Cửa hàng/Sản phẩm
              </h3>
              <p className="text-xs sm:text-sm text-[#6E695D] leading-relaxed max-w-md">
                Khám phá kho lưu trữ được giám tuyển kỹ lưỡng từ các thương hiệu thời trang bền vững hàng đầu.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={onNavigateToBrand}
                className="inline-flex items-center space-x-1 text-xs font-serif-luxury font-bold text-[#353027] hover:text-black group-hover:translate-x-1 transition-all"
              >
                <span>Khám phá</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Gợi ý cho bạn hôm nay */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#151816]">
                Gợi ý cho bạn hôm nay
              </h3>
              <p className="text-xs sm:text-sm text-[#706D65] mt-1">
                Dựa trên tủ đồ hiện tại và sở thích của bạn.
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevSlide}
                className="w-9 h-9 rounded-full border border-[#DCD7CD] bg-white flex items-center justify-center text-[#54514A] hover:bg-[#F4F1EA] transition-all"
                title="Trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-9 h-9 rounded-full border border-[#DCD7CD] bg-white flex items-center justify-center text-[#54514A] hover:bg-[#F4F1EA] transition-all"
                title="Tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2 Curated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dailySuggestions.slice(slideIndex, slideIndex + 2).map((look) => (
              <div
                key={look.id}
                onClick={() => onSelectOutfit && onSelectOutfit(look)}
                className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative h-80 bg-[#F5F2EA] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-xs text-xs font-bold text-[#183B22] rounded-md shadow-xs">
                    {look.matchBadge}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-mono tracking-wider font-bold text-[#868278] uppercase block mb-1">
                    {look.category}
                  </span>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#151816] mb-3">
                    {look.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {look.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-sm bg-[#F2EFE8] text-[10px] font-medium text-[#56534C]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Phân tích phong cách tuần này (Full-width Dark Green Card) */}
        <section className="rounded-3xl bg-[#14341E] text-white p-8 sm:p-12 space-y-8 shadow-xl">
          <h3 className="font-serif-luxury text-3xl font-bold tracking-tight">
            {weeklyStyleAnalysis.title}
          </h3>

          {/* 3 Metric Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 pb-6 border-b border-[#254F30]">
            {weeklyStyleAnalysis.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-4xl font-serif-luxury font-bold text-[#8CE3A7] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-mono tracking-widest text-[#B3D9BD] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <p className="text-base text-[#DCEAE0] italic leading-relaxed max-w-3xl">
            "{weeklyStyleAnalysis.quote}"
          </p>

          {/* Button */}
          <div>
            <button
              onClick={onNavigateToCanvas}
              className="px-8 py-3.5 bg-white text-[#151816] hover:bg-[#F4F1EA] rounded-md text-xs font-bold tracking-wide uppercase shadow-sm transition-all"
            >
              Xem phân tích đầy đủ
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#EAE6DF] bg-[#FBFBFA] pt-8 pb-12 text-[#6A675F] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-serif-luxury font-bold text-[#151816] tracking-widest mr-3">
              DRAPE
            </span>
            <span>© 2024 DRAPE. Personal AI Stylist.</span>
          </div>
          <div className="flex items-center space-x-6 text-[#7E7A71]">
            <a href="#" className="hover:text-[#183B22]">Sustainability</a>
            <a href="#" className="hover:text-[#183B22]">Privacy</a>
            <a href="#" className="hover:text-[#183B22]">Terms</a>
            <a href="#" className="hover:text-[#183B22]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
