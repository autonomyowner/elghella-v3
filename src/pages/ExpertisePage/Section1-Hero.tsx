import { useState } from "react";
import { useNavigate } from "react-router-dom";
import monitoring from "../../assets/ExpertisePage/Monitoring.jpg";
import maps from "../../assets/ExpertisePage/Maps.jpg";
import climate from "../../assets/ExpertisePage/Climate.png";
import affected from "../../assets/ExpertisePage/Affected.jpg";
import analysis from "../../assets/ExpertisePage/Satanalysis.jpg";
import HeroImage from "../../assets/ExpertisePage/image.png";
import ContactModal from "../../components/CheckoutPopUp";
import { useAuth } from "../../context/AuthContext";

const services = [
  {
    title: "مراقبة صحة المحاصيل",
    description:
      "نستخدم الصور الفضائية لتحليل حالة المحاصيل وكشف الأمراض أو الإجهاد الناتج عن نقص المياه أو العناصر الغذائية. هذا يساعد على اكتشاف المشاكل مبكرًا، مما يقلل من الخسائر ويحسن الإنتاجية وجودة المحاصيل",
    image: monitoring,
    route: "/expertise",
  },
  {
    title: "تحليل الغطاء النباتي",
    description:
      "باستخدام تقنيات متقدمة، نقيم كثافة ونمو النباتات في الحقول. من خلال هذه الدراسة، يمكن تحديد المناطق ذات الإنتاجية العالية والمنخفضة، مما يساعد في تحسين توزيع الموارد مثل الأسمدة والمياه وزيادة الكفاءة الزراعية",
    image: analysis,
    route: "/expertise",
  },
  {
    title: "رصد التغيرات المناخية",
    description:
      "نقدم تقارير دقيقة حول تأثير التغيرات المناخية مثل الجفاف أو الفيضانات على الأراضي الزراعية. يساعد ذلك المزارعين في التخطيط للزراعة بشكل أفضل، وتقليل المخاطر المرتبطة بالكوارث الطبيعية، مما يعزز الاستدامة والإنتاجية",
    image: climate,
    route: "/expertise", // You can update this to the appropriate route
  },
  {
    title: "تصميم خرائط زراعية مخصصة",
    description:
      "ننتج خرائط دقيقة تُظهر توزيع المحاصيل، الإنتاجية المتوقعة، أو المشاكل الموجودة في الحقول. هذه الخرائط تساعد في اتخاذ قرارات زراعية مدروسة وتحسين إدارة الحقول، مما يزيد من الكفاءة ويحسن العوائد",
    image: maps,
    route: "/expertise",
  },
  {
    title: "تحديد المناطق المتضررة",
    description:
      "نقوم بتحديد المناطق المتضررة من الآفات، الأمراض، أو الإجهاد البيئي لمساعدة المزارعين على التدخل بسرعة. من خلال هذه الخدمة، يمكن تقليل انتشار الآفات والأمراض، مما يحمي المحاصيل ويزيد العوائد الزراعية",
    image: affected,
    route: "/expertise",
  },
];
const Section3Services = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true); // Show modal if the user is not authenticated
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleServiceClick = (route: string) => {
    if (isAuthenticated) {
      navigate(route); // Navigate if the user is authenticated
    } else {
      openModal(); // Show modal if the user is not authenticated
    }
  };

  return (
    <div
      id={id}
      className="relative py-16 bg-black md:py-20 font-['NeoSansArabicRegular']"
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroImage})`,
          opacity: 0.4,
        }}
      ></div>

      {/* Title "خدماتنا" */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold font-['NeoSansArabicBold'] text-green-200 mb-4 leading-tight">
          خدمة التحاليل والاستشارات
        </h2>
        <p className="text-sm md:text-lg text-gray-200 leading-relaxed font-NeoSansArabicRegular">
          تهدف هذه الخدمة إلى دعم المزارعين من خلال تقديم استشارات زراعية مبنية
          على تحاليل دقيقة باستخدام أحدث التقنيات مثل الاستشعار عن بُعد وتحليل
          التربة.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-14 flex flex-wrap justify-center gap-6 md:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service.route)} // Trigger the click handler
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

      {!isAuthenticated && (
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default Section3Services;
