import { supabase } from '../lib/supabase';

export const debugSupabase = async () => {
  console.log('🔍 SUPABASE DEBUG: Starting diagnostics...');
  
  try {
    // 1. Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('🔍 AUTH STATUS:', { user, authError });
    
    // 2. Check database connection
    const { data: dbTest, error: dbError } = await supabase
      .from('marketplace_items')
      .select('count')
      .limit(1);
    console.log('🔍 DATABASE TEST:', { dbTest, dbError });
    
    // 3. Check storage buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    console.log('🔍 STORAGE BUCKETS:', { buckets, bucketsError });
    
    // 4. Test RLS policies
    if (user) {
      const { data: rlsTest, error: rlsError } = await supabase
        .from('marketplace_items')
        .insert({
          title: 'Test Product',
          description: 'Test Description',
          category: 'land',
          type: 'sale',
          price: 100,
          user_id: user.id,
          user_email: user.email
        })
        .select();
      
      console.log('🔍 RLS TEST (Insert):', { rlsTest, rlsError });
      
      // Clean up test data if successful
      if (rlsTest && rlsTest.length > 0) {
        const { error: deleteError } = await supabase
          .from('marketplace_items')
          .delete()
          .eq('id', rlsTest[0].id);
        console.log('🔍 CLEANUP:', { deleteError });
      }
    }
    
    return {
      auth: { user, error: authError },
      database: { data: dbTest, error: dbError },
      storage: { buckets, error: bucketsError },
      summary: 'Debug completed - check console for details'
    };
    
  } catch (error) {
    console.error('🔍 DEBUG ERROR:', error);
    return { error: 'Debug failed', details: error };
  }
};

export const testAuthentication = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('🔍 AUTH ERROR:', error);
    return { authenticated: false, error: error.message };
  }
  
  if (!user) {
    console.log('🔍 NO USER FOUND');
    return { authenticated: false, error: 'No user session found' };
  }
  
  console.log('🔍 USER AUTHENTICATED:', user);
  return { authenticated: true, user };
};

export const testDatabaseAccess = async () => {
  try {
    // Test marketplace_items table
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('🔍 DB ACCESS ERROR:', error);
      return { accessible: false, error: error.message };
    }
    
    console.log('🔍 DATABASE ACCESSIBLE');
    return { accessible: true, data };
    
  } catch (error) {
    console.error('🔍 DB TEST FAILED:', error);
    return { accessible: false, error: 'Database test failed' };
  }
};