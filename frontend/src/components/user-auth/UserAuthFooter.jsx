import React from 'react';

export default function UserAuthFooter({ isColumnsVariant = false, isSimple = false }) {
  if (isColumnsVariant) {
    return (
      <footer className="w-full border-t border-[#EAE6DF] bg-[#FBFBFA] mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#6A675F]">
          {/* Column 1: Brand */}
          <div>
            <div className="font-serif-luxury font-bold text-lg tracking-widest text-[#1A3C24] mb-3">
              DRAPE
            </div>
            <p className="text-[11px] leading-relaxed text-[#858177] max-w-xs">
              © 2024 DRAPE. Sophisticated precision for the modern man.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="font-semibold text-[#1A3C24] uppercase tracking-wider text-[11px] mb-3">
              Dịch vụ
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#about" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#guide" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24] transition-colors">
                  Style Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <div className="font-semibold text-[#1A3C24] uppercase tracking-wider text-[11px] mb-3">
              Pháp lý
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <div className="font-semibold text-[#1A3C24] uppercase tracking-wider text-[11px] mb-3">
              Mạng xã hội
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#instagram" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#linkedin" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24] transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-[#EAE6DF] bg-[#FBFBFA] mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#706D65]">
        {/* Left: Brand Name */}
        <div className="font-serif-luxury font-bold text-sm tracking-widest text-[#1A3C24]">
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
            href="#partner"
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
