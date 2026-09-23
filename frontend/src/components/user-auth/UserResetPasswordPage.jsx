import React, { useState } from 'react';
import { Eye, EyeOff, Check, Circle, CheckCircle2, ArrowRight } from 'lucide-react';
import UserAuthHeader from './UserAuthHeader';
import UserAuthFooter from './UserAuthFooter';
import { updatePassword } from '../../lib/accountEmail';
import { supabase } from '../../lib/supabase';

export default function UserResetPasswordPage({
  onNavigate,
  onBackToApp,
  onResetSuccess,
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Security Criteria
  const hasMinLength = newPassword.length >= 8;
  const hasLetterAndNumber = /[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword);
  const hasSpecialChar = /[@#!]/.test(newPassword) || /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);
  const isMatch = Boolean(newPassword && confirmPassword && newPassword === confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasMinLength || !hasLetterAndNumber || !hasSpecialChar) {
      alert('Vui lòng hoàn thành tất cả các tiêu chuẩn bảo mật.');
      return;
    }
    if (!isMatch) {
      alert('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsSaving(true);
    try {
      await updatePassword(newPassword);
      await supabase.auth.signOut();
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        if (onResetSuccess) {
          onResetSuccess();
        } else {
          onNavigate?.('user-login');
        }
      }, 1200);
    } catch (error) {
      setIsSaving(false);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#151816] flex flex-col justify-between selection:bg-[#1A3C24] selection:text-white">
      {/* Header with Protocol Variant Navigation */}
      <UserAuthHeader
        activeScreen="user-reset"
        onNavigate={onNavigate}
        onBackToApp={onBackToApp}
        isProtocolVariant={true}
      />

      {/* Main Split Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 lg:py-16 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch w-full">
          {/* Left Column: Architectural Photo with Gentleman */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[460px] lg:min-h-[600px] flex flex-col justify-end p-8 sm:p-12 shadow-md group">
            {/* Background Photo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/user-auth/hero_user_security.png')`,
                backgroundColor: '#2A332C',
              }}
            />

            {/* Subtle Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101411]/95 via-[#101411]/40 to-transparent" />

            {/* Protocol Statement */}
            <div className="relative z-10 text-white">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white/80 uppercase block mb-2 font-semibold">
                SECURITY PROTOCOL
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal leading-[1.2] mb-4 text-white">
                Tư vấn tận tâm, bảo mật tối đa.
              </h2>

              <p className="text-xs sm:text-[13px] text-white/85 leading-relaxed max-w-md">
                Chúng tôi hiểu rằng phong cách là cá nhân. Quy trình bảo mật của chúng tôi cũng vậy —
                tinh tế và chắc chắn.
              </p>
            </div>
          </div>

          {/* Right Column: Reset Form */}
          <div className="lg:col-span-6 flex flex-col justify-center py-4">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A3C24] mb-2 tracking-tight">
              Đặt lại mật khẩu
            </h1>

            <p className="text-xs text-[#6A675F] leading-relaxed mb-8">
              Vui lòng nhập mật khẩu mới cho tài khoản đối tác của bạn.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Mật khẩu mới */}
              <div>
                <label className="block text-xs font-medium text-[#2C2A26] mb-1.5">
                  Mật khẩu mới
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
              </div>

              {/* Field 2: Xác nhận mật khẩu */}
              <div>
                <label className="block text-xs font-medium text-[#2C2A26] mb-1.5">
                  Xác nhận mật khẩu
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
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tiêu chuẩn bảo mật */}
              <div className="bg-[#F6F4EE] border border-[#E8E4D8] rounded-xl p-4 sm:p-5">
                <div className="text-[10px] font-mono tracking-wider uppercase text-[#868278] mb-3">
                  TIÊU CHUẨN BẢO MẬT
                </div>
                <ul className="space-y-2 text-xs text-[#52504A]">
                  <li className="flex items-center space-x-2.5">
                    {hasMinLength ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#A8A398] shrink-0" />
                    )}
                    <span className={hasMinLength ? 'text-[#1A3C24] font-medium' : ''}>
                      Tối thiểu 8 ký tự
                    </span>
                  </li>

                  <li className="flex items-center space-x-2.5">
                    {hasLetterAndNumber ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#A8A398] shrink-0" />
                    )}
                    <span className={hasLetterAndNumber ? 'text-[#1A3C24] font-medium' : ''}>
                      Bao gồm chữ cái và chữ số
                    </span>
                  </li>

                  <li className="flex items-center space-x-2.5">
                    {hasSpecialChar ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1A3C24] fill-[#1A3C24] text-white shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#A8A398] shrink-0" />
                    )}
                    <span className={hasSpecialChar ? 'text-[#1A3C24] font-medium' : ''}>
                      Chứa ít nhất một ký tự đặc biệt (@, #, !)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSaving || isSaved}
                className="w-full py-3.5 px-6 bg-[#1A3C24] hover:bg-[#122B1A] text-white text-xs font-semibold tracking-wider rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Mật khẩu đã được lưu thành công!</span>
                  </>
                ) : isSaving ? (
                  <span>Đang bảo lưu mật khẩu...</span>
                ) : (
                  <>
                    <span>Lưu mật khẩu</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </main>

      {/* 4-column Rich Footer */}
      <UserAuthFooter isColumnsVariant={true} />
    </div>
  );
}
