import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "../../assets/Login/LoginImage.jpeg";
import { supabase } from "../../lib/supabaseClient";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!email || !password || !name || !telephone) {
      setError("يرجى ملء جميع الحقول");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمة المرور وتأكيد كلمة المرور غير متطابقتين");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
      setLoading(false);
      return;
    }
    const telephoneRegex = /^(0[567]\d{8}|\+213[567]\d{8})$/;
    if (!telephoneRegex.test(telephone)) {
      setError("رقم الهاتف غير صحيح. يجب أن يبدأ بـ 06 أو 07 أو 05 أو +213 متبوعًا بـ 8 أرقام");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, telephone },
        },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden ">
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
            إنشاء حساب جديد
          </motion.h1>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
            >
              {success}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignUp}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="الاسم بالكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                dir="rtl"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف (مثل 0676916928)"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                dir="rtl"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                dir="rtl"
              />
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                minLength={8}
                dir="rtl"
              />
              <input
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-right"
                required
                minLength={8}
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
                disabled={loading}
              >
                {loading ? "جاري التسجيل..." : "إنشاء حساب"}
              </button>
            </motion.div>
          </form>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 text-sm text-gray-200"
          >
            <p>
              لديك حساب؟ <br />
              <Link
                to="/Login"
                className={`
                  inline-block
                  font-['NeoSansArabicMedium']
                  transition-colors duration-300
                  border-b-2 border-transparent
                  hover:border-current
                  pb-1
                  text-white hover:text-gray-200 hover:border-gray-200
                `}
              >
                تسجيل الدخول
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
