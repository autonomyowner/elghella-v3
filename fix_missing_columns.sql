-- Quick Fix for Missing Columns
-- Run this script in your Supabase SQL Editor to add missing columns

-- =============================================================================
-- FIX MISSING COLUMNS IN LANDS TABLE
-- =============================================================================

-- Add soilType column to lands table
ALTER TABLE lands ADD COLUMN IF NOT EXISTS soilType TEXT;

-- Add other potentially missing columns to lands table
ALTER TABLE lands ADD COLUMN IF NOT EXISTS area DECIMAL(10,2) DEFAULT 0;
ALTER TABLE lands ADD COLUMN IF NOT EXISTS isAvailable BOOLEAN DEFAULT true;
ALTER TABLE lands ADD COLUMN IF NOT EXISTS wilaya TEXT;
ALTER TABLE lands ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE lands ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE lands ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE lands ADD COLUMN IF NOT EXISTS image TEXT;

-- =============================================================================
-- FIX MISSING COLUMNS IN PRODUCTS TABLE
-- =============================================================================

-- Add missing columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE products ADD COLUMN IF NOT EXISTS isAvailable BOOLEAN DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS wilaya TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT;

-- =============================================================================
-- FIX MISSING COLUMNS IN EQUIPMENTS TABLE
-- =============================================================================

-- Add missing columns to equipments table
ALTER TABLE equipments ADD COLUMN IF NOT EXISTS isAvailable BOOLEAN DEFAULT true;
ALTER TABLE equipments ADD COLUMN IF NOT EXISTS wilaya TEXT;
ALTER TABLE equipments ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE equipments ADD COLUMN IF NOT EXISTS image TEXT;

-- =============================================================================
-- FIX MISSING COLUMNS IN EXPERTS TABLE
-- =============================================================================

-- Add missing columns to experts table
ALTER TABLE experts ADD COLUMN IF NOT EXISTS wilaya TEXT DEFAULT '';
ALTER TABLE experts ADD COLUMN IF NOT EXISTS skills TEXT DEFAULT '';
ALTER TABLE experts ADD COLUMN IF NOT EXISTS isAvailable BOOLEAN DEFAULT true;

-- =============================================================================
-- VERIFY THE CHANGES
-- =============================================================================

-- Check if soilType column now exists in lands table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'lands' AND column_name = 'soilType';

-- Check all columns in lands table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'lands'
ORDER BY column_name;
