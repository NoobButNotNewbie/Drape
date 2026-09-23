import React, { useState } from 'react';
import { Mail, Globe, ShieldCheck, Check, ArrowRight, ChevronDown } from 'lucide-react';
import BrandAuthHeader from './BrandAuthHeader';
import BrandAuthFooter from './BrandAuthFooter';
import { registerAccount } from '../../lib/api';

export default function BrandRegisterPage({
  onNavigate,
  onBackToApp,
  onRegisterSuccess,
}) {
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [aboutBrand, setAboutBrand] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản Đối tác của DRAPE để tiếp tục.');
      return;
    }
    setIsSubmitting(true);
    try {
      await registerAccount({
        email: businessEmail,
        password: `DrapePartner-${Date.now()}!`,
        fullName: brandName,
        accountType: 'brand',
        category,
        website,
        aboutBrand,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess({ brandName, businessEmail });
        } else {
          onNavigate?.('brand-login');
        }
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <BrandAuthHeader
        activeScreen="brand-register"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Split Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-14 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full">
          {/* Left Column: Visual Hero Banner with Dark Green Tint */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[460px] lg:min-h-[640px] flex flex-col justify-end p-8 sm:p-10 shadow-lg group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-left sm:bg-center"
              style={{
                backgroundImage: `url('/brand-auth/hero_retail.png')`,
                backgroundColor: '#163821',
              }}
            />

            {/* Dark green luxury overlay filter */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A10] via-[#153420]/80 to-[#193F26]/75" />

            {/* Content over hero image */}
            <div className="relative z-10 text-white">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.18] mb-4 tracking-tight">
                The Future of Luxury Retail
              </h2>

              <p className="text-xs sm:text-[13px] text-white/85 leading-relaxed mb-8 max-w-md">
                Partner with DRAPE to integrate your craftsmanship into the world's most sophisticated
                digital wardrobe ecosystem. Reach a global audience of discerning gentlemen through
                precision AI styling.
              </p>

              {/* Verified Badge */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 backdrop-blur-md text-[11px] font-mono tracking-wider text-emerald-100 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>JOIN 150+ HERITAGE & CONTEMPORARY HOUSES</span>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-white rounded-2xl p-6 sm:p-10 border border-[#E7E3DC] shadow-sm">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#636059] uppercase block mb-2 font-mono">
              BRAND PARTNERSHIP PORTAL
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#151816] mb-3 tracking-tight">
              Apply for the Collective
            </h1>

            <p className="text-xs sm:text-[13px] text-[#6A675F] leading-relaxed mb-8">
              Submit your brand details for consideration. Our curators review every application for
              aesthetic alignment and ethical standards.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Brand Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Maison Atelier"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#9E9A91] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                    Primary Category
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] transition-all pr-8"
                    >
                      <option value="">Select category</option>
                      <option value="tailoring">Tailoring & Bespoke Suiting</option>
                      <option value="linen-silk">Casual Linen & Silk Wear</option>
                      <option value="footwear">Footwear & Fine Leather Goods</option>
                      <option value="accessories">Jewelry, Eyewear & Accessories</option>
                      <option value="textiles">Heritage & Sustainable Textiles</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#7A766E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: Business Email */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  Business Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="partnerships@brand.com"
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#9E9A91] transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Website / Portfolio */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  Corporate Website / Digital Portfolio
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.brandname.com"
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#9E9A91] transition-all"
                  />
                </div>
              </div>

              {/* Row 4: About the Brand */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  About the Brand
                </label>
                <textarea
                  rows={4}
                  required
                  value={aboutBrand}
                  onChange={(e) => setAboutBrand(e.target.value)}
                  placeholder="Describe your brand's heritage, philosophy, and unique value proposition..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#9E9A91] transition-all resize-none"
                />
                <div className="text-right text-[10px] font-mono tracking-wider text-[#8A867E] mt-1 uppercase">
                  Maximum 500 words
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <div className="flex items-start space-x-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-[#1A3C24] border-[#C8C2B7] rounded focus:ring-[#1A3C24] accent-[#1A3C24]"
                />
                <label
                  htmlFor="agree-terms"
                  className="text-xs text-[#6A675F] cursor-pointer select-none leading-relaxed"
                >
                  I represent that I am authorized to act on behalf of this brand and agree to DRAPE's{' '}
                  <a
                    href="#terms"
                    onClick={(e) => e.preventDefault()}
                    className="text-[#1A3C24] underline underline-offset-2 font-medium"
                  >
                    Partner Terms
                  </a>
                  .
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-widest uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-4"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Application Submitted Successfully!</span>
                  </>
                ) : isSubmitting ? (
                  <span>Submitting Dossier...</span>
                ) : (
                  <span>Apply for Partnership</span>
                )}
              </button>
            </form>

            {/* Bottom Link to Login */}
            <div className="text-center mt-6 pt-4 border-t border-[#F0ECE5] text-xs text-[#6A675F]">
              <span>Already a partner? </span>
              <button
                type="button"
                onClick={() => onNavigate?.('brand-login')}
                className="font-semibold text-[#1A3C24] hover:underline"
              >
                Access Brand Portal
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BrandAuthFooter />
    </div>
  );
}
