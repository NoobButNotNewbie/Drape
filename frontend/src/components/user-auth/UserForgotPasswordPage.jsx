import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, Check } from 'lucide-react';
import UserAuthHeader from './UserAuthHeader';
import UserAuthFooter from './UserAuthFooter';

export default function UserForgotPasswordPage({
  onNavigate,
  onBackToApp,
  onSendCodeSuccess,
}) {
  const [email, setEmail] = useState('arthur.morgan@example.com');
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
          onNavigate?.('user-otp');
        }
      }, 1000);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <UserAuthHeader
        activeScreen="user-forgot"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
        {/* Step Indicator (EMAIL -> VERIFY -> RESET) */}
        <div className="flex items-center justify-center space-x-3 mb-10 w-full max-w-xs">
          {/* Step 1: EMAIL */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#1A3C24] ring-4 ring-[#E2ECE5]" />
            <span className="font-mono text-[9px] tracking-widest text-[#1A3C24] font-semibold mt-2 uppercase">
              EMAIL
            </span>
          </div>

          {/* Line 1 */}
          <div className="flex-1 h-[1px] bg-[#D8D3C8] -mt-5" />

          {/* Step 2: VERIFY */}
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D5D0C6]" />
            <span className="font-mono text-[9px] tracking-widest text-[#9A968D] font-medium mt-2 uppercase">
              VERIFY
            </span>
          </div>

          {/* Line 2 */}
          <div className="flex-1 h-[1px] bg-[#D8D3C8] -mt-5" />

          {/* Step 3: RESET */}
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D5D0C6]" />
            <span className="font-mono text-[9px] tracking-widest text-[#9A968D] font-medium mt-2 uppercase">
              RESET
            </span>
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#151816] mb-2 tracking-tight">
            Recovery Journey
          </h1>
          <p className="text-xs sm:text-[13px] text-[#6A675F]">
            A sophisticated approach to securing your account.
          </p>
        </div>

        {/* Reset Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E7E3DC] shadow-lg w-full max-w-md">
          <div className="mb-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#868278] uppercase block mb-1 font-semibold">
              IDENTIFICATION
            </span>
            <p className="text-xs text-[#52504A] leading-relaxed">
              Enter the email associated with your DRAPE account to receive a verification code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arthur.morgan@example.com"
                  className="w-full pr-10 pl-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] transition-all"
                />
                <Mail className="w-4 h-4 text-[#8C8880] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending || isSent}
              className="w-full py-3 px-5 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
            >
              {isSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Verification Code Dispatched</span>
                </>
              ) : isSending ? (
                <span>Generating Token...</span>
              ) : (
                <span>Send Reset Code</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate?.('user-login')}
                className="text-xs text-[#6A675F] hover:text-[#1A3C24] transition-colors inline-block"
              >
                Return to login portal
              </button>
            </div>
          </form>
        </div>

        {/* Security Seals */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8 text-[10px] font-mono tracking-[0.2em] text-[#868278] uppercase">
          <div className="flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-[#6E6A62]" />
            <span>END-TO-END ENCRYPTION</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6E6A62]" />
            <span>TWO-FACTOR READY</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <UserAuthFooter />
    </div>
  );
}
