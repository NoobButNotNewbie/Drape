import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, Eye, EyeOff, Check } from 'lucide-react';
import UserAuthHeader from './UserAuthHeader';
import UserAuthFooter from './UserAuthFooter';
import { registerAccount } from '../../lib/api';

export default function UserRegisterPage({
  onNavigate,
  onBackToApp,
  onRegisterSuccess,
}) {
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật để tiếp tục.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerAccount({ email: emailOrPhone, password, fullName });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess({ fullName, email: emailOrPhone });
        } else {
          onNavigate?.('user-login');
        }
      }, 1200);
    } catch (error) {
      setIsSubmitting(false);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <UserAuthHeader
        activeScreen="user-register"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl p-8 sm:p-11 border border-[#E7E3DC] shadow-lg w-full max-w-lg">
          {/* Header Title */}
          <div className="text-center mb-8">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#151816] mb-2 tracking-tight">
              Begin Your Evolution
            </h1>
            <p className="text-xs text-[#6A675F] max-w-sm mx-auto leading-relaxed">
              A curated digital wardrobe awaits. Enter your details to create your Style DNA profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                FULL NAME
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C8880] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyen Van An"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
                />
              </div>
            </div>

            {/* Email or Phone */}
            <div>
              <label className="block text-[10px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                EMAIL OR PHONE
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C8880] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="an.nguyen@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
                />
              </div>
            </div>

            {/* Password & Confirm Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  CONFIRM
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] placeholder:text-[#A4A096] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816]"
                  >
                    {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2.5 pt-1">
              <input
                type="checkbox"
                id="user-agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 text-[#1A3C24] border-[#C8C2B7] rounded focus:ring-[#1A3C24] accent-[#1A3C24]"
              />
              <label
                htmlFor="user-agree-terms"
                className="text-xs text-[#6A675F] cursor-pointer select-none leading-relaxed"
              >
                I agree to the{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#1A3C24] underline underline-offset-2">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#1A3C24] underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-4"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Profile Created!</span>
                </>
              ) : isSubmitting ? (
                <span>Assembling Style DNA...</span>
              ) : (
                <span>Create My Style Profile</span>
              )}
            </button>
          </form>

          {/* Social Sign Up Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EAE6DF]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 font-mono text-[10px] tracking-[0.2em] text-[#9A968D] uppercase">
                OR JOIN WITH
              </span>
            </div>
          </div>

          {/* Google / Apple Row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setFullName('Lê Minh Triết');
                setEmailOrPhone('triet.le@gmail.com');
              }}
              className="py-2.5 px-3 bg-[#FBFBFA] hover:bg-[#F3EFE7] border border-[#E2DDD3] rounded-md text-xs font-medium text-[#2C2A26] flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFullName('Trần Bảo Nam');
                setEmailOrPhone('nam.tran@icloud.com');
              }}
              className="py-2.5 px-3 bg-[#FBFBFA] hover:bg-[#F3EFE7] border border-[#E2DDD3] rounded-md text-xs font-medium text-[#2C2A26] flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.8 1.1-1.92.98-3.04-.95.04-2.11.64-2.79 1.44-.6.69-1.12 1.83-.98 2.93 1.06.08 2.14-.53 2.79-1.33z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-7 pt-4 border-t border-[#F0ECE5] text-xs text-[#6A675F]">
            <span>Already have a profile? </span>
            <button
              type="button"
              onClick={() => onNavigate?.('user-login')}
              className="font-semibold text-[#1A3C24] hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <UserAuthFooter />
    </div>
  );
}
