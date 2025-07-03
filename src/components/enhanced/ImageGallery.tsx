import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Modal from "../ui/Modal";

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  category: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
  title?: string;
}

export default function ImageGallery({ 
  images, 
  className = '', 
  title = "معرض الصور الزراعية" 
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Get unique categories
  const categories = ["all", ...new Set(images.map(img => img.category))];

  // Filter images by category
  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const categoryLabels: { [key: string]: string } = {
    all: "جميع الصور",
    farmland: "الأراضي الزراعية",
    fruits: "الفواكه",
    vegetables: "الخضروات",
    technology: "التقنيات الحديثة",
    landscapes: "المناظر الطبيعية"
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gallery Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اكتشف جمال الطبيعة الزراعية الجزائرية من خلال مجموعة مختارة من أجمل الصور
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[category] || category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${activeCategory}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "/assets/Homepage/hero.svg";
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white">
                  <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                  <p className="text-xs text-gray-200 line-clamp-2">{image.description}</p>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal for Full-Size Image */}
      <Modal
        isOpen={selectedImage !== null}
        onClose={closeModal}
        size="full"
        className="bg-black/95"
        showCloseButton={false}
      >
        {selectedImage !== null && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/assets/Homepage/hero.svg";
                }}
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
              <h3 className="text-2xl font-bold mb-2 text-right">
                {filteredImages[selectedImage].title}
              </h3>
              <p className="text-gray-300 text-right">
                {filteredImages[selectedImage].description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-400">
                  {selectedImage + 1} من {filteredImages.length}
                </div>
                <div className="text-sm text-gray-400">
                  {categoryLabels[filteredImages[selectedImage].category]}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}