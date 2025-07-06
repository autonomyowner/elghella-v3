import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMarketplaceModal } from "../context/MarketplaceModalContext";

const BeekeepingServices = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { openAddListingModal } = useMarketplaceModal();

  const handleAuthAction = (action: string) => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
    }
    if (action === "buy-hives" || action === "sell-honey") {
      openAddListingModal();
      return;
    }
    // Handle other authenticated actions here
    console.log(`Authenticated user performing: ${action}`);
  };

  const services = [
    {
      id: 1,
      title: "شراء خلايا النحل",
      description: "احصل على خلايا نحل عالية الجودة مع ضمان الصحة والإنتاجية",
      icon: "🐝",
      features: [
        "خلايا نحل معتمدة",
        "ضمان الصحة",
        "شهادة الجودة",
        "خدمة التوصيل"
      ],
      price: "من 15,000 دج",
      action: "شراء خلايا"
    },
    {
      id: 2,
      title: "بيع العسل الطبيعي",
      description: "بيع عسل النحل الطبيعي عالي الجودة للمستهلكين والمتاجر",
      icon: "🍯",
      features: [
        "عسل طبيعي 100%",
        "شهادات الجودة",
        "تسويق مجاني",
        "أسعار تنافسية"
      ],
      price: "من 2,500 دج/كجم",
      action: "بيع العسل"
    },
    {
      id: 3,
      title: "خدمات استشارية",
      description: "استشارات وتدريب متخصص في مجال تربية النحل وإدارة المناحل",
      icon: "📚",
      features: [
        "استشارات مجانية",
        "تدريب عملي",
        "متابعة مستمرة",
        "شهادات معتمدة"
      ],
      price: "من 5,000 دج",
      action: "احجز استشارة"
    }
  ];

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url('/assets/Homepage/n7l1.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/10 to-orange-50/10 z-0" />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white py-20 rounded-b-3xl shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 font-NeoSansArabicBlack">
              🍯 تربية النحل
            </h1>
            <p className="text-xl mb-8 font-NeoSansArabicMedium max-w-3xl mx-auto">
              خدمات متكاملة لتربية النحل وإنتاج العسل الطبيعي عالي الجودة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleAuthAction("buy-hives")}
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-all duration-300 font-NeoSansArabicBold"
              >
                شراء خلايا النحل
              </button>
              <button
                onClick={() => handleAuthAction("sell-honey")}
                className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all duration-300 font-NeoSansArabicBold"
              >
                بيع العسل
              </button>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 font-NeoSansArabicBlack text-orange-900">
            خدماتنا في مجال تربية النحل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white/40 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 font-NeoSansArabicBold text-orange-900">{service.title}</h3>
                  <p className="text-gray-700 mb-4 font-NeoSansArabicMedium">{service.description}</p>
                  <div className="text-2xl font-bold text-orange-600 mb-4">{service.price}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700 font-NeoSansArabicRegular">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAuthAction(service.action.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors duration-300 font-NeoSansArabicBold"
                >
                  {service.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16 rounded-3xl shadow-lg mx-2">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 font-NeoSansArabicBlack text-white">
              مميزات تربية النحل
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-transparent rounded-lg p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-yellow-900">دخل إضافي</h3>
                <p className="text-gray-700 text-sm">مصدر دخل مستقر ومربح</p>
              </div>
              <div className="bg-transparent rounded-lg p-6">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-yellow-900">صديق للبيئة</h3>
                <p className="text-gray-700 text-sm">يساعد في تلقيح النباتات</p>
              </div>
              <div className="bg-transparent rounded-lg p-6">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-yellow-900">سهولة الإدارة</h3>
                <p className="text-gray-700 text-sm">لا يحتاج مساحة كبيرة</p>
              </div>
              <div className="bg-transparent rounded-lg p-6">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-yellow-900">نمو مستمر</h3>
                <p className="text-gray-700 text-sm">سوق متنامي للعسل الطبيعي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Training Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white/40 backdrop-blur-md rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-NeoSansArabicBlack">
                  🎓 برامج التدريب والتعليم
                </h2>
                <p className="text-gray-600 mb-6 font-NeoSansArabicMedium">
                  نقدم برامج تدريبية شاملة للمبتدئين والمتقدمين في مجال تربية النحل
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                    <span className="font-NeoSansArabicMedium text-gray-800">أساسيات تربية النحل</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                    <span className="font-NeoSansArabicMedium text-gray-800">إدارة المناحل</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                    <span className="font-NeoSansArabicMedium text-gray-800">إنتاج وتعبئة العسل</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">4</div>
                    <span className="font-NeoSansArabicMedium text-gray-800">التسويق والمبيعات</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAuthAction("book-training")}
                  className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all duration-300 font-NeoSansArabicBold"
                >
                  احجز مكانك في التدريب
                </button>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">📚</div>
                <div className="bg-orange-100/40 backdrop-blur-md rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-orange-900">مدة التدريب</h3>
                  <p className="text-2xl font-bold text-orange-600">4 أسابيع</p>
                  <p className="text-sm text-gray-800 mt-2">3 ساعات أسبوعياً</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100 py-16 rounded-3xl shadow-lg mx-2">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 font-NeoSansArabicBlack text-orange-900">
              احصل على استشارة مجانية
            </h2>
            <p className="text-gray-800 mb-8 font-NeoSansArabicMedium max-w-2xl mx-auto">
              تواصل مع خبرائنا للحصول على استشارة مجانية حول تربية النحل وإدارة المناحل
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleAuthAction("free-consultation")}
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all duration-300 font-NeoSansArabicBold text-lg"
              >
                احجز استشارة مجانية
              </button>
              <button
                onClick={() => handleAuthAction("contact-expert")}
                className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 font-NeoSansArabicBold text-lg"
              >
                تواصل مع خبير
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeekeepingServices;