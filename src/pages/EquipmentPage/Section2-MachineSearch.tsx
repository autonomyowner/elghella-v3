// Section2-MachineSearch.tsx
import { useState, useEffect } from "react";
import SearchCard from "../../components/SearchCard";
import MachineSearchFilter from "../../components/MachineSearchFilter";
import ContactModal from "../../components/CheckoutPopUp";
import Image from "../../assets/MachineRentPage/image.svg";
import { useAuth } from "../../context/AuthContext";
import { fetchEquipments } from "../../api/Equipments"; // Corrected import path

// Define an interface for equipment
interface Equipment {
  equipmentId: string;
  name: string;
  type: string;
  condition: string;
  price: string;
  description: string;
  owner: {
    userId: string;
    name: string;
    email: string;
    telephone: string;
  };
  createdAt: string;
}

export default function Section2MachineSearch() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [filteredCards, setFilteredCards] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth(); // Access authentication state

  // Fetch equipments on component mount
  useEffect(() => {
    const loadEquipments = async () => {
      try {
        const fetchedEquipments = await fetchEquipments();
        setEquipments(fetchedEquipments);
        setFilteredCards(fetchedEquipments);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching equipments:", error);
        setIsLoading(false);
      }
    };

    loadEquipments();
  }, []);

  const openModal = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true); // Show modal only for unauthenticated users
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleFilterApply = (filters: {
    priceRange: number[];
    rating?: number;
    MachineType: string;
    searchQuery: string;
  }) => {
    const filtered = equipments.filter((equipment) => {
      // Extract numeric price from string (remove $ and /day if present)
      const equipmentPrice = parseFloat(
        equipment.price.replace("$", "دينار").replace("/day", "")
      );

      const priceMatch =
        (filters.priceRange[0] === 0 && filters.priceRange[1] === 1000) ||
        (equipmentPrice >= filters.priceRange[0] &&
          equipmentPrice <= filters.priceRange[1]);

      // Note: Removed rating match as backend data doesn't include rating
      const MachineTypeMatch =
        !filters.MachineType ||
        (filters.MachineType === "جرار" &&
          equipment.type.toLowerCase().includes("جرار")) ||
        (filters.MachineType === "معدات حصاد" &&
          equipment.type.toLowerCase().includes("معدات حصاد")) ||
        (filters.MachineType === "معدات الري" &&
          equipment.type.toLowerCase().includes("معدات الري")) ||
        (filters.MachineType === "أدوات عامة" &&
          equipment.type.toLowerCase().includes("أدوات عامة")) ||
        (filters.MachineType === "حصادة" &&
          equipment.type.toLowerCase().includes("حصادة"));

      const searchMatch =
        !filters.searchQuery ||
        equipment.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        equipment.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return priceMatch && MachineTypeMatch && searchMatch;
    });

    setFilteredCards(filtered);
  };

  // Close filter when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterContainer = document.getElementById("filter-container");
      const filterToggleBtn = document.getElementById("filter-toggle-btn");

      if (
        isFilterOpen &&
        filterContainer &&
        filterToggleBtn &&
        !filterContainer.contains(event.target as Node) &&
        !filterToggleBtn.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      const preventClose = (e: MouseEvent) => {
        e.stopPropagation();
      };

      const filterInputs = document.querySelectorAll(
        "#filter-container input, #filter-container select, #filter-container button"
      );

      filterInputs.forEach((input) => {
        input.addEventListener("mousedown", preventClose as EventListener);
      });

      document.addEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );

      return () => {
        filterInputs.forEach((input) => {
          input.removeEventListener("mousedown", preventClose as EventListener);
        });
        document.removeEventListener(
          "mousedown",
          handleClickOutside as EventListener
        );
      };
    }
  }, [isFilterOpen]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 text-right dir-rtl relative">
      <div className="container mx-auto px-4">
        {/* Mobile Filter Toggle Button */}
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
          {/* Filter Section */}
          <div
            id="filter-container"
            className={`w-full md:w-1/4 
            ${isFilterOpen ? "block" : "hidden"} md:block
            fixed md:static inset-x-0 z-50 md:z-0 top-16 md:top-auto
            left-0 right-0 mx-auto max-w-md`}
          >
            <div className="relative px-4 md:px-0">
              <MachineSearchFilter
                onFilterApply={handleFilterApply}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCards.map((equipment) => (
                <div key={equipment.equipmentId} onClick={openModal}>
                  <SearchCard
                    image={Image} // You might want to add image handling later
                    title={equipment.name}
                    description={equipment.description}
                    rating={4} // Hardcoded for now, as backend doesn't provide rating
                    price={`${equipment.price.replace("$"," يوم/دينار ")}`}
                  />
                </div>
              ))}
              {filteredCards.length === 0 && (
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
