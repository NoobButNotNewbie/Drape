import { supabase } from '../../common/config/supabase.js';

function authError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function registerUser(input = {}) {
  const { email, password, fullName, accountType = 'user', ...metadata } = input;

  if (!email || !password) {
    throw authError('Email và mật khẩu là bắt buộc.');
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      display_name: fullName || null,
      account_type: accountType,
      ...metadata,
    },
  });

  if (error) {
    throw authError(error.message, error.status || 400);
  }

  if (data.user && fullName) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      display_name: fullName,
    });
  }

  return {
    user: data.user,
    message: 'Tạo tài khoản thành công.',
  };
}

export async function loginUser(input = {}) {
  const { email, password } = input;

  if (!email || !password) {
    throw authError('Email và mật khẩu là bắt buộc.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw authError(error.message, 401);
  }

  return {
    user: data.user,
    session: data.session,
    message: 'Đăng nhập thành công.',
  };
}
