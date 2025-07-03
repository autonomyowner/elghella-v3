import { motion } from "framer-motion";
import ImageGallery from "../components/enhanced/ImageGallery";
import { Helmet } from "react-helmet";

// All the beautiful agricultural images from your assets - FIXED PATHS
const galleryImages = [
  // Landscapes
  {
    src: "/assets/Homepage/trees.webp",
    title: "الأشجار والمناظر الطبيعية",
    description: "مناظر طبيعية خلابة تعكس جمال الطبيعة الجزائرية",
    category: "landscapes"
  },
  {
    src: "/assets/Homepage/west.webp",
    title: "المناطق الغربية",
    description: "المناطق الزراعية الغربية الجميلة في الجزائر",
    category: "landscapes"
  },
  
  // Farmlands
  {
    src: "/src/assets/LandRentPage/AddLands/farmlands.jpg",
    title: "الأراضي الزراعية الواسعة",
    description: "أراضي زراعية خصبة مهيأة للإنتاج الزراعي المكثف",
    category: "farmland"
  },
  {
    src: "/src/assets/LandRentPage/AddLands/orchard.jpg",
    title: "البساتين المثمرة",
    description: "بساتين الفواكه المتطورة والمنتجة",
    category: "farmland"
  },
  {
    src: "/src/assets/LandRentPage/AddLands/gardenLand.jpg",
    title: "أراضي البساتين",
    description: "أراضي مخصصة لزراعة البساتين والخضروات",
    category: "farmland"
  },
  {
    src: "/src/assets/LandRentPage/AddLands/pastureLand.jpg",
    title: "أراضي المراعي",
    description: "مراعي طبيعية لتربية المواشي",
    category: "farmland"
  },
  {
    src: "/src/assets/LandRentPage/AddLands/forestLand.jpg",
    title: "الأراضي الحرجية",
    description: "أراضي حرجية محمية وطبيعية",
    category: "landscapes"
  },

  // Fruits & Vegetables
  {
    src: "/src/assets/GreengrocerPage/AddGroceries/fruits.jpg",
    title: "الفواكه الطازجة",
    description: "مجموعة متنوعة من الفواكه الطبيعية الطازجة",
    category: "fruits"
  },
  {
    src: "/src/assets/GreengrocerPage/AddGroceries/Vegetables.jpg",
    title: "الخضروات الطبيعية",
    description: "خضروات طازجة ومغذية من المزارع المحلية",
    category: "vegetables"
  },
  {
    src: "/src/assets/GreengrocerPage/AddGroceries/Nuts.jpg",
    title: "المكسرات والثمار",
    description: "مكسرات وثمار طبيعية غنية بالعناصر الغذائية",
    category: "fruits"
  },
  {
    src: "/src/assets/GreengrocerPage/AddGroceries/Grains.jpg",
    title: "الحبوب والبقوليات",
    description: "حبوب وبقوليات عالية الجودة",
    category: "vegetables"
  },
  {
    src: "/src/assets/GreengrocerPage/AddGroceries/Feed.jpg",
    title: "الأعلاف الطبيعية",
    description: "أعلاف طبيعية للمواشي والدواجن",
    category: "farmland"
  },

  // Technology & Expertise
  {
    src: "/src/assets/ExpertisePage/Climate.png",
    title: "تقنيات المناخ الزراعي",
    description: "تقنيات حديثة لمراقبة المناخ والظروف الزراعية",
    category: "technology"
  },
  {
    src: "/src/assets/ExpertisePage/Monitoring.jpg",
    title: "مراقبة المحاصيل",
    description: "أنظمة مراقبة متطورة لحالة المحاصيل",
    category: "technology"
  },
  {
    src: "/src/assets/ExpertisePage/Analysis.jpg",
    title: "تحليل التربة",
    description: "تحليل علمي دقيق لخصائص التربة الزراعية",
    category: "technology"
  },
  {
    src: "/src/assets/ExpertisePage/Maps.jpg",
    title: "الخرائط الزراعية",
    description: "خرائط تفصيلية للمناطق الزراعية",
    category: "technology"
  },
  {
    src: "/src/assets/ExpertisePage/Satanalysis.jpg",
    title: "التحليل الفضائي",
    description: "تحليل الصور الفضائية للأراضي الزراعية",
    category: "technology"
  },
  {
    src: "/src/assets/ExpertisePage/Affected.jpg",
    title: "مراقبة الآفات",
    description: "رصد ومراقبة الآفات الزراعية",
    category: "technology"
  },

  // SVG Illustrations - Using available assets
  {
    src: "/assets/Homepage/expertise.svg",
    title: "الخبرة الزراعية",
    description: "رسوم توضيحية للخدمات الاستشارية",
    category: "technology"
  },
  {
    src: "/assets/Homepage/greengrocer.svg",
    title: "تجارة المنتجات الزراعية",
    description: "رسوم توضيحية لتجارة المنتجات",
    category: "vegetables"
  },
  {
    src: "/assets/Homepage/machinerent.svg",
    title: "تأجير المعدات الزراعية",
    description: "رسوم توضيحية للمعدات الزراعية",
    category: "technology"
  },
  {
    src: "/assets/Homepage/hero.svg",
    title: "رؤية منصة الغلة",
    description: "رؤية شاملة لمستقبل الزراعة",
    category: "landscapes"
  },
  {
    src: "/assets/Homepage/about-us.svg",
    title: "من نحن",
    description: "قصة منصة الغلة ورؤيتها",
    category: "technology"
  },
  {
    src: "/assets/Homepage/story1.svg",
    title: "قصة النجاح الأولى",
    description: "رحلة التطوير والإنجاز",
    category: "technology"
  },
  {
    src: "/assets/Homepage/story2.svg",
    title: "قصة النجاح الثانية",
    description: "مسيرة النمو والتوسع",
    category: "technology"
  },
  {
    src: "/assets/Homepage/vr.webp",
    title: "التقنيات الحديثة",
    description: "الواقع الافتراضي في الزراعة",
    category: "technology"
  }
];

export default function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>معرض الصور الزراعية | منصة الغلة</title>
        <meta name="description" content="استكشف جمال الطبيعة الزراعية الجزائرية من خلال معرض صور شامل يضم المناظر الطبيعية والمحاصيل والتقنيات الحديثة" />
        <meta property="og:title" content="معرض الصور الزراعية | منصة الغلة" />
        <meta property="og:description" content="مجموعة رائعة من الصور الزراعية تعكس جمال وتنوع القطاع الزراعي في الجزائر" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                معرض الصور الزراعية
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                رحلة بصرية عبر جمال الطبيعة الزراعية الجزائرية
                <br />
                من الأراضي الخصبة إلى التقنيات الحديثة
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  <div className="text-3xl font-bold text-green-600">{galleryImages.length}+</div>
                  <div className="text-gray-600">صورة عالية الجودة</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  <div className="text-3xl font-bold text-green-600">4</div>
                  <div className="text-gray-600">فئات متنوعة</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div className="text-gray-600">محتوى أصلي</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <ImageGallery 
                images={galleryImages}
                title="اكتشف جمال الزراعة الجزائرية"
                className="bg-white rounded-2xl p-8 shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              شارك في بناء مستقبل الزراعة
            </h2>
            <p className="text-xl mb-8 text-green-100">
              انضم إلى مجتمعنا الزراعي واكتشف فرص لا محدودة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                ابدأ رحلتك الزراعية
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                تعرف على خدماتنا
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}