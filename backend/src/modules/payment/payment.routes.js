import { Router } from 'express';
import { createPayment } from './payment.controller.js';
import { paymentWebhook } from './payment.webhook.js';

const router = Router();
router.post('/', createPayment);
router.post('/webhook', paymentWebhook);
export default router;
