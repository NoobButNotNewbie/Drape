import React, { useState } from 'react';
import {
  Menu,
  User,
  Share2,
  Heart,
  Plus,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { anchorItems } from '../data/wardrobeFocusData';
import AddPieceModal from './AddPieceModal';

export default function WardrobeFocusPage({
  isMobileFrame,
  onNavigateToCanvas,
  onNavigateToWardrobeList,
  onOpenAuth,
}) {
  const [selectedItemId, setSelectedItemId] = useState(
    isMobileFrame ? 'navy-cable-knit-sweater' : 'essential-oxford-shirt'
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentItem =
    anchorItems.find((item) => item.id === selectedItemId) || anchorItems[0];

  const handleShare = () => {
    setToastMessage('Đã sao chép liên kết trang phục!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
    setToastMessage(
      !isLiked
        ? 'Đã lưu món đồ vào danh sách Yêu thích!'
        : 'Đã xóa khỏi danh sách Yêu thích'
    );
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSelectOtherItem = () => {
    const currentIndex = anchorItems.findIndex((i) => i.id === selectedItemId);
    const nextIndex = (currentIndex + 1) % anchorItems.length;
    setSelectedItemId(anchorItems[nextIndex].id);
  };

  // ------------------------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789557295541.png)
  // ------------------------------------------------------------------
  if (isMobileFrame) {
    const mobItem =
      anchorItems.find((i) => i.id === 'navy-cable-knit-sweater') || currentItem;

    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-28 relative font-sans">
        {/* Toast notification */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#16291C] text-white px-4 py-2 rounded-lg shadow-lg text-xs flex items-center space-x-2 border border-[#2A4933] animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Mobile Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30">
          <button
            onClick={onNavigateToWardrobeList}
            className="p-1 text-[#33312B] hover:text-[#183B22]"
            title="Tủ đồ"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#183B22] uppercase">
            WARDROBE
          </span>
          <button
            onClick={onOpenAuth}
            className="p-1 text-[#33312B] hover:text-[#183B22]"
            title="Tài khoản"
          >
            <User className="w-5 h-5" />
          </button>
        </header>

        {/* Title Section */}
        <div className="px-5 pt-4 pb-2">
          <span className="text-[10px] font-mono tracking-widest text-[#7C7971] uppercase font-bold block mb-1">
            SELECTION FOCUSED
          </span>
          <h2 className="font-serif-luxury text-2xl font-bold tracking-wide text-[#151816] uppercase">
            DIGITAL WARDROBE
          </h2>
        </div>

        {/* Anchor Item Card */}
        <div className="px-4 pt-2">
          <div className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-xs relative">
            {/* Top Right Anchor Item Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 bg-[#F5F2EB] text-[#183B22] border border-[#DDD7CC] rounded-sm text-[9px] font-mono font-bold tracking-wider uppercase">
                ANCHOR ITEM
              </span>
            </div>

            {/* Pattern / Checkerboard Image Background */}
            <div className="w-full h-72 bg-[#F4F1EC] relative flex items-center justify-center p-6">
              <div
                className="w-full h-full rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(#D5CEC2 0.75px, transparent 0.75px), radial-gradient(#D5CEC2 0.75px, #F4F1EC 0.75px)`,
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 8px 8px',
                }}
              >
                <img
                  src={mobItem.image}
                  alt={mobItem.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

            {/* Item Details */}
            <div className="p-4 bg-white border-t border-[#EFECE6]">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-serif-luxury text-xl font-bold text-[#151816] leading-tight">
                  {mobItem.title}
                </h3>
                <div className="text-right shrink-0">
                  <span className="text-[9px] font-mono text-[#827E75] block">
                    SKU: {mobItem.sku}
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {mobItem.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-sm bg-[#ECF4EE] text-[10px] font-medium text-[#183B22]"
                  >
                    {idx === 0 && <span className="mr-1">✓</span>}
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Section */}
        <div className="px-4 pt-5 space-y-3">
          <div className="flex items-center space-x-1.5 text-[#183B22]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">
              AI SUGGESTIONS
            </span>
          </div>
          <p className="text-[11px] text-[#78746B] -mt-1">
            Curated pairings based on your Style DNA
          </p>

          {/* Horizontal Suggestions List */}
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none pt-1">
            {mobItem.suggestions.map((sug) => (
              <div
                key={sug.id}
                className="min-w-[240px] max-w-[240px] bg-white rounded-xl border border-[#E8E3D8] p-3 shadow-2xs shrink-0 flex flex-col justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-lg bg-[#F5F2EB] overflow-hidden shrink-0 border border-[#EBE6DD]">
                    <img
                      src={sug.image}
                      alt={sug.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#183B22] block mb-0.5">
                      {sug.matchPercent}
                    </span>
                    <h5 className="font-serif-luxury text-xs font-bold text-[#151816] line-clamp-1">
                      {sug.name}
                    </h5>
                    <span className="text-[11px] font-mono font-semibold text-[#504D46]">
                      {sug.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onNavigateToCanvas}
                  className="mt-3 w-full py-1.5 bg-[#FAF8F5] border border-[#DDD7CC] hover:bg-[#F2EDE4] rounded-md text-[11px] font-serif-luxury font-bold text-[#35322B] text-center transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Bottom Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBFBFA]/98 backdrop-blur-md border-t border-[#EAE6DF] px-4 py-3">
          <div className="flex items-center space-x-3 max-w-md mx-auto">
            <button
              onClick={handleSelectOtherItem}
              className="flex-1 py-3 px-4 rounded-md border border-[#DDD7CC] bg-white text-xs font-serif-luxury font-bold tracking-wider text-[#35322B] uppercase hover:bg-[#F4F1EA] transition-all"
            >
              ITEM OTHER
            </button>
            <button
              onClick={onNavigateToCanvas}
              className="flex-1 py-3 px-4 rounded-md bg-[#183B22] text-white text-xs font-serif-luxury font-bold tracking-wider uppercase hover:bg-[#224E2E] shadow-sm transition-all"
            >
              MIX CANVAS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789557295544.png)
  // ------------------------------------------------------------------
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] font-sans pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#16291C] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 border border-[#2B4B34] animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="font-serif-luxury text-3xl font-bold tracking-wider text-[#151816] uppercase">
            DIGITAL WARDROBE
          </h2>
          <div className="w-12 h-0.5 bg-[#183B22] mt-2"></div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Vertical Item Thumbnail Strip (2 Cols on lg) */}
          <div className="lg:col-span-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {anchorItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all shrink-0 bg-white relative group ${
                  selectedItemId === item.id
                    ? 'border-[#183B22] shadow-sm scale-102'
                    : 'border-[#EAE6DF] hover:border-[#B5AEA1]'
                }`}
                title={item.title}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            {/* + Add Piece Dashed Button */}
            <button
              onClick={() => setIsAddOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-md border-2 border-dashed border-[#CDC6B8] hover:border-[#183B22] flex items-center justify-center text-[#8C877B] hover:text-[#183B22] transition-colors shrink-0 bg-white"
              title="Thêm món đồ mới"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Column 2: Center Main Anchor Card (7 Cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-xs relative">
            {/* Top Right Anchor Item Tag */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 bg-[#F5F2EB] text-[#183B22] border border-[#DDD7CC] rounded-sm text-[10px] font-mono font-bold tracking-wider uppercase">
                ANCHOR ITEM
              </span>
            </div>

            {/* High-res Image Display */}
            <div className="w-full h-[520px] bg-[#F7F5F0] flex items-center justify-center p-8 overflow-hidden">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-white border-t border-[#EFECE6] flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#8A867D] block mb-1">
                  SKU: {currentItem.sku}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#151816] mb-3">
                  {currentItem.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentItem.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-sm bg-[#F2EFE8] text-xs font-mono font-bold text-[#4B4842]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Share & Favorite */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-md border border-[#DCD7CD] bg-white flex items-center justify-center text-[#55524B] hover:bg-[#F4F1EA] transition-all"
                  title="Chia sẻ trang phục"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleLike}
                  className="w-10 h-10 rounded-md border border-[#DCD7CD] bg-white flex items-center justify-center transition-all hover:bg-[#F4F1EA]"
                  title="Lưu yêu thích"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked
                        ? 'fill-[#C53030] text-[#C53030]'
                        : 'text-[#55524B]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Right Suggestion AI Panel (4 Cols on lg) */}
          <div className="lg:col-span-4 bg-[#FBFBFA] border border-[#E8E3D8] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
                <div className="flex items-center space-x-1.5 text-[#183B22]">
                  <h4 className="font-serif-luxury text-xl font-bold text-[#151816]">
                    Suggestion
                  </h4>
                  <Sparkles className="w-4 h-4 text-[#183B22]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#7C786F] uppercase font-bold">
                  AI POWERED
                </span>
              </div>

              {/* Suggestion Pairings List */}
              <div className="space-y-4">
                {currentItem.suggestions.map((sug) => (
                  <div
                    key={sug.id}
                    className="p-3 bg-white rounded-xl border border-[#EAE6DF] flex items-center justify-between shadow-2xs hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-md bg-[#F4F1EA] overflow-hidden shrink-0 border border-[#E7E2D8]">
                        <img
                          src={sug.image}
                          alt={sug.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif-luxury text-xs font-bold text-[#151816] line-clamp-1">
                          {sug.name}
                        </h5>
                        <span className="text-[10px] font-mono text-[#8C877C] block">
                          {sug.brand}
                        </span>
                        <div className="text-xs font-mono font-bold text-[#151816] mt-0.5">
                          {sug.price}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono font-semibold text-[#183B22]">
                        {sug.matchPercent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleSelectOtherItem}
                  className="w-full py-3 rounded-md border border-[#DDD7CC] bg-white text-xs font-serif-luxury font-bold tracking-wider text-[#35322B] uppercase hover:bg-[#F4F1EA] transition-all"
                >
                  ITEM OTHER
                </button>
                <button
                  onClick={onNavigateToCanvas}
                  className="w-full py-3 rounded-md bg-[#183B22] text-white text-xs font-serif-luxury font-bold tracking-wider uppercase hover:bg-[#224E2E] shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <span>MIX CANVAS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Footnote */}
            <p className="text-[10px] text-[#868278] italic text-center pt-6 mt-6 border-t border-[#EAE6DF]">
              "These recommendations are based on your personal 'Minimalist Modern' style DNA and past interactions."
            </p>
          </div>
        </div>
      </div>

      {/* Add Piece Modal */}
      <AddPieceModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddPiece={() => {
          setIsAddOpen(false);
          setToastMessage('Đã thêm món đồ mới vào Tủ đồ số!');
          setTimeout(() => setToastMessage(''), 3000);
        }}
      />
    </div>
  );
}
