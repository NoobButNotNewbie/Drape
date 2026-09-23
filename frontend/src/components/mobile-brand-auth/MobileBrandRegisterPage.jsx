import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Check } from 'lucide-react';

export default function MobileBrandRegisterPage({
  onNavigate,
  onBackToApp,
  onRegisterSuccess,
}) {
  const [brandName, setBrandName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản Đối tác & Chính sách Xử lý Dữ liệu.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess({ brandName, businessEmail });
        } else {
          onNavigate?.('brand-login');
        }
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-full bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white px-5 py-6">
      {/* Top Header */}
      <header className="pb-4">
        <button
          onClick={() => onBackToApp?.('home')}
          className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#1A3C24]"
        >
          DRAPE
        </button>
      </header>

      {/* Main Content: Card */}
      <main className="py-2 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E3DC] shadow-xs">
          <h1 className="font-serif-luxury text-2xl font-medium text-[#1A1A18] leading-tight mb-2">
            Brand Partnership Program
          </h1>
          <p className="text-xs text-[#6A675F] leading-relaxed mb-6">
            Complete your registration to access the curator dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Brand Name */}
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#4A4740] uppercase mb-1">
                BRAND NAME
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Linen & Logic"
                className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
              />
            </div>

            {/* Business Email */}
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#4A4740] uppercase mb-1">
                BUSINESS EMAIL
              </label>
              <input
                type="email"
                required
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="partnership@brand.com"
                className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#4A4740] uppercase mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#4A4740] uppercase mb-1">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pb-2 pt-1 text-xs bg-transparent border-b border-[#D5D0C6] focus:border-[#1A3C24] outline-none text-[#151816] placeholder:text-[#A4A096] transition-colors"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 pt-2">
              <input
                type="checkbox"
                id="brand-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 text-[#1A3C24] border-[#C8C2B7] rounded focus:ring-[#1A3C24] accent-[#1A3C24]"
              />
              <label htmlFor="brand-terms" className="text-[11px] text-[#55524A] cursor-pointer select-none leading-relaxed">
                I agree to the{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="underline text-[#1A3C24]">
                  Partner Terms & Conditions
                </a>{' '}
                and data processing policy.
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full py-3.5 px-4 bg-[#1A3C24] hover:bg-[#122B1A] text-white font-mono text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer mt-5"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>DOSSIER SUBMITTED!</span>
                </>
              ) : isSubmitting ? (
                <span>SUBMITTING APPLICATION...</span>
              ) : (
                <>
                  <span>APPLY FOR PARTNERSHIP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Already a partner link */}
          <div className="text-center mt-6 pt-4 border-t border-[#F0ECE5] text-xs text-[#6A675F]">
            <p className="text-[11px] text-[#6A675F] mb-1">Already a partner?</p>
            <button
              type="button"
              onClick={() => onNavigate?.('brand-login')}
              className="font-mono text-[10.5px] tracking-wider text-[#1A3C24] font-semibold hover:underline uppercase"
            >
              SIGN IN TO DASHBOARD
            </button>
          </div>
        </div>

        {/* Security Seals */}
        <div className="flex items-center justify-center space-x-6 mt-4 font-mono text-[9px] tracking-wider text-[#7E7A72] uppercase">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A3C24]" />
            <span>SECURE PORTAL</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A3C24]" />
            <span>VERIFIED BRANDS ONLY</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-6 border-t border-[#EAE6DF]/60 text-center">
        <div className="font-serif-luxury font-bold text-sm tracking-widest text-[#7A766E] mb-1.5">
          DRAPE
        </div>
        <div className="flex justify-center space-x-4 text-[10px] text-[#8A867E] mb-2 font-medium">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24]">Privacy</a>
          <a href="#guidelines" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24]">Guidelines</a>
          <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-[#1A3C24]">Contact</a>
        </div>
        <div className="font-mono text-[8.5px] tracking-widest text-[#A29E96] uppercase">
          © 2024 DRAPE DIGITAL COLLECTIVE
        </div>
      </footer>
    </div>
  );
}
