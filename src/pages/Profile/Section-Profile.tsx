import { useState, useEffect } from "react";
import { useAuth, User } from "../../context/AuthContext";
import authService from "../../api/AuthService";
import HeroImage from "../../assets/Profile/profile.jpg";
import { getUserProductsApi } from "../../api/myProductApi";
import { getUserEquipmentApi } from "../../api/myEquipmentApi";
import { getUserLandsApi } from "../../api/LandApi";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [lands, setLands] = useState<any[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      authService
        .getCurrentUser()
        .then((response) => {
          setUserData({
            userId: response.id,
            name: response.user_metadata?.name,
            email: response.email || "",
            telephone: response.user_metadata?.telephone,
            verified: !!response.email_confirmed_at,
          });
        })
        .catch(() => setError("فشل في تحميل البيانات"));
    } else {
      setUserData(user);
    }
  }, [user]);

  // Fetch all user items after user is loaded
  useEffect(() => {
    const fetchAll = async () => {
      if (!user || !user.userId) return;
      setItemsLoading(true);
      setItemsError(null);
      try {
        const [productsRes, equipmentRes, landsRes] = await Promise.all([
          getUserProductsApi(user.userId as string),
          getUserEquipmentApi(),
          getUserLandsApi(),
        ]);
        setProducts(productsRes || []);
        setEquipment(equipmentRes || []);
        setLands(landsRes || []);
      } catch (err) {
        setItemsError("فشل في تحميل العناصر الخاصة بك");
      } finally {
        setItemsLoading(false);
      }
    };
    if (user && user.userId) fetchAll();
  }, [user]);

  // Render user info content
  const renderUserInfo = () => (
    <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-2xl font-NeoSansArabicBold text-green-200 mb-6 text-center">
        معلومات الحساب
      </h3>
      {userData ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-300 mb-1 font-NeoSansArabicLight">
              الاسم
            </p>
            <p className="text-xl font-NeoSansArabicMedium">{userData.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-300 mb-1 font-NeoSansArabicLight">
              البريد الإلكتروني
            </p>
            <p className="text-lg font-NeoSansArabicRegular">
              {userData.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-300 mb-1 font-NeoSansArabicLight">
              الهاتف
            </p>
            <p className="text-lg font-NeoSansArabicRegular">
              {userData.telephone || "غير متوفر"}
            </p>
          </div>

          <div>
            <span
              className={`text-sm font-NeoSansArabicBold ${
                userData.verified ? "text-green-400" : "text-red-400"
              }`}
            >
              {userData.verified ? "✓ مُحقق" : "✗ غير مُحقق"}
            </span>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-400 font-NeoSansArabicRegular">{error}</p>
      ) : (
        <p className="text-gray-300 font-NeoSansArabicLight">
          جاري تحميل البيانات...
        </p>
      )}
    </div>
  );

  // Render history section
  const renderHistorySection = () => (
    <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-NeoSansArabicBold text-green-200 mb-6 text-center">
        تاريخ الإيجار / البيع
      </h3>
      <p className="text-gray-300 font-NeoSansArabicLight text-center">
        هنا سيكون قسم السجل.
      </p>
    </div>
  );

  // Render reviews section
  const renderReviewsSection = () => (
    <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-NeoSansArabicBold text-green-200 mb-6 text-center">
        التقييمات
      </h3>
      <p className="text-gray-300 font-NeoSansArabicLight text-center">
        هنا سيكون قسم التقييمات.
      </p>
    </div>
  );

  // Add a new section to render all user items
  const renderUserItemsSection = () => (
    <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-2xl font-NeoSansArabicBold text-green-200 mb-6 text-center">
        ممتلكاتك (منتجات، معدات، أراضي)
      </h3>
      {itemsLoading ? (
        <p className="text-gray-300 font-NeoSansArabicLight text-center">
          جاري تحميل العناصر...
        </p>
      ) : itemsError ? (
        <p className="text-red-400 font-NeoSansArabicRegular text-center">
          {itemsError}
        </p>
      ) : (
        <div className="space-y-8">
          {/* Products */}
          <div>
            <h4 className="text-lg font-bold text-green-400 mb-2">
              منتجاتك
            </h4>
            {products.length === 0 ? (
              <p className="text-gray-400">لا يوجد منتجات.</p>
            ) : (
              <ul className="space-y-2">
                {products.map((prod) => (
                  <li
                    key={prod.id}
                    className="bg-gray-900 rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <span className="font-bold text-white">{prod.name}</span>
                    <span className="text-gray-300">{prod.type}</span>
                    <span className="text-green-400">{prod.price} دج</span>
                    <span className="text-gray-400">
                      الكمية: {prod.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Equipment */}
          <div>
            <h4 className="text-lg font-bold text-green-400 mb-2">
              معداتك
            </h4>
            {equipment.length === 0 ? (
              <p className="text-gray-400">لا يوجد معدات.</p>
            ) : (
              <ul className="space-y-2">
                {equipment.map((eq) => (
                  <li
                    key={eq.equipmentId}
                    className="bg-gray-900 rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <span className="font-bold text-white">{eq.name}</span>
                    <span className="text-gray-300">{eq.type}</span>
                    <span className="text-green-400">{eq.price} دج</span>
                    <span className="text-gray-400">{eq.condition}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Lands */}
          <div>
            <h4 className="text-lg font-bold text-green-400 mb-2">
              أراضيك
            </h4>
            {lands.length === 0 ? (
              <p className="text-gray-400">لا يوجد أراضي.</p>
            ) : (
              <ul className="space-y-2">
                {lands.map((land) => (
                  <li
                    key={land.id}
                    className="bg-gray-900 rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <span className="font-bold text-white">
                      {land.name || land.title || "أرض بدون اسم"}
                    </span>
                    <span className="text-gray-300">
                      {land.type || "نوع غير محدد"}
                    </span>
                    <span className="text-green-400">
                      {land.price ? `${land.price} دج` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <section dir="rtl" className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0">
          <img
            src={HeroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 flex-grow container mx-auto px-4 py-12">
          <h2 className="text-center text-4xl md:text-5xl font-NeoSansArabicBlack text-green-200 mb-12 drop-shadow-lg">
            الملف الشخصي
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>جاري تحميل البيانات...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="relative min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-grow container mx-auto px-4 py-12">
        {/* Page Title */}
        <h2 className="text-center text-4xl md:text-5xl font-NeoSansArabicBlack text-green-200 mb-12 drop-shadow-lg">
          الملف الشخصي
        </h2>

        {/* Content Sections - Grid on Desktop, Stacked on Mobile */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">{renderUserInfo()}</div>
          <div className="md:col-span-1 flex flex-col">
            <div className="flex-grow grid grid-rows-2 gap-8">
              <div className="h-full">{renderUserItemsSection()}</div>
              <div className="h-full">{renderHistorySection()}</div>
            </div>
            <div className="mt-8">{renderReviewsSection()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
