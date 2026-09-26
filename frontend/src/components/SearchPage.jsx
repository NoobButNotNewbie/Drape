import React, { useState } from 'react';
import { initialRecentSearches } from '../data/searchData';
import SearchPageDesktop from './desktop/SearchPageDesktop';

export default function SearchPage({ onOpenAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);
  const handleRemoveRecent = (itemToRemove) => setRecentSearches((previous) => previous.filter((item) => item !== itemToRemove));
  const handleClearAllRecent = () => setRecentSearches([]);
  const handleTagClick = (tag) => setSearchQuery(tag.replace('#', ''));
  const viewProps = { searchQuery, setSearchQuery, activeCategory, setActiveCategory, recentSearches, handleRemoveRecent, handleClearAllRecent, handleTagClick, onOpenAuth };
  return <SearchPageDesktop {...viewProps} />;
}
