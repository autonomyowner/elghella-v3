import { Helmet } from "react-helmet";

const Section4AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>من نحن | الغلة</title>
        <meta name="description" content="تعرف على فريق الغلة ورؤيتنا في تقديم أفضل المنتجات والخدمات الزراعية في الجزائر." />
        <meta property="og:title" content="من نحن | الغلة" />
        <meta property="og:description" content="تعرف على فريق الغلة ورؤيتنا في تقديم أفضل المنتجات والخدمات الزراعية في الجزائر." />
        <meta property="og:image" content="/assets/Homepage/vr.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_DZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="من نحن | الغلة" />
        <meta name="twitter:description" content="تعرف على فريق الغلة ورؤيتنا في تقديم أفضل المنتجات والخدمات الزراعية في الجزائر." />
        <meta name="twitter:image" content="/assets/Homepage/vr.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "من نحن | الغلة",
          "description": "تعرف على فريق الغلة ورؤيتنا في تقديم أفضل المنتجات والخدمات الزراعية في الجزائر.",
          "url": "https://elghella.com/about-us"
        })}</script>
      </Helmet>
      <div className="py-16 md:py-20 font-['NeoSansArabicRegular']">
        <div className="container mx-auto px-4 max-w-6xl" dir="rtl">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between space-y-8 sm:space-y-0 sm:space-x-12">
            <div className="sm:w-1/2 text-right space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold font-['NeoSansArabicBold'] text-green-200 mb-6 leading-tight">
                عن شركتنا
              </h2>
              <div className="space-y-4">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed font-['NeoSansArabicLight']">
                  نحن شركة ناشئة متخصصة في الزراعة والخدمات الزراعية والاستشارات،
                  نسعى لتمكين المزارعين والأفراد المهتمين بالزراعة من تحقيق
                  إنتاجية أعلى ونتائج مستدامة.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed font-['NeoSansArabicLight']">
                  تأسست شركتنا على أساس رؤية واضحة: تقديم حلول مبتكرة وشاملة تعزز
                  من جودة الإنتاج الزراعي وتدعم مجتمع المزارعين. نحن نؤمن بأن
                  الزراعة ليست مجرد مهنة، بل هي رسالة لبناء مستقبل أكثر خضرة
                  واستدامة.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed font-['NeoSansArabicLight']">
                  فريقنا يضم مجموعة من الخبراء في المجال الزراعي، الذين يجمعون بين
                  المعرفة العملية والرؤية المستقبلية لتقديم خدمات واستشارات مصممة
                  خصيصًا لتلبية احتياجاتك.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed font-['NeoSansArabicLight']">
                  معنا، الزراعة ليست فقط عملًا، بل أسلوب حياة نطمح إلى تحسينه
                  باستمرار.
                </p>
              </div>
            </div>
            <div className="sm:w-1/2 flex justify-center mb-8 sm:mb-0">
              <div className="w-full max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl overflow-hidden">
                <img
                  src="/assets/Homepage/vr.webp"
                  alt="About Us"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4AboutUs;
