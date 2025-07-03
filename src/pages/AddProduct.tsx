import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, DollarSign, Package, Tag, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';

const categories = [
  { id: 'land', name: 'الأراضي الزراعية', icon: '🌾', popular: true },
  { id: 'equipment', name: 'المعدات والجرارات', icon: '🚜', popular: true },
  { id: 'trucks', name: 'الشاحنات والنقل', icon: '🚛', popular: true },
  { id: 'products', name: 'المنتجات الزراعية', icon: '🥬', popular: true },
  { id: 'seeds', name: 'البذور والشتلات', icon: '🌱' },
  { id: 'fertilizer', name: 'الأسمدة والمبيدات', icon: '🧪' },
  { id: 'tools', name: 'الأدوات اليدوية', icon: '🔧' },
  { id: 'livestock', name: 'الماشية والدواجن', icon: '🐄' },
  { id: 'services', name: 'الخدمات الزراعية', icon: '👨‍🌾' },
  { id: 'storage', name: 'المخازن والتخزين', icon: '🏢' },
  { id: 'irrigation', name: 'أنظمة الري', icon: '💧' },
  { id: 'drone-services', name: 'خدمات الطائرات المسيرة', icon: '🚁', upcoming: true },
  { id: 'precision-ag', name: 'الزراعة الدقيقة', icon: '🎯', upcoming: true },
  { id: 'aerial-monitoring', name: 'المراقبة الجوية', icon: '📡', upcoming: true },
  { id: 'other', name: 'أخرى', icon: '📦' }
];

