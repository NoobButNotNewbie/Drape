import React, { useState } from 'react';
import { Bell, Compass, Wand2, Shirt, User, Check } from 'lucide-react';

export default function MobileBrandForgotPasswordPage({
  onNavigate,
  onBackToApp,
  onSendCodeSuccess,
}) {
  const [email, setEmail] = useState('name@brandhouse.com');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        if (onSendCodeSuccess) {
          onSendCodeSuccess(email);
        } else {
          onNavigate?.('brand-otp');
        }
      }, 1000);
    }, 700);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Top Header with Avatar */}
      <header className="px-5 py-4 border-b border-[#EAE6DF] flex items-center justify-between bg-white/70 backdrop-blur-xs">
        <button
          onClick={() => onBackToApp?.('home')}
          className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]"
        >
          DRAPE
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="p-1.5 text-[#555] hover:text-[#1A3C24] transition-colors relative"
          >
            <Bell className="w-5 h-5 stroke-[1.5]" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D5D0C6]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="Manager Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-8 flex-1 flex flex-col justify-center">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A3C24] mb-2 tracking-tight">
            Reset Brand Access
          </h1>
          <p className="text-xs text-[#6A675F] leading-relaxed max-w-xs mx-auto">
            Regain access to your luxury consultancy dashboard. Enter your verified business credentials
            below.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E3DC] shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#6A675F] uppercase mb-2">
                REGISTERED BUSINESS EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@brandhouse.com"
                  className="w-full pl-3.5 pr-9 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm text-[#8C8880]">
                  @
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending || isSent}
              className="w-full py-3.5 px-4 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
            >
              {isSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Reset Link Sent!</span>
                </>
              ) : isSending ? (
                <span>Generating Access Token...</span>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => onNavigate?.('brand-login')}
                className="text-xs text-[#52504A] hover:text-[#1A3C24] transition-colors inline-block"
              >
                ← Back to login
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (as seen in quenmk.png screenshot!) */}
      <nav className="border-t border-[#EAE6DF] bg-white/95 px-6 py-2.5 flex items-center justify-between text-[11px] text-[#7A766E]">
        <button
          onClick={() => onBackToApp?.('feed')}
          className="flex flex-col items-center space-y-1 hover:text-[#1A3C24] transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span>Feed</span>
        </button>

        <button
          onClick={() => onBackToApp?.('canvas')}
          className="flex flex-col items-center space-y-1 hover:text-[#1A3C24] transition-colors"
        >
          <Wand2 className="w-4 h-4" />
          <span>Mix</span>
        </button>

        <button
          onClick={() => onBackToApp?.('wardrobe')}
          className="flex flex-col items-center space-y-1 hover:text-[#1A3C24] transition-colors"
        >
          <Shirt className="w-4 h-4" />
          <span>Wardrobe</span>
        </button>

        <button
          onClick={() => onNavigate?.('brand-login')}
          className="flex flex-col items-center space-y-1 text-[#1A3C24] font-semibold"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
