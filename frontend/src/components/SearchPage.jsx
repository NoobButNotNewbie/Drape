import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  Clock,
  X,
  ArrowRight,
  Sparkles,
  Globe,
  Share2,
  Check,
} from 'lucide-react';
import {
  initialRecentSearches,
  topTrends,
  spotlightBrands,
  trendingDesktop,
  trendingMobile,
} from '../data/searchData';

export default function SearchPage({
  isMobileFrame,
  onNavigateToBrand,
  onOpenAuth,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'brand', label: 'Brand' },
    { id: 'product', label: 'Sản phẩm' },
    { id: 'style', label: 'Phong cách' },
    { id: 'outfit', label: 'Outfit' },
  ];

  const handleRemoveRecent = (itemToRemove) => {
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag.replace('#', ''));
  };

  // ----------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789554961258.png)
  // ----------------------------------------------------
  if (isMobileFrame) {
    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-10">
        {/* Mobile Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30">
          <span className="font-serif-luxury italic text-2xl font-bold tracking-tight text-[#163520]">
            Drape
          </span>

          <div className="flex items-center space-x-3 text-[#3E3C36]">
            <button
              onClick={onOpenAuth}
              className="p-1 hover:text-[#163520] transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#183B22] rounded-full"></span>
            </button>
            <button
              onClick={onOpenAuth}
              className="p-1 hover:text-[#163520] transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Search Input Bar */}
        <div className="px-5 pt-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C8982] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhanh brand, sản phẩm, style, tên outfit"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DED9CF] hover:border-[#BFB8AB] focus:border-[#183B22] rounded-md outline-none transition-all placeholder:text-[#949088] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8982] hover:text-[#151816]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips Horizontal Bar */}
        <div className="px-5 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1 text-xs rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#183B22] text-white font-medium shadow-2xs'
                  : 'bg-white border border-[#E3DED5] text-[#55524C] hover:border-[#AFA89C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section: Tìm kiếm gần đây */}
        {recentSearches.length > 0 && (
          <section className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-serif-luxury text-base font-bold text-[#151816]">
                Tìm kiếm gần đây
              </h3>
              <button
                onClick={handleClearAllRecent}
                className="text-[10px] tracking-wider uppercase text-[#7D7971] hover:text-[#183B22] font-semibold"
              >
                XÓA HẾT
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {recentSearches.slice(0, 3).map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#EAE5DA] rounded-sm text-xs text-[#4A4741] border border-[#E7E2D7] transition-colors"
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => setSearchQuery(item)}
                  >
                    {item}
                  </span>
                  <button
                    onClick={() => handleRemoveRecent(item)}
                    className="text-[#8F8B83] hover:text-[#151816] ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Xu hướng hàng đầu */}
        <section className="px-5 pt-4 pb-3">
          <h3 className="font-serif-luxury text-base font-bold text-[#151816] mb-2.5">
            Xu hướng hàng đầu
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {topTrends.slice(0, 4).map((trend) => (
              <button
                key={trend}
                onClick={() => handleTagClick(trend)}
                className="px-3 py-1.5 text-xs text-[#1C4A29] bg-[#ECF4EE] hover:bg-[#DEEDE1] border border-[#D5E5D8] rounded-sm font-medium text-left truncate transition-colors"
              >
                {trend}
              </button>
            ))}
          </div>
        </section>

        {/* Section: Brand Spotlight */}
        <section className="px-5 pt-5 pb-3">
          <h3 className="font-serif-luxury text-base font-bold text-[#151816] mb-3">
            Brand Spotlight
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {spotlightBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onNavigateToBrand(brand.id)}
                className="aspect-square bg-white border border-[#E3DDD3] rounded-sm flex items-center justify-center p-1 hover:border-[#183B22] hover:shadow-xs transition-all group"
              >
                <span className="font-serif-luxury text-[11px] sm:text-xs font-bold tracking-widest text-[#242625] group-hover:text-[#183B22]">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Section: Trending Now (2x2 Grid) */}
        <section className="px-5 pt-5 pb-8">
          <h3 className="font-serif-luxury text-lg font-bold text-[#151816] mb-3">
            Trending Now
          </h3>
          <div className="grid grid-cols-2 gap-3.5">
            {trendingMobile.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateToBrand('linen-logic')}
                className="bg-white border border-[#E9E4DC] rounded-lg overflow-hidden group cursor-pointer hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] bg-[#F4F0E8] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-[#1C4A29] bg-white/95 rounded-xs shadow-2xs">
                    {item.badge}
                  </span>
                </div>

                <div className="p-2.5">
                  {item.subBadge && (
                    <div className="text-[8px] uppercase tracking-wider text-[#8A867E] font-medium truncate mb-0.5">
                      {item.subBadge}
                    </div>
                  )}
                  <h4 className="font-serif-luxury text-xs font-bold text-[#151816] truncate mb-0.5">
                    {item.title}
                  </h4>
                  <div className="text-[10px] text-[#78756D] truncate mb-1">
                    {item.brand}
                  </div>
                  <div className="font-serif-luxury text-xs font-bold text-[#183B22]">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789554961279.png)
  // ----------------------------------------------------
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816]">
      {/* Search Header Hero */}
      <section className="pt-12 pb-8 border-b border-[#EAE6DF] bg-[#FBFBFA]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#183B22] tracking-tight mb-1.5">
            Khám phá phong cách
          </h2>
          <p className="text-xs sm:text-sm text-[#706D65] font-normal mb-7">
            Tìm kiếm cảm hứng từ cộng đồng Drape
          </p>

          {/* Search Input Box with Command-K */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <Search className="w-4 h-4 text-[#8C8982] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhanh brand, sản phẩm, style, tên outfit"
              className="w-full pl-11 pr-14 py-3 text-xs bg-white border border-[#D5CFBF] hover:border-[#A8A191] focus:border-[#183B22] rounded-md outline-none transition-all placeholder:text-[#9C988F] shadow-xs"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#F4F1EA] border border-[#DDD7CD] rounded text-[10px] font-mono text-[#7D7971] select-none">
              ⌘ K
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#183B22] text-white font-medium shadow-2xs'
                    : 'bg-white border border-[#E0DBD0] text-[#55524B] hover:border-[#9E9789]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Two-Column Search Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto pt-2 border-t border-[#EFECE6]">
            {/* Left: TÌM KIẾM GẦN ĐÂY */}
            <div>
              <div className="text-[10px] font-bold text-[#86827A] uppercase tracking-wider mb-2.5">
                Tìm kiếm gần đây
              </div>
              <div className="space-y-2 text-xs text-[#3E3C36]">
                <button
                  onClick={() => setSearchQuery('Minimalist Workwear')}
                  className="flex items-center space-x-2 text-[#4A4740] hover:text-[#183B22] transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-[#918D84]" />
                  <span>Minimalist Workwear</span>
                </button>
                <button
                  onClick={() => setSearchQuery('Linen Suits 2024')}
                  className="flex items-center space-x-2 text-[#4A4740] hover:text-[#183B22] transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-[#918D84]" />
                  <span>Linen Suits 2024</span>
                </button>
              </div>
            </div>

            {/* Right: XU HƯỚNG HÀNG ĐẦU */}
            <div>
              <div className="text-[10px] font-bold text-[#86827A] uppercase tracking-wider mb-2.5">
                Xu hướng hàng đầu
              </div>
              <div className="flex flex-wrap gap-2">
                {topTrends.slice(0, 4).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-2.5 py-1 text-[11px] text-[#1C4A29] bg-[#ECF4EE] hover:bg-[#DEEDE1] border border-[#D5E5D8] rounded-sm font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Trending Now (4 Column Cards) */}
      <section className="py-10 border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#151816]">
                Trending Now
              </h3>
              <p className="text-xs text-[#706D65] mt-1 font-normal">
                Được gợi ý dựa trên sở thích cá nhân của bạn
              </p>
            </div>

            <button
              onClick={() => onNavigateToBrand('linen-logic')}
              className="text-xs font-serif-luxury text-[#183B22] hover:underline font-semibold flex items-center space-x-1"
            >
              <span>Xem tất cả cảm hứng</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingDesktop.map((card) => (
              <div
                key={card.id}
                onClick={() => onNavigateToBrand('linen-logic')}
                className="bg-white border border-[#E9E4DC] rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] bg-[#F4F0E8] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                  />
                  {/* Subtle overlay gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#1C4A29] bg-white/95 backdrop-blur-xs rounded-sm shadow-xs">
                    {card.badge}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] text-white/80 uppercase tracking-wider mb-0.5">
                      {card.subtitle}
                    </div>
                    <h4 className="font-serif-luxury text-base font-bold truncate">
                      {card.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Brand Spotlight */}
      <section className="py-12 border-b border-[#EAE6DF] bg-[#F8F6F1]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text & button */}
            <div className="lg:col-span-5">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#151816] mb-2">
                Brand Spotlight
              </h3>
              <p className="text-xs sm:text-sm text-[#6A675F] leading-relaxed mb-5 font-normal max-w-md">
                Khám phá các thương hiệu nội địa và quốc tế đang dẫn đầu xu hướng bền vững.
              </p>

              <button
                onClick={() => onNavigateToBrand('linen-logic')}
                className="px-6 py-2.5 bg-[#183B22] hover:bg-[#122E1A] text-white text-xs font-medium tracking-wider uppercase rounded-sm shadow-xs transition-colors"
              >
                Khám phá Danh sách Brand
              </button>
            </div>

            {/* Right 4 brand cards in a row */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {spotlightBrands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => onNavigateToBrand(brand.id)}
                  className="aspect-square bg-white border border-[#E5E0D7] rounded-xl flex flex-col items-center justify-center p-4 hover:border-[#183B22] hover:shadow-md transition-all cursor-pointer group"
                >
                  <span className="font-serif-luxury text-base font-bold tracking-widest text-[#232624] group-hover:text-[#183B22] transition-colors">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer matching Screenshot 2 */}
      <footer className="border-t border-[#EAE6DF] bg-[#FBFBFA] pt-10 pb-14 text-[#6A675F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EFECE6]">
            <div>
              <h4 className="font-serif-luxury text-xl font-bold tracking-widest text-[#151816] mb-1">
                DRAPE
              </h4>
              <p className="text-xs text-[#7A766E]">
                Cố vấn phong cách số cho nam giới hiện đại.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-xs font-medium text-[#5E5B53]">
              <a href="#about" className="hover:text-[#183B22] transition-colors">
                About Us
              </a>
              <a href="#sustainability" className="hover:text-[#183B22] transition-colors">
                Sustainability
              </a>
              <a href="#contact" className="hover:text-[#183B22] transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4 text-xs text-[#8F8B83]">
              <span>© 2024 Drape AI Stylist. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 hover:text-[#151816] cursor-pointer" />
                <Share2 className="w-3.5 h-3.5 hover:text-[#151816] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Button (Góc phải dưới như trong screenshot) */}
      <button
        onClick={onOpenAuth}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#183B22] hover:bg-[#122E1A] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        title="DRAPE AI Stylist Assistant"
      >
        <Sparkles className="w-5 h-5 text-emerald-300" />
      </button>
    </div>
  );
}
