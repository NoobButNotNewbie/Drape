import { findWardrobe } from './wardrobe.service.js';

export async function getWardrobe(request, response, next) {
  try { response.json(await findWardrobe(request.user)); } catch (error) { next(error); }
}