const algerianRegions = [
  'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'تلمسان', 'سطيف', 'بجاية', 'باتنة',
  'ورقلة', 'غرداية', 'الأغواط', 'تيارت', 'المسيلة', 'سعيدة', 'سكيكدة', 'البليدة',
  'جيجل', 'مستغانم', 'بشار', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'برج بوعريريج',
  'بوزريعة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غليزان', 'ميلة', 'سوق أهراس',
  'معسكر', 'المدية', 'البويرة', 'تيبازة', 'بسكرة', 'خنشلة', 'سيدي بلعباس', 'الجلفة',
  'أم البواقي', 'تبسة', 'الوادي', 'خنشلة', 'أدرار', 'إليزي', 'تمنراست', 'تندوف'
];

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'sale', // 'sale' or 'rent'
    price: '',
    location: '',
    contact_phone: '',
    images: [] as File[]
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['NeoSansArabicBold']">
            تسجيل الدخول مطلوب
          </h2>
          <p className="text-gray-600 mb-6 font-['NeoSansArabicRegular']">
            يجب عليك تسجيل الدخول لإضافة منتجات إلى المنصة
          </p>
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
          >
            تسجيل الدخول
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      toast.error('يمكنك رفع 5 صور كحد أقصى');
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.title || !formData.description || !formData.category || !formData.price) {
        toast.error('يرجى ملء جميع الحقول المطلوبة');
        setLoading(false);
        return;
      }

      toast.loading('جاري رفع الصور...', { id: 'upload' });

      // Upload images to Supabase storage
      const imageUrls = [];
      
      if (formData.images.length > 0) {
        for (const image of formData.images) {
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${image.name}`;
          
          try {
            const { error } = await supabase.storage
              .from('product-images')
              .upload(fileName, image);

            if (error) {
              console.error('Image upload error:', error);
              // If bucket doesn't exist, create it or continue without images
              console.warn('تعذر رفع الصورة، سيتم النشر بدون صور');
              continue;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
              .from('product-images')
              .getPublicUrl(fileName);
            
            imageUrls.push(publicUrl);
          } catch (imgError) {
            console.error('Image processing error:', imgError);
            continue;
          }
        }
      }

      toast.dismiss('upload');
      toast.loading('جاري نشر المنتج...', { id: 'create' });

      // Prepare product data
      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        type: formData.type,
        price: parseFloat(formData.price),
        location: formData.location || null,
        contact_phone: formData.contact_phone || null,
        images: imageUrls.length > 0 ? imageUrls : null,
        user_id: user?.userId,
        user_email: user?.email,
        status: 'active',
        created_at: new Date().toISOString()
      };

      console.log('Submitting product data:', productData);

      // Insert product data - try different table names as fallback
      let insertResult = null;
      let tableUsed = '';

      // Try marketplace_items first
      try {
        const { data, error } = await supabase
          .from('marketplace_items')
          .insert(productData);
        
        if (!error) {
          insertResult = data;
          tableUsed = 'marketplace_items';
        } else {
          throw error;
        }
      } catch (firstError) {
        console.log('marketplace_items table not found, trying products...');
        
        // Fallback to products table
        try {
          const { data, error } = await supabase
            .from('products')
            .insert(productData);
          
          if (!error) {
            insertResult = data;
            tableUsed = 'products';
          } else {
            throw error;
          }
        } catch (secondError) {
          console.log('products table not found, trying listings...');
          
          // Fallback to listings table
          const { data, error } = await supabase
            .from('listings')
            .insert(productData);
          
          if (error) {
            throw error;
          }
          
          insertResult = data;
          tableUsed = 'listings';
        }
      }

      toast.dismiss('create');
      toast.success(`تم نشر ${formData.type === 'sale' ? 'منتجك للبيع' : 'منتجك للإيجار'} بنجاح!`);
      
      console.log(`Product inserted successfully into ${tableUsed}:`, insertResult);

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: 'sale',
        price: '',
        location: '',
        contact_phone: '',
        images: []
      });
      setImagePreview([]);

      // Navigate to listings after short delay
      setTimeout(() => {
        navigate('/public-listings');
      }, 1500);

    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.dismiss();
      
      let errorMessage = 'حدث خطأ غير متوقع';
      
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        errorMessage = 'جدول قاعدة البيانات غير متوفر. يرجى التواصل مع الإدارة.';
      } else if (error.message?.includes('permission')) {
        errorMessage = 'ليس لديك صلاحية لإضافة منتجات. يرجى التواصل مع الإدارة.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error('فشل في نشر المنتج: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 font-['NeoSansArabicBold']">
              أضف إعلان جديد
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-['NeoSansArabicRegular'] mb-2">
            أضف منتجاتك، معداتك، أراضيك، أو خدماتك إلى منصة الغلة
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="text-green-600 mr-1">🌾</span>
              <span>أراضي زراعية</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-1">🚜</span>
              <span>جرارات ومعدات</span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-600 mr-1">🚛</span>
              <span>شاحنات ونقل</span>
            </div>
            <div className="flex items-center">
              <span className="text-purple-600 mr-1">🥬</span>
              <span>منتجات زراعية</span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 font-['NeoSansArabicMedium']">
                نوع الإعلان *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all ${
                  formData.type === 'sale' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="sale"
                    checked={formData.type === 'sale'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <DollarSign className="w-8 h-8 mx-auto mb-2" />
                  <span className="font-['NeoSansArabicMedium']">للبيع</span>
                </label>
                <label className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all ${
                  formData.type === 'rent' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="rent"
                    checked={formData.type === 'rent'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Tag className="w-8 h-8 mx-auto mb-2" />
                  <span className="font-['NeoSansArabicMedium']">للإيجار</span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                عنوان الإعلان *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                placeholder={
                  formData.category === 'land' ? 'مثال: أرض زراعية 5 هكتار خصبة' :
                  formData.category === 'equipment' ? 'مثال: جرار زراعي ماسي فيرغسون 2020' :
                  formData.category === 'trucks' ? 'مثال: شاحنة نقل زراعي ايفيكو' :
                  formData.category === 'products' ? 'مثال: طماطم طبيعية الموسم الجديد' :
                  'مثال: اكتب عنوان واضح ومفصل'
                }
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 font-['NeoSansArabicMedium']">
                الفئة * 
                <span className="text-xs text-gray-500 font-normal"> - اختر نوع المنتج أو الخدمة</span>
              </label>
              
              {/* Popular Categories */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2 font-['NeoSansArabicMedium']">الفئات الشائعة:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.filter(cat => cat.popular).map(cat => (
                    <label
                      key={cat.id}
                      className={`border-2 rounded-lg p-3 text-center transition-all text-sm relative ${
                        cat.upcoming
                          ? 'border-blue-200 bg-blue-50 text-blue-600 cursor-not-allowed opacity-75'
                          : formData.category === cat.id
                          ? 'border-green-500 bg-green-50 text-green-700 cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                      }`}
                      onClick={cat.upcoming ? (e) => {
                        e.preventDefault();
                        alert(`${cat.name} - ستكون متوفرة قريباً! 🚀`);
                      } : undefined}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={formData.category === cat.id}
                        onChange={cat.upcoming ? undefined : handleInputChange}
                        className="sr-only"
                        disabled={cat.upcoming}
                      />
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="font-['NeoSansArabicMedium']">{cat.name}</div>
                      {cat.upcoming && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          قريباً
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* All Categories Dropdown */}
              <div>
                <div className="text-sm text-gray-600 mb-2 font-['NeoSansArabicMedium']">أو اختر من جميع الفئات:</div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(cat => (
                    <option 
                      key={cat.id} 
                      value={cat.upcoming ? '' : cat.id}
                      disabled={cat.upcoming}
                      style={cat.upcoming ? { color: '#9CA3AF', fontStyle: 'italic' } : {}}
                    >
                      {cat.icon} {cat.name} {cat.upcoming ? '(قريباً)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                الوصف *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                required
              />
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                  السعر (دج) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                  placeholder="مثال: 500000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                  الموقع
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                >
                  <option value="">اختر الولاية</option>
                  {algerianRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                رقم الهاتف للتواصل
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                placeholder="مثال: 0555123456"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                صور المنتج (حتى 5 صور)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <Camera className="w-12 h-12 mb-4" />
                  <span className="text-lg font-medium font-['NeoSansArabicMedium']">
                    اضغط لرفع الصور
                  </span>
                  <span className="text-sm font-['NeoSansArabicRegular']">
                    PNG, JPG, WebP حتى 10MB
                  </span>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                  {imagePreview.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="flex-1"
                leftIcon={loading ? undefined : <Plus className="w-5 h-5" />}
              >
                {loading ? 'جاري النشر...' : 'نشر المنتج'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="px-8"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}