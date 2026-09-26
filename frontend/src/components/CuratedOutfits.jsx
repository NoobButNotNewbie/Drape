import React from 'react';
import CuratedOutfitsDesktop from './desktop/CuratedOutfitsDesktop';

export default function CuratedOutfits({ onSelectOutfit, onOpenLookbook }) {
  return <CuratedOutfitsDesktop onSelectOutfit={onSelectOutfit} onOpenLookbook={onOpenLookbook} />;
}
