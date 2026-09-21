import { Router } from 'express';
import { listOrders } from './order.controller.js';

const router = Router();
router.get('/', listOrders);
export default router;
