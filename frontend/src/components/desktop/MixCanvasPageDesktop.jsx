import React from 'react';
import { RotateCcw, Check, Sparkles, Plus } from 'lucide-react';
import AddPieceModal from '../AddPieceModal';
import { userProfile } from '../../data/canvasData';

export default function MixCanvasPageDesktop({
  canvasItems,
  filteredWardrobe,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  showGrid,
  setShowGrid,
  totalPrice,
  toggleItemSelection,
  handleReset,
  handleSaveOutfit,
  handleAddPiece,
  isAddOpen,
  setIsAddOpen,
}) {
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816]">
      <div className="max-w-[1520px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 bg-white border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-luxury text-xl font-bold">Tủ đồ của tôi</h3>
              <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center gap-1 bg-[#183B22] text-white px-2 py-1.5 rounded-md text-[10px] font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                Thêm đồ
              </button>
            </div>

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sơ mi Trắng..."
              className="w-full p-2 text-xs bg-[#FAF8F5] border rounded-md mb-4"
            />

            <div className="flex gap-2 border-b pb-2 mb-4 text-xs">
              <button onClick={() => setActiveCategory('all')}>Tất cả</button>
              <button onClick={() => setActiveCategory('tops')}>Áo</button>
              <button onClick={() => setActiveCategory('bottoms')}>Quần</button>
              <button onClick={() => setActiveCategory('shoes')}>Giày</button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-y-auto">
              {filteredWardrobe.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className={`relative rounded-xl border p-2.5 text-center cursor-pointer ${item.selected ? 'border-[#183B22]' : ''}`}
                >
                  <img src={item.image} alt={item.name} className="w-full aspect-square object-contain" />
                  <div className="text-xs truncate">{item.name}</div>
                  <div className="text-[10px]">{item.formattedPrice}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border rounded-2xl p-5">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold">Mix Canvas</h3>
                <p className="text-xs">Phòng thiết kế phong cách 2D chuyên nghiệp.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleReset} className="px-3 py-1.5 border rounded-md text-xs">
                  <RotateCcw className="inline w-3.5 h-3.5" /> Làm mới
                </button>
                <button onClick={handleSaveOutfit} className="px-4 py-1.5 bg-[#183B22] text-white rounded-md text-xs">
                  <Check className="inline w-3.5 h-3.5" /> Lưu bộ đồ
                </button>
              </div>
            </div>

            <div className={`relative min-h-[580px] rounded-xl border flex flex-col items-center justify-center ${showGrid ? 'bg-[#f8f6f0]' : 'bg-[#F9F7F2]'}`}>
              <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-25">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="border-r border-[#d8d0c7]" />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70%] h-[70%] border border-dashed border-[#D6CEC2] rounded-2xl" />
              </div>
              <div className="relative z-10 flex flex-wrap justify-center items-end gap-5 p-8">
                {canvasItems.map((item) => (
                  <div key={item.id} className="relative flex flex-col items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`object-contain ${item.type === 'top' ? 'w-44 h-44' : item.type === 'bottom' ? 'w-36 h-52' : item.type === 'shoe' ? 'w-28 h-28' : 'w-32 h-32'}`}
                    />
                    <button onClick={() => toggleItemSelection(item.id)} className="mt-2 text-[10px] px-2 py-1 border rounded-full bg-white">
                      Bỏ chọn
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-[#F9F5F0] border px-3 py-1.5 text-[11px]">
                  <Sparkles className="w-4 h-4 text-[#183B22]" /> {userProfile.tip}
                </div>
                <div className="text-xs text-[#5F5A53]">
                  Tổng: <span className="font-semibold text-[#183B22]">{totalPrice}</span>
                </div>
              </div>
              <button onClick={() => toggleItemSelection('item-belt')} className="text-xs text-[#183B22]">
                Xem gợi ý
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-luxury text-xl font-bold">AI Combo</h3>
              <button className="bg-[#183B22] text-white px-2 py-1 rounded-md text-[10px]">Lưu vẻ ngoài</button>
            </div>
            <div className="space-y-3">
              {['A', 'B', 'C'].map((label) => (
                <div key={label} className="rounded-xl border bg-[#FAF8F5] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">Outfit {label}</span>
                    <button className="text-[10px]">Áp dụng</button>
                  </div>
                  <div className="flex gap-2">
                    {canvasItems.slice(0, 3).map((item, idx) => (
                      <img
                        key={`${item.id}-${idx}`}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain rounded-md bg-white border"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddPieceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAddPiece={handleAddPiece} />
    </div>
  );
}
