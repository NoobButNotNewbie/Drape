import { supabase } from '../../common/config/supabase.js';

export async function findWardrobe(user) {
  const { data, error } = await supabase
    .from('wardrobe_items')
    .select('id, user_id, product_id, name, category, image_url, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return { user: { id: user.id }, pieces: data };
}
