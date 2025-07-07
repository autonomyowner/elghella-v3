-- Complete Database Schema Setup for Agricultural Platform
-- Run this script in your Supabase SQL Editor to ensure all tables are properly configured

-- =============================================================================
-- 1. USER PROFILES TABLE
-- =============================================================================

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    telephone TEXT,
    email TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- 2. PRODUCTS TABLE
-- =============================================================================

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    images TEXT[],
    image TEXT, -- For backward compatibility
    isAvailable BOOLEAN DEFAULT true,
    wilaya TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'quantity') THEN
        ALTER TABLE products ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'isAvailable') THEN
        ALTER TABLE products ADD COLUMN isAvailable BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'wilaya') THEN
        ALTER TABLE products ADD COLUMN wilaya TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'images') THEN
        ALTER TABLE products ADD COLUMN images TEXT[];
    END IF;
END $$;

-- Enable RLS for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
DROP POLICY IF EXISTS "Anyone can view products" ON products;
CREATE POLICY "Anyone can view products" ON products
    FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can insert their own products" ON products;
CREATE POLICY "Users can insert their own products" ON products
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own products" ON products;
CREATE POLICY "Users can update their own products" ON products
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own products" ON products;
CREATE POLICY "Users can delete their own products" ON products
    FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- 3. EQUIPMENTS TABLE
-- =============================================================================

-- Create equipments table
CREATE TABLE IF NOT EXISTS equipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    condition TEXT CHECK (condition IN ('NEW', 'USED', 'REFURBISHED', 'DAMAGED')),
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    images TEXT[],
    image TEXT, -- For backward compatibility
    isAvailable BOOLEAN DEFAULT true,
    wilaya TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'equipments' AND column_name = 'isAvailable') THEN
        ALTER TABLE equipments ADD COLUMN isAvailable BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'equipments' AND column_name = 'wilaya') THEN
        ALTER TABLE equipments ADD COLUMN wilaya TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'equipments' AND column_name = 'images') THEN
        ALTER TABLE equipments ADD COLUMN images TEXT[];
    END IF;
END $$;

-- Enable RLS for equipments
ALTER TABLE equipments ENABLE ROW LEVEL SECURITY;

-- Create policies for equipments
DROP POLICY IF EXISTS "Anyone can view equipments" ON equipments;
CREATE POLICY "Anyone can view equipments" ON equipments
    FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can insert their own equipments" ON equipments;
CREATE POLICY "Users can insert their own equipments" ON equipments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own equipments" ON equipments;
CREATE POLICY "Users can update their own equipments" ON equipments
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own equipments" ON equipments;
CREATE POLICY "Users can delete their own equipments" ON equipments
    FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- 4. LANDS TABLE
-- =============================================================================

-- Create lands table
CREATE TABLE IF NOT EXISTS lands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    soilType TEXT,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    images TEXT[],
    image TEXT, -- For backward compatibility
    isAvailable BOOLEAN DEFAULT true,
    wilaya TEXT,
    type TEXT,
    name TEXT, -- For backward compatibility
    title TEXT, -- For backward compatibility
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'area') THEN
        ALTER TABLE lands ADD COLUMN area DECIMAL(10,2) NOT NULL DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'soilType') THEN
        ALTER TABLE lands ADD COLUMN soilType TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'isAvailable') THEN
        ALTER TABLE lands ADD COLUMN isAvailable BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'wilaya') THEN
        ALTER TABLE lands ADD COLUMN wilaya TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'images') THEN
        ALTER TABLE lands ADD COLUMN images TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'name') THEN
        ALTER TABLE lands ADD COLUMN name TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'title') THEN
        ALTER TABLE lands ADD COLUMN title TEXT;
    END IF;
END $$;

-- Enable RLS for lands
ALTER TABLE lands ENABLE ROW LEVEL SECURITY;

-- Create policies for lands
DROP POLICY IF EXISTS "Anyone can view lands" ON lands;
CREATE POLICY "Anyone can view lands" ON lands
    FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can insert their own lands" ON lands;
CREATE POLICY "Users can insert their own lands" ON lands
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own lands" ON lands;
CREATE POLICY "Users can update their own lands" ON lands
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own lands" ON lands;
CREATE POLICY "Users can delete their own lands" ON lands
    FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- 5. EXPERTS TABLE
-- =============================================================================

