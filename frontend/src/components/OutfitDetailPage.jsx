import React, { useState } from 'react';
import { outfitDetails } from '../data/outfitDetailData';
import OutfitDetailPageMobile from './mobile/OutfitDetailPageMobile';
import OutfitDetailPageDesktop from './desktop/OutfitDetailPageDesktop';

export default function OutfitDetailPage({ isMobileFrame, outfitId = 'the-modern-minimalist', onBack, onNavigateToCanvas, onOpenAuth }) {
  const [selectedOutfitKey, setSelectedOutfitKey] = useState(isMobileFrame ? 'navy-cream-heritage' : outfitId);
  const [isLiked, setIsLiked] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const outfit = outfitDetails[selectedOutfitKey] || outfitDetails['the-modern-minimalist'];
  const handleAffiliateClick = (actionLabel, itemName) => { setToastMessage(`Đang chuyển hướng tới ${actionLabel} cho "${itemName}"...`); setTimeout(() => setToastMessage(''), 2500); };
  const viewProps = { outfit, isLiked, setIsLiked, toastMessage, setSelectedOutfitKey, handleAffiliateClick, onBack, onNavigateToCanvas, onOpenAuth };
  return isMobileFrame ? <OutfitDetailPageMobile {...viewProps} /> : <OutfitDetailPageDesktop {...viewProps} />;
}
