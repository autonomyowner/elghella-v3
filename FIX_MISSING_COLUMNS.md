# 🔧 Fix Missing Database Columns

## The Problem
You're getting the error: **"Could not find the 'soilType' column of 'lands' in the schema cache"**

This means the `soilType` column doesn't exist in your `lands` table in the database.

## 🚀 Quick Fix (2 minutes)

### Option 1: Run the Quick Fix Script
1. **Go to your Supabase project dashboard**
2. **Click on "SQL Editor"** in the left sidebar
3. **Copy and paste** the contents of `fix_missing_columns.sql`
4. **Click "Run"** to execute the script

### Option 2: Run the Complete Database Setup
1. **Go to your Supabase project dashboard**
2. **Click on "SQL Editor"** in the left sidebar
3. **Copy and paste** the contents of `database_setup.sql`
4. **Click "Run"** to execute the script

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase Dashboard
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in to your account
3. Click on your project (the one with URL: `https://idudgypbhjefelzshofm.supabase.co`)

### Step 2: Open SQL Editor
1. In the left sidebar, click on **"SQL Editor"**
2. You'll see a text area where you can write SQL commands

### Step 3: Run the Fix Script
1. **Copy this SQL command:**
   ```sql
   -- Add missing soilType column
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS soilType TEXT;
   
   -- Add other missing columns
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS area DECIMAL(10,2) DEFAULT 0;
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS isAvailable BOOLEAN DEFAULT true;
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS wilaya TEXT;
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS images TEXT[];
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS name TEXT;
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS title TEXT;
   ALTER TABLE lands ADD COLUMN IF NOT EXISTS image TEXT;
   
   -- Verify the column was added
   SELECT column_name FROM information_schema.columns WHERE table_name = 'lands' AND column_name = 'soilType';
   ```

2. **Paste it** into the SQL Editor
3. **Click "Run"** (or press Ctrl+Enter)

### Step 4: Verify the Fix
After running the script, you should see:
- ✅ Success message
- ✅ A result showing the `soilType` column exists

## 🔍 Alternative: Check What's Missing

If you want to see what columns are missing, run this query first:

```sql
-- Check current columns in lands table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'lands'
ORDER BY column_name;
```

## 🎯 Expected Result

After running the fix, your `lands` table should have these columns:
- `id` (UUID)
- `user_id` (UUID)
- `location` (TEXT)
- `area` (DECIMAL)
- `soilType` (TEXT) ← This should now exist
- `price` (DECIMAL)
- `description` (TEXT)
- `images` (TEXT[])
- `image` (TEXT)
- `isAvailable` (BOOLEAN)
- `wilaya` (TEXT)
- `name` (TEXT)
- `title` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔄 After the Fix

1. **Refresh your browser** (Ctrl+F5)
2. **Try adding a land listing** again
3. **The error should be gone**

## 🚨 If You Still Get Errors

If you continue to get errors after running the script:

1. **Check the browser console** for more details
2. **Try the complete database setup script** (`database_setup.sql`)
3. **Clear your browser cache** and refresh
4. **Restart your development server** (`npm run dev`)

## 📞 Need Help?

If the error persists:
1. Share the exact error message from the browser console
2. Share the output from the SQL Editor after running the script
3. Take a screenshot of the error

The most important thing is to add the `soilType` column to your `lands` table by running the SQL script in your Supabase dashboard!
