import { motion } from "framer-motion";
import { Star, MapPin, Phone, Mail } from "lucide-react";

const experts = [
  {
    id: 1,
    name: "د. أحمد محمود",
    title: "خبير في المحاصيل الحقلية",
    specialization: "القمح والشعير والذرة",
    experience: "12 سنة",
    rating: 4.9,
    location: "الجزائر العاصمة",
    image: "/assets/Homepage/expertise.svg",
    phone: "+213 555 0101",
    email: "ahmed.mahmoud@elghella.com",
    achievements: ["دكتوراه في الزراعة", "200+ استشارة ناجحة", "خبير معتمد"]
  },
  {
    id: 2,
    name: "د. فاطمة الزهراء",
    title: "متخصصة في البساتين",
    specialization: "الحمضيات والفواكه",
    experience: "10 سنوات",
    rating: 4.8,
    location: "بليدة",
    image: "/assets/Homepage/expertise.svg",
    phone: "+213 555 0102",
    email: "fatima.zahra@elghella.com",
    achievements: ["ماجستير في علوم البساتين", "150+ مزرعة فواكه", "خبيرة في الري"]
  },
  {
    id: 3,
    name: "م. يوسف العربي",
    title: "مهندس زراعي",
    specialization: "الخضروات المحمية",
    experience: "8 سنوات",
    rating: 4.7,
    location: "وهران",
    image: "/assets/Homepage/expertise.svg",
    phone: "+213 555 0103",
    email: "youssef.arabi@elghella.com",
    achievements: ["مهندس زراعي معتمد", "100+ بيت محمي", "خبير في التقنيات الحديثة"]
  }
];

export default function Section3Experts() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            فريق الخبراء المعتمدين
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
            تعرف على خبرائنا المتخصصين في مختلف المجالات الزراعية الذين سيساعدونك في تحقيق أهدافك
          </p>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:border-green-200"
            >
              {/* Expert Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-all duration-300">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-4xl">👨‍🌾</div>';
                    }}
                  />
                </div>
                
                {/* Rating Badge */}
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {expert.rating}
                </div>
              </div>

              {/* Expert Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                  {expert.name}
                </h3>
                <p className="text-green-600 font-semibold mb-1" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
                  {expert.title}
                </p>
                <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
                  {expert.specialization}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {expert.location}
                  </div>
                  <div>
                    خبرة {expert.experience}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-700 mb-3">الإنجازات:</h4>
                <div className="space-y-2">
                  {expert.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold">
                  <Phone className="w-4 h-4" />
                  اتصال
                </button>
                <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold">
                  <Mail className="w-4 h-4" />
                  رسالة
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
              هل تريد الانضمام لفريق الخبراء؟
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: "'NeoSansArabicRegular', sans-serif" }}>
              إذا كنت خبيراً زراعياً معتمداً وتريد مشاركة خبرتك مع المزارعين
            </p>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
              انضم كخبير
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}