import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, Leaf, Users, TrendingUp, Award, Tractor, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";

const stats = [
  { icon: Users, value: "15,000+", label: "مزارع نشط" },
  { icon: Leaf, value: "8,500+", label: "منتج زراعي" },
  { icon: Tractor, value: "2,300+", label: "معدة زراعية" },
  { icon: Sprout, value: "1,200+", label: "خبير زراعي" },
  { icon: TrendingUp, value: "98%", label: "رضا العملاء" },
  { icon: Award, value: "5+", label: "سنوات خبرة" }
];

// Beautiful agricultural background images - FIXED PATHS
const heroImages = [
  {
    src: "/assets/Homepage/trees.webp",
    title: "المناظر الطبيعية الزراعية",
    description: "جمال الطبيعة الزراعية الجزائرية"
  },
  {
    src: "/assets/Homepage/west.webp", 
    title: "المناطق الزراعية الغربية",
    description: "أراضي زراعية خصبة ومتنوعة"
  },
  {
    src: "/assets/Homepage/hero.svg",
    title: "رؤية الغلة الزراعية",
    description: "منصة شاملة للزراعة الحديثة"
  },
  {
    src: "/assets/Homepage/expertise.svg",
    title: "الخبرة الزراعية",
    description: "خدمات استشارية متخصصة"
  },
  {
    src: "/assets/Homepage/greengrocer.svg",
    title: "تجارة المنتجات الزراعية",
    description: "أفضل المنتجات الطبيعية"
  },
  {
    src: "/assets/Homepage/machinerent.svg",
    title: "تأجير المعدات الزراعية",
    description: "معدات حديثة ومتطورة"
  }
];

export default function Section1Hero({ id = "hero" }: { id?: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [, setImageLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      setImageLoaded(false); // Reset for smooth transition
    }, 6000); // Slower transition for better viewing

    return () => clearInterval(interval);
  }, []);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    const img = new Image();
    img.src = heroImages[nextIndex].src;
  }, [currentImageIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    
    // Implement actual search functionality
    if (value.trim()) {
      // Navigate to public listings with search query
      window.location.href = `/public-listings?search=${encodeURIComponent(value.trim())}`;
    }
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <section 
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Images Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={image.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
              onLoad={() => index === currentImageIndex && setImageLoaded(true)}
              onError={(e) => {
                // Fallback to a working image
                e.currentTarget.src = "/assets/Homepage/hero.svg";
              }}
            />
            {/* Enhanced Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-green-900/60" />
          </motion.div>
        ))}
        
        {/* Additional Atmosphere Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Image Info Badge */}
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-8 right-8 bg-black/30 backdrop-blur-sm rounded-lg p-3 text-right"
        >
          <div className="text-sm font-semibold">{currentImage.title}</div>
          <div className="text-xs text-gray-300">{currentImage.description}</div>
        </motion.div>

        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo and Title */}
          <div className="space-y-6">
            <motion.img
              src="/assets/Homepage/logo.svg"
              alt="الغلة"
              className="h-24 mx-auto drop-shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}
            >
              منصة <span className="text-green-400 drop-shadow-lg">الغلة</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-3xl text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}
            >
              منصتك الشاملة للمنتجات الزراعية الطبيعية والخدمات الاستشارية المتخصصة
              <br />
              <span className="text-green-300 text-lg">🌾 من المزرعة إلى المائدة 🌾</span>
            </motion.p>
          </div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <SearchInput
                value={searchValue}
                onChange={handleSearch}
                placeholder="ابحث عن المنتجات والخدمات الزراعية... 🔍"
                className="text-lg shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-green-300">
                اكتشف آلاف المنتجات والخدمات الزراعية
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("services")}
              className="min-w-[250px] text-lg shadow-2xl bg-green-600 hover:bg-green-500 transform hover:scale-105 transition-all duration-300"
              leftIcon={<Leaf className="w-5 h-5" />}
            >
              استكشف خدماتنا الزراعية
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("our-story")}
              className="min-w-[250px] text-lg border-2 border-white text-white hover:bg-white hover:text-green-900 shadow-2xl transform hover:scale-105 transition-all duration-300"
              leftIcon={<Award className="w-5 h-5" />}
            >
              قصة نجاحنا
            </Button>
          </motion.div>

          {/* 🚁 NEW: Upcoming Services Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16"
          >
            <Link
              to="/upcoming-services"
              className="inline-flex items-center bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/20"
            >
              <span className="text-3xl mr-4 animate-bounce">🚁</span>
              <div className="text-center">
                <div className="font-['NeoSansArabicBold'] text-lg">خدمات مستقبلية مبتكرة</div>
                <div className="text-sm opacity-90">طائرات مسيرة | زراعة دقيقة | مراقبة ذكية</div>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs mr-4 animate-pulse font-bold">
                قريباً 2025
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              className="text-center space-y-3 group"
            >
              <div className="mx-auto w-16 h-16 bg-green-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 group-hover:bg-green-400/40 transition-all duration-300 group-hover:scale-110">
                <stat.icon className="w-8 h-8 text-green-300 group-hover:text-green-200 transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-green-300 drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-200 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("services")}
            className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors group"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <span className="text-sm font-medium group-hover:text-green-300 transition-colors">
              اكتشف المزيد
            </span>
            <ChevronDown className="w-6 h-6 group-hover:text-green-300 transition-colors" />
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating agricultural particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 3,
            }}
          >
            {/* Random agricultural icons */}
            {i % 4 === 0 && <Leaf className="w-3 h-3 text-green-400/40" />}
            {i % 4 === 1 && <Sprout className="w-3 h-3 text-green-300/40" />}
            {i % 4 === 2 && <div className="w-2 h-2 bg-green-400/30 rounded-full" />}
            {i % 4 === 3 && <div className="w-1 h-1 bg-yellow-400/40 rounded-full" />}
          </motion.div>
        ))}
      </div>

      {/* Background Image Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-green-400 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
