import React, { useState } from 'react';
import { Eye, EyeOff, Circle, CheckCircle2, Check } from 'lucide-react';

export default function MobileBrandResetPasswordPage({
  onNavigate,
  onBackToApp,
  onResetSuccess,
}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  // Criteria
  const hasMin12 = password.length >= 12;
  const hasUpperLowerSymbol =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isMatch = Boolean(password && confirmPassword && password === confirmPassword);

  // Strength calculation
  let percent = 0;
  let strengthText = 'NONE';
  let barColor = 'bg-[#D5D0C6]';

  if (password.length > 0) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 25;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]/.test(password)) score += 25;

    percent = score;
    if (score >= 100) {
      strengthText = 'STRONG';
      barColor = 'bg-[#1A3C24]';
    } else if (score >= 50) {
      strengthText = 'MEDIUM';
      barColor = 'bg-amber-500';
    } else {
      strengthText = 'WEAK';
      barColor = 'bg-rose-500';
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasMin12 || !hasUpperLowerSymbol) {
      alert('Vui lòng đảm bảo mật khẩu có tối thiểu 12 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt.');
      return;
    }
    if (!isMatch) {
      alert('Mật khẩu xác nhận không trùng khớp.');
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
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-6">
        <button
          onClick={() => onBackToApp?.('home')}
          className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]"
        >
          DRAPE
        </button>

        <div className="font-mono text-[10px] tracking-wider text-[#4A4740] uppercase font-semibold">
          BRAND PORTAL
        </div>
      </header>

      {/* Main Content */}
      <main className="py-2 flex-1 flex flex-col justify-center">
        <div className="mb-6">
          <h1 className="font-serif-luxury text-3xl font-medium text-[#1A3C24] mb-2 tracking-tight">
            Secure Your Access
          </h1>
          <p className="text-xs text-[#6A675F] leading-relaxed">
            Configure your new business credentials. We recommend a unique combination to maintain
            account integrity.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E3DC] shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#666] uppercase mb-1">
                NEW BUSINESS PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pb-2 pt-1 pr-8 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816]"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="flex items-center justify-between text-[9.5px] font-mono tracking-wider text-[#7E7A72] uppercase mt-2">
                <span>STRENGTH: {strengthText}</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full h-1 bg-[#EAE6DF] rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all duration-300 rounded-full`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#666] uppercase mb-1">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pb-2 pt-1 pr-8 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-[#151816]"
                >
                  {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Security Requirements Box */}
            <div className="pt-2">
              <span className="font-mono text-[10px] tracking-wider text-[#4A4740] uppercase block mb-3 font-semibold">
                SECURITY REQUIREMENTS
              </span>
              <ul className="space-y-2 text-xs text-[#52504A]">
                <li className="flex items-center space-x-2">
                  {hasMin12 ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#A8A398] shrink-0" />
                  )}
                  <span className={hasMin12 ? 'text-[#1A3C24] font-medium' : ''}>
                    Minimum 12 characters
                  </span>
                </li>

                <li className="flex items-center space-x-2">
                  {hasUpperLowerSymbol ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#A8A398] shrink-0" />
                  )}
                  <span className={hasUpperLowerSymbol ? 'text-[#1A3C24] font-medium' : ''}>
                    Uppercase, lowercase & symbol
                  </span>
                </li>

                <li className="flex items-center space-x-2">
                  {isMatch ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#A8A398] shrink-0" />
                  )}
                  <span className={isMatch ? 'text-[#1A3C24] font-medium' : ''}>
                    Passwords must match
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isUpdating || isUpdated}
              className="w-full py-3.5 px-4 bg-[#1A3C24] hover:bg-[#122B1A] text-white font-mono text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-4"
            >
              {isUpdated ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>ACCESS CREDENTIALS UPDATED!</span>
                </>
              ) : isUpdating ? (
                <span>SYNCHRONIZING CREDENTIALS...</span>
              ) : (
                <span>UPDATE ACCESS</span>
              )}
            </button>
          </form>

          {/* Link back to login */}
          <div className="text-center mt-5">
            <button
              type="button"
              onClick={() => onNavigate?.('brand-login')}
              className="text-xs text-[#52504A] hover:text-[#1A3C24] transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-4 text-center text-[9px] font-mono tracking-widest text-[#9A968D] uppercase">
        © 2024 DRAPE DIGITAL STYLIST
      </footer>
    </div>
  );
}
