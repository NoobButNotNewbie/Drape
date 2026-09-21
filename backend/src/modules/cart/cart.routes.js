import { Router } from 'express';
import { getCart } from './cart.controller.js';

const router = Router();
router.get('/', getCart);
export default router;
