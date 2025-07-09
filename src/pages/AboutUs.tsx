import { useState } from "react";
import { Helmet } from "react-helmet";

// Team data - only 3 key members
const teamMembers = [
  {
    id: 1,
    name: "إسلام زلاق",
    title: "CEO",
    titleEn: "Chief Executive Officer",
    image: "/assets/Homepage/islam.jpg", // Actual image for Islam
    bio: "المدير التنفيذي (CEO أو المدير العام) - الدور: هو القائد الأعلى المسؤول عن رسم التوجهات العامة واتخاذ القرارات الكبرى. أهميته: يحدد رؤية الشركة، يقود الفرق، يمثل الشركة أمام الشركاء والمستثمرين.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "عصام دواودة",
    title: "CFO",
    titleEn: "Chief Financial Officer",
    image: "/assets/Homepage/issam.jpg", // Actual image for Issam
    bio: "المسؤول المالي (CFO أو المحاسب الرئيسي) - الدور: يدير الأمور المالية والمحاسبية ويشرف على الميزانيات والمصاريف والاستثمارات. أهميته: يحافظ على استقرار الشركة المالي ويضمن اتخاذ قرارات مبنية على أرقام واقعية.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: 3,
    name: "عبد النور عيساني",
    title: "CTO",
    titleEn: "Chief Technology Officer",
    image: "/assets/Homepage/nono2.jpg", // Actual image for Nono
    bio: "المسؤول التقني أو الإنتاجي (CTO أو مدير العمليات) - الدور: يشرف على الجانب التقني أو الإنتاجي، حسب طبيعة الشركة (تقنية، صناعية، زراعية…). أهميته: يضمن أن المنتجات أو الخدمات تُنفذ بجودة وكفاءة، ويطور الابتكار الداخلي.",
    social: {
      linkedin: "#",
      github: "#"
    }
  }
];

