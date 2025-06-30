import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginImage from "../../assets/Settings/Settings2.jpg"; // Adjust the import path as needed
import { useAuth } from "../../context/AuthContext";
import authService from "../../api/AuthService";

const SettingsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form data states
  const [name, setName] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await authService.getCurrentUser(); // Get the response object
          const data = response; // response is already the user object
          if (data) {
            setName(data.user_metadata?.name || ""); // Use optional chaining for name
            setTelephone(data.user_metadata?.telephone || ""); // Use optional chaining for telephone
          }
        } catch {
          setError("فشل في تحميل البيانات");
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("كلمات السر الجديدة غير متطابقة");
      return;
    }

    try {
      // Note: You'll need to add this method to your AuthApi.tsx
      const updateData: {
        name: string;
        telephone: string;
        password?: string;
      } = {
        name,
        telephone,
      };

      if (currentPassword && newPassword) {
        updateData.password = newPassword;
      }

      // Temporary placeholder - you'll need to implement this in AuthApi.tsx

      setSuccessMessage("تم تحديث البيانات بنجاح");
      setError(null);
    } catch (err) {
      setError("حدث خطأ أثناء تحديث البيانات");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={LoginImage}
        alt="Hero"
        className="hero-image w-full h-full absolute top-0 left-0 object-fill md:object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
        <div className="relative z-20 max-w-lg mx-6 lg:mx-16 space-y-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-4xl font-extrabold text-green-200 mb-4 font-NeoSansArabicBlack"
          >
            تحديث البيانات
          </motion.h1>

          {/* Error or Success Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
            >
              {successMessage}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              {/* Full Name */}
              <input
                type="text"
                placeholder="الاسم بالكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                dir="rtl"
              />

              {/* Phone Number */}
              <input
                type="tel"
                placeholder="رقم الهاتف (مثل 0676916928)"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                dir="rtl"
              />

              {/* Current Password */}
              <input
                type="password"
                placeholder="كلمة المرور الحالية"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                dir="rtl"
              />

              {/* New Password */}
              <input
                type="password"
                placeholder="كلمة المرور الجديدة"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                dir="rtl"
              />

              {/* Confirm New Password */}
              <input
                type="password"
                placeholder="تأكيد كلمة المرور الجديدة"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                dir="rtl"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block"
            >
              <button
                type="submit"
                className="px-12 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                حفظ التغييرات
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
