import { motion } from "framer-motion";
import { Sprout, TrendingUp, Award, Users, Leaf, BarChart3 } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "مزارع راضي" },
  { icon: Sprout, value: "15+", label: "خبير زراعي" },
  { icon: TrendingUp, value: "35%", label: "زيادة الإنتاجية" },
  { icon: Award, value: "8+", label: "سنوات خبرة" }
];

const features = [
  {
    icon: BarChart3,
    title: "تحليل دقيق للتربة",
    description: "فحص شامل لخصائص التربة الكيميائية والفيزيائية لتحديد أفضل المحاصيل المناسبة"
  },
  {
    icon: Leaf,
    title: "استشارات زراعية متخصصة",
    description: "نصائح من خبراء زراعيين معتمدين لتحسين الإنتاجية وجودة المحاصيل"
  },
  {
    icon: TrendingUp,
    title: "خطط التسميد المخصصة",
    description: "برامج تسميد مصممة خصيصاً لنوع المحصول وحالة التربة والظروف المناخية"
  }
];

export default function Section2About() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            لماذا تختار خدماتنا الاستشارية؟
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
            نحن نجمع بين الخبرة العملية والتقنيات الحديثة لتقديم حلول زراعية مبتكرة تضمن نجاح مشروعك الزراعي
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-all duration-300 group-hover:scale-110">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-green-200"
            >
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
              ابدأ رحلتك نحو زراعة أكثر نجاحاً اليوم
            </h3>
            <p className="text-lg opacity-90 mb-6" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
              احصل على استشارة مجانية من خبرائنا المعتمدين
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              استشارة مجانية
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}