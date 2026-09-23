import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, ShieldCheck, CheckCircle2, Circle } from 'lucide-react';

export default function MobileUserResetPasswordPage({
  onNavigateBack,
  onResetSuccess,
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Criteria calculations
  const hasMinLength = newPassword.length >= 8;
  const hasLetterAndNumber = /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword);

  let strengthLabel = 'YẾU';
  let strengthColor = 'text-amber-600';
  let strengthBarWidth = 'w-1/4 bg-amber-500';

  if (hasMinLength && hasLetterAndNumber) {
    if (newPassword.length >= 10 && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      strengthLabel = 'MẠNH';
      strengthColor = 'text-emerald-700';
      strengthBarWidth = 'w-full bg-emerald-600';
    } else {
      strengthLabel = 'TRUNG BÌNH';
      strengthColor = 'text-emerald-600';
      strengthBarWidth = 'w-2/3 bg-emerald-500';
    }
  } else if (newPassword.length > 0) {
    strengthLabel = 'YẾU';
    strengthColor = 'text-amber-600';
    strengthBarWidth = 'w-1/4 bg-amber-500';
  } else {
    strengthLabel = 'CHƯA NHẬP';
    strengthColor = 'text-gray-400';
    strengthBarWidth = 'w-0';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasMinLength) {
      alert('Mật khẩu mới phải có tối thiểu 8 ký tự');
      return;
    }
    if (!hasLetterAndNumber) {
      alert('Mật khẩu phải bao gồm cả chữ cái và chữ số');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onResetSuccess) {
        onResetSuccess();
      }
    }, 800);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      <div>
        {/* Top Header Bar */}
        <div className="flex items-center pb-4 border-b border-[#EAE6DF]/60">
          <button
            type="button"
            onClick={onNavigateBack}
            className="flex items-center text-[#2C3E30] hover:text-[#1A3C24] transition-colors p-1 -ml-1"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Heading & Subtitle */}
        <div className="mt-6 mb-6">
          <h1 className="font-serif-luxury text-[26px] font-bold text-[#1A3C24] leading-snug">
            Thiết lập mật khẩu mới
          </h1>
          <p className="text-xs text-[#5F6D63] mt-2 leading-relaxed">
            Tạo mật khẩu mạnh mẽ để bảo vệ tài khoản cá nhân và các tư vấn phong cách của bạn.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#737C75] font-semibold mb-1.5">
              MẬT KHẨU MỚI
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#E7E3DC] rounded-xl px-4 py-3 pr-11 text-xs text-[#151816] placeholder-[#A09D96] focus:outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C887E] hover:text-[#1A3C24] p-1 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength Indicator */}
            {newPassword && (
              <div className="mt-2 space-y-1.5">
                <div className="h-1 w-full bg-[#EAE6DF] rounded-full overflow-hidden">
                  <div className={`h-full ${strengthBarWidth} transition-all duration-300`}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                  <span className="text-[#737C75]">ĐỘ BẢO MẬT:</span>
                  <span className={`font-bold ${strengthColor}`}>{strengthLabel}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#737C75] font-semibold mb-1.5">
              XÁC NHẬN MẬT KHẨU MỚI
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#E7E3DC] rounded-xl px-4 py-3 pr-11 text-xs text-[#151816] placeholder-[#A09D96] focus:outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] transition-all shadow-2xs tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C887E] hover:text-[#1A3C24] p-1 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Criteria Card */}
          <div className="bg-[#F1F6F2] rounded-xl p-4 border border-[#DCE7DF] space-y-2 mt-4">
            <div className="flex items-center space-x-2 text-[#1A3C24] mb-1">
              <ShieldCheck className="w-4 h-4 stroke-[2]" />
              <span className="font-semibold text-xs">Tiêu chuẩn bảo mật</span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              {hasMinLength ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A3C24] shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#8C9890] shrink-0" />
              )}
              <span className={hasMinLength ? 'text-[#1A3C24] font-medium' : 'text-[#6A786E]'}>
                Tối thiểu 8 ký tự
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              {hasLetterAndNumber ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A3C24] shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#8C9890] shrink-0" />
              )}
              <span className={hasLetterAndNumber ? 'text-[#1A3C24] font-medium' : 'text-[#6A786E]'}>
                Bao gồm chữ cái và chữ số
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-[#1A3C24] hover:bg-[#122B1A] text-white font-medium py-3.5 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Lưu mật khẩu</span>
            )}
          </button>
        </form>
      </div>

      {/* Footer support link */}
      <div className="pt-8 text-center text-xs text-[#737C75]">
        Gặp vấn đề?{' '}
        <a
          href="#support"
          onClick={(e) => {
            e.preventDefault();
            alert('DRAPE Hỗ trợ: Đội ngũ chăm sóc khách hàng đang trực 24/7.');
          }}
          className="text-[#1A3C24] underline hover:text-[#122B1A]"
        >
          Liên hệ hỗ trợ
        </a>
      </div>
    </div>
  );
}
