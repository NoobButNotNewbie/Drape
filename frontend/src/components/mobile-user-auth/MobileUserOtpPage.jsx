import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

export default function MobileUserOtpPage({
  userEmail = 'u***@example.com',
  onNavigateBack,
  onVerifySuccess,
  onToast,
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(53);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input box on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto forward
    if (digit && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      alert('Vui lòng nhập đầy đủ 6 chữ số mã xác thực');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onVerifySuccess) {
        onVerifySuccess();
      }
    }, 800);
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
      if (onToast) onToast(`Mã xác thực mới đã được gửi lại tới ${userEmail}`);
    }
  };

  // Mask display email if needed
  const displayEmail = userEmail.includes('@')
    ? userEmail.replace(/(.{1})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + '***')
    : userEmail;

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6 relative">
      <div>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]/60 relative">
          <button
            type="button"
            onClick={onNavigateBack}
            className="flex items-center text-[#2C3E30] hover:text-[#1A3C24] transition-colors p-1 -ml-1 z-10"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>

          <div className="absolute inset-x-0 text-center pointer-events-none">
            <span className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]">
              DRAPE
            </span>
          </div>

          <div className="w-8"></div>
        </div>

        {/* Title & Instructions */}
        <div className="mt-10 mb-8 text-center px-2">
          <h1 className="font-serif-luxury text-[26px] font-bold text-[#1A3C24] leading-snug">
            Nhập mã xác thực
          </h1>
          <p className="text-xs text-[#5F6D63] mt-2.5 leading-relaxed">
            Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến{' '}
            <span className="font-semibold text-[#1A3C24]">{displayEmail}</span>.
          </p>
        </div>

        {/* 6-digit OTP Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center gap-2 max-w-sm mx-auto">
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
                onPaste={handlePaste}
                className="w-11 h-14 sm:w-12 sm:h-16 text-center text-lg font-semibold font-mono bg-white border border-[#D5D0C7] rounded-xl focus:outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs"
              />
            ))}
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A3C24] hover:bg-[#122B1A] text-white font-medium py-3.5 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Xác nhận</span>
            )}
          </button>
        </form>

        {/* Resend Code Section */}
        <div className="mt-6 text-center text-xs text-[#5F6D63]">
          Bạn chưa nhận được mã?{' '}
          {countdown > 0 ? (
            <span className="text-[#1A3C24] font-medium">Gửi lại mã ({countdown}s)</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#1A3C24] font-bold underline hover:text-[#122B1A]"
            >
              Gửi lại ngay
            </button>
          )}
        </div>
      </div>

      {/* Decorative Shield Watermark at Bottom */}
      <div className="flex justify-center pb-8 pt-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#CFD8D1]/70">
          <Shield className="w-14 h-14 stroke-[1.2]" />
        </div>
      </div>
    </div>
  );
}
