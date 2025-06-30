import { supabase } from '../lib/supabaseClient';

export async function fetchEquipments() {
  // Fetch all equipment from Supabase table 'equipments' (adjust table name if needed)
  const { data, error } = await supabase.from('equipments').select('*');
  if (error) {
    console.error('Supabase error:', error.message);
    throw error;
  }
  return data;
}
