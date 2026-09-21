import { findCart } from './cart.service.js';

export async function getCart(request, response, next) {
  try { response.json(await findCart(request.user)); } catch (error) { next(error); }
}
