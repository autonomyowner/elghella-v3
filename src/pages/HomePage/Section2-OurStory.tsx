import story1 from "../../assets/Homepage/story1.svg";
import story2 from "../../assets/Homepage/story2.svg";

const Section2OurStory = ({ id }: { id?: string }) => {
  return (
    <div id={id} className="py-16 md:py-20 font-NeoSansArabicLight">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Left side: Images */}
          <div className="lg:w-1/2 flex justify-center space-x-4 md:space-x-8">
            <div className="w-1/2 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl overflow-hidden">
              <img
                src={story2}
                alt="Story Image 2"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-1/2 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl overflow-hidden">
              <img
                src={story1}
                alt="Story Image 1"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right side: Text */}
          <div className="lg:w-1/2 text-center lg:text-right space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-green-200 mb-4 leading-tight font-NeoSansArabicBlack">
              قصتنا
            </h2>
            <div className="space-y-4">
              <p className="text-base md:text-lg text-gray-300 rtl leading-relaxed font-NeoSansArabicRegular">
                وُلدت فكرتنا من شغفنا العميق بالزراعة والإيمان بأهميتها في بناء
                مستقبل مستدام. لاحظنا الحاجة إلى حلول مبتكرة ومتكاملة تخدم
                المزارعين وتدعم محبي الزراعة لتحقيق أفضل النتائج.
              </p>
              <p className="text-base md:text-lg text-gray-300 rtl leading-relaxed font-NeoSansArabicRegular">
                بدأنا كشركة ناشئة، الأولى من نوعها، لتقديم خدمات زراعية
                واستشارات متخصصة تجمع بين الخبرة التقنية والابتكار. نحن هنا
                لنكون شريكك الموثوق، نقدم الدعم اللازم لتحويل رؤيتك الزراعية إلى
                واقع، سواء كنت مزارعًا خبيرًا أو مبتدئًا في هذا المجال. في
                رحلتنا، نطمح لبناء مجتمع زراعي مستدام ومتقدم، ونؤمن بأن المستقبل
                الأفضل يبدأ بزراعة أفضل.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2OurStory;
