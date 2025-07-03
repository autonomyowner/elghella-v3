-- 🗄️ SUPABASE DATABASE SETUP FOR ELGHELLA MARKETPLACE
-- Run these commands in your Supabase SQL Editor

-- 1. Create marketplace_items table (primary)
CREATE TABLE IF NOT EXISTS marketplace_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  type VARCHAR(20) DEFAULT 'sale' CHECK (type IN ('sale', 'rent')),
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(100),
  contact_phone VARCHAR(20),
  images TEXT[], -- Array of image URLs
  user_id VARCHAR(255),
  user_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'rented')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create products table (fallback)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  type VARCHAR(20) DEFAULT 'sale' CHECK (type IN ('sale', 'rent')),
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(100),
  contact_phone VARCHAR(20),
  images TEXT[],
  user_id VARCHAR(255),
  user_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'rented')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create listings table (second fallback)
CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  type VARCHAR(20) DEFAULT 'sale' CHECK (type IN ('sale', 'rent')),
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(100),
  contact_phone VARCHAR(20),
  images TEXT[],
  user_id VARCHAR(255),
  user_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'rented')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_marketplace_items_category ON marketplace_items(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_type ON marketplace_items(type);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_user_id ON marketplace_items(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_status ON marketplace_items(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_created_at ON marketplace_items(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies (allow read for all, insert/update/delete for authenticated users)

-- marketplace_items policies
CREATE POLICY "Allow public read access on marketplace_items" ON marketplace_items FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on marketplace_items" ON marketplace_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow users to update own marketplace_items" ON marketplace_items FOR UPDATE TO authenticated USING (auth.uid()::text = user_id);
CREATE POLICY "Allow users to delete own marketplace_items" ON marketplace_items FOR DELETE TO authenticated USING (auth.uid()::text = user_id);

-- products policies
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow users to update own products" ON products FOR UPDATE TO authenticated USING (auth.uid()::text = user_id);
CREATE POLICY "Allow users to delete own products" ON products FOR DELETE TO authenticated USING (auth.uid()::text = user_id);

-- listings policies
CREATE POLICY "Allow public read access on listings" ON listings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on listings" ON listings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow users to update own listings" ON listings FOR UPDATE TO authenticated USING (auth.uid()::text = user_id);
CREATE POLICY "Allow users to delete own listings" ON listings FOR DELETE TO authenticated USING (auth.uid()::text = user_id);

-- 7. Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Create storage policies for product-images bucket
CREATE POLICY "Allow public read access on product-images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'product-images');
CREATE POLICY "Allow authenticated upload to product-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow users to update own images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images' AND auth.uid()::text = owner);
CREATE POLICY "Allow users to delete own images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND auth.uid()::text = owner);

-- 9. Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_marketplace_items_updated_at BEFORE UPDATE ON marketplace_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Insert sample data for testing (optional)
INSERT INTO marketplace_items (title, description, category, type, price, location, user_email, status) VALUES 
('أرض زراعية خصبة 5 هكتار', 'أرض زراعية ممتازة للزراعة في منطقة سطيف', 'land', 'sale', 2500000, 'سطيف', 'test@example.com', 'active'),
('جرار زراعي ماسي فيرغسون', 'جرار زراعي في حالة ممتازة، مثالي للأراضي الكبيرة', 'equipment', 'rent', 15000, 'الجزائر العاصمة', 'test@example.com', 'active'),
('طماطم طبيعية طازجة', 'طماطم مزروعة طبيعياً بدون مبيدات كيماوية', 'products', 'sale', 250, 'تلمسان', 'test@example.com', 'active')
ON CONFLICT DO NOTHING;

-- ✅ SETUP COMPLETE
-- Your Elghella marketplace database is now ready!
-- Make sure to run this in your Supabase SQL Editor