# 🔧 دليل إصلاح أخطاء نشر المنتجات - TROUBLESHOOTING GUIDE

## ⚠️ المشكلة: "فشل في نشر المنتج: حدث خطأ غير متوقع"

هذا الدليل سيساعدك في تشخيص وإصلاح مشكلة نشر المنتجات في منصة الغلة.

---

## 🔍 الخطوة 1: التشخيص السريع

### أ) تحقق من وحدة التحكم (Console)
1. افتح أدوات المطور في المتصفح (`F12`)
2. انتقل إلى تبويب **Console**
3. ابحث عن رسائل خطأ تبدأ بـ `🔍 DEBUG:`

### ب) استخدم زر الفحص
1. اذهب إلى صفحة إضافة المنتج `/add-product`
2. انقر على زر **🔍 فحص** (يظهر فقط في وضع التطوير)
3. تحقق من النتائج في Console

---

## 🗄️ الخطوة 2: إعداد قاعدة البيانات

### أ) تشغيل سكريبت إعداد قاعدة البيانات
1. انتقل إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. انسخ والصق المحتوى من ملف `supabase_setup.sql`
5. انقر **Run** لتنفيذ السكريبت

### ب) التحقق من الجداول
تأكد من وجود هذه الجداول:
- ✅ `marketplace_items` (الجدول الأساسي)
- ✅ `products` (جدول احتياطي)
- ✅ `listings` (جدول احتياطي ثاني)

---

## 🔐 الخطوة 3: إعدادات الأمان (RLS)

### أ) تفعيل Row Level Security
```sql
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
```

### ب) إضافة سياسات الأمان
```sql
-- للقراءة العامة
CREATE POLICY "Allow public read access on marketplace_items" 
ON marketplace_items FOR SELECT USING (true);

-- للإدراج للمستخدمين المسجلين
CREATE POLICY "Allow authenticated insert on marketplace_items" 
ON marketplace_items FOR INSERT TO authenticated WITH CHECK (true);
```

---

## 🖼️ الخطوة 4: إعداد تخزين الصور

### أ) إنشاء bucket للصور
```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;
```

### ب) سياسات تخزين الصور
```sql
CREATE POLICY "Allow public read access on product-images" 
ON storage.objects FOR SELECT TO public USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated upload to product-images" 
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
```

---

## 🔑 الخطوة 5: التحقق من المصادقة

### أ) تحقق من متغيرات البيئة
في ملف `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### ب) اختبار تسجيل الدخول
1. سجل الدخول إلى حسابك
2. تحقق من وحدة التحكم من وجود معلومات المستخدم
3. جرب إضافة منتج بسيط

---

## ❌ أخطاء شائعة وحلولها

### 1. **"relation marketplace_items does not exist"**
**الحل:** تشغيل سكريبت إعداد قاعدة البيانات

### 2. **"permission denied for table"**
**الحل:** تفعيل RLS وإضافة السياسات المناسبة

### 3. **"JWT expired" أو "invalid JWT"**
**الحل:** 
```javascript
// تسجيل الخروج والدخول مرة أخرى
await supabase.auth.signOut();
// ثم تسجيل الدخول مرة أخرى
```

### 4. **"bucket product-images does not exist"**
**الحل:** إنشاء bucket الصور في Supabase Storage

### 5. **"Network error" أو "fetch failed"**
**الحل:** تحقق من:
- الاتصال بالإنترنت
- عنوان URL الصحيح لـ Supabase
- إعدادات الـ CORS

---

## 🧪 اختبارات إضافية

### أ) اختبار قاعدة البيانات يدوياً
```javascript
// في وحدة التحكم
const { data, error } = await supabase
  .from('marketplace_items')
  .select('*')
  .limit(5);
console.log({ data, error });
```

### ب) اختبار إدراج بسيط
```javascript
const { data, error } = await supabase
  .from('marketplace_items')
  .insert({
    title: 'اختبار',
    description: 'منتج تجريبي',
    category: 'land',
    type: 'sale',
    price: 100
  });
console.log({ data, error });
```

---

## 📞 طلب المساعدة

إذا استمرت المشكلة، يرجى تقديم المعلومات التالية:

1. **رسالة الخطأ الكاملة** من وحدة التحكم
2. **نتائج زر الفحص** (🔍 فحص)
3. **خطوات إعادة الإنتاج** للمشكلة
4. **معلومات المتصفح** والنظام
5. **لقطة شاشة** من الخطأ

### معلومات تقنية للمطورين:
- **Supabase URL:** `https://idudgypbhjefelzshofm.supabase.co`
- **الجداول المطلوبة:** marketplace_items, products, listings
- **الـ bucket المطلوب:** product-images
- **المصادقة:** يجب أن يكون المستخدم مسجل دخول

---

## ✅ التحقق من نجاح الإصلاح

بعد تطبيق الحلول:

1. ✅ تسجيل الدخول بنجاح
2. ✅ زيارة صفحة إضافة المنتج
3. ✅ ملء النموذج بالكامل
4. ✅ رفع صورة (اختياري)
5. ✅ النقر على "نشر المنتج"
6. ✅ ظهور رسالة "تم نشر منتجك بنجاح!"
7. ✅ الانتقال إلى صفحة القوائم العامة

إذا تم كل هذا بنجاح، فقد تم إصلاح المشكلة! 🎉