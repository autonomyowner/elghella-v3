import { useEffect, useState } from "react";
import { fetchLands } from "../api/LandApi";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../api/myProductApi";
// import HeroImage from "../assets/Profile/profile.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendMessage } from "../api/messagesApi";
import ChatBox from "../components/ChatBox";
import MarketplaceCard from "../components/MarketplaceCard";
import { useMarketplaceModal } from "../context/MarketplaceModalContext";

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
  const { openAddListingModal, openEditListingModal } = useMarketplaceModal();

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



  // Edit post handler
  const handleEditPost = () => {
    if (!selectedPost) return;
    // Map fields for modal
    let initialData = {
      title: selectedPost.title || selectedPost.name || "",
      type: selectedPost._type === "product" ? "منتج" : selectedPost._type === "equipment" ? "معدات" : "أرض",
      price: selectedPost.price || "",
      location: selectedPost.location || "",
      description: selectedPost.description || "",
      image: Array.isArray(selectedPost.images) ? selectedPost.images[0] : selectedPost.image || ""
    };
    openEditListingModal(initialData);
  };



  return (
    <section dir="rtl" className="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat">
      {/* Floating Add Listing Button */}
      {user && (
        <button
          onClick={openAddListingModal}
          className="fixed bottom-8 left-8 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg px-6 py-3 text-lg font-bold flex items-center gap-2"
        >
          + إضافة إعلان
        </button>
      )}
      {/* Modal for post details and messaging */}
      {modalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
            <button onClick={closeModal} className="absolute left-4 top-4 text-gray-400 hover:text-red-400 text-2xl">×</button>
            <h3 className="text-xl font-bold text-green-400 mb-2 text-center">تفاصيل الإعلان</h3>
            {/* Show image if available (for all types) */}
            {selectedPost.image && (
              <img src={selectedPost.image} alt={selectedPost.name || selectedPost.title} className="w-full h-40 object-cover rounded mb-2" />
            )}
            {Array.isArray(selectedPost.images) && selectedPost.images.length > 0 && !selectedPost.image && (
              <img src={selectedPost.images[0]} alt={selectedPost.name || selectedPost.title} className="w-full h-40 object-cover rounded mb-2" />
            )}
            <div className="mb-2 text-white bg-gray-900 rounded p-2">
              <div className="font-bold">{selectedPost.name || selectedPost.title || "بدون اسم"}</div>
              <div className="text-sm text-gray-300">{selectedPost.type || "نوع غير محدد"}</div>
              {selectedPost.price && <div className="text-green-400">{selectedPost.price} دج</div>}
              {selectedPost.quantity && <div className="text-gray-400">الكمية: {selectedPost.quantity}</div>}
              {selectedPost.condition && <div className="text-gray-400">{selectedPost.condition}</div>}
              {selectedPost.description && <div className="text-gray-400">{selectedPost.description}</div>}
            </div>
            {/* Edit/Delete buttons for owner */}
            {user && selectedPost.user_id === user.userId && (
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleEditPost}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                >
                  تعديل
                </button>
                <button
                  onClick={handleDeletePost}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
                >
                  حذف المنشور
                </button>
              </div>
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
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/Homepage/west.webp"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredProducts.map((prod) => (
                    <MarketplaceCard
                      key={prod.id}
                      image={"https://placehold.co/300x200?text=Product"}
                      title={prod.name}
                      price={prod.price ? prod.price + " دج" : "غير متوفر"}
                      description={prod.description || "لا يوجد وصف"}
                      seller={"مجهول"}
                      onClick={() => openModal(prod, "product")}
                    />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredEquipment.map((eq) => (
                    <MarketplaceCard
                      key={eq.id}
                      image={Array.isArray(eq.images) && eq.images.length > 0 ? eq.images[0] : "https://placehold.co/300x200?text=Equipment"}
                      title={eq.name}
                      price={eq.price ? eq.price + " دج" : "غير متوفر"}
                      description={eq.condition || "لا يوجد وصف"}
                      seller={eq.seller || eq.owner || "مجهول"}
                      onClick={() => openModal(eq, "equipment")}
                    />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredLands.map((land) => (
                    <MarketplaceCard
                      key={land.id}
                      image={land.image || "https://placehold.co/300x200?text=Land"}
                      title={land.name || land.title || "أرض بدون اسم"}
                      price={land.price ? land.price + " دج" : "غير متوفر"}
                      description={land.description || "لا يوجد وصف"}
                      seller={land.seller || land.owner || "مجهول"}
                      onClick={() => openModal(land, "land")}
                    />
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
