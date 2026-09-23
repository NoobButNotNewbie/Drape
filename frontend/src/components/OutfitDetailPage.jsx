import React, { useState } from 'react';
import { outfitDetails } from '../data/outfitDetailData';
import OutfitDetailPageMobile from './mobile/OutfitDetailPageMobile';
import OutfitDetailPageDesktop from './desktop/OutfitDetailPageDesktop';

export default function OutfitDetailPage({ isMobileFrame, outfitId = 'the-modern-minimalist', onBack, onNavigateToCanvas, onOpenAuth, onAddToCart, isAuthenticated, onRequireAuth }) {
  const [selectedOutfitKey, setSelectedOutfitKey] = useState(isMobileFrame ? 'navy-cream-heritage' : outfitId);
  const [isLiked, setIsLiked] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const outfit = outfitDetails[selectedOutfitKey] || outfitDetails['the-modern-minimalist'];
  const handleAffiliateClick = (actionLabel, itemName) => { setToastMessage(`Đang chuyển hướng tới ${actionLabel} cho "${itemName}"...`); setTimeout(() => setToastMessage(''), 2500); };
  const viewProps = { outfit, isLiked, setIsLiked, toastMessage, setSelectedOutfitKey, handleAffiliateClick, onBack, onNavigateToCanvas, onOpenAuth, onAddToCart, isAuthenticated, onRequireAuth };
  const addEntireOutfit = () => outfit.items.forEach((item) => onAddToCart(item));
  return <>
    {isMobileFrame ? <OutfitDetailPageMobile {...viewProps} /> : <OutfitDetailPageDesktop {...viewProps} />}
    <button onClick={addEntireOutfit} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 bg-[#183B22] text-white text-xs font-bold rounded-full shadow-xl">THÊM CẢ SET VÀO TÚI ({outfit.items.length})</button>
  </>;
}
