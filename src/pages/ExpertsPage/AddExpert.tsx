import React, { useState } from "react";
import { addExpertApi } from "../../api/addExpertApi";

export default function AddExpert() {
  const [form, setForm] = useState<{
    name: string;
    prename: string;
    wilaya: string;
    skills: string;
    description: string;
    email: string;
    phone: string;
    image: File | null;
  }>({
    name: "",
    prename: "",
    wilaya: "",
    skills: "",
    description: "",
    email: "",
    phone: "",
    image: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false); // State for showing/hiding the success message
  const successRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields are filled
    if (
      !form.name.trim() ||
      !form.prename.trim() ||
      !form.wilaya.trim() ||
      !form.skills.trim() ||
      !form.description.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.image
    ) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    try {
      // Call your API to add expert (with image upload)
      if (!form.image) throw new Error("يرجى رفع صورة شخصية");
      await addExpertApi({ ...form, image: form.image });
      setShowSuccess(true); // Show the success message
      setError(null);
      setForm({
        name: "",
        prename: "",
        wilaya: "",
        skills: "",
        description: "",
        email: "",
        phone: "",
        image: null,
      });
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100); // Wait for the message to render
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`حدث خطأ: ${err.message}`);
      } else {
        setError("حدث خطأ غير متوقع");
      }
    }
  };

  // Warn if Supabase env variables are missing (for Vercel debugging)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const missingEnv = !supabaseUrl || !supabaseKey;

  return (
    <section className="py-16 md:py-20 text-right dir-rtl relative font-['NeoSansArabicRegular']">
      {missingEnv && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
          ⚠️ تحذير: إعدادات Supabase غير موجودة! تحقق من متغيرات البيئة في Vercel.
        </div>
      )}
      <div className="container mx-auto px-4 flex flex-col items-center lg:items-end">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-stretch">
          <div className="w-full">
            <div className="bg-transparent rounded-lg overflow-hidden">
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-center mb-6 justify-end">
                  <h2 className="text-2xl font-bold text-white ml-3 font-['NeoSansArabicBold']">
                    انضم كخبير فلاحي
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        الاسم
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="أدخل الاسم"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        اللقب
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="prename"
                          value={form.prename}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="أدخل اللقب"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        الولاية
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="wilaya"
                          value={form.wilaya}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="أدخل الولاية"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        المهارات
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="skills"
                          value={form.skills}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="أدخل المهارات (مفصولة بفواصل)"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        البريد الإلكتروني
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="أدخل البريد الإلكتروني"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        رقم الهاتف
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="أدخل رقم الهاتف"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center mb-2 text-white justify-end">
                        صورة شخصية
                      </label>
                      <div className="flex flex-row-reverse">
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center mb-2 text-white justify-end">
                      نبذة عنك
                    </label>
                    <div className="flex flex-row-reverse">
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-green-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="أدخل نبذة عنك"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      انضم كخبير
                    </button>
                  </div>
                </form>
                {showSuccess && (
                  <div ref={successRef} className="mt-4 text-center text-green-500 font-medium p-3 rounded-lg animate-pulse" style={{ position: 'relative' }}>
                    تم تسجيلك كخبير بنجاح!
                    <button
                      onClick={() => setShowSuccess(false)}
                      style={{ position: 'absolute', left: 10, top: 10, color: '#16a34a', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                      aria-label="إغلاق رسالة النجاح"
                    >
                      ×
                    </button>
                  </div>
                )}
                {error && (
                  <div className="mt-4 text-center text-red-500 font-medium p-3 rounded-lg">
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
