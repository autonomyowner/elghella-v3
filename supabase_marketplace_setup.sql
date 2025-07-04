-- 🚀 ELGHELLA MARKETPLACE DATABASE SETUP
-- This script creates the necessary tables and policies for the marketplace functionality

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create marketplace_items table (main products table)
CREATE TABLE IF NOT EXISTS public.marketplace_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  price DECIMAL(15,2) NOT NULL,
  location TEXT,
  contact_phone TEXT,
  images TEXT[], -- Array of image URLs
  user_id UUID NOT NULL,
  user_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'rented')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table (fallback/alternative)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  price DECIMAL(15,2) NOT NULL,
  location TEXT,
  contact_phone TEXT,
  images TEXT[],
  user_id UUID NOT NULL,
  user_email TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create listings table (second fallback)
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  price DECIMAL(15,2) NOT NULL,
  location TEXT,
  contact_phone TEXT,
  images TEXT[],
  user_id UUID NOT NULL,
  user_email TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create equipments table (for equipment listings)
CREATE TABLE IF NOT EXISTS public.equipments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  description TEXT,
  category TEXT DEFAULT 'equipment',
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  price DECIMAL(15,2) NOT NULL,
  condition TEXT,
  location TEXT,
  contact_phone TEXT,
  images TEXT[],
  user_id UUID NOT NULL,
  seller TEXT,
  owner TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lands table (for land listings)
CREATE TABLE IF NOT EXISTS public.lands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'land',
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  price DECIMAL(15,2) NOT NULL,
  location TEXT,
  contact_phone TEXT,
  image TEXT,
  images TEXT[],
  user_id UUID NOT NULL,
  seller TEXT,
  owner TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_marketplace_items_updated_at ON marketplace_items;
CREATE TRIGGER update_marketplace_items_updated_at 
  BEFORE UPDATE ON marketplace_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_listings_updated_at ON listings;
CREATE TRIGGER update_listings_updated_at 
  BEFORE UPDATE ON listings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_equipments_updated_at ON equipments;
CREATE TRIGGER update_equipments_updated_at 
  BEFORE UPDATE ON equipments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_lands_updated_at ON lands;
CREATE TRIGGER update_lands_updated_at 
  BEFORE UPDATE ON lands 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lands ENABLE ROW LEVEL SECURITY;

-- RLS Policies for marketplace_items
DROP POLICY IF EXISTS "Allow public read access" ON marketplace_items;
CREATE POLICY "Allow public read access" ON marketplace_items 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert" ON marketplace_items;
CREATE POLICY "Allow authenticated insert" ON marketplace_items 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow owner update" ON marketplace_items;
CREATE POLICY "Allow owner update" ON marketplace_items 
  FOR UPDATE USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Allow owner delete" ON marketplace_items;
CREATE POLICY "Allow owner delete" ON marketplace_items 
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- RLS Policies for products
DROP POLICY IF EXISTS "Allow public read access" ON products;
CREATE POLICY "Allow public read access" ON products 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert" ON products;
CREATE POLICY "Allow authenticated insert" ON products 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow owner update" ON products;
CREATE POLICY "Allow owner update" ON products 
  FOR UPDATE USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Allow owner delete" ON products;
CREATE POLICY "Allow owner delete" ON products 
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- RLS Policies for listings
DROP POLICY IF EXISTS "Allow public read access" ON listings;
CREATE POLICY "Allow public read access" ON listings 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert" ON listings;
CREATE POLICY "Allow authenticated insert" ON listings 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow owner update" ON listings;
CREATE POLICY "Allow owner update" ON listings 
  FOR UPDATE USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Allow owner delete" ON listings;
CREATE POLICY "Allow owner delete" ON listings 
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- RLS Policies for equipments
DROP POLICY IF EXISTS "Allow public read access" ON equipments;
CREATE POLICY "Allow public read access" ON equipments 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert" ON equipments;
CREATE POLICY "Allow authenticated insert" ON equipments 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow owner update" ON equipments;
CREATE POLICY "Allow owner update" ON equipments 
  FOR UPDATE USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Allow owner delete" ON equipments;
CREATE POLICY "Allow owner delete" ON equipments 
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- RLS Policies for lands
DROP POLICY IF EXISTS "Allow public read access" ON lands;
CREATE POLICY "Allow public read access" ON lands 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert" ON lands;
CREATE POLICY "Allow authenticated insert" ON lands 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow owner update" ON lands;
CREATE POLICY "Allow owner update" ON lands 
  FOR UPDATE USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Allow owner delete" ON lands;
CREATE POLICY "Allow owner delete" ON lands 
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
CREATE POLICY "Allow public read access" ON storage.objects 
  FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow authenticated upload" ON storage.objects;
CREATE POLICY "Allow authenticated upload" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow owner delete" ON storage.objects;
CREATE POLICY "Allow owner delete" ON storage.objects 
  FOR DELETE USING (bucket_id = 'product-images' AND auth.uid()::text = owner::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS marketplace_items_user_id_idx ON marketplace_items(user_id);
CREATE INDEX IF NOT EXISTS marketplace_items_category_idx ON marketplace_items(category);
CREATE INDEX IF NOT EXISTS marketplace_items_type_idx ON marketplace_items(type);
CREATE INDEX IF NOT EXISTS marketplace_items_status_idx ON marketplace_items(status);
CREATE INDEX IF NOT EXISTS marketplace_items_created_at_idx ON marketplace_items(created_at);

CREATE INDEX IF NOT EXISTS products_user_id_idx ON products(user_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_type_idx ON products(type);

CREATE INDEX IF NOT EXISTS listings_user_id_idx ON listings(user_id);
CREATE INDEX IF NOT EXISTS listings_category_idx ON listings(category);
CREATE INDEX IF NOT EXISTS listings_type_idx ON listings(type);

CREATE INDEX IF NOT EXISTS equipments_user_id_idx ON equipments(user_id);
CREATE INDEX IF NOT EXISTS equipments_category_idx ON equipments(category);

CREATE INDEX IF NOT EXISTS lands_user_id_idx ON lands(user_id);
CREATE INDEX IF NOT EXISTS lands_category_idx ON lands(category);

-- Grant necessary permissions
GRANT ALL ON marketplace_items TO authenticated;
GRANT ALL ON products TO authenticated;
GRANT ALL ON listings TO authenticated;
GRANT ALL ON equipments TO authenticated;
GRANT ALL ON lands TO authenticated;

GRANT SELECT ON marketplace_items TO anon;
GRANT SELECT ON products TO anon;
GRANT SELECT ON listings TO anon;
GRANT SELECT ON equipments TO anon;
GRANT SELECT ON lands TO anon;

-- Insert test data (optional)
INSERT INTO marketplace_items (title, description, category, type, price, location, user_id, user_email) VALUES 
('اختبار منتج', 'هذا منتج تجريبي للاختبار', 'products', 'sale', 100.00, 'الجزائر العاصمة', uuid_generate_v4(), 'test@elghella.com')
ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '🎉 تم إنشاء قاعدة بيانات منصة الغلة بنجاح!';
    RAISE NOTICE '✅ الجداول: marketplace_items, products, listings, equipments, lands';
    RAISE NOTICE '✅ الصلاحيات: RLS policies configured';
    RAISE NOTICE '✅ التخزين: product-images bucket created';
    RAISE NOTICE '✅ الفهارس: Performance indexes added';
END $$;