import React, { useState } from "react";
import {
  PlusCircle,
  MapPin,
  Trees,
  DollarSign,
  Ruler,
  FileText,
} from "lucide-react";
import { addLandApi } from "../../api/myLandApi";

// Placeholder images for different land types
import farmLandImage from "../../assets/LandRentPage/AddLands/farmlands.jpg";
import orchardImage from "../../assets/LandRentPage/AddLands/orchard.jpg";
import pastureLandImage from "../../assets/LandRentPage/AddLands/pastureLand.jpg";
import forestLandImage from "../../assets/LandRentPage/AddLands/forestLand.jpg";
import gardenLandImage from "../../assets/LandRentPage/AddLands/gardenLand.jpg";

// Define types for form state and land type images
type FormState = {
  location: string;
  area: string;
  soilType: string;
  price: string;
  description: string;
  type: string;
};

type LandTypeImages = {
  [key: string]: string;
};

export default function AddRentLand() {
  // Initialize form state
  const [form, setForm] = useState<FormState>({
    location: "",
    area: "",
    soilType: "",
    price: "",
    description: "",
    type: "",
  });

  // State for submission and error handling
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapping of land types to images
  const landTypeImages: LandTypeImages = {
    "أرض زراعية": farmLandImage,
    بستان: orchardImage,
    مرعى: pastureLandImage,
    غابة: forestLandImage,
    حديقة: gardenLandImage,
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Define required fields
    const requiredFields: (keyof FormState)[] = [
      "location",
      "area",
      "soilType",
      "price",
      "description",
      "type",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !form[field]);

    if (missingFields.length > 0) {
      setError(`يرجى ملء الحقول التالية: ${missingFields.join(", ")}`);
      return;
    }

    try {
      // Prepare data for API call
      const landData = {
        location: form.location,
        area: Number(form.area),
        soilType: form.soilType,
        price: Number(form.price),
        description: form.description,
        type: form.type,
      };

      // Call API to add land
      const response = await addLandApi(landData);

      // Reset form and show success message
      setForm({
        location: "",
        area: "",
        soilType: "",
        price: "",
        description: "",
        type: "",
      });
      setIsSubmitted(true);
      setError(null);
      setTimeout(() => setIsSubmitted(false), 3000);

      console.log("Land added successfully:", response);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        setError(`حدث خطأ: ${err.message}`);
      } else {
        console.error("Unexpected error", err);
        setError("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <section className="py-16 md:py-20 text-right dir-rtl relative font-['NeoSansArabicRegular']">
      <div className="container mx-auto px-4 flex flex-col items-center lg:items-end">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-stretch">
          {/* Desktop Land Type Image Container */}
          <div className="hidden lg:block w-1/3 mr-8 self-center">
            {form.type ? (
              <img
                src={landTypeImages[form.type]}
                alt={`صورة ${form.type}`}
                className="w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                <span className="text-center">اختر نوع الأرض</span>
              </div>
            )}
          </div>

          {/* Form Container */}
          <div className="w-full lg:w-2/3">
            <div className="bg-transparent rounded-lg overflow-hidden">
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-center mb-6 justify-end">
                  <h2 className="text-2xl font-bold text-white ml-3 font-['NeoSansArabicBold']">
                    إضافة أرض للإيجار
                  </h2>
                  <PlusCircle className="w-8 h-8 text-green-500 mr-3" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location Input */}
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        الموقع
                        <MapPin className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل موقع الأرض"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {/* Land Type Select */}
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        نوع الأرض
                        <Trees className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          dir="rtl"
                        >
                          <option value="">اختر نوع الأرض</option>
                          <option value="أرض زراعية">أرض زراعية</option>
                          <option value="بستان">بستان</option>
                          <option value="مرعى">مرعى</option>
                          <option value="غابة">غابة</option>
                          <option value="حديقة">حديقة</option>
                        </select>
                      </div>

                      {/* Mobile Land Type Image Container */}
                      <div className="block lg:hidden mt-4">
                        {form.type ? (
                          <img
                            src={landTypeImages[form.type]}
                            alt={`صورة ${form.type}`}
                            className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                            <span className="text-center">اختر نوع الأرض</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Area Input */}
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        المساحة
                        <Ruler className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="number"
                          name="area"
                          value={form.area}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل مساحة الأرض (متر مربع)"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {/* Soil Type Input */}
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        نوع التربة
                        <Trees className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="soilType"
                          value={form.soilType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل نوع التربة"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {/* Price Input */}
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        السعر اليومي
                        <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل السعر اليومي للإيجار"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description Textarea */}
                  <div>
                    <label className="flex items-center mb-2 text-white justify-end">
                      وصف الأرض
                      <FileText className="w-5 h-5 mr-2 text-green-500" />
                    </label>
                    <div className="flex flex-row-reverse">
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                        placeholder="أدخل وصف الأرض"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-['NeoSansArabicBold']"
                    >
                      إضافة أرض
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mt-4 text-center text-green-500 font-medium p-3 rounded-lg animate-pulse font-['NeoSansArabicMedium']">
                    تم إضافة الأرض بنجاح!
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 text-center text-red-500 font-medium p-3 rounded-lg font-['NeoSansArabicMedium']">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
