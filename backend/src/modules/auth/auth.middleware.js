import jwt from 'jsonwebtoken';
import { env } from '../../common/config/env.js';

export function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace('Bearer ', '');
  if (!token) return response.status(401).json({ error: 'Authentication required' });

  try {
    request.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    response.status(401).json({ error: 'Invalid or expired token' });
  }
}
