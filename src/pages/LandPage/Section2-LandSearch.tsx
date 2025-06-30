import { useState, useEffect } from "react";
import SearchCard from "../../components/SearchCard";
import LandSearchFilter from "../../components/LandSearchFilter";
import ContactModal from "../../components/CheckoutPopUp";
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

  const openModal = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterApply = (filters: {
    priceRange: number[];
    rating: number;
    landType: string;
    searchQuery: string;
  }) => {
    const filtered = lands.filter((land) => {
      const priceMatch =
        (filters.priceRange[0] === 0 && filters.priceRange[1] === 1000) ||
        (parseFloat(land.price.replace("$", "").replace("/month", "")) >=
          filters.priceRange[0] &&
          parseFloat(land.price.replace("$", "").replace("/month", "")) <=
            filters.priceRange[1]);

      const ratingMatch = !filters.rating || land.rating >= filters.rating;

      const landTypeMatch =
        !filters.landType ||
        (filters.landType === "أرض زراعية" &&
          land.description.includes("أرض زراعية")) ||
        (filters.landType === "بستان" &&
          land.description.includes("بستان")) 
        (filters.landType === "مرعى" &&
          land.description.includes("مرعى")) ||
        (filters.landType === "غابة" &&
          land.description.includes("غابة")) ||
        (filters.landType === "حديقة" &&
          land.description.includes("حديقة"));

      const searchMatch =
        !filters.searchQuery ||
        land.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        land.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return priceMatch && ratingMatch && landTypeMatch && searchMatch;
    });

    setFilteredLands(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>جاري تحميل الأراضي...</p>
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
                <div key={land.landId || index} onClick={() => openModal()}>
                  <SearchCard
                    image={land.image}
                    title={land.title}
                    description={land.description}
                    rating={land.rating}
                    price={land.price.replace("$","")}
                  />
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

      {!isAuthenticated && (
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
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
