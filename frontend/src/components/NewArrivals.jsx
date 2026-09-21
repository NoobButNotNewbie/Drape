import React, { useMemo, useState } from 'react';
import { newArrivals } from '../data/mockData';
import NewArrivalsMobile from './mobile/NewArrivalsMobile';
import NewArrivalsDesktop from './desktop/NewArrivalsDesktop';
export default function NewArrivals({ isMobileFrame, onSelectProduct, wishlist, toggleWishlist }) {
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortedProducts = useMemo(() => { const list = [...newArrivals]; if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price); if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price); if (sortBy === 'name') return list.sort((a, b) => a.name.localeCompare(b.name)); return list; }, [sortBy]);
  const sortLabels = { newest: 'Newest', 'price-low': 'Price: Low to High', 'price-high': 'Price: High to Low', name: 'Name: A to Z' };
  const props = { sortedProducts, sortLabels, sortBy, isSortOpen, onToggleSort: () => setIsSortOpen((previous) => !previous), onCloseSort: () => setIsSortOpen(false), onSelectSort: (key) => { setSortBy(key); setIsSortOpen(false); }, wishlist, toggleWishlist, onSelectProduct };
  return isMobileFrame ? <NewArrivalsMobile {...props} /> : <NewArrivalsDesktop {...props} />;
}
