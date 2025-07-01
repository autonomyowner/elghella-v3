import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExpertsApi } from "../../api/getExpertsApi";
import ChatBox from "../../components/ChatBox";
import { useAuth } from "../../context/AuthContext";

export default function ExpertsList() {
  const [experts, setExperts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [chatExpertId, setChatExpertId] = useState<string | null>(null);
  const { user } = useAuth();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((expert) => (
            <div key={expert.id} className="bg-gray-900 rounded-lg p-10 shadow-lg flex flex-col items-center min-w-[350px] max-w-[500px] w-full">
              <img
                src={expert.image_url}
                alt={expert.name}
                className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-green-600"
              />
              <h3 className="text-xl font-bold text-white mb-1">{expert.name} {expert.prename}</h3>
              <div className="text-green-400 mb-1">{expert.wilaya}</div>
              <div className="text-gray-300 mb-2">{expert.skills}</div>
              <div className="text-gray-400 text-sm mb-2">{expert.description}</div>
              <div className="text-white font-bold mt-2">📧 {expert.email}</div>
              <div className="text-white font-bold">📞 {expert.phone}</div>
              {user && user.userId !== expert.id && (
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300 shadow-lg"
                  onClick={() => {
                    console.log('Open chat with expert.id:', expert.id, 'user.userId:', user.userId);
                    setChatExpertId(expert.id);
                  }}
                >
                  إرسال رسالة
                </button>
              )}
            </div>
          ))}
        </div>
        {chatExpertId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 rounded-lg shadow-xl p-4 max-w-lg w-full relative">
              <button
                className="absolute top-2 left-2 text-white text-2xl"
                onClick={() => setChatExpertId(null)}
                aria-label="إغلاق المحادثة"
              >
                ×
              </button>
              <ChatBox otherUserId={chatExpertId} postId={""} postType={""} onClose={() => setChatExpertId(null)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
