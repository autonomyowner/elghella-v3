import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginImage from "../../assets/Login/LoginImage.jpeg";
import { useAuth } from "../../context/AuthContext"; // Ensure correct import path

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // Use login method from AuthContext

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      setIsLoading(false);
      return;
    }

    try {
      // Use the login method from AuthContext
      await login(email, password);

      // Refresh and navigate to the home page
      window.location.href = "/"; // Refresh and navigate to '/'
    } catch (err) {
      // Handle login errors
      if (err instanceof Error) {
        setError(
          err.message || "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد."
        );
      }
    } finally {
      setIsLoading(false);
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
            تسجيل الدخول
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

          {/* Form */}
          <form onSubmit={handleLogin}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </motion.div>

            {/* Login Button */}
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
                disabled={isLoading}
                className={`
                  px-12 py-4 
                  text-white 
                  font-semibold 
                  rounded-lg 
                  shadow-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-green-300
                  ${
                    isLoading
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }
                `}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </motion.div>
          </form>

          {/* Optional Signup Link */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 text-sm text-gray-200"
          >
            <p>
              لا تمتلك حسابًا؟{" "}
              <a href="/Signup" className="text-green-300 hover:underline">
                سجل الآن
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
