import React from 'react';
import NavbarDesktop from './desktop/NavbarDesktop';

export default function Navbar({ activeTab, setActiveTab, onNavigateToFeed, onNavigateToWardrobe, onNavigateToCanvas, onNavigateToSearch, onNavigateToAdmin, onOpenAuth, onOpenNotifications, currentUser }) {
  return (
    <NavbarDesktop
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onNavigateToFeed={onNavigateToFeed}
      onNavigateToWardrobe={onNavigateToWardrobe}
      onNavigateToCanvas={onNavigateToCanvas}
      onNavigateToSearch={onNavigateToSearch}
      onNavigateToAdmin={onNavigateToAdmin}
      onOpenAuth={onOpenAuth}
      onOpenNotifications={onOpenNotifications}
      currentUser={currentUser}
    />
  );
}
