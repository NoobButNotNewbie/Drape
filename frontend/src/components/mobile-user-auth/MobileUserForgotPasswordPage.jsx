import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Lock } from 'lucide-react';

export default function MobileUserForgotPasswordPage({
  onNavigateToLogin,
  onSendCodeSuccess,
}) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      alert('Vui lòng nhập Email hoặc Số điện thoại');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSendCodeSuccess) {
        onSendCodeSuccess(emailOrPhone);
      }
    }, 700);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6 relative overflow-hidden">
      {/* Background Watermark "DRAPE" */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none select-none z-0 opacity-[0.035]">
        <span className="font-serif-luxury text-[130px] font-extrabold tracking-widest text-[#1A3C24]">
          DRAPE
        </span>
      </div>

      <div className="relative z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]/60 relative">
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="flex items-center text-[#2C3E30] hover:text-[#1A3C24] transition-colors p-1 -ml-1 z-10"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>

          <div className="absolute inset-x-0 text-center pointer-events-none">
            <h1 className="font-serif-luxury text-xl font-bold text-[#1A3C24]">
              Quên mật khẩu
            </h1>
          </div>

          <div className="w-8"></div>
        </div>

        {/* Centered Icon Badge */}
        <div className="flex justify-center mt-10 mb-8">
          <div className="w-24 h-24 rounded-2xl bg-[#E8F0EA] flex items-center justify-center relative shadow-2xs border border-[#DCE8DE]">
            <div className="relative">
              <RotateCcw className="w-10 h-10 text-[#1A3C24] stroke-[1.8]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#1A3C24] stroke-[2.2]" />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center px-4 mb-8">
          <p className="text-xs text-[#2C3E30] leading-relaxed">
            Vui lòng nhập <span className="font-bold text-[#1A3C24]">Email</span> hoặc{' '}
            <span className="font-bold text-[#1A3C24]">Số điện thoại</span> bạn đã dùng để đăng ký tài khoản.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="px-1">
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#737C75] font-semibold mb-2">
              EMAIL / SỐ ĐIỆN THOẠI
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full bg-transparent border-b border-[#D5D0C7] focus:border-[#1A3C24] py-2.5 text-sm text-[#151816] placeholder-[#A8A49D] focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A3C24] hover:bg-[#122B1A] text-white font-medium py-3.5 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Gửi mã xác thực</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="font-serif-luxury text-sm font-semibold text-[#1A3C24] underline underline-offset-4 hover:text-[#122B1A] transition-colors"
          >
            Quay lại trang Đăng nhập
          </button>
        </div>
      </div>

      {/* Footer support text */}
      <div className="relative z-10 pt-10 pb-2 text-center text-xs text-[#737C75]">
        Gặp khó khăn?{' '}
        <a
          href="#support"
          onClick={(e) => {
            e.preventDefault();
            alert('DRAPE Concierge: Hotline 1900 8888 hoặc hỗ trợ viên trực tuyến đang sẵn sàng.');
          }}
          className="text-[#1A3C24] underline hover:text-[#122B1A]"
        >
          Liên hệ tư vấn viên
        </a>
      </div>
    </div>
  );
}