const AboutUs = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (memberId: number) => {
    setFlippedCards(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <>
      <Helmet>
        <title>من نحن | الغلة - منصة الزراعة الذكية</title>
        <meta
          name="description"
          content="تعرف على قصة الغلة وفريقنا المتخصص في تطوير الحلول الزراعية الذكية لخدمة المزارعين في الجزائر والوطن العربي."
        />
        <meta property="og:title" content="من نحن | الغلة - منصة الزراعة الذكية" />
        <meta
          property="og:description"
          content="تعرف على قصة الغلة وفريقنا المتخصص في تطوير الحلول الزراعية الذكية لخدمة المزارعين في الجزائر والوطن العربي."
        />
        <meta property="og:image" content="/assets/Homepage/hero.svg" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-NeoSansArabicBlack">
                من نحن؟
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed font-NeoSansArabicLight opacity-90">
                نحن فريق من المتخصصين في مجال الزراعة والتكنولوجيا، نسعى لتطوير حلول ذكية تخدم المزارعين وتعزز الإنتاج الزراعي في الجزائر والوطن العربي
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 fill-green-50">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
            </svg>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 font-NeoSansArabicBold">
                  قصتنا
                </h2>
                <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <img 
                    src="/assets/Homepage/trees.webp" 
                    alt="قصة الغلة" 
                    className="rounded-2xl shadow-xl w-full"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 font-NeoSansArabicBold">
                    🌱 البداية
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-NeoSansArabicLight">
                    بدأت فكرة "الغلة" من رؤية بسيطة: كيف يمكننا مساعدة المزارعين في الجزائر على تحسين إنتاجهم باستخدام التكنولوجيا الحديثة؟ 
                    لاحظنا أن هناك فجوة كبيرة بين المزارعين التقليديين والحلول التقنية المتقدمة.
                  </p>
                  <p className="text-gray-600 leading-relaxed font-NeoSansArabicLight">
                    انطلقنا في رحلة لتطوير منصة شاملة تجمع بين الخبرة الزراعية العريقة والتكنولوجيا الذكية، 
                    لنكون الجسر الذي يربط المزارع الجزائري بعالم الزراعة الرقمية.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 md:order-2">
                  <h3 className="text-2xl font-bold text-gray-800 font-NeoSansArabicBold">
                    🎯 رؤيتنا
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-NeoSansArabicLight">
                    نحلم بمستقبل تكون فيه كل مزرعة في الجزائر متصلة رقمياً، حيث يمكن للمزارعين الوصول إلى أفضل الممارسات، 
                    والمعدات، والخبراء، والأسواق بنقرة واحدة.
                  </p>
                  <p className="text-gray-600 leading-relaxed font-NeoSansArabicLight">
                    نسعى لتمكين المزارعين من اتخاذ قرارات مدروسة تعتمد على البيانات والتحليل، 
                    مما يؤدي إلى زيادة الإنتاجية وتحسين جودة المحاصيل.
                  </p>
                </div>
                <div className="md:order-1">
                  <img 
                    src="/assets/Homepage/west.webp" 
                    alt="رؤية الغلة" 
                    className="rounded-2xl shadow-xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 font-NeoSansArabicBold">
                  مهمتنا
                </h2>
                <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-6">🚀</div>
                  <h3 className="text-xl font-bold mb-4 font-NeoSansArabicBold">
                    الابتكار
                  </h3>
                  <p className="leading-relaxed font-NeoSansArabicLight">
                    تطوير حلول تقنية مبتكرة تلبي احتياجات المزارعين المحليين وتساهم في تطوير القطاع الزراعي
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-6">🤝</div>
                  <h3 className="text-xl font-bold mb-4 font-NeoSansArabicBold">
                    الشراكة
                  </h3>
                  <p className="leading-relaxed font-NeoSansArabicLight">
                    بناء شراكات قوية مع المزارعين والخبراء والموردين لخلق نظام بيئي زراعي متكامل
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-6">🌍</div>
                  <h3 className="text-xl font-bold mb-4 font-NeoSansArabicBold">
                    الاستدامة
                  </h3>
                  <p className="leading-relaxed font-NeoSansArabicLight">
                    تعزيز الممارسات الزراعية المستدامة التي تحافظ على البيئة وتضمن الأمن الغذائي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 font-NeoSansArabicBold">
                  فريقنا القيادي
                </h2>
                <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-NeoSansArabicLight">
                  تعرف على القادة الذين يقودون رؤية الغلة نحو مستقبل زراعي أكثر ذكاء
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {teamMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="group perspective-1000 h-96"
                    onClick={() => handleCardClick(member.id)}
                  >
                    <div className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer
                      ${flippedCards.includes(member.id) ? 'rotate-y-180' : ''}
                      md:hover:rotate-y-180`}
                    >
                      {/* Front Side - Photo Only */}
                      <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x400/16a34a/ffffff?text=" + encodeURIComponent(member.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold font-NeoSansArabicBold">
                            {member.name}
                          </h3>
                          <p className="text-sm opacity-90 font-NeoSansArabicLight">
                            {member.title}
                          </p>
                        </div>
                        {/* Flip Indicator */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Back Side - Information */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-600 to-green-800 text-white">
                        <div className="p-6 h-full flex flex-col justify-center">
                          <div className="text-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center">
                              <span className="text-2xl font-bold">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold">
                              {member.name}
                            </h3>
                            <p className="text-sm opacity-90 font-NeoSansArabicMedium mb-1">
                              {member.title}
                            </p>
                            <p className="text-xs opacity-75 font-NeoSansArabicLight">
                              {member.titleEn}
                            </p>
                          </div>
                          
                          <div className="flex-1 flex items-center">
                            <p className="text-sm leading-relaxed font-NeoSansArabicLight text-center">
                              {member.bio}
                            </p>
                          </div>
                          
                          <div className="flex justify-center gap-4 mt-6">
                            {member.social.linkedin && (
                              <a 
                                href={member.social.linkedin}
                                className="text-white hover:text-green-200 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                                </svg>
                              </a>
                            )}
                            {member.social.twitter && (
                              <a 
                                href={member.social.twitter}
                                className="text-white hover:text-green-200 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                                </svg>
                              </a>
                            )}
                            {member.social.github && (
                              <a 
                                href={member.social.github}
                                className="text-white hover:text-green-200 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {/* Back flip indicator */}
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Instructions */}
              <div className="text-center mt-12">
                <p className="text-gray-500 text-sm font-NeoSansArabicLight">
                  <span className="hidden md:inline">مرر الماوس فوق الصورة</span>
                  <span className="md:hidden">اضغط على الصورة</span>
                  {" "}لمعرفة المزيد عن عضو الفريق
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 font-NeoSansArabicBold">
                انضم إلى فريقنا
              </h2>
              <p className="text-xl mb-8 font-NeoSansArabicLight">
                هل تشاركنا الرؤية؟ نحن نبحث دائماً عن أشخاص موهوبين ومتحمسين للانضمام إلى رحلتنا في تطوير الزراعة الذكية
              </p>
              <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg font-NeoSansArabicBold">
                تواصل معنا الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
