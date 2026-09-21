import React, { useState } from 'react';
import { Heart, Search, Bell, ChevronDown, Sparkles } from 'lucide-react';
import { feedCategories, feedOutfits } from '../data/feedData';

export default function FeedPage({
  isMobileFrame,
  onSelectOutfit,
  onNavigateToCanvas,
  onNavigateToSearch,
  onOpenAuth,
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedOutfits, setLikedOutfits] = useState(['feed-3']); // Date Night liked initially
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedOutfits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredOutfits = feedOutfits.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  // ----------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789555615439.png)
  // ----------------------------------------------------
  if (isMobileFrame) {
    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-10">
        {/* Mobile Feed Top Bar */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30 border-b border-[#EAE6DF]">
          <h1 className="font-serif-luxury text-2xl font-bold tracking-wider text-[#183B22]">
            DRAPE
          </h1>

          <div className="flex items-center space-x-3 text-[#33312B]">
            <button
              onClick={onNavigateToSearch}
              className="p-1 hover:text-[#183B22] transition-colors"
              title="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenAuth}
              className="p-1 hover:text-[#183B22] transition-colors relative"
              title="Thông báo"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#183B22] rounded-full"></span>
            </button>
            <button
              onClick={onOpenAuth}
              className="w-8 h-8 rounded-full overflow-hidden border border-[#D5CEC0] shrink-0"
              title="Tài khoản"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Filter Chips Horizontal Bar */}
        <div className="px-5 py-3 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {feedCategories.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 text-xs rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#183B22] text-white font-medium shadow-2xs'
                  : 'bg-white border border-[#E3DED5] text-[#55524C] hover:border-[#AFA89C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Pinterest/Masonry Grid */}
        <div className="px-4 pt-2 grid grid-cols-2 gap-3.5">
          {filteredOutfits.map((outfit) => {
            const isLiked = likedOutfits.includes(outfit.id);

            return (
              <div
                key={outfit.id}
                onClick={() => onSelectOutfit(outfit)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xs bg-[#F4F0E8] flex flex-col justify-end"
                style={{
                  minHeight:
                    outfit.aspect === 'tall'
                      ? '260px'
                      : outfit.aspect === 'wide'
                      ? '170px'
                      : '210px',
                }}
              >
                {/* Background Image */}
                <img
                  src={outfit.image}
                  alt={outfit.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />

                {/* Wishlist Heart Icon (Top Right) */}
                <button
                  onClick={(e) => toggleLike(outfit.id, e)}
                  className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#55524B] shadow-2xs hover:bg-white transition-all"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform active:scale-125 ${
                      isLiked ? 'fill-[#C53030] text-[#C53030]' : 'text-[#55524B]'
                    }`}
                  />
                </button>

                {/* Bottom Overlay Info Tag */}
                <div className="relative z-10 m-2.5 p-2 rounded-xl bg-white/85 backdrop-blur-sm shadow-2xs">
                  <h4 className="font-serif-luxury text-xs font-bold text-[#151816] truncate mb-0.5">
                    {outfit.title}
                  </h4>
                  <div className="text-[10px] text-[#1C4A29] font-semibold">
                    {outfit.matchBadge}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789555615426.png)
  // ----------------------------------------------------
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816]">
      {/* Title & Subtitle */}
      <section className="pt-10 pb-6 text-center max-w-4xl mx-auto px-4">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#183B22] tracking-tight mb-2">
          Khám phá phong cách
        </h2>
        <p className="text-xs sm:text-sm text-[#706D65] font-normal mb-6">
          Gợi ý trang phục cá nhân hóa dựa trên Style DNA của bạn.
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {feedCategories.map((cat) => (
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
      </section>

      {/* Masonry / Multi-column Inspiration Grid */}
      <section className="py-6 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          {filteredOutfits.map((outfit) => {
            const isLiked = likedOutfits.includes(outfit.id);

            return (
              <div
                key={outfit.id}
                onClick={() => onSelectOutfit(outfit)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer shadow-xs bg-[#F4F0E8] border border-[#E8E3D8] hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={outfit.image}
                    alt={outfit.title}
                    className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Heart button */}
                  <button
                    onClick={(e) => toggleLike(outfit.id, e)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#55524B] shadow-sm hover:bg-white hover:scale-105 transition-all opacity-90 group-hover:opacity-100"
                    title={isLiked ? 'Bỏ lưu' : 'Lưu vào Tủ đồ'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        isLiked
                          ? 'fill-[#C53030] text-[#C53030]'
                          : 'text-[#55524B]'
                      }`}
                    />
                  </button>

                  {/* Optional Match badge overlay if present */}
                  {outfit.subtitle && (
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-between">
                      <div>
                        <div className="font-serif-luxury text-sm font-bold text-[#151816]">
                          {outfit.title}
                        </div>
                        <div className="text-[10px] text-[#706D65]">
                          {outfit.subtitle}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-semibold text-[#1C4A29] bg-[#ECF4EE] rounded-sm">
                        {outfit.matchBadge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="flex items-center space-x-1.5 px-6 py-2.5 text-xs font-serif-luxury font-semibold text-[#4A4740] hover:text-[#183B22] border border-[#DDD7CC] hover:border-[#183B22] rounded-md bg-white shadow-2xs transition-all"
          >
            <span>Xem thêm cảm hứng</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Footer matching Screenshot 3 */}
      <footer className="border-t border-[#EAE6DF] bg-[#FBFBFA] pt-10 pb-14 text-[#6A675F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EFECE6]">
            <div>
              <h4 className="font-serif-luxury text-xl font-bold tracking-widest text-[#151816] mb-1">
                DRAPE
              </h4>
              <p className="text-xs text-[#7A766E]">
                Cố vấn phong cách số cho quý ông hiện đại Việt Nam.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-xs font-medium text-[#5E5B53]">
              <a href="#about" className="hover:text-[#183B22] transition-colors">
                About Us
              </a>
              <a href="#sustainability" className="hover:text-[#183B22] transition-colors">
                Sustainability
              </a>
              <a href="#privacy" className="hover:text-[#183B22] transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-[#183B22] transition-colors">
                Terms of Service
              </a>
              <a href="#contact" className="hover:text-[#183B22] transition-colors">
                Contact
              </a>
            </div>

            <div className="text-[11px] text-[#8F8B83] font-mono">
              © 2024 Drape AI Stylist. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
