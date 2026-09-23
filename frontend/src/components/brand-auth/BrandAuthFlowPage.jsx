import React, { useState } from 'react';
import PortalSelectPage from './PortalSelectPage';
import BrandLoginPage from './BrandLoginPage';
import BrandRegisterPage from './BrandRegisterPage';
import BrandForgotPasswordPage from './BrandForgotPasswordPage';
import BrandOtpPage from './BrandOtpPage';
import BrandResetPasswordPage from './BrandResetPasswordPage';

export default function BrandAuthFlowPage({
  initialSubScreen = 'portal-select',
  onBackToApp,
  onToast,
  onNavigateToUser,
}) {
  const [currentScreen, setCurrentScreen] = useState(initialSubScreen);
  const [userEmail, setUserEmail] = useState('');

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = ({ email }) => {
    if (onToast) onToast(`Chào mừng đối tác ${email || 'DRAPE Partner'} đã đăng nhập thành công!`);
    setTimeout(() => {
      if (onBackToApp) onBackToApp('home');
    }, 1200);
  };

  const handleRegisterSuccess = ({ brandName }) => {
    if (onToast) onToast(`Đã gửi hồ sơ đối tác "${brandName}" thành công! Đội ngũ DRAPE sẽ liên hệ.`);
    setTimeout(() => {
      setCurrentScreen('brand-login');
    }, 1500);
  };

  const handleSendCodeSuccess = (email) => {
    setUserEmail(email);
    if (onToast) onToast(`Mã xác thực OTP đã gửi tới ${email}`);
    setCurrentScreen('brand-otp');
  };

  const handleVerifySuccess = () => {
    if (onToast) onToast('Xác thực mã OTP thành công! Vui lòng đặt mật khẩu mới.');
    setCurrentScreen('brand-reset');
  };

  const handleResetSuccess = () => {
    if (onToast) onToast('Đã cập nhật mật khẩu mới thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      setCurrentScreen('brand-login');
    }, 1200);
  };

  // Sub-screen switcher bar at the top of the auth section for convenient previewing
  return (
    <div className="relative min-h-screen bg-[#FBFBFA] flex flex-col">
      {/* Sub-navigation Quick Pill Bar */}
      <div className="bg-[#101913] text-[#A6BAAC] py-1.5 px-4 text-[11px] border-b border-[#25392C] flex flex-wrap items-center justify-between gap-2 z-40">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-emerald-200">DRAPE Brand Auth Portal:</span>
          <span className="text-white font-medium">
            {currentScreen === 'portal-select' && '1. Chọn Bên (Personal / Brand)'}
            {currentScreen === 'brand-login' && '2. Đăng Nhập Brand'}
            {currentScreen === 'brand-register' && '3. Đăng Ký Đối Tác (Apply)'}
            {currentScreen === 'brand-forgot' && '4. Quên Mật Khẩu (Recovery)'}
            {currentScreen === 'brand-otp' && '5. Xác Thực OTP'}
            {currentScreen === 'brand-reset' && '6. Đặt Lại Mật Khẩu'}
          </span>
        </div>

        {/* Quick jump between the 6 designed screens */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
          <button
            onClick={() => handleNavigate('portal-select')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'portal-select'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Chọn bên
          </button>
          <button
            onClick={() => handleNavigate('brand-login')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'brand-login'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => handleNavigate('brand-register')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'brand-register'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Đăng ký
          </button>
          <button
            onClick={() => handleNavigate('brand-forgot')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'brand-forgot'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Quên MK
          </button>
          <button
            onClick={() => handleNavigate('brand-otp')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'brand-otp'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            OTP
          </button>
          <button
            onClick={() => handleNavigate('brand-reset')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'brand-reset'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            MK mới
          </button>
        </div>
      </div>

      {/* Active Screen Rendering */}
      {currentScreen === 'portal-select' && (
        <PortalSelectPage
          onSelectPersonal={() => onNavigateToUser ? onNavigateToUser('user-login') : (onBackToApp ? onBackToApp('home') : handleNavigate('portal-select'))}
          onSelectBrand={() => handleNavigate('brand-login')}
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
        />
      )}

      {currentScreen === 'brand-login' && (
        <BrandLoginPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentScreen === 'brand-register' && (
        <BrandRegisterPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {currentScreen === 'brand-forgot' && (
        <BrandForgotPasswordPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onSendCodeSuccess={handleSendCodeSuccess}
        />
      )}

      {currentScreen === 'brand-otp' && (
        <BrandOtpPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      {currentScreen === 'brand-reset' && (
        <BrandResetPasswordPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onResetSuccess={handleResetSuccess}
        />
      )}
    </div>
  );
}
