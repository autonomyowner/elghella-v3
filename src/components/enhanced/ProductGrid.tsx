import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Grid, List, Filter } from "lucide-react";
import MarketplaceCard from "./MarketplaceCard";
import Button from "../ui/Button";
import SearchInput from "../ui/SearchInput";
import LoadingSpinner from "../ui/LoadingSpinner";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  location: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  rating?: number;
  reviewCount?: number;
  isLiked?: boolean;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onProductClick?: (id: string) => void;
  onProductLike?: (id: string) => void;
  onProductView?: (id: string) => void;
  categories?: string[];
  className?: string;
}

const sortOptions = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'oldest', label: 'الأقدم' },
  { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'التقييم' }
];

export default function ProductGrid({
  products = [],
  isLoading = false,
  hasMore = false,
  onLoadMore,
  onProductClick,
  onProductLike,
  onProductView,
  categories = [],
  className = ''
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Load more when intersection observer triggers
  useEffect(() => {
    if (inView && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, onLoadMore]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters Header */}
      <div className="space-y-4">
        {/* Search Bar */}
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="البحث في المنتجات..."
          className="max-w-md"
        />

        {/* Filters and View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}
            >
              الفلاتر
            </Button>

            {/* Results Count */}
            <span className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} من {products.length} منتج
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-lg p-4 space-y-4"
            >
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === "all"
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    الكل
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid/List */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }
      `}>
        <AnimatePresence>
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <MarketplaceCard
                {...product}
                onLike={onProductLike}
                onView={onProductView}
                onClick={onProductClick}
                className={viewMode === 'list' ? 'max-w-none' : ''}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Load More */}
      {hasMore && !isLoading && (
        <div ref={ref} className="flex justify-center py-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="min-w-[200px]"
          >
            تحميل المزيد
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">لا توجد منتجات</div>
          <div className="text-gray-600">جرب تغيير معايير البحث أو الفلاتر</div>
        </div>
      )}
    </div>
  );
}