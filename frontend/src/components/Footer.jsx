import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#EAE6DF] bg-[#FBFBFA] pt-12 pb-16 text-[#6A675F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#EFECE6]">
          {/* Info */}
          <div className="max-w-xs">
            <h4 className="font-serif-luxury text-xl font-bold tracking-widest text-[#151816] mb-2">
              DRAPE
            </h4>
            <p className="text-xs text-[#7A766E] leading-relaxed">
              Your AI-powered personal stylist for modern Vietnamese menswear.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#5E5B53]">
            <a href="#about" className="hover:text-[#1A3C24] transition-colors">
              About Us
            </a>
            <a href="#sustainability" className="hover:text-[#1A3C24] transition-colors">
              Sustainability
            </a>
            <a href="#privacy" className="hover:text-[#1A3C24] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#1A3C24] transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-[#1A3C24] transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-[#938F86] font-mono">
            © 2024 Drape AI Stylist. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
