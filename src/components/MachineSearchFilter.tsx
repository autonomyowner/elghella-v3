// MachineSearchFilter.tsx
import { useState, useEffect } from "react";

interface FilterProps {
  onFilterApply: (filters: {
    priceRange: number[];
    rating: number;
    MachineType: string;
    searchQuery: string;
  }) => void;
  onClose?: () => void;
  initialSearchQuery?: string;
}

export default function MachineSearchFilter({
  onFilterApply,
  onClose,
  initialSearchQuery = "",
}: FilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 100000000,
  ]);
  const [rating, setRating] = useState<number>(0);
  const [MachineType, setMachineType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // Add useEffect to trigger filtering whenever any filter changes
  useEffect(() => {
    onFilterApply({
      priceRange,
      rating,
      MachineType,
      searchQuery,
    });
  }, [priceRange, rating, MachineType, searchQuery]);

  const MachineTypes = [
    { value: "", label: "اختر نوع المعدات" },
    { value: "جرار", label: "جرار" },
    { value: "معدات حصاد", label: "معدات حصاد" },
    { value: "معدات الري", label: "معدات الري" },
    { value: "أدوات عامة", label: "أدوات عامة" },
    { value: "حصادة", label: "حصادة" },
  ];

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 sticky top-20 border border-gray-700 transition-colors duration-300">
      {/* Close button for mobile (optional) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 Left-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center md:hidden"
        >
          ✕
        </button>
      )}

      <h3 className="text-xl font-bold text-green-200 mb-6 border-b border-gray-700 pb-3">
        فلترة البحث
      </h3>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          البحث
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن المعدات..."
          className="w-full border rounded-md p-2 text-sm bg-gray-700 text-gray-100 focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          نطاق السعر (دينار/شهر)
        </label>
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full border rounded-md p-2 text-sm bg-gray-700 text-gray-100 focus:ring-2 focus:ring-green-600"
            placeholder="من"
            min="0"
            max="1000"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full border rounded-md p-2 text-sm bg-gray-700 text-gray-100 focus:ring-2 focus:ring-green-600"
            placeholder="إلى"
            min="0"
            max="1000"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          التقييم
        </label>
        <div className="flex items-center flex-wrap">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star === rating ? 0 : star)}
              className={`flex items-center justify-center w-10 h-10 rounded-full m-1 transition-all duration-300 ${
                rating >= star
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-700 text-gray-300"
              } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300`}
            >
              {star}★
            </button>
          ))}
        </div>
      </div>

      {/* Machine Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          نوع المعدات
        </label>
        <select
          value={MachineType}
          onChange={(e) => setMachineType(e.target.value)}
          className="w-full border rounded-md p-2 text-sm bg-gray-700 text-gray-100 focus:ring-2 focus:ring-green-600"
        >
          {MachineTypes.map((type) => (
            <option
              key={type.value}
              value={type.value}
              className="bg-gray-800 text-gray-100"
            >
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
