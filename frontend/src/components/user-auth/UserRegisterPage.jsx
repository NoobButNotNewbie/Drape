import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, Eye, EyeOff, Check } from 'lucide-react';
import UserAuthHeader from './UserAuthHeader';
import UserAuthFooter from './UserAuthFooter';
import { signInWithProvider, signUpWithEmail } from '../../lib/auth';
import { isGmailAddress } from '../../lib/accountEmail';

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
    const fullNameValue = fullName.trim();
    const email = emailOrPhone.trim();
    if (fullNameValue.length < 2) {
      alert('Vui lòng nhập họ tên hợp lệ.');
      return;
    }
    if (!isGmailAddress(email)) {
      alert('Vui lòng nhập đúng địa chỉ Gmail, ví dụ name@gmail.com.');
      return;
    }
    if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
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
      const { user, session } = await signUpWithEmail({ email, password, fullName: fullNameValue });
      if (!user?.id) throw new Error('Không tạo được tài khoản. Vui lòng thử lại.');
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess({ fullName: fullNameValue, email, session, user });
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

          {/* Facebook registration */}
          <div>
            <button
              type="button"
              onClick={() => signInWithProvider('facebook').catch((error) => alert(error.message))}
              className="py-2.5 px-3 bg-[#FBFBFA] hover:bg-[#F3EFE7] border border-[#E2DDD3] rounded-md text-xs font-medium text-[#2C2A26] flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.02 4.388 11.017 10.125 11.927v-8.432H7.078v-3.495h3.047V9.411c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.515c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.495h-2.796V24C19.612 23.09 24 18.093 24 12.073z"/>
              </svg>
              <span>Đăng ký bằng Facebook</span>
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
