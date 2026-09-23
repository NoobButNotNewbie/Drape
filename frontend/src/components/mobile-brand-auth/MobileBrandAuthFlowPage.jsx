import React, { useState } from 'react';
import MobilePortalSelectPage from './MobilePortalSelectPage';
import MobileBrandLoginPage from './MobileBrandLoginPage';
import MobileBrandRegisterPage from './MobileBrandRegisterPage';
import MobileBrandForgotPasswordPage from './MobileBrandForgotPasswordPage';
import MobileBrandOtpPage from './MobileBrandOtpPage';
import MobileBrandResetPasswordPage from './MobileBrandResetPasswordPage';

export default function MobileBrandAuthFlowPage({
  initialSubScreen = 'portal-select',
  onBackToApp,
  onToast,
  onNavigateToUser,
}) {
  const [currentScreen, setCurrentScreen] = useState(initialSubScreen);
  const [userEmail, setUserEmail] = useState('');

  const handleNavigate = (screen) => {
    if (screen === 'user-auth' || screen.startsWith('user-')) {
      if (onNavigateToUser) {
        onNavigateToUser(screen);
        return;
      }
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = ({ email }) => {
    if (onToast) onToast(`Đối tác ${email || 'Brand'} đăng nhập thành công!`);
    setTimeout(() => {
      if (onBackToApp) onBackToApp('home');
    }, 1000);
  };

  const handleRegisterSuccess = ({ brandName }) => {
    if (onToast) onToast(`Đã nhận hồ sơ thương hiệu "${brandName}" thành công!`);
    setTimeout(() => {
      setCurrentScreen('brand-login');
    }, 1200);
  };

  const handleSendCodeSuccess = (email) => {
    setUserEmail(email);
    if (onToast) onToast(`Mã xác thực đã gửi tới ${email}`);
    setCurrentScreen('brand-otp');
  };

  const handleVerifySuccess = () => {
    if (onToast) onToast('Xác thực danh tính thành công!');
    setCurrentScreen('brand-reset');
  };

  const handleResetSuccess = () => {
    if (onToast) onToast('Mật khẩu doanh nghiệp đã được cập nhật!');
    setTimeout(() => {
      setCurrentScreen('brand-login');
    }, 1000);
  };

  return (
    <div className="relative min-h-full bg-[#FBFBFA] flex flex-col">
      {/* Mobile Sub-navigation Switcher Bar */}
      <div className="bg-[#121E15] text-[#A6BAAC] py-1 px-3 text-[10px] border-b border-[#25392C] flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center space-x-1.5 truncate mr-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="font-semibold text-emerald-200 shrink-0">Brand Mobile:</span>
          <span className="text-white truncate">
            {currentScreen === 'portal-select' && 'Chọn bên'}
            {currentScreen === 'brand-login' && 'Đăng nhập'}
            {currentScreen === 'brand-register' && 'Đăng ký'}
            {currentScreen === 'brand-forgot' && 'Quên MK'}
            {currentScreen === 'brand-otp' && 'OTP'}
            {currentScreen === 'brand-reset' && 'MK mới'}
          </span>
        </div>

        {/* Quick jump pills */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5 shrink-0">
          <button
            onClick={() => handleNavigate('portal-select')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'portal-select'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Bên
          </button>
          <button
            onClick={() => handleNavigate('brand-login')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'brand-login'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate('brand-register')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'brand-register'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Đkí
          </button>
          <button
            onClick={() => handleNavigate('brand-forgot')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'brand-forgot'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Quên
          </button>
          <button
            onClick={() => handleNavigate('brand-otp')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'brand-otp'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            OTP
          </button>
          <button
            onClick={() => handleNavigate('brand-reset')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'brand-reset'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            MK mới
          </button>
        </div>
      </div>

      {/* Screen Routing */}
      {currentScreen === 'portal-select' && (
        <MobilePortalSelectPage
          onSelectPersonal={() => {
            if (onNavigateToUser) onNavigateToUser('user-login');
            else if (onBackToApp) onBackToApp('home');
          }}
          onSelectBrand={() => handleNavigate('brand-login')}
          onBackToApp={onBackToApp}
        />
      )}

      {currentScreen === 'brand-login' && (
        <MobileBrandLoginPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentScreen === 'brand-register' && (
        <MobileBrandRegisterPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {currentScreen === 'brand-forgot' && (
        <MobileBrandForgotPasswordPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onSendCodeSuccess={handleSendCodeSuccess}
        />
      )}

      {currentScreen === 'brand-otp' && (
        <MobileBrandOtpPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      {currentScreen === 'brand-reset' && (
        <MobileBrandResetPasswordPage
          onNavigate={handleNavigate}
          onBackToApp={onBackToApp}
          onResetSuccess={handleResetSuccess}
        />
      )}
    </div>
  );
}
