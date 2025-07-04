import { createClient } from '@supabase/supabase-js';

// Supabase configuration - using environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ifgkcorpntqybfbwdbgo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZ2tjb3JwbnRxeWJmYndkYmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDE1ODYsImV4cCI6MjA0NzA3NzU4Nn0.u7mmcvvFONlQdAr9-tq8X5eiBBT1CWlGRy0lWXF8mNw';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'pkce',
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'x-my-custom-header': 'elghella-agriculture-platform',
    },
  },
  db: {
    schema: 'public',
  },
});

// Add connection health check
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1);
    if (error && error.code === 'PGRST116') {
      // Table doesn't exist, but connection works
      return { connected: true, message: 'Connected successfully' };
    }
    return { connected: true, message: 'Connected successfully', data };
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return { connected: false, error };
  }
};

// Simple performance logging
export const logQueryPerformance = (tableName: string, operation: string) => {
  const start = performance.now();
  return () => {
    const end = performance.now();
    console.log(`📊 ${operation} on ${tableName} took ${(end - start).toFixed(2)}ms`);
  };
};

// Export for use in authentication hooks
export default supabase;