import { getOrders } from './order.service.js';

export async function listOrders(request, response, next) {
  try { response.json(await getOrders(request.user)); } catch (error) { next(error); }
}
