import React, { useState } from 'react';
import {
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  Star,
  Menu,
  User,
} from 'lucide-react';
import { wardrobeCategories, initialWardrobePieces } from '../data/wardrobeData';
import AddPieceModal from './AddPieceModal';

export default function WardrobePage({
  isMobileFrame,
  onNavigateToCanvas,
  onOpenAuth,
}) {
  const [pieces, setPieces] = useState(initialWardrobePieces);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const filteredPieces = pieces.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  const handleAddPiece = (newPiece) => {
    setPieces((prev) => [newPiece, ...prev]);
  };

  // ----------------------------------------------------
  // MOBILE VIEW (Exact match for media_1789556665549.png)
  // ----------------------------------------------------
  if (isMobileFrame) {
    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-24 relative">
        {/* Mobile Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30">
          <button onClick={onOpenAuth} className="p-1 text-[#33312B] hover:text-[#183B22]">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#183B22] uppercase">
            WARDROBE
          </span>
          <button onClick={onOpenAuth} className="p-1 text-[#33312B] hover:text-[#183B22]">
            <User className="w-5 h-5" />
          </button>
        </header>

        {/* Title & Count */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start justify-between mb-1">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#151816]">
              Your Digital<br />Canvas
            </h2>
            <span className="font-mono text-xs font-bold tracking-widest text-[#183B22] uppercase mt-1">
              {pieces.length + 14} PIECES
            </span>
          </div>
          <p className="text-xs text-[#706C64] leading-relaxed">
            A curated collection of your essentials, refined for modern masculinity.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="px-5 py-3 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {wardrobeCategories.map((cat) => (
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

        {/* 2-Column Grid */}
        <div className="px-4 pt-2 grid grid-cols-2 gap-3.5">
          {filteredPieces.map((piece) => (
            <div
              key={piece.id}
              onClick={onNavigateToCanvas}
              className="bg-white rounded-xl border border-[#E6E1D7] overflow-hidden p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-[#FAF8F5] rounded-lg overflow-hidden p-2 flex items-center justify-center mb-2.5">
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                />
                {/* Badge top-left */}
                <span
                  className={`absolute top-1.5 left-1.5 px-2 py-0.5 text-[8px] font-bold tracking-wider rounded-xs uppercase ${
                    piece.badgeType === 'dark-green'
                      ? 'bg-[#183B22] text-white'
                      : piece.badgeType === 'light-green'
                      ? 'bg-[#ECF4EE] text-[#1C4A29]'
                      : 'bg-[#F2ECE1] text-[#635F57]'
                  }`}
                >
                  {piece.badge}
                </span>
              </div>

              <div>
                <h4 className="font-serif-luxury text-xs font-bold text-[#151816] truncate mb-0.5">
                  {piece.name}
                </h4>
                <div className="text-[9px] uppercase tracking-wider text-[#8A867E] font-medium truncate">
                  {piece.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button (+) */}
        <button
          onClick={() => setIsAddOpen(true)}
          className="fixed bottom-20 right-5 z-40 w-12 h-12 rounded-2xl bg-[#183B22] hover:bg-[#122E1A] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
          title="Thêm đồ vào tủ"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Add Piece Modal */}
        <AddPieceModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAddPiece={handleAddPiece}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VIEW (Exact match for media_1789556665561.png)
  // ----------------------------------------------------
  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#183B22] tracking-tight mb-1.5">
              Digital Wardrobe
            </h2>
            <p className="text-xs sm:text-sm text-[#706D65] max-w-xl">
              Your curated collection of refined essentials, digitized for precision styling and effortless daily combinations.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-[#DDD7CC] hover:border-[#183B22] rounded-md text-xs font-medium text-[#4A4741] transition-colors shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#737068]" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-[#DDD7CC] hover:border-[#183B22] rounded-md text-xs font-medium text-[#4A4741] transition-colors shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#737068]" />
              <span>Recent</span>
            </button>
          </div>
        </div>

        {/* Grid matching Desktop Screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Card 1: + Add Piece (Dashed Border) */}
          <div
            onClick={() => setIsAddOpen(true)}
            className="aspect-[3/4] rounded-xl border-2 border-dashed border-[#D5CEC2] hover:border-[#183B22] bg-[#FAF8F5]/60 hover:bg-[#F3EFE7]/80 flex flex-col items-center justify-center p-4 cursor-pointer transition-all group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-[#EFECE4] group-hover:bg-[#183B22] text-[#55524B] group-hover:text-white flex items-center justify-center mb-2 transition-colors">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-semibold text-[#4A4740] group-hover:text-[#183B22] transition-colors">
              Add Piece
            </span>
          </div>

          {/* Real Pieces */}
          {filteredPieces.map((piece) => (
            <div
              key={piece.id}
              onClick={onNavigateToCanvas}
              className={`rounded-xl border bg-white overflow-hidden p-3 flex flex-col justify-between cursor-pointer transition-all hover:shadow-md ${
                piece.isActive
                  ? 'border-[#183B22] ring-2 ring-[#183B22]/20 shadow-xs'
                  : 'border-[#E6E1D7]'
              }`}
            >
              <div className="relative aspect-[4/5] bg-[#FAF8F5] rounded-lg overflow-hidden p-2 flex items-center justify-center mb-2.5">
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-103 transition-transform"
                />

                {/* Star icon if active/starred */}
                {piece.isActive && (
                  <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#183B22] text-white flex items-center justify-center shadow-2xs">
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </div>
                )}
              </div>

              <div>
                <div className="text-[9px] uppercase font-bold tracking-wider text-[#8A867E] mb-0.5">
                  {piece.category}
                </div>
                <h4 className="font-serif-luxury text-xs font-bold text-[#151816] truncate mb-1">
                  {piece.name}
                </h4>

                <span
                  className={`inline-block px-1.5 py-0.5 text-[8px] font-bold tracking-wider rounded-xs uppercase ${
                    piece.badgeType === 'dark-green'
                      ? 'bg-[#183B22] text-white'
                      : piece.badgeType === 'light-green'
                      ? 'bg-[#ECF4EE] text-[#1C4A29]'
                      : 'bg-[#F2ECE1] text-[#635F57]'
                  }`}
                >
                  {piece.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (+) */}
      <button
        onClick={() => setIsAddOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-xl bg-[#183B22] hover:bg-[#122E1A] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105"
        title="Thêm đồ vào tủ"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Add Piece Modal */}
      <AddPieceModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddPiece={handleAddPiece}
      />
    </div>
  );
}
