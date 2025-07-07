import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchCategory {
  id: string;
  name: string;
  placeholder: string;
  route: string;
}

const searchCategories: SearchCategory[] = [
  {
    id: "all",
    name: "جميع الفئات",
    placeholder: "ابحث عن المنتجات، الأراضي، المعدات...",
    route: "/publiclistings"
  },
  {
    id: "products",
    name: "المنتجات",
    placeholder: "ابحث عن الفواكه، الخضار، المنتجات الطبيعية...",
    route: "/publiclistings"
  },
  {
    id: "land",
    name: "الأراضي",
    placeholder: "ابحث عن أراضي للإيجار حسب المنطقة أو النوع...",
    route: "/publiclistings"
  },
  {
    id: "equipment",
    name: "المعدات",
    placeholder: "ابحث عن المعدات الزراعية، الآلات، الأدوات...",
    route: "/publiclistings"
  },
  {
    id: "experts",
    name: "الخبراء",
    placeholder: "ابحث عن خبراء زراعيين حسب التخصص...",
    route: "/experts"
  }
];

const HomepageSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize search from URL params if coming back to homepage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get('q') || params.get('search');
    const urlCategory = params.get('category');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (urlCategory && searchCategories.some(cat => cat.id === urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }, [location.search]);

  const currentCategory = searchCategories.find(cat => cat.id === selectedCategory) || searchCategories[0];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Navigate to the appropriate page with search query
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchQuery.trim());
    
    // Add category filter for public listings
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'products') {
        searchParams.set('tab', 'products');
      } else if (selectedCategory === 'land') {
        searchParams.set('tab', 'lands');
      } else if (selectedCategory === 'equipment') {
        searchParams.set('tab', 'equipment');
      }
    }

    navigate(`${currentCategory.route}?${searchParams.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQuickSearch = (query: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    
    // Auto-search after setting the values
    setTimeout(() => {
      const searchParams = new URLSearchParams();
      searchParams.set('search', query);
      
      if (category !== 'all') {
        if (category === 'products') {
          searchParams.set('tab', 'products');
        } else if (category === 'land') {
          searchParams.set('tab', 'lands');
        } else if (category === 'equipment') {
          searchParams.set('tab', 'equipment');
        }
      }

      const targetCategory = searchCategories.find(cat => cat.id === category) || searchCategories[0];
      navigate(`${targetCategory.route}?${searchParams.toString()}`);
    }, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-['NeoSansArabicBold']">
            ابحث في منصة الغلة
          </h2>
          <p className="text-gray-600 font-['NeoSansArabicLight']">
            اكتشف المنتجات الطبيعية، الأراضي، المعدات الزراعية والخبراء
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full md:w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-['NeoSansArabicMedium']"
            >
              <span className="text-gray-700">{currentCategory.name}</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {searchCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-right text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg font-['NeoSansArabicMedium']"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentCategory.placeholder}
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 font-['NeoSansArabicLight'] text-right text-gray-700 placeholder-gray-400"
              dir="rtl"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-['NeoSansArabicBold'] shadow-lg"
          >
            بحث
          </button>
        </div>

        {/* Quick Search Tags */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3 font-['NeoSansArabicLight']">
            بحث سريع:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { text: "طماطم", category: "products" },
              { text: "أراضي زراعية", category: "land" },
              { text: "جرار زراعي", category: "equipment" },
              { text: "خبير زراعي", category: "experts" },
              { text: "زيتون", category: "products" },
              { text: "معدات الري", category: "equipment" }
            ].map((tag) => (
              <button
                key={tag.text}
                onClick={() => handleQuickSearch(tag.text, tag.category)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition-colors duration-200 font-['NeoSansArabicLight']"
              >
                {tag.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageSearchBar;
