import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import BrandAuthHeader from './BrandAuthHeader';
import BrandAuthFooter from './BrandAuthFooter';

export default function BrandOtpPage({
  onNavigate,
  onBackToApp,
  onVerifySuccess,
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(58);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer for OTP resend
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
    // Only allow single digit or empty
    const sanitized = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = sanitized;
    setOtp(newOtp);

    // Auto move to next input
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
    setCountdown(59);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      alert('Vui lòng nhập đủ 6 chữ số mã xác nhận OTP.');
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
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <BrandAuthHeader
        activeScreen="brand-otp"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
        {/* Vietnamese Stepper (Thông tin -> Xác thực -> Hoàn tất) */}
        <div className="flex items-center justify-center space-x-3 mb-12 w-full max-w-sm">
          {/* Step 1: Thông tin (Completed with checkmark) */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#1A3C24] text-white flex items-center justify-center text-xs">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-medium text-[#1A3C24] mt-2">
              Thông tin
            </span>
          </div>

          {/* Connecting Line 1 */}
          <div className="flex-1 h-[1px] bg-[#1A3C24] -mt-5" />

          {/* Step 2: Xác thực (Active with ring) */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border border-[#1A3C24] text-[#1A3C24] bg-white flex items-center justify-center text-xs font-semibold">
              2
            </div>
            <span className="text-[11px] font-semibold text-[#1A3C24] mt-2">
              Xác thực
            </span>
          </div>

          {/* Connecting Line 2 */}
          <div className="flex-1 h-[1px] bg-[#D8D3C8] -mt-5" />

          {/* Step 3: Hoàn tất (Pending) */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border border-[#D8D3C8] text-[#9A968D] bg-white flex items-center justify-center text-xs font-medium">
              3
            </div>
            <span className="text-[11px] font-medium text-[#9A968D] mt-2">
              Hoàn tất
            </span>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E7E3DC] shadow-lg w-full max-w-md text-center">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#151816] mb-3">
            Xác thực mã OTP
          </h1>

          <p className="text-xs text-[#6A675F] leading-relaxed mb-8 max-w-xs mx-auto">
            Chúng tôi vừa gửi mã xác nhận 6 chữ số đến email của bạn. Vui lòng kiểm tra và nhập mã bên
            dưới.
          </p>

          <form onSubmit={handleSubmit}>
            {/* 6 OTP Inputs */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8" onPaste={handlePaste}>
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
                  className="w-10 h-12 sm:w-12 sm:h-14 border border-[#D9D3C7] rounded-md text-center text-lg sm:text-xl font-semibold text-[#151816] bg-white outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs"
                />
              ))}
            </div>

            {/* Verification Button */}
            <button
              type="submit"
              disabled={isVerifying || isVerified}
              className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-widest uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
            >
              {isVerified ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>XÁC THỰC THÀNH CÔNG!</span>
                </>
              ) : isVerifying ? (
                <span>ĐANG KIỂM TRA MÃ...</span>
              ) : (
                <span>XÁC NHẬN MÃ</span>
              )}
            </button>
          </form>

          {/* Resend Link & Timer */}
          <div className="mt-8 text-xs text-[#6A675F]">
            <span>Không nhận được mã? </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`font-semibold transition-colors ${
                canResend
                  ? 'text-[#1A3C24] hover:underline cursor-pointer'
                  : 'text-[#1A3C24] cursor-default'
              }`}
            >
              {canResend ? 'Gửi lại mã ngay' : `Gửi lại mã (${countdown}s)`}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BrandAuthFooter isSimple={true} />
    </div>
  );
}
