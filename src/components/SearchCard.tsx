interface SearchCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  price: string;
}

export default function SearchCard({
  image,
  title,
  description,
  rating,
  price,
}: SearchCardProps) {
  return (
    <div className="bg-gray-900 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl aspect-square flex flex-col">
      {/* Square Image Container */}
      <div className="w-full aspect-square overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-2 space-y-1 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm md:text-base font-bold text-green-200 line-clamp-1 font-['NeoSansArabicBold']">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-300 line-clamp-2 mb-1 font-['NeoSansArabicLight']">
            {description}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 md:h-4 md:w-4 ${
                  i < rating ? "text-yellow-500" : "text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.429L24 9.587l-6 5.845 1.415 8.243L12 18.573l-7.415 4.102L6 15.432 0 9.587l8.332-1.571L12 .587z" />
              </svg>
            ))}
          </div>

          {/* Price Tag */}
          <p className="text-xs md:text-sm text-green-400 font-bold font-['NeoSansArabicMedium']">
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}
