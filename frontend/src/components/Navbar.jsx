import React from 'react';
import NavbarMobile from './mobile/NavbarMobile';
import NavbarDesktop from './desktop/NavbarDesktop';
export default function Navbar({ isMobileFrame, activeTab, setActiveTab, onNavigateToHome, onNavigateToFeed, onNavigateToWardrobe, onNavigateToCanvas, onNavigateToSearch, onNavigateToBrand, onOpenAuth, onOpenNotifications, currentUser }) {
  return isMobileFrame ? <NavbarMobile onNavigateToSearch={onNavigateToSearch} onOpenAuth={onOpenAuth} /> : <NavbarDesktop activeTab={activeTab} setActiveTab={setActiveTab} onNavigateToHome={onNavigateToHome} onNavigateToFeed={onNavigateToFeed} onNavigateToWardrobe={onNavigateToWardrobe} onNavigateToCanvas={onNavigateToCanvas} onNavigateToSearch={onNavigateToSearch} onNavigateToBrand={onNavigateToBrand} onOpenAuth={onOpenAuth} onOpenNotifications={onOpenNotifications} currentUser={currentUser} />;
}
