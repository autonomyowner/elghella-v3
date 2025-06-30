import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getExpertsApi } from "../../api/getExpertsApi";

export default function ExpertsList() {
  const [experts, setExperts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getExpertsApi()
      .then(setExperts)
      .catch((err) => setError(err.message));
  }, []);

  const filtered = experts.filter(
    (e) =>
      e.name.includes(search) ||
      e.prename.includes(search) ||
      e.wilaya.includes(search) ||
      e.skills.includes(search)
  );

  return (
    <section className="py-16 md:py-20 text-right dir-rtl font-['NeoSansArabicRegular']">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">قائمة الخبراء الفلاحيين</h2>
        <div className="flex justify-end mb-8">
          <Link
            to="/experts/add"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg font-['NeoSansArabicBold']"
          >
            انضم كخبير
          </Link>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث بالاسم أو الولاية أو المهارات"
          className="mb-8 w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg"
          dir="rtl"
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((expert) => (
            <div key={expert.id} className="bg-gray-900 rounded-lg p-6 shadow-lg flex flex-col items-center">
              <img
                src={expert.image_url}
                alt={expert.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-green-600"
              />
              <h3 className="text-xl font-bold text-white mb-1">{expert.name} {expert.prename}</h3>
              <div className="text-green-400 mb-1">{expert.wilaya}</div>
              <div className="text-gray-300 mb-2">{expert.skills}</div>
              <div className="text-gray-400 text-sm mb-2">{expert.description}</div>
              <div className="text-white font-bold mt-2">📧 {expert.email}</div>
              <div className="text-white font-bold">📞 {expert.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
