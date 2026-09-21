import { getProducts } from './product.service.js';

export async function listProducts(request, response, next) {
  try { response.json(await getProducts(request.query)); } catch (error) { next(error); }
}
