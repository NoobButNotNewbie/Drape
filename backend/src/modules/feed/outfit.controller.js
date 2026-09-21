import { getOutfits } from './outfit.service.js';

export async function listOutfits(request, response, next) {
  try { response.json(await getOutfits(request.query)); } catch (error) { next(error); }
}
