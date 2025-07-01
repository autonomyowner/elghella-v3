import { useState, useEffect } from "react";
import LandSearchFilter from "../../components/LandSearchFilter";
import ContactModal from "../../components/CheckoutPopUp";
import LandDetailsModal from "../../components/LandDetailsModal.tsx"; // Try importing with explicit extension if you get module not found error
import { fetchLands } from "../../api/LandApi"; // Adjust the import path as needed
import { useAuth } from "../../context/AuthContext";
import Image from "../../assets/LandRentPage/image.svg"; // Placeholder image

export default function Section2LandSearch() {
  const [lands, setLands] = useState<any[]>([]);
  const [filteredLands, setFilteredLands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState<any>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadLands = async () => {
      try {
        setIsLoading(true);
        const fetchedLands = await fetchLands();

        // Transform lands to match existing card structure
        const transformedLands = fetchedLands.map((land: any) => ({
          landId: land.landId,
          image: Image, // Use placeholder image, replace with actual image logic if available
          title: `أرض في ${land.location}`,
          description: land.description,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating as an example
          price: `${land.price} شهر/دينار`,
          location: land.location,
          area: land.area,
          soilType: land.soilType,
          owner: land.owner,
        }));

        setLands(transformedLands);
        setFilteredLands(transformedLands);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch lands");
        setIsLoading(false);
        console.error(err);
      }
    };

    loadLands();
  }, []);

  const openModal = (land: any) => {
    setSelectedLand(land);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLand(null);
  };

  const handleFilterApply = (filters: {
    priceRange: number[];
    rating: number;
    landType: string;
    searchQuery: string;
  }) => {
    const filtered = lands.filter((land) => {
      // Safely parse price as number
      const priceValue =
        typeof land.price === "string"
          ? parseFloat(land.price.replace(/[^\d.]/g, ""))
          : Number(land.price);

      const priceMatch =
        (filters.priceRange[0] === 0 && filters.priceRange[1] === 1000) ||
        (priceValue >= filters.priceRange[0] && priceValue <= filters.priceRange[1]);

      const ratingMatch = !filters.rating || land.rating >= filters.rating;

      const landTypeMatch =
        !filters.landType ||
        (filters.landType === "أرض زراعية" && land.description && land.description.includes("أرض زراعية")) ||
        (filters.landType === "بستان" && land.description && land.description.includes("بستان")) ||
        (filters.landType === "مرعى" && land.description && land.description.includes("مرعى")) ||
        (filters.landType === "غابة" && land.description && land.description.includes("غابة")) ||
        (filters.landType === "حديقة" && land.description && land.description.includes("حديقة"));

      const searchMatch =
        !filters.searchQuery ||
        (land.title && land.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (land.description && land.description.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return priceMatch && ratingMatch && landTypeMatch && searchMatch;
    });

    setFilteredLands(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <svg className="animate-spin h-12 w-12 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <p className="text-lg text-green-600 font-bold">جاري تحميل الأراضي...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 text-right dir-rtl relative">
      <div className="container mx-auto px-4">
        <div className="md:hidden mb-4">
          <button
            id="filter-toggle-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            {isFilterOpen ? "إخفاء الفلاتر" : "عرض الفلاتر"}
          </button>
        </div>

        <div className="flex flex-col-reverse md:flex-row-reverse gap-6">
          {/* Filter component remains the same */}
          <div
            id="filter-container"
            className={`w-full md:w-1/4 
            ${isFilterOpen ? "block" : "hidden"} md:block
            fixed md:static inset-x-0 z-50 md:z-0 top-16 md:top-auto
            left-0 right-0 mx-auto max-w-md`}
          >
            <div className="relative px-4 md:px-0">
              <LandSearchFilter
                onFilterApply={handleFilterApply}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLands.map((land, index) => (
                <div key={land.landId || index} onClick={() => openModal(land)} className="cursor-pointer group">
                  <div className="bg-gradient-to-br from-green-900 to-gray-900 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full border-2 border-green-700 group-hover:border-green-400">
                    <div className="w-full aspect-video overflow-hidden relative">
                      <img
                        src={land.image}
                        alt={land.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <h3 className="text-lg font-bold text-green-200 mb-1 font-['NeoSansArabicBold'] line-clamp-1">{land.title}</h3>
                      <p className="text-sm text-gray-300 mb-2 font-['NeoSansArabicLight'] line-clamp-2">{land.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-green-400 font-bold">{land.price ? (typeof land.price === 'string' ? land.price.replace(/[^\d.]/g, "") + " دينار" : land.price + " دينار") : "غير متوفر"}</span>
                        <span className="text-yellow-400 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < land.rating ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 .587l3.668 7.429L24 9.587l-6 5.845 1.415 8.243L12 18.573l-7.415 4.102L6 15.432 0 9.587l8.332-1.571L12 .587z" />
                            </svg>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredLands.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-10">
                  لا توجد نتائج تطابق الفلاتر المحددة
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal for Authentication */}
      {!isAuthenticated && (
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      )}

      {/* Land Details Modal */}
      {selectedLand && (
        <LandDetailsModal land={selectedLand} isOpen={isModalOpen} onClose={closeModal} />
      )}

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </section>
  );
}
