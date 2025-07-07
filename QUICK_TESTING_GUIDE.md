# Quick Testing Guide

## 🚀 How to Test Your Agricultural Platform

### Prerequisites
1. **Application is running:** http://localhost:5173
2. **Supabase is configured:** Check that your .env file has the correct credentials
3. **Database is set up:** All tables and policies should be in place

---

## 🔍 Quick Test Steps

### 1. Test User Registration
```
1. Go to http://localhost:5173/signup
2. Fill in the form with:
   - Name: محمد أحمد
   - Phone: 0676916928
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
3. Submit and check for success message
4. Check if user appears in Supabase Auth dashboard
```

### 2. Test User Login
```
1. Go to http://localhost:5173/login
2. Use the credentials from step 1
3. Check if you're redirected to homepage
4. Verify user is authenticated in navbar
```

### 3. Test Add Product
```
1. Go to http://localhost:5173/addproduct
2. Fill in the form with:
   - Product Name: طماطم طازجة
   - Type: الخضروات
   - Price: 150
   - Quantity: 50
   - Description: طماطم طازجة من المزرعة
3. Submit and check for success message
4. Go to /publiclistings to see if product appears
```

### 4. Test Add Equipment
```
1. Go to http://localhost:5173/addequipment
2. Fill in the form with:
   - Equipment Name: جرار زراعي
   - Type: معدات زراعية
   - Condition: USED
   - Price: 50000
   - Description: جرار في حالة جيدة
3. Submit and check for success message
4. Go to /publiclistings to see if equipment appears
```

### 5. Test Add Land
```
1. Go to http://localhost:5173/addlandrent
2. Fill in the form with:
   - Location: الشلف
   - Area: 1000
   - Soil Type: طينية
   - Price: 25000
   - Description: أرض زراعية خصبة
3. Submit and check for success message
4. Go to /publiclistings to see if land appears
```

### 6. Test Public Listings
```
1. Go to http://localhost:5173/publiclistings
2. Check that all items appear (products, equipment, lands)
3. Test search functionality
4. Test filters
5. Click on any item to view details
6. Test messaging functionality
```

### 7. Test Inventory Management
```
1. Go to http://localhost:5173/manage
2. Check that your items appear in each tab
3. Test edit functionality
4. Test delete functionality
5. Verify changes are saved
```

### 8. Test Add Expert
```
1. Go to http://localhost:5173/experts/add
2. Fill in the form with:
   - Name: أحمد
   - Surname: محمد
   - Wilaya: الجزائر
   - Skills: زراعة الخضروات
   - Email: expert@example.com
   - Phone: 0676916928
   - Upload an image
3. Submit and check for success message
4. Go to /experts to see if expert appears
```

---

## 🐛 Common Issues and Solutions

### Issue: "Column doesn't exist" Error
**Solution:** Check if the column exists in your Supabase database:
```sql
-- Check products table
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'products';

-- Add missing columns if needed
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity INTEGER;
ALTER TABLE products ADD COLUMN IF NOT EXISTS isAvailable BOOLEAN DEFAULT true;
```

### Issue: "Permission denied" Error
**Solution:** Check your RLS policies in Supabase:
```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can insert their own products" ON products 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all products" ON products 
FOR SELECT TO authenticated, anon USING (true);
```

### Issue: Image Upload Fails
**Solution:** Check your storage bucket configuration:
1. Go to Supabase Dashboard → Storage
2. Check if buckets exist: `product-images`, `equipment-images`, `experts`
3. Set bucket policies to allow public read and authenticated write

### Issue: Authentication Issues
**Solution:** Check your environment variables:
```bash
# Check .env file
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 📊 Expected Results

### ✅ Success Indicators
- [ ] Forms submit without errors
- [ ] Success messages appear after submissions
- [ ] Data appears in public listings
- [ ] User can login and access protected routes
- [ ] Images upload and display correctly
- [ ] Search and filtering work
- [ ] User can manage their own listings

### ❌ Failure Indicators
- [ ] Console errors in browser
- [ ] Forms don't submit
- [ ] Data doesn't appear in listings
- [ ] Images don't upload
- [ ] Authentication doesn't work
- [ ] Database errors
- [ ] Missing columns errors

---

## 📝 Testing Logs

### Test Session 1
**Date:** ___________
**Tester:** ___________

- [ ] Registration: ✅ / ❌
- [ ] Login: ✅ / ❌
- [ ] Add Product: ✅ / ❌
- [ ] Add Equipment: ✅ / ❌
- [ ] Add Land: ✅ / ❌
- [ ] Public Listings: ✅ / ❌
- [ ] Manage Inventory: ✅ / ❌
- [ ] Add Expert: ✅ / ❌

**Issues Found:**
1. ________________________________
2. ________________________________
3. ________________________________

**Notes:**
_____________________________________
_____________________________________
_____________________________________

---

## 🎯 Next Steps

If all tests pass:
1. Test with multiple users
2. Test with larger datasets
3. Test on different devices
4. Test with slow internet
5. Perform load testing
6. Test edge cases
7. Test error scenarios

If tests fail:
1. Check console for errors
2. Check Supabase logs
3. Verify database schema
4. Check RLS policies
5. Verify environment variables
6. Check network connectivity
7. Review code for bugs

---

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Check the Supabase logs
3. Verify your database schema matches the frontend expectations
4. Check that all RLS policies are properly configured
5. Ensure storage buckets have correct permissions

Remember: The application is designed to be user-friendly and robust. Most issues are usually related to database schema mismatches or missing RLS policies.
