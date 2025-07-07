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
              منصة متكاملة لبيع وشراء المواشي
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
        <div className="py-8 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-6 font-NeoSansArabicBold text-gray-800">
              تصفية النتائج
            </h3>
            <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2 font-NeoSansArabicMedium">نوع المواشي</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-NeoSansArabicMedium text-gray-800 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-w-[150px]"
                >
                  <option value="الكل" className="text-gray-800 bg-white">جميع الأنواع</option>
                  <option value="أبقار" className="text-gray-800 bg-white">🐄 أبقار</option>
                  <option value="أغنام" className="text-gray-800 bg-white">🐑 أغنام</option>
                  <option value="دجاج" className="text-gray-800 bg-white">🐔 دجاج</option>
                  <option value="خيول" className="text-gray-800 bg-white">🐎 خيول</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2 font-NeoSansArabicMedium">الولاية</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-NeoSansArabicMedium text-gray-800 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-w-[150px]"
                >
                  <option value="الكل" className="text-gray-800 bg-white">جميع الولايات</option>
                  <option value="الجزائر" className="text-gray-800 bg-white">الجزائر</option>
                  <option value="البويرة" className="text-gray-800 bg-white">البويرة</option>
                  <option value="وهران" className="text-gray-800 bg-white">وهران</option>
                  <option value="قسنطينة" className="text-gray-800 bg-white">قسنطينة</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2 font-NeoSansArabicMedium">نطاق السعر</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-NeoSansArabicMedium text-gray-800 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-w-[150px]"
                >
                  <option value="الكل" className="text-gray-800 bg-white">جميع الأسعار</option>
                  <option value="0-10000" className="text-gray-800 bg-white">💰 أقل من 10,000 دج</option>
                  <option value="10000-50000" className="text-gray-800 bg-white">💰 10,000 - 50,000 دج</option>
                  <option value="50000-200000" className="text-gray-800 bg-white">💰 50,000 - 200,000 دج</option>
                  <option value="200000+" className="text-gray-800 bg-white">💰 أكثر من 200,000 دج</option>
                </select>
              </div>
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
              <div key={listing.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-green-400 group">
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={listing.image} 
                    alt={listing.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {listing.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3 font-NeoSansArabicBold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                    {listing.type}
                  </h3>
                  <p className="text-gray-700 mb-4 font-NeoSansArabicMedium leading-relaxed">
                    {listing.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 font-NeoSansArabicRegular mb-4">
                    <div className="flex items-center">
                      <span className="w-6 text-center">📍</span>
                      <span className="mr-2">{listing.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 text-center">⚖️</span>
                      <span className="mr-2">الوزن: {listing.weight}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="text-2xl font-bold text-green-600">
                      {listing.price}
                    </div>
                    <button
                      onClick={() => handleAuthAction("view-details")}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 font-NeoSansArabicMedium font-bold shadow-md"
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
              <h3 className="text-xl font-bold mb-2 font-NeoSansArabicBold text-green-800">أسعار تنافسية</h3>
              <p className="text-gray-700 font-NeoSansArabicMedium">
                أفضل الأسعار في السوق
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockMarket;