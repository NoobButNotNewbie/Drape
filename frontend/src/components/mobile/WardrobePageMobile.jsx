import React from 'react';
import { Plus, Menu, User } from 'lucide-react';
import { wardrobeCategories } from '../../data/wardrobeData';
import AddPieceModal from '../AddPieceModal';

export default function WardrobePageMobile({ pieces, activeCategory, setActiveCategory, filteredPieces, onNavigateToCanvas, onOpenAuth, isAddOpen, setIsAddOpen, handleAddPiece }) {
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-24 relative">
      <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 z-30">
        <button onClick={onOpenAuth} className="p-1"><Menu className="w-5 h-5" /></button>
        <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#183B22] uppercase">WARDROBE</span>
        <button onClick={onOpenAuth} className="p-1"><User className="w-5 h-5" /></button>
      </header>
      <div className="px-5 pt-5 pb-3"><div className="flex items-start justify-between"><h2 className="font-serif-luxury text-2xl font-bold">Your Digital<br />Canvas</h2><span className="font-mono text-xs font-bold text-[#183B22]">{pieces.length + 14} PIECES</span></div><p className="text-xs text-[#706C64] leading-relaxed">A curated collection of your essentials, refined for modern masculinity.</p></div>
      <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar">{wardrobeCategories.map((cat) => <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-1.5 text-xs rounded-full whitespace-nowrap ${activeCategory === cat.id ? 'bg-[#183B22] text-white' : 'bg-white border border-[#E3DED5]'}`}>{cat.label}</button>)}</div>
      <div className="px-4 pt-2 grid grid-cols-2 gap-3.5">{filteredPieces.map((piece) => <div key={piece.id} onClick={onNavigateToCanvas} className="bg-white rounded-xl border border-[#E6E1D7] overflow-hidden p-3 cursor-pointer"><div className="relative aspect-square bg-[#FAF8F5] rounded-lg flex items-center justify-center"><img src={piece.image} alt={piece.name} className="max-h-full max-w-full object-contain" /></div><h4 className="font-serif-luxury text-xs font-bold truncate mt-2">{piece.name}</h4><div className="text-[9px] uppercase text-[#8A867E] truncate">{piece.subtitle}</div></div>)}</div>
      <button onClick={() => setIsAddOpen(true)} className="fixed bottom-20 right-5 z-40 w-12 h-12 rounded-2xl bg-[#183B22] text-white flex items-center justify-center shadow-lg" title="Thêm đồ vào tủ"><Plus className="w-6 h-6" /></button>
      <AddPieceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAddPiece={handleAddPiece} />
    </div>
  );
}
