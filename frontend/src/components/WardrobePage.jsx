import React, { useState } from 'react';
import { initialWardrobePieces } from '../data/wardrobeData';
import WardrobePageMobile from './mobile/WardrobePageMobile';
import WardrobePageDesktop from './desktop/WardrobePageDesktop';

export default function WardrobePage({ isMobileFrame, onNavigateToCanvas, onOpenAuth }) {
  const [pieces, setPieces] = useState(initialWardrobePieces);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const filteredPieces = pieces.filter((item) => activeCategory === 'all' || item.category === activeCategory);
  const handleAddPiece = (newPiece) => setPieces((previous) => [newPiece, ...previous]);
  const viewProps = { pieces, filteredPieces, activeCategory, setActiveCategory, onNavigateToCanvas, onOpenAuth, isAddOpen, setIsAddOpen, handleAddPiece };
  return isMobileFrame ? <WardrobePageMobile {...viewProps} /> : <WardrobePageDesktop {...viewProps} />;
}
