import { Router } from 'express';
import { getWardrobe } from './wardrobe.controller.js';

const router = Router();
router.get('/', getWardrobe);
export default router;
