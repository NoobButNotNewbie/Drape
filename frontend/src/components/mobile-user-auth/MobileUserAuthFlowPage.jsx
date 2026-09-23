import React, { useState } from 'react';
import MobileUserPortalSelectPage from './MobileUserPortalSelectPage';
import MobileUserLoginPage from './MobileUserLoginPage';
import MobileUserRegisterPage from './MobileUserRegisterPage';
import MobileUserForgotPasswordPage from './MobileUserForgotPasswordPage';
import MobileUserOtpPage from './MobileUserOtpPage';
import MobileUserResetPasswordPage from './MobileUserResetPasswordPage';

export default function MobileUserAuthFlowPage({
  initialSubScreen = 'user-login',
  onBackToApp,
  onToast,
  onNavigateToBrand,
  onAuthSuccess,
}) {
  const [currentScreen, setCurrentScreen] = useState(initialSubScreen);
  const [userEmail, setUserEmail] = useState('khachhang@drape.vn');

  const handleNavigate = (screen) => {
    if (screen === 'brand-auth' || screen.startsWith('brand-') || screen === 'mobile-brand-auth') {
      if (onNavigateToBrand) {
        onNavigateToBrand(screen);
        return;
      }
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = ({ email }) => {
    if (onToast) onToast(`Chào mừng quý khách ${email} đã đăng nhập!`);
    if (onAuthSuccess) onAuthSuccess();
    else setTimeout(() => {
      if (onBackToApp) onBackToApp('feed');
    }, 1000);
  };

  const handleRegisterSuccess = ({ fullName, email }) => {
    if (onToast) onToast(`Đăng ký tài khoản cho ${fullName || email} thành công!`);
    if (onAuthSuccess) onAuthSuccess();
    else setTimeout(() => setCurrentScreen('user-login'), 1200);
  };

  const handleSendCodeSuccess = (email) => {
    setUserEmail(email);
    if (onToast) onToast(`Mã xác thực đã gửi tới ${email}`);
    setCurrentScreen('user-otp');
  };

  const handleVerifySuccess = () => {
    if (onToast) onToast('Xác thực danh tính người dùng thành công!');
    setCurrentScreen('user-reset');
  };

  const handleResetSuccess = () => {
    if (onToast) onToast('Mật khẩu của bạn đã được cập nhật thành công!');
    setTimeout(() => {
      setCurrentScreen('user-login');
    }, 1000);
  };

  return (
    <div className="relative min-h-full bg-[#FBFBFA] flex flex-col">
      {/* Mobile Sub-navigation Switcher Bar */}
      <div className="bg-[#152319] text-[#A6BAAC] py-1 px-3 text-[10px] border-b border-[#25392C] flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center space-x-1.5 truncate mr-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="font-semibold text-emerald-200 shrink-0">User Mobile:</span>
          <span className="text-white truncate">
            {currentScreen === 'portal-select' && 'Chọn bên'}
            {currentScreen === 'user-login' && 'Đăng nhập'}
            {currentScreen === 'user-register' && 'Đăng ký'}
            {currentScreen === 'user-forgot' && 'Quên MK'}
            {currentScreen === 'user-otp' && 'OTP'}
            {currentScreen === 'user-reset' && 'MK mới'}
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
            onClick={() => handleNavigate('user-login')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'user-login'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate('user-register')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'user-register'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Đăng ký
          </button>
          <button
            onClick={() => handleNavigate('user-forgot')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'user-forgot'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            Quên MK
          </button>
          <button
            onClick={() => handleNavigate('user-otp')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'user-otp'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            OTP
          </button>
          <button
            onClick={() => handleNavigate('user-reset')}
            className={`px-1.5 py-0.5 rounded text-[9.5px] transition-all ${
              currentScreen === 'user-reset'
                ? 'bg-[#1D3E27] text-white font-semibold'
                : 'hover:text-white'
            }`}
          >
            MK mới
          </button>
        </div>
      </div>

      {/* Screen Routing */}
      <div className="flex-1 flex flex-col">
        {currentScreen === 'portal-select' && (
          <MobileUserPortalSelectPage
            onSelectPersonal={() => handleNavigate('user-login')}
            onSelectBrand={() => handleNavigate('mobile-brand-auth')}
            onBackToApp={onBackToApp}
          />
        )}

        {currentScreen === 'user-login' && (
          <MobileUserLoginPage
            onNavigateToRegister={() => handleNavigate('user-register')}
            onNavigateToForgot={() => handleNavigate('user-forgot')}
            onNavigateToPortalSelect={() => handleNavigate('portal-select')}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'user-register' && (
          <MobileUserRegisterPage
            onNavigateToLogin={() => handleNavigate('user-login')}
            onNavigateToPortalSelect={() => handleNavigate('portal-select')}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}

        {currentScreen === 'user-forgot' && (
          <MobileUserForgotPasswordPage
            onNavigateToLogin={() => handleNavigate('user-login')}
            onSendCodeSuccess={handleSendCodeSuccess}
          />
        )}

        {currentScreen === 'user-otp' && (
          <MobileUserOtpPage
            userEmail={userEmail}
            onNavigateBack={() => handleNavigate('user-forgot')}
            onVerifySuccess={handleVerifySuccess}
            onToast={onToast}
          />
        )}

        {currentScreen === 'user-reset' && (
          <MobileUserResetPasswordPage
            onNavigateBack={() => handleNavigate('user-otp')}
            onResetSuccess={handleResetSuccess}
          />
        )}
      </div>
    </div>
  );
}
