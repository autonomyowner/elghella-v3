import { useEffect, useState } from "react";
import { fetchLands } from "../api/LandApi";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../api/myProductApi";
import HeroImage from "../assets/Profile/profile.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendMessage } from "../api/messagesApi";
import ChatBox from "../components/ChatBox";

export default function PublicListings() {
  const [products, setProducts] = useState<Product[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [lands, setLands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Filters and search
  const [search, setSearch] = useState("");
  const [productType, setProductType] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [landType, setLandType] = useState("");
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Fetch all items
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all products
        const { data: productsData, error: prodErr } = await supabase
          .from("products")
          .select("*");
        if (prodErr) throw prodErr;
        setProducts(productsData || []);

        // Fetch all equipment
        const { data: equipmentData, error: eqErr } = await supabase
          .from("equipments")
          .select("*");
        if (eqErr) throw eqErr;
        setEquipment(equipmentData || []);

        // Fetch all lands
        const landsData = await fetchLands();
        setLands(landsData || []);
      } catch (err: any) {
        setError("فشل في تحميل العناصر العامة");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Filtered lists
  const filteredProducts = products.filter(
    (prod) =>
      (!productType || prod.type === productType) &&
      (!search || prod.name.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredEquipment = equipment.filter(
    (eq) =>
      (!equipmentType || eq.type === equipmentType) &&
      (!search || eq.name.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredLands = lands.filter(
    (land) =>
      (!landType || land.type === landType) &&
      (!search || (land.name || land.title || "").toLowerCase().includes(search.toLowerCase()))
  );

  // Helper to open modal with post details
  const openModal = (post: any, type: string) => {
    setSelectedPost({ ...post, _type: type });
    setModalOpen(true);
    setMessage("");
    setMessageSent(false);
    setChatOpen(false);
  };

  // Helper to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
    setMessage("");
    setMessageSent(false);
  };

  // Simulate sending a message (replace with backend integration)
  const handleSendMessage = async () => {
    if (!message.trim() || !user || !user.userId || !selectedPost) return;
    setSending(true);
    setSendError(null);
    try {
      // Find receiver_id (seller) from post
      const receiver_id = selectedPost.user_id;
      if (!receiver_id) throw new Error("لا يمكن تحديد البائع لهذا الإعلان.");
      await sendMessage({
        sender_id: user.userId as string,
        receiver_id,
        post_id: selectedPost.id || selectedPost.equipmentId || selectedPost.landId,
        post_type: selectedPost._type,
        content: message,
      });
      setMessageSent(true);
    } catch (err: any) {
      setSendError(err.message || "فشل في إرسال الرسالة");
    } finally {
      setSending(false);
    }
  };

  // Delete post handler
  const handleDeletePost = async () => {
    if (!selectedPost) return;
    if (!user || !user.userId) {
      alert("يجب تسجيل الدخول لحذف منشور.");
      return;
    }
    // Only allow owner to delete
    if (selectedPost.user_id !== user.userId) {
      alert("يمكنك فقط حذف منشوراتك.");
      return;
    }
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا المنشور؟")) return;
    try {
      if (selectedPost._type === "product") {
        await import("../api/myProductApi").then(api => api.deleteProductApi(selectedPost.id));
        setProducts(products.filter(p => p.id !== selectedPost.id));
      } else if (selectedPost._type === "equipment") {
        await import("../api/myEquipmentApi").then(api => api.deleteEquipmentApi(selectedPost.id));
        setEquipment(equipment.filter(e => e.id !== selectedPost.id));
      } else if (selectedPost._type === "land") {
        await import("../api/myLandApi").then(api => api.deleteLandApi(selectedPost.id));
        setLands(lands.filter(l => l.id !== selectedPost.id));
      }
      closeModal();
    } catch (err) {
      alert("فشل حذف المنشور. حاول مرة أخرى.");
      console.error(err);
    }
  };

  return (
    <section dir="rtl" className="relative min-h-screen flex flex-col">
      {/* Modal for post details and messaging */}
      {modalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
            <button onClick={closeModal} className="absolute left-4 top-4 text-gray-400 hover:text-red-400 text-2xl">×</button>
            <h3 className="text-xl font-bold text-green-400 mb-2 text-center">تفاصيل الإعلان</h3>
            {/* Show image if available */}
            {selectedPost._type === "equipment" && Array.isArray(selectedPost.images) && selectedPost.images.length > 0 ? (
              <img src={selectedPost.images[0]} alt={selectedPost.name} className="w-full h-40 object-cover rounded mb-2" />
            ) : null}
            <div className="mb-2 text-white">
              <div className="font-bold">{selectedPost.name || selectedPost.title || "بدون اسم"}</div>
              <div className="text-sm text-gray-300">{selectedPost.type || "نوع غير محدد"}</div>
              {selectedPost.price && <div className="text-green-400">{selectedPost.price} دج</div>}
              {selectedPost.quantity && <div className="text-gray-400">الكمية: {selectedPost.quantity}</div>}
              {selectedPost.condition && <div className="text-gray-400">{selectedPost.condition}</div>}
              {selectedPost.description && <div className="text-gray-400">{selectedPost.description}</div>}
            </div>
            {/* Delete button for owner */}
            {user && selectedPost.user_id === user.userId && (
              <button
                onClick={handleDeletePost}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded mb-2 mt-2"
              >
                حذف المنشور
              </button>
            )}
            {/* Message form */}
            <div className="mt-4">
              <h4 className="text-green-300 font-bold mb-2">مراسلة البائع</h4>
              {user ? (
                !chatOpen ? (
                  <>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={3}
                      className="w-full p-2 rounded bg-gray-800 border border-green-400 text-white mb-2"
                      placeholder="اكتب رسالتك هنا..."
                      disabled={sending || messageSent}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mb-2"
                      disabled={messageSent || sending}
                    >
                      {sending ? "...جاري الإرسال" : messageSent ? "تم الإرسال!" : "إرسال رسالة"}
                    </button>
                    <button
                      onClick={() => setChatOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mb-2"
                    >
                      فتح المحادثة
                    </button>
                    {sendError && <div className="text-red-400 text-center">{sendError}</div>}
                    {messageSent && <div className="text-green-400 text-center">تم إرسال رسالتك بنجاح.</div>}
                  </>
                ) : (
                  <ChatBox
                    otherUserId={selectedPost.user_id}
                    postId={selectedPost.id || selectedPost.equipmentId || selectedPost.landId}
                    postType={selectedPost._type}
                    onClose={() => setChatOpen(false)}
                  />
                )
              ) : (
                <div className="text-yellow-400 text-center">يجب تسجيل الدخول لإرسال رسالة.</div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 flex-grow container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-NeoSansArabicBlack text-green-200 drop-shadow-lg">
            جميع المنتجات والمعدات والأراضي
          </h2>
          <Link to="/profile" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 font-NeoSansArabicBold">
            الملف الشخصي
          </Link>
        </div>
        {/* Search and Filters */}
        <div className="bg-gray-900 bg-opacity-80 p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="بحث بالاسم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-green-400 bg-gray-800 text-white focus:outline-none"
          />
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="px-4 py-2 rounded border border-green-400 bg-gray-800 text-white focus:outline-none"
          >
            <option value="">كل أنواع المنتجات</option>
            <option value="الحبوب">الحبوب</option>
            <option value="الخضروات">الخضروات</option>
            <option value="الفواكه">الفواكه</option>
            <option value="الأعلاف">الأعلاف</option>
            <option value="المكسرات">المكسرات</option>
          </select>
          <select
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            className="px-4 py-2 rounded border border-green-400 bg-gray-800 text-white focus:outline-none"
          >
            <option value="">كل أنواع المعدات</option>
            <option value="جرار">جرار</option>
            <option value="معدات حصاد">معدات حصاد</option>
            <option value="معدات الري">معدات الري</option>
            <option value="أدوات عامة">أدوات عامة</option>
            <option value="حصادة">حصادة</option>
          </select>
          <select
            value={landType}
            onChange={(e) => setLandType(e.target.value)}
            className="px-4 py-2 rounded border border-green-400 bg-gray-800 text-white focus:outline-none"
          >
            <option value="">كل أنواع الأراضي</option>
            <option value="زراعية">زراعية</option>
            <option value="صناعية">صناعية</option>
            <option value="سكنية">سكنية</option>
            <option value="تجارية">تجارية</option>
          </select>
        </div>
        {loading ? (
          <p className="text-gray-300 font-NeoSansArabicLight text-center">جاري تحميل العناصر...</p>
        ) : error ? (
          <p className="text-red-400 font-NeoSansArabicRegular text-center">{error}</p>
        ) : (
          <div className="space-y-12">
            {/* Products */}
            <div>
              <h4 className="text-lg font-bold text-green-400 mb-4">جميع المنتجات</h4>
              {filteredProducts.length === 0 ? (
                <p className="text-gray-400">لا يوجد منتجات.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                  {filteredProducts.map((prod) => (
                    <div key={prod.id} className="bg-gray-900 rounded-lg p-2 flex flex-col items-center shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => openModal(prod, "product")}>
                      <div className="w-full h-24 bg-gray-800 rounded mb-2 flex items-center justify-center overflow-hidden">
                        <span className="text-gray-500 text-4xl">🛒</span>
                      </div>
                      <span className="font-bold text-white text-sm truncate w-full text-center">{prod.name}</span>
                      <span className="text-gray-300 text-xs">{prod.type}</span>
                      <span className="text-green-400 text-xs">{prod.price} دج</span>
                      <span className="text-gray-400 text-xs">الكمية: {prod.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Equipment */}
            <div>
              <h4 className="text-lg font-bold text-green-400 mb-4">جميع المعدات</h4>
              {filteredEquipment.length === 0 ? (
                <p className="text-gray-400">لا يوجد معدات.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                  {filteredEquipment.map((eq) => (
                    <div key={eq.id} className="bg-gray-900 rounded-lg p-2 flex flex-col items-center shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => openModal(eq, "equipment")}>
                      <div className="w-full h-24 bg-gray-800 rounded mb-2 flex items-center justify-center overflow-hidden">
                        {Array.isArray(eq.images) && eq.images.length > 0 ? (
                          <img src={eq.images[0]} alt={eq.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-500 text-4xl">🛠️</span>
                        )}
                      </div>
                      <span className="font-bold text-white text-sm truncate w-full text-center">{eq.name}</span>
                      <span className="text-gray-300 text-xs">{eq.type}</span>
                      <span className="text-green-400 text-xs">{eq.price} دج</span>
                      <span className="text-gray-400 text-xs">{eq.condition}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Lands */}
            <div>
              <h4 className="text-lg font-bold text-green-400 mb-4">جميع الأراضي</h4>
              {filteredLands.length === 0 ? (
                <p className="text-gray-400">لا يوجد أراضي.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                  {filteredLands.map((land) => (
                    <div key={land.id} className="bg-gray-900 rounded-lg p-2 flex flex-col items-center shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => openModal(land, "land")}>
                      <div className="w-full h-24 bg-gray-800 rounded mb-2 flex items-center justify-center overflow-hidden">
                        <span className="text-gray-500 text-4xl">🌱</span>
                      </div>
                      <span className="font-bold text-white text-sm truncate w-full text-center">{land.name || land.title || "أرض بدون اسم"}</span>
                      <span className="text-gray-300 text-xs">{land.type || "نوع غير محدد"}</span>
                      <span className="text-green-400 text-xs">{land.price ? `${land.price} دج` : ""}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
