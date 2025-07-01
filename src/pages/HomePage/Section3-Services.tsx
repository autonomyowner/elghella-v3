import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const services = [
  {
    title: "كراء اراضي فلاحية",
    description:
      "تمتع بامكانية كراء اراضي فلاحية واسعة لضمان عمليات زراعية سلسة",
    image: "/assets/Homepage/trees.webp",
    icon: "/assets/Homepage/landrent-icon.svg",
    route: "/land-rent",
  },
  {
    title: "منتجات زراعية طازجة",
    description:
      "تواصل مباشرة مع الفلاحين المحليين للمنتاجات الطازجة من الحقل مباشرة اليك",
    image: "/assets/Homepage/greengrocer.svg",
    icon: "/assets/Homepage/greengrocer-icon.svg",
    route: "/greengrocer",
  },
  {
    title: "خدمات استشارية فلاحية متخصصة",
    description:
      "احصل على نصائح من خبراء فلاحين المتمرسين لزيادة أنتاجية مزرعتك و استدامتها",
    image: "/assets/Homepage/expertise.svg",
    icon: "/assets/Homepage/expertise-icon.svg",
    route: "/expertise", // You can update this to the appropriate route
  },
  {
    title: "تأجير معدات فلاحية",
    description:
      "تمتع بامكانية كراء مجموعة واسعة من الأدوات و الألات الفلاحية لضمان عمليات زراعية سلسة",
    image: "/assets/Homepage/machinerent.svg",
    icon: "/assets/Homepage/machinerent-icon.svg",
    route: "/machine-rent",
  },
];

const Section3Services = ({ id }: { id?: string }) => {
  const navigate = useNavigate();

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <Helmet>
        <title>خدماتنا الزراعية | الغلة</title>
        <meta name="description" content="اكتشف خدمات الغلة الزراعية: كراء الأراضي، كراء المعدات، استشارات الخبراء، ومنتجات طبيعية عالية الجودة." />
        <meta property="og:title" content="خدماتنا الزراعية | الغلة" />
        <meta property="og:description" content="اكتشف خدمات الغلة الزراعية: كراء الأراضي، كراء المعدات، استشارات الخبراء، ومنتجات طبيعية عالية الجودة." />
        <meta property="og:image" content="/assets/Homepage/trees.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_DZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="خدماتنا الزراعية | الغلة" />
        <meta name="twitter:description" content="اكتشف خدمات الغلة الزراعية: كراء الأراضي، كراء المعدات، استشارات الخبراء، ومنتجات طبيعية عالية الجودة." />
        <meta name="twitter:image" content="/assets/Homepage/trees.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "خدماتنا الزراعية | الغلة",
          "description": "اكتشف خدمات الغلة الزراعية: كراء الأراضي، كراء المعدات، استشارات الخبراء، ومنتجات طبيعية عالية الجودة.",
          "url": "https://elghella.com/services"
        })}</script>
      </Helmet>
      <div id={id} className="py-16 md:py-20 font-['NeoSansArabicRegular']">
        {" "}
        {/* Title "خدماتنا" */}
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold font-['NeoSansArabicBold'] text-green-200 mb-4 leading-tight">
            خدماتنا
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-['NeoSansArabicLight']">
            نقدم مجموعة متكاملة من الخدمات الزراعية لدعم المزارعين وتعزيز
            الإنتاجية
          </p>
        </div>
        {/* Services Grid */}
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service.route)}
              className="cursor-pointer w-full max-w-[399.98px] h-[461.78px] bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center relative overflow-hidden group"
            >
              {/* Top Section: Image */}
              <div className="w-full h-[50%] flex justify-center items-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 opacity-20"></div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Overlapping Icon */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[80px] h-[80px] flex justify-center items-center">
                <img
                  src={service.icon}
                  alt="Icon"
                  className="w-[80px] h-[80px] object-contain transition-transform duration-300 hover:rotate-12"
                />
              </div>

              {/* Bottom Section: Text */}
              <div className="w-full h-[50%] flex flex-col items-end justify-start pt-12 px-4">
                <h3 className="text-xl font-semibold font-['NeoSansArabicMedium'] text-green-200 text-right mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-right text-gray-300 rtl leading-relaxed font-['NeoSansArabicLight']">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Section3Services;
