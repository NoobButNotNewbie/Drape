import React from 'react';
import { Check } from 'lucide-react';
import { brandData } from '../../data/mockData';

export default function BrandHeroMobile({ isFollowing, formattedCount, onToggleFollow }) {
  return <section className="px-5 pt-8 pb-6 text-center border-b border-[#EFECE6] bg-[#FBFBFA]">
    <div className="mx-auto w-20 h-20 rounded-2xl bg-[#F5F2EC] border border-[#E5E0D7] flex items-center justify-center shadow-xs mb-5"><span className="font-serif-luxury text-xl font-semibold text-[#1A3C24] tracking-wider">{brandData.monogram}</span></div>
    <h2 className="font-serif-luxury text-3xl font-bold text-[#151816] tracking-tight mb-2">{brandData.name}</h2>
    <p className="font-serif-luxury italic text-xs text-[#6A675F] max-w-xs mx-auto leading-relaxed mb-6">{brandData.shortDescription}</p>
    <div className="flex items-center justify-center space-x-6 mb-6"><div className="text-center"><div className="font-serif-luxury text-2xl font-bold text-[#151816]">{formattedCount}</div><div className="text-[11px] text-[#78756E] font-medium tracking-wide">Followers</div></div><div className="w-px h-8 bg-[#E3DFD7]" /><div className="text-center"><div className="font-serif-luxury text-2xl font-bold text-[#151816]">{brandData.outfitsCount}</div><div className="text-[11px] text-[#78756E] font-medium tracking-wide">Outfits</div></div><div className="w-px h-8 bg-[#E3DFD7]" /><div className="text-center"><div className="font-serif-luxury text-2xl font-bold text-[#1A3C24]">{brandData.confidenceScore}</div><div className="text-[11px] text-[#78756E] font-medium tracking-wide">Confidence</div></div></div>
    <button onClick={onToggleFollow} className={`w-full py-3 px-6 rounded-md font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 ${isFollowing ? 'bg-[#EAE6DF] text-[#1A3C24] hover:bg-[#E0DCD4]' : 'bg-[#183B22] text-white hover:bg-[#122E1A] shadow-sm'}`}>{isFollowing ? <><Check className="w-3.5 h-3.5" /><span>Following</span></> : <span>Follow Brand</span>}</button>
  </section>;
}
