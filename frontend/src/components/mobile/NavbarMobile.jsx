import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

export default function NavbarMobile({ onNavigateToSearch, onOpenAuth }) {
  return (
    <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EAE6DF] px-4 py-3 flex items-center justify-between">
      <button onClick={onNavigateToSearch} className="p-1.5 -ml-1 text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors" title="Back to Search" aria-label="Back">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="font-serif-luxury text-lg font-medium text-[#1A3C24] tracking-wide">Brand Profile</h1>
      <button onClick={onOpenAuth} className="p-1.5 -mr-1 text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors relative" title="Notifications" aria-label="Notifications">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#1A3C24] rounded-full" />
      </button>
    </header>
  );
}
