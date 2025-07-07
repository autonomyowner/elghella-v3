import React from "react";

interface MarketplaceCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  seller?: string;
  onClick?: () => void;
  location?: string;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ 
  image, 
  title, 
  price, 
  description, 
  seller, 
  onClick, 
  location, 
  category,
  isNew,
  isFeatured
}) => (
  <div
    className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
      isFeatured 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white' 
        : 'border-gray-200 hover:border-green-400'
    } hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group relative`}
    onClick={onClick}
  >
    {/* Category Badge */}
    {category && (
      <div className="absolute top-3 right-3 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        {category}
      </div>
    )}
    
    {/* New Badge */}
    {isNew && (
      <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
        جديد
      </div>
    )}
    
    {/* Featured Badge */}
    {isFeatured && (
      <div className="absolute top-12 left-3 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
        مميز
      </div>
    )}

    <div className="w-full aspect-video overflow-hidden relative">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className="p-5 flex flex-col flex-grow justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* Location */}
        {location && (
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <span className="ml-1">📍</span>
            <span>{location}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-green-600">{price}</span>
          {seller && (
            <span className="text-xs text-gray-400 mt-1">
              بائع: {seller}
            </span>
          )}
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors duration-300 shadow-md">
          عرض
        </button>
      </div>
    </div>
  </div>
);

export default MarketplaceCard;
