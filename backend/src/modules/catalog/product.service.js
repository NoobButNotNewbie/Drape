import { supabase } from '../../common/config/supabase.js';

export async function getProducts(filters = {}) {
  const { category, type, search } = filters;
  let query = supabase
    .from('catalog_items')
    .select('id, name, category, type, price, image_url, is_active, created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);
  if (type) query = query.eq('type', type);
  if (search) query = query.ilike('name', `%${search}%`);

  const { data, error } = await query;
  if (error) throw error;

  return { items: data, filters };
}
