import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function MobileUserLoginPage({
  onNavigateToRegister,
  onNavigateToForgot,
  onNavigateToPortalSelect,
  onLoginSuccess,
}) {
  const [emailOrPhone, setEmailOrPhone] = useState('khachhang@drape.vn');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      alert('Vui lòng nhập Email hoặc Số điện thoại');
      return;
    }
    if (!password.trim()) {
      alert('Vui lòng nhập Mật khẩu');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({ email: emailOrPhone });
      }
    }, 800);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({ email: `user.${provider.toLowerCase()}@drape.vn` });
      }
    }, 700);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      <div>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]/60 relative">
          <button
            type="button"
            onClick={onNavigateToPortalSelect}
            className="flex items-center space-x-1 text-xs text-[#5F6D63] hover:text-[#1A3C24] transition-colors py-1 z-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Quay lại</span>
          </button>

          <div className="absolute inset-x-0 text-center pointer-events-none">
            <span className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]">
              DRAPE
            </span>
          </div>

          <div className="w-12"></div>
        </div>

        {/* Heading & Subtitle */}
        <div className="mt-8 mb-6">
          <h1 className="font-serif-luxury text-[26px] font-bold text-[#1A3C24] leading-snug">
            Chào mừng bạn trở lại với DrapeVN
          </h1>
          <p className="text-xs text-[#5F6D63] mt-2 leading-relaxed">
            Hãy để chuyên gia ảo của chúng tôi hoàn thiện phong cách của bạn.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Phone Input */}
          <div>
            <label className="block text-xs font-medium text-[#2C3E30] mb-1.5">
              Email hoặc Số điện thoại
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full bg-white border border-[#E7E3DC] rounded-xl px-4 py-3 text-xs text-[#151816] placeholder-[#A09D96] focus:outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-[#2C3E30]">
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={onNavigateToForgot}
                className="text-[11px] text-[#1A3C24] hover:underline font-medium"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#E7E3DC] rounded-xl px-4 py-3 pr-11 text-xs text-[#151816] placeholder-[#A09D96] focus:outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C887E] hover:text-[#1A3C24] p-1 transition-colors"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#1A3C24] hover:bg-[#122B1A] text-white font-medium py-3.5 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Đăng nhập</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E7E3DC]"></div>
          </div>
          <span className="relative bg-[#FBFBFA] px-3 font-mono text-[10px] tracking-[0.2em] text-[#8C887E] uppercase">
            HOẶC
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full bg-white border border-[#E7E3DC] hover:border-[#1A3C24] text-[#151816] font-medium py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-3 shadow-2xs hover:shadow-xs active:scale-[0.99]"
          >
            {/* Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Đăng nhập bằng Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full bg-white border border-[#E7E3DC] hover:border-[#1A3C24] text-[#151816] font-medium py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-3 shadow-2xs hover:shadow-xs active:scale-[0.99]"
          >
            {/* Facebook Icon */}
            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Đăng nhập bằng Facebook</span>
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-8 text-center text-xs text-[#5F6D63]">
        Chưa có tài khoản?{' '}
        <button
          type="button"
          onClick={onNavigateToRegister}
          className="text-[#1A3C24] font-bold hover:underline"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}
