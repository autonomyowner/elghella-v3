import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, MapPin, DollarSign, Package, Tag, Camera, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';

const categories = [
  { id: 'land', name: 'الأراضي الزراعية', icon: '🌾' },
  { id: 'equipment', name: 'المعدات الزراعية', icon: '🚜' },
  { id: 'products', name: 'المنتجات الزراعية', icon: '🥬' },
  { id: 'seeds', name: 'البذور والشتلات', icon: '🌱' },
  { id: 'fertilizer', name: 'الأسمدة والمبيدات', icon: '🧪' },
  { id: 'tools', name: 'الأدوات الزراعية', icon: '🔧' },
  { id: 'livestock', name: 'الماشية والدواجن', icon: '🐄' },
  { id: 'services', name: 'الخدمات الزراعية', icon: '👨‍🌾' }
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
        return;
      }

      // Upload images to Supabase storage
      const imageUrls = [];
      for (const image of formData.images) {
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${image.name}`;
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(fileName, image);

        if (error) {
          console.error('Image upload error:', error);
          continue; // Skip this image but continue with others
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        
        imageUrls.push(publicUrl);
      }

      // Insert product data
      const { data, error } = await supabase
        .from('marketplace_items')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          type: formData.type,
          price: parseFloat(formData.price),
          location: formData.location,
          contact_phone: formData.contact_phone,
          images: imageUrls,
          user_id: user?.userId,
          user_email: user?.email,
          status: 'active',
          created_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      toast.success('تم إضافة المنتج بنجاح!');
      navigate('/public-listings');

    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error('حدث خطأ أثناء إضافة المنتج: ' + (error.message || 'خطأ غير متوقع'));
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
              إضافة منتج جديد
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-['NeoSansArabicRegular']">
            أضف منتجك أو خدمتك الزراعية إلى منصة الغلة
          </p>
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
                عنوان المنتج *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                placeholder="مثال: أرض زراعية 5 هكتار في سطيف"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['NeoSansArabicMedium']">
                الفئة *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-['NeoSansArabicRegular']"
                required
              >
                <option value="">اختر الفئة</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
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