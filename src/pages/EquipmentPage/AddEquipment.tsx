import React, { useState } from "react";
import {
  PlusCircle,
  Wrench,
  DollarSign,
  FileText,
  TowerControl,
} from "lucide-react";
import { addEquipmentApi } from "../../api/myEquipmentApi";
import { supabase } from '../../lib/supabaseClient';

// Placeholder images for different equipment types (you'll need to replace these with actual images)
import tractorImage from "../../assets/MachineRentPage/AddEquipment/tractor.jpg";
import harvestImage from "../../assets/MachineRentPage/AddEquipment/harvest.jpg";
import irrigationImage from "../../assets/MachineRentPage/AddEquipment/irrigation.jpg";
import generalToolsImage from "../../assets/MachineRentPage/AddEquipment/generaltools.jpg";
import harvesterImage from "../../assets/MachineRentPage/AddEquipment/harvest.jpg";

export default function AddRentEquipment() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    condition: "" as "NEW" | "USED" | "REFURBISHED" | "DAMAGED",
    price: "",
    description: "",
    isAvailable: true,
  });
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapping of equipment types to images
  const equipmentTypeImages = {
    جرار: tractorImage,
    "معدات حصاد": harvestImage,
    "معدات الري": irrigationImage,
    "أدوات عامة": generalToolsImage,
    حصادة: harvesterImage,
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const uploadImagesToSupabase = async (): Promise<string[]> => {
    if (images.length === 0) return [];
    setUploading(true);
    const urls: string[] = [];
    for (const file of images) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { error } = await supabase.storage.from('equipment-images').upload(fileName, file);
      if (error) {
        setUploading(false);
        throw new Error('فشل رفع الصورة: ' + error.message);
      }
      const url = supabase.storage.from('equipment-images').getPublicUrl(fileName).data.publicUrl;
      urls.push(url);
    }
    setUploading(false);
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !form.name ||
      !form.type ||
      !form.condition ||
      !form.price ||
      !form.description
    ) {
      alert("يرجى ملء جميع الحقول الإلزامية");
      return;
    }

    try {
      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImagesToSupabase();
      }
      await addEquipmentApi({
        name: form.name,
        type: form.type,
        condition: form.condition,
        price: Number(form.price),
        description: form.description,
        isAvailable: true,
        images: imageUrls, // Save image URLs with equipment
      });

      // Reset form and show success message
      setForm({
        name: "",
        type: "",
        condition: "" as "NEW" | "USED" | "REFURBISHED" | "DAMAGED",
        price: "",
        description: "",
        isAvailable: true,
      });
      setImages([]);
      setIsSubmitted(true);
      setError(null);
      setTimeout(() => setIsSubmitted(false), 3000);
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
          {/* Desktop Equipment Type Image Container */}
          <div className="hidden lg:block w-1/3 mr-8 self-center">
            {form.type ? (
              <img
                src={
                  equipmentTypeImages[
                    form.type as keyof typeof equipmentTypeImages
                  ]
                }
                alt={`صورة ${form.type}`}
                className="w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                <span className="text-center">اختر نوع المعدات</span>
              </div>
            )}
          </div>

          {/* Form Container */}
          <div className="w-full lg:w-2/3">
            <div className="bg-transparent rounded-lg overflow-hidden">
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-center mb-6 justify-end">
                  <h2 className="text-2xl font-bold text-white ml-3 font-['NeoSansArabicBold']">
                    إضافة معدات للإيجار
                  </h2>
                  <PlusCircle className="w-8 h-8 text-green-500 mr-3" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        اسم المعدات
                        <Wrench className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل اسم المعدات"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        نوع المعدات
                        <TowerControl className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          dir="rtl"
                        >
                          <option value="">اختر نوع المعدات</option>
                          <option value="جرار">جرار</option>
                          <option value="معدات حصاد">معدات حصاد</option>
                          <option value="معدات الري">معدات الري</option>
                          <option value="أدوات عامة">أدوات عامة</option>
                          <option value="حصادة">حصادة</option>
                        </select>
                      </div>

                      {/* Mobile Equipment Type Image Container */}
                      <div className="block lg:hidden mt-4">
                        {form.type ? (
                          <img
                            src={
                              equipmentTypeImages[
                                form.type as keyof typeof equipmentTypeImages
                              ]
                            }
                            alt={`صورة ${form.type}`}
                            className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                            <span className="text-center">
                              اختر نوع المعدات
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        حالة المعدات
                        <Wrench className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <select
                          name="condition"
                          value={form.condition}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          dir="rtl"
                        >
                          <option value="">اختر حالة المعدات</option>
                          <option value="NEW">جديدة</option>
                          <option value="USED">مستعملة</option>
                          <option value="REFURBISHED">معاد تجديدها</option>
                          <option value="DAMAGED">تالفة</option>
                        </select>
                      </div>
                    </div>

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

                    {/* Optional: Start and End Date Fields */}
                    {/*
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        تاريخ البداية (اختياري)
                        <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="date"
                          name="startDate"
                          value={form.startDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        تاريخ الانتهاء (اختياري)
                        <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="date"
                          name="endDate"
                          value={form.endDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    */}

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        وصف المعدات
                        <FileText className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل وصف المعدات"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        صور المعدات (اختياري)
                        <PlusCircle className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                        dir="rtl"
                      />
                      {images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {images.map((img, idx) => (
                            <span key={idx} className="text-xs text-green-400 bg-gray-900 px-2 py-1 rounded">
                              {img.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {uploading && <div className="text-yellow-400 mt-2">جاري رفع الصور...</div>}
                    </div>

                    <div className="text-center mt-6">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-['NeoSansArabicBold']"
                      >
                        إضافة المعدات للإيجار
                      </button>
                    </div>
                  </div>

                  {isSubmitted && (
                    <div className="mt-4 text-center text-green-500 font-medium p-3 rounded-lg animate-pulse font-['NeoSansArabicMedium']">
                      تم إضافة المعدات بنجاح!
                    </div>
                  )}
                  {error && (
                    <div className="mt-4 text-center text-red-500 font-medium p-3 rounded-lg font-['NeoSansArabicMedium']">
                      {error}
                    </div>
                  )}
                </form>

                {isSubmitted && (
                  <div className="mt-4 text-center text-green-500 font-medium p-3 rounded-lg animate-pulse font-['NeoSansArabicMedium']">
                    تم إضافة المعدات بنجاح!
                  </div>
                )}
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
