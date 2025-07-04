import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Leaf, TrendingUp, Users, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ContactModal from "../../components/CheckoutPopUp";

// Enhanced services data
const services = [
  {
    title: "مراقبة صحة المحاصيل",
    description: "نستخدم الصور الفضائية والتقنيات الحديثة لتحليل حالة المحاصيل وكشف الأمراض أو الإجهاد الناتج عن نقص المياه أو العناصر الغذائية مبكراً",
    icon: "🌾",
    color: "bg-green-500"
  },
  {
    title: "تحليل الغطاء النباتي",
    description: "تقييم كثافة ونمو النباتات في الحقول لتحديد المناطق ذات الإنتاجية العالية والمنخفضة وتحسين توزيع الموارد",
    icon: "🌱",
    color: "bg-blue-500"
  },
  {
    title: "رصد التغيرات المناخية",
    description: "تقارير دقيقة حول تأثير التغيرات المناخية مثل الجفاف أو الفيضانات على الأراضي الزراعية للتخطيط الأفضل",
    icon: "🌤️",
    color: "bg-orange-500"
  },
  {
    title: "تصميم خرائط زراعية مخصصة",
    description: "إنتاج خرائط دقيقة تُظهر توزيع المحاصيل والإنتاجية المتوقعة لاتخاذ قرارات زراعية مدروسة",
    icon: "🗺️",
    color: "bg-purple-500"
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
                <span className="text-yellow-300">🌾 من أجل زراعة أكثر نجاحاً ومردودية 🚜</span>
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={handleConsultationClick}
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-2xl min-w-[280px]"
              >
                احجز استشارة مجانية الآن
              </button>
              
              <button
                onClick={() => {
                  const servicesSection = document.getElementById('services-section');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-105 shadow-2xl min-w-[280px]"
              >
                تعرف على خدماتنا
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
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

      {/* Services Preview Section */}
      <section id="services-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
              خدماتنا المتخصصة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
              نقدم مجموعة شاملة من الخدمات الاستشارية المبنية على أحدث التقنيات
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
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleConsultationClick}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <CheckCircle className="w-5 h-5" />
              احجز استشارتك الآن
            </button>
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
