import { supabase } from '../lib/supabaseClient';

export async function fetchLands() {
  // Fetch all lands from Supabase table 'lands' (adjust table name if needed)
  const { data, error } = await supabase.from('lands').select('*');
  if (error) {
    console.error('Supabase error:', error.message);
    throw error;
  }
  return data;
}

// Fetch lands for the current user
export async function getUserLandsApi() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('يجب تسجيل الدخول لعرض الأراضي');
  const { data, error } = await supabase
    .from('lands')
    .select('*')
    .eq('user_id', user.id);
  if (error) {
    console.error('Supabase error:', error.message);
    throw error;
  }
  return data;
}
