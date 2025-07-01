import React from "react";

const seedlings = [
  {
    name: "شتلات طماطم \"أكزونا\" – Axona",
    emoji: "🍅",
    description: "شتلة قوية ومبكرة، مناسبة للمناخ الجزائري، تعطي إنتاج وفير وجودة عالية.",
    features: [
      "مثالية للزراعة المكشوفة أو البيوت البلاستيكية",
      "متوفرة بكميات صغيرة أو كبيرة حسب الطلب",
    ],
    image: null, // Add image path later
  },
  {
    name: "شتلات فلفل \"كابيا\" – Kabia",
    emoji: "🫑",
    description: "نوع معروف في الجزائر بطعمه الحلو وشكله الطويل.",
    features: [
      "مقاومة للأمراض",
      "إنتاج منتظم",
      "مناسبة للزراعة الموسمية",
    ],
    image: null,
  },
  {
    name: "شتلات خيار \"بلدي\"",
    emoji: "🥒",
    description: "خيار جزائري طبيعي بطعم مميز ومطلوب في الأسواق المحلية.",
    features: [
      "تنمو بسرعة",
      "تتأقلم مع مختلف أنواع التربة",
      "مثالية للزراعة في ولايات الشمال والوسط",
    ],
    image: null,
  },
  {
    name: "شتلات فراولة \"كليري\" – Clery",
    emoji: "🍓",
    description: "نوع ممتاز من الفراولة الإيطالية، يزرع بكثرة في الجزائر.",
    features: [
      "طعم حلو وقوام متماسك",
      "إنتاج مبكر",
      "تُزرع في فصل الربيع وتحتاج عناية بسيطة",
    ],
    image: null,
  },
  {
    name: "شتلات شجرة خوخ \"الذهبي\"",
    emoji: "🍑",
    description: "شتلات قوية لشجرة الخوخ ذات الثمار الكبيرة واللحم الأصفر.",
    features: [
      "مقاومة نسبية للجفاف",
      "تنجح جيدًا في المناطق الداخلية من الجزائر",
      "تُثمر بعد سنتين إلى ثلاث سنوات",
    ],
    image: null,
  },
  {
    name: "شتلات شجرة زيتون \"سيقواز\" – Sigoise",
    emoji: "🌰",
    description: "أشهر صنف زيتون جزائري، مثالي لإنتاج الزيت أو الزيتون المخلل.",
    features: [
      "مقاومة للحرارة والجفاف",
      "إنتاج ثابت كل عام",
      "أصلها من منطقة سيق (ولاية معسكر)",
    ],
    image: null,
  },
  {
    name: "شتلات أشجار ليمون \"بيانتا\" – Biantha",
    emoji: "🌳",
    description: "نوع سريع النمو وغزير الإنتاج.",
    features: [
      "مناسب للمناخ المتوسطي",
      "يُستخدم في العصائر والطهي",
      "متوفر بأحجام مختلفة",
    ],
    image: null,
  },
];

const SeedlingsPage = () => {
  return (
    <div className="min-h-screen bg-green-950 py-12 px-4 sm:px-6 lg:px-8 text-right dir-rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-2">
          🌿 أنواع الشتلات المتوفرة
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {seedlings.map((item, idx) => (
            <div
              key={idx}
              className="bg-green-900 bg-opacity-95 rounded-2xl shadow-xl border-2 border-green-700 hover:border-green-400 transition-all duration-300 flex flex-col items-end p-6 group relative overflow-hidden"
            >
              {/* Placeholder for image */}
              <div className="w-full h-40 bg-green-800 rounded-xl mb-4 flex items-center justify-center text-5xl">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span>{item.emoji}</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-green-200 mb-2">{item.name}</h2>
              <p className="text-green-100 mb-2">{item.description}</p>
              <ul className="mb-2 text-green-300 text-sm list-disc pr-4">
                {item.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto bg-green-900 bg-opacity-95 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-200 mb-6">طلب الشتلات</h2>
          <p className="mb-4 text-green-100 text-lg">
            يمكنك هنا طلب الشتلات التي تحتاجها لمزرعتك. يرجى تعبئة النموذج أدناه وسنتواصل معك في أقرب وقت.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-green-300 font-semibold mb-1">نوع الشتلة</label>
              <input type="text" className="w-full border border-green-700 rounded-lg p-2 bg-green-800 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="مثال: شتلات خضر، أشجار فواكه..." />
            </div>
            <div>
              <label className="block text-green-300 font-semibold mb-1">الكمية المطلوبة</label>
              <input type="number" className="w-full border border-green-700 rounded-lg p-2 bg-green-800 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="عدد الشتلات" />
            </div>
            <div>
              <label className="block text-green-300 font-semibold mb-1">معلومات إضافية</label>
              <textarea className="w-full border border-green-700 rounded-lg p-2 bg-green-800 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400" rows={3} placeholder="ملاحظات أو تفاصيل إضافية"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300 shadow-lg mt-4">
              إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SeedlingsPage;
