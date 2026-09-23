import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, LayoutGrid, Briefcase, Check } from 'lucide-react';
import BrandAuthHeader from './BrandAuthHeader';
import BrandAuthFooter from './BrandAuthFooter';
import { loginAccount } from '../../lib/api';

export default function BrandLoginPage({
  onNavigate,
  onBackToApp,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginAccount({ email, password, accountType: 'brand' });
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({ email });
        } else if (onBackToApp) {
          onBackToApp('home');
        }
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <BrandAuthHeader
        activeScreen="brand-login"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Split Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Brand Statement & Highlights */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#636059] uppercase block mb-4 font-mono">
              BRAND PARTNER PORTAL
            </span>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A3C24] leading-[1.15] mb-6 tracking-tight">
              Elevate the Modern Standard.
            </h1>

            <p className="text-sm sm:text-[15px] text-[#55524B] leading-relaxed mb-10 max-w-xl">
              Join our exclusive ecosystem of luxury brands and sustainable fashion houses.
              Manage your collections, access AI-driven market DNA, and connect with the modern
              Vietnamese gentleman.
            </p>

            {/* 2 Feature Stat Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl">
              {/* Box 1 */}
              <div className="bg-white/80 border border-[#E7E3DC] rounded-xl p-5 hover:border-[#CFD9D1] transition-colors shadow-2xs">
                <div className="font-mono text-xs font-semibold text-[#1A3C24] tracking-wider mb-2">
                  01. CURATION
                </div>
                <p className="text-xs text-[#6A675F] leading-relaxed">
                  Advanced inventory mapping for targeted stylistic matching.
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-white/80 border border-[#E7E3DC] rounded-xl p-5 hover:border-[#CFD9D1] transition-colors shadow-2xs">
                <div className="font-mono text-xs font-semibold text-[#1A3C24] tracking-wider mb-2">
                  02. INSIGHTS
                </div>
                <p className="text-xs text-[#6A675F] leading-relaxed">
                  Real-time data on consumer preferences and seasonal trends.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl p-7 sm:p-10 border border-[#E7E3DC] shadow-xl w-full max-w-md">
              {/* Fast SSO Options */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('partner@workspace.luxury');
                    setPassword('drapeSecure2026!');
                  }}
                  className="w-full py-2.5 px-4 bg-[#FBFBFA] hover:bg-[#F3F0EA] border border-[#E2DDD3] rounded-lg text-xs font-medium text-[#2C2A26] flex items-center justify-center space-x-2.5 transition-colors"
                >
                  <LayoutGrid className="w-4 h-4 text-[#5A5750]" />
                  <span>Sign in with Workspace</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('director@vietnamtailors.vn');
                    setPassword('drapeSecure2026!');
                  }}
                  className="w-full py-2.5 px-4 bg-[#FBFBFA] hover:bg-[#F3F0EA] border border-[#E2DDD3] rounded-lg text-xs font-medium text-[#2C2A26] flex items-center justify-center space-x-2.5 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-[#0A66C2]" />
                  <span>LinkedIn Biz Connect</span>
                </button>
              </div>

              {/* Or Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#EAE6DF]"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 font-mono text-[10px] tracking-[0.2em] text-[#918D84] uppercase">
                    OR USE CREDENTIALS
                  </span>
                </div>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Corporate Email */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                    Corporate Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8C8880] font-mono">
                      @
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@brand.com"
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#9E9A91] transition-all"
                    />
                  </div>
                </div>

                {/* Secure Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider font-mono">
                      Secure Password
                    </label>
                    <button
                      type="button"
                      onClick={() => onNavigate?.('brand-forgot')}
                      className="text-xs text-[#1A3C24] hover:underline font-medium"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#9E9A91] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Station Checkbox */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#1A3C24] border-[#C8C2B7] rounded focus:ring-[#1A3C24] accent-[#1A3C24]"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs text-[#6A675F] cursor-pointer select-none"
                  >
                    Remember this station for 30 days
                  </label>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="w-full py-3 px-5 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-6"
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Authorized — Opening Portal...</span>
                    </>
                  ) : isLoading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Access DNA Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Inquire Link */}
              <div className="text-center mt-6 pt-5 border-t border-[#F0ECE5] text-xs text-[#6A675F]">
                <span>New luxury partner? </span>
                <button
                  type="button"
                  onClick={() => onNavigate?.('brand-register')}
                  className="font-semibold text-[#1A3C24] hover:underline"
                >
                  Inquire for Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BrandAuthFooter />
    </div>
  );
}
