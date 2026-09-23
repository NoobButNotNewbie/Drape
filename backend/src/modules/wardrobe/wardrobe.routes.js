import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { getWardrobe } from './wardrobe.controller.js';

const router = Router();
router.get('/', requireAuth, getWardrobe);
export default router;
