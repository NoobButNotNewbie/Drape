import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Shield, Lock, Check } from 'lucide-react';

export default function MobileBrandOtpPage({
  onNavigate,
  onBackToApp,
  onVerifySuccess,
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    const sanitized = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = sanitized;
    setOtp(newOtp);

    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      const nextFocus = Math.min(pastedData.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(45);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      alert('Vui lòng nhập đầy đủ 6 chữ số mã xác thực.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        if (onVerifySuccess) {
          onVerifySuccess(code);
        } else {
          onNavigate?.('brand-reset');
        }
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-6">
        <button
          onClick={() => onBackToApp?.('home')}
          className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]"
        >
          DRAPE
        </button>

        <div className="flex items-center space-x-1.5 font-mono text-[10px] tracking-wider text-[#35332F] uppercase">
          <ShieldCheck className="w-4 h-4 text-[#1A3C24]" />
          <span>SECURE PORTAL</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4 flex-1 flex flex-col items-center justify-center text-center">
        {/* Shield Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-[#E8F2EB] text-[#1A3C24] flex items-center justify-center mb-6 shadow-2xs">
          <Shield className="w-6 h-6 stroke-[2.2] fill-[#1A3C24]" />
        </div>

        {/* Title */}
        <h1 className="font-serif-luxury text-3xl font-medium text-[#1A3C24] mb-2 tracking-tight">
          Identity Verification
        </h1>
        <p className="text-xs text-[#6A675F] leading-relaxed max-w-xs mb-8">
          Verification code sent to your business email
        </p>

        {/* 6 OTP Inputs */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex justify-center items-center gap-2 mb-6" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-14 border border-[#D5D0C6] rounded-md text-center text-xl font-bold text-[#151816] bg-white outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs"
              />
            ))}
          </div>

          {/* Resend Link */}
          <div className="text-xs text-[#6A675F] mb-8">
            <span>Didn't receive code? </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`font-bold transition-colors ${
                canResend
                  ? 'text-[#1A3C24] hover:underline cursor-pointer'
                  : 'text-[#1A3C24] cursor-default'
              }`}
            >
              {canResend ? 'Resend now' : `Resend (${countdown}s)`}
            </button>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={isVerifying || isVerified}
            className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
          >
            {isVerified ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>VERIFIED</span>
              </>
            ) : isVerifying ? (
              <span>VERIFYING CODE...</span>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </form>
      </main>

      {/* Footer Seal */}
      <footer className="text-center pt-6">
        <div className="inline-flex items-center space-x-2 font-mono text-[9px] tracking-[0.2em] text-[#868278] uppercase">
          <Lock className="w-3 h-3 text-[#6E6A62]" />
          <span>END-TO-END ENCRYPTED SESSION</span>
        </div>
      </footer>
    </div>
  );
}
