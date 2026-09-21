import { Router } from 'express';
import { listOutfits } from './outfit.controller.js';

const router = Router();
router.get('/', listOutfits);
export default router;
