import { useState, useEffect } from "react";
import SearchCard from "../../components/SearchCard";
import GreengrocerSearchFilter from "../../components/GreengrocerSearchFilter";
import ContactModal from "../../components/CheckoutPopUp";
import Image from "../../assets/GreengrocerPage/image.svg";
import { useAuth } from "../../context/AuthContext";
import { fetchProducts } from "../../api/ProductApi"; // Adjust the import path as necessary

interface Product {
  productId: string;
  title: string;
  description: string;
  price: string; // Assuming price is still a string with "$" and "/month"
  rating: number;
  image?: string; // Use optional if image might not always be present
}

export default function Section2GreengrocerSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredCards, setFilteredCards] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setFilteredCards(fetchedProducts); // Initially, all products are shown
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
    GreengrocerType: string;
    searchQuery: string;
  }) => {
    const filtered = products.filter((product) => {
      // Convert 'price' string to number for comparison
      const productPrice = parseFloat(
        product.price.replace("$", "دينار").replace("/month", "")
      );
      const priceMatch =
        (filters.priceRange[0] === 0 && filters.priceRange[1] === 1000) ||
        (productPrice >= filters.priceRange[0] &&
          productPrice <= filters.priceRange[1]);

      const ratingMatch = !filters.rating || product.rating >= filters.rating;

      const GreengrocerTypeMatch =
        !filters.GreengrocerType ||
        (filters.GreengrocerType === "الحبوب" &&
          product.title.includes("الحبوب")) ||
        (filters.GreengrocerType === "الخضروات" &&
          product.title.includes("الخضروات")) ||
        (filters.GreengrocerType === "الفواكه" &&
          product.title.includes("الفواكه")) ||
        (filters.GreengrocerType === "الأعلاف" &&
          product.title.includes("الأعلاف")) ||
        (filters.GreengrocerType === "المكسرات" &&
          product.title.includes("المكسرات"));

      const searchMatch =
        !filters.searchQuery ||
        product.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return priceMatch && ratingMatch && GreengrocerTypeMatch && searchMatch;
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
              <GreengrocerSearchFilter
                onFilterApply={handleFilterApply}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.isArray(filteredCards) &&
                  filteredCards.map((product, index) => (
                    <div key={index} onClick={openModal}>
                      <SearchCard
                        key={index}
                        image={product.image || Image}
                        title={product.title}
                        description={product.description}
                        rating={product.rating}
                        price={product.price.replace("$"," دينار ")}
                      />
                    </div>
                  ))}
                {filteredCards.length === 0 && (
                  <div className="col-span-full text-center text-gray-400 py-10">
                    لا توجد نتائج تطابق الفلاتر المحددة
                  </div>
                )}
              </div>
            )}
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
