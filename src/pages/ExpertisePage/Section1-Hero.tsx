import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Leaf, TrendingUp, Users, Award, Map, Satellite } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ContactModal from "../../components/CheckoutPopUp";

// Enhanced services data with map integration
const services = [
  {
    title: "مراقبة صحة المحاصيل",
    description: "نستخدم الصور الفضائية والتقنيات الحديثة لتحليل حالة المحاصيل وكشف الأمراض أو الإجهاد الناتج عن نقص المياه أو العناصر الغذائية مبكراً",
    icon: "🌾",
    color: "bg-green-500",
    mapFeature: "crop-analysis",
    mapDescription: "استخدم الخريطة التفاعلية لتحليل مزرعتك"
  },
  {
    title: "تحليل الغطاء النباتي",
    description: "تقييم كثافة ونمو النباتات في الحقول لتحديد المناطق ذات الإنتاجية العالية والمنخفضة وتحسين توزيع الموارد",
    icon: "🌱",
    color: "bg-blue-500",
    mapFeature: "soil-analysis",
    mapDescription: "شاهد بيانات التربة على الخريطة"
  },
  {
    title: "رصد التغيرات المناخية",
    description: "تقارير دقيقة حول تأثير التغيرات المناخية مثل الجفاف أو الفيضانات على الأراضي الزراعية للتخطيط الأفضل",
    icon: "🌤️",
    color: "bg-orange-500",
    mapFeature: "weather-data",
    mapDescription: "اطلع على بيانات الطقس المباشرة"
  },
  {
    title: "تصميم خرائط زراعية مخصصة",
    description: "إنتاج خرائط دقيقة تُظهر توزيع المحاصيل والإنتاجية المتوقعة لاتخاذ قرارات زراعية مدروسة",
    icon: "🗺️",
    color: "bg-purple-500",
    mapFeature: "custom-maps",
    mapDescription: "أنشئ خرائط مخصصة لمزرعتك"
  }
];

const stats = [
  { icon: Users, value: "500+", label: "عميل راضي" },
  { icon: Leaf, value: "1000+", label: "استشارة مكتملة" },
  { icon: TrendingUp, value: "35%", label: "زيادة متوسطة في الإنتاجية" },
  { icon: Award, value: "98%", label: "نسبة الرضا" }
];

export default function Section1Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConsultationClick = () => {
    if (isAuthenticated) {
      // Scroll to contact section
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      openModal();
    }
  };

  const handleMapNavigation = (feature?: string) => {
    if (feature) {
      // Navigate to map with specific feature highlighted
      navigate(`/farm-map?feature=${feature}&source=expertise`);
    } else {
      // Navigate to general map
      navigate('/farm-map?source=expertise');
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-blue-800 flex items-center justify-center overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title */}
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl mb-6"
              >
                👨‍🌾
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}
              >
                خدمة <span className="text-green-300">التحاليل والاستشارات</span> الزراعية
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}
              >
                استشارات زراعية مبنية على تحاليل دقيقة باستخدام أحدث التقنيات
                <br />
                <span className="text-yellow-300">🌾 مع الخريطة التفاعلية لتحليل مزرعتك �️</span>
              </motion.p>
            </div>

            {/* CTA Buttons with Map Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={handleConsultationClick}
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-2xl min-w-[280px] flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6" />
                احجز استشارة مجانية الآن
              </button>
              
              <button
                onClick={() => handleMapNavigation()}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-105 shadow-2xl min-w-[280px] flex items-center gap-3"
              >
                <Map className="w-6 h-6" />
                الخريطة التفاعلية للمزارع
              </button>
            </motion.div>

            {/* Map Integration Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Satellite className="w-8 h-8 text-yellow-300" />
                <h3 className="text-xl font-bold" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                  تقنيات متقدمة مع الخريطة التفاعلية
                </h3>
                <Satellite className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🛰️</div>
                  <div>صور فضائية</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌡️</div>
                  <div>بيانات الطقس</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌱</div>
                  <div>تحليل التربة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div>تقارير مفصلة</div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    <stat.icon className="w-8 h-8 text-green-300" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-green-300 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-green-100 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white text-center"
          >
            <div className="text-sm mb-2">اكتشف خدماتنا</div>
            <div className="text-2xl">↓</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Preview Section with Map Integration */}
      <section id="services-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
              خدماتنا المتخصصة مع الخريطة التفاعلية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
              استفد من الاستشارات المهنية مع أدوات التحليل التفاعلية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-green-200"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Map Integration Section */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Map className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">{service.mapDescription}</span>
                  </div>
                  <button
                    onClick={() => handleMapNavigation(service.mapFeature)}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Satellite className="w-4 h-4" />
                    جرب على الخريطة التفاعلية
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Integrated CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                جمع بين الاستشارة المهنية والتحليل التفاعلي
              </h3>
              <p className="text-lg opacity-90 mb-6" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                احصل على استشارة مخصصة واستخدم الخريطة التفاعلية لتحليل مزرعتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleConsultationClick}
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
                >
                  <CheckCircle className="w-5 h-5" />
                  احجز استشارتك الآن
                </button>
                <button
                  onClick={() => handleMapNavigation()}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
                >
                  <Map className="w-5 h-5" />
                  استكشف الخريطة التفاعلية
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {!isAuthenticated && (
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}
