import React from "react";

interface LandDetailsModalProps {
  land: any;
  isOpen: boolean;
  onClose: () => void;
}

const LandDetailsModal: React.FC<LandDetailsModalProps> = ({ land, isOpen, onClose }) => {
  if (!isOpen || !land) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative text-right dir-rtl">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>
        <img
          src={land.image}
          alt={land.title}
          className="w-full h-48 object-cover rounded mb-4 border border-green-200"
        />
        <h2 className="text-2xl font-bold text-green-700 mb-2">{land.title}</h2>
        <p className="text-gray-700 mb-2">{land.description}</p>
        <div className="mb-2"><span className="font-bold">الموقع:</span> {land.location}</div>
        <div className="mb-2"><span className="font-bold">المساحة:</span> {land.area}</div>
        <div className="mb-2"><span className="font-bold">نوع التربة:</span> {land.soilType}</div>
        <div className="mb-2"><span className="font-bold">المالك:</span> {land.owner}</div>
        <div className="mb-2"><span className="font-bold">السعر:</span> {land.price}</div>
        <div className="flex items-center mt-4">
          <span className="font-bold mr-2">التقييم:</span>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${i < land.rating ? "text-yellow-500" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.429L24 9.587l-6 5.845 1.415 8.243L12 18.573l-7.415 4.102L6 15.432 0 9.587l8.332-1.571L12 .587z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandDetailsModal;