-- Create experts table
CREATE TABLE IF NOT EXISTS experts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    prename TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    skills TEXT NOT NULL,
    description TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    image TEXT,
    isAvailable BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experts' AND column_name = 'wilaya') THEN
        ALTER TABLE experts ADD COLUMN wilaya TEXT NOT NULL DEFAULT '';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experts' AND column_name = 'skills') THEN
        ALTER TABLE experts ADD COLUMN skills TEXT NOT NULL DEFAULT '';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experts' AND column_name = 'isAvailable') THEN
        ALTER TABLE experts ADD COLUMN isAvailable BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Enable RLS for experts
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

-- Create policies for experts
DROP POLICY IF EXISTS "Anyone can view experts" ON experts;
CREATE POLICY "Anyone can view experts" ON experts
    FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can insert their own expert profile" ON experts;
CREATE POLICY "Users can insert their own expert profile" ON experts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own expert profile" ON experts;
CREATE POLICY "Users can update their own expert profile" ON experts
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own expert profile" ON experts;
CREATE POLICY "Users can delete their own expert profile" ON experts
    FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- 6. MESSAGES TABLE
-- =============================================================================

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id UUID,
    post_type TEXT CHECK (post_type IN ('product', 'equipment', 'land', 'expert')),
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can insert messages" ON messages;
CREATE POLICY "Users can insert messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update their received messages" ON messages;
CREATE POLICY "Users can update their received messages" ON messages
    FOR UPDATE USING (auth.uid() = receiver_id);

-- =============================================================================
-- 7. TRIGGERS FOR UPDATED_AT
-- =============================================================================

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_equipments_updated_at ON equipments;
CREATE TRIGGER update_equipments_updated_at
    BEFORE UPDATE ON equipments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_lands_updated_at ON lands;
CREATE TRIGGER update_lands_updated_at
    BEFORE UPDATE ON lands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_experts_updated_at ON experts;
CREATE TRIGGER update_experts_updated_at
    BEFORE UPDATE ON experts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 8. FUNCTION TO CREATE USER PROFILE AUTOMATICALLY
-- =============================================================================

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, name, telephone, email, verified)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'telephone', ''),
        NEW.email,
        CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 9. INDEXES FOR BETTER PERFORMANCE
-- =============================================================================

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

CREATE INDEX IF NOT EXISTS idx_equipments_user_id ON equipments(user_id);
CREATE INDEX IF NOT EXISTS idx_equipments_type ON equipments(type);
CREATE INDEX IF NOT EXISTS idx_equipments_created_at ON equipments(created_at);

CREATE INDEX IF NOT EXISTS idx_lands_user_id ON lands(user_id);
CREATE INDEX IF NOT EXISTS idx_lands_location ON lands(location);
CREATE INDEX IF NOT EXISTS idx_lands_created_at ON lands(created_at);

CREATE INDEX IF NOT EXISTS idx_experts_user_id ON experts(user_id);
CREATE INDEX IF NOT EXISTS idx_experts_wilaya ON experts(wilaya);
CREATE INDEX IF NOT EXISTS idx_experts_created_at ON experts(created_at);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_post_id ON messages(post_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- =============================================================================
-- 10. VERIFICATION QUERIES
-- =============================================================================

-- Run these queries to verify your setup
-- SELECT 'user_profiles' as table_name, count(*) as row_count FROM user_profiles
-- UNION ALL
-- SELECT 'products' as table_name, count(*) as row_count FROM products
-- UNION ALL
-- SELECT 'equipments' as table_name, count(*) as row_count FROM equipments
-- UNION ALL
-- SELECT 'lands' as table_name, count(*) as row_count FROM lands
-- UNION ALL
-- SELECT 'experts' as table_name, count(*) as row_count FROM experts
-- UNION ALL
-- SELECT 'messages' as table_name, count(*) as row_count FROM messages;

-- Check if all columns exist
-- SELECT table_name, column_name, data_type, is_nullable
-- FROM information_schema.columns 
-- WHERE table_name IN ('products', 'equipments', 'lands', 'experts', 'messages', 'user_profiles')
-- ORDER BY table_name, column_name;

-- =============================================================================
-- SETUP COMPLETE
-- =============================================================================

-- Your database is now properly configured with:
-- ✅ All required tables
-- ✅ All required columns
-- ✅ Row Level Security enabled
-- ✅ Proper policies for data access
-- ✅ Triggers for automatic timestamp updates
-- ✅ Automatic user profile creation
-- ✅ Performance indexes
-- ✅ Data integrity constraints

-- You can now test your application!
