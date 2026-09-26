import React, { useState } from 'react';
import { feedOutfits } from '../data/feedData';
import FeedPageDesktop from './desktop/FeedPageDesktop';

export default function FeedPage({ onSelectOutfit, onNavigateToCanvas, onNavigateToSearch, onOpenAuth }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedOutfits, setLikedOutfits] = useState(['feed-3']);
  const [visibleCount, setVisibleCount] = useState(6);
  const toggleLike = (id, event) => {
    event.stopPropagation();
    setLikedOutfits((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  };
  const filteredOutfits = feedOutfits.filter((item) => activeCategory === 'all' || item.category === activeCategory);
  const viewProps = { filteredOutfits, activeCategory, setActiveCategory, likedOutfits, toggleLike, visibleCount, setVisibleCount, onSelectOutfit, onNavigateToCanvas, onNavigateToSearch, onOpenAuth };
  return <FeedPageDesktop {...viewProps} />;
}
