import { startPayment } from './payment.service.js';

export async function createPayment(request, response, next) {
  try { response.status(201).json(await startPayment(request.body)); } catch (error) { next(error); }
}
