import { supabase } from '../../common/config/supabase.js';

export async function getOutfits(filters = {}) {
  let query = supabase
    .from('outfits')
    .select('id, owner_id, creator_type, name, is_public, created_at, updated_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (filters.name) query = query.ilike('name', `%${filters.name}%`);

  const { data: outfits, error } = await query;
  if (error) throw error;

  if (!outfits.length) return { items: [], filters };

  const { data: products, error: productsError } = await supabase
    .from('outfit_products')
    .select('outfit_id, product_id, image_url_snapshot, position')
    .in('outfit_id', outfits.map((outfit) => outfit.id))
    .order('position', { ascending: true });

  if (productsError) throw productsError;

  const productsByOutfit = new Map();
  for (const product of products) {
    const items = productsByOutfit.get(product.outfit_id) || [];
    items.push(product);
    productsByOutfit.set(product.outfit_id, items);
  }

  return {
    items: outfits.map((outfit) => ({
      ...outfit,
      products: productsByOutfit.get(outfit.id) || [],
    })),
    filters,
  };
}
