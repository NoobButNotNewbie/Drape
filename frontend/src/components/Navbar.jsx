import React from 'react';
import { Search, Bell, User, ArrowLeft, SlidersHorizontal } from 'lucide-react';

export default function Navbar({
  isMobileFrame,
  activeTab,
  setActiveTab,
  onNavigateToHome,
  onNavigateToFeed,
  onNavigateToWardrobe,
  onNavigateToCanvas,
  onNavigateToSearch,
  onNavigateToBrand,
  onOpenAuth,
}) {
  if (isMobileFrame) {
    return (
      <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EAE6DF] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onNavigateToSearch}
          className="p-1.5 -ml-1 text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors"
          title="Back to Search"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-serif-luxury text-lg font-medium text-[#1A3C24] tracking-wide">
          Brand Profile
        </h1>

        <button
          onClick={onOpenAuth}
          className="p-1.5 -mr-1 text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors relative"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#1A3C24] rounded-full"></span>
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <button
            onClick={onNavigateToHome || onNavigateToFeed}
            className="font-serif-luxury text-2xl font-bold tracking-widest text-[#151816] hover:text-[#1A3C24] transition-colors"
          >
            DRAPE
          </button>

          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#6A675F]">
            <button
              onClick={() => {
                setActiveTab('feed');
                onNavigateToFeed();
              }}
              className={`pb-1 transition-all ${
                activeTab === 'feed'
                  ? 'text-[#151816] border-b-2 border-[#1A3C24] font-semibold'
                  : 'hover:text-[#151816]'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => {
                setActiveTab('wardrobe');
                onNavigateToWardrobe ? onNavigateToWardrobe() : onNavigateToBrand();
              }}
              className={`pb-1 transition-all ${
                activeTab === 'wardrobe'
                  ? 'text-[#151816] border-b-2 border-[#1A3C24] font-semibold'
                  : 'hover:text-[#151816]'
              }`}
            >
              Wardrobe
            </button>
            <button
              onClick={() => {
                setActiveTab('mix-canvas');
                onNavigateToCanvas();
              }}
              className={`pb-1 transition-all ${
                activeTab === 'mix-canvas'
                  ? 'text-[#151816] border-b-2 border-[#1A3C24] font-semibold'
                  : 'hover:text-[#151816]'
              }`}
            >
              Mix Canvas
            </button>
          </nav>
        </div>

        {/* Right: Search, Notifications, Avatar */}
        <div className="flex items-center space-x-4">
          <div
            onClick={onNavigateToSearch}
            className="relative hidden sm:block cursor-pointer"
            title="Click to search styles, brands & outfits"
          >
            <input
              type="text"
              readOnly
              placeholder="Search brands..."
              className="w-48 lg:w-64 pl-9 pr-4 py-1.5 text-xs bg-[#F4F1EA] border border-transparent hover:border-[#DCD7CD] focus:border-[#1A3C24] focus:bg-white rounded-full outline-none transition-all placeholder:text-[#9B9890] cursor-pointer"
            />
            <Search className="w-3.5 h-3.5 text-[#86837C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            onClick={onOpenAuth}
            className="p-2 text-[#56544E] hover:text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#1A3C24] rounded-full"></span>
          </button>

          <button
            onClick={onOpenAuth}
            className="p-1 text-[#56544E] hover:text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors"
            title="Account Profile & Sign In"
          >
            <div className="w-7 h-7 rounded-full bg-[#E5DFD5] border border-[#D5CEC2] flex items-center justify-center text-[#1A3C24]">
              <User className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
