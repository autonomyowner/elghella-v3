const OffersSection = () => (
  <section aria-label="العروض" className="mb-10">
    <div className="flex flex-col gap-8 md:flex-row justify-between items-stretch">
      {/* Seedlings Offer */}
      <div className="flex-1 rounded-xl shadow-lg overflow-hidden border-2 border-green-500 group transition-transform duration-300 hover:scale-105 relative min-h-[350px] flex flex-col justify-end">
        <img
          src="/assets/Homepage/trees.png"
          alt="شتلات زراعية"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
        <div className="relative z-20 p-8 text-right flex flex-col items-end justify-end h-full">
          <h3 className="text-2xl md:text-3xl font-bold font-['NeoSansArabicMedium'] text-green-200 mb-2 drop-shadow-lg">
            نوفر لك أفضل الشتلات... إلى باب مزرعتك
          </h3>
          <p className="text-base md:text-lg text-gray-100 rtl leading-relaxed font-['NeoSansArabicLight'] mb-2 drop-shadow">
            في بداية كل موسم فلاحي، الشتلات الجيدة تصنع الفارق.
            <br />
            نحن نوفر لك أجود الشتلات من مشاتل موثوقة عبر مختلف ولايات الوطن:
          </p>
          <ul className="text-green-300 mb-2 text-right list-disc pr-6 drop-shadow">
            <li>شتلات خضر</li>
            <li>أشجار فواكه</li>
            <li>أشجار مثمرة موسمية أو دائمة</li>
          </ul>
          <p className="text-green-100 mb-2 drop-shadow">
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
          <p className="text-green-200 font-bold mt-2 drop-shadow">
            ابدأ موسك الفلاحي بثقة... ونحن معك خطوة بخطوة.
          </p>
        </div>
      </div>
      {/* Transport Offer */}
      <div className="flex-1 rounded-xl shadow-lg overflow-hidden border-2 border-green-500 group transition-transform duration-300 hover:scale-105 relative min-h-[350px] flex flex-col justify-end">
        <img
          src="/assets/Homepage/west.png"
          alt="شاحنة التوصيل"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
        <div className="relative z-20 p-8 text-right flex flex-col items-end justify-end h-full">
          <h3 className="text-2xl md:text-3xl font-bold font-['NeoSansArabicMedium'] text-green-200 mb-2 drop-shadow-lg">
            خدمة التوصيل من المزرعة إلى الباب
          </h3>
          <p className="text-base md:text-lg text-gray-100 rtl leading-relaxed font-['NeoSansArabicLight'] mb-2 drop-shadow">
            عندك منتوج فلاحي وتحتاج توصلو لزبونك؟
            <br />
            نحن في ElGhella نوفر لك خدمة توصيل موثوقة، سريعة وآمنة، من أرضك مباشرة إلى باب الزبون، مهما كانت المسافة.
          </p>
          <ul className="text-green-300 mb-2 text-right list-disc pr-6 drop-shadow">
            <li>نوع المنتوج</li>
            <li>نقطة الانطلاق (البلدية والولاية)</li>
            <li>نقطة الوصول</li>
            <li>الكمية التقريبية</li>
            <li>الوقت المطلوب للتوصيل</li>
          </ul>
          <p className="text-green-100 mb-2 drop-shadow">
            ⏰ التوصيل متاح يوميًا من 08:00 إلى 18:00
            <br />
            📱 للتواصل: 0797339451
          </p>
          <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300 shadow-lg">
            تواصل معنا
          </button>
          <p className="text-green-200 font-bold mt-2 drop-shadow">
            خدمة مثالية للفلاحين، التجار، وأصحاب المطاعم. دعنا نوصّل عنك، وركّز أنت على الإنتاج.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default OffersSection; 