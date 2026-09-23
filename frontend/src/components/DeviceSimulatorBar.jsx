import React from 'react';
import { Monitor, Smartphone, Maximize2, Image as ImageIcon } from 'lucide-react';

export default function DeviceSimulatorBar({
  viewMode,
  setViewMode,
  onOpenDesignRef,
  currentPage,
  onPageChange,
}) {
  return (
    <div className="sticky top-0 z-50 bg-[#16221A] text-white px-4 py-2 border-b border-[#25392C] text-xs shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Branding & Page Switcher */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide text-emerald-100 hidden sm:inline">
              DRAPE
            </span>
          </div>

          {/* Quick Page Navigator */}
          <div className="flex flex-wrap items-center bg-[#0F1712] p-0.5 rounded-lg border border-[#25392C] text-[11px]">
            <button
              onClick={() => onPageChange('wardrobe-focus')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'wardrobe-focus'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Tiêu điểm Món đồ Tủ đồ số (Anchor Focus)"
            >
              2. Focus Item
            </button>
            <button
              onClick={() => onPageChange('feed')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'feed'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Bảng tin Phong cách Feed"
            >
              3. Feed
            </button>
            <button
              onClick={() => onPageChange('wardrobe')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'wardrobe'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Digital Wardrobe (Tủ đồ số đầy đủ)"
            >
              4. Wardrobe
            </button>
            <button
              onClick={() => onPageChange('canvas')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'canvas'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Mix Canvas & Tư vấn Size AI"
            >
              5. Canvas
            </button>
            <button
              onClick={() => onPageChange('outfit-detail')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'outfit-detail'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Chi tiết Bộ phối & Mua sắm Affiliate"
            >
              6. Outfit Detail
            </button>
            <button
              onClick={() => onPageChange('search')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'search'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Tìm kiếm & Khám phá (DNA)"
            >
              7. Search
            </button>
            <button
              onClick={() => onPageChange('brand')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                currentPage === 'brand'
                  ? 'bg-[#21432C] text-white shadow-xs font-semibold'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Trang Thương hiệu Linen & Logic"
            >
              8. Brand
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Reference Design Button */}
          <button
            onClick={onOpenDesignRef}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#1F3124] hover:bg-[#284130] text-emerald-200 border border-[#2E4735] transition-all"
            title="Xem và so sánh 4 ảnh thiết kế gốc"
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-300" />
            <span>Xem Thiết kế gốc</span>
          </button>

          {/* View mode switcher */}
          <div className="flex items-center bg-[#0F1712] p-0.5 rounded-lg border border-[#25392C]">
            <button
              onClick={() => setViewMode('responsive')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'responsive'
                  ? 'bg-[#21432C] text-white shadow-xs'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Fluid layout based on your screen size"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Responsive</span>
            </button>

            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'desktop'
                  ? 'bg-[#21432C] text-white shadow-xs'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Desktop 1280px Layout (Screenshot 2)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-[#21432C] text-white shadow-xs'
                  : 'text-[#9CB0A2] hover:text-white'
              }`}
              title="Mobile iPhone Layout (Screenshot 1)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
