import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, Leaf, Users, TrendingUp, Award } from "lucide-react";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";

const stats = [
  { icon: Users, value: "10,000+", label: "مستخدم نشط" },
  { icon: Leaf, value: "5,000+", label: "منتج زراعي" },
  { icon: TrendingUp, value: "95%", label: "رضا العملاء" },
  { icon: Award, value: "3+", label: "سنوات خبرة" }
];

const heroImages = [
  "/assets/Homepage/hero.webp",
  "/assets/Homepage/agriculture.webp",
  "/assets/Homepage/farming.webp"
];

export default function Section1Hero({ id = "hero" }: { id?: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // TODO: Implement search functionality
    console.log("Searching for:", value);
  };

  return (
    <section 
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900"
    >
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 0.3 : 0 
            }}
            transition={{ duration: 1 }}
          >
            <img
              src={image}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo and Title */}
          <div className="space-y-4">
            <motion.img
              src="/assets/Homepage/logo.svg"
              alt="الغلة"
              className="h-20 mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ fontFamily: "'NeoSansArabicBold', sans-serif" }}
            >
              منصة <span className="text-green-400">الغلة</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ fontFamily: "'NeoSansArabicMedium', sans-serif" }}
            >
              منصتك الشاملة للمنتجات الزراعية الطبيعية والخدمات الاستشارية المتخصصة
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <SearchInput
              value={searchValue}
              onChange={handleSearch}
              placeholder="ابحث عن المنتجات والخدمات الزراعية..."
              className="text-lg"
            />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("services")}
              className="min-w-[200px]"
            >
              استكشف خدماتنا
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("our-story")}
              className="min-w-[200px] border-white text-white hover:bg-white hover:text-green-900"
            >
              تعرف علينا
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                <stat.icon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-green-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("services")}
            className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm">اكتشف المزيد</span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
