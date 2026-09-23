import React, { useState } from 'react';
import PortalSelectPage from '../brand-auth/PortalSelectPage';
import UserLoginPage from './UserLoginPage';
import UserRegisterPage from './UserRegisterPage';
import UserForgotPasswordPage from './UserForgotPasswordPage';
import UserOtpPage from './UserOtpPage';
import UserResetPasswordPage from './UserResetPasswordPage';

export default function UserAuthFlowPage({
  initialSubScreen = 'user-login',
  onBackToApp,
  onToast,
  onNavigateToBrand,
}) {
  const [currentScreen, setCurrentScreen] = useState(initialSubScreen);
  const [userEmail, setUserEmail] = useState('');

  const handleNavigate = (screen) => {
    if (screen === 'brand-auth' || screen.startsWith('brand-')) {
      if (onNavigateToBrand) {
        onNavigateToBrand(screen);
        return;
      }
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = ({ email }) => {
    if (onToast) onToast(`Đăng nhập thành công! Chào mừng quý ông ${email || ''}.`);
    setTimeout(() => {
      if (onBackToApp) onBackToApp('home');
    }, 1000);
  };

  const handleRegisterSuccess = ({ fullName, email }) => {
    if (onToast) onToast(`Tạo hồ sơ Style DNA cho "${fullName || email}" thành công!`);
    setTimeout(() => {
      if (onBackToApp) onBackToApp('dna-flow');
    }, 1200);
  };

  const handleSendCodeSuccess = (email) => {
    setUserEmail(email);
    if (onToast) onToast(`Mã xác thực 6 chữ số đã được gửi tới ${email}`);
    setCurrentScreen('user-otp');
  };

  const handleVerifySuccess = () => {
    if (onToast) onToast('Xác thực OTP thành công! Vui lòng thiết lập mật khẩu mới.');
    setCurrentScreen('user-reset');
  };

  const handleResetSuccess = () => {
    if (onToast) onToast('Cập nhật mật khẩu mới thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      setCurrentScreen('user-login');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#FBFBFA] flex flex-col">
      {/* Sub-navigation Quick Bar */}
      <div className="bg-[#18231B] text-[#A6BAAC] py-1.5 px-4 text-[11px] border-b border-[#2C3B30] flex flex-wrap items-center justify-between gap-2 z-40">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-emerald-200">DRAPE User Auth Flow:</span>
          <span className="text-white font-medium">
            {currentScreen === 'portal-select' && '1. Chọn Bên'}
            {currentScreen === 'user-login' && '2. Đăng Nhập (Welcome Back)'}
            {currentScreen === 'user-register' && '3. Đăng Ký (Begin Evolution)'}
            {currentScreen === 'user-forgot' && '4. Quên Mật Khẩu (Recovery)'}
            {currentScreen === 'user-otp' && '5. Xác Thực OTP'}
            {currentScreen === 'user-reset' && '6. Đặt Lại Mật Khẩu (Protocol)'}
          </span>
        </div>

        {/* Quick jump pills */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
          <button
            onClick={() => handleNavigate('portal-select')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'portal-select'
                ? 'bg-[#294B34] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Chọn bên
          </button>
          <button
            onClick={() => handleNavigate('user-login')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'user-login'
                ? 'bg-[#294B34] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => handleNavigate('user-register')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'user-register'
                ? 'bg-[#294B34] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Đăng ký
          </button>
          <button
            onClick={() => handleNavigate('user-forgot')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'user-forgot'
                ? 'bg-[#294B34] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Quên MK
          </button>
          <button
            onClick={() => handleNavigate('user-otp')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'user-otp'
                ? 'bg-[#294B34] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            OTP
          </button>
          <button
            onClick={() => handleNavigate('user-reset')}
            className={`px-2 py-0.5 rounded transition-all ${
              currentScreen === 'user-reset'
                ? 'bg-[#294B34] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            MK mới
          </button>
        </div>
      </div>

      {/* Screen Render */}
      {currentScreen === 'portal-select' && (
        <PortalSelectPage
          onSelectPersonal={() => handleNavigate('user-login')}
          onSelectBrand={() => {
            if (onNavigateToBrand) onNavigateToBrand('brand-login');
            else handleNavigate('user-login');
          }}
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
        />
      )}

      {currentScreen === 'user-login' && (
        <UserLoginPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentScreen === 'user-register' && (
        <UserRegisterPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {currentScreen === 'user-forgot' && (
        <UserForgotPasswordPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onSendCodeSuccess={handleSendCodeSuccess}
        />
      )}

      {currentScreen === 'user-otp' && (
        <UserOtpPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      {currentScreen === 'user-reset' && (
        <UserResetPasswordPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onResetSuccess={handleResetSuccess}
        />
      )}
    </div>
  );
}
