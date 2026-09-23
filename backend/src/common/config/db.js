import { supabase } from './supabase.js';

export async function connectDatabase() {
  const { error } = await supabase
    .from('catalog_items')
    .select('id')
    .limit(1);

  if (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
}
