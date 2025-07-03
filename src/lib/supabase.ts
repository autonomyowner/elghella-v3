import { createClient } from '@supabase/supabase-js';

// Supabase configuration - using environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://idudgypbhjefelzshofm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdWRneXBiaGplZmVsenNob2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDc1NTcsImV4cCI6MjA2NjYyMzU1N30.NwXVXPW1CiqcXI_IBzPib5pXC9KSCBS6xIO6qRnnBAA';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export for use in authentication hooks
export default supabase;