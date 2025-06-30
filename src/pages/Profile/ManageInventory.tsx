import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import HeroImage from "../../assets/Profile/profile.jpg";

// Import API functions
import {
  getUserLandsApi,
  deleteLandApi,
  updateLandApi,
} from "../../api/myLandApi";
import {
  getUserEquipmentApi,
  deleteEquipmentApi,
  updateEquipmentApi,
} from "../../api/myEquipmentApi";
import {
  getUserProductsApi,
  deleteProductApi,
  updateProductApi,
} from "../../api/myProductApi";

// Define types for listings to match API responses
type Land = {
  landId: string;
  location: string;
  area: number;
  soilType: string;
  price: number;
  description?: string;
  isAvailable: boolean;
};

type Equipment = {
  equipmentId: string;
  name: string;
  type: string;
  condition: "NEW" | "USED" | "REFURBISHED" | "DAMAGED";
  price: number;
  description?: string;
  isAvailable: boolean;
};

type Product = {
  productId: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  description: string;
  isAvailable: boolean;
  createdAt: string;
};

const ManageListingsPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [listings, setListings] = useState<{
    lands: Land[];
    equipments: Equipment[];
    products: Product[];
  }>({
    lands: [],
    equipments: [],
    products: [],
  });

  // New loading states
  const [loadingStates, setLoadingStates] = useState({
    fetchingLands: false,
    fetchingEquipments: false,
    fetchingProducts: false,
    deletingItem: false,
    updatingItem: false,
  });

  const [activeTab, setActiveTab] = useState<
    "lands" | "equipments" | "products"
  >("lands");
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<
    Land | Equipment | Product | null
  >(null);

  // Fetch listings for the user
  const fetchListings = async () => {
    if (!user) return;

    // Update loading states for each type
    setLoadingStates((prev) => ({
      ...prev,
      fetchingLands: true,
      fetchingEquipments: true,
      fetchingProducts: true,
    }));

    try {
      const [landsResponse, equipmentsResponse, productsResponse] =
        await Promise.all([
          getUserLandsApi(),
          getUserEquipmentApi(),
          getUserProductsApi(user.userId!),
        ]);

      setListings({
        lands: landsResponse,
        equipments: equipmentsResponse,
        products: productsResponse.map((p) => ({
          ...p,
          productId: p.id ?? "",
          isAvailable: p.isAvailable ?? true,
          createdAt: p.createdAt ?? "",
        })),
      });
    } catch (err) {
      setError("Failed to load listings data.");
      console.error(err);
    } finally {
      // Reset loading states
      setLoadingStates((prev) => ({
        ...prev,
        fetchingLands: false,
        fetchingEquipments: false,
        fetchingProducts: false,
      }));
    }
  };

  // Fetch listings when user is loaded
  useEffect(() => {
    if (
      user &&
      !loadingStates.fetchingLands &&
      !loadingStates.fetchingEquipments &&
      !loadingStates.fetchingProducts
    ) {
      fetchListings();
    }
  }, [user]);

  // Handle delete for different item types
  const handleDelete = async (
    itemId: string,
    type: "lands" | "equipments" | "products"
  ) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا العنصر؟")) {
      // Set loading state for deletion
      setLoadingStates((prev) => ({ ...prev, deletingItem: true }));

      try {
        switch (type) {
          case "lands":
            await deleteLandApi(itemId);
            break;
          case "equipments":
            await deleteEquipmentApi(itemId);
            break;
          case "products":
            await deleteProductApi(itemId);
            break;
          default:
            throw new Error("Unsupported item type");
        }

        // Refresh listings after deletion
        await fetchListings();
      } catch (err) {
        setError(`Failed to delete ${type.slice(0, -1)}.`);
        console.error(err);
      } finally {
        // Reset deletion loading state
        setLoadingStates((prev) => ({ ...prev, deletingItem: false }));
      }
    }
  };

  // Handle edit for different item types
  const handleEdit = async (item: Land | Equipment | Product) => {
    // Set loading state for updating
    setLoadingStates((prev) => ({ ...prev, updatingItem: true }));

    try {
      const commonFields = { description: item.description };

      if ("landId" in item) {
        await updateLandApi(item.landId, {
          ...commonFields,
          location: item.location,
          price: item.price,
          area: "area" in item ? item.area : undefined,
          soilType: "soilType" in item ? item.soilType : undefined,
        });
      } else if ("equipmentId" in item) {
        await updateEquipmentApi(item.equipmentId, {
          ...commonFields,
          name: item.name,
          price: item.price,
        });
      } else if ("productId" in item) {
        await updateProductApi(item.productId, {
          ...commonFields,
          name: item.name,
          price: item.price,
          quantity: "quantity" in item ? item.quantity : undefined,
        });
      }

      // Refresh listings after update
      await fetchListings();
      setEditingItem(null);
    } catch (err) {
      setError(`Failed to update item.`);
      console.error(err);
    } finally {
      // Reset updating loading state
      setLoadingStates((prev) => ({ ...prev, updatingItem: false }));
    }
  };

  // Render edit form for an item
  const renderEditForm = () => {
    if (!editingItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border-2 border-green-600 relative overflow-auto max-h-[90vh]">
          {/* Close button */}
          <button
            onClick={() => setEditingItem(null)}
            className="absolute top-4 left-4 text-gray-300 hover:text-white transition-colors"
            disabled={loadingStates.updatingItem}
          >
            ✕
          </button>

          <h3 className="text-2xl font-NeoSansArabicMedium text-green-300 mb-6 text-center">
            تعديل العنصر
          </h3>

          <div className="space-y-6">
            {/* Name/Location input */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {editingItem.hasOwnProperty("name") ? "اسم العنصر" : "الموقع"}
              </label>
              <input
                type="text"
                value={
                  "name" in editingItem
                    ? editingItem.name
                    : "location" in editingItem
                    ? editingItem.location
                    : ""
                }
                onChange={(e) => {
                  if ("name" in editingItem) {
                    setEditingItem({ ...editingItem, name: e.target.value });
                  } else if ("location" in editingItem) {
                    setEditingItem({
                      ...editingItem,
                      location: e.target.value,
                    });
                  }
                }}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                placeholder={
                  editingItem.hasOwnProperty("name")
                    ? "أدخل اسم العنصر"
                    : "أدخل الموقع"
                }
              />
            </div>

            {/* Price input */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                السعر (دينار)
              </label>
              <input
                type="number"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    price: Number(e.target.value),
                  })
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="أدخل السعر"
              />
            </div>

            {/* Additional fields for lands */}
            {editingItem.hasOwnProperty("area") && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  المساحة (متر مربع)
                </label>
                <input
                  type="number"
                  value={(editingItem as Land).area}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      area: Number(e.target.value),
                    })
                  }
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="أدخل المساحة"
                />
              </div>
            )}

            {editingItem.hasOwnProperty("soilType") && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  نوع التربة
                </label>
                <input
                  type="text"
                  value={(editingItem as Land).soilType}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      soilType: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="أدخل نوع التربة"
                />
              </div>
            )}

            {/* Description input */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">الوصف</label>
              <textarea
                value={editingItem.description || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="أدخل وصف للعنصر"
                rows={3}
              />
            </div>

            {/* Quantity input for products */}
            {"quantity" in editingItem && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  الكمية
                </label>
                <input
                  type="number"
                  value={editingItem.quantity}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      quantity: Number(e.target.value),
                    })
                  }
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="أدخل الكمية"
                />
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => handleEdit(editingItem)}
                className={`flex-1 px-6 py-3 rounded-lg transition-all ${
                  loadingStates.updatingItem
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                disabled={loadingStates.updatingItem}
              >
                {loadingStates.updatingItem ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all"
                disabled={loadingStates.updatingItem}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render listings section
  const renderListingsSection = (
    items: Land[] | Equipment[] | Product[],
    type: "lands" | "equipments" | "products"
  ) => {
    // Check if any loading states are active for this type of listing
    const isLoading =
      loadingStates.fetchingLands ||
      loadingStates.fetchingEquipments ||
      loadingStates.fetchingProducts;

    // If loading, show loading message
    if (isLoading) {
      return (
        <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-2xl text-center text-gray-300">
          جاري تحميل العناصر...
        </div>
      );
    }

    return (
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-2xl">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
              // Determine item details based on type
              const name =
                "name" in item
                  ? item.name
                  : "location" in item
                  ? item.location
                  : "";
              const description = item.description || "";
              const itemId =
                "landId" in item
                  ? item.landId
                  : "equipmentId" in item
                  ? item.equipmentId
                  : "productId" in item
                  ? item.productId
                  : "";

              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-NeoSansArabicMedium text-green-300 truncate">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-400 h-12 overflow-hidden">
                      {description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400 font-bold">
                        السعر: {item.price} دينار
                      </span>

                      {/* Additional type-specific details */}
                      {"area" in item && (
                        <span className="text-sm text-blue-300">
                          المساحة: {item.area} م²
                        </span>
                      )}

                      {type === "products" && "quantity" in item && (
                        <span className="text-sm text-blue-300">
                          الكمية: {item.quantity}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        disabled={loadingStates.updatingItem}
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(itemId, type)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          loadingStates.deletingItem
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        disabled={loadingStates.deletingItem}
                      >
                        {loadingStates.deletingItem ? "جاري الحذف..." : "حذف"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-300 font-NeoSansArabicLight text-center py-8 text-xl">
            لا توجد إعلانات متاحة.
          </p>
        )}
      </div>
    );
  };

  // Loading state for initial page load
  if (authLoading) {
    return (
      <section dir="rtl" className="relative min-h-screen flex flex-col mt-20">
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
            إدارة الممتلكات
          </h2>
          <p className="text-center text-gray-300 font-NeoSansArabicLight">
            جاري تحميل البيانات...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="relative min-h-screen w-full flex flex-col">
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
        <h2 className="text-center text-4xl md:text-5xl font-NeoSansArabicBlack text-green-200 mb-16 drop-shadow-lg">
          إدارة الممتلكات
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {Object.keys(listings).map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-lg font-NeoSansArabicMedium ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-300"
              } rounded-lg mx-2 focus:outline-none`}
              onClick={() =>
                setActiveTab(tab as "lands" | "equipments" | "products")
              }
            >
              {tab === "lands"
                ? "الأراضي"
                : tab === "equipments"
                ? "المعدات"
                : "المنتجات"}
            </button>
          ))}
        </div>

        {/* Listings Section */}
        <div className="max-w-6xl mx-auto">
          {renderListingsSection(listings[activeTab], activeTab)}
        </div>

        {/* Edit Form */}
        {renderEditForm()}

        {/* Error Handling */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-white underline"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageListingsPage;
