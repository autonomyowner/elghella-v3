import React, { useState } from "react";

const roadmap = [
  { 
    quarter: "Q1 2026", 
    title: "إطلاق خدمات الطائرات المسيرة",
    description: "خدمات الرش والمراقبة بالطائرات المسيرة",
    icon: "🚁",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    quarter: "Q2 2026", 
    title: "بداية تقنيات الزراعة الدقيقة",
    description: "الذكاء الاصطناعي لتحسين الإنتاجية",
    icon: "🎯",
    color: "from-green-500 to-emerald-500"
  },
  { 
    quarter: "Q3 2026", 
    title: "المراقبة الجوية المتقدمة",
    description: "مراقبة مستمرة من السماء",
    icon: "📡",
    color: "from-purple-500 to-indigo-500"
  },
  { 
    quarter: "Q4 2026", 
    title: "خدمات إضافية وتوسعات",
    description: "توسع في الخدمات والتقنيات",
    icon: "🌱",
    color: "from-orange-500 to-red-500"
  },
];

const services = [
  {
    id: 1,
    title: "خدمات الرش بالطائرات المسيرة",
    subtitle: "رش دقيق وفعال للمحاصيل",
    icon: "🚁",
    features: [
      "رش دقيق ومتوازن للمحاصيل",
      "توفير 90% من الوقت مقارنة بالطرق التقليدية",
      "تغطية شاملة حتى في المناطق الصعبة",
      "استخدام أمثل للمبيدات والأسمدة",
      "مراقبة GPS للدقة المطلقة"
    ],
    timeline: "الربع الأول 2026",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    id: 2,
    title: "تقنيات الزراعة الدقيقة",
    subtitle: "ذكاء اصطناعي لتحسين الإنتاجية",
    icon: "🎯",
    features: [
      "تحليل التربة بالذكاء الاصطناعي",
      "توصيات مخصصة للري والتسميد",
      "خرائط دقيقة للحقول والمحاصيل",
      "تنبؤات الطقس والآفات",
      "تتبع النمو والإنتاجية"
    ],
    timeline: "منتصف 2026",
    color: "from-green-500 to-orange-500",
    bgColor: "from-green-50 to-orange-50"
  },
  {
    id: 3,
    title: "المراقبة الجوية المتقدمة",
    subtitle: "مراقبة مستمرة من السماء",
    icon: "📡",
    features: [
      "مراقبة 24/7 للحقول والمواشي",
      "كشف المشاكل قبل ظهورها",
      "تصوير حراري ومتعدد الأطياف",
      "تقارير مفصلة ودورية",
      "تنبيهات فورية للمشاكل"
    ],
    timeline: "الربع الثالث 2026",
    color: "from-orange-500 to-blue-500",
    bgColor: "from-orange-50 to-blue-50"
  }
];

export default function FutureServices() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative overflow-x-hidden">
      {/* Fullsite Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 min-w-full min-h-full"
        style={{ left: 0, top: 0 }}
      >
        <source src="/assets/Homepage/Videoplayback5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* No overlay for full video visibility */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden p-0 m-0">
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white text-sm font-bold rounded-full px-6 py-2 mb-6 animate-pulse shadow-lg border border-white/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              قريباً 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl font-NeoSansArabicBlack mb-6 animate-fade-in leading-tight">
              خدمات مستقبلية
              <span className="block bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                مبتكرة
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-NeoSansArabicMedium animate-fade-in-slow mb-4 max-w-4xl leading-relaxed">
              اكتشف التقنيات الثورية القادمة إلى منصة الغلة - من الطائرات المسيرة
              إلى الزراعة الدقيقة
            </p>
            <p className="text-lg text-white font-NeoSansArabicRegular animate-fade-in-slow max-w-3xl">
              نحن نعمل على تطوير حلول ذكية ستغير مستقبل الزراعة في الجزائر والمنطقة
            </p>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center w-full px-4 md:px-8 py-8">
          <div className="max-w-7xl w-full">
            {/* Services Overview Card */}
            <div className="rounded-3xl shadow-2xl p-8 border border-white/20 mb-12 animate-fade-in-up bg-transparent backdrop-blur-none">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4 font-NeoSansArabicBlack">
                  الخدمات القادمة
                </h2>
                <p className="text-xl text-white font-NeoSansArabicMedium max-w-3xl mx-auto">
                  مجموعة متكاملة من التقنيات المتطورة التي ستحدث ثورة في مجال الزراعة
                </p>
              </div>
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`group relative bg-gradient-to-br ${service.bgColor} bg-opacity-30 rounded-2xl p-8 shadow-lg border border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                  >
                    {/* Improved Overlay for Readability */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl"></div>
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl">{service.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 font-NeoSansArabicBlack">
                        {service.title}
                      </h3>
                      <p className="text-white mb-4 font-NeoSansArabicMedium">
                        {service.subtitle}
                      </p>
                      <div className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-white">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}></div>
                            <span className="font-NeoSansArabicRegular">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white bg-black/30 px-3 py-1 rounded-full">
                          {service.timeline}
                        </span>
                        <button className="px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-full font-bold shadow transition-all duration-300">
                          تفاصيل أكثر
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Roadmap Section */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-white mb-8 text-center font-NeoSansArabicBlack">
                  خارطة الطريق 2026
                </h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 transform -translate-y-1/2 hidden md:block opacity-60"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roadmap.map((item) => (
                      <div
                        key={item.quarter}
                        className="relative group"
                      >
                        <div className={`bg-gradient-to-br ${item.color} p-1 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 bg-opacity-40`}>
                          <div className="bg-black/30 rounded-xl p-6 text-center h-full">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-white">
                              {item.icon}
                            </div>
                            <div className="text-lg font-bold text-white mb-2 font-NeoSansArabicBlack">
                              {item.quarter}
                            </div>
                            <div className="text-white font-NeoSansArabicMedium mb-2">
                              {item.title}
                            </div>
                            <div className="text-sm text-white/80 font-NeoSansArabicRegular">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Waitlist CTA */}
              <div className="bg-black/40 rounded-2xl p-8 text-center text-white shadow-2xl animate-fade-in-up">
                <div className="max-w-3xl mx-auto">
                  <h4 className="text-3xl font-bold mb-4 font-NeoSansArabicBlack flex items-center justify-center gap-3">
                    <span className="text-4xl animate-bounce">🚀</span>
                    كن من أول المستفيدين
                  </h4>
                  <p className="text-xl mb-6 font-NeoSansArabicMedium leading-relaxed">
                    اشترك في قائمة الانتظار لتكون أول من يحصل على هذه الخدمات المبتكرة
                  </p>
                  <p className="text-white/80 mb-8 font-NeoSansArabicRegular">
                    هل لديك فكرة أو اقتراح لخدمة مستقبلية؟{" "}
                    <a
                      href="mailto:future@elghella.com"
                      className="underline hover:text-white font-bold transition-colors"
                    >
                      راسلنا
                    </a>
                  </p>
                  <button 
                    onClick={scrollToContact}
                    className="px-8 py-4 bg-black/60 text-white font-bold rounded-full shadow-lg hover:bg-black/80 transition-all duration-300 font-NeoSansArabicBold text-lg animate-pulse"
                  >
                    انضم لقائمة الانتظار
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
