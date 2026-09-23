import React from 'react';

export default function BrandAuthFooter({ isSimple = false }) {
  return (
    <footer className="w-full border-t border-[#EAE6DF] bg-[#FBFBFA] mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#706D65]">
        {/* Left: Brand Name */}
        <div className="font-serif-luxury font-bold text-sm tracking-widest text-[#151816]">
          DRAPE
        </div>

        {/* Center: Legal & Support Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-medium">
          <a
            href="#privacy"
            onClick={(e) => e.preventDefault()}
            className="hover:text-[#1A3C24] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => e.preventDefault()}
            className="hover:text-[#1A3C24] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#support"
            onClick={(e) => e.preventDefault()}
            className="hover:text-[#1A3C24] transition-colors"
          >
            Contact Support
          </a>
          <a
            href="#press"
            onClick={(e) => e.preventDefault()}
            className="hover:text-[#1A3C24] transition-colors"
          >
            Press Kit
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="tracking-wider text-[#8A867E]">
          {isSimple
            ? '© 2024 DRAPE Styling Platform. All rights reserved.'
            : '© 2024 DRAPE. THE MODERN STANDARD.'}
        </div>
      </div>
    </footer>
  );
}
