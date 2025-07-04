import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, Zap } from "lucide-react";

const services = [
  {
    id: 1,
    name: "استشارة سريعة",
    price: "مجاني",
    duration: "30 دقيقة",
    description: "استشارة مجانية للتعرف على احتياجاتك الزراعية الأساسية",
    features: [
      "تقييم سريع لحالة المزرعة",
      "نصائح عامة للتحسين",
      "توجيهات أساسية للزراعة",
      "إجابة على الأسئلة العامة"
    ],
    popular: false,
    icon: Zap,
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "استشارة متقدمة",
    price: "5000 دج",
    duration: "ساعتان",
    description: "استشارة شاملة مع تحليل مفصل وخطة عمل مخصصة",
    features: [
      "تحليل شامل للتربة والمحاصيل",
      "خطة زراعية مفصلة لـ 6 أشهر",
      "برنامج تسميد مخصص",
      "متابعة أسبوعية عبر الهاتف",
      "تقرير مكتوب مفصل"
    ],
    popular: true,
    icon: CheckCircle,
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "استشارة شاملة",
    price: "12000 دج",
    duration: "يوم كامل",
    description: "خدمة استشارية متكاملة مع زيارة ميدانية وخطة سنوية",
    features: [
      "زيارة ميدانية للمزرعة",
      "تحليل شامل للتربة والمياه",
      "خطة زراعية سنوية مفصلة",
      "برنامج مكافحة الآفات",
      "متابعة شهرية لمدة سنة",
      "تدريب للعمال الزراعيين"
    ],
    popular: false,
    icon: DollarSign,
    color: "bg-purple-500"
  }
];

const consultationProcess = [
  {
    step: 1,
    title: "احجز استشارتك",
    description: "اختر نوع الخدمة المناسبة واحجز موعداً مع خبرائنا"
  },
  {
    step: 2,
    title: "التقييم الأولي",
    description: "نقوم بتقييم حالة مزرعتك ومعرفة احتياجاتك الخاصة"
  },
  {
    step: 3,
    title: "الخطة المخصصة",
    description: "نعد لك خطة عمل مفصلة ومخصصة لظروفك الزراعية"
  },
  {
    step: 4,
    title: "التنفيذ والمتابعة",
    description: "نساعدك في تنفيذ الخطة ونتابع التقدم المحرز معك"
  }
];

export default function Section4Services() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            باقات الخدمات الاستشارية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
            اختر الباقة التي تناسب احتياجاتك الزراعية وابدأ رحلتك نحو النجاح
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 relative ${
                service.popular ? 'border-green-400 scale-105' : 'border-gray-100 hover:border-green-200'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                  الأكثر شعبية
                </div>
              )}

              {/* Service Icon */}
              <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Service Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                  {service.name}
                </h3>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {service.price}
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </div>
                <p className="text-gray-600 mb-6" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-right">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                service.popular 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
                احجز الآن
              </button>
            </motion.div>
          ))}
        </div>

        {/* Consultation Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            كيف تعمل خدمة الاستشارة؟
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {consultationProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {process.step}
                </div>
                
                {/* Connection Line */}
                {index < consultationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-green-200 -z-10"></div>
                )}
                
                <h4 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                  {process.title}
                </h4>
                <p className="text-gray-600 text-sm" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}