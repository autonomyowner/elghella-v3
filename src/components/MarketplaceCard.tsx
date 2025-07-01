import React from "react";

interface MarketplaceCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  seller?: string;
  onClick?: () => void;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ image, title, price, description, seller, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-700 hover:border-green-400 transition-all duration-300 cursor-pointer flex flex-col h-full group"
    onClick={onClick}
  >
    <div className="w-full aspect-video overflow-hidden relative">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow justify-between">
      <h3 className="text-lg font-bold text-green-800 mb-1 line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-green-600 font-bold">{price}</span>
        {seller && <span className="text-xs text-gray-400">{seller}</span>}
      </div>
    </div>
  </div>
);

export default MarketplaceCard;
