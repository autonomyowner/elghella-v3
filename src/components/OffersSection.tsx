const OffersSection = () => (
  <section aria-label="العروض" className="mb-10">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8">
      {/* Seedlings Offer */}
      <div className="w-full max-w-lg h-auto rounded-xl shadow-lg overflow-hidden border-2 border-green-500 group transition-transform duration-300 hover:scale-105 relative min-h-[350px] flex flex-col justify-end">
        <img
          src="/assets/Homepage/trees.webp"
          alt="شتلات زراعية"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
        <div className="relative z-20 p-6 md:p-8 text-right flex flex-col items-end justify-end h-full">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-['NeoSansArabicMedium'] text-green-200 mb-3 drop-shadow-lg leading-tight">
            نوفر لك أفضل الشتلات... إلى باب مزرعتك
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-100 rtl leading-relaxed font-['NeoSansArabicLight'] mb-3 drop-shadow">
            في بداية كل موسم فلاحي، الشتلات الجيدة تصنع الفارق.
            <br />
            نحن نوفر لك أجود الشتلات من مشاتل موثوقة عبر مختلف ولايات الوطن:
          </p>
          <ul className="text-green-300 mb-3 text-right list-disc pr-6 drop-shadow text-sm md:text-base">
            <li>شتلات خضر</li>
            <li>أشجار فواكه</li>
            <li>أشجار مثمرة موسمية أو دائمة</li>
          </ul>
          <p className="text-green-100 mb-3 drop-shadow text-sm md:text-base leading-relaxed">
            📦 حدّد نوع الشتلة والكمية، ونحن نتكفل بالحجز والتوصيل إلى باب مزرعتك.
            <br />
            اوقات العمل 24/7
            <br />
            📱 للتواصل: 0797339451
          </p>
          <button
            className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 md:px-6 rounded transition-colors duration-300 shadow-lg text-sm md:text-base"
            onClick={() => (window.location.href = "/SeedlingsPage")}
          >
            اطلب الآن
          </button>
          <p className="text-green-200 font-bold mt-3 drop-shadow text-sm md:text-base leading-tight">
            ابدأ موسك الفلاحي بثقة... ونحن معك خطوة بخطوة.
          </p>
        </div>
      </div>
      {/* Transport Offer */}
      <div className="w-full max-w-lg h-auto rounded-xl shadow-lg overflow-hidden border-2 border-green-500 group transition-transform duration-300 hover:scale-105 relative min-h-[350px] flex flex-col justify-end">
        <img
          src="/assets/Homepage/west.webp"
          alt="شاحنة التوصيل"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
        <div className="relative z-20 p-6 md:p-8 text-right flex flex-col items-end justify-end h-full">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-['NeoSansArabicMedium'] text-green-200 mb-3 drop-shadow-lg leading-tight">
            خدمة التوصيل من المزرعة إلى الباب
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-100 rtl leading-relaxed font-['NeoSansArabicLight'] mb-3 drop-shadow">
            عندك منتوج فلاحي وتحتاج توصلو لزبونك؟
            <br />
            نحن في ElGhella نوفر لك خدمة توصيل موثوقة، سريعة وآمنة، من أرضك مباشرة إلى باب الزبون، مهما كانت المسافة.
          </p>
          <ul className="text-green-300 mb-3 text-right list-disc pr-6 drop-shadow text-sm md:text-base">
            <li>نوع المنتوج</li>
            <li>نقطة الانطلاق (البلدية والولاية)</li>
            <li>نقطة الوصول</li>
            <li>الكمية التقريبية</li>
            <li>الوقت المطلوب للتوصيل</li>
          </ul>
          <p className="text-green-100 mb-3 drop-shadow text-sm md:text-base leading-relaxed">
            ⏰ التوصيل متاح يوميًا من 08:00 إلى 18:00
            <br />
            📱 للتواصل: 0797339451
          </p>
          <button className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 md:px-6 rounded transition-colors duration-300 shadow-lg text-sm md:text-base">
            تواصل معنا
          </button>
          <p className="text-green-200 font-bold mt-3 drop-shadow text-sm md:text-base leading-tight">
            خدمة مثالية للفلاحين، التجار، وأصحاب المطاعم. دعنا نوصّل عنك، وركّز أنت على الإنتاج.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default OffersSection; 