import { motion } from "framer-motion";
import { Heart, MapPin, Clock, Eye, Star } from "lucide-react";
import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface MarketplaceCardProps {
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
  onLike?: (id: string) => void;
  onView?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export default function MarketplaceCard({
  id,
  title,
  description,
  price,
  currency = "د.ج",
  location,
  imageUrl,
  category,
  createdAt,
  rating,
  reviewCount,
  isLiked = false,
  onLike,
  onView,
  onClick,
  className = ''
}: MarketplaceCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike?.(id);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-DZ').format(price);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'منذ يوم';
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    if (diffDays < 30) return `منذ ${Math.ceil(diffDays / 7)} أسابيع`;
    return `منذ ${Math.ceil(diffDays / 30)} شهر`;
  };

  return (
    <Card
      hover
      className={`max-w-sm mx-auto overflow-hidden group cursor-pointer ${className}`}
      padding="sm"
    >
      <motion.div
        onClick={() => onClick?.(id)}
        className="space-y-3"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg bg-gray-200 h-48">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
              setImageLoaded(true);
            }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded-full">
              {category}
            </span>
          </div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${
              liked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </motion.button>

          {/* View Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleView}
            className="absolute bottom-2 left-2 p-2 bg-white/80 text-gray-600 rounded-full hover:bg-white transition-colors"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 text-right">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 text-right">
            {description}
          </p>

          {/* Rating */}
          {rating && (
            <div className="flex items-center justify-end space-x-1 space-x-reverse">
              <span className="text-sm text-gray-600">
                ({reviewCount || 0})
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="text-right">
            <span className="text-xl font-bold text-green-600">
              {formatPrice(price)} {currency}
            </span>
          </div>

          {/* Location and Time */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 space-x-reverse pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e?.stopPropagation();
              // Handle contact action
            }}
          >
            تواصل
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e?.stopPropagation();
              onClick?.(id);
            }}
          >
            عرض التفاصيل
          </Button>
        </div>
      </motion.div>
    </Card>
  );
}