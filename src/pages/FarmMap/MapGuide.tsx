import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Layers, Cloud, Thermometer } from 'lucide-react';

const MapGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ دليل استخدام خريطة المزارع التفاعلية
          </h1>
          <p className="text-xl text-gray-600">
            اكتشف كيفية استخدام أحدث التقنيات الزراعية في منصة الغلة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Layers className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">طبقات الخريطة</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🌱</span>
                <div>
                  <strong>كثافة الكربون العضوي:</strong> بيانات حقيقية من ISRIC SoilGrids لتحديد خصوبة التربة
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">🌧️</span>
                <div>
                  <strong>طبقات الطقس:</strong> هطول الأمطار، درجة الحرارة، الرياح والغيوم
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">🛰️</span>
                <div>
                  <strong>خرائط الأساس:</strong> خريطة عادية وصور أقمار صناعية
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Cloud className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">بيانات حية</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Thermometer className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <strong>معلومات الطقس الحالية:</strong> تحديث كل 10 دقائق من OpenWeatherMap
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <strong>مواقع المزارع:</strong> انقر على العلامات لرؤية تفاصيل المحاصيل
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🌱 فهم بيانات التربة
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">مستويات الخصوبة</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-900 rounded mr-3"></div>
                  <span className="text-sm">عالي جداً - مثالي للزراعة</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-700 rounded mr-3"></div>
                  <span className="text-sm">عالي - جيد للمحاصيل</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded mr-3"></div>
                  <span className="text-sm">متوسط - يحتاج تحسين</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-300 rounded mr-3"></div>
                  <span className="text-sm">منخفض - يحتاج تسميد</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-100 rounded mr-3"></div>
                  <span className="text-sm">منخفض جداً - غير صالح</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">كيفية الاستخدام</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>فعّل طبقة "كثافة الكربون العضوي" من لوحة التحكم</li>
                <li>ابحث عن المناطق ذات اللون البني الداكن للتربة الخصبة</li>
                <li>تجنب المناطق الفاتحة للزراعة المباشرة</li>
                <li>استخدم بيانات الطقس لتخطيط الأنشطة الزراعية</li>
              </ol>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link to="/farm-map">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center mx-auto"
            >
              افتح الخريطة التفاعلية
              <ArrowRight className="w-5 h-5 mr-3" />
            </motion.button>
          </Link>
          
          <p className="text-gray-600 mt-4">
            ملاحظة: تحتاج إلى اتصال بالإنترنت لتحميل البيانات الحية
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MapGuide;