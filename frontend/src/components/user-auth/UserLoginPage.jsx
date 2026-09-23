import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import UserAuthHeader from './UserAuthHeader';
import UserAuthFooter from './UserAuthFooter';
import { signInWithEmail, signInWithProvider } from '../../lib/auth';

export default function UserLoginPage({
  onNavigate,
  onBackToApp,
  onLoginSuccess,
}) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailOrPhone.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Vui lòng nhập email hợp lệ.');
      return;
    }
    if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    setIsLoading(true);
    try {
      const { user } = await signInWithEmail({ email, password });
      if (!user?.id) throw new Error('Không xác nhận được tài khoản. Vui lòng thử lại.');
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({ email: user.email || email, user });
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
      <UserAuthHeader
        activeScreen="user-login"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Content: Center Card Layout */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl p-8 sm:p-11 border border-[#E7E3DC] shadow-lg w-full max-w-md">
          {/* Title Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#1A3C24] mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-[#6A675F]">
              Step back into your digital wardrobe.
            </p>
          </div>

          {/* Email login */}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Phone */}
            <div>
              <label className="block text-[10px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                EMAIL OR PHONE
              </label>
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="e.g. name@style.com"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-semibold text-[#4A4740] uppercase tracking-wider font-mono">
                  PASSWORD
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right mt-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate?.('user-forgot')}
                  className="text-[11px] text-[#55524A] hover:text-[#1A3C24] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-6"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Verified — Loading Style DNA...</span>
                </>
              ) : isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <span>Access My DNA</span>
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#EAE6DF]"></div></div>
            <span className="relative bg-white px-3 font-mono text-[10px] tracking-[0.2em] text-[#9A968D] uppercase">OR CONTINUE WITH</span>
          </div>

          {/* Facebook login */}
          <button
            type="button"
            onClick={() => signInWithProvider('facebook').catch((error) => alert(error.message))}
            className="w-full py-2.5 px-4 bg-[#FBFBFA] hover:bg-[#F3EFE7] border border-[#E2DDD3] rounded-md text-xs font-medium text-[#2C2A26] flex items-center justify-center space-x-2.5 transition-colors"
          >
            <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Đăng nhập bằng Facebook</span>
          </button>

          {/* Footer switch to Register */}
          <div className="text-center mt-7 pt-5 border-t border-[#F0ECE5] text-xs text-[#6A675F]">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => onNavigate?.('user-register')}
              className="font-semibold text-[#1A3C24] hover:underline"
            >
              Create Style DNA
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <UserAuthFooter />
    </div>
  );
}
