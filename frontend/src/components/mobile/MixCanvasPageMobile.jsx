import React from 'react';
import { RotateCcw, Layers, Trash2, Sparkles, Check, ArrowRight, Bell, Menu, Plus } from 'lucide-react';
import AddPieceModal from '../AddPieceModal';
import { userProfile } from '../../data/canvasData';

export default function MixCanvasPageMobile({ canvasItems, mobileFilteredItems, mobileTab, setMobileTab, showGrid, setShowGrid, toastMessage, toggleItemSelection, handleReset, handleClearAll, onOpenAuth, handleAddPiece, isAddOpen, setIsAddOpen }) {
  const topItem = canvasItems.find((item) => item.type === 'top') || canvasItems[0];
  const bottomItem = canvasItems.find((item) => item.type === 'bottom');

  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col pb-6">
      {toastMessage && <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#16291C] text-white px-4 py-2 rounded-lg text-xs"><Check className="inline w-4 h-4" /> {toastMessage}</div>}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b sticky top-0 bg-[#FBFBFA]/95 z-30"><button onClick={onOpenAuth}><Menu className="w-5 h-5" /></button><span className="font-serif-luxury text-xl font-bold tracking-widest text-[#183B22]">DRAPE</span><button onClick={onOpenAuth}><Bell className="w-5 h-5" /></button></header>
      <div className="flex-1 px-4 pt-3">
        <div className={`relative min-h-[360px] rounded-2xl border flex flex-col items-center justify-center p-4 ${showGrid ? 'bg-[#f8f6f0]' : 'bg-[#F9F7F2]'}`}><span className="absolute top-3 px-4 py-1 rounded-full bg-white border text-[10px] font-bold">MIX CANVAS</span><div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2"><button onClick={handleReset} className="w-9 h-9 rounded-xl bg-white border flex items-center justify-center"><RotateCcw className="w-4 h-4" /></button><button onClick={() => setShowGrid(!showGrid)} className="w-9 h-9 rounded-xl bg-white border flex items-center justify-center"><Layers className="w-4 h-4" /></button><button onClick={handleClearAll} className="w-9 h-9 rounded-xl bg-white border flex items-center justify-center"><Trash2 className="w-4 h-4" /></button></div><div className="flex flex-col items-center">{topItem && <img src={topItem.image} alt={topItem.name} className="w-44 h-44 object-contain" />}{bottomItem && <img src={bottomItem.image} alt={bottomItem.name} className="w-32 h-44 object-contain -mt-4" />}</div></div>
        <div className="mt-3 p-3 rounded-xl bg-[#ECF4EE] border flex items-center justify-between"><span className="text-xs font-bold text-[#183B22]"><Sparkles className="inline w-4 h-4" /> 98% Match Confidence</span><button onClick={() => toggleItemSelection('item-belt')} className="text-[10px]">{userProfile.tip}<ArrowRight className="inline w-3 h-3" /></button></div>
      </div>

      <div className="px-4 pt-2">
        <div className="bg-white rounded-2xl border p-3.5">
          <div className="flex items-center gap-2 border-b pb-2 mb-3 text-xs font-semibold">
            {['tops', 'pants', 'shoes'].map((tab) => (
              <button key={tab} onClick={() => setMobileTab(tab)} className={mobileTab === tab ? 'text-[#183B22]' : 'text-[#858178]'}>{tab.toUpperCase()}</button>
            ))}
            <button onClick={() => setIsAddOpen(true)} className="ml-auto inline-flex items-center gap-1 rounded-md bg-[#183B22] px-2 py-1 text-[9px] text-white">
              <Plus className="w-3 h-3" /> Thêm
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto">
            {mobileFilteredItems.map((item) => (
              <div key={item.id} onClick={() => toggleItemSelection(item.id)} className={`w-20 h-24 rounded-xl border p-1 shrink-0 text-center ${item.selected ? 'border-[#183B22]' : ''}`}>
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain mx-auto" />
                <div className="text-[9px] truncate">{item.formattedPrice}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddPieceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAddPiece={handleAddPiece} />
    </div>
  );
}
