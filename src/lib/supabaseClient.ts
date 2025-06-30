import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idudgypbhjefelzshofm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdWRneXBiaGplZmVsenNob2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDc1NTcsImV4cCI6MjA2NjYyMzU1N30.NwXVXPW1CiqcXI_IBzPib5pXC9KSCBS6xIO6qRnnBAA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
