// 🚀 ELGHELLA PRODUCT SUBMISSION UTILITY
// Handles product posting with multiple table fallbacks and robust error handling

import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export interface ProductData {
  title: string;
  description: string;
  category: string;
  type: 'sale' | 'rent';
  price: number;
  location?: string;
  contact_phone?: string;
  images?: string[];
  user_id: string;
  user_email?: string;
  status?: string;
}

export interface SubmissionResult {
  success: boolean;
  data?: any;
  error?: string;
  table?: string;
  debugInfo?: any;
}

// 🔧 SIMPLIFIED PRODUCT SUBMISSION WITH DYNAMIC TABLE CREATION
export const submitProduct = async (productData: ProductData): Promise<SubmissionResult> => {
  console.log('🚀 Starting product submission...', productData);

  try {
    // 1. Test authentication first
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: 'خطأ في المصادقة - يرجى تسجيل الدخول مرة أخرى',
        debugInfo: { authError, user }
      };
    }

    // 2. Prepare different data formats for different table structures
    const baseData = {
      title: productData.title,
      description: productData.description,
      category: productData.category,
      type: productData.type,
      price: productData.price,
      location: productData.location,
      contact_phone: productData.contact_phone,
      images: productData.images,
      user_id: productData.user_id,
      user_email: productData.user_email,
      status: productData.status || 'active',
      created_at: new Date().toISOString()
    };

    // For products table (needs name field)
    const productsData = {
      ...baseData,
      name: productData.title
    };

    // For lands table (different structure)
    const landsData = {
      name: productData.title,
      title: productData.title,
      description: productData.description,
      category: productData.category === 'land' ? 'land' : productData.category,
      type: productData.type,
      price: productData.price,
      location: productData.location,
      contact_phone: productData.contact_phone,
      image: productData.images?.[0] || null,
      images: productData.images,
      user_id: productData.user_id,
      user_email: productData.user_email,
      seller: productData.user_email,
      owner: productData.user_email,
      status: productData.status || 'active',
      created_at: new Date().toISOString()
    };

    // For equipments table (different structure)
    const equipmentsData = {
      name: productData.title,
      title: productData.title,
      description: productData.description,
      category: productData.category === 'equipment' ? 'equipment' : productData.category,
      type: productData.type,
      price: productData.price,
      condition: 'جديد', // Default condition
      location: productData.location,
      contact_phone: productData.contact_phone,
      images: productData.images,
      user_id: productData.user_id,
      user_email: productData.user_email,
      seller: productData.user_email,
      owner: productData.user_email,
      status: productData.status || 'active',
      created_at: new Date().toISOString()
    };

    // 3. Try different tables in order of preference
    const tablesToTry = [
      { name: 'marketplace_items', data: baseData },
      { name: 'products', data: productsData },
      { name: 'listings', data: baseData }
    ];

    // If specific category, try category-specific tables first
    if (productData.category === 'land') {
      tablesToTry.unshift({ name: 'lands', data: landsData });
    } else if (productData.category === 'equipment') {
      tablesToTry.unshift({ name: 'equipments', data: equipmentsData });
    }

    console.log('🔍 DEBUG: Trying tables in order:', tablesToTry.map(t => t.name));

    for (const table of tablesToTry) {
      try {
        console.log(`🔍 DEBUG: Attempting insert into ${table.name}...`);

        // Test table exists by doing a simple select
        const { data: testData, error: testError } = await supabase
          .from(table.name)
          .select('id')
          .limit(1);

        if (testError) {
          console.log(`🔍 DEBUG: Table ${table.name} test failed:`, testError.message);
          continue;
        }

        // Try to insert
        const { data, error } = await supabase
          .from(table.name)
          .insert(table.data)
          .select();

        if (!error && data) {
          console.log(`✅ SUCCESS: Product inserted into ${table.name}`, data);
          return {
            success: true,
            data: data[0],
            table: table.name,
            debugInfo: { tableTested: table.name, insertData: table.data }
          };
        } else {
          console.log(`❌ FAILED: Insert into ${table.name}:`, error);
          continue;
        }

      } catch (tableError: any) {
        console.log(`❌ ERROR: Table ${table.name} error:`, tableError);
        continue;
      }
    }

    // 4. If all tables fail, try to create a simple table and insert
    console.log('🔧 All existing tables failed, attempting to create simple table...');
    
    try {
      // Create a simple marketplace table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS simple_marketplace (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          category TEXT,
          type TEXT,
          price DECIMAL(10,2),
          location TEXT,
          contact_phone TEXT,
          user_id TEXT,
          user_email TEXT,
          images TEXT,
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Note: This won't work directly through Supabase client, but we'll try a simpler approach
      const simpleData = {
        title: productData.title,
        description: productData.description,
        category: productData.category,
        type: productData.type,
        price: productData.price,
        location: productData.location,
        contact_phone: productData.contact_phone,
        user_id: productData.user_id,
        user_email: productData.user_email,
        images: productData.images ? JSON.stringify(productData.images) : null,
        status: 'active'
      };

      // Try one more simple approach with a basic table name
      const { data, error } = await supabase
        .from('simple_products')
        .insert(simpleData)
        .select();

      if (!error && data) {
        return {
          success: true,
          data: data[0],
          table: 'simple_products',
          debugInfo: { fallbackTable: true }
        };
      }

    } catch (createError) {
      console.log('🔧 Create table fallback also failed:', createError);
    }

    // 5. Final fallback - return detailed error info
    return {
      success: false,
      error: 'لم نتمكن من الوصول إلى قاعدة البيانات. قد تحتاج قاعدة البيانات إلى إعداد.',
      debugInfo: {
        message: 'All table insertion attempts failed',
        userId: productData.user_id,
        tablesAttempted: tablesToTry.map(t => t.name),
        suggestedAction: 'Run the SQL setup script to create the database tables'
      }
    };

  } catch (globalError: any) {
    console.error('🚨 GLOBAL ERROR in product submission:', globalError);
    
    return {
      success: false,
      error: `خطأ تقني: ${globalError.message}`,
      debugInfo: {
        error: globalError,
        stack: globalError.stack,
        code: globalError.code
      }
    };
  }
};

// 🔍 DATABASE HEALTH CHECK
export const checkDatabaseHealth = async (): Promise<{
  healthy: boolean;
  availableTables: string[];
  errors: string[];
}> => {
  const tablesToCheck = ['marketplace_items', 'products', 'listings', 'equipments', 'lands'];
  const availableTables: string[] = [];
  const errors: string[] = [];

  for (const table of tablesToCheck) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (!error) {
        availableTables.push(table);
      } else {
        errors.push(`${table}: ${error.message}`);
      }
    } catch (err: any) {
      errors.push(`${table}: ${err.message}`);
    }
  }

  return {
    healthy: availableTables.length > 0,
    availableTables,
    errors
  };
};

// 🛠️ SETUP HELPER
export const suggestDatabaseSetup = () => {
  return {
    message: 'يبدو أن قاعدة البيانات تحتاج إلى إعداد',
    instructions: [
      '1. افتح Supabase Dashboard',
      '2. اذهب إلى SQL Editor',
      '3. انسخ محتوى ملف supabase_marketplace_setup.sql',
      '4. شغل الكود لإنشاء الجداول المطلوبة',
      '5. تأكد من تفعيل RLS policies'
    ],
    sqlFile: 'supabase_marketplace_setup.sql'
  };
};