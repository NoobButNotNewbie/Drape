import React from 'react';
import { Menu, User, Sparkles, Check } from 'lucide-react';
import { anchorItems } from '../../data/wardrobeFocusData';

export default function WardrobeFocusMobile({
  selectedItemId,
  toastMessage,
  onNavigateToCanvas,
  onNavigateToWardrobeList,
  onOpenAuth,
  onSelectOtherItem,
}) {
  const item = anchorItems.find((entry) => entry.id === 'navy-cable-knit-sweater') || anchorItems.find((entry) => entry.id === selectedItemId) || anchorItems[0];

  return (
    <div className="bg-[#FBFBFA] min-h-screen text-[#151816] pb-28 relative font-sans">
      {toastMessage && <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#16291C] text-white px-4 py-2 rounded-lg shadow-lg text-xs flex items-center space-x-2 border border-[#2A4933] animate-in fade-in"><Check className="w-4 h-4 text-emerald-400" /><span>{toastMessage}</span></div>}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE6DF] sticky top-0 bg-[#FBFBFA]/95 backdrop-blur-md z-30">
        <button onClick={onNavigateToWardrobeList} className="p-1 text-[#33312B] hover:text-[#183B22]" title="Tủ đồ"><Menu className="w-5 h-5" /></button>
        <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#183B22] uppercase">WARDROBE</span>
        <button onClick={onOpenAuth} className="p-1 text-[#33312B] hover:text-[#183B22]" title="Tài khoản"><User className="w-5 h-5" /></button>
      </header>
      <div className="px-5 pt-4 pb-2"><span className="text-[10px] font-mono tracking-widest text-[#7C7971] uppercase font-bold block mb-1">SELECTION FOCUSED</span><h2 className="font-serif-luxury text-2xl font-bold tracking-wide text-[#151816] uppercase">DIGITAL WARDROBE</h2></div>
      <div className="px-4 pt-2"><div className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-xs relative">
        <div className="absolute top-3 right-3 z-10"><span className="px-2.5 py-1 bg-[#F5F2EB] text-[#183B22] border border-[#DDD7CC] rounded-sm text-[9px] font-mono font-bold tracking-wider uppercase">ANCHOR ITEM</span></div>
        <div className="w-full h-72 bg-[#F4F1EC] relative flex items-center justify-center p-6"><div className="w-full h-full rounded-lg flex items-center justify-center relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#D5CEC2 0.75px, transparent 0.75px), radial-gradient(#D5CEC2 0.75px, #F4F1EC 0.75px)', backgroundSize: '16px 16px', backgroundPosition: '0 0, 8px 8px' }}><img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain filter drop-shadow-md" /></div></div>
        <div className="p-4 bg-white border-t border-[#EFECE6]"><div className="flex items-start justify-between gap-2 mb-2"><h3 className="font-serif-luxury text-xl font-bold text-[#151816] leading-tight">{item.title}</h3><span className="text-[9px] font-mono text-[#827E75] shrink-0">SKU: {item.sku}</span></div><div className="flex flex-wrap gap-1.5 mb-2">{item.badges.map((badge, index) => <span key={badge} className="px-2.5 py-1 rounded-sm bg-[#ECF4EE] text-[10px] font-medium text-[#183B22]">{index === 0 && <span className="mr-1">✓</span>}{badge}</span>)}</div></div>
      </div></div>
      <div className="px-4 pt-5 space-y-3"><div className="flex items-center space-x-1.5 text-[#183B22]"><Sparkles className="w-4 h-4" /><span className="text-xs font-mono font-bold tracking-wider uppercase">AI SUGGESTIONS</span></div><p className="text-[11px] text-[#78746B] -mt-1">Curated pairings based on your Style DNA</p><div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none pt-1">{item.suggestions.map((suggestion) => <div key={suggestion.id} className="min-w-[240px] max-w-[240px] bg-white rounded-xl border border-[#E8E3D8] p-3 shadow-2xs shrink-0"><div className="flex items-center space-x-3"><div className="w-16 h-16 rounded-lg bg-[#F5F2EB] overflow-hidden shrink-0 border border-[#EBE6DD]"><img src={suggestion.image} alt={suggestion.name} className="w-full h-full object-cover" /></div><div><span className="text-[10px] font-mono font-bold text-[#183B22] block mb-0.5">{suggestion.matchPercent}</span><h5 className="font-serif-luxury text-xs font-bold text-[#151816] line-clamp-1">{suggestion.name}</h5><span className="text-[11px] font-mono font-semibold text-[#504D46]">{suggestion.price}</span></div></div><button onClick={onNavigateToCanvas} className="mt-3 w-full py-1.5 bg-[#FAF8F5] border border-[#DDD7CC] rounded-md text-[11px] font-serif-luxury font-bold text-[#35322B]">View Details</button></div>)}</div></div>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBFBFA]/98 backdrop-blur-md border-t border-[#EAE6DF] px-4 py-3"><div className="flex items-center space-x-3 max-w-md mx-auto"><button onClick={onSelectOtherItem} className="flex-1 py-3 px-4 rounded-md border border-[#DDD7CC] bg-white text-xs font-serif-luxury font-bold tracking-wider text-[#35322B] uppercase">ITEM OTHER</button><button onClick={onNavigateToCanvas} className="flex-1 py-3 px-4 rounded-md bg-[#183B22] text-white text-xs font-serif-luxury font-bold tracking-wider uppercase shadow-sm">MIX CANVAS</button></div></div>
    </div>
  );
}
