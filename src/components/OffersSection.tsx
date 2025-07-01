const OffersSection = () => (
  <section aria-label="العروض" className="mb-10">
    <div className="flex flex-col gap-8 md:flex-row justify-between items-stretch">
      {/* Seedlings Offer */}
      <div className="flex-1 bg-green-900 bg-opacity-90 rounded-xl shadow-lg flex flex-col md:flex-row items-stretch overflow-hidden border-2 border-green-500 group transition-transform duration-300 hover:scale-105">
        <div className="w-full aspect-video md:w-1/3 flex-shrink-0 flex flex-col items-center justify-center">
          <img
            src="/assets/Homepage/west.jpg"
            alt="شتلات زراعية"
            className="w-full h-full object-cover rounded-t-xl md:rounded-none md:rounded-r-lg transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <img
            src="/assets/Homepage/landrent-icon.svg"
            alt="شتلات أيقونة"
            className="w-16 h-16 object-contain mt-2"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col items-end justify-start pt-8 px-6 text-right">
          <h3 className="text-2xl font-bold font-['NeoSansArabicMedium'] text-green-200 mb-2">
            نوفر لك أفضل الشتلات... إلى باب مزرعتك
          </h3>
          <p className="text-base text-gray-300 rtl leading-relaxed font-['NeoSansArabicLight'] mb-2">
            في بداية كل موسم فلاحي، الشتلات الجيدة تصنع الفارق.
            <br />
            نحن نوفر لك أجود الشتلات من مشاتل موثوقة عبر مختلف ولايات الوطن:
          </p>
          <ul className="text-green-300 mb-2 text-right list-disc pr-6">
            <li>شتلات خضر</li>
            <li>أشجار فواكه</li>
            <li>أشجار مثمرة موسمية أو دائمة</li>
          </ul>
          <p className="text-green-100 mb-2">
            📦 حدّد نوع الشتلة والكمية، ونحن نتكفل بالحجز والتوصيل إلى باب مزرعتك.
            <br />
            اوقات العمل 24/7
            <br />
            📱 للتواصل: 0797339451
          </p>
          <button
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300 shadow-lg"
            onClick={() => (window.location.href = "/SeedlingsPage")}
          >
            اطلب الآن
          </button>
          <p className="text-green-200 font-bold mt-2">
            ابدأ موسك الفلاحي بثقة... ونحن معك خطوة بخطوة.
          </p>
        </div>
      </div>
      {/* Transport Offer */}
      <div className="flex-1 bg-gray-900 bg-opacity-90 rounded-xl shadow-lg flex flex-col md:flex-row items-stretch overflow-hidden border-2 border-green-500 group transition-transform duration-300 hover:scale-105">
        <div className="w-full aspect-video md:w-1/3 flex-shrink-0 flex flex-col items-center justify-center">
          <img
            src="/assets/Homepage/west.png"
            alt="شاحنة التوصيل"
            className="w-full h-full object-cover rounded-t-xl md:rounded-none md:rounded-r-lg transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <img
            src="/assets/Homepage/machinerent-icon.svg"
            alt="أيقونة التوصيل"
            className="w-16 h-16 object-contain mt-2"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col items-end justify-start pt-8 px-6 text-right">
          <h3 className="text-2xl font-bold font-['NeoSansArabicMedium'] text-green-200 mb-2">
            خدمة التوصيل من المزرعة إلى الباب
          </h3>
          <p className="text-base text-gray-300 rtl leading-relaxed font-['NeoSansArabicLight'] mb-2">
            عندك منتوج فلاحي وتحتاج توصلو لزبونك؟
            <br />
            نحن في ElGhella نوفر لك خدمة توصيل موثوقة، سريعة وآمنة، من أرضك مباشرة إلى باب الزبون، مهما كانت المسافة.
          </p>
          <ul className="text-green-300 mb-2 text-right list-disc pr-6">
            <li>نوع المنتوج</li>
            <li>نقطة الانطلاق (البلدية والولاية)</li>
            <li>نقطة الوصول</li>
            <li>الكمية التقريبية</li>
            <li>الوقت المطلوب للتوصيل</li>
          </ul>
          <p className="text-green-100 mb-2">
            ⏰ التوصيل متاح يوميًا من 08:00 إلى 18:00
            <br />
            📱 للتواصل: 0797339451
          </p>
          <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300 shadow-lg">
            تواصل معنا
          </button>
          <p className="text-green-200 font-bold mt-2">
            خدمة مثالية للفلاحين، التجار، وأصحاب المطاعم. دعنا نوصّل عنك، وركّز أنت على الإنتاج.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default OffersSection; 