import { supabase } from '../../common/config/supabase.js';

export async function searchCatalog(query = '') {
  const searchTerm = String(query || '').trim();
  let request = supabase
    .from('catalog_items')
    .select('id, name, category, type, price, image_url, is_active, created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (searchTerm) {
    const pattern = `%${searchTerm}%`;
    request = request.or(`name.ilike.${pattern},type.ilike.${pattern}`);
    if (searchTerm === 'quần' || searchTerm === 'áo') {
      request = request.eq('category', searchTerm);
    }
  }

  const { data, error } = await request;
  if (error) throw error;

  return { query: searchTerm, items: data };
}
