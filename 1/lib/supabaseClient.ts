import { createClient } from '@supabase/supabase-js';

console.log('Loaded from 1/lib/supabaseClient.ts');
console.log('VITE_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
