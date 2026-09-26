import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Check } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#FBFBFA] rounded-2xl shadow-2xl border border-[#E2DDD3] overflow-hidden z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-[#151816]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#868279] hover:text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="font-serif-luxury text-2xl font-bold tracking-widest text-[#151816] mb-1">
            DRAPE
          </div>
          <p className="text-xs text-[#706C64]">
            {mode === 'login'
              ? 'Đăng nhập vào hồ sơ Style DNA của bạn'
              : 'Khởi tạo tài khoản & khám phá phong cách riêng'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#EFECE6] p-1 rounded-lg mb-6 text-xs">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
              mode === 'login'
                ? 'bg-white text-[#183B22] shadow-xs'
                : 'text-[#68655E] hover:text-[#151816]'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
              mode === 'register'
                ? 'bg-white text-[#183B22] shadow-xs'
                : 'text-[#68655E] hover:text-[#151816]'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
                Họ và tên
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
              Email hoặc Số điện thoại
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider">
                Mật khẩu
              </label>
              {mode === 'login' && (
                <a
                  href="#forgot"
                  className="text-[10px] text-[#183B22] hover:underline"
                >
                  Quên mật khẩu?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C8880] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#183B22] hover:bg-[#122E1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-colors flex items-center justify-center space-x-2 mt-5"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Thành công!</span>
              </>
            ) : (
              <>
                <span>{mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-[#8C8880] mt-5 leading-relaxed">
          Bằng việc tiếp tục, bạn đồng ý với Điều khoản Sử dụng và Chính sách Bảo mật của Drape AI Stylist.
        </p>
      </div>
    </div>
  );
}
