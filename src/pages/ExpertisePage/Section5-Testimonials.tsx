import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "محمد بن علي",
    location: "مدية",
    rating: 5,
    text: "خدمة ممتازة وفريق محترف. ساعدوني في زيادة إنتاجية القمح بنسبة 40% في موسم واحد فقط. أنصح كل مزارع بالاستعانة بخبرائهم المتميزين.",
    crop: "القمح",
    improvement: "40% زيادة في الإنتاجية",
    image: "👨‍🌾"
  },
  {
    id: 2,
    name: "فاطمة الزهراء",
    location: "البليدة",
    rating: 5,
    text: "تجربة رائعة مع فريق الاستشارات. وضعوا لي خطة شاملة لبستان الحمضيات، والنتائج فاقت توقعاتي. الثمار أصبحت أكبر وأجود من السابق.",
    crop: "الحمضيات",
    improvement: "جودة عالية للثمار",
    image: "👩‍🌾"
  },
  {
    id: 3,
    name: "عبد الرحمن حسني",
    location: "سطيف",
    rating: 5,
    text: "استشارة مفصلة وخطة عمل واضحة. تم حل مشكلة آفات الطماطم التي كانت تسبب لي خسائر كبيرة. الآن محصولي أفضل من أي وقت مضى.",
    crop: "الطماطم",
    improvement: "القضاء على الآفات",
    image: "👨‍🌾"
  },
  {
    id: 4,
    name: "أمينة بلعباس",
    location: "عين الدفلى",
    rating: 5,
    text: "فريق مبدع ومتابعة ممتازة. ساعدوني في تحسين نوعية التربة وزيادة خصوبتها، مما انعكس إيجابياً على جميع المحاصيل في مزرعتي.",
    crop: "متنوعة",
    improvement: "تحسين خصوبة التربة",
    image: "👩‍🌾"
  },
  {
    id: 5,
    name: "يوسف معمري",
    location: "تيارت",
    rating: 5,
    text: "خدمة احترافية من الألف إلى الياء. التقرير كان مفصلاً والتوصيات عملية وقابلة للتطبيق. شكراً لكم على المساعدة في تطوير مزرعتي.",
    crop: "الشعير",
    improvement: "نمو صحي للمحاصيل",
    image: "👨‍🌾"
  },
  {
    id: 6,
    name: "سعاد بوعلام",
    location: "الجلفة",
    rating: 5,
    text: "تجربة رائعة! استطعت تقليل تكاليف الإنتاج وزيادة الأرباح بفضل النصائح القيمة. أصبحت أكثر ثقة في إدارة مزرعتي.",
    crop: "الخضروات",
    improvement: "تقليل التكاليف وزيادة الأرباح",
    image: "👩‍🌾"
  }
];

export default function Section5Testimonials() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            قصص نجاح عملائنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
            اكتشف كيف ساعدنا المزارعين في تحقيق نجاحات ملموسة وتحسين إنتاجيتهم الزراعية
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-green-200 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-green-200 group-hover:text-green-300 transition-colors duration-300">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 text-center leading-relaxed" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                "{testimonial.text}"
              </p>

              {/* Improvement Badge */}
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold text-center mb-6">
                {testimonial.improvement}
              </div>

              {/* Client Info */}
              <div className="text-center border-t border-gray-100 pt-6">
                <div className="text-4xl mb-3">{testimonial.image}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-1" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                  {testimonial.location} • محصول: {testimonial.crop}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            إنجازاتنا في أرقام
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">عميل سعيد</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">35%</div>
              <div className="text-lg opacity-90">متوسط زيادة الإنتاجية</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">استشارة مكتملة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">نسبة الرضا</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
              كن أنت القصة التالية للنجاح
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
              احجز استشارتك اليوم وابدأ رحلتك نحو زراعة أكثر نجاحاً ومردودية
            </p>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
              احجز استشارة مجانية
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}