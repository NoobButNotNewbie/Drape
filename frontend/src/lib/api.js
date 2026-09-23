const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
  }

  return payload;
}

export function loginAccount({ email, password, accountType = 'user' }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, accountType }),
  });
}

export function registerAccount({ email, password, fullName, accountType = 'user', ...metadata }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, fullName, accountType, ...metadata }),
  });
}
