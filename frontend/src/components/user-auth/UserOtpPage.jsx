import React, { useState, useRef, useEffect } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import UserAuthHeader from './UserAuthHeader';
import UserAuthFooter from './UserAuthFooter';

export default function UserOtpPage({
  onNavigate,
  onBackToApp,
  onVerifySuccess,
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
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
    setCountdown(60);
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
          onNavigate?.('user-reset');
        }
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <UserAuthHeader
        activeScreen="user-otp"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
        {/* Stepper (EMAIL -> 02 VERIFY -> 03 FINISH) */}
        <div className="flex items-center justify-center space-x-3 mb-12 w-full max-w-sm">
          {/* Step 1: EMAIL */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#E2ECE5] text-[#1A3C24] flex items-center justify-center text-xs border border-[#1A3C24]">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#1A3C24] font-semibold mt-2 uppercase">
              EMAIL
            </span>
          </div>

          {/* Line 1 */}
          <div className="flex-1 h-[1px] bg-[#1A3C24] -mt-5" />

          {/* Step 2: 02 VERIFY */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#1A3C24] text-white flex items-center justify-center text-[11px] font-semibold">
              02
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#1A3C24] font-semibold mt-2 uppercase">
              VERIFY
            </span>
          </div>

          {/* Line 2 */}
          <div className="flex-1 h-[1px] bg-[#D8D3C8] -mt-5" />

          {/* Step 3: 03 FINISH */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border border-[#D8D3C8] text-[#9A968D] bg-white flex items-center justify-center text-[11px] font-medium">
              03
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#9A968D] font-medium mt-2 uppercase">
              FINISH
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E7E3DC] shadow-lg w-full max-w-md text-center">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#151816] mb-3">
            Mã xác thực
          </h1>

          <p className="text-xs text-[#6A675F] leading-relaxed mb-8 max-w-xs mx-auto">
            Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến email của bạn. Vui lòng kiểm tra hộp thư
            đến.
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

            {/* Submit Button */}
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
                <span>Xác nhận mã</span>
              )}
            </button>
          </form>

          {/* Resend & Return to Login Links */}
          <div className="mt-6 space-y-3">
            <div>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`text-xs font-medium transition-colors ${
                  canResend
                    ? 'text-[#1A3C24] hover:underline cursor-pointer'
                    : 'text-[#8C8880] cursor-default'
                }`}
              >
                {canResend ? 'Gửi lại mã ngay' : `Gửi lại mã (${countdown}s)`}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate?.('user-login')}
                className="text-xs text-[#6A675F] hover:text-[#1A3C24] transition-colors inline-flex items-center space-x-1"
              >
                <span>← Trở lại trang đăng nhập</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <UserAuthFooter isSimple={true} />
    </div>
  );
}
