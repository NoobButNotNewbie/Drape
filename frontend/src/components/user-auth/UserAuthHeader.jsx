import React from 'react';

export default function UserAuthHeader({
  activeScreen = 'user-login',
  onNavigate,
  onBackToApp,
  isProtocolVariant = false, // When on mkmoi.png which has Introduction, Features, Contact, Login, Register
}) {
  if (isProtocolVariant) {
    return (
      <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EAE6DF] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate?.('user-login')}
            className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.16em] text-[#1A3C24] hover:opacity-80 transition-opacity"
          >
            DRAPE
          </button>

          {/* Center Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-[#4A4740]">
            <button
              onClick={() => onBackToApp?.('home')}
              className="hover:text-[#1A3C24] transition-colors py-1"
            >
              Introduction
            </button>
            <button
              onClick={() => onBackToApp?.('dna-flow')}
              className="hover:text-[#1A3C24] transition-colors py-1"
            >
              Features
            </button>
            <button
              onClick={() => onBackToApp?.('brand')}
              className="hover:text-[#1A3C24] transition-colors py-1"
            >
              Contact
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('user-login')}
              className="text-xs font-medium text-[#2E2C28] hover:text-[#1A3C24] transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate?.('user-register')}
              className="px-4 py-2 rounded-md bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-medium tracking-wider transition-all shadow-xs"
            >
              Register
            </button>
            {onBackToApp && (
              <button
                onClick={() => onBackToApp('home')}
                className="text-[11px] text-[#78756D] hover:text-[#151816] bg-[#EFECE6] hover:bg-[#E5E1D8] px-2.5 py-1 rounded transition-colors hidden lg:inline-block ml-2"
              >
                ← Về App
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EAE6DF] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate?.('user-login')}
          className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.16em] text-[#1A3C24] hover:opacity-80 transition-opacity"
          title="DRAPE - Luxury Menswear"
        >
          DRAPE
        </button>

        {/* Center: Editorial Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-wider text-[#4A4740]">
          <button
            onClick={() => onBackToApp?.('home')}
            className="hover:text-[#1A3C24] transition-colors py-1"
          >
            Collections
          </button>
          <button
            onClick={() => onBackToApp?.('dna-flow')}
            className="hover:text-[#1A3C24] transition-colors py-1"
          >
            Style DNA
          </button>
          <button
            onClick={() => onBackToApp?.('canvas')}
            className="hover:text-[#1A3C24] transition-colors py-1"
          >
            Consultant
          </button>
          <button
            onClick={() => onBackToApp?.('feed')}
            className="hover:text-[#1A3C24] transition-colors py-1"
          >
            Journal
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3">
          {activeScreen === 'user-otp' ? (
            <>
              <button
                onClick={() => onNavigate?.('user-login')}
                className="text-xs font-medium text-[#2E2C28] hover:text-[#1A3C24] px-3 py-1.5 transition-colors hidden sm:inline-block"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate?.('brand-auth')}
                className="px-4 py-2 rounded-md bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-medium tracking-wider transition-all shadow-xs"
              >
                Join Partner Program
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate?.(activeScreen === 'user-login' ? 'user-register' : 'user-login')}
              className="px-5 py-2 rounded-md border border-[#1A3C24] text-[#1A3C24] hover:bg-[#1A3C24] hover:text-white text-xs font-medium tracking-wider transition-all shadow-xs"
            >
              {activeScreen === 'user-register' ? 'Sign In' : 'Sign In'}
            </button>
          )}

          {onBackToApp && (
            <button
              onClick={() => onBackToApp('home')}
              className="text-[11px] text-[#78756D] hover:text-[#151816] bg-[#EFECE6] hover:bg-[#E5E1D8] px-2.5 py-1 rounded transition-colors hidden lg:inline-block ml-2"
              title="Về giao diện chính"
            >
              ← Về App
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
