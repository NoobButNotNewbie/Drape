import React, { useState } from 'react';
import { dailySuggestions } from '../data/homeDashboardData';
import HomeDashboardPageMobile from './mobile/HomeDashboardPageMobile';
import HomeDashboardPageDesktop from './desktop/HomeDashboardPageDesktop';

export default function HomeDashboardPage({ isMobileFrame, onNavigateToCanvas, onNavigateToWardrobe, onNavigateToSearch, onNavigateToBrand, onSelectOutfit, onOpenAuth }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const handlePrevSlide = () => setSlideIndex((previous) => (previous > 0 ? previous - 1 : dailySuggestions.length - 2));
  const handleNextSlide = () => setSlideIndex((previous) => (previous < dailySuggestions.length - 2 ? previous + 1 : 0));
  const viewProps = { slideIndex, handlePrevSlide, handleNextSlide, onNavigateToCanvas, onNavigateToWardrobe, onNavigateToSearch, onNavigateToBrand, onSelectOutfit, onOpenAuth };
  return isMobileFrame ? <HomeDashboardPageMobile {...viewProps} /> : <HomeDashboardPageDesktop {...viewProps} />;
}
