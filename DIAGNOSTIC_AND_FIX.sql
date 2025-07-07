-- DIAGNOSTIC AND FIX SCRIPT FOR MISSING COLUMNS
-- Run this script in your Supabase SQL Editor to diagnose and fix the issues

-- =============================================================================
-- STEP 1: CHECK WHAT TABLES EXIST
-- =============================================================================

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'products', 'equipments', 'lands', 'experts', 'messages')
ORDER BY table_name;

-- =============================================================================
-- STEP 2: DROP AND RECREATE TABLES (IF NEEDED)
-- =============================================================================

-- Drop existing tables if they have issues (THIS WILL DELETE ALL DATA)
-- Uncomment these lines if you want to start fresh:
-- DROP TABLE IF EXISTS messages CASCADE;
-- DROP TABLE IF EXISTS experts CASCADE;
-- DROP TABLE IF EXISTS lands CASCADE;
-- DROP TABLE IF EXISTS equipments CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS user_profiles CASCADE;

-- =============================================================================
-- STEP 3: CREATE ALL TABLES FROM SCRATCH
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
    image TEXT,
    isAvailable BOOLEAN DEFAULT true,
    wilaya TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
    image TEXT,
    isAvailable BOOLEAN DEFAULT true,
    wilaya TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
    image TEXT,
    isAvailable BOOLEAN DEFAULT true,
    wilaya TEXT,
    type TEXT,
    name TEXT,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- =============================================================================
-- STEP 4: ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lands ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- STEP 5: CREATE POLICIES
-- =============================================================================

-- User profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products policies
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

-- Equipments policies
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

-- Lands policies
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

-- Experts policies
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

-- Messages policies
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
-- STEP 6: CREATE TRIGGERS
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
-- STEP 7: CREATE USER PROFILE TRIGGER
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
-- STEP 8: VERIFICATION
-- =============================================================================

-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'products', 'equipments', 'lands', 'experts', 'messages')
ORDER BY table_name;

-- Check all columns exist
SELECT table_name, column_name, data_type
FROM information_schema.columns 
WHERE table_name IN ('products', 'equipments', 'lands', 'experts', 'messages', 'user_profiles')
AND column_name IN ('user_id', 'soilType', 'quantity', 'isAvailable', 'wilaya', 'skills')
ORDER BY table_name, column_name;
