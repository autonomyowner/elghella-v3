import React, { useState } from "react";
import {
  PlusCircle,
  ShoppingCart,
  Tag,
  DollarSign,
  Archive,
  FileText,
} from "lucide-react";
import { addProductApi } from "../../api/myProductApi"; // Updated import path

import feedImage from "../../assets/GreengrocerPage/AddGroceries/Feed.jpg";
import fruitsImage from "../../assets/GreengrocerPage/AddGroceries/fruits.jpg";
import grainsImage from "../../assets/GreengrocerPage/AddGroceries/Grains.jpg";
import nutsImage from "../../assets/GreengrocerPage/AddGroceries/Nuts.jpg";
import vegetablesImage from "../../assets/GreengrocerPage/AddGroceries/Vegetables.jpg";

export default function EnhancedGroceryManagement() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define a mapping of product types to image placeholders
  const productTypeImages = {
    الحبوب: grainsImage,
    الخضروات: vegetablesImage,
    الفواكه: fruitsImage,
    الأعلاف: feedImage,
    المكسرات: nutsImage,
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !form.name.trim() ||
      !form.type.trim() ||
      !form.price.trim() ||
      !form.quantity.trim() ||
      !form.description.trim()
    ) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    try {
      // Prepare data for API - convert price and quantity to numbers
      const productData = {
        name: form.name,
        type: form.type,
        price: Number(form.price),
        quantity: Number(form.quantity),
        description: form.description,
      };

      // Call the API function with the prepared data
      const result = await addProductApi(productData);
      if (!result) {
        setError("لم يتم إضافة المنتج. يرجى المحاولة مرة أخرى.");
        return;
      }

      // Reset form and show success message
      setForm({
        name: "",
        type: "",
        price: "",
        quantity: "",
        description: "",
      });
      setIsSubmitted(true);
      setError(null);

      // Hide success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err: unknown) {
      // Improved error handling
      if (err instanceof Error) {
        console.error("Error adding product:", err);
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
          {/* Desktop Product Type Image Container */}
          <div className="hidden lg:block w-1/3 mr-8 self-center">
            {form.type ? (
              <img
                src={
                  productTypeImages[form.type as keyof typeof productTypeImages]
                }
                alt={`صورة ${form.type}`}
                className="w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                <span className="text-center">اختر نوع المنتج</span>
              </div>
            )}
          </div>

          {/* Form Container */}
          <div className="w-full lg:w-2/3">
            <div className="bg-transparent rounded-lg overflow-hidden">
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-center mb-6 justify-end">
                  <h2 className="text-2xl font-bold text-white ml-3 font-['NeoSansArabicBold']">
                    إضافة منتج جديد
                  </h2>
                  <PlusCircle className="w-8 h-8 text-green-500 mr-3" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        اسم المنتج
                        <ShoppingCart className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل اسم المنتج"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        نوع المنتج
                        <Tag className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          dir="rtl"
                        >
                          <option value="">اختر نوع المنتج</option>
                          <option value="الحبوب">الحبوب</option>
                          <option value="الخضروات">الخضروات</option>
                          <option value="الفواكه">الفواكه</option>
                          <option value="الأعلاف">الأعلاف</option>
                          <option value="المكسرات">المكسرات</option>
                        </select>
                      </div>

                      {/* Mobile Product Type Image Container - Placed directly under the Product Type field */}
                      <div className="block lg:hidden mt-4">
                        {form.type ? (
                          <img
                            src={
                              productTypeImages[
                                form.type as keyof typeof productTypeImages
                              ]
                            }
                            alt={`صورة ${form.type}`}
                            className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                            <span className="text-center">اختر نوع المنتج</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        السعر
                        <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل السعر"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        الكمية
                        <Archive className="w-5 h-5 mr-2 text-green-500" />
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="number"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                          placeholder="أدخل الكمية"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center mb-2 text-white justify-end">
                      وصف المنتج
                      <FileText className="w-5 h-5 mr-2 text-green-500" />
                    </label>
                    <div className="flex flex-row-reverse">
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 font-['NeoSansArabicRegular']"
                        placeholder="أدخل وصف المنتج"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-['NeoSansArabicBold']"
                    >
                      إضافة المنتج
                    </button>
                  </div>
                </form>
                {isSubmitted && (
                  <div className="mt-4 text-center text-green-500 font-medium p-3 rounded-lg animate-pulse font-['NeoSansArabicMedium']">
                    تم إضافة المنتج بنجاح!
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
