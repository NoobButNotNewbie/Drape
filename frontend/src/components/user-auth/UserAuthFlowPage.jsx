import React, { useEffect, useState } from 'react';
import UserLoginPage from './UserLoginPage';
import UserRegisterPage from './UserRegisterPage';
import UserForgotPasswordPage from './UserForgotPasswordPage';
import UserResetPasswordPage from './UserResetPasswordPage';

export default function UserAuthFlowPage({
  initialSubScreen = 'user-login',
  onBackToApp,
  onToast,
  onNavigateToBrand,
  onAuthSuccess,
}) {
  const [currentScreen, setCurrentScreen] = useState(initialSubScreen);

  useEffect(() => {
    setCurrentScreen(initialSubScreen === 'user-otp' ? 'user-login' : initialSubScreen);
  }, [initialSubScreen]);

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
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      setTimeout(() => {
        if (onBackToApp) onBackToApp('feed');
      }, 1000);
    }
  };

  const handleRegisterSuccess = ({ fullName, email, session }) => {
    if (onToast) onToast(session
      ? `Tạo hồ sơ Style DNA cho "${fullName || email}" thành công!`
      : `Tài khoản đã tạo. Hãy kiểm tra email ${email} để xác nhận.`);
    if (session && onAuthSuccess) {
      onAuthSuccess();
    } else {
      setTimeout(() => {
        setCurrentScreen('user-login');
      }, 1200);
    }
  };

  const handleSendCodeSuccess = (email) => {
    if (onToast) onToast(`Đã gửi email khôi phục tới ${email}.`);
  };

  const handleResetSuccess = () => {
    if (onToast) onToast('Cập nhật mật khẩu mới thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      setCurrentScreen('user-login');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#FBFBFA] flex flex-col">
      {/* Screen Render */}
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
