import React, { useState } from 'react';
import { X, Monitor } from 'lucide-react';

export default function DesignReferenceModal({ onClose }) {
  const [page, setPage] = useState('feed'); // 'wardrobe-focus' | 'feed' | 'wardrobe' | 'canvas' | 'outfit-detail' | 'search'

  const getImageSrc = () => {
    if (page === 'wardrobe-focus') {
      return '/designs/desktop_wardrobe_focus.png';
    } else if (page === 'feed') {
      return '/designs/desktop_feed_design.png';
    } else if (page === 'wardrobe') {
      return '/designs/desktop_wardrobe_design.png';
    } else if (page === 'canvas') {
      return '/designs/desktop_canvas_design.png';
    } else if (page === 'outfit-detail') {
      return '/designs/desktop_outfit_detail_design.png';
    } else if (page === 'search') {
      return '/designs/desktop_search_design.png';
    } else {
      return '/designs/desktop_design.png';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#141B16] text-white rounded-2xl shadow-2xl border border-[#2B3E30] overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#2B3E30] flex flex-wrap items-center justify-between gap-3 bg-[#0E1510]">
          {/* Left: Page selection */}
          <div className="flex items-center space-x-2">
            <span className="font-serif-luxury text-sm font-semibold tracking-wider text-emerald-300 mr-1">
              Thiết kế mẫu:
            </span>
            <div className="flex flex-wrap items-center bg-[#19241C] p-0.5 rounded-lg border border-[#2F4435] text-xs">
              <button
                onClick={() => setPage('wardrobe-focus')}
                className={`px-2 py-1 rounded transition-colors ${
                  page === 'wardrobe-focus'
                    ? 'bg-[#294B34] text-white font-medium'
                    : 'text-[#87A090] hover:text-white'
                }`}
              >
                2. Focus Item
              </button>
              <button
                onClick={() => setPage('feed')}
                className={`px-2 py-1 rounded transition-colors ${
                  page === 'feed'
                    ? 'bg-[#294B34] text-white font-medium'
                    : 'text-[#87A090] hover:text-white'
                }`}
              >
                3. Feed
              </button>
              <button
                onClick={() => setPage('wardrobe')}
                className={`px-2 py-1 rounded transition-colors ${
                  page === 'wardrobe'
                    ? 'bg-[#294B34] text-white font-medium'
                    : 'text-[#87A090] hover:text-white'
                }`}
              >
                4. Wardrobe
              </button>
              <button
                onClick={() => setPage('canvas')}
                className={`px-2 py-1 rounded transition-colors ${
                  page === 'canvas'
                    ? 'bg-[#294B34] text-white font-medium'
                    : 'text-[#87A090] hover:text-white'
                }`}
              >
                5. Canvas
              </button>
              <button
                onClick={() => setPage('outfit-detail')}
                className={`px-2 py-1 rounded transition-colors ${
                  page === 'outfit-detail'
                    ? 'bg-[#294B34] text-white font-medium'
                    : 'text-[#87A090] hover:text-white'
                }`}
              >
                6. Detail
              </button>
              <button
                onClick={() => setPage('search')}
                className={`px-2 py-1 rounded transition-colors ${
                  page === 'search'
                    ? 'bg-[#294B34] text-white font-medium'
                    : 'text-[#87A090] hover:text-white'
                }`}
              >
                7. Search
              </button>
            </div>
          </div>

          {/* Right: Close */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-[#19241C] p-0.5 rounded-lg border border-[#2F4435] text-xs">
              <span className="px-3 py-1 rounded flex items-center space-x-1.5 text-white font-medium">
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#869E8F] hover:text-white hover:bg-[#1E2B21] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-[#090E0B]">
          <div className="max-w-full">
            <img
              src={getImageSrc()}
              alt={`${page} reference`}
              className="w-full h-auto rounded-lg shadow-2xl border border-[#27392C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
