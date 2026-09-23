import { supabase } from '../../common/config/supabase.js';

export async function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return response.status(401).json({ error: 'Authentication required' });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return response.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    request.user = data.user;
    next();
  } catch {
    next(error);
  }
}
