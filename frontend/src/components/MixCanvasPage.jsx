import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Layers,
  ZoomIn,
  Grid,
  Trash2,
  Sparkles,
  Check,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Heart,
  ShoppingBag,
  Bell,
  Menu,
} from 'lucide-react';
import { initialWardrobeItems, userProfile } from '../data/canvasData';

export default function MixCanvasPage({
  isMobileFrame,
  onNavigateToFeed,
  onNavigateToBrand,
  onOpenAuth,
}) {
  const [items, setItems] = useState(initialWardrobeItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState('tops');
  const [showGrid, setShowGrid] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const toggleItemSelection = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleReset = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: ['item-sweater', 'item-chinos', 'item-shoes'].includes(item.id),
      }))
    );
    setToastMessage('Đã làm mới bảng phối đồ');
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleClearAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: false })));
    setToastMessage('Đã xóa tất cả trang phục trên Canvas');
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleSaveOutfit = () => {
    setToastMessage('Đã lưu bộ đồ vào Tủ đồ thành công!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Selected items on canvas
  const canvasItems = useMemo(
    () => items.filter((item) => item.selected),
    [items]
  );

  // Total price calculation
  const totalPrice = useMemo(() => {
    const sum = canvasItems.reduce((acc, curr) => acc + curr.price, 0);
    return sum.toLocaleString('vi-VN') + '₫';
  }, [canvasItems]);

  // Wardrobe filter for desktop
  const filteredWardrobe = useMemo(() => {
    return items.filter((item) => {
      const matchCat =
        activeCategory === 'all'
          ? true
          : activeCategory === 'tops'
          ? item.category === 'tops'
          : activeCategory === 'pants'
          ? item.category === 'pants'
          : activeCategory === 'shoes'
          ? item.category === 'shoes'
          : true;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, activeCategory, searchQuery]);

  // Wardrobe filter for mobile drawer
  const mobileFilteredItems = useMemo(() => {
    if (mobileTab === 'my-wardrobe') return items;
    return items.filter((item) => item.category === mobileTab);
  }, [items, mobileTab]);

  // ----------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789555615388.png)
  // ----------------------------------------------------
  if (isMobileFrame) {
    const topItem = canvasItems.find((i) => i.type === 'top') || canvasItems[0];
    const bottomItem = canvasItems.find((i) => i.type === 'bottom');

    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between pb-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#16291C] text-white px-4 py-2 rounded-lg shadow-lg text-xs flex items-center space-x-2 border border-[#2A4933] animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Mobile Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30">
          <button onClick={onOpenAuth} className="p-1 hover:text-[#183B22]">
            <Menu className="w-5 h-5 text-[#33312B]" />
          </button>
          <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#183B22]">
            DRAPE
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAuth}
              className="p-1 hover:text-[#183B22] relative"
            >
              <Bell className="w-5 h-5 text-[#33312B]" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#183B22] rounded-full"></span>
            </button>
            <button
              onClick={onOpenAuth}
              className="w-7 h-7 rounded-full overflow-hidden border border-[#D5CEC0]"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* 2D Canvas Area */}
        <div className="flex-1 px-4 pt-3 pb-2 flex flex-col">
          <div
            className={`relative flex-1 min-h-[360px] rounded-2xl border border-[#E2DDD3] overflow-hidden flex flex-col items-center justify-center p-4 transition-all ${
              showGrid
                ? 'bg-[linear-gradient(to_right,#e8e3d8_1px,transparent_1px),linear-gradient(to_bottom,#e8e3d8_1px,#f8f6f0_1px)] bg-[size:24px_24px]'
                : 'bg-[#F9F7F2]'
            }`}
          >
            {/* Top Canvas Badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E0DCD3] shadow-2xs">
              <span className="text-[10px] font-bold tracking-widest text-[#4A4740] uppercase">
                MIX CANVAS
              </span>
            </div>

            {/* Floating Tools on Right */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-20">
              <button
                onClick={handleReset}
                className="w-9 h-9 rounded-xl bg-white border border-[#E0DCD3] shadow-xs flex items-center justify-center text-[#55524B] hover:text-[#183B22] active:scale-95 transition-all"
                title="Làm mới"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="w-9 h-9 rounded-xl bg-white border border-[#E0DCD3] shadow-xs flex items-center justify-center text-[#55524B] hover:text-[#183B22] active:scale-95 transition-all"
                title="Bật/Tắt Lưới"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearAll}
                className="w-9 h-9 rounded-xl bg-white border border-[#E0DCD3] shadow-xs flex items-center justify-center text-[#55524B] hover:text-[#C53030] active:scale-95 transition-all"
                title="Xóa hết"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Canvas Rendered Clothing Items */}
            <div className="flex flex-col items-center justify-center space-y-1 w-full max-w-[220px]">
              {topItem && (
                <div className="w-44 h-44 rounded-xl overflow-hidden shadow-sm border border-black/5 bg-[radial-gradient(#d5cfc2_1px,transparent_1px)] bg-[size:8px_8px] bg-[#FAF8F5] p-2 flex items-center justify-center">
                  <img
                    src={topItem.image}
                    alt={topItem.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />
                </div>
              )}

              {bottomItem && (
                <div className="w-32 h-44 rounded-xl overflow-hidden shadow-sm border border-black/5 bg-[radial-gradient(#d5cfc2_1px,transparent_1px)] bg-[size:8px_8px] bg-[#FAF8F5] p-2 flex items-center justify-center -mt-4">
                  <img
                    src={bottomItem.image}
                    alt={bottomItem.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Match Confidence Banner */}
          <div className="mt-3 p-3 rounded-xl bg-[#ECF4EE] border border-[#D3E5D7] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#183B22]" />
              <div>
                <span className="font-serif-luxury text-xs font-bold text-[#183B22]">
                  98% Match Confidence
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleItemSelection('item-belt')}
              className="text-[10px] font-semibold tracking-wider text-[#1C4A29] hover:underline flex items-center space-x-1"
            >
              <span>{userProfile.tip}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Wardrobe Drawer */}
        <div className="px-4 pt-2">
          <div className="bg-white rounded-2xl border border-[#E5E0D6] p-3.5 shadow-sm">
            {/* Drawer Tabs */}
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2 mb-3 text-xs">
              <div className="flex items-center space-x-4 font-semibold">
                <button
                  onClick={() => setMobileTab('tops')}
                  className={`pb-1 transition-all ${
                    mobileTab === 'tops'
                      ? 'text-[#183B22] border-b-2 border-[#183B22]'
                      : 'text-[#858178]'
                  }`}
                >
                  TOPS
                </button>
                <button
                  onClick={() => setMobileTab('pants')}
                  className={`pb-1 transition-all ${
                    mobileTab === 'pants'
                      ? 'text-[#183B22] border-b-2 border-[#183B22]'
                      : 'text-[#858178]'
                  }`}
                >
                  PANTS
                </button>
                <button
                  onClick={() => setMobileTab('shoes')}
                  className={`pb-1 transition-all ${
                    mobileTab === 'shoes'
                      ? 'text-[#183B22] border-b-2 border-[#183B22]'
                      : 'text-[#858178]'
                  }`}
                >
                  SHOES
                </button>
              </div>

              <button
                onClick={() => setMobileTab('my-wardrobe')}
                className="text-[10px] uppercase font-bold tracking-wider text-[#7A766E] hover:text-[#183B22]"
              >
                MY WARDROBE
              </button>
            </div>

            {/* Horizontal Scrollable Clothes */}
            <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar pb-1">
              {mobileFilteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className={`w-20 h-24 rounded-xl border p-1 shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    item.selected
                      ? 'border-[#183B22] bg-[#F3F7F4] ring-2 ring-[#183B22]/30'
                      : 'border-[#E2DDD3] bg-[#FAF8F5] hover:border-[#8E8A81]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain mb-1"
                  />
                  <div className="text-[9px] font-bold text-[#151816] truncate w-full text-center px-1">
                    {item.formattedPrice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789555615401.png)
  // ----------------------------------------------------
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#16291C] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 border border-[#2B4B34] animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3-Column Professional Workstation Layout */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ------------------------------------------- */}
          {/* COLUMN 1 (Left): TỦ ĐỒ CỦA TÔI (3 cols)     */}
          {/* ------------------------------------------- */}
          <div className="lg:col-span-3 bg-white border border-[#E5E0D6] rounded-2xl p-5 shadow-xs flex flex-col">
            <h3 className="font-serif-luxury text-xl font-bold text-[#151816] mb-1">
              Tủ đồ của tôi
            </h3>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#86837B] mb-3">
              TÌM KIẾM
            </div>

            {/* Search input with filter icon */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sơ mi Trắng..."
                className="w-full pl-3 pr-8 py-2 text-xs bg-[#FAF8F5] border border-[#DDD7CD] focus:border-[#183B22] rounded-md outline-none transition-colors placeholder:text-[#9B9890]"
              />
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#86837B] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center space-x-2 border-b border-[#EFECE6] pb-2 mb-4 text-xs font-medium text-[#706D65]">
              <button
                onClick={() => setActiveCategory('all')}
                className={`pb-1 transition-colors ${
                  activeCategory === 'all'
                    ? 'text-[#183B22] font-bold border-b-2 border-[#183B22]'
                    : 'hover:text-[#151816]'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveCategory('tops')}
                className={`pb-1 transition-colors ${
                  activeCategory === 'tops'
                    ? 'text-[#183B22] font-bold border-b-2 border-[#183B22]'
                    : 'hover:text-[#151816]'
                }`}
              >
                Áo
              </button>
              <button
                onClick={() => setActiveCategory('pants')}
                className={`pb-1 transition-colors ${
                  activeCategory === 'pants'
                    ? 'text-[#183B22] font-bold border-b-2 border-[#183B22]'
                    : 'hover:text-[#151816]'
                }`}
              >
                Quần
              </button>
              <button
                onClick={() => setActiveCategory('shoes')}
                className={`pb-1 transition-colors ${
                  activeCategory === 'shoes'
                    ? 'text-[#183B22] font-bold border-b-2 border-[#183B22]'
                    : 'hover:text-[#151816]'
                }`}
              >
                Giày
              </button>
            </div>

            {/* 2-Column Grid of Wardrobe items with checkboxes */}
            <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredWardrobe.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className={`relative rounded-xl border p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all ${
                    item.selected
                      ? 'border-[#183B22] bg-[#F4F8F5] shadow-xs'
                      : 'border-[#E6E1D7] bg-[#FAF8F5] hover:border-[#8E8B83]'
                  }`}
                >
                  {/* Green checkmark badge */}
                  {item.selected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#183B22] text-white flex items-center justify-center shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  <div className="w-full aspect-square flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="w-full text-center">
                    <div className="text-xs font-semibold text-[#151816] truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#706D65]">
                      {item.formattedPrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------- */}
          {/* COLUMN 2 (Center): MIX CANVAS (6 cols)      */}
          {/* ------------------------------------------- */}
          <div className="lg:col-span-6 bg-white border border-[#E5E0D6] rounded-2xl p-5 shadow-xs flex flex-col">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#151816]">
                  Mix Canvas
                </h3>
                <p className="text-xs text-[#706D65]">
                  Phòng thiết kế phong cách 2D chuyên nghiệp.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-[#DDD7CD] hover:border-[#183B22] text-xs font-medium text-[#4A4740] bg-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm mới</span>
                </button>
                <button
                  onClick={handleSaveOutfit}
                  className="flex items-center space-x-1.5 px-4 py-1.5 rounded-md bg-[#183B22] hover:bg-[#122E1A] text-white text-xs font-medium transition-colors shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu bộ đồ</span>
                </button>
              </div>
            </div>

            {/* The 2D Canvas Surface */}
            <div
              className={`relative min-h-[580px] rounded-xl border border-[#E2DDD3] overflow-hidden flex flex-col items-center justify-center p-6 transition-all ${
                showGrid
                  ? 'bg-[linear-gradient(to_right,#e8e3d8_1px,transparent_1px),linear-gradient(to_bottom,#e8e3d8_1px,#f8f6f0_1px)] bg-[size:28px_28px]'
                  : 'bg-[#F9F7F2]'
              }`}
            >
              {/* Floating Canvas Tools on Top Right */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="w-8 h-8 rounded-lg bg-white border border-[#DDD7CD] shadow-xs flex items-center justify-center text-[#55524B] hover:text-[#183B22] transition-colors"
                  title="Bật/Tắt Lưới"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-lg bg-white border border-[#DDD7CD] shadow-xs flex items-center justify-center text-[#55524B] hover:text-[#183B22] transition-colors"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-lg bg-white border border-[#DDD7CD] shadow-xs flex items-center justify-center text-[#55524B] hover:text-[#183B22] transition-colors"
                  title="Lớp trang phục"
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>

              {/* Items Rendered On Canvas */}
              <div className="flex flex-col items-center justify-center space-y-2 max-w-[320px] w-full py-4">
                {canvasItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative group rounded-xl overflow-hidden shadow-xs border border-black/5 bg-[radial-gradient(#d5cfc2_1px,transparent_1px)] bg-[size:8px_8px] bg-[#FAF8F5] p-2 flex items-center justify-center"
                    style={{
                      width:
                        item.type === 'top'
                          ? '220px'
                          : item.type === 'bottom'
                          ? '170px'
                          : item.type === 'shoes'
                          ? '150px'
                          : '120px',
                      height:
                        item.type === 'top'
                          ? '180px'
                          : item.type === 'bottom'
                          ? '210px'
                          : item.type === 'shoes'
                          ? '110px'
                          : '80px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-103 transition-transform"
                    />
                  </div>
                ))}

                {canvasItems.length === 0 && (
                  <div className="text-center py-20 text-[#86837B]">
                    <Layers className="w-8 h-8 mx-auto mb-2 text-[#ABA59A]" />
                    <p className="text-xs">Chưa có trang phục nào trên Canvas.</p>
                    <p className="text-[11px] text-[#A39E94]">
                      Hãy chọn đồ từ cột bên trái để bắt đầu phối.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------- */}
          {/* COLUMN 3 (Right): TƯ VẤN SIZE & GIỎ HÀNG   */}
          {/* ------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            {/* User Profile Card */}
            <div className="bg-white border border-[#E5E0D6] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center space-x-3.5 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D5CEC0]">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#151816]">
                    {userProfile.name}
                  </h4>
                  <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#1C4A29] bg-[#ECF4EE] rounded-sm">
                    {userProfile.badge}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EBE6DC]">
                  <div className="text-[9px] uppercase font-bold text-[#868279]">
                    CHIỀU CAO
                  </div>
                  <div className="font-serif-luxury text-sm font-bold text-[#151816] mt-0.5">
                    {userProfile.height}
                  </div>
                </div>
                <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EBE6DC]">
                  <div className="text-[9px] uppercase font-bold text-[#868279]">
                    DÁNG NGƯỜI
                  </div>
                  <div className="font-serif-luxury text-sm font-bold text-[#151816] mt-0.5">
                    {userProfile.bodyType}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Size Advisor Panel */}
            <div className="bg-white border border-[#E5E0D6] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif-luxury text-base font-bold text-[#151816]">
                  Tư vấn Size
                </h4>
                <Sparkles className="w-4 h-4 text-[#183B22]" />
              </div>

              <div className="space-y-3 mb-5">
                {canvasItems.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC]"
                  >
                    <div className="w-10 h-10 rounded bg-white border border-[#E0DBD0] overflow-hidden shrink-0 p-1 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#151816] truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-semibold text-[#1C4A29]">
                          {item.sizeAdvice?.fitScore}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-[#183B22]">
                        Gợi ý: {item.sizeAdvice?.suggestedSize}
                      </div>
                      <div className="text-[10px] text-[#706D65] line-clamp-1">
                        {item.sizeAdvice?.reason}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between pt-2 border-t border-[#EFECE6] mb-4">
                <span className="text-xs text-[#706D65]">Tổng giá trị</span>
                <span className="font-serif-luxury text-lg font-bold text-[#183B22]">
                  {totalPrice}
                </span>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setToastMessage('Đã chuyển bộ đồ vào Giỏ hàng thanh toán!');
                    setTimeout(() => setToastMessage(''), 2500);
                  }}
                  className="w-full py-2.5 bg-[#183B22] hover:bg-[#122E1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>MUA BỘ ĐỒ NÀY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleSaveOutfit}
                  className="w-full py-2 bg-white hover:bg-[#FAF8F5] text-[#33312C] border border-[#DDD7CD] text-xs font-medium rounded-md transition-colors"
                >
                  Thêm vào Danh sách ước
                </button>
              </div>

              {/* Engine Footer */}
              <div className="mt-4 pt-3 border-t border-[#EFECE6] text-[9px] text-[#918D85] leading-relaxed">
                <div className="flex items-center space-x-1 font-mono font-semibold text-[#66635C] mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>DRAPE STYLIST ENGINE v4.2</span>
                </div>
                Dữ liệu phân tích dựa trên lịch sử đo cơ thể 2D chuyên sâu.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
