import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Calendar, 
  Zap, 
  Target, 
  MapPin,
  CheckCircle,
  Clock,
  Rocket,
  Star,
  Sparkles
} from 'lucide-react';

const UpcomingServices = () => {
  const upcomingServices = [
    {
      id: 'drone-spraying',
      title: 'خدمات الرش بالطائرات المسيرة',
      subtitle: 'رش دقيق وفعال للمحاصيل',
      icon: '🚁',
      description: 'خدمات رش متطورة باستخدام طائرات مسيرة متخصصة للحصول على أفضل النتائج مع توفير الوقت والجهد.',
      features: [
        'رش دقيق ومتوازن للمحاصيل',
        'توفير 90% من الوقت مقارنة بالطرق التقليدية',
        'تغطية شاملة حتى في المناطق الصعبة',
        'استخدام أمثل للمبيدات والأسمدة',
        'مراقبة GPS للدقة المطلقة'
      ],
      launchDate: 'الربع الأول 2025',
      status: 'development',
      image: '/api/placeholder/400/250',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'precision-agriculture',
      title: 'تقنيات الزراعة الدقيقة',
      subtitle: 'ذكاء اصطناعي لتحسين الإنتاجية',
      icon: '🎯',
      description: 'منصة شاملة للزراعة الدقيقة تستخدم الذكاء الاصطناعي وتحليل البيانات لتحسين العائد وتقليل التكاليف.',
      features: [
        'تحليل التربة بالذكاء الاصطناعي',
        'توصيات مخصصة للري والتسميد',
        'خرائط دقيقة للحقول والمحاصيل',
        'تنبؤات الطقس والآفات',
        'تتبع النمو والإنتاجية'
      ],
      launchDate: 'منتصف 2025',
      status: 'planning',
      image: '/api/placeholder/400/250',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'aerial-monitoring',
      title: 'المراقبة الجوية المتقدمة',
      subtitle: 'مراقبة مستمرة من السماء',
      icon: '📡',
      description: 'خدمات مراقبة جوية شاملة للمحاصيل والمواشي باستخدام كاميرات متطورة وأجهزة استشعار ذكية.',
      features: [
        'مراقبة 24/7 للحقول والمواشي',
        'كشف المشاكل قبل ظهورها',
        'تصوير حراري ومتعدد الأطياف',
        'تقارير مفصلة ودورية',
        'تنبيهات فورية للمشاكل'
      ],
      launchDate: 'الربع الثالث 2025',
      status: 'research',
      image: '/api/placeholder/400/250',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const timeline = [
    { quarter: 'Q1 2025', title: 'إطلاق خدمات الطائرات المسيرة', status: 'next' },
    { quarter: 'Q2 2025', title: 'بداية تقنيات الزراعة الدقيقة', status: 'future' },
    { quarter: 'Q3 2025', title: 'المراقبة الجوية المتقدمة', status: 'future' },
    { quarter: 'Q4 2025', title: 'خدمات إضافية وتوسعات', status: 'future' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'development':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">قيد التطوير</span>;
      case 'planning':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">مرحلة التخطيط</span>;
      case 'research':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">البحث والتطوير</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">قريباً</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
          >
            <Rocket className="w-10 h-10" />
          </motion.div>
          
          <h1 className="text-5xl font-bold font-['NeoSansArabicBold'] mb-4">
            خدمات مستقبلية مبتكرة
          </h1>
          <p className="text-xl text-blue-100 font-['NeoSansArabicRegular'] max-w-3xl mx-auto">
            اكتشف التقنيات الثورية القادمة إلى منصة الغلة - من الطائرات المسيرة إلى الزراعة الدقيقة
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center mt-8 space-x-4"
          >
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>قريباً في 2025</span>
            </div>
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 mr-2" />
              <span>تقنيات متطورة</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 font-['NeoSansArabicBold'] mb-4">
            الخدمات المستقبلية
          </h2>
          <p className="text-lg text-gray-600 font-['NeoSansArabicRegular']">
            تقنيات ثورية ستغير مستقبل الزراعة في المنطقة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {upcomingServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Service Header */}
              <div className={`bg-gradient-to-r ${service.gradient} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-2 right-2">
                  {getStatusBadge(service.status)}
                </div>
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold font-['NeoSansArabicBold'] mb-2">
                  {service.title}
                </h3>
                <p className="text-lg opacity-90 font-['NeoSansArabicRegular']">
                  {service.subtitle}
                </p>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <p className="text-gray-600 font-['NeoSansArabicRegular'] mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-['NeoSansArabicRegular']">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-['NeoSansArabicMedium']">{service.launchDate}</span>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-['NeoSansArabicMedium'] transition-colors">
                      <span>تفاصيل أكثر</span>
                      <ChevronRight className="w-4 h-4 mr-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 font-['NeoSansArabicBold'] text-center mb-8">
            خارطة الطريق 2025
          </h3>
          
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`inline-block bg-gradient-to-r ${
                      item.status === 'next' ? 'from-blue-500 to-cyan-500' : 'from-gray-400 to-gray-500'
                    } text-white px-4 py-2 rounded-full text-sm font-bold mb-2`}>
                      {item.quarter}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 font-['NeoSansArabicBold']">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-6 h-6 rounded-full ${
                      item.status === 'next' ? 'bg-blue-500' : 'bg-gray-400'
                    } border-4 border-white shadow-lg`}></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold font-['NeoSansArabicBold'] mb-4">
              كن من أول المستفيدين
            </h3>
            <p className="text-lg mb-6 font-['NeoSansArabicRegular']">
              اشترك في قائمة الانتظار لتكون أول من يحصل على هذه الخدمات المبتكرة
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors font-['NeoSansArabicBold']">
              انضم لقائمة الانتظار
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpcomingServices;