import React from 'react';
import CuratedOutfitsMobile from './mobile/CuratedOutfitsMobile';
import CuratedOutfitsDesktop from './desktop/CuratedOutfitsDesktop';
export default function CuratedOutfits({ isMobileFrame, onSelectOutfit, onOpenLookbook }) {
  return isMobileFrame ? <CuratedOutfitsMobile onSelectOutfit={onSelectOutfit} onOpenLookbook={onOpenLookbook} /> : <CuratedOutfitsDesktop onSelectOutfit={onSelectOutfit} onOpenLookbook={onOpenLookbook} />;
}
