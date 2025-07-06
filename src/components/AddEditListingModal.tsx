import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AuthOnlyButton from "./AuthOnlyButton";

interface AddEditListingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
}

const types = ["منتج", "معدات", "أرض"];

const AddEditListingModal: React.FC<AddEditListingModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(initialData || { title: "", type: types[0], price: "", location: "", description: "", image: "" });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const { data, error } = await supabase.storage.from("product-images").upload(`public/${Date.now()}_${file.name}`, file);
    if (error) setError("فشل رفع الصورة");
    if (data) setForm({ ...form, image: data.path });
    setUploading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);
    // Insert into the correct table based on type
    let table = form.type === "منتج" ? "products" : form.type === "معدات" ? "equipments" : "lands";
    const insertData = { ...form };
    if (table === "lands") {
      insertData.name = form.title;
      delete insertData.title;
    }
    const { error } = await supabase.from(table).insert([insertData]);
    if (error) {
      setError("فشل إضافة الإعلان");
      return;
    }
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute left-4 top-4 text-gray-400 hover:text-red-400 text-2xl">×</button>
        <h3 className="text-xl font-bold text-green-700 mb-4 text-center">{initialData ? "تعديل إعلان" : "إضافة إعلان جديد"}</h3>
        <input name="title" value={form.title} onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="العنوان" />
        <select name="type" value={form.type} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input name="price" value={form.price} onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="السعر" type="number" />
        <input name="location" value={form.location} onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="الموقع" />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="الوصف" rows={3} />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
        {uploading && <div className="text-blue-600 mb-2">جاري رفع الصورة...</div>}
        {form.image && <img src={`https://YOUR_SUPABASE_URL/storage/v1/object/public/product-images/${form.image}`} alt="preview" className="w-full h-32 object-cover rounded mb-2" />}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <AuthOnlyButton onClick={handleSubmit} className="w-full bg-green-600 text-white py-2 rounded font-bold mt-2">{initialData ? "حفظ التعديلات" : "إضافة الإعلان"}</AuthOnlyButton>
      </div>
    </div>
  );
};

export default AddEditListingModal; 