// 🧪 MARKETPLACE TEST SCRIPT
// Copy and paste this into your browser console on the Elghella website

console.log('🧪 MARKETPLACE TEST: Starting...');

(async function testMarketplace() {
  try {
    // Import Supabase from the global scope (if available)
    const { supabase } = window;
    
    if (!supabase) {
      console.error('❌ Supabase not found in global scope');
      return;
    }

    // Test 1: Authentication Check
    console.log('🔍 Test 1: Authentication Check');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('❌ Auth Error:', authError);
    } else if (user) {
      console.log('✅ User authenticated:', user.email);
    } else {
      console.log('⚠️ No user logged in');
    }

    // Test 2: Database Connection
    console.log('🔍 Test 2: Database Connection');
    const { data: dbTest, error: dbError } = await supabase
      .from('marketplace_items')
      .select('count');
    
    if (dbError) {
      console.error('❌ Database Error:', dbError);
    } else {
      console.log('✅ Database accessible');
    }

    // Test 3: Storage Buckets
    console.log('🔍 Test 3: Storage Buckets');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Storage Error:', bucketsError);
    } else {
      console.log('✅ Storage accessible. Buckets:', buckets?.map(b => b.name));
      
      // Check for product-images bucket
      const hasProductImages = buckets?.some(b => b.name === 'product-images');
      if (hasProductImages) {
        console.log('✅ product-images bucket exists');
      } else {
        console.log('⚠️ product-images bucket missing');
      }
    }

    // Test 4: Insert Test (only if authenticated)
    if (user) {
      console.log('🔍 Test 4: Test Product Insert');
      
      const testProduct = {
        title: 'اختبار منتج - ' + Date.now(),
        description: 'هذا منتج تجريبي للاختبار',
        category: 'land',
        type: 'sale',
        price: 1000,
        user_id: user.id,
        user_email: user.email,
        status: 'active'
      };

      const { data: insertData, error: insertError } = await supabase
        .from('marketplace_items')
        .insert(testProduct)
        .select();
      
      if (insertError) {
        console.error('❌ Insert Error:', insertError);
        
        // Try fallback tables
        console.log('🔍 Trying fallback table: products');
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .insert(testProduct)
          .select();
        
        if (productsError) {
          console.error('❌ Products table error:', productsError);
          
          console.log('🔍 Trying fallback table: listings');
          const { data: listingsData, error: listingsError } = await supabase
            .from('listings')
            .insert(testProduct)
            .select();
          
          if (listingsError) {
            console.error('❌ All tables failed:', listingsError);
          } else {
            console.log('✅ Insert successful in listings table:', listingsData);
            
            // Cleanup
            await supabase.from('listings').delete().eq('id', listingsData[0].id);
            console.log('🧹 Test data cleaned up');
          }
        } else {
          console.log('✅ Insert successful in products table:', productsData);
          
          // Cleanup
          await supabase.from('products').delete().eq('id', productsData[0].id);
          console.log('🧹 Test data cleaned up');
        }
      } else {
        console.log('✅ Insert successful in marketplace_items:', insertData);
        
        // Cleanup
        await supabase.from('marketplace_items').delete().eq('id', insertData[0].id);
        console.log('🧹 Test data cleaned up');
      }
    } else {
      console.log('⚠️ Skipping insert test - not authenticated');
    }

    // Test 5: RLS Policies
    console.log('🔍 Test 5: RLS Policies');
    const { data: rlsTest, error: rlsError } = await supabase
      .from('marketplace_items')
      .select('*')
      .limit(5);
    
    if (rlsError) {
      console.error('❌ RLS Error:', rlsError);
    } else {
      console.log('✅ RLS policies allow read access. Found items:', rlsTest?.length || 0);
    }

    // Summary
    console.log('\n🎯 SUMMARY:');
    console.log('✅ = Working correctly');
    console.log('⚠️ = Warning or setup needed');
    console.log('❌ = Error that needs fixing');
    
    console.log('\n📋 Next Steps:');
    if (!user) {
      console.log('1. Log into your account');
    }
    if (dbError) {
      console.log('2. Run the database setup script in Supabase SQL Editor');
    }
    if (bucketsError || !buckets?.some(b => b.name === 'product-images')) {
      console.log('3. Create the product-images storage bucket');
    }
    
    console.log('\n🎉 Test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
})();

// Helper function to test a simple product insert
window.testProductInsert = async function() {
  const title = prompt('أدخل عنوان المنتج:', 'اختبار منتج');
  const description = prompt('أدخل وصف المنتج:', 'وصف تجريبي');
  const price = prompt('أدخل السعر:', '1000');
  
  if (!title || !description || !price) {
    console.log('❌ تم إلغاء الاختبار');
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.log('❌ يجب تسجيل الدخول أولاً');
    return;
  }

  const productData = {
    title: title,
    description: description,
    category: 'land',
    type: 'sale',
    price: parseFloat(price),
    user_id: user.id,
    user_email: user.email,
    status: 'active'
  };

  console.log('📤 إرسال البيانات:', productData);

  const { data, error } = await supabase
    .from('marketplace_items')
    .insert(productData)
    .select();

  if (error) {
    console.error('❌ فشل الإدراج:', error);
  } else {
    console.log('✅ تم الإدراج بنجاح:', data);
  }
};

console.log('🎯 اكتب testProductInsert() لاختبار إدراج منتج يدوياً');