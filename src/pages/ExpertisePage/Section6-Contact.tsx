import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Calendar, User, MessageSquare } from "lucide-react";

export default function Section6Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    farmLocation: '',
    cropType: '',
    consultationType: 'quick',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
            احجز استشارتك الآن
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}>
            ابدأ رحلتك نحو زراعة أكثر نجاحاً مع خبرائنا المعتمدين
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
              نموذج طلب الاستشارة
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                      placeholder="0555 00 00 00"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">موقع المزرعة</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="farmLocation"
                      value={formData.farmLocation}
                      onChange={handleInputChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                      placeholder="الولاية والمنطقة"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">نوع المحصول</label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                    required
                  >
                    <option value="">اختر نوع المحصول</option>
                    <option value="wheat">القمح</option>
                    <option value="barley">الشعير</option>
                    <option value="corn">الذرة</option>
                    <option value="vegetables">الخضروات</option>
                    <option value="fruits">الفواكه</option>
                    <option value="citrus">الحمضيات</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">نوع الاستشارة</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleInputChange}
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                    required
                  >
                    <option value="quick">استشارة سريعة (مجاني)</option>
                    <option value="advanced">استشارة متقدمة (5000 دج)</option>
                    <option value="comprehensive">استشارة شاملة (12000 دج)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">رسالة إضافية</label>
                <div className="relative">
                  <MessageSquare className="absolute right-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800"
                    placeholder="اكتب أي تفاصيل إضافية عن احتياجاتك..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
              >
                احجز استشارتك الآن
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                معلومات التواصل
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">اتصل بنا</div>
                    <div className="opacity-90">0798700447</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">راسلنا</div>
                    <div className="opacity-90">islam.zellag@univ-bouira.dz</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">موقعنا</div>
                    <div className="opacity-90">البويرة، الجزائر</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                أوقات العمل
              </h4>
              <div className="space-y-2 opacity-90">
                <div>السبت - الخميس: 8:00 - 17:00</div>
                <div>الجمعة: مغلق</div>
                <div>طوارئ: متاح 24/7</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4" style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}>
                لماذا نحن؟
              </h4>
              <ul className="space-y-2 opacity-90">
                <li>✓ خبراء معتمدون</li>
                <li>✓ استشارة مجانية أولى</li>
                <li>✓ خطط مخصصة</li>
                <li>✓ متابعة مستمرة</li>
                <li>✓ نتائج مضمونة</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}