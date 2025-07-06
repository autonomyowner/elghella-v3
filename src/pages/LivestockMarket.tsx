import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMarketplaceModal } from "../context/MarketplaceModalContext";

// Mock data for livestock listings
const livestockListings = [
  {
    id: 1,
    type: "أبقار",
    image: "/assets/Homepage/hero.svg",
    location: "البويرة",
    weight: "450 كجم",
    price: "850,000 دج",
    description: "أبقار سمنة ممتازة للذبح"
  },
  {
    id: 2,
    type: "أغنام",
    image: "/assets/Homepage/hero.svg",
    location: "الجزائر",
    weight: "35 كجم",
    price: "45,000 دج",
    description: "أغنام صغيرة صحية"
  },
  {
    id: 3,
    type: "دجاج",
    image: "/assets/Homepage/hero.svg",
    location: "وهران",
    weight: "2.5 كجم",
    price: "8,000 دج",
    description: "دجاج لاحم عالي الجودة"
  },
  {
    id: 4,
    type: "أبقار",
    image: "/assets/Homepage/hero.svg",
    location: "قسنطينة",
    weight: "380 كجم",
    price: "720,000 دج",
    description: "أبقار حليب منتجة"
  }
];

const LivestockMarket = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { openAddListingModal } = useMarketplaceModal();
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedState, setSelectedState] = useState("الكل");
  const [priceRange, setPriceRange] = useState("الكل");

  const handleAuthAction = (action: string) => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
    }
    if (action === "add-listing") {
      openAddListingModal();
      return;
    }
    // Handle other authenticated actions here
    console.log(`Authenticated user performing: ${action}`);
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url('/assets/Homepage/sheep1.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-gray-900/10 z-0" />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 font-NeoSansArabicBlack text-white">
              🐄 سوق المواشي
            </h1>
            <p className="text-xl mb-8 font-NeoSansArabicMedium max-w-3xl mx-auto text-white">
              منصة متكاملة لبيع وشراء المواشي والاستثمار في القطاع الزراعي
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleAuthAction("start-investment")}
                className="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-all duration-300 font-NeoSansArabicBold"
              >
                ابدأ الاستثمار
              </button>
              <button
                onClick={() => handleAuthAction("add-listing")}
                className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all duration-300 font-NeoSansArabicBold"
              >
                أضف إعلانك
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-NeoSansArabicMedium text-gray-800 bg-white"
              >
                <option value="الكل" className="text-gray-800 bg-white">نوع المواشي</option>
                <option value="أبقار" className="text-gray-800 bg-white">أبقار</option>
                <option value="أغنام" className="text-gray-800 bg-white">أغنام</option>
                <option value="دجاج" className="text-gray-800 bg-white">دجاج</option>
                <option value="خيول" className="text-gray-800 bg-white">خيول</option>
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-NeoSansArabicMedium text-gray-800 bg-white"
              >
                <option value="الكل" className="text-gray-800 bg-white">الولاية</option>
                <option value="الجزائر" className="text-gray-800 bg-white">الجزائر</option>
                <option value="البويرة" className="text-gray-800 bg-white">البويرة</option>
                <option value="وهران" className="text-gray-800 bg-white">وهران</option>
                <option value="قسنطينة" className="text-gray-800 bg-white">قسنطينة</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-NeoSansArabicMedium text-gray-800 bg-white"
              >
                <option value="الكل" className="text-gray-800 bg-white">نطاق السعر</option>
                <option value="0-10000" className="text-gray-800 bg-white">أقل من 10,000 دج</option>
                <option value="10000-50000" className="text-gray-800 bg-white">10,000 - 50,000 دج</option>
                <option value="50000-200000" className="text-gray-800 bg-white">50,000 - 200,000 دج</option>
                <option value="200000+" className="text-gray-800 bg-white">أكثر من 200,000 دج</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-center md:text-right font-NeoSansArabicBlack">
              إعلانات المواشي المتاحة
            </h2>
            <button
              onClick={() => navigate('/publiclistings')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 font-NeoSansArabicBold text-lg shadow-md"
            >
              اذهب إلى سوق الإعلانات العامة
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {livestockListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img 
                    src={listing.image} 
                    alt={listing.type}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-gray-800">{listing.type}</h3>
                  <p className="text-gray-700 mb-2 font-NeoSansArabicMedium">{listing.description}</p>
                  <div className="space-y-1 text-sm text-gray-600 font-NeoSansArabicRegular">
                    <p>📍 {listing.location}</p>
                    <p>⚖️ الوزن: {listing.weight}</p>
                    <p className="text-green-600 font-bold text-lg">💰 {listing.price}</p>
                  </div>
                  <button
                    onClick={() => handleAuthAction("view-details")}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 font-NeoSansArabicMedium"
                  >
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Section */}
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 font-NeoSansArabicBlack">
              💰 استثمر في المواشي
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4 font-NeoSansArabicBold">
                  مثال على العائد على الاستثمار
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">📈 25%</div>
                    <div className="text-sm">متوسط العائد السنوي</div>
                  </div>
                  <div className="rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">⏱️ 12 شهر</div>
                    <div className="text-sm">فترة الاستثمار</div>
                  </div>
                  <div className="rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">🛡️ 100%</div>
                    <div className="text-sm">ضمان رأس المال</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleAuthAction("start-investment")}
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-all duration-300 font-NeoSansArabicBold text-lg"
                >
                  ابدأ الاستثمار الآن
                </button>
                <button
                  onClick={() => handleAuthAction("learn-more")}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-600 transition-all duration-300 font-NeoSansArabicBold text-lg"
                >
                  اعرف المزيد
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 font-NeoSansArabicBlack text-green-800">
            مميزات سوق المواشي
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-green-800">أمان تام</h3>
              <p className="text-gray-700 font-NeoSansArabicMedium">
                جميع المعاملات مؤمنة ومضمونة
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-green-800">سهولة الاستخدام</h3>
              <p className="text-gray-700 font-NeoSansArabicMedium">
                واجهة سهلة وبسيطة للجميع
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-green-800">عوائد مجزية</h3>
              <p className="text-gray-700 font-NeoSansArabicMedium">
                استثمارات مربحة ومضمونة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockMarket;