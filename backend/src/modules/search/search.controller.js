import { searchCatalog } from './search.service.js';

export async function search(request, response, next) {
  try { response.json(await searchCatalog(request.query.q)); } catch (error) { next(error); }
}
