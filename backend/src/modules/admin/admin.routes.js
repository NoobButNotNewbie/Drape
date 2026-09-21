import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { dashboard } from './admin.controller.js';
import { requireAdmin } from './admin.middleware.js';

const router = Router();
router.get('/', requireAuth, requireAdmin, dashboard);
export default router;
