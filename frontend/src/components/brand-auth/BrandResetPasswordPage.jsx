import React, { useState } from 'react';
import { Eye, EyeOff, Check, Circle, CheckCircle2 } from 'lucide-react';
import BrandAuthHeader from './BrandAuthHeader';
import BrandAuthFooter from './BrandAuthFooter';

export default function BrandResetPasswordPage({
  onNavigate,
  onBackToApp,
  onResetSuccess,
}) {
  const [newPassword, setNewPassword] = useState('DrapeLuxury@2026');
  const [confirmPassword, setConfirmPassword] = useState('DrapeLuxury@2026');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  // Criteria evaluations
  const hasMinLength = newPassword.length >= 8;
  const hasUpperAndLower = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);
  const isMatch = Boolean(newPassword && confirmPassword && newPassword === confirmPassword);

  // Password strength calculation
  const score = [hasMinLength, hasUpperAndLower, hasNumberOrSpecial, newPassword.length >= 12].filter(
    Boolean
  ).length;

  let strengthLabel = 'YẾU';
  let strengthColor = 'bg-rose-500 text-rose-700';
  let barWidth = 'w-1/4 bg-rose-500';

  if (score >= 4) {
    strengthLabel = 'MẠNH';
    strengthColor = 'bg-[#1A3C24] text-[#1A3C24]';
    barWidth = 'w-full bg-[#1A3C24]';
  } else if (score >= 2) {
    strengthLabel = 'TRUNG BÌNH';
    strengthColor = 'bg-amber-500 text-amber-700';
    barWidth = 'w-1/2 bg-amber-500';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasMinLength || !hasUpperAndLower || !hasNumberOrSpecial || !isMatch) {
      alert('Vui lòng hoàn thành tất cả các tiêu chuẩn bảo mật.');
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsUpdated(true);
      setTimeout(() => {
        if (onResetSuccess) {
          onResetSuccess();
        } else {
          onNavigate?.('brand-login');
        }
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header */}
      <BrandAuthHeader
        activeScreen="brand-reset"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
      />

      {/* Main Split Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 lg:py-14 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full max-w-5xl">
          {/* Left Column: Visual Photo Card with Green Shirt Gentleman */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[580px] flex flex-col justify-end p-8 sm:p-10 shadow-lg group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/brand-auth/hero_security.png')`,
                backgroundColor: '#1B3E2B',
              }}
            />

            {/* Dark green luxury overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A180E]/95 via-[#0A180E]/40 to-transparent" />

            {/* Bottom Statement */}
            <div className="relative z-10 text-white">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-emerald-300 uppercase block mb-2 font-semibold">
                AN NINH & BẢO MẬT
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal leading-snug">
                Nâng cấp sự tinh tế từ chính bảo mật của bạn.
              </h2>
            </div>
          </div>

          {/* Right Column: Reset Password Card */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-white rounded-2xl p-6 sm:p-10 border border-[#E7E3DC] shadow-sm">
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#868278] uppercase block mb-1.5 font-semibold">
              BẢO VỆ TÀI KHOẢN
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#151816] mb-2 tracking-tight">
              Đặt Lại Mật Khẩu
            </h1>

            <p className="text-xs text-[#6A675F] leading-relaxed mb-8">
              Vui lòng thiết lập mật khẩu mới đảm bảo tính bảo mật và dễ nhớ cho hành trình phong
              cách của bạn.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Mật khẩu mới */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  MẬT KHẨU MỚI
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816] transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#7A766F] uppercase">
                  <span>ĐỘ MẠNH MẬT KHẨU</span>
                  <span className="font-semibold text-[#1A3C24]">{strengthLabel}</span>
                </div>
                <div className="w-full h-1 bg-[#EBE7DF] rounded-full mt-1.5 overflow-hidden">
                  <div className={`h-full ${barWidth} transition-all duration-300 rounded-full`} />
                </div>
              </div>

              {/* Field 2: Xác nhận mật khẩu mới */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1.5 font-mono">
                  XÁC NHẬN MẬT KHẨU MỚI
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-3.5 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#1A3C24] focus:ring-1 focus:ring-[#1A3C24] text-[#151816] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Security Standards Box */}
              <div className="bg-[#EDF4EF] border border-[#D4E3D8] rounded-xl p-4 sm:p-5">
                <div className="text-[11px] font-semibold tracking-wider text-[#1A3C24] font-mono uppercase mb-3.5">
                  TIÊU CHUẨN BẢO MẬT
                </div>
                <ul className="space-y-2.5 text-xs text-[#3E4A41]">
                  <li className="flex items-center space-x-2.5">
                    {hasMinLength ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#9BA89F] shrink-0" />
                    )}
                    <span className={hasMinLength ? 'text-[#1A3C24] font-medium' : ''}>
                      Ít nhất 8 ký tự
                    </span>
                  </li>

                  <li className="flex items-center space-x-2.5">
                    {hasUpperAndLower ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#9BA89F] shrink-0" />
                    )}
                    <span className={hasUpperAndLower ? 'text-[#1A3C24] font-medium' : ''}>
                      Bao gồm chữ hoa và chữ thường
                    </span>
                  </li>

                  <li className="flex items-center space-x-2.5">
                    {hasNumberOrSpecial ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#9BA89F] shrink-0" />
                    )}
                    <span className={hasNumberOrSpecial ? 'text-[#1A3C24] font-medium' : ''}>
                      Ít nhất một chữ số hoặc ký tự đặc biệt
                    </span>
                  </li>

                  <li className="flex items-center space-x-2.5">
                    {isMatch ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#9BA89F] shrink-0" />
                    )}
                    <span className={isMatch ? 'text-[#1A3C24] font-medium' : ''}>
                      Mật khẩu trùng khớp
                    </span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUpdating || isUpdated}
                className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-widest uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
              >
                {isUpdated ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>MẬT KHẨU ĐÃ ĐƯỢC CẬP NHẬT!</span>
                  </>
                ) : isUpdating ? (
                  <span>ĐANG ĐỒNG BỘ BẢO MẬT...</span>
                ) : (
                  <span>CẬP NHẬT MẬT KHẨU</span>
                )}
              </button>
            </form>

            {/* Return to Login */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => onNavigate?.('brand-login')}
                className="font-mono text-[11px] tracking-widest text-[#55524B] hover:text-[#1A3C24] uppercase transition-colors"
              >
                QUAY LẠI ĐĂNG NHẬP
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BrandAuthFooter />
    </div>
  );
}
